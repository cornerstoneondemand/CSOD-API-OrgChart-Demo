/**
 * Created by dhoffman on 7/13/2015.
 */

var express = require('express');
var router = express.Router();
var CsodApi = require('../csod/csodkit');
var CsodConfig = require('../csod/csodApiConfig');

/* GET users listing. */
router.get('/', function(req, res) {

    res.render('user', { title: 'User Creation Demo' });
});
/**
 * posts the form data to create a new user
 */
router.post('/', function(req, res){
    var config = new CsodConfig();
    var api = new CsodApi(config);

    var employee = req.body;
    employee.RequiredTrainingApprovals = 0;
    employee.StatusId = 1;
    employee.AllowReconciliation = "false";
    employee["Division@odata.bind"] = "Division(10)";

    //Use the CSOD API
    api.createData('Employee', employee, function(data){
        var returnJson = JSON.stringify(data);
        //res.end(returnJson);
        res.redirect("/");
    }, function(err){
        console.log(e.message);
        res.end(e.message);
    });
});

module.exports = router;
