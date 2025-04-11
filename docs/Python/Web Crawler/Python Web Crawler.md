# Python Web Crawler

# Preset

## What is Web Crawling?

The process of automatically accessing and extracting data from websites.\
Use cases: news aggregation, price tracking, data collection for ML, etc.

## HTML Basic

- Quick view
    
    [https://www.ptt.cc/bbs/Gossiping/index.html](https://www.ptt.cc/bbs/Gossiping/index.html)
    
    `view-source:https://www.ptt.cc/bbs/Gossiping/index.html`

- What is HTML
  - HTML (HyperText Markup Language)
  - A markup language
  - Used to define structure and content of a web page.
    
- Tag and attribute
    
    ```html
    <tag attribute="something"> content </tag>
    ```

- HTML example
    ```html
    <!DOCTYPE html>
    <html>
    <head>
        <title>My First Web Page</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        <p>This is a paragraph.</p>
    </body>
    </html>
    ```
    
    - Simple example
        
        ![Untitled](Python%20Web%20Crawler/Untitled.png)
        
        ![Untitled](Python%20Web%20Crawler/Untitled%201.png)
        
    - Common HTML Elements (tags)

        | Element | Description | Example |
        |--------|-------------|---------|
        | `<html>` | Root element of the HTML document | `<html>...</html>` |
        | `<head>` | Page info (not shown on screen) | `<title>`, `<meta>` |
        | `<body>` | Main content — this is what crawlers focus on | `<h1>`, `<p>`, `<div>` |
        | `<h1>`~`<h6>` | Headings (h1 is largest) | `<h1>Title</h1>` |
        | `<p>` | Paragraph | `<p>This is text.</p>` |
        | `<a>` | Hyperlink | `<a href="https://example.com">Click me</a>` |
        | `<img>` | Image | `<img src="image.jpg">` |
        | `<div>` / `<span>` | Containers for grouping content | `<div>Block</div>` |
        | `<table>` | Table (commonly used for prices, rankings, etc.) | `<table>...</table>` |
    
    - Sample
        
        [https://github.com/uuboyscy/course-html/tree/master](https://github.com/uuboyscy/course-html/tree/master)
        
- Headers
- Cookies
- Payload
    - Query string parameters (url?arg1=123&arg2=456)
    - form data (POST from form)
- Writing HTML
    - [https://replit.com/](https://replit.com/)

## URL

![Untitled](Python%20Web%20Crawler/Untitled%202.png)

- Parameters
    
    url?param1=val1&param2=var2
    
    [https://www.google.com](https://www.google.com/)
    

## HTTP Methods

- GET
- POST

## Developer Tools

- Element
- Network

## Common Libraries

Python >= 3.8

- requests
- bs4 (BeautifulSoup)
- selenium
- pandas
- jupyter

# Static Web Page

## Libraries

- Requests
- BeautifulSoup
- Selenium
- Pandas

## Implement

- PTT
    
    [https://github.com/uuboyscy/course-PyETL/blob/master/part02_pttArticleWithCookie/04_pttMovieEveryPageArticle.py](https://github.com/uuboyscy/course-PyETL/blob/master/part02_pttArticleWithCookie/04_pttMovieEveryPageArticle.py)
    
- Pandas read_html
    
    [https://github.com/uuboyscy/course-PyETL/blob/master/part06_usefulPackages/02_pandas_read_html.ipynb](https://github.com/uuboyscy/course-PyETL/blob/master/part06_usefulPackages/02_pandas_read_html.ipynb)
    
- POST
    
    Sample URL:
    
    [https://5468-118-163-131-11.ngrok-free.app/hello_post](https://5468-118-163-131-11.ngrok-free.app/hello_post)
    

# Dynamic Web Page

## Libraries

- Requests
- JSON

## Implement

- Nownews (GET)
    
    [https://github.com/uuboyscy/course-PyETL/blob/master/part05_dynamicWebPage/06_nownews.py](https://github.com/uuboyscy/course-PyETL/blob/master/part05_dynamicWebPage/06_nownews.py)
    
- Newmobilelife (POST)
    
    [https://github.com/uuboyscy/course-PyETL/blob/master/part05_dynamicWebPage/05_newmobilelife.py](https://github.com/uuboyscy/course-PyETL/blob/master/part05_dynamicWebPage/05_newmobilelife.py)
    

# Selenium

## Libraries

- Selenium

## Driver environment

- Chrome driver
    
    [https://googlechromelabs.github.io/chrome-for-testing/](https://googlechromelabs.github.io/chrome-for-testing/)
    
- Steps:
    - Initiate driver
        
        ```python
        service = Service("./chromedriver")
        driver = Chrome(service=service)
        ```
        
    - driver.get(`url`)
    - driver.find_element(`by`, `value`)
    - driver.execute_script(`javascript`)
    - driver.close()

## Implement

- PTT
    
    [https://github.com/uuboyscy/course-PyETL/blob/master/part07_selenium/00_seleniumUsage.py](https://github.com/uuboyscy/course-PyETL/blob/master/part07_selenium/00_seleniumUsage.py)
    
- Dcard
    
    [https://github.com/uuboyscy/course-PyETL/blob/master/part07_selenium/04_dcard.py](https://github.com/uuboyscy/course-PyETL/blob/master/part07_selenium/04_dcard.py)
    
- Options and remote driver