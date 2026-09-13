"""Alert Agent - fires a Slack notification (Block Kit formatted) when the
risk score crosses the alert threshold. Degrades gracefully if Slack is not
configured."""

import httpx

from backend.config import SLACK_WEBHOOK_URL
from backend.models import AgentState

_LEVEL_STYLE = {
    "LOW": ("🟢", "#00d4aa"),
    "MEDIUM": ("🟡", "#ffd700"),
    "HIGH": ("🟠", "#ff8c42"),
    "CRITICAL": ("🔴", "#ff4444"),
}


def _collect_flags(state: AgentState) -> list[str]:
    flags = []

    if state.get("blacklisted"):
        flags.append(f"🚫 *Blacklisted:* {state.get('blacklist_reason', 'unspecified reason')}")

    if not state.get("email_verified", False):
        flags.append(f"📧 *Email unverified:* {state.get('email_check_note', 'no detail')}")

    for flag in state.get("contract_flags") or []:
        flags.append(f"📄 {flag}")

    return flags or ["No specific red flags recorded."]


def _build_slack_payload(state: AgentState) -> dict:
    level = state.get("risk_level", "HIGH")
    emoji, color = _LEVEL_STYLE.get(level, ("🟠", "#ff8c42"))
    score = state.get("risk_score", 0)
    client_name = state.get("client_name", "Unknown")
    client_email = state.get("client_email") or "not provided"
    flags_text = "\n".join(f"• {f}" for f in _collect_flags(state))

    return {
        "attachments": [
            {
                "color": color,
                "blocks": [
                    {
                        "type": "header",
                        "text": {
                            "type": "plain_text",
                            "text": f"{emoji} FreelanceGuard Fraud Alert — {level} RISK",
                            "emoji": True,
                        },
                    },
                    {
                        "type": "section",
                        "fields": [
                            {"type": "mrkdwn", "text": f"*Client*\n{client_name}"},
                            {"type": "mrkdwn", "text": f"*Email*\n{client_email}"},
                            {"type": "mrkdwn", "text": f"*Risk Score*\n{score}/100"},
                            {"type": "mrkdwn", "text": f"*Risk Level*\n{emoji} {level}"},
                        ],
                    },
                    {"type": "divider"},
                    {
                        "type": "section",
                        "text": {"type": "mrkdwn", "text": f"*Why this was flagged:*\n{flags_text}"},
                    },
                    {
                        "type": "context",
                        "elements": [
                            {
                                "type": "mrkdwn",
                                "text": "🛡️ *FreelanceGuard AI* · Automated multi-agent fraud detection",
                            }
                        ],
                    },
                ],
            }
        ]
    }


def _send_slack_alert(state: AgentState) -> bool:
    if not SLACK_WEBHOOK_URL:
        return False
    try:
        resp = httpx.post(SLACK_WEBHOOK_URL, json=_build_slack_payload(state), timeout=10)
        return resp.status_code == 200
    except Exception:
        return False


def alert_agent(state: AgentState) -> AgentState:
    slack_sent = _send_slack_alert(state)

    note = "Slack alert sent" if slack_sent else "Slack alert not sent (webhook not configured or failed)"

    return {**state, "alert_sent": slack_sent, "alert_note": note}
