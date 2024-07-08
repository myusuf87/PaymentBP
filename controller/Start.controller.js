sap.ui.define(["sap/ui/core/mvc/Controller", "ZF05_E187_PAYM_OVERVIEW/util/Formatter", "sap/m/MessageBox", "sap/m/MessageToast", "sap/ui/model/Filter"], function(e, t, a, r, s) {
            "use strict";
            var n;
            return e.extend("ZF05_E187_PAYM_OVERVIEW.controller.Start", {
                        onInit: + function() {
                            this.getView().setModel(new sap.ui.model.json.JSONModel, "searchedCandidates")
                        },
                        onSearch: function() {
                                var e = this;
                                var r = this.getView().byId("idSearchInput");
                                r.setValueState("None");
                                r.setBusy(true);
                                var s = this.getView().byId("idSearchButton");
                                s.setE +
                                    nabled(false);
                                var n = r.getValue().trim();
                                var o = [];
                                var i = this.getView().getModel("mainModel");
                                const u = RegExp("^[0-9]+$");
                                if (n) {
                                    if (u.test(n)) {
                                        i.read("/GeschaeftspartnerSet('" + n + "')", {
                                            async: false,
                                            json: true,
                                            success: function(t, a) {
                                                var n = JSON.parse(a.body).d;
                                                o.p +
                                                    ush({
                                                        StepKunnr: n.StepKunnr
                                                    });
                                                if (o.length == 1) {
                                                    e.getOwnerComponent().getRouter().navTo("Overview", {
                                                        query: {
                                                            Bpext: o[0].StepKunnr
                                                        }
                                                    }, false)
                                                } else {
                                                    sap.m.MessageBox.information("Es wurde kein Geschäftspartner gefunden.", {
                                                        title: "Information"
                                                    })
                                                }
                                                s.setEnabled(true);
                                                r +
                                                    .setBusy(false)
                                            },
                                            error: function(e) {
                                                var t = e.statusText;
                                                var n = e.statusCode;
                                                if (n == "404") {
                                                    sap.m.MessageBox.information("Es wurde kein Geschäftspartner gefunden.", {
                                                        title: "Information"
                                                    })
                                                } else {
                                                    a.error(t, {
                                                        details: "HTTP Status " + n + ": " + t
                                                    })
                                                }
                                                s.setEnabled(true);
                                                r.se +
                                                    tBusy(false)
                                            }
                                        })
                                    } else if (!isNaN(parseInt(n[(0, 1, 2)], 10))) {
                                        n = n.toUpperCase();
                                        var l = new sap.ui.model.Filter("StepKunnr", sap.ui.model.FilterOperator.EQ, n);
                                        var d = [l];
                                        i.read("/GeschaeftspartnerSet", {
                                                async: false,
                                                filters: d,
                                                json: true,
                                                success: function(a, n) {
                                                    var i = J +
                                                        SON.parse(n.body).d.results;
                                                    for (var u = 0; u < i.length; u++) {
                                                        jQuery.sap.require("sap.ui.core.format.DateFormat");
                                                        i[u].Geburtsdatum = t.formatDate(i[u].Geburtsdatum);
                                                        if (i[u].Geburtsdatum === "01.01.1900") {
                                                            i[u].Geburtsdatum = ""
                                                        }
                                                        o.push({
                                                            Partner: i[u].Partner,
                                                            StepKunnr +
                                                            : i[u].StepKunnr,
                                                            Vorname: i[u].Vorname,
                                                            Nachname: i[u].Nachname,
                                                            Geburtsdatum: i[u].Geburtsdatum,
                                                            Postleitzahl: i[u].Postleitzahl,
                                                            Ort: i[u].Ort,
                                                            Strasse: i[u].Strasse
                                                        })
                                                    }
                                                    if (o.length == 1) {
                                                        e.getOwnerComponent().getRouter().navTo("Overview", {
                                                            query: {
                                                                Bpext: o[0].StepKunnr
                                                            } +
                                                        }, false)
                                                    } else if (o.length > 1) {
                                                        e.getView().getModel("searchedCandidates").setData(null);
                                                        e.getView().getModel("searchedCandidates").setData(o);
                                                        e._oDialog = sap.ui.xmlfragment(e.createId("selectFragmentId"), "ZF05_E187_PAYM_OVERVIEW.fragment.selectDialog", e);
                                                        e. +
                                                            getView().addDependent(e._oDialog);
                                                        jQuery.sap.syncStyleClass("sapUiSizeCompact", e.getView(), e._oDialog);
                                                        var l = e.byId(sap.ui.core.Fragment.createId("selectFragmentId", "tableId"));
                                                        if (o.length >= 10) {
                                                            l.setVisibleRowCount(10)
                                                        } else {
                                                            l.setVisibleRowCount(o.length + )
                                                        }
                                                        e._oDialog.open();
                                                        l.focus();
                                                        l.setSelectedIndex(-1)
                                                    } else {
                                                        sap.m.MessageBox.information("Es wurde kein Geschäftspartner gefunden.", {
                                                            title: "Information"
                                                        })
                                                    }
                                                    s.setEnabled(true);
                                                    r.setBusy(false)
                                                },
                                                error: function(e) {
                                                    var t = e.statusText;
                                                    var n = e.statusCode;
                                                    if (n == "4+
                                                        04 "){sap.m.MessageBox.information("
                                                        Es wurde kein Geschäftspartner gefunden.
                                                        ",{title:"
                                                        Information "})}else{a.error(t,{details:"
                                                        HTTP Status "+n+": "+t})}s.setEnabled(true);r.setBusy(false)}})}else{var m,p,f,c;m=n.split(", ");f=encodeURIComponent(m[0].trim())+;
                                                        var g;
                                                        var h;
                                                        var d;
                                                        if (m[1] !== undefined) {
                                                            p = encodeURIComponent(m[1].trim());
                                                            g = new sap.ui.model.Filter("Vorname", sap.ui.model.FilterOperator.EQ, p);
                                                            h = new sap.ui.model.Filter("Nachname", sap.ui.model.FilterOperator.EQ, f);
                                                            d = [g, h]
                                                        } else {
                                                            h = new sap.ui.model.Filter(+
                                                                "Nachname", sap.ui.model.FilterOperator.EQ, f);
                                                            d = [h]
                                                        }
                                                        i.read("/GeschaeftspartnerSet", {
                                                                async: true,
                                                                filters: d,
                                                                json: true,
                                                                success: function(a, n) {
                                                                    var i = JSON.parse(n.body).d.results;
                                                                    for (var u = 0; u < i.length; u++) {
                                                                        jQuery.sap.require("sap.ui.core.format.DateFormat");
                                                                        i[u + ].Geburtsdatum = t.formatDate(i[u].Geburtsdatum);
                                                                        if (i[u].Geburtsdatum === "01.01.1900") {
                                                                            i[u].Geburtsdatum = ""
                                                                        }
                                                                        o.push({
                                                                            Partner: i[u].Partner,
                                                                            StepKunnr: i[u].StepKunnr,
                                                                            Vorname: i[u].Vorname,
                                                                            Nachname: i[u].Nachname,
                                                                            Geburtsdatum: i[u].Geburtsdatum,
                                                                            Postleitzahl: i[u].Po +
                                                                                stleitzahl,
                                                                            Ort: i[u].Ort,
                                                                            Strasse: i[u].Strasse
                                                                        })
                                                                    }
                                                                    if (o.length == 1) {
                                                                        e.getOwnerComponent().getRouter().navTo("Overview", {
                                                                            query: {
                                                                                Bpext: o[0].StepKunnr
                                                                            }
                                                                        }, false)
                                                                    } else if (o.length > 1) {
                                                                        e.getView().getModel("searchedCandidates").setData(null);
                                                                        e.getView().getModel("sea+
                                                                            rchedCandidates ").setData(o);e._oDialog=sap.ui.xmlfragment(e.createId("
                                                                            selectFragmentId "),"
                                                                            ZF05_E187_PAYM_OVERVIEW.fragment.selectDialog ",e);e.getView().addDependent(e._oDialog);jQuery.sap.syncStyleClass("
                                                                            sapUiSizeCompact ",e.getView(),e._oDialog);var l=e+
                                                                            .byId(sap.ui.core.Fragment.createId("selectFragmentId", "tableId"));
                                                                            if (o.length >= 10) {
                                                                                l.setVisibleRowCount(10)
                                                                            } else {
                                                                                l.setVisibleRowCount(o.length)
                                                                            }
                                                                            e._oDialog.open(); l.focus(); l.setSelectedIndex(-1)
                                                                        }
                                                                        else {
                                                                            sap.m.MessageBox.information("Es wurde kein Geschäfts+
                                                                                partner gefunden.
                                                                                ",{title:"
                                                                                Information "})}s.setEnabled(true);r.setBusy(false)},error:function(e){var t=e.statusText;var n=e.statusCode;a.error("
                                                                                Es wurde kein Geschäftspartner gefunden.
                                                                                ",{details:"
                                                                                HTTP Status "+n+": "+t});s.setEnabled(true);r.setBusy(fals+
                                                                                e)
                                                                        }
                                                                    })
                                                            }
                                                        }
                                                        else {
                                                            s.setEnabled(true);
                                                            r.setBusy(false);
                                                            r.setValueState("Error");
                                                            a.error("Bitte geben Sie ein Suchkriterium ein.")
                                                        }
                                                    }, onConfirm: function(e) {
                                                        var t = e.getSource().getContextByIndex(e.getSource().getSelectedIndices()).getObject().StepKunnr;
                                                        this.getOwn +
                                                            erComponent().getRouter().navTo("Overview", {
                                                                query: {
                                                                    Bpext: t
                                                                }
                                                            }, false)
                                                    }, onDialogCloseEscape: function(e) {
                                                        e.getSource().destroy()
                                                    }, onDialogCloseButton: function(e) {
                                                        e.getSource().getParent().destroy()
                                                    }
                                                })
                                        });
                                    //# sourceMappingURL=Start.controller.js.map