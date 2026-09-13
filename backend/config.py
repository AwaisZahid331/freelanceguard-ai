import os
import tempfile
from dotenv import load_dotenv

load_dotenv()

ABSTRACT_API_KEY = os.getenv("ABSTRACT_API_KEY", "")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "")
GOOGLE_SHEETS_ID = os.getenv("GOOGLE_SHEETS_ID", "")
GOOGLE_SERVICE_ACCOUNT_FILE = os.getenv("GOOGLE_SERVICE_ACCOUNT_FILE", "")

# On hosts like Render, the service account file can't be committed to git.
# Paste the full JSON content into GOOGLE_SERVICE_ACCOUNT_JSON instead, and
# it gets written to a temp file at startup so the rest of the code is unaffected.
_service_account_json = os.getenv("GOOGLE_SERVICE_ACCOUNT_JSON", "")
if _service_account_json and not GOOGLE_SERVICE_ACCOUNT_FILE:
    _tmp = tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False)
    _tmp.write(_service_account_json)
    _tmp.close()
    GOOGLE_SERVICE_ACCOUNT_FILE = _tmp.name

SLACK_WEBHOOK_URL = os.getenv("SLACK_WEBHOOK_URL", "")
GMAIL_SENDER = os.getenv("GMAIL_SENDER", "")
