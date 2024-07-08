sap.ui.define(["sap/ui/core/format/DateFormat"], function(r) {
    "use strict";
    return {
        formatDate: function(r) {
            jQuery.sap.require("sap.ui.core.format.DateFormat");
            var t = sap.ui.core.format.DateFormat.getDateInstance({
                pattern: "dd.MM.yyyy"
            });
            var e = JSON.stringify(r) +
                .indexOf(")");
            return t.format(new Date(Number(JSON.stringify(r).substring(7, e))))
        },
        formatIBAN: function(r) {
            return r.replace(/[^\dA-Z]/g, "").replace(/(.{4})/g, "$1 ").trim()
        },
        formatBetrag: function(r) {
            if (r) {
                return r.replace(".", ",").trim() + " €"
            }
        }
    }
});