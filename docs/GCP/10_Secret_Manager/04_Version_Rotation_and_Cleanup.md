---
sidebar_position: 4
---

# Secret Versions, Rotation, and Cleanup

Secret rotation isn't as simple as just changing the old text. A safe rotation workflow has to handle: adding a version, deploying the new configuration, verifying it, disabling the old version, rolling back, and finally destroying it.

## Secret Version Lifecycle

```text
ENABLED → DISABLED → DESTROYED
   ▲          │
   └──────────┘
```

- **Enabled**: can be read by authorized workloads.
- **Disabled**: reads are suspended, but it can be re-enabled later.
- **Destroyed**: the secret material is permanently destroyed and cannot be recovered.

Disabling, observing, and verifying before destroying is safer than destroying permanently right away.

## A Safe Rotation Workflow

```text
1. Create a new version
2. Deploy consumers to the new version
3. Run smoke tests and monitor
4. Disable the old version
5. Wait for the rollback window
6. Destroy the old version if appropriate
```

Example: production is currently on version 2, and you want to rotate to version 3.

```text
Current deployment ──▶ DATABASE_PASSWORD:2
New secret version ──▶ DATABASE_PASSWORD:3
New deployment      ──▶ DATABASE_PASSWORD:3
```

Don't destroy version 2 before starting to deploy version 3 — otherwise you have no immediate rollback option if something goes wrong.

## Step 1: Add a New Version

Add a new version using standard input:

```bash
printf '%s' 'new-demo-value-only' \
  | gcloud secrets versions add DATABASE_PASSWORD \
      --data-file=-
```

List versions and confirm their status:

```bash
gcloud secrets versions list DATABASE_PASSWORD
```

Record the new version number, e.g. `3`. Don't rely solely on `latest` to determine whether the correct version is in use.

## Step 2: Deploy the New Version

Cloud Run environment variable example:

```bash
gcloud run deploy SERVICE_NAME \
  --image=IMAGE_URL \
  --region=asia-east1 \
  --set-secrets=DB_PASSWORD=DATABASE_PASSWORD:3
```

Run a smoke test and confirm:

- The application can connect to its dependent services.
- The new password or token actually works.
- The old version can still be rolled back to if necessary.
- No secret value appears in logs.

## Step 3: Disable the Old Version

Once you've confirmed all consumers have been updated, disable the old version:

```bash
gcloud secrets versions disable 2 \
  --secret=DATABASE_PASSWORD
```

Disabling is reversible. If you discover an old service still needs version 2, you can re-enable it:

```bash
gcloud secrets versions enable 2 \
  --secret=DATABASE_PASSWORD
```

## Step 4: Destroy Only After Verification

Only consider permanently destroying version 2 once you've confirmed no rollback, batch job, old revision, or other Project is still using it:

```bash
gcloud secrets versions destroy 2 \
  --secret=DATABASE_PASSWORD
```

Destroying makes the secret material unrecoverable. In production, this should be protected by a two-person review, ticket, or approval process — never run it without confirming consumers first.

## `latest` vs. Numeric Version

| Approach | Advantages | Risks |
| --- | --- | --- |
| `latest` | Simple to configure, easy to get the newest version | A new version could be picked up by workloads before it's tested |
| Numeric version | Traceable, can be rolled back, suits releases | Deployment must be updated whenever you rotate |

`latest` is fine for tutorials or local exploration; production should use a numeric version and fold version updates into your existing release process.

## Automated Rotation

You can automate rotation with a scheduled or event-driven process, for example:

```text
Cloud Scheduler / rotation trigger
             │
             ▼
Rotation worker
  ├── Create new credential at provider
  ├── Add new Secret version
  ├── Deploy or notify consumers
  ├── Verify health
  └── Disable old version
```

Before automating rotation, define:

- How the external service creates and revokes credentials.
- How the new version is verified to be usable.
- Which workloads must finish updating first.
- How to roll back on failure.
- How long before the old version is disabled and destroyed.
- What minimal permissions the rotation worker itself needs.

Adding a new version in Secret Manager doesn't mean the external service's API key has actually been rotated — both sides need to be updated.

## Temporary Secret Cleanup

In temporary environments, labels or an expiration policy can help with cleanup, but production Secrets shouldn't have an uncertain expiration set, to avoid being automatically and permanently deleted.

View the Secret:

```bash
gcloud secrets describe SECRET_ID
```

Delete an entire tutorial Secret:

```bash
gcloud secrets delete SECRET_ID
```

Before deleting, confirm:

- No Cloud Run revision uses it.
- No Cloud Run function, GKE workload, or VM depends on it.
- No scheduled job, batch job, or CI pipeline still reads it.
- The Secret isn't subject to a retention, audit, or compliance requirement.

## Rotation Checklist

- [ ] The new version is created before any consumer is modified.
- [ ] The deployment configuration uses an explicit numeric version.
- [ ] The new version has passed a smoke test.
- [ ] The old version is disabled first, not destroyed directly.
- [ ] A sufficient rollback window has been kept.
- [ ] Audit logs can trace version access.
- [ ] The rotation worker uses least privilege.
- [ ] Both the old version and the external provider's credential have been properly revoked.
- [ ] No secret value has been written to a log, ticket, or Git.

## Further Reading

- [Secret Manager best practices](https://cloud.google.com/secret-manager/docs/best-practices)
- [About rotation schedules](https://cloud.google.com/secret-manager/docs/rotation-recommendations)
- [Disable a secret version](https://cloud.google.com/secret-manager/docs/disable-secret-version)
- [Destroy a secret version](https://cloud.google.com/secret-manager/docs/destroy-secret-version)
- [Delay destruction of secret versions](https://cloud.google.com/secret-manager/docs/delay-destruction-of-secret-versions)
