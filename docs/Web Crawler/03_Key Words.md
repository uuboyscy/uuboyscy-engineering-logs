# Key Words

When you open a web page, your browser sends a **request** to a server. The server sends back a **response**, such as an HTML page.

## URL

A URL is the address of a resource, such as a page or an image.

Example: [https://httpbin.org/get?category=books](https://httpbin.org/get?category=books)

- `https`: the protocol used to communicate.
- `httpbin.org`: the website's domain name.
- `/get`: the path to the resource.
- `?category=books`: query string parameters; here, we send `category` with the value `books`.

httpbin is a service for testing HTTP requests. This endpoint returns JSON showing what you sent; it does not search for actual books.

## HTTP Methods

The method tells the server what you want to do.

- **GET**: retrieve data. Example: open a product page or search for books.
- **POST**: send data for the server to process. Example: submit data through a form.

## Headers

Headers contain extra information about a request or response.

- `User-Agent`: information about the client making the request, such as a browser.
- `Content-Type`: describes the format of the message body, such as `text/html` or `application/json`.

## Cookies

Cookies are small pieces of data that a website asks your browser to store. The browser sends matching cookies with later requests.

**Example:** After you log in, a session cookie can help the website recognize you when you open another page.

## Request Data: Query Parameters and Payload

You can send information to a server in the URL or in the request body.

- **Query string parameters** appear after `?` in the URL. Use `&` to separate multiple parameters.
  - Example: [https://httpbin.org/get?q=python&page=2](https://httpbin.org/get?q=python&page=2) sends two parameters: `q=python` and `page=2`.
  - Open the link and look for `"args"` in the JSON response. Change the values in the URL to see how the response changes.
- **Payload** usually means data in the request body. Two common formats are:
  - **Form data**: fields submitted by a form, such as `username=alice`.
  - **JSON**: structured data, such as `{"keyword": "python", "page": 2}`.

Query parameters and a request body can be used together. A POST request can include both.

## Developer Tools (Google Chrome)

Use **Google Chrome** for this course so everyone can follow the same interface and steps.

Chrome Developer Tools (DevTools) let you inspect a page and the requests it makes. Open a website in Chrome, right-click the page, and choose **Inspect** to open DevTools.

- **Elements**: inspect the page's current HTML structure. Use this to find a title, link, or table you want to collect.
- **Network**: inspect requests and responses. Open this tab, refresh the page, and select a request to see its URL, method, headers, cookies, and data.
