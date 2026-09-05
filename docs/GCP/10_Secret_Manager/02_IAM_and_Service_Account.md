---
sidebar_position: 2
---

# IAM and Service Account Access

Secret Manager's security boundary is primarily enforced by IAM. Design your setup so that "managing a Secret" and "reading a Secret" are separate, and grant permissions at the narrowest resource level possible.

## Secret Manager Roles

| Role | Suitable Use |
| --- | --- |
| `roles/secretmanager.secretAccessor` | Read Secret versions |
| `roles/secretmanager.secretVersionAdder` | Add Secret versions |
| `roles/secretmanager.secretVersionManager` | Manage Secret versions, e.g. enable, disable, destroy |
| `roles/secretmanager.viewer` | View metadata; does not grant access to the secret value |
| `roles/secretmanager.admin` | Manage Secrets and versions; should be limited to administrators |

Don't grant `roles/owner` or `roles/secretmanager.admin` to an application in production just to "get it working."

## Grant Access at the Secret Level

Grant read access to a specific Service Account:

```bash
gcloud secrets add-iam-policy-binding SECRET_ID \
  --project=PROJECT_ID \
  --member=serviceAccount:RUNTIME_SERVICE_ACCOUNT \
  --role=roles/secretmanager.secretAccessor
```

This follows least privilege far better than granting access to every Secret across the whole Project.

View the IAM policy for a single Secret:

```bash
gcloud secrets get-iam-policy SECRET_ID \
  --project=PROJECT_ID
```

## Separate Deployment and Runtime Identities

A recommended division of identities:

```text
CI/CD or administrator
  ├── secretVersionAdder: add new versions
  └── secretVersionManager: rotate and disable versions

Runtime Service Account
  └── secretAccessor: only reads the Secrets the application needs
```

Deployers can update a secret, but the application doesn't need to destroy or disable a secret version. This limits the blast radius even if the runtime environment is compromised.

## Grant Access in the Console

1. Open **Secret Manager**.
2. Find the Secret you want to grant access to.
3. Click **Actions** next to the Secret.
4. Select **Manage permissions**.
5. Click **Grant access**.
6. Enter the Service Account email under New principals.
7. Select only **Secret Manager Secret Accessor**.
8. Save the settings.

If you only need to read one Secret, grant access at that Secret's level rather than granting access to all Secrets at the Project level.

## Check the Current Identity

Before running CLI operations, confirm which account is active:

```bash
gcloud auth list
gcloud config get-value project
```

If you're using Application Default Credentials:

```bash
gcloud auth application-default print-access-token
```

Never paste an access token, service account JSON key, or secret value into an issue, chat, or log.

## Compute Engine and Access Scopes

On Compute Engine, accessing Secret Manager depends on two things at once:

1. Whether the VM's Service Account has the Secret Manager IAM role.
2. Whether the VM's access scope allows calling Google Cloud APIs.

```text
VM access scope ───────▶ limits which API scopes the VM can request
Service Account IAM ───▶ determines the actual permissions on the Secret resource
```

`Allow full access to all Cloud APIs` only removes the scope-level API restriction; it doesn't automatically grant IAM permission to read a Secret. Production should use a dedicated Service Account with the minimal role.

## Audit Logs

`AccessSecretVersion` in Secret Manager is a Data Access audit log. It's recommended to enable and centrally analyze these at the organization or Folder level to answer questions like:

- Which principal read a Secret?
- When was it read?
- Which service or Project did the request come from?
- Was there unusual frequency, or an identity that shouldn't be there?

In Logs Explorer, you can use a filter like:

```text
protoPayload.methodName="google.cloud.secretmanager.v1.SecretManagerService.AccessSecretVersion"
```

Audit logs only help with tracing and investigation; they don't replace IAM, network boundaries, or secret rotation.

## Least Privilege Checklist

- [ ] Runtime uses a dedicated Service Account.
- [ ] Runtime only has `roles/secretmanager.secretAccessor`.
- [ ] Permissions are granted on individual Secrets rather than the whole Project wherever possible.
- [ ] CI/CD, administrators, and the runtime use different identities.
- [ ] Long-lived service account JSON keys are not used as the primary authentication method.
- [ ] Data Access audit logs are enabled and reviewed.
- [ ] Production, staging, and development use different Projects or, at minimum, different Secrets.
- [ ] Access for departed staff, retired services, and temporary test accounts is regularly removed.

## Further Reading

- [Access control with IAM](https://cloud.google.com/secret-manager/docs/access-control)
- [Secret Manager IAM roles](https://cloud.google.com/secret-manager/docs/access-control#secretmanager-roles)
- [Secret Manager audit logging](https://cloud.google.com/secret-manager/docs/audit-logging)
- [Google Cloud IAM best practices](https://cloud.google.com/iam/docs/using-iam-securely)
