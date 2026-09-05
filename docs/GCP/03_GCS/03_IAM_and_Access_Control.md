---
sidebar_position: 3
---

# IAM and Access Control

GCS permissions determine "who can do what to which bucket or object." Buckets should stay private by default, granting only the minimum necessary permissions through IAM; only expose public read access when there's a clear need for it.

## Uniform Bucket-Level Access

Uniform bucket-level access disables the use of object ACLs within a bucket, so permissions are managed entirely through IAM instead. This reduces the confusion that comes from maintaining both IAM and ACLs on the same bucket.

New buckets should use uniform bucket-level access:

```bash
gcloud storage buckets update gs://BUCKET_NAME \
  --uniform-bucket-level-access
```

Confirm the setting:

```bash
gcloud storage buckets describe gs://BUCKET_NAME
```

In the Console:

1. Open Cloud Storage → your bucket.
2. Go to **Permissions**.
3. Find **Access control**.
4. Confirm it's set to **Uniform**.

Uniform bucket-level access can't always be freely switched back to ACL mode; before enabling it in production, confirm that existing applications don't depend on object ACLs.

## Common IAM Roles

| Role | Suited for |
| --- | --- |
| `roles/storage.objectViewer` | Reading objects |
| `roles/storage.objectCreator` | Creating new objects, without the ability to modify or delete existing ones |
| `roles/storage.objectUser` | The common case of reading, creating, updating, and deleting objects |
| `roles/storage.objectAdmin` | Managing objects, with broader permissions |
| `roles/storage.admin` | Managing buckets and objects; should be restricted to administrators |

The actual permissions available are also affected by the project, bucket, managed folder, and IAM conditions. Don't get into the habit of granting `roles/storage.admin` in production.

## Grant a User Read Access

Grant a specific user read access to objects in a bucket:

```bash
gcloud storage buckets add-iam-policy-binding gs://BUCKET_NAME \
  --member=user:USER_EMAIL \
  --role=roles/storage.objectViewer
```

View the bucket's IAM policy:

```bash
gcloud storage buckets get-iam-policy gs://BUCKET_NAME
```

## Grant a Service Account Access

If Cloud Run, a VM, Cloud Functions, or another program needs to read from GCS, grant access to a specific service account instead of making the data public:

```bash
gcloud storage buckets add-iam-policy-binding gs://BUCKET_NAME \
  --member=serviceAccount:SERVICE_ACCOUNT_EMAIL \
  --role=roles/storage.objectViewer
```

If the program only needs to add files, consider:

```bash
gcloud storage buckets add-iam-policy-binding gs://BUCKET_NAME \
  --member=serviceAccount:SERVICE_ACCOUNT_EMAIL \
  --role=roles/storage.objectCreator
```

Using `objectCreator` prevents the program from arbitrarily modifying or deleting existing files, but check whether your pipeline needs overwrite or retry behavior.

## VM Access Scopes and IAM Are Different

As mentioned in the course, the access scopes set when creating a VM affect what API operations the VM can perform. It's important to distinguish two separate layers:

```text
VM access scope     ──▶  Limits which scopes the VM can request from Google APIs
Service Account IAM ──▶  Determines which resource permissions that identity is actually granted
```

`Allow full access to all Cloud APIs` only means the scope doesn't restrict which API categories can be requested; it doesn't mean the service account automatically has permission on every bucket. Modern GCP design should prioritize using a specific service account with the minimum necessary IAM role, and then set the scope according to the service's needs.

## Public Access Prevention

Public access prevention blocks `allUsers` and `allAuthenticatedUsers` from getting access to data through IAM or ACLs:

```bash
gcloud storage buckets update gs://BUCKET_NAME \
  --public-access-prevention
```

For buckets containing raw data, user data, transaction data, or backups, keep this enabled.

## When Is Public Access Appropriate?

Product images, public documents, or static website assets may need public read access, but you should use a dedicated bucket or CDN setup: don't make a bucket that also contains raw data public.

If you really need to create a publicly readable bucket, first confirm:

- It contains no personal data, secrets, internal logs, or unpublished content.
- You have approval from the data owner and a security review.
- You know how to revoke public access.
- There are monitoring, auditing, and content cleanup processes in place.

The public read example below is only suited for a clearly scoped test scenario:

```bash
# Only use this once you've confirmed the data can be public
gcloud storage buckets add-iam-policy-binding gs://PUBLIC_BUCKET \
  --member=allUsers \
  --role=roles/storage.objectViewer
```

If public access prevention is enforced, this operation will be rejected. Don't disable a security control just to make a command succeed.

## Access Control Checklist

- [ ] Bucket is not public by default.
- [ ] Uniform bucket-level access is used.
- [ ] A service account is used, rather than a shared personal account key.
- [ ] Viewer, creator, or user roles are chosen based on the actual work needed.
- [ ] `allUsers` is not used to work around a routine permission error.
- [ ] Raw data and public assets live in separate buckets.
- [ ] IAM conditions, auditing, and data classification are used for sensitive data.
- [ ] IAM policies and stale members are reviewed regularly.

## Further Reading

- [Cloud Storage access control overview](https://cloud.google.com/storage/docs/access-control)
- [Uniform bucket-level access](https://cloud.google.com/storage/docs/uniform-bucket-level-access)
- [Public access prevention](https://cloud.google.com/storage/docs/public-access-prevention)
- [IAM roles for Cloud Storage](https://cloud.google.com/storage/docs/access-control/iam-roles)
