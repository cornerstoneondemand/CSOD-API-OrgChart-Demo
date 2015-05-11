/**
 * Created by dhoffman on 1/12/2015.
 */

//var orgChartQuery = "/userchart?" + $("#custom-search-input input").val();
//
//orgchart(orgChartQuery, $(document).width() *.95 , $(document).height()* 0.8); //, );

function refreshOrgChart(){
    orgChartQuery = "/userchart?" + $("#custom-search-input input").val();

    $("#tree-container").empty();

    orgchart(orgChartQuery, $(document).width(), $(document).height()* 0.90); //, );
}

$("#custom-search-input button").click(refreshOrgChart);
$("#custom-search-input input").keypress(function(event){
    //handle enter keypress
    if(event.which == 13){
        refreshOrgChart();
    };
});

refreshOrgChart();
