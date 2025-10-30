# Web Crawler with browser_cookie3

# Web Crawler with `browser_cookie3` — PTT Gossiping Example

This guide demonstrates how to use [`browser_cookie3`](https://pypi.org/project/browser-cookie3/) to retrieve cookies from your browser and use them in a web crawler to access the [PTT Gossiping board](https://www.ptt.cc/bbs/Gossiping/index.html), which requires a `over18=1` cookie to bypass the age restriction prompt.

---

## 🔧 Requirements

Install the required libraries:

```bash
pip install requests beautifulsoup4 browser-cookie3
```

---

## 🔍 What is `browser_cookie3`?

`browser_cookie3` is a Python library that allows you to programmatically access cookies stored by your browser (Chrome, Firefox, etc.). It can be useful when accessing websites that require session or consent cookies.

---

## 📁 Sample Crawler Code

```python
import requests
import browser_cookie3
from bs4 import BeautifulSoup

def _fetch_cookies_from_browser() -> dict[str, str]:
    """Fetches PTT cookies (like over18=1) from your Chrome browser."""
    cookie_jar = browser_cookie3.chrome(domain_name="ptt.cc")
    local_cookie_dict = requests.utils.dict_from_cookiejar(cookie_jar)

    # Confirming if the essential cookie exists
    cookies = {
        "over18": local_cookie_dict.get("over18", "1")
    }

    print("[Fetched Cookies]", cookies)
    return cookies

def crawl_ptt_gossiping():
    url = "https://www.ptt.cc/bbs/Gossiping/index.html"
    cookies = _fetch_cookies_from_browser()
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }

    response = requests.get(url, headers=headers, cookies=cookies)
    if response.status_code != 200:
        print(f"Failed to retrieve page, status: {response.status_code}")
        return

    soup = BeautifulSoup(response.text, "html.parser")
    articles = soup.select("div.title a")

    print("\n🔥 Latest Posts on PTT Gossiping:")
    for article in articles:
        print(f"- {article.text.strip()} ({article['href']})")

if __name__ == "__main__":
    crawl_ptt_gossiping()
```

---

## 💡 Notes

- If you’ve never visited PTT Gossiping before, make sure to open the page once in Chrome and click "我同意，我已年滿十八歲" to set the `over18=1` cookie.
- You can extend this crawler to scrape post content, authors, dates, or write the data into a CSV/DB.
