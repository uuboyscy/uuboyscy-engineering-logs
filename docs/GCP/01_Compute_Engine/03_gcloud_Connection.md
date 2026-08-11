---
sidebar_position: 3
---

# Connect via gcloud CLI

You can also use the Google Cloud CLI to securely connect to your VM without manually managing SSH keys.

## Steps

1. **Initialize CLI**: Run `gcloud init` on your local terminal to log in and set your project/region.
2. **Get Command**: In the GCP console, click **View gcloud command** next to your VM instance.
3. **Connect**: Copy the command and run it in your local terminal. `gcloud` will automatically generate temporary keys and create a secure SSH tunnel for you.
