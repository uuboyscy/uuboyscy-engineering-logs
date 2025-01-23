# **Beginner's Guide to Pyenv**

## **1. Introduction to Pyenv**

### **What is Pyenv?**

Pyenv is a tool that allows you to easily install and manage multiple versions of Python on your system. Developers don't need to rely on the system-installed Python, instead it enables developers to work with different Python versions for various projects.

### **Why use Pyenv?**

- Simplifies managing multiple Python versions.
- Avoids conflicts between projects requiring different Python versions.
- Enables developers to experiment with beta or legacy Python versions safely.

### **Benefits of Using Pyenv**

- Easily switch between Python versions.
- Install and manage Python versions without administrative privileges.
- Seamlessly integrate with tools like `virtualenv`, `pipenv`, and `poetry` .

---

## **2. Installing Pyenv**

### **System Requirements**

- macOS, Linux, or Windows with WSL.
- Basic knowledge of using a terminal.

### **Installation Steps**

#### **macOS**

1. Install Pyenv using Homebrew:
   ```bash
   brew install pyenv
   ```

#### **Linux**

1. Install dependencies:
   ```bash
   sudo apt update && sudo apt install -y build-essential curl libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget llvm libncurses5-dev libncursesw5-dev xz-utils tk-dev libffi-dev liblzma-dev python-openssl git
   ```
2. Install Pyenv:
   ```bash
   curl https://pyenv.run | bash
   ```

#### **Windows (Using WSL)**

1. Install WSL and a Linux distribution (e.g., Ubuntu).
2. Follow the Linux installation steps above.

#### **Common Post-Installation Steps**

1. Add Pyenv to your shell configuration file (e.g., `.bashrc`, `.zshrc`):
   ```bash
   export PYENV_ROOT="$HOME/.pyenv"
   export PATH="$PYENV_ROOT/bin:$PATH"
   eval "$(pyenv init --path)"
   ```
2. Restart your shell:
   ```bash
   exec $SHELL
   ```
3. Verify installation:
   ```bash
   pyenv --version
   ```

---

## **3. Setting Up Pyenv**

### **Verifying the Installation**

Run the following command to ensure Pyenv is installed correctly:

```bash
pyenv --version
```

### **Updating Pyenv**

To update Pyenv to the latest version:

```bash
pyenv update
```

---

## **4. Basic Commands in Pyenv**

### **Installing a Python Version**

```bash
pyenv install 3.11.5
```

### **Listing Installed Python Versions**

```bash
pyenv versions
```

### **Switching Between Python Versions**

```bash
pyenv global 3.11.5
```

### **Uninstalling a Python Version**

```bash
pyenv uninstall 3.11.5
```

---

## **5. Global, Local, and Shell Python Versions**

### **Global Version**

The global version is the default Python version used system-wide:

```bash
pyenv global 3.11.5
```

### **Local Version**

Set a specific Python version for a project:

```bash
pyenv local 3.9.13
```

### **Shell Version**

Override the Python version temporarily in the current shell session:

```bash
pyenv shell 3.8.10
```

---

## **6. Advanced Pyenv Features**

### **Using Plugins**

Extend Pyenv functionality with plugins like `pyenv-which-ext`.

### **Managing Python Builds**

```bash
PYTHON_CONFIGURE_OPTS="--enable-shared" pyenv install 3.9.13
```

### **Using Environment Variables**

Temporarily set a Python version:

```bash
PYENV_VERSION=3.10.6 python
```

---

## **7. Integrating Pyenv with Other Tools**

### **Pyenv with IDEs**

- Configure your IDE (e.g., VSCode, PyCharm) to use a Pyenv-managed Python version.

### **Using Pyenv with pipenv or poetry**

- Use Pyenv-installed Python versions with `pipenv` or `poetry`.

### **Pyenv and Docker**

- Avoid using Pyenv inside Docker containers; use official Python Docker images instead.

---

## **8. Troubleshooting and FAQs**

### **Common Errors and Solutions**

- **Permission Denied:** Ensure you’ve installed Pyenv without `sudo`.
- **Command Not Found:** Add Pyenv to your PATH correctly.

### **How to Uninstall Pyenv**

1. Remove Pyenv files:
   ```bash
   rm -rf ~/.pyenv
   ```
2. Remove references in your shell configuration file.

---

## **9. Additional Resources**

- [Pyenv GitHub Repository](https://github.com/pyenv/pyenv)
- [Community Forums](https://github.com/pyenv/pyenv/issues)
