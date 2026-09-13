"""Contract Agent - uses Gemini to find fraud red flags in freelance
contract text (vague scope, missing payment terms, IP grabs, etc.)."""

import json
import re

from backend.config import GEMINI_API_KEY
from backend.models import AgentState

_model = None


def _get_model():
    global _model
    if _model is not None:
        return _model
    if not GEMINI_API_KEY:
        return None
    try:
        import google.generativeai as genai

        genai.configure(api_key=GEMINI_API_KEY)
        _model = genai.GenerativeModel("gemini-flash-lite-latest")
        return _model
    except Exception:
        return None


def _extract_json(text: str) -> dict | None:
    try:
        return json.loads(text)
    except Exception:
        pass
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(0))
        except Exception:
            return None
    return None


def contract_agent(state: AgentState) -> AgentState:
    contract_text = state.get("contract_text")

    if not contract_text:
        return {
            **state,
            "contract_flags": [],
            "contract_risk": 0,
            "contract_summary": "No contract text provided",
        }

    model = _get_model()
    if model is None:
        return {
            **state,
            "contract_flags": [],
            "contract_risk": 0,
            "contract_summary": "Contract analysis unavailable (Gemini API key missing)",
        }

    prompt = f"""Analyze this freelance contract for fraud red flags.

Score risk_contribution on a 0-60 scale based on severity:
- 0-10: standard, fair contract with no real concerns
- 11-25: minor issues (a bit vague, but payment/scope are reasonably clear)
- 26-45: serious concerns (missing payment terms, one-sided clauses, unclear scope)
- 46-60: severe/predatory (unlimited free work, payment fully at client's discretion,
  broad IP grabs, no identifying party details, or clearly not a real contract at all)

Return JSON only, no markdown fences, in this exact shape:
{{
  "flags": ["list of red flags found"],
  "risk_contribution": 0-60,
  "summary": "one line summary"
}}

Contract: {contract_text}"""

    try:
        response = model.generate_content(
            prompt,
            request_options={"timeout": 30},
        )
        result = _extract_json(response.text)
        if result is None:
            raise ValueError("Could not parse Gemini response as JSON")

        risk = max(0, min(60, int(result.get("risk_contribution", 0))))

        return {
            **state,
            "contract_flags": result.get("flags", []),
            "contract_risk": risk,
            "contract_summary": result.get("summary", ""),
        }
    except Exception as e:
        return {
            **state,
            "contract_flags": [],
            "contract_risk": 0,
            "contract_summary": f"Contract analysis failed: {e}",
        }
