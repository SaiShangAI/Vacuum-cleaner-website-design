data={};
function start(allData,res,paras){ 
    console.log("product_detail_page start");
    LoadData(paras['productid'],allData);
    res.render('product_detail_page.html',{'data':data});
}
 
module.exports.start=start; 

function LoadData(productid,allData){
    img=allData['imageSize_l'][productid];
    data['ProductLImgs']=img;
   data['Description']=allData['Detail'][productid]['Description'];
   data["Price"]=allData['Detail'][productid]['Price']
}