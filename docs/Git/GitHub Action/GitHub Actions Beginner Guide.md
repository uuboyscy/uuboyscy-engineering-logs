# GitHub Actions Beginner Guide

# **What is GitHub Actions?**

GitHub Actions is a **CI/CD (Continuous Integration/Continuous Deployment)** tool built into GitHub. It allows you to automate workflows, such as building, testing, and deploying your code.

---

# **Key Concepts**

## **1. Workflow**

- A YAML file that defines the automation process.
- Location: `.github/workflows/<workflow-name>.yml`
- Triggered by events like `push`, `pull_request`, or manually using `workflow_dispatch`.

**Example:**

```yaml
name: CI Workflow
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
```

---

## **2. Jobs**

- A workflow is composed of one or more jobs.
- Each job runs on a separate virtual machine.
- Jobs can run in parallel or sequentially using `needs`.

**Example:**

```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - name: Step 1
        run: echo "Job 1"
  job2:
    needs: job1  # Run after job1
    runs-on: ubuntu-latest
    steps:
      - name: Step 2
        run: echo "Job 2"
```

---

## **3. Steps**

- A sequence of commands or actions executed in a job.
- Steps can include:
    - Shell commands (`run`).
    - Pre-built actions (`uses`).

**Example:**

```yaml
steps:
  - name: Run a command
    run: echo "Hello, World!"
  - name: Use an action
    uses: actions/checkout@v4
```

---

## **4. Triggers**

- Define when the workflow runs.
- Common triggers:
    - `push` – When changes are pushed to a branch.
    - `pull_request` – When a pull request is opened or updated.
    - `schedule` – Runs on a schedule using cron syntax.
    - `workflow_dispatch` – Allows manual triggering.

**Example:**

```yaml
on:
  push:
    branches:
      - main
  pull_request:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:
```

---

## **5. Runners**

- The environment where jobs are executed.
- Types:
    - **Hosted runners**: GitHub-provided (Ubuntu, Windows, macOS).
    - **Self-hosted runners**: Custom environments.

---

# **Key Features for Beginners**

## **1. Reusable Actions**

Pre-defined actions shared on the [GitHub Marketplace](https://github.com/marketplace/actions).

**Example:**

```yaml
steps:
  - uses: actions/checkout@v4
```

---

## **2. Environment Variables**

- Use `env` or predefined variables (e.g., `${{ github.event }}`).

**Example:**

```yaml
env:
  NODE_ENV: production
steps:
  - name: Print environment
    run: echo $NODE_ENV
```

---

## **3. Secrets**

- Securely store sensitive data like API keys.
- Access via `${{ secrets.<name> }}`.

**Example:**

```yaml
steps:
  - name: Use secret
    run: echo ${{ secrets.MY_SECRET }}
```

---

## **4. Artifacts**

- Save files during a workflow for later use.
- Upload with `actions/upload-artifact@v3`.

**Example:**

```yaml
steps:
  - name: Upload artifact
    uses: actions/upload-artifact@v3
    with:
      name: build-output
      path: ./build
```

---

## **5. Matrix Builds**

- Test your code on multiple environments or configurations.

**Example:**

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: [3.7, 3.8, 3.9]
    steps:
      - name: Setup Python
        uses: actions/setup-python@v2
        with:
          python-version: ${{ matrix.python-version }}
      - name: Run tests
        run: python -m unittest
```

---

# **Typical Workflow Example**

```yaml
name: Build and Test Workflow

on:
  push:
    branches:
      - main

jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: 3.9

      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          pip install pytest

      - name: Run tests
        run: pytest
```

---

# **Benefits of GitHub Actions**

1. **Easy Integration**: Built directly into GitHub.
2. **Automation**: Automates repetitive tasks like testing and deployment.
3. **Flexibility**: Highly configurable with custom workflows.
4. **Scalability**: Supports parallel and matrix jobs.

---

# **Helpful Tips for Beginners**

1. **Start Small**: Begin with simple workflows like running a script.
2. **Use Pre-built Actions**: Explore the GitHub Marketplace.
3. **Debugging**: Enable debug logging with `ACTIONS_STEP_DEBUG=true`.
4. **Learn from Examples**: Refer to GitHub’s [Actions documentation](https://docs.github.com/en/actions).

---

This document provides a beginner-friendly introduction to GitHub Actions. Let me know if you’d like to add more examples or topics!