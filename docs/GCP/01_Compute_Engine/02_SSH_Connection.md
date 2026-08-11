---
sidebar_position: 2
---

# SSH Setup & Connection

Once your VM is up and running, there are several ways to connect. For professional development, using a local SSH key is the industry standard.

## Method A: Web SSH (Easiest)

Click the **SSH** button next to your instance in the GCP console to open a terminal directly in your browser. This is great for quick troubleshooting.

## Method B: Local SSH Key (Industry Standard)

1. **Generate Key**: Run `ssh-keygen -t rsa -f ~/.ssh/gcp_key -C myuser` on your local terminal.
2. **Copy Public Key**: Run `cat ~/.ssh/gcp_key.pub` and copy the output.
3. **Bind in GCP**: Go to **Metadata** -> **SSH Keys** in the GCP console and paste the key.
4. **Connect**: Run `ssh -i ~/.ssh/gcp_key myuser@<VM_EXTERNAL_IP>`.
