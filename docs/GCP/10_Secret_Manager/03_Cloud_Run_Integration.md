---
sidebar_position: 3
---

# Use Secrets in Cloud Run and Cloud Run Functions

Cloud Run and Cloud Run functions can expose a Secret Manager version to a running container. There are two common approaches:

- Provide it as an environment variable.
- Provide it as a mounted file.

Both approaches require the runtime Service Account to have the Secret Manager Secret Accessor role.

## Architecture

```text
Secret Manager
    │
    │ secretAccessor
    ▼
Cloud Run runtime Service Account
    │
    ├── Environment variable
    └── Mounted file
          │
          ▼
      Application code
```

The deployer's account is only responsible for configuring the deployment; the running container reads the Secret using the runtime Service Account.

## Step 1: Create a Runtime Service Account

```bash
gcloud iam service-accounts create app-runtime \
  --project=PROJECT_ID \
  --display-name="Application runtime identity"
```

Set the variable:

```bash
RUNTIME_SERVICE_ACCOUNT=app-runtime@PROJECT_ID.iam.gserviceaccount.com
```

Grant that identity permission to read a specific Secret:

```bash
gcloud secrets add-iam-policy-binding DATABASE_PASSWORD \
  --project=PROJECT_ID \
  --member=serviceAccount:RUNTIME_SERVICE_ACCOUNT \
  --role=roles/secretmanager.secretAccessor
```

## Step 2: Reference a Secret as an Environment Variable

Using `gcloud run deploy`:

```bash
gcloud run deploy SERVICE_NAME \
  --image=IMAGE_URL \
  --region=asia-east1 \
  --service-account=RUNTIME_SERVICE_ACCOUNT \
  --set-secrets=DB_PASSWORD=DATABASE_PASSWORD:1
```

The format is:

```text
ENVIRONMENT_VARIABLE=SECRET_NAME:VERSION
```

The application can read the value from the environment variable:

```python
import os


database_password = os.environ["DB_PASSWORD"]
```

Never print `database_password` in startup messages, health checks, exceptions, or debug logs.

## Step 3: Configure in the Console

1. Open **Cloud Run**.
2. Create a new Service or select an existing one.
3. Expand **Container(s), Volumes, Networking, Security**.
4. Go to **Variables and Secrets**.
5. Click **Reference a secret**.
6. Enter the environment variable name, e.g. `DB_PASSWORD`.
7. Select the Secret `DATABASE_PASSWORD`.
8. Choose the version to use.
9. Confirm the Service identity is the expected runtime Service Account.
10. Click **Deploy**.

Every change to a secret reference produces a new Cloud Run revision. After deploying, verify that the new revision is actually using the expected version.

## Mounted Secret File

Some programs need to read a credential, JSON configuration, or multi-line content. In these cases, mount the Secret as a file instead of putting it in an environment variable:

```text
/mnt/secrets/database-password
```

The flow in the Cloud Run Console:

1. In the service configuration, select **Volumes**.
2. Create a Secret volume.
3. Select the Secret and version.
4. Specify the mount path, e.g. `/mnt/secrets`.
5. Go back to **Volume mounts** and mount the volume into the container.
6. Avoid a mount path that overwrites a directory the container already needs.
7. Deploy the new revision.

The application reads the file:

```python
from pathlib import Path


secret_file = Path("/mnt/secrets/database-password")
database_password = secret_file.read_text().strip()
```

Don't mount a secret into restricted paths like `/dev`, `/proc`, or `/sys`, and don't let the mount path overwrite files the application already needs.

## Cloud Run Functions

Cloud Run functions (formerly Cloud Functions 2nd gen) uses the same Cloud Run execution model. When creating or updating a function, in the Console's secrets settings you can:

- Expose a Secret version as an environment variable.
- Mount a Secret version as a file.
- Specify the runtime Service Account the function uses.

Never write a Secret Manager value into the function's source code or into a deployment file such as `requirements.txt`.

## Pin a Version for Deployment

Production deployments should use an explicit numeric version:

```bash
--set-secrets=DB_PASSWORD=DATABASE_PASSWORD:3
```

Using `latest` is convenient, but once someone adds a new version, the next instance might pick up a value that hasn't been fully tested. Pinning a version makes configuration traceable and easier to roll back:

```text
Revision A → DATABASE_PASSWORD:2
Revision B → DATABASE_PASSWORD:3
```

If version 3 turns out to be a problem, you can shift traffic back to Revision A and investigate the new version separately.

## Deployment Checklist

- [ ] The runtime Service Account has been created.
- [ ] Only the required Secret Accessor permission is granted.
- [ ] The secret reference uses an explicit version.
- [ ] No secret value has been placed in the Dockerfile, source code, or CI logs.
- [ ] The environment variable or mount file's name won't be accidentally logged.
- [ ] The new revision has passed a smoke test.
- [ ] The Cloud Run region has been confirmed compatible with other services' design.
- [ ] A secret rotation and rollback process is in place.

## Troubleshooting

### Container cannot access the secret

Check, in order:

1. Whether Cloud Run is using the correct Service Account.
2. Whether that Service Account has `secretAccessor` on this specific Secret.
3. Whether the Secret version is `ENABLED`.
4. Whether the Secret Manager API is enabled.
5. Whether the Project used for deployment matches the Project where the Secret lives.
6. Whether the environment variable or mounted path spelling is consistent.

### Secret works locally but fails in Cloud Run

Locally you might be using your personal ADC or a different gcloud account; Cloud Run uses the runtime Service Account. Don't assume Cloud Run automatically has the same permissions just because it works locally.

## Further Reading

- [Configure secrets for Cloud Run services](https://cloud.google.com/run/docs/configuring/services/secrets)
- [Configure secrets for Cloud Run functions](https://cloud.google.com/functions/docs/configuring/secrets)
- [Cloud Run service identity](https://cloud.google.com/run/docs/securing/service-identity)
