# FreelanceGuard AI

Multi-agent AI system that protects freelancers from fake/scam clients. Built for the
AI Freelancer Fraud Detection Hackathon.

## How it works

1. **Email Agent** — verifies the client's email via AbstractAPI's Email Reputation
   endpoint (free tier, used instead of Hunter.io from the original guide).
2. **Blacklist Agent** — checks a Google Sheet of community-reported scam clients.
3. **Contract Agent** — uses Gemini to find red flags in the contract text.
4. **Risk Scoring Agent** — aggregates all signals into a 0-100 fraud risk score.
5. **Alert Agent** — fires a Slack alert when the score exceeds 60.

Every agent degrades gracefully: if a service isn't configured or a call fails, that
agent returns a neutral/unverified result instead of crashing the pipeline.

## Project structure

```
backend/
  main.py            # FastAPI app, POST /analyze
  graph.py            # LangGraph orchestration
  models.py           # AgentState schema
  config.py            # loads .env
  agents/
    email_agent.py     # AbstractAPI email reputation
    blacklist_agent.py # Google Sheets blacklist
    contract_agent.py  # Gemini contract analysis
    risk_agent.py       # score aggregation
    alert_agent.py      # Slack webhook
frontend/
  app/page.tsx          # input form + results (single page)
  components/           # RiskMeter, FlagCard, AgentTimeline
```

## Setup

### 1. API keys

Fill in `.env` at the project root (see `.env.example`):

- `ABSTRACT_API_KEY` — already set (AbstractAPI Email Reputation, free tier)
- `GEMINI_API_KEY` — get one free at https://aistudio.google.com
- `SLACK_WEBHOOK_URL` — optional, for alerts
- `GOOGLE_SHEETS_ID` + `GOOGLE_SERVICE_ACCOUNT_FILE` — optional, for the blacklist

> ⚠️ AbstractAPI's free tier has a limited monthly quota. The email agent caches
> results per email in-memory for the life of the process to avoid duplicate calls.
> Avoid restarting the backend repeatedly while testing the same email.

### 2. Backend

```bash
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --port 8000
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit http://localhost:3000. The frontend calls the backend at the URL in
`frontend/.env.local` (`NEXT_PUBLIC_API_URL`, defaults to `http://localhost:8000`).

## API

`POST /analyze`

```json
{
  "client_name": "John Smith",
  "client_email": "john@example.com",
  "linkedin_url": "https://linkedin.com/in/...",
  "contract_text": "optional contract text"
}
```

Returns the full agent state: email verification, blacklist status, contract flags,
risk score/level/reasoning, and alert status.
