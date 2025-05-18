# Selenium Guide: Automating Browser Interaction

Since Selenium 4.6, developers no longer need to manually download ChromeDriver. Selenium automatically detects the local browser version and downloads the appropriate driver.

---

## Getting Started

### 1. Install the latest Selenium version

```bash
pip install --upgrade selenium
```

### 2. Basic usage (no need to specify driver path)

```python
from selenium import webdriver

# Selenium 4.6+ automatically manages the driver
driver = webdriver.Chrome()
driver.get("https://www.google.com")
print(driver.title)
driver.quit()
```

The first run may take longer as it will download the appropriate driver.

---

## 🛠 Commonly Used Functions

| Feature                 | Function & Description                                                |
| ----------------------- | ------------------------------------------------------------------- |
| Open a web page         | `driver.get(url)` — open a specific URL                             |
| Get page title          | `driver.title` — returns the current page title                     |
| Close browser           | `driver.quit()` — closes the entire browser                         |
| Find single element     | `driver.find_element(by=By.X, value="...")`                         |
| Find multiple elements  | `driver.find_elements(by=By.X, value="...")`                        |
| Click an element        | `element.click()`                                                   |
| Enter text              | `element.send_keys("your text")`                                    |
| Clear text field        | `element.clear()`                                                   |
| Get text from element   | `element.text`                                                      |
| Get/set attribute       | `element.get_attribute("href")`                                     |
| Scroll to element       | `driver.execute_script("arguments[0].scrollIntoView();", element)`  |

Common `By` locator options:

```python
from selenium.webdriver.common.by import By
By.ID, By.CLASS_NAME, By.NAME, By.XPATH, By.CSS_SELECTOR, By.LINK_TEXT, By.PARTIAL_LINK_TEXT
```

---

## How to Verify It Works

Try this code to ensure everything is working:

```python
from selenium import webdriver

driver = webdriver.Chrome()
driver.get("https://www.google.com")
print(driver.title)
driver.quit()
```

If it opens Google and prints the title without requiring a downloaded driver, then Selenium Manager is working

---

## Additional Info

### How Selenium Auto-Handles ChromeDriver

Since Selenium 4.6.0, the built-in **Selenium Manager**:

* Detects your locally installed Chrome version
* Downloads the corresponding ChromeDriver
* Automatically sets the path; no need for manual config

---

### 📥 Optional: Manual ChromeDriver Download

If you prefer to manually manage the driver (e.g. offline use):

* ChromeDriver download page: [https://chromedriver.chromium.org/downloads](https://chromedriver.chromium.org/downloads)
* Be sure the version matches your installed Chrome browser
* Add `chromedriver` to your PATH or specify the full path

Example:

```python
from selenium import webdriver

service = webdriver.ChromeService(executable_path="/path/to/chromedriver")
driver = webdriver.Chrome(service=service)
```
