
var express = require('express');
var rp = require('request-promise');
var app = express();
var router = express.Router();
var merchantsCall = function(id) {
    return {
        uri: 'https://api.devexhacks.com/merchant-insights/merchants/' + id,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwicGNrIjoxLCJhbGciOiJkaXIiLCJ0diI6Miwia2lkIjoiYTdxIn0..Jn908J-yYgcKMNJnBlhrJg.J15niJBubgAPK5cSeKL6g78C1yBxirQW9HKZ0k1usVdsFOWY392OlR_qUazosk6EiCW2ge-4ahSUo5x-qooNPNz7bb2hWAXmj4MY81oF3oLMHi6JcAPzjYsVHlZQsAYEKjyUCFR7h8h4WHNSukDgidJ6fqumOHflRWCex_eODLYGlJl-B5ksgMByssOZCOFNX-l8ylDscykKpj79steWwPI_mscsEszAbihjXIliQNw7ysEp0Xyxypcc3YCshYIbVpWNcvA1gvmXPeeC4BB0EhwMbtkPdKHAPohnH-Y0y2xJfqQJ64-sG_k_vIIryQTrzQS_cBDldnvbHWWjR1DdJ0B4bFlQz4ciiIt0j7TH6jJPdWPUzII5mKweoNNrSxtkiR0U5ZHPsOuh9dMB7dlaYJQEDm9f4bm8RGoVyLN4NHBhAGL2LAkwCQ7osIVxEvP5nfeP9qZsZTCzQGzvT-a0V8MycVPxAbP1Nem9BV4oY9SbtVaTCwZv948gYOnNEAGW.ysGRHpe2a1rWDtGh30nRdw'
        },
        json: true
    }
};
var merchants = [];

app.listen(8001, function(request){
    if(request) {
        var ind = request.indexOf('?');
        var array = request.split(ind)[1];
        merchantDetails(array);
    } else {
        console.log('running on 8001');
    }

});

app.use('/', router);

router.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});
var queryMerchants = function(id) {
    rp(merchantsCall(id)).then(function(response) {
        merchants.push(response);
    });
};

var merchantDetails = function (arr) {
    for(let i=0;i<arr.length;i++) {
        queryMerchants(arr.merchantId);
    }
    console.log(merchants);
};