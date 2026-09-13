from langgraph.graph import StateGraph, END

from backend.models import AgentState
from backend.agents.email_agent import email_agent
from backend.agents.blacklist_agent import blacklist_agent
from backend.agents.contract_agent import contract_agent
from backend.agents.risk_agent import risk_agent, ALERT_THRESHOLD
from backend.agents.alert_agent import alert_agent

graph = StateGraph(AgentState)

graph.add_node("email_check", email_agent)
graph.add_node("blacklist_check", blacklist_agent)
graph.add_node("contract_analysis", contract_agent)
graph.add_node("risk_scoring", risk_agent)
graph.add_node("send_alert", alert_agent)

graph.set_entry_point("email_check")
graph.add_edge("email_check", "blacklist_check")
graph.add_edge("blacklist_check", "contract_analysis")
graph.add_edge("contract_analysis", "risk_scoring")
graph.add_conditional_edges(
    "risk_scoring",
    lambda s: "send_alert" if s["risk_score"] >= ALERT_THRESHOLD else END,
    {"send_alert": "send_alert", END: END},
)
graph.add_edge("send_alert", END)

app = graph.compile()
