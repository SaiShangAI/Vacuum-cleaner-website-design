var mysql = require('mysql');
var connection;
var connected = false;
// connect MYSQL
module.exports.Connect = function (successfulCallBack) {

    connection = mysql.createConnection({

        multipleStatements: true,
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'vacummcleaner',
        port: 3306
    });

    connection.connect(function (error) {
        if (error) {
            console.log('Error');
        } else {
            console.log('Connected');
            connected = true;
            if (successfulCallBack)
                successfulCallBack();
        }
    });
};
// select category from table and the number of each category
module.exports.getCategory = function (name, callback) {
    var sql = "SELECT " + name + " FROM product";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log("select category failed");
            return;
        }

        var ret = {}
        for (var key in result) {
            var kateName = result[key][name]
            if (kateName in ret) {
                ret[kateName]++;
            } else {
                ret[kateName] = 1;
            }
        }
        if (callback) {
            callback(name, ret);
        }
    });
}

//Get All Image Path form All  Table 
module.exports.getImage = function (name, tableName,callback) {
    var sql = "SELECT " + name + " FROM "+tableName;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log("failed" + err.Message);
            return;
        }
 
        if (callback) {
            callback(result,name);
        }
    });

};

//Get All Detail
module.exports.getDetail = function(callback){
    var sql = "SELECT * FROM product";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log("failed" + err.Message);
            return;
        }
 
        if (callback) {
            callback(result);
        }
    });
}
























/*module.exports.getCategory = function (name, callback) {
    var getCategories = [];
    var counterOfCategory = [];
    var sql = "SELECT " + name + " FROM product";
    // select category from table product and calculate the number of each caltegory
    connection.query(sql, function (err, result) {
        if (err) {
            console.log("select kategorie failed");
        }
        else {
            console.log("select kategorie sucessful");
            console.log(result);

            result.forEach(function (element) {
                var t = getCategories.includes(element[name]);
                if (!t) {
                    getCategories.push(element[name]);
                    var count = result.filter(function (a) {
                        return a[name] == element[name];
                    });
                    console.log(count);
                    console.log(count.length);
                    counterOfCategory.push(count.length);
                }
                if (callback) {
                    callback(getCategories, counterOfCategory);
                }
            })
        }
    })
}*/


