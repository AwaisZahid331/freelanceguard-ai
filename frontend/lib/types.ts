export type AnalyzeResult = {
  client_name: string;
  client_email: string;
  linkedin_url: string;
  contract_text: string | null;

  email_verified: boolean;
  email_check_note: string;

  blacklisted: boolean;
  blacklist_reason?: string;
  blacklist_note: string;

  contract_flags: string[];
  contract_risk: number;
  contract_summary: string;

  risk_score: number;
  risk_level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  risk_reasoning: string;

  alert_sent: boolean;
  alert_note: string;
};
