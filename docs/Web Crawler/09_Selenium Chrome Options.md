# Selenium Chrome Options

`ChromeOptions` allows you to customize the behavior of the Chrome browser in Selenium. You can set various arguments to control how the browser launches, such as running in headless mode, changing the window size, or disabling notifications.

---

## Common Arguments

Here are some frequently used arguments for `ChromeOptions`:

| Argument | Description |
| :--- | :--- |
| `--headless=new` | Runs Chrome in headless mode (without a UI). Useful for servers or CI/CD. |
| `--window-size=1920,1080` | Sets the initial window size. |
| `--start-maximized` | Starts the browser maximized. |
| `--incognito` | Opens the browser in Incognito mode. |
| `--disable-notifications` | Disables browser notifications (e.g., "Show notifications"). |
| `--disable-gpu` | Disables GPU hardware acceleration (often used with headless mode). |
| `--no-sandbox` | Bypass OS security model. **Required** for Docker/Linux environments. |
| `--disable-dev-shm-usage` | Overcomes limited resource problems. **Required** for Docker/Linux environments. |
| `--blink-settings=imagesEnabled=false` | Disables image loading (speeds up scraping). |
| `user-agent=...` | Sets a custom User-Agent string. |

---

## Experimental Options

Some settings are applied via `add_experimental_option`:

### 1. Keep Browser Open (`detach`)

By default, Selenium closes the browser when the script finishes. To keep it open:

```python
options.add_experimental_option("detach", True)
```

### 2. Disable "Chrome is being controlled by automated test software"

To remove the automation banner:

```python
options.add_experimental_option("excludeSwitches", ["enable-automation"])
```

---

## Complete Example

Here is a complete example demonstrating how to use `ChromeOptions` with Selenium 4:

```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time

# 1. Create Options instance
options = Options()

# 2. Add Arguments
options.add_argument("--start-maximized")
options.add_argument("--disable-notifications")
options.add_argument("--incognito")

# Headless mode (uncomment to enable)
# options.add_argument("--headless=new") 

# Sandbox options (Critical for Docker/Linux)
# options.add_argument("--no-sandbox")
# options.add_argument("--disable-dev-shm-usage")

# 3. Add Experimental Options
# Keep browser open after script ends
options.add_experimental_option("detach", True)

# Remove automation banner
options.add_experimental_option("excludeSwitches", ["enable-automation"])

# 4. Initialize Driver with Options
driver = webdriver.Chrome(options=options)

# 5. Run your automation
driver.get("https://www.google.com")

print("Page Title:", driver.title)

# Note: If 'detach' is True, you don't need driver.quit() if you want to keep it open.
# driver.quit()
```
