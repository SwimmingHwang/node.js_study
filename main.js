var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title,list,body){
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}
  </body>
  </html>
  `;
}

function templateList(fileList){
  var list='<ul>';
  var i = 0;
  while(i<fileList.length)
  {
    list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
    i +=1;
  }
  list= list + '</ul>';
  return list;
}

var app = http.createServer(function(request,response){


    var _url = request.url;
    var queryData = url.parse(_url,true).query;
    var pathname = url.parse(_url,true).pathname;

    if(pathname==='/'){
      var title = queryData.id;
      fs.readdir(`data`, function(err,fileList){
        templateList(fileList);
        fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){
          if(queryData.id === undefined){
            title = 'Welcome';
            description = 'Hello, Node.js';
          }
          var list = templateList(fileList);
          var template = templateHTML(title,list,`<h2>${title}</h2>${description}`)
          response.writeHead(200);
          response.end(template);
        })
      });
    } else {
      response.writeHead(404);
      response.end('Not found');
    }


    //This method signals to the server  /that all of the response headers and body have been sent; that server should consider this message complete. 이 메소드는 모든 response headers와 body가 전송되었다는것을 서버한테 알린다.


    //console.log(__dirname + _url);

    //response.end(fs.readFileSync(__dirname + _url));
    //선택한 파일을 찾아서 읽어주는 코드

});
app.listen(3000);
