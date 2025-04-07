# Poetry

## **What is Poetry?**

[Poetry](https://python-poetry.org/) is a modern Python package and dependency management tool that streamlines creating, building, and sharing Python projects. It helps:

- Manage dependencies  
- Handle virtual environments  
- Build and publish Python packages

Unlike traditional tools like `pip` and `virtualenv`, Poetry integrates dependency resolution and project management in a single tool.

---

## **Why Use Poetry?**

- **Dependency Resolution**: Automatically resolves dependencies to ensure package compatibility  
- **Simplified Configuration**: Uses a `pyproject.toml` file for centralized configuration  
- **Built-in Virtual Environment Management**: Creates and manages virtual environments automatically  
- **Cross-Platform Support**: Works seamlessly across different operating systems

---

## **Installing Poetry**

### **1. Install Poetry**

```bash
curl -sSL https://install.python-poetry.org | python3 -
```

Or on macOS with Homebrew:

```bash
brew install poetry
```

Verify installation:

```bash
poetry --version
```

---

## **Setting Up a New Project**

### **1. Create a New Project**

```bash
poetry new my_project
```

Creates this directory structure:

```
my_project/
├── my_project/
│   └── __init__.py
├── tests/
│   └── __init__.py
├── pyproject.toml
└── README.rst
```

### **2. Understand `pyproject.toml`**

Includes:

- **Project Metadata**: name, version, description, authors, etc.  
- **Dependencies**: required packages  
- **Dev Dependencies**: development-only packages

---

## **Adding Dependencies**

### **1. Add a Dependency**

```bash
poetry add requests
```

### **2. Add Development Dependencies**

```bash
poetry add --group dev pytest
```

Install all with dev dependencies:

```bash
poetry install --with dev
```

---

## **Managing Virtual Environments**

Poetry creates a virtual environment for your project automatically.

### **1. Check the Environment**

```bash
poetry env info
```

### **2. Activate the Environment**

Linux/macOS:

```bash
source $(poetry env info --path)/bin/activate
```

Windows:

```powershell
. $(poetry env info --path)\Scripts\activate
```

Or start a new shell:

```bash
poetry shell
```

Exit with:

```bash
exit
```

---

## **Running Scripts**

To run a Python script within the Poetry environment:

```bash
poetry run python script.py
```

---

## **Building and Publishing a Package**

### **1. Build the Package**

```bash
poetry build
```

Creates files in the `dist/` directory.

### **2. Publish to PyPI**

```bash
poetry publish --username <your-username> --password <your-password>
```

Or using a token (recommended):

```bash
poetry publish --username __token__ --password <your-token>
```

---

## **Bonus Tips**

### **1. Lock File**

Poetry creates a `poetry.lock` file to lock exact versions for reproducibility.

### **2. Upgrade Dependencies**

Upgrade all:

```bash
poetry update
```

Upgrade one:

```bash
poetry update requests
```

---

## **Conclusion**

Poetry 2.x is a powerful tool for modern Python development. It simplifies dependency resolution, environment setup, and package publishing—letting you focus on writing great code.

---

## **Reference**

- [Official Documentation](https://python-poetry.org/docs/)  
- [GitHub Repository](https://github.com/python-poetry/poetry)
