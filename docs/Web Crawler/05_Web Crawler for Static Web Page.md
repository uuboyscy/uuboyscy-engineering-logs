# Web Crawler for Static Web Page

## What to Do

For this example, we'll create a web crawler to scrape articles from PTT's photo board. Here are the key steps:

1. **Prepare Headers and Cookies**
   - ![headers_user_agent](python_web_crawler_sources/headers_user_agent.png)
    ```python
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36"
    }
    ```

2. **Use BeautifulSoup to Parse HTML Content**
   - Article titles
   - Authors
   - Dates
   - Links

3. Crawl Multiple Page and Save Data

## Implementation

### Install requests and BeatifulSoup

To install the required libraries, follow these steps:

1. Open your terminal or command prompt
2. Run the following command to install requests:
   ```bash
   pip install requests bs4
   ```
3. Verify the installation:
   ```bash
   python -c "import requests; print(requests.__version__)"
   ```

The requests library will be used to send HTTP requests and handle responses from web servers.

### Usage of requests and BeautifulSoup

The main libraries used are:

- `requests`: Handles HTTP requests and responses
  - Sends GET/POST requests
  - Manages headers and cookies
  - Handles response status codes

- `BeautifulSoup`: Parses HTML content
  - Extracts data using selectors
  - Navigates HTML structure
  - Cleans and formats text

### Basic Usage
- requests functions
  -  `requests.get(url, headers=None, cookies=None)`
    - Sends a GET request to the specified URL
  - `requests.post(url, data=None, json=None)`
    - Sends a POST request with form data or JSON
- BeautifulSoup functions
  - `BeautifulSoup(html, "html.parser")`
    - Creates a BeautifulSoup object to parse HTML
    - → Use it to process the HTML content returned from requests.get()
  - `soup.select(css_selector)`
    - Finds all elements matching a CSS selector
    - → Returns a list of tag (even if it has one result)
  - `soup.find_all(tag, attrs={})`
    - Finds all elements matching the tag and attributes
    - → Returns a list of tag (even if it has one result)

### Crawl Article titles and Other Information
```python
from bs4 import BeautifulSoup
import requests

url = "https://www.ptt.cc/bbs/photo/index.html"
res = requests.get(url, headers=headers)
soup = BeautifulSoup(res.text, "html.parser")

articles = soup.select("div.r-ent")

for article in articles:
    title_tag = article.select_one("div.title a")
    author = article.select_one("div.meta div.author")
    date = article.select_one("div.meta div.date")

    if title_tag:
        print("Title:", title_tag.text)
        print("Link:", "https://www.ptt.cc" + title_tag["href"])
        print("Author:", author.text if author else "N/A")
        print("Date:", date.text if date else "N/A")
        print("-" * 40)
```

### Crawl Multiple Page and Save Data
- Find link
  ![previous_page_1](python_web_crawler_sources/previous_page_1.png)
- Find URL pattern
  ![previous_page_2](python_web_crawler_sources/previous_page_2.png)

## Cookies

Cookies let a website remember information between requests. For example, PTT's **Gossiping** board uses an age-confirmation page before showing its articles.

After you confirm that you are over 18, PTT uses a cookie named `over18` with the value `1` to remember your choice. This is an age-confirmation cookie, not a login credential.

### Find the Cookie in Chrome

1. Open [PTT Gossiping](https://www.ptt.cc/bbs/Gossiping/index.html) in Chrome and complete the age confirmation if you are eligible.
2. Open DevTools → **Network**, then refresh the page.
3. Select the request for the board page and check **Headers** → **Request Headers** → **Cookie**. Look for `over18=1`.

![cookies](python_web_crawler_sources/cookies.png)

### Send the Cookie with requests

Pass a dictionary to the `cookies` parameter. Use the `headers` dictionary introduced above.

```python
import requests
from bs4 import BeautifulSoup

url = "https://www.ptt.cc/bbs/Gossiping/index.html"
cookies = {"over18": "1"}

response = requests.get(url, headers=headers, cookies=cookies, timeout=10)
response.raise_for_status()
soup = BeautifulSoup(response.content, "html.parser")

for link in soup.select("div.title a"):
    print(link.get_text(strip=True))
```

Without the cookie, you may receive the age-confirmation page instead of the article list. Sending `over18=1` tells PTT that age confirmation has been completed. Include it in later requests when crawling other Gossiping pages as well.
