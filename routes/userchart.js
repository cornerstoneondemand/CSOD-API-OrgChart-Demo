var express = require('express');
var router = express.Router();

//include the Csod API toolkits
var CsodApi = require('../csod/csodkit');
var CsodConfig = require('../csod/csodApiConfig');
//var utf8 = require('utf8');

/*
Converts the employee node into a friendly object for the
front end d3 library
 */
function createOrgChartNode(data, parentName){
    var parent = (parentName == null)? "null": parentName;
    var node = {
        "Id": data.Id,
        "DirectManagerId": data.DirectManagerId,
        "name": data.FirstName +" "+ data.LastName,
        "parent": parent,
        "children": []
    }
    return node;
}
/*
Goes through the employee list and build out the
 */
function buildOrgChart(employees){
    var userDictionary = new Array();

    //the d3 library requires a root node
    var orgChart = {
        "name": "DemoPM OrgChart",
        "parent": "null",
        "children": [],
        "Id": ""
    };
    if(typeof employees.value != 'undefined' && employees.value != null ) {
        for (var i = 0; i < employees.value.length; i++) {
            var node = employees.value[i];

            //removing all the standard admin accounts
            if (node.Id > 12) {
                if (!hasManager(node, employees)) {
                    var orgChartNode = createOrgChartNode(node, null);
                    findReports(orgChartNode, employees);

                    if (orgChartNode.children.length > 0) {
                        orgChart.children.push(orgChartNode);
                    }

                }
            }
        }
    }
    return orgChart;
}

function hasManager(current, employees){
    for(var i=0; i<employees.value.length; i++) {
        var employee = employees.value[i];
        if(current.DirectManagerId == employee.Id){
            return true;
        }
    }
    return false;
}

/*
This is a simple recursive function that finds the reports for the node
given the list of employees
 */
function findReports(node, employees){
    for(var i=0; i<employees.value.length; i++){
        var employee = employees.value[i];
        if(node.Id == employee.DirectManagerId){
            var orgChartNode = createOrgChartNode(employee, node.name);
            node.children.push(orgChartNode);
            findReports(orgChartNode, employees);
        }
    }
}


/* This will pull all the user data from the demopm portal
* It will be returned as an orgchart of json objects
* */
router.get('/', function(req, res) {


    var api = new CsodApi(new CsodConfig());
    var query = req.url.substring(req.url.indexOf("?")+1, req.url.length);


    //Use the CSOD API 
    api.getData("Employee", query, function(data){
        //console.log('BODY: ' + chunk);
        //res.json(chunk);
        var orgChart = buildOrgChart(data);
        //res.end(JSON.stringify(data));

        var returnJson = JSON.stringify(orgChart);
        res.end(returnJson);
    }, function(e){
        console.log(e.message);
        res.end(e.message);
    }, false);


});


module.exports = router;
/**
 * Created by dhoffman on 12/29/2014.
 */
