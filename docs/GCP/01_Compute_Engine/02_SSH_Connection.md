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

## Method C: Connect with an SSH Config Alias

Save the VM connection details in `~/.ssh/config` so you can connect with a short, memorable command.

1. Make sure your public key has been added to the VM or the project's **Metadata** -> **SSH Keys**.
2. Add the following entry to `~/.ssh/config`:

   ```ssh-config
   Host YOUR_SSH_ALIAS
     HostName YOUR_VM_EXTERNAL_IP
     User YOUR_SSH_USERNAME
     IdentityFile PATH_TO_YOUR_PRIVATE_KEY
     IdentitiesOnly yes
   ```

   Replace each uppercase placeholder with your own connection details.

3. Restrict the file permissions:

   ```bash
   chmod 600 ~/.ssh/config
   ```

   Your private key should also be readable only by your user (`chmod 600`).

4. Connect using the host alias:

   ```bash
   ssh YOUR_SSH_ALIAS
   ```

If the VM uses an ephemeral external IP address, update `HostName` whenever the address changes. A static external IP avoids this extra step.
