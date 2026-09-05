---
sidebar_position: 0
---

# Introduction to Secret Manager

Secret Manager is a Google Cloud service for storing and managing sensitive information, such as API keys, database passwords, credentials, and OAuth tokens.

When an application needs a password, it should not be hard-coded into source code, `.env` files, Docker images, or a Git repository. A safer approach is to store the secret in Secret Manager and let a Service Account with clearly scoped permissions read it at runtime.

## Why Not Put Secrets in Code?

The following practices make data leaks much more likely:

```python
# Don't do this
DATABASE_PASSWORD = "real-password"
API_KEY = "real-api-key"
```

Common risks include:

- Git history permanently retains anything that was ever committed.
- Docker image layers may retain a secret.
- Logs, error messages, or notebook output can accidentally print a secret.
- Shared `.env` files or service account keys are hard to trace back to who used them.
- Rotating a password requires modifying, testing, and redeploying code.

Secret Manager separates sensitive data from code and provides IAM, versioning, auditing, and rotation capabilities.

## Resource Model

```text
Google Cloud Project
└── Secret
    ├── Secret metadata
    ├── Version 1
    ├── Version 2
    └── Version 3
```

### Secret

A Secret is the resource itself, containing a name, labels, replication settings, IAM policy, and other metadata. Secret metadata should never contain the secret value.

### Secret Version

The actual sensitive content lives in a Secret version. Every time you add a value, a new version is created; existing versions are never modified in place.

A version can be:

- **Access**: read its content.
- **Disable**: suspend use, but it can be restored.
- **Enable**: re-enable it.
- **Destroy**: permanently destroy the secret material — this cannot be undone.

### `latest` and Numeric Versions

Secret Manager lets you reference:

```text
latest
1
2
3
```

`latest` is convenient for testing, but production deployments should generally pin to an explicit numeric version so that the configuration used by each deployment is traceable and can be rolled back.

## Secret Manager and Environment Variables

An environment variable is not Secret Manager. An environment variable is simply one way for an application to obtain configuration.

```text
Secret Manager
      │
      ├── Cloud Run environment variable
      ├── Cloud Run mounted file
      └── Application client library
```

Secret Manager is responsible for storage, authorization, and versioning; Cloud Run or the application is responsible for retrieving the value at runtime.

## Replication

When you create a Secret, you choose a replication policy:

- **Automatic replication**: Google manages where the data is replicated, which keeps the setup simple.
- **User-managed replication**: you specify the allowed replication locations, which suits environments with data residency, regulatory, or governance requirements.

The replication policy is a separate concept from the region where your application is deployed. Consider data governance, availability, latency, and cost together when designing this.

## Security Capabilities

Secret Manager provides:

- IAM-based access control for individual secrets.
- Adding, disabling, enabling, and destroying secret versions.
- Cloud Audit Logs to track who accessed which version.
- Labels and annotations to manage environment, owner, and purpose.
- Automatic or user-managed replication.
- Integration with Cloud Run, Cloud Run functions, GKE, Compute Engine, and other services.

Secret Manager is not a complete application configuration system. Non-sensitive configuration can still use regular config files, environment variables, or a Runtime Config-style tool — it doesn't all need to live in Secret Manager.

## Recommended Architecture

```text
Developer / CI/CD
      │  create or add version
      ▼
Secret Manager
      │  IAM: secretAccessor
      ▼
Runtime Service Account
      │
      ▼
Cloud Run / Cloud Run functions / GKE / VM
```

Deployers need permission to create versions; the running service only needs read permission. These two identities should be kept separate.

## What You Will Learn

1. Create a Secret and its first Secret version.
2. Read a secret using the Console, `gcloud`, and the Python client library.
3. Grant least-privilege access to Users and Service Accounts.
4. Inject a Secret into Cloud Run or Cloud Run functions.
5. Design a workflow for version rotation, rollback, disabling, and cleanup.
6. Reduce risk through Audit Logs and environment isolation.

## Prerequisites

Before you begin, make sure you have:

- A Google Cloud Project with billing enabled.
- The Google Cloud CLI installed.
- Run `gcloud auth login`.
- A basic understanding of Projects, IAM, and Service Accounts.

> All secret values in this tutorial are placeholder content. Do not paste real API keys, passwords, or credentials into tutorial documents, chat logs, or a Git repository.

## Further Reading

- [Secret Manager overview](https://cloud.google.com/secret-manager/docs/overview)
- [Secret Manager pricing](https://cloud.google.com/secret-manager/pricing)
- [Secret Manager best practices](https://cloud.google.com/secret-manager/docs/best-practices)
