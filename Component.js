sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/Device", "ZF05_E187_PAYM_OVERVIEW/model/models"], function(e, t, i) {
    "use strict";
    return e.extend("ZF05_E187_PAYM_OVERVIEW.Component", {
        metadata: {
            manifest: "json"
        },
        init: function() {
            e.prototype.init.apply(this, argu +
                ments);
            this.setModel(i.createDeviceModel(), "device");
            this.getRouter().initialize()
        }
    })
});
