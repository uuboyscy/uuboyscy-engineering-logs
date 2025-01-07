# Runner setup

# Set Up a GitHub Self-Hosted Runner on Ubuntu

Follow these steps to configure a self-hosted runner for GitHub Actions on your Ubuntu system.

---

## 1. Prerequisites

Ensure you have:

- A supported version of Ubuntu (18.04 or newer).
- An account with administrator privileges on the server.
- Access to your GitHub repository, organization, or enterprise.

---

## 2. Prepare the Ubuntu Environment

1. **Update the System:**
    
    `sudo apt update && sudo apt upgrade -y`
    
2. **Install Required Dependencies:**
    
    `sudo apt install -y curl wget unzip tar`
    
3. **Install Docker (Optional, if workflows require it):**
    
    `sudo apt install -y docker.io
    sudo usermod -aG docker $USER`
    

---

## 3. Register a Self-Hosted Runner

1. **Go to Your GitHub Repository or Organization:**
    - For a repository: Navigate to **Settings > Actions > Runners**.
    - For an organization: Go to **Organization Settings > Actions > Runners**.
2. **Click “Add Runner”:**
    - Select the runner's operating system (Linux in this case).
    - Copy the commands provided to your Ubuntu system.

---

## 4. Set Up the Runner

1. **Create a Directory for the Runner:**
    
    `mkdir actions-runner && cd actions-runner`
    
2. **Download the Runner Package:** Replace `<version>` with the latest version (e.g., `2.308.0`):
    
    `curl -o actions-runner-linux-x64-<version>.tar.gz -L https://github.com/actions/runner/releases/download/<version>/actions-runner-linux-x64-<version>.tar.gz`
    
3. **Extract the Package:**
    
    `tar xzf actions-runner-linux-x64-<version>.tar.gz`
    
4. **Configure the Runner:** Replace `<URL>` and `<TOKEN>` with the values provided by GitHub:
    
    `./config.sh --url <repository_or_org_url> --token <token>`
    
    Example:
    
    `./config.sh --url https://github.com/your-repo --token ABC123TOKEN`
    

---

## 5. Start the Runner

1. **Run the Runner Manually:**
    
    `./run.sh`
    
2. **Set Up as a Service:** To ensure the runner starts automatically on reboot:
    
    `sudo ./svc.sh install
    sudo ./svc.sh start`
    

---

## 6. Test the Runner

- Go to **Settings > Actions > Runners** in your repository or organization to verify the runner is listed as "Idle."
- Trigger a workflow to test its functionality.

---

## 7. Optional: Secure and Optimize

1. **Restrict Access to the Runner Directory:**
    
    `chmod -R 700 actions-runner`
    
2. **Monitor Runner Logs:** Logs are available in the `actions-runner/_diag` directory for troubleshooting.
3. **Clean Up After Jobs:** To prevent storage issues, automate cleanup tasks for temporary files (e.g., using cron jobs).

---

You're all set! Your self-hosted GitHub Actions runner should now be ready for use.