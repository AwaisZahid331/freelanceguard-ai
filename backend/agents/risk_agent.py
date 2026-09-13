"""Risk Scoring Agent - aggregates signals from the email, blacklist and
contract agents into a single 0-100 fraud risk score."""

from backend.models import AgentState


ALERT_THRESHOLD = 50


def _risk_level(score: int) -> str:
    if score >= 75:
        return "CRITICAL"
    if score >= ALERT_THRESHOLD:
        return "HIGH"
    if score >= 25:
        return "MEDIUM"
    return "LOW"


def risk_agent(state: AgentState) -> AgentState:
    score = 0
    reasons = []

    if state.get("blacklisted"):
        score += 50
        reasons.append(f"Client is blacklisted: {state.get('blacklist_reason', 'unspecified reason')}")

    if not state.get("email_verified", False):
        score += 20
        reasons.append(f"Email could not be verified ({state.get('email_check_note', '')})")

    contract_risk = int(state.get("contract_risk", 0) or 0)
    if contract_risk:
        score += contract_risk
        flags = state.get("contract_flags") or []
        if flags:
            reasons.append(f"Contract red flags: {', '.join(flags)}")

    score = max(0, min(100, score))
    level = _risk_level(score)

    reasoning = "; ".join(reasons) if reasons else "No fraud signals detected"

    result = {**state, "risk_score": score, "risk_level": level, "risk_reasoning": reasoning}

    if score < ALERT_THRESHOLD:
        result["alert_sent"] = False
        result["alert_note"] = f"No alert sent (risk score below the {ALERT_THRESHOLD} alert threshold)"

    return result
