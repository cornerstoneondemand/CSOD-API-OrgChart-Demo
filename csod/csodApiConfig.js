/**
 * Created by dhoffman on 1/11/2015.
 */

/**
 *
 * @constructor
 */

var CsodConfig = function(){

    this.apiToken = process.env.CSOD_API_TOKEN;
    this.apiSecret = process.env.CSOD_API_SECRET;

    this.sessionToken = process.env.CSOD_SESSION_TOKEN;
    this.sessionSecret = process.env.CSOD_SESSION_SECRET;

    //put the portal you want to access here
    this.portal = process.env.CSOD_PORTAL;

}
module.exports = CsodConfig;
