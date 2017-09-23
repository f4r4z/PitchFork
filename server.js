
var express = require('express');
var rp = require('request-promise');
var app = express();
var router = express.Router();
var options = {
    uri: 'some link',
    headers: {
        'Content-Type': 'applicaiton/json'
    },
    json: true
}

app.listen(8001, function(){
    console.log('App running on 8001 port')
})

app.use('/', router);

router.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});

router.get('/', function(req, res) {
    res.send('homepage works');
});

router.get('/gimmeData', function(req, res) {

    rp('https://nxg-order-service-int.u1.app.cloud.comcast.net/api/v1/nxgorder/order/502/activation/info').then(function(response) {
        // take the request, add the client ID and the secret and make an API call to get the token,
        // res.status(response.statusCode);
        // once you get the token send it back to the client

        res.send(response);
        console.log('success');
    }).catch(function(err){
        // otherwise say it failed
        res.send(err);
        console.log('fail');
    });
})

