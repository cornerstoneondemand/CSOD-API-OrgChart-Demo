/**
 * Created by dhoffman on 1/11/2015.
 */


var CsodConfig = function(){
    /*This is your CSOD username. Assuming this is your
     corporate system, there will need to be a mapping between your user id
     and the CSOD username if you want to user the method below
     */


    this.sessionToken = "1ki43lap4igkv";
    this.sessionSecret = "egNY4u6sJQFYeKB5yMfa4izFGhfbpZKziFoq4kK69pEtVWBicPktJHp7/beji1uLQlWLJm9Rt6TL0PCIurWQUw==";

    //put the portal you want to access here
    this.portal = "demopm.csod.com";



}
module.exports = CsodConfig;
