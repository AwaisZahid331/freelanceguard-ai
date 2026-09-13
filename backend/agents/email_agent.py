"""Email Agent - verifies client email using AbstractAPI's Email Reputation
endpoint (used instead of Hunter.io). Free tier is quota-limited, so results
are cached in-memory per email to avoid burning requests on repeat lookups."""

import time

import httpx
from backend.config import ABSTRACT_API_KEY
from backend.models import AgentState

_cache: dict[str, dict] = {}

ABSTRACT_URL = "https://emailreputation.abstractapi.com/v1/"


def _fetch_email_reputation(email: str) -> dict | None:
    if email in _cache:
        return _cache[email]

    if not ABSTRACT_API_KEY:
        return None

    for attempt in range(2):
        try:
            resp = httpx.get(
                ABSTRACT_URL,
                params={"api_key": ABSTRACT_API_KEY, "email": email},
                timeout=15,
            )
            resp.raise_for_status()
            data = resp.json()
            _cache[email] = data
            return data
        except Exception:
            if attempt == 0:
                time.sleep(1.5)

    return None


def email_agent(state: AgentState) -> AgentState:
    email = state.get("client_email", "")

    if not email:
        return {**state, "email_verified": False, "email_check_note": "No email provided"}

    data = _fetch_email_reputation(email)

    if data is None:
        return {
            **state,
            "email_verified": False,
            "email_check_note": "Email check unavailable (API key missing or request failed) - unverified",
        }

    deliverability = (data.get("email_deliverability") or {}).get("status", "unknown")
    quality_score = (data.get("email_quality") or {}).get("score")
    risk_status = (data.get("email_risk") or {}).get("address_risk_status", "unknown")

    verified = deliverability == "deliverable" and risk_status != "high"

    note = f"deliverability={deliverability}, quality={quality_score}, risk={risk_status}"

    return {
        **state,
        "email_verified": verified,
        "email_quality_score": quality_score,
        "email_check_note": note,
    }
