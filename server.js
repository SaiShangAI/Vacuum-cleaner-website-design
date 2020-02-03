var DB = require('./DB.js');
var express = require("express");
var port = 1200;
var app = express();
var bodyParser = require("body-parser");
var url = require('url');
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/*.html', function (req, res) {
    // 解析请求，包括文件名
    var pathname = url.parse(req.url).pathname;

    // 输出请求的文件名
    console.log("Request for " + pathname + " received.");
    pathname = pathname.replace('/', '');
 
    var params = url.parse(req.url, true).query;
    productid=params['productid'];
    console.log("Request for prodcut " + productid);

    res.render(pathname,{'ProductID':productid,
                         'ProductImage':allData});
    
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//pack all variable for DB. 
var allData = {}
var allImage;
function allcategoriesIC(name, dat) {
  allData[name] = dat;
}




DB.Connect(afterConnect);
var name = "Kategorie";
var brand = "Marke";
function afterConnect() {

  DB.getCategory("Marke", allcategoriesIC);
  DB.getCategory("Kategorie", allcategoriesIC);

  DB.getImage("imageSize_l", "productimage", saveImageData);
  DB.getImage("BrandImage", "brand", saveBrandImage);
}


// get needed image from brand
function saveBrandImage(data, name) {
  res = []
  for (var key in data) {
    //each path of brand image
    str = data[key][name];

    var correct = '';
    var index = str.indexOf("Image");
    if (index > -1) {
      correct = str.slice(index);
    }
    //find exist
    if (!res.includes(correct) && correct != '') {
      res.push(correct);
    }


  }

  allData[name] = res;
}

// get needed image from table , then load them into front end 
function saveImageData(data, name) {

  //combine all data into object
  ret = {}
  for (key in data) {
    //get images for one product
    var imagePath = data[key][name];
    var jdata = JSON.parse(imagePath);

    //put the images into object, key is product id(0,1,2,3,4...)
    ret[key] = jdata;
  }


  allImage = ret;
}
//Load images
function LoadImag(startPos = 0, number = 10) {

  //save all first picture into a list
  var list = []

  //Load the first picture for one product
  for (var i = startPos; i < startPos + number; i++) {
    var firstProductImage = allImage[i][0];
    //process path, get correct relative path of image
    var index = firstProductImage.indexOf("Image");
    if (index > -1) {
      var correct = firstProductImage.slice(index);
      list.push(correct);
    }
  }

  //add the list to allData
  allData['ShowImages'] = list;

}
//Load Image to category_page
app.get('/', function (req, res) {
  //
  LoadImag();
  res.render('category_page', { 'allData': allData });

})

//a("BrandImage","brand");

// listen port 1200
app.listen(port, function () {
  console.log("server runs on port " + port);
});
