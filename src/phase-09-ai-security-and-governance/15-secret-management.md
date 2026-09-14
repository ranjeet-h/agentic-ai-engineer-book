# Secret Management

> **Interview answer (say this first).** A secret is any credential that grants access — a model provider key, a database password, a signing key, a tool token. Keep secrets in a secret manager such as Vault, AWS Secrets Manager, or SSM Parameter Store, and inject them at runtime rather than baking them into images. Prefer short-lived, dynamically issued credentials so a leak expires on its own. Design rotation for zero downtime: issue the new version, keep both valid during a grace window, shift traffic, then revoke the old one. Scope every secret to one service and one tenant, and never let a secret reach the model, a prompt, a log, a trace, or a client. Use scannable prefixes, secret scanning in CI, canary tokens, and access alarms to detect leaks early.

## Why this exists

An AI agent calls many systems: the model provider, vector databases, tool APIs, internal services. Each needs a credential. Those credentials are the most attractive target in the system — a leaked provider key is immediate money, a leaked database password is a breach, and a leaked tool token lets an attacker act inside your network.

Agents make secret management harder than a normal service:

- **The model sits between the user and the tool.** If a secret is in the context, a prompt injection can ask the model to print it, and the model may comply. Secrets must never be in the prompt.
- **There are more credentials.** Each tool, MCP server, model, and datastore adds one, and they multiply per tenant.
- **Agent code is written quickly.** Keys get pasted into notebooks, `.env` files, and container images, then copied to laptops and CI.
- **Long-lived credentials are the norm.** A key issued at launch may still work years later, long after the person who created it left.

Secret management is the discipline that removes those problems: one controlled place to store, one path to inject, short lifetimes, scoped access, and a way to detect a leak.

> **Note:**
>
> **The secret never belongs in the model's world.** The agent should reference a capability ("send email"), not possess the credential. Fetch the secret in the executor, at the moment of use, and keep it out of context, logs, and responses.

## Start from zero

| Word | Plain meaning |
| --- | --- |
| **Secret** | A credential granting access: key, password, token, certificate, private key. |
| **Secret manager** | A service that stores secrets, controls access, and audits use. |
| **Vault** | HashiCorp's secret manager; supports static and dynamic secrets. |
| **AWS Secrets Manager** | Managed secret store with rotation support. |
| **Parameter Store** | AWS SSM feature for config and secrets, with encryption and IAM. |
| **Namespace / path** | The hierarchy a secret lives under, such as `prod/model/openai`. |
| **Scope** | Which service or tenant may read a secret. |
| **Injection** | Getting the secret into a running process at startup or use time. |
| **Baked-in secret** | A secret written into an image, config file, or build artifact. |
| **Dynamic secret** | A credential generated on demand with a short lifetime. |
| **Lease / TTL** | How long a dynamic credential stays valid. |
| **Rotation** | Replacing a secret with a new value or version. |
| **Version** | One value of a secret; managers keep several during rotation. |
| **Grace window** | A period when both old and new versions work. |
| **Revocation** | Making a secret invalid immediately. |
| **Least privilege** | Reading only the secrets a workload needs, on only its resources. |
| **Bootstrap secret** | The initial credential used to obtain all the others. |
| **Secret zero** | The chicken-and-egg problem: what authenticates the first fetch? |
| **Redaction** | Masking secrets before they are logged or returned. |
| **Secret scanning** | Searching code, logs, and images for leaked credentials. |
| **Canary token** | A fake credential that alerts when someone uses it. |
| **Prefix** | A visible, scannable start of a credential, such as `sk_live_` or `AKIA`. |

Two distinctions carry the topic.

**Config vs secret.** A model name, timeout, or feature flag is config and safe to read in a pull request. A provider key, database password, or signing key is a secret and must never be readable by anyone without a legitimate need. Mixing them is how secrets end up in a public repo.

**Static vs dynamic.** A static secret is a long-lived value you must rotate manually. A dynamic secret is generated on demand and expires, so a leak is a short-lived incident. Prefer dynamic wherever the backend supports it.

## The core idea

Think of a **hotel key card again, but for machines**. The service does not carry a master key. It asks the front desk (secret manager) for a card that opens one door, valid for a short time, and the desk logs the request. If the card is lost, it expires, and the desk can cancel it immediately.

The agent is the guest. It never sees the master key, and ideally not even the room key.

