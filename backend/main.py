from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

from backend.graph import app as agent_graph

app = FastAPI(title="FreelanceGuard AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnalyzeRequest(BaseModel):
    client_name: str
    client_email: str
    linkedin_url: Optional[str] = ""
    contract_text: Optional[str] = None


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/analyze")
def analyze(req: AnalyzeRequest):
    initial_state = {
        "client_name": req.client_name,
        "client_email": req.client_email,
        "linkedin_url": req.linkedin_url or "",
        "contract_text": req.contract_text,
    }
    result = agent_graph.invoke(initial_state)
    return result
