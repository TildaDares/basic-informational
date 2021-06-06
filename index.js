const http = require("http");
const fs = require("fs");
const url = require("url");

const getPage = (pathname) => {
  const paths = ["/", "/about", "/contact-me"];
  if (pathname === "/") {
    return { page: "./index.html", resCode: 200 };
  } else if (!paths.includes(pathname)) {
    return { page: "./404.html", resCode: 404 };
  } else {
    return { page: "." + pathname + ".html", resCode: 200 };
  }
};

http
  .createServer((req, res) => {
    const pathname = url.parse(req.url, true).pathname;
    const { page, resCode } = getPage(pathname);
    fs.readFile(page, (err, data) => {
      res.writeHead(resCode, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);
