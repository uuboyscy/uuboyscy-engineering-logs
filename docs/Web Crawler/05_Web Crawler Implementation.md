# Web Crawler Implementation

## Common Libraries

Python >= 3.10

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