/**
 * Created by dhoffman on 5/8/2015.
 */
var express = require('express');
var router = express.Router();
var CsodApi = require('../csod/csodkit');
var CsodConfig = require('../csod/csodApiConfig');

/*
 * A pass through route that just calls the CSOD api
  * */
router.get('/:db/:entity', function(req, res) {
    var config = new CsodConfig();
    var api = new CsodApi(config);

    var db = req.params.db == "dw";
    var query = req.url.substring(req.url.indexOf("?")+1, req.url.length);

    //Use the CSOD API
    api.getData(req.params.entity, query, function(data){
        var returnJson = JSON.stringify(data);
        res.end(returnJson);
    }, function(e){
        console.log(e.message);
        res.end(e.message);
    }, db);

});

module.exports = router;
