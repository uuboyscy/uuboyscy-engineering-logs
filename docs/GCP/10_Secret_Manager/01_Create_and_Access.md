---
sidebar_position: 1
---

# Create and Access a Secret

This tutorial uses the Console and `gcloud` to create a Secret, add its first version, and then access a specific Secret version.

## Configuration Used in This Tutorial

The following names are placeholder values:

```text
PROJECT_ID = your-project-id
SECRET_ID  = tkr101-demo-api-key
```

The Secret ID should not contain any sensitive information beyond the real service name. You can use labels to record environment and owner, but never put the secret value in a label or description.

## Step 1: Select a Project

```bash
gcloud auth login
gcloud projects list
gcloud config set project PROJECT_ID
gcloud config get-value project
```

Confirm you're currently using your practice Project:

```bash
gcloud projects describe PROJECT_ID
```

## Step 2: Enable the Secret Manager API

```bash
gcloud services enable secretmanager.googleapis.com
```

If Cloud Run will later consume this Secret, you'll also need to enable the relevant Cloud Run APIs; deploying from the Cloud Console usually prompts you to enable them.

## Step 3: Create a Secret in the Console

1. Open the Google Cloud Console.
2. Search for and go to **Secret Manager**.
3. Click **Create secret**.
4. Enter `tkr101-demo-api-key` as the name.
5. Enter a test value for Secret value, e.g. `demo-value-only`.
6. Choose Automatic or User-managed for Replication, depending on your needs.
7. Optionally add labels such as `environment=learning`, `owner=your-name`.
8. Click **Create secret**.

The test value is only used to verify the workflow. Delete or clean up this Secret once you're done practicing.

## Step 4: Create a Secret with `gcloud`

Create the Secret metadata:

```bash
gcloud secrets create SECRET_ID \
  --project=PROJECT_ID \
  --replication-policy=automatic \
  --labels=environment=learning
```

`--replication-policy` can be `automatic` or `user-managed`. If you have data location constraints, configure user-managed replication locations per the official documentation.

View the Secret metadata:

```bash
gcloud secrets describe SECRET_ID
```

List the Secrets in a Project:

```bash
gcloud secrets list
```

## Step 5: Add the First Secret Version

### From Standard Input

An example that avoids writing the value to a file:

```bash
printf '%s' 'demo-value-only' \
  | gcloud secrets versions add SECRET_ID \
      --data-file=-
```

### From a Local File

If the secret is naturally file-shaped, such as a credential or JSON document, you can use:

```bash
gcloud secrets versions add SECRET_ID \
  --data-file=./temporary-secret.txt
```

When using a temporary file, be mindful of file permissions and clean up afterward:

```bash
rm ./temporary-secret.txt
```

Don't add a file containing a real secret to Git:

```bash
git status --short
```

## Step 6: List Secret Versions

```bash
gcloud secrets versions list SECRET_ID
```

The output includes the version number and its status, such as `ENABLED`, `DISABLED`, or `DESTROYED`.

## Step 7: Access a Secret Version

Read a specific version:

```bash
gcloud secrets versions access 1 \
  --secret=SECRET_ID
```

Read `latest`:

```bash
gcloud secrets versions access latest \
  --secret=SECRET_ID
```

These commands print plaintext to the terminal. This is only suitable for verifying the workflow with placeholder values — in production, never write this output to shell history, CI logs, or application logs.

## Step 8: Read a Secret in Python

Install the Secret Manager client library:

```bash
pip install google-cloud-secret-manager
```

Use Application Default Credentials or the runtime environment's Service Account:

```python
from google.cloud import secretmanager


def access_secret(project_id: str, secret_id: str, version: str = "1") -> str:
    client = secretmanager.SecretManagerServiceClient()
    name = f"projects/{project_id}/secrets/{secret_id}/versions/{version}"
    response = client.access_secret_version(request={"name": name})
    return response.payload.data.decode("UTF-8")
```

Don't print the return value when calling it:

```python
api_key = access_secret(
    project_id="your-project-id",
    secret_id="tkr101-demo-api-key",
    version="1",
)

# Pass api_key to whatever client needs it — don't print(api_key)
```

## Console Access Flow

To read a version in the Console:

1. Open Secret Manager.
2. Click the Secret's name.
3. Find the version you want to use on the Versions tab.
4. Click **Actions** next to the version.
5. Select **View secret value**.

Reading the secret value itself requires access to that specific Secret version. Being able to see the Secret metadata doesn't mean you can read the plaintext.

## Common Problems

### Secret Manager API is not enabled

Run:

```bash
gcloud services enable secretmanager.googleapis.com
```

If you don't have permission to enable the API, ask your Project administrator for help rather than using someone else's key to work around it.

### Permission denied on access

The person who created the Secret isn't necessarily the identity running the application. Confirm that the account running `gcloud`, or the runtime Service Account, has the `secretmanager.versions.access` permission.

### Version is disabled

A disabled version can't be used normally. First confirm whether the current deployment still points to an old version, then decide whether to enable it or update the application configuration.

## Cleanup

List Secrets to confirm the name:

```bash
gcloud secrets list
```

Before deleting a tutorial Secret, confirm no other service is using it:

```bash
gcloud secrets delete SECRET_ID
```

Deletion is a destructive operation. Don't copy these cleanup commands directly against a production Secret.

## Further Reading

- [Create and access a secret](https://cloud.google.com/secret-manager/docs/creating-and-accessing-secrets)
- [Add a secret version](https://cloud.google.com/secret-manager/docs/add-secret-version)
- [Access a secret version](https://cloud.google.com/secret-manager/docs/access-secret-version)
- [gcloud secrets](https://cloud.google.com/sdk/gcloud/reference/secrets)