```mermaid
flowchart TD
    U["User / agent request"] --> A["Agent runtime<br/>(model context)"]
    A -->|"tool: send_email"| G["Tool executor / gateway"]
    G -->|"fetch at use time<br/>scoped identity"| SM["Secret manager<br/>Vault / Secrets Manager"]
    SM -->|"short-lived secret<br/>+ lease"| G
    G -->|"call with credential"| T["External tool / DB"]
    SM -.-> AU["Access audit log"]
    A -.->|"NEVER"| X["secret in prompt,<br/>memory, log, or response"]
    G -->|"redacted logs"| L["Logs / traces"]
```

The two load-bearing ideas are **runtime injection** — the secret is fetched where it is used, not built into the artifact — and **short lifetimes** — the credential expires, so a leak has a small window.

| Approach | Leak window | Rotation cost | Verdict |
| --- | --- | --- | --- |
| Hard-coded in code | Forever | Rebuild and redeploy everywhere | Never |
| In the container image | Forever | Rebuild image, redistribute | Never |
| Environment variable from CI | Long | Redeploy each consumer | Weak; leaks in dumps |
| Mounted file from secret manager | Until rotated | Re-mount on rotation | Good |
| Fetched at runtime with short TTL | Minutes | Automatic | Best |
| Dynamic credential per request | Seconds to minutes | Automatic, no shared secret | Best where supported |

## How it works

1. **Inventory the secrets.** List every credential, who uses it, which environment, and which backend can issue it. You cannot scope what you have not listed.
2. **Store in a secret manager.** No secrets in code, images, tickets, chat, or personal notes. The manager is the single source of truth.
3. **Give the workload an identity.** A cloud role, Kubernetes service account, or SPIFFE (Secure Production Identity Framework for Everyone — a standard for issuing verifiable workload identities) authenticates the fetch. This solves secret zero: the platform identity is the credential.
4. **Scope reads narrowly.** One path and one permission per workload and tenant. A dev identity must not read production secrets.
5. **Inject at runtime.** Fetch at startup or use time and keep the value in memory. Do not bake it into the image or a build artifact.
6. **Prefer dynamic, short-lived credentials.** For databases and cloud roles, ask the manager to generate a credential with a short TTL. Cache only briefly.
7. **Rotate without downtime.** Write a new version, keep the old valid during a grace window, update consumers, watch for the old version to go unused, then revoke it.
8. **Make revocation instant.** A revoked version must fail on the next request. Keep the record for the audit trail but stop accepting it.
9. **Isolate secrets from the model.** The model gets a tool name, never the credential. Tool arguments and prompts must not contain secrets.
10. **Redact before logging or returning.** Mask credential-shaped fields at the logging boundary and scan model output before it reaches a user or client.
11. **Detect leaks continuously.** Scan code and CI with tools that match scannable prefixes, plant canary tokens, and alarm on access from unexpected identities.
12. **Respond with a runbook.** On a suspected leak: revoke, inventory copies, replace, review access logs for misuse, and write the timeline. Speed of revocation limits the damage.

> **Warning:**
>
> **Rotation is not complete when you issue the new secret.** It is complete when the old version is unused and revoked. Revoke too early and callers break; revoke never and you still have a live leak.

## The syntax you will use

**Read a secret from AWS Secrets Manager and cache it briefly.** Fetching per request is slow and expensive; caching forever recreates a static secret.

```python
import boto3, json, time

client = boto3.client("secretsmanager", region_name="us-east-1")
_cache: dict[str, tuple[float, str]] = {}

def provider_key(path: str, ttl_s: int = 300) -> str:
    now = time.time()
    hit = _cache.get(path)
    if hit and now - hit[0] < ttl_s:
        return hit[1]
    payload = client.get_secret_value(SecretId=path)["SecretString"]
    value = json.loads(payload)["api_key"]
    _cache[path] = (now, value)
    return value
```

**Read from Vault's KV v2 store.** `path` is relative to the KV mount point (the default mount is `secret`), and the secret's own key/value pairs sit under `data`.

```python
import hvac

vault = hvac.Client(url="https://vault.internal:8200")
# mount-relative path: this reads the KV entry at secret/model/openai
secret = vault.secrets.kv.v2.read_secret_version(path="model/openai")["data"]["data"]
provider_key = secret["api_key"]
```

**Issue a dynamic database credential.** It expires, so a leak is a short incident rather than a permanent one.

```python
creds = vault.secrets.database.generate_credentials(name="agent-ro")
# {"username": "...", "password": "...", "lease_duration": 900}
```

