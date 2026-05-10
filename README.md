# 🕵️ AI Log Detective
**Autonomous SRE Command Center | High-Fidelity Log Analysis**

AI Log Detective is a production-grade Site Reliability Engineering (SRE) platform. It doesn't just monitor logs—it understands them. Leveraging a stateful **LangGraph** multi-agent system, it ingests high-volume telemetry, identifies anomalous patterns, and generates precision code fixes in real-time.


## 🚀 The Vision
To bridge the gap between complex system telemetry and actionable insights through a minimalist, high-fidelity interface. Designed for engineers who value precision and performance.

## 🏗️ System Architecture
- **Ingestion Engine:** Built with **Python 3.12 (Asyncio)** for non-blocking, high-concurrency log streaming (100+ concurrent streams).
- **The Brain:** A stateful **LangGraph** agentic workflow that performs deep-dive Root Cause Analysis (RCA).
- **Intelligence Layer:** Integration with **MCP SDK** to allow the agent to "read" local source code and suggest context-aware patches.
- **Observability UI:** A custom-built, glassmorphic dashboard focused on minimalist data visualization and real-time "Pulse" monitoring.

## 🛠️ Technical Stack
- **Backend:** Python, FastAPI, LangChain/LangGraph
- **Frontend:** Next.js 15, Tailwind CSS, Shadcn/ui (Planned)
- **Data:** PostgreSQL (Vectorized Error Fingerprinting)
- **Infrastructure:** Docker, GitHub Actions (CI/CD)

## 🎯 Engineering Constraints
- **Low Latency:** Sub-5 second end-to-end RCA generation.
- **Security:** In-flight PII masking to ensure log privacy.
- **Reliability:** Persistent "Error Fingerprinting" to prevent redundant analysis of known issues.
