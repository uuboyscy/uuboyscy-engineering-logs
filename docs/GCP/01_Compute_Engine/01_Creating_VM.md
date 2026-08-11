---
sidebar_position: 1
---

# Creating a VM in Console

Google Compute Engine (IaaS) allows you to create Virtual Machines (VMs) in the cloud. It is exactly like running a local machine, but hosted on Google's infrastructure.

## Configuration Steps

Click **Create instance** in the Compute Engine console and configure the following:

- **Name & Region**: Choose a name. Set region to Taiwan (`asia-east1`) for the lowest latency.
- **Machine Type**: Choose **E2 series**, `e2-medium` (2 vCPUs, 4GB RAM).
- **Cost Optimization (Spot)**: 
  - Change provisioning model to **Spot** (huge discount).
  - Check **Set limit for time** (e.g., 8 hours) to auto-shutdown.
  - Set VM termination action to **Delete** to prevent idle disk/IP charges.
- **Boot Disk**: Select **Debian 12** (`x86/64`), and set size to **15GB**.
- **Firewall**: Check **Allow HTTP traffic** and **Allow HTTPS traffic**.
- **Security & Access**: 
  - Uncheck Ops Agent to avoid extra monitoring costs.
  - Set **Access scopes** to **"Allow full access to all Cloud APIs"**.

*(Optional: Click **Equivalent Code** at the bottom to view the exact `gcloud` command for this setup.)*

---

## Next Steps & Security

- **Development**: Install Docker to run tools like Airflow. Use the **VS Code Remote SSH** extension to attach directly to your VM for seamless development.
- **Service Accounts**: Your VM uses a default Service Account. Always practice the **Principle of Least Privilege** in production by restricting its access to only what is necessary (e.g., read-only to GCS).
