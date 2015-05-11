var express = require('express');
var router = express.Router();
var CsodApi = require('../csod/csodkit');
var CsodConfig = require('../csod/csodApiConfig');

/**
 * Created by dhoffman on 2/9/2015.
 */
router.get('/', function(req, res) {

    var config = new CsodConfig();
    var api = new CsodApi(config);

    //Use the CSOD API
    api.getData("Transcript","$select=UserID,ObjectId,TranscriptDueDate", function(data){
        //console.log('BODY: ' + chunk);
        //res.json(chunk);

        //res.end(JSON.stringify(data));

        var returnJson = JSON.stringify(data);
        res.end(returnJson);
    }, function(e){
        console.log(e.message);
        res.end(e.message);
    }, true);


});

module.exports = router;