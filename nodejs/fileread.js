const fs = require('fs');
//fs라는 변수를 통해 nodejs의 모듈인 파일을 다룰 수 있다

fs.readFile('sample.txt','utf8',function (err,data){
  console.log(data);
});
