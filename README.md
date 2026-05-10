# 🕵️ AI Log Detective

An autonomous SRE tool designed to automate root cause analysis of production-grade logs using Agentic AI.

## 🚀 Overview
- **Problem:** Manual root cause analysis (RCA) is slow, leading to extended system downtime.
- **Solution:** A high-concurrency ingestion engine that leverages **LangGraph** and **MCP SDK** to categorize errors and suggest code fixes autonomously.

## 🛠️ Tech Stack
- **Language:** Python 3.12 (Asyncio)
- **AI Framework:** LangGraph, MCP SDK
- **Database:** PostgreSQL
- **Observability:** Grafana

## 🏗️ Project Structure
- `src/`: Core logic including the log ingestor and AI processor.
- `docs/`: Architecture diagrams and technical deep-dives.
- `tests/`: Unit and integration tests to ensure system reliability.