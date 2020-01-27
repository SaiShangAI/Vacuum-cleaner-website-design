var fs = require('fs');
var DB = require("./DBmanagement.js");


//connect DB
DB.connection(function(){});

function ChangePath(obj,text){
    for(var productName in obj){
        product=obj[productName];
        image_l=product[text];
        for(var index in image_l){
            addr=image_l[index];
            split=addr.split('/');
            imageName=split[split.length-1]
            obj[productName][text][index]='Image/ImageSizeL/product'+index+'/'+imageName;
        }
    }
}

fs.readFile('./json2.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    var obj = JSON.parse(data);
    ChangePath(obj,'image_l');
    ChangePath(obj,'image_s');
    //Change Brand Logo Path
    for(var productName in obj){
        product=obj[productName];
        
        brandlogo=product['BrandLogo'];
        split=brandlogo.split('/');
        brandLogoName=split[split.length-1]

        obj[productName]['BrandLogo']='Image/BrandLogo/'+brandLogoName;
    }

    //save to json file
    strJson=JSON.stringify(obj);
    fs.writeFile('./json3.json',strJson,'utf8',function(){

    });

    //save to db
     
});