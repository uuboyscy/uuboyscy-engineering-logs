# GitHub Runner Housekeeping

# Housekeeping for GitHub Self-Hosted Runner

To maintain your GitHub Actions self-hosted runner and ensure sufficient disk space, follow these steps:

---

## 1. Clean Up Workflow Artifacts and Logs

1. **Workflow Temporary Files (`_work` Directory):**
The `_work` directory contains temporary files from workflows. Remove old or unused workflow directories:
    
    ```bash
    rm -rf /home/ubuntu/actions-runner/_work/*
    ```
    
2. **Runner Diagnostic Logs:**
Logs are stored in the `_diag` directory. Clean them periodically:
    
    ```bash
    rm -rf /home/ubuntu/actions-runner/_diag/*
    ```
    
3. **System Logs:**
Reduce the size of system logs:
    
    ```bash
    sudo journalctl --vacuum-size=100M
    sudo rm -rf /var/log/*.log
    ```
    

---

## 2. Clean Python and Node.js Caches

1. **Python Cache:**
If workflows install Python tools or versions, clean the cache:
    
    ```bash
    rm -rf /home/ubuntu/.cache/pip
    rm -rf /home/ubuntu/actions-runner/_work/_tool/Python/*
    ```
    
2. **Node.js Cache:**
Remove unused Node.js dependencies and cache:
    
    ```bash
    rm -rf /home/ubuntu/.npm
    rm -rf /home/ubuntu/.node-gyp
    ```
    

---

## 3. Clean Docker Data (if Docker is used)

1. **Remove Unused Containers, Images, and Volumes:**
    
    ```bash
    docker system prune -a --volumes -f
    ```
    
2. **Remove Specific Old Docker Data:**
    
    ```bash
    docker images --filter "dangling=true" -q | xargs docker rmi
    docker volume ls --filter "dangling=true" -q | xargs docker volume rm
    ```
    

---

## 4. Remove Old Snap Package Versions

1. **List Installed Snap Packages:**
    
    ```bash
    snap list
    ```
    
2. **Clear Old Revisions:**
    
    ```bash
    sudo snap set system refresh.retain=2
    sudo snap remove --purge $(snap list --all | awk '/disabled/{print $1, $3}')
    ```
    

---

## 5. Remove APT Cache

Clean up the package cache to free space:

```bash
sudo apt-get clean
sudo apt-get autoremove --purge -y
```

---

## 6. Monitor Disk Usage

1. **Identify Large Files/Directories:**
    
    ```bash
    sudo du -ah / | sort -rh | head -n 20
    ```
    
2. **Monitor Disk Space:**
Regularly check disk usage:
    
    ```bash
    df -h
    ```
    

---

## 7. Automate Cleanup with a Script

Create a housekeeping script and schedule it using `cron`.

### Script: `cleanup_runner.sh`

```bash
#!/bin/bash
# Remove old workflows

rm -rf /home/ubuntu/actions-runner/_work/*

# Clear diagnostic logs
rm -rf /home/ubuntu/actions-runner/_diag/*

# Clean Python and Node.js caches
rm -rf /home/ubuntu/.cache/pip
rm -rf /home/ubuntu/.npm
rm -rf /home/ubuntu/.node-gyp

# Clean Docker data
docker system prune -a --volumes -f

# Remove unused Snap revisions
sudo snap remove --purge $(snap list --all | awk '/disabled/{print $1, $3}')

# Clean APT cache
sudo apt-get clean
sudo apt-get autoremove --purge -y

# Clean system logs
sudo journalctl --vacuum-size=100M
sudo rm -rf /var/log/*.log

echo "Cleanup completed successfully!"
```

Make the script executable:

```bash
chmod +x cleanup_runner.sh
```

### Schedule it in `cron`:

```bash
crontab -e
```

Add a cron job to run the script daily or weekly:

```bash
0 2 * * * /path/to/cleanup_runner.sh
```

---

By following these steps, you can ensure your runner stays clean and has enough disk space for ongoing workflows.