**Read an encrypted Parameter Store value.** `WithDecryption=True` asks SSM to decrypt the SecureString.

```python
import boto3

ssm = boto3.client("ssm", region_name="us-east-1")
token = ssm.get_parameter(Name="/prod/tools/crm/token",
                          WithDecryption=True)["Parameter"]["Value"]
```

**Inject at runtime instead of baking into the image.** The Dockerfile has no secret; the process fetches it.

```dockerfile
# NO: ENV OPENAI_API_KEY=sk-live-...   <- baked into an image layer forever
# NO: ARG OPENAI_API_KEY              <- visible in image history
# YES: the app reads from the secret manager at startup, using its platform identity
```

**Scope a read with an IAM policy.** One secret, one action, one workload.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["secretsmanager:GetSecretValue"],
      "Resource": "arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/model/openai-*"
    }
  ]
}
```

**Rotate with a grace window and revoke.** Old and new work briefly; only the new one survives.

```python
class Secret:
    def __init__(self, path: str, value: str):
        self.path = path
        self.versions = {1: value}
        self.current = 1
        self.retiring: list[int] = []

    def rotate(self, new_value: str) -> int:
        self.retiring.append(self.current)      # keep old valid during grace
        self.current += 1
        self.versions[self.current] = new_value
        return self.current

    def resolve(self, version: int) -> str:
        if version == self.current or version in self.retiring:
            return self.versions[version]
        raise KeyError("retired")

    def revoke(self, version: int) -> None:
        if version in self.retiring:
            self.retiring.remove(version)
        self.versions.pop(version, None)
```

**Scope checks in code.** Even with the manager, verify the caller is entitled to this path.

```python
SCOPES = {"prod/model/openai": {"gateway"}, "prod/db/analytics": {"indexer"}}

def check_scope(path: str, service: str) -> None:
    if service not in SCOPES.get(path, set()):
        raise PermissionError(f"{service} not scoped to {path}")
```

**Redact at the logging boundary.** A deny list of field names beats remembering at each call site.

```python
SENSITIVE = {"authorization", "api_key", "x-api-key", "password", "token"}

def redact(headers: dict) -> dict:
    return {k: ("***" if k.lower() in SENSITIVE else v) for k, v in headers.items()}
```

**Scan for leaked secrets by prefix.** Real scanners (gitleaks, trufflehog) do this across history and images; the idea is the same.

```python
PREFIXES = ("sk_live_", "sk-live-", "AKIA", "ghp_", "-----BEGIN PRIVATE KEY-----")

def leaked_prefixes(text: str) -> list[str]:
    return [p for p in PREFIXES if p in text]
```

**A canary token that should never be used.** If an alarm fires, you know a specific copy leaked.

```python
CANARY = "sk_live_canary_do_not_use_7f3a2b1c"
# Store it in the repo and in CI; alert on any authentication attempt with it.
```

## Examples: simple to real

**Example 1 — scope denies a service that should not read a secret.**

```python
def read(path: str, service: str) -> str:
    check_scope(path, service)
    return "<manager returned the secret>"      # stand-in for the API call

print("gateway reads openai:", read("prod/model/openai", "gateway"))
try:
    read("prod/model/openai", "indexer")
except PermissionError as exc:
    print("indexer blocked:", exc)
