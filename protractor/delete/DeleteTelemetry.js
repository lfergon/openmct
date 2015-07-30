var right_click = require("../common/RightMenu.js");
var Create = require("../common/CreateItem")
describe('Delete Telemetry', function() {
    var clickClass = new right_click();
    var createClass = new Create();
    var ITEM_NAME = "Telemetry";
    var ITEM_TYPE = "telemetry";
    var ITEM_MENU_GLYPH = 't\nTelemetry Panel'
    var ITEM_GRID_SELECT = 'P\nt\nTelemetry\n0 Items';
    var ITEM_SIDE_SELECT = ">\nt\nTelemetry"
    beforeEach(require('../common/Launch'));
    it('should delete the Telemetry', function(){
        clickClass.delete(ITEM_SIDE_SELECT);
        browser.sleep(1000);
    });

});