from typing import TypedDict, Optional, List


class AgentState(TypedDict, total=False):
    client_name: str
    client_email: str
    linkedin_url: str
    contract_text: Optional[str]

    email_verified: bool
    email_quality_score: Optional[float]
    email_check_note: str

    blacklisted: bool
    blacklist_reason: Optional[str]
    blacklist_note: str

    contract_flags: List[str]
    contract_risk: int
    contract_summary: str

    risk_score: int
    risk_level: str  # LOW / MEDIUM / HIGH / CRITICAL
    risk_reasoning: str

    alert_sent: bool
    alert_note: str