```

Illustrative output:

```text
gateway reads openai: <manager returned the secret>
indexer blocked: indexer not scoped to prod/model/openai
```

One secret per service and tenant means a compromise of the indexer does not hand over the model provider key.

**Example 2 — the value is injected at runtime, not built in.**

```python
env: dict = {}
env["OPENAI_API_KEY"] = provider_key("prod/model/openai")   # fetched, not baked
print("injected at runtime:", "OPENAI_API_KEY" in env)
```

Illustrative output:

```text
injected at runtime: True
```

The image contains code, not the credential. A stolen image is no longer a stolen key.

**Example 3 — rotation with a grace window, then revocation.**

```python
s = Secret("prod/model/openai", "sk-live-v1")
old = s.current
s.rotate("sk-live-v2")
print("old valid in grace:", s.resolve(old) == "sk-live-v1")
print("new valid          :", s.resolve(s.current) == "sk-live-v2")
s.revoke(old)
print("old revoked        :", old not in s.versions)
```

Illustrative output:

```text
old valid in grace: True
new valid          : True
old revoked        : True
```

Callers migrate gradually, and the old version is withdrawn only once it stops being used.

**Example 4 — a secret never reaches the log or the model.**

```python
headers = {"authorization": "Bearer sk-live-v1", "model": "gpt-4o-mini"}
log_line = redact(headers)
print(log_line)
print("secret in log:", "sk-live-v1" in str(log_line))
```

Illustrative output:

```text
{'authorization': '***', 'model': 'gpt-4o-mini'}
secret in log: False
```

Apply the same rule to prompts, tool arguments, traces, and model output. If a secret enters the context, assume injection can extract it.

**Example 5 — detect a leaked credential by its prefix.**

```python
print(leaked_prefixes("token sk_live_abc leaked in a gist"))
print(leaked_prefixes("no credentials here"))
```

Illustrative output:

```text
['sk_live_']
[]
```

Prefixes make leaked keys findable in code, images, CI logs, and issue trackers. Without one, you cannot search.

**Example 6 — a dynamic credential expires on its own.** The lease duration is the window an attacker gets.

```python
dynamic = {"username": "agent-ro-7f3a", "password": "...", "lease_duration_s": 900}
print("ttl minutes:", dynamic["lease_duration_s"] // 60)
```

Illustrative output:

```text
ttl minutes: 15
```

A leaked 15-minute credential is a minor incident; a leaked five-year one is a breach. Renew before expiry, and treat refresh failure as retryable.

## In production

- **One store, one path per secret.** Keep secrets in the secret manager under a clear hierarchy (`prod/model/openai`, `prod/tools/crm/token`). No secrets in code, images, tickets, or chat.
- **Inject at runtime; never bake.** The image should contain code. Environment variables from CI are weaker than runtime fetch because they leak through dumps and child processes.
- **Scope reads per service and tenant.** One identity per workload with permission for only its secrets. A shared key destroys attribution and makes revocation global.
- **Prefer dynamic credentials.** Where the backend supports it, generate a short-lived credential per session. Renew before expiry and treat refresh failure as a normal retry.
- **Rotate with a grace window, and verify the old version is unused before revoking.** Watch last-used timestamps, keep both valid briefly, then revoke. A hard cutover causes an outage and teaches teams to avoid rotation.
- **Keep secrets out of the model entirely.** Never place a credential in a prompt, system message, tool description, or tool argument. Fetch in the executor and pass a capability, not the key.
- **Redact at the logging boundary and test it.** Traces and crash dumps are common leaks. Add a test that runs representative traffic and asserts the raw secret never appears in captured output.
- **Protect the secret manager itself.** It is now the crown jewel. Restrict who can read, enable audit logging, require MFA (multi-factor authentication — a second factor beyond the password) for human access, and alarm on unusual reads.
- **Scan continuously, not once.** Run secret scanning in pre-commit, CI, and over images and history. Rotate any hit; deleting the commit is not enough because history and forks remain.
- **Use canary tokens.** A fake credential in a repo or config tells you when a specific copy leaks and where it was used.
- **Monitor for post-revocation use.** If a revoked, old, or canary credential is used, treat it as an active incident and trace the source.
- **Rehearse the leak runbook.** Revoke, inventory copies, replace, review access logs, notify if data was accessed, and write a blameless timeline. Speed of revocation is what limits damage.

## Interview questions

### 1. Where should secrets live, and where should they never live?

**Answer.** In a dedicated secret manager such as Vault, AWS Secrets Manager, or SSM Parameter Store, fetched at runtime by an identity the platform vouches for. They should never live in source code, container images, build args, environment variables checked into a repo, tickets, chat, notebooks, or in the model's context. If a secret can be read from an artifact or a prompt, it is already exposed.

**Follow-up: "Why are environment variables weak?"** They leak through crash dumps, child processes, debug output, and orchestration dashboards, and they are hard to rotate because they are baked into deployments. They are better than hard-coding, but a runtime fetch is better.

**Trap.** Saying "Kubernetes secrets are fine." By default they are base64, not encryption, and readable by anyone with namespace access. Encrypt at rest and restrict RBAC.

### 2. What is a dynamic secret and why prefer it?

**Answer.** A secret manager generates a credential on demand with a short TTL — for example, a database user valid for 15 minutes or a cloud role assumed via OIDC federation (OpenID Connect: the platform exchanges a signed token for short-lived credentials). If it leaks, it expires quickly, so the window for misuse is small, and there is no long-lived shared password to rotate. Where the backend supports it, dynamic beats static.

**Follow-up: "What breaks with very short TTLs?"** Long-running jobs must refresh mid-run, and clock skew can expire a credential early. Build clients to renew before expiry and treat refresh failure as a retryable error.

**Trap.** Generating dynamic credentials but caching them forever. That recreates a static secret with extra steps.

### 3. How do you rotate a secret without downtime?

**Answer.** Write a new version, keep the old version valid for a grace window, and roll consumers gradually. Track last-used time per version and revoke the old one only after it is idle for the full window. For dynamic credentials, the manager handles it. Never switch in a single step.

**Follow-up: "How do you know migration is complete?"** Version metadata and audit logs show which version each caller used and when. Revoke when the old version has no recent use.

**Trap.** Revoking the old secret the moment the new one is issued. Callers that have not restarted fail, and the team learns to fear rotation.

### 4. How do you stop secrets from reaching the model or a user?

**Answer.** Never put credentials in prompts, system messages, tool descriptions, or tool arguments. The agent references a capability, and the executor fetches the secret server-side at the moment of use. Redact model output and API responses before they reach a user or client, and scan output for credential shapes. Assume anything in context can be extracted by a prompt injection.

**Follow-up: "What if a tool needs to show a masked value to the user?"** Return a masked form like `****1234` that carries no usable secret. If the full value must be shown once, do it through a secure channel outside the model.

**Trap.** Passing an API key as a tool argument so the model can "call the API." That places the secret in context and in every logged tool call.

### 5. How do you scope secret access?

**Answer.** Give each workload its own identity and a policy that allows reading only the paths it needs, on only the resources it touches, in only its environment. Use conditions such as source role or network where possible. Separate dev, staging, and production accounts and paths so a dev compromise cannot reach production secrets.

**Follow-up: "Why is one shared key for all services bad?"** It destroys attribution and blast-radius control. You cannot tell which service misbehaved, and revoking it breaks everything at once.

**Trap.** Granting `secretsmanager:*` because a narrow policy was inconvenient. Broad secret read is effectively broad access to the whole system.

### 6. How would you detect a leaked secret?

**Answer.** Several layers. Scannable prefixes so code, image, and log scanners can find them; secret scanning in pre-commit and CI over history and artifacts; canary tokens that alert on use; audit-log monitoring for reads from unexpected identities; and alarms when a revoked or old version is used after revocation. Detection is only useful if something acts on it, so wire alerts to a responder.

**Follow-up: "Is deleting the commit enough?"** No. History, forks, caches, and CI logs may retain it. The secret is compromised the moment it is committed; rotate it, then clean up.

**Trap.** Scanning only the working tree. Most leaks live in git history and in built images.

### 7. What is "secret zero," and how do you solve it?

**Answer.** Secret zero is the bootstrap problem: the workload needs a credential to fetch its credentials. You solve it with an identity the platform already provides — a cloud IAM role attached to the workload, a Kubernetes service account with OIDC federation, or an mTLS certificate — so the first fetch is authenticated without a stored long-lived secret.

**Follow-up: "What about on-prem or CI?"** Use OIDC federation from the CI provider to assume a short-lived cloud role, or a platform identity, instead of a stored cloud key in the repository.

**Trap.** Solving secret zero with a long-lived bootstrap token in the image. That just moves the original problem into the artifact.

### 8. Walk through your response when a production secret leaks.

**Answer.** Revoke immediately, then investigate. Inventory every place the secret exists, issue a replacement, and deploy it through the normal path. Review the access audit log for use after the leak, looking for unusual identities, locations, or volumes. Rotate any downstream secret the key could reach, notify affected parties if data was accessed, and write a blameless timeline. Revocation speed is what limits damage.

**Follow-up: "Why not rotate first and audit later?"** You should do both, but skipping the audit means you never learn whether data left the building. If the credential could read data, you must check.

**Trap.** Deleting the leaked key from the repo and calling it resolved without revoking it. The credential is still live.

## Remember this

- **Secrets live in a secret manager and are injected at runtime.** Never in code, images, prompts, logs, or clients.
- **Prefer short-lived, dynamic credentials.** A leak that expires is a small incident.
- **Scope one secret to one service and tenant**, and solve secret zero with a platform identity, not a stored token.
- **Rotate with a grace window; revoke only when the old version is unused.** Delete the old version and the record stays for audit.
- **Detect leaks with scannable prefixes, CI scanning, canary tokens, and access alarms** — then act on the alerts.
