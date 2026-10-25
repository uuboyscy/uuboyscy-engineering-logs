# Before Writing a Web Crawler

A typical workflow is:

**Send a request → Receive HTML or JSON → Extract data → Save the result**

Before writing code, open the target website in **Google Chrome** and find out where the data comes from.

## Common Libraries and Tools

**Python 3.14** is recommended.

| Library | What it does | Simple example |
|---|---|---|
| `requests` | Sends HTTP requests and receives responses | Download a page's HTML or request JSON data |
| `bs4` (BeautifulSoup) | Finds and extracts data from HTML | Get all article titles inside `<h2>` tags |
| `pandas` | Organizes data into tables | Save collected titles and prices to a CSV file |
| `selenium` | Controls a real browser | Click a button and wait for content to appear |

## Static Web Pages

Start by checking whether the data is already in the server's HTML response. If it is, use `requests` to download it and `bs4` to extract the data.

**Example:** Extract a title from `<h2>Python Basics</h2>`.

## Dynamic Web Pages

Some pages use **JavaScript** to load data after the initial HTML arrives. `requests` does not run JavaScript, so that data may be missing from its response.

**Example:** More products appear after clicking **Load more** or **scrolling down**.

Open Chrome DevTools → **Network**, then click or scroll to load more content. Find the request that returns the new data. If you can access it directly, use `requests`; otherwise, browser automation may help.

## Web Automation

Use **Selenium with Google Chrome** to control a browser: click buttons, enter text, scroll, and run JavaScript.

**Example:** Click **Load more**, wait for new products to appear, then collect their names.

Use `requests` when it can retrieve the data directly. Use Selenium when browser interaction is needed. it is usually slower and uses more resources.
