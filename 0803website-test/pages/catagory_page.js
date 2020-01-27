data = {};

function start(allData, res) {

    console.log("catagory_page start");

    LoadData(allData);

    res.render('category_page', { 'allData': data });
}

module.exports.start = start;

//Load images
function LoadData(allData, startPos = 0, number = 10) {

    //save all first picture into a list
    var list = []
    var des = []
    var prices = []
    var stars = []

    //Load the first picture for one product
    for (var i = startPos; i < startPos + number; i++) {
        var firstProductImage = allData['imageSize_l'][i][0];
        var productDes = allData['Detail'][i]['Description'];
        var productPri = allData['Detail'][i]['Price'];
        var productStr = parseInt(allData['Detail'][i]['Rating']);
        if (isNaN(productStr))
            productStr = 0;
        list.push(firstProductImage);
        des.push(productDes);
        prices.push(productPri);
        stars.push(productStr)
    }

    //add the list to allData
    data['ShowImages'] = list;
    data['BrandImage'] = allData['BrandImage'];
    data['Marke'] = allData['Marke'];
    data['Kategorie'] = allData['Kategorie'];
    data['Descriptions'] = des;
    data['Prices'] = prices;
    data['Stars'] = stars;
}