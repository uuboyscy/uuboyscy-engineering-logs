# Poetry

## **What is Poetry?**

[Poetry](https://python-poetry.org/) is a modern Python package and dependency management tool that streamlines creating, building, and sharing Python projects. It helps:

- Manage dependencies.
- Handle virtual environments.
- Build and publish Python packages.

Unlike traditional tools like `pip` and `virtualenv`, Poetry integrates dependency resolution and project management in a single tool.

---

## **Why Use Poetry?**

- **Dependency Resolution**: Automatically resolves dependencies to ensure package compatibility.
- **Simplified Configuration**: Uses a `pyproject.toml` file for centralized configuration.
- **Built-in Virtual Environment Management**: Creates and manages virtual environments automatically.
- **Cross-Platform Support**: Works seamlessly across different operating systems.

---

## **Installing Poetry**

To get started, install Poetry on your system.

### **1. Install Poetry**

Run the following command to install Poetry:

```bash
curl -sSL <https://install.python-poetry.org> | python3 -

```

Alternatively, on macOS with Homebrew:

```bash
brew install poetry

```

Verify the installation:

```bash
poetry --version

```

---

## **Setting Up a New Project**

Poetry simplifies creating and managing Python projects.

### **1. Create a New Project**

Run:

```bash
poetry new my_project

```

This creates a directory structure like:

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

The `pyproject.toml` file is the heart of a Poetry-managed project. It contains:

- **Project Metadata**: Name, version, description, authors, etc.
- **Dependencies**: List of required packages.
- **Dev Dependencies**: Packages needed only for development.

---

## **Adding Dependencies**

Poetry simplifies managing dependencies for your project.

### **1. Add a Dependency**

To add a dependency, use:

```bash
poetry add requests

```

Poetry automatically resolves compatible versions and updates the `pyproject.toml` file.

### **2. Add Development Dependencies**

For development-specific dependencies, add them with:

```bash
poetry add pytest --group dev

```

---

## **Managing Virtual Environments**

Poetry creates a virtual environment for your project automatically.

### **1. Check the Virtual Environment**

To check the virtual environment location:

```bash
poetry env info

```

### **2. Activate the Virtual Environment**

Activate the virtual environment using:

```bash
# For version < 2.0.0
poetry shell

# For version >= 2.0.0 (Linux or Mac)
# poetry env activate only show command, then you can manually execute it
eval `poetry env activate`

```

Exit the virtual environment with:

```bash
exit

```

---

## **Running Scripts**

Poetry simplifies running scripts and commands within the virtual environment.

For example, to run a Python script:

```bash
poetry run python script.py

```

---

## **Building and Publishing a Package**

Poetry makes it easy to share your project.

### **1. Build the Package**

Run:

```bash
poetry build

```

This generates distribution files in the `dist/` directory.

### **2. Publish to PyPI**

To publish your package to [PyPI](https://pypi.org/):

```bash
poetry publish --username <your-username> --password <your-password>

```

---

## **Bonus Tips**

### **1. Lock File**

Poetry creates a `poetry.lock` file to lock dependency versions, ensuring reproducible builds.

### **2. Upgrade Dependencies**

To upgrade dependencies, use:

```bash
poetry update

```

---

## **Conclusion**

Poetry is a powerful tool that simplifies Python project and dependency management, making it especially beginner-friendly. By integrating dependency resolution, virtual environment management, and package publishing, Poetry helps you focus on building your Python projects rather than wrestling with package issues.

---

### **Reference**

- Official Documentation: [https://python-poetry.org/docs/](https://python-poetry.org/docs/)
- GitHub Repository: [https://github.com/python-poetry/poetry](https://github.com/python-poetry/poetry)