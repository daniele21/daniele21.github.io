# Public Claims and Evidence Inventory

Status: active  
Owner: personal landing product experience  
Updated: 2026-08-21  

This document serves as the single evidence baseline for all public claims, metrics, system statuses, and capability statements displayed across the portfolio and landing page.

---

## Evidence Record Schema

Every public benchmark, performance claim, or operational metric must adhere to the following schema:

```json
{
  "id": "string (unique claim identifier)",
  "category": "performance | privacy | architecture | reliability",
  "status": "verified | needs_source | conceptual | remove",
  "statement": "string (public claim text)",
  "workload": "string (description of workload/task)",
  "device": "string (hardware configuration)",
  "model": "string (model name and architecture)",
  "quantization": "string (e.g. Q4_K_M, 4-bit AWQ, MLX 4bit)",
  "runtime": "string (e.g. llama.cpp, MLX, ONNX, whisper.cpp)",
  "observedResult": "string (measured metrics: latency, throughput, memory)",
  "limitations": "string (known boundary or limitation)",
  "sourceUrl": "string (repository, benchmark run, or artifact reference)",
  "verifiedDate": "YYYY-MM-DD"
}
```

---

## Claim Inventory and Classification

### 1. Positioning & Strategy Claims

| ID | Claim / Statement | Classification | Context & Limitation | Source Reference |
|---|---|---|---|---|
| **POS-01** | `Local AI first != Local AI only` | `verified` | Core strategic thesis. The outcome can be Local, Hybrid, or Cloud. | `08 — Local AI Strategy, Positioning & Storytelling.md` |
| **POS-02** | `Find the boundary with evidence, not ideology.` | `verified` | Positioning motto and guiding empirical principle. | `08 — Local AI Strategy, Positioning & Storytelling.md` |
| **POS-03** | "Some workloads benefit from staying local: sensitive data stays closer, dependencies shrink, and you gain more control. Others belong in the cloud." | `verified` | Workload-driven boundary framing; avoids anti-cloud bias. | `08 — Strategy & Positioning` |
| **POS-04** | "Local AI is always cheaper and more secure." | `remove` | Prohibited overclaim. Trade-offs must be evaluated per workload. | Guardrails in doc `08`, §11 |

---

### 2. Infrastructure & Systems

| ID | System | Public Role | Classification | Current Maturity / Limitation |
|---|---|---|---|---|
| **SYS-01** | **Local LLM Server** | Reusable OpenAI-compatible local execution layer (GGUF / MLX). | `verified` | Active development. Multi-model lifecycle, streaming, telemetry. Tested on macOS Apple Silicon & Linux. |
| **SYS-02** | **Android Local LLM Harness** | On-device inference laboratory & gateway for Android. | `verified` | Prototype / active. Measures thermal, battery, RAM constraints. AIDL cross-app service is an architectural target, not finished. |
| **SYS-03** | **Local ASR Server** | Private speech-to-text primitive (Whisper engine). | `verified` | Active development. Exposes transcription endpoints for local meeting and voice workflows. |

---

### 3. Application Test-Beds

| ID | Application | Research Question | Classification | Proof & Boundaries |
|---|---|---|---|---|
| **APP-01** | **RedactGuard** | "Can sensitive document processing stay local?" | `verified` | Local LLM inference for configurable PII detection, human review, controlled export. Not a compliance warranty. |
| **APP-02** | **Aura Finance** | "Can personal financial transactions be understood and categorized on-device?" | `verified` | Local LLM semantic parsing for merchant recognition & categorization + deterministic balance/ledger logic. |
| **APP-03** | **ClosedRoom** | "Can meeting intelligence stay inside the room?" | `verified` | Local recording, ASR, speaker context, and notes on macOS. External cloud LLM fallback is opt-in, not default. |

---

### 4. Observability & Performance Evidence

| ID | Component | Metric / Display | Classification | Bounded Parameters |
|---|---|---|---|---|
| **OBS-01** | **Performance Lab** | Model × Quantization × Runtime × Configuration × Device optimization. | `verified` | Demonstrates multidimensional trade-offs (Latency, Throughput, Memory, Quality) on specific hardware (e.g. M-series Apple Silicon, Snapdragon). |
| **OBS-02** | **Traffic Monitoring** | Network boundary observability (Observe, do not inspect). | `verified` | Verifies data boundaries and unknown network calls without payload packet inspection. |
| **OBS-03** | Generic mock sparklines without execution identity | Unqualified numbers | `remove` / `contextualize` | Any displayed benchmark metric must carry device and model context. |

Landing rule: Plane 04 may explain measurement dimensions and link to evidence systems, but it must not display a numeric result unless the public record includes model, quantization, runtime, generation configuration, device, workload, method, date, result, and limitation. The current landing therefore publishes no decorative hardware-run metrics.

---

## Asset Verification

All referenced landing assets have been verified in the local workspace:
- Portrait: `/public/images/profile-photo.jpg` (verified)
- Ecosystem Diagram: `/public/images/ecosystem.png` & `/public/images/ecosystem-map.png` (verified)
- RedactGuard Logo: `/public/images/redact-guard/logo.png` (verified)
- Aura Finance Logo: `/public/images/aura/logo.png` (verified)
- ClosedRoom Logo: `/public/images/closedroom/logo.png` (verified)
- Local LLM Server overview: `/public/images/local-llm-server/overview.png` (verified)
- Android Local LLM Harness overview: `/public/images/harness/harness-overview.png` (verified)
- Use-case previews: RedactGuard review, Aura payment detection, and ClosedRoom meeting analysis (verified)
- Signatures: `/public/images/sign_1.png`, `sign_2.png`, `sign_dark.png` (verified)
