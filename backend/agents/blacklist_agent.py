"""Blacklist Agent - queries a Google Sheet acting as a community-reported
client blacklist. Degrades gracefully (skips, does not crash) if Sheets
credentials are not configured yet."""

from backend.config import GOOGLE_SHEETS_ID, GOOGLE_SERVICE_ACCOUNT_FILE
from backend.models import AgentState

_sheet_cache: list[list[str]] | None = None


def _get_sheet_rows() -> list[list[str]] | None:
    global _sheet_cache
    if _sheet_cache is not None:
        return _sheet_cache

    if not GOOGLE_SHEETS_ID or not GOOGLE_SERVICE_ACCOUNT_FILE:
        return None

    try:
        from google.oauth2 import service_account
        from googleapiclient.discovery import build

        creds = service_account.Credentials.from_service_account_file(
            GOOGLE_SERVICE_ACCOUNT_FILE,
            scopes=["https://www.googleapis.com/auth/spreadsheets.readonly"],
        )
        service = build("sheets", "v4", credentials=creds)
        result = (
            service.spreadsheets()
            .values()
            .get(spreadsheetId=GOOGLE_SHEETS_ID, range="Sheet1!A2:F")
            .execute()
        )
        _sheet_cache = result.get("values", [])
        return _sheet_cache
    except Exception:
        return None


def blacklist_agent(state: AgentState) -> AgentState:
    rows = _get_sheet_rows()

    if rows is None:
        return {
            **state,
            "blacklisted": False,
            "blacklist_note": "Blacklist check skipped (Google Sheets not configured)",
        }

    name = (state.get("client_name") or "").strip().lower()
    email = (state.get("client_email") or "").strip().lower()

    for row in rows:
        row_name = (row[0] if len(row) > 0 else "").strip().lower()
        row_email = (row[1] if len(row) > 1 else "").strip().lower().removeprefix("mailto:")
        row_reason = row[3] if len(row) > 3 else "No reason given"

        if (name and row_name == name) or (email and row_email == email):
            return {
                **state,
                "blacklisted": True,
                "blacklist_reason": row_reason,
                "blacklist_note": f"Match found in blacklist: {row_reason}",
            }

    return {**state, "blacklisted": False, "blacklist_note": "No blacklist match"}
