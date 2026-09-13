import os
from dotenv import load_dotenv

load_dotenv()

ABSTRACT_API_KEY = os.getenv("ABSTRACT_API_KEY", "")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "")
GOOGLE_SHEETS_ID = os.getenv("GOOGLE_SHEETS_ID", "")
GOOGLE_SERVICE_ACCOUNT_FILE = os.getenv("GOOGLE_SERVICE_ACCOUNT_FILE", "")

SLACK_WEBHOOK_URL = os.getenv("SLACK_WEBHOOK_URL", "")
GMAIL_SENDER = os.getenv("GMAIL_SENDER", "")
