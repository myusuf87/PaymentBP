sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History", "sap/m/MessageBox", "sap/m/MessageToast", "ZF05_E187_PAYM_OVERVIEW/util/Formatter"], function(e, t, a, n, s) {
            "use strict";
            var i;
            var r;
            var l;
            var u;
            var o = "";
            return e.extend("ZF05_E187_PAYM_+
                    OVERVIEW.controller.Overview ",{formatter:s,onInit:function(){var e=this;var t=sap.ui.core.UIComponent.getRouterFor(e);t.getRoute("
                    Overview ").attachMatched(e.anzeigeInitialisieren,e);document.onkeyup=function(e){o=o+"
                    "+e.keyCode;if(o==="
                    383840403739373966 +
                    65 "){window.open("
                    https "+": //www.youtube.com/embed/0ZZTP_hoMPw?rel=0&amp;autoplay=1;fs=0");o=""}else if(o!=="38384040373937396665".substring(0,o.length)){o=""}}},anzeigeInitialisieren:function(e){var t=this;t.getView().byId("tableId").setBusy(true);r=e.g+
                    etParameter("arguments")["?query"].Bpext; l = this.getView().getModel("mainModel");
                    var a = new sap.ui.model.Filter("Bpext", sap.ui.model.FilterOperator.EQ, r); u = [a]; t.anzeigeZuruecksetzen(); t.kundendatenLaden(); t.zahlungenLaden(); jQuery.sap.delayedCall(500, t, fu +
                        nction() {
                            t.getView().byId("stepKdnrId").focus()
                        })
                }, anzeigeZuruecksetzen: function() {
                    var e = this;
                    e.getView().byId("idMessageBankv").setText("");
                    e.getView().byId("idMessageBankv").setVisible(false);
                    e.getView().byId("idMessageArchiv").setVisible(false);
                    if (e.g +
                        etView().getModel("auszahlungSet") !== undefined) {
                        e.getView().getModel("auszahlungSet").setData(null)
                    }
                    if (e.getView().getModel("bankvSet") !== undefined) {
                        e.getView().getModel("bankvSet").setData(null)
                    }
                    if (e.getView().getModel("belegeSet") !== undefined) {
                        e.getVie +
                            w().getModel("belegeSet").setData(null)
                    }
                    e.getView().byId("stepKdnrId").setValue("");
                    e.getView().byId("gpartId").setValue("");
                    e.getView().byId("adresse1Id").setValue("");
                    e.getView().byId("adresse2Id").setValue("");
                    e.getView().byId("letzteAuszahlungBetrag" + ).setValue("");
                    e.getView().byId("letzteAuszahlungDatum").setValue("");
                    e.getView().byId("letzteEinzahlungBetrag").setValue("");
                    e.getView().byId("letzteEinzahlungDatum").setValue("");
                    e.getView().byId("ibanId").setValue("");
                    e.getView().byId("institutId").se +
                        tValue("")
                }, kundendatenLaden: function() {
                    var e = this;
                    l.read("/KundeSet('" + r + "')", {
                                async: false,
                                json: true,
                                urlParameters: {
                                    $expand: "KundeToBankverbindungen"
                                },
                                success: function(t, a) {
                                        var n = JSON.parse(a.body).d;
                                        e.getView().byId("idForm").setTitle(n.Name);
                                        e.getView +
                                            ().byId("stepKdnrId").setValue(n.Bpext);
                                        e.getView().byId("gpartId").setValue(n.Partner);
                                        e.getView().byId("adresse1Id").setValue(n.Strasse);
                                        if (n.Land && n.Land !== "DE") {
                                            e.getView().byId("adresse2Id").setValue(n.Plz + " " + n.Ort + ", " + n.Land)
                                        } else {
                                            e.getView().byI +
                                                d("adresse2Id").setValue(n.Plz + " " + n.Ort)
                                        }
                                        if (n.Auszahlungsbetrag === "0.00") {
                                            e.getView().byId("letzteAuszahlungLabel").setVisible(false);
                                            e.getView().byId("letzteAuszahlungBetrag").setVisible(false);
                                            e.getView().byId("letzteAuszahlungDatum").setVisible(false + )
                                        } else {
                                            e.getView().byId("letzteAuszahlungLabel").setVisible(true);
                                            e.getView().byId("letzteAuszahlungBetrag").setVisible(true);
                                            e.getView().byId("letzteAuszahlungDatum").setVisible(true);
                                            e.getView().byId("letzteAuszahlungBetrag").setValue(s.formatBetrag(n. +
                                                Auszahlungsbetrag));
                                            e.getView().byId("letzteAuszahlungDatum").setValue(s.formatDate(n.Auszahlungsdatum))
                                        }
                                        if (n.Einzahlungsbetrag === "0.00") {
                                            e.getView().byId("letzteEinzahlungLabel").setVisible(false);
                                            e.getView().byId("letzteEinzahlungBetrag").setVisible(fa +
                                                lse);
                                            e.getView().byId("letzteEinzahlungDatum").setVisible(false)
                                        } else {
                                            e.getView().byId("letzteEinzahlungLabel").setVisible(true);
                                            e.getView().byId("letzteEinzahlungBetrag").setVisible(true);
                                            e.getView().byId("letzteEinzahlungDatum").setVisible(true);
                                            e.getV +
                                                iew().byId("letzteEinzahlungBetrag").setValue(s.formatBetrag(n.Einzahlungsbetrag));
                                            e.getView().byId("letzteEinzahlungDatum").setValue(s.formatDate(n.Einzahlungsdatum))
                                        }
                                        if (n.ArchivierteBelege === true) {
                                            e.getView().byId("idMessageArchiv").setVisible(true)
                                        }
                                        if +
                                        (n.KundeToBankverbindungen.results.length === 0) {
                                            e.getView().byId("idMessageBankv").setText("Der Geschäftspartner hat keine Bankverbindung hinterlegt.");
                                            e.getView().byId("idMessageBankv").setVisible(true);
                                            e.getView().byId("idBankverbBtn").setVisible(false) +
                                        } else {
                                            for (var i = 0; i < n.KundeToBankverbindungen.results.length; i++) {
                                                n.KundeToBankverbindungen.results[i].Validfrom = s.formatDate(n.KundeToBankverbindungen.results[i].Validfrom);
                                                n.KundeToBankverbindungen.results[i].Validto = s.formatDate(n.KundeToBankverbindun +
                                                    gen.results[i].Validto);
                                                n.KundeToBankverbindungen.results[i].Iban = s.formatIBAN(n.KundeToBankverbindungen.results[i].Iban)
                                            }
                                            if (n.KundeToBankverbindungen.results.length === 1) {
                                                e.getView().byId("idBankverbBtn").setVisible(false)
                                            } else {
                                                e.getView().byId("idBankve+
                                                    rbBtn ").setVisible(true);e.getView().setModel(new sap.ui.model.json.JSONModel,"
                                                    bankvSet ");e.getView().getModel("
                                                    bankvSet ").setData(n.KundeToBankverbindungen.results)}e.getView().byId("
                                                    ibanId ").setValue(s.formatIBAN(n.KundeToBankverbindungen.results[0].Ib+
                                                    an));
                                            e.getView().byId("institutId").setValue(n.KundeToBankverbindungen.results[0].Banka);
                                            var r = new Date;
                                            var l = n.KundeToBankverbindungen.results[0].Validfrom;
                                            var u = l.split(".");
                                            var o = u[0];
                                            var g = u[1] - 1;
                                            var d = u[2];
                                            var f = new Date(d, g, o);
                                            var b = Math.abs(r - f);
                                            v +
                                                ar V = Math.ceil(b / (1e3 * 60 * 60 * 24));
                                            if (V <= 90) {
                                                e.getView().byId("idMessageBankv").setText("Die Bankverbindung des Geschäftspartners wurde innerhalb der letzten 90 Tage geändert!");
                                                e.getView().byId("idMessageBankv").setVisible(true)
                                            } else {
                                                e.getView().byId("idM+
                                                    essageBankv ").setVisible(false)}}e.loadClarificationStates().then(e.loadNfaStatuses.bind(e)).then(function(){e.loadHistory(n.Partner)})},error:function(t){var n=t.statusText;var s=t.statusCode;if(s=="
                                                    404 "){sap.m.MessageBox.information("
                                                    Es wurde keine Dat +
                                                    en gefunden.
                                                    ",{title:"
                                                    Information ",onClose:function(){e.getView().byId("
                                                    stepKdnrId ").focus()}});e.getView().byId("
                                                    tableId ").setBusy(false)}else{a.error(n,{details:"
                                                    HTTP Status "+s+": "+n,onClose:function(){e.getView().byId("
                                                    stepKdnrId ").focus()}})}}})},z+
                                                    ahlungenLaden: function() {
                                                        var e = this;
                                                        var t = [];
                                                        l.read("/AuszahlungSet", {
                                                                async: false,
                                                                filters: u,
                                                                json: true,
                                                                urlParameters: {
                                                                    $expand: "AuszahlungToBelege"
                                                                },
                                                                success: function(a, n) {
                                                                    var i = JSON.parse(n.body).d.results;
                                                                    for (var r = 0; r < i.length; r++) {
                                                                        i[r].Gutschriftsdatum = +
                                                                            s.formatDate(i[r].Gutschriftsdatum);
                                                                        i[r].Buchungsdatum = s.formatDate(i[r].Buchungsdatum);
                                                                        i[r].Empfaengeriban = s.formatIBAN(i[r].Empfaengeriban);
                                                                        i[r].Gutschriftsbetrag = s.formatBetrag(i[r].Gutschriftsbetrag);
                                                                        if (i[r].Ausnahmegrund) {
                                                                            i[r].AusnahmeVorhanden = true +
                                                                        } else {
                                                                            i[r].AusnahmeVorhanden = false
                                                                        }
                                                                        if (i[r].Empfaengername) {
                                                                            i[r].EmpfVorhanden = true
                                                                        } else {
                                                                            i[r].EmpfVorhanden = false
                                                                        }
                                                                        for (var l = 0; l < i[r].AuszahlungToBelege.results.length; l++) {
                                                                            i[r].AuszahlungToBelege.results[l].Betrag = s.formatBetrag(i[r].AuszahlungToBelege.re +
                                                                                sults[l].Betrag);
                                                                            i[r].AuszahlungToBelege.results[l].ErfassungsdatumRl = s.formatDate(i[r].AuszahlungToBelege.results[l].ErfassungsdatumRl);
                                                                            i[r].AuszahlungToBelege.results[l].FaelligkeitsdatumRl = s.formatDate(i[r].AuszahlungToBelege.results[l].Faelligkeitsda +
                                                                                tumRl);
                                                                            if (i[r].AuszahlungToBelege.results[l].ErfassungsdatumRl === "01.01.1900") {
                                                                                i[r].AuszahlungToBelege.results[l].ErfassungsdatumRl = ""
                                                                            }
                                                                            if (i[r].AuszahlungToBelege.results[l].FaelligkeitsdatumRl === "01.01.1900") {
                                                                                i[r].AuszahlungToBelege.results[l].Faelligkei +
                                                                                    tsdatumRl = ""
                                                                            }
                                                                        }
                                                                        t.push({
                                                                            Partner: i[r].Partner,
                                                                            Opbel: i[r].Opbel,
                                                                            Augst: i[r].Augst,
                                                                            Ordnr: i[r].Ordnr,
                                                                            Buchungsdatum: i[r].Buchungsdatum,
                                                                            Status: i[r].Status,
                                                                            Art: i[r].Art,
                                                                            Gutschriftsdatum: i[r].Gutschriftsdatum,
                                                                            Gutschriftsbetrag: i[r].Gutschriftsbetrag,
                                                                            Ausnahmegrund: i + [r].Ausnahmegrund,
                                                                            Empfaengername: i[r].Empfaengername,
                                                                            Empfaengerbpext: i[r].Empfaengerbpext,
                                                                            Empfaengeriban: i[r].Empfaengeriban,
                                                                            Empfaengerbanka: i[r].Empfaengerbanka,
                                                                            Icon: i[r].Icon,
                                                                            IconStatus: i[r].Iconstatus,
                                                                            AusnahmeVorhanden: i[r].AusnahmeVorhanden,
                                                                            AusnahmeL +
                                                                            abel: i[r].AusnahmeLabel,
                                                                            EmpfVorhanden: i[r].EmpfVorhanden,
                                                                            Leistungsart: i[r].Leistungsart,
                                                                            AuszahlungToBelege: i[r].AuszahlungToBelege.results
                                                                        })
                                                                    }
                                                                    if (t.length >= 1) {
                                                                        e.getView().setModel(new sap.ui.model.json.JSONModel, "auszahlungSet");
                                                                        e.getView().getModel("ausza+
                                                                            hlungSet ").setData(null);e.getView().getModel("
                                                                            auszahlungSet ").setData(t);if(t.length>=13){e.getView().byId("
                                                                            tableId ").setVisibleRowCount(13)}else{e.getView().byId("
                                                                            tableId ").setVisibleRowCount(t.length)}}else{sap.m.MessageBox.information("
                                                                            Es wurden kein +
                                                                            e Auszahlungen gefunden.
                                                                            ",{title:"
                                                                            Information ",onClose:function(){e.getView().byId("
                                                                            stepKdnrId ").focus()}})}e.getView().byId("
                                                                            tableId ").setBusy(false)},error:function(t){var n=t.statusText;var s=t.statusCode;if(s=="
                                                                            404 "){sap.m.MessageBox.information("
                                                                            Es +
                                                                            wurde keine Daten gefunden.
                                                                            ",{title:"
                                                                            Information ",onClose:function(){e.getView().byId("
                                                                            stepKdnrId ").focus()}});e.getView().byId("
                                                                            tableId ").setBusy(false)}else{a.error(n,{details:"
                                                                            HTTP Status "+s+": "+n,onClose:function(){e.getView().byId("
                                                                            stepKdnrId ").fo+
                                                                            cus()
                                                                        }
                                                                    });e.getView().byId("tableId").setBusy(false)
                                                            }
                                                        }
                                                    })
                                            }, belegAnzeigen: function(e, t, a, n) {
                                                    var s = this;
                                                    if (a.length >= 1) {
                                                        s.getView().setModel(new sap.ui.model.json.JSONModel, "belegeSet");
                                                        s.getView().getModel("belegeSet").setData(a);
                                                        s.getView().setModel(new sa +
                                                            p.ui.model.json.JSONModel({
                                                                buttonVisible: n == "9" ? true : false
                                                            }), "dialogModel");
                                                        s.oBelegDialog = sap.ui.xmlfragment(s.createId("belegeFragmentId"), "ZF05_E187_PAYM_OVERVIEW.fragment.belegDialog", s);
                                                        s.getView().addDependent(s.oBelegDialog);
                                                        jQuery.sap.syncStyleCl +
                                                            ass("sapUiSizeCompact", s.getView(), s.oBelegDialog);
                                                        var i = s.getView().getModel("belegeSet");
                                                        var r = i.getData().length;
                                                        var l = s.byId(sap.ui.core.Fragment.createId("belegeFragmentId", "belegeTableId"));
                                                        if (r >= 10) {
                                                            l.setVisibleRowCount(10)
                                                        } else {
                                                            l.setVisibleRowCou +
                                                                nt(r)
                                                        }
                                                        s.oBelegDialog.open();
                                                        l.focus();
                                                        l.setSelectedIndex(1)
                                                    } else {
                                                        sap.m.MessageBox.information("Es wurden keine Auszahlungen gefunden.", {
                                                            title: "Information",
                                                            onClose: function() {
                                                                s.getView().byId("stepKdnrId").focus()
                                                            }
                                                        })
                                                    }
                                                }, onBankv: function() {
                                                    var e = this;
                                                    e.oBa +
                                                        nkvDialog = sap.ui.xmlfragment(e.createId("bankvFragmentId"), "ZF05_E187_PAYM_OVERVIEW.fragment.bankvDialog", e);
                                                    e.getView().addDependent(e.oBankvDialog);
                                                    jQuery.sap.syncStyleClass("sapUiSizeCompact", e.getView(), e.oBankvDialog);
                                                    var t = e.getView().getModel("ban+
                                                            kvSet ");var a=t.getData().length;var n=e.byId(sap.ui.core.Fragment.createId("
                                                            bankvFragmentId ","
                                                            bankvTableId "));if(a>=10){n.setVisibleRowCount(10)}else{n.setVisibleRowCount(a)}e.oBankvDialog.open();n.focus();n.setSelectedIndex(1)},onDialogCloseEscape:func+
                                                            tion(e) {
                                                                e.getSource().destroy()
                                                            }, onDialogCloseButton: function(e) {
                                                                e.getSource().getParent().destroy()
                                                            }, onBack: function() {
                                                                this.getOwnerComponent().getRouter().navTo("Start", {}, false)
                                                            }, runInvestigationRequestFiori: function() {
                                                                var e = this;
                                                                sap.ushell.Container. +
                                                                    getServiceAsync("CrossApplicationNavigation").then(function(t) {
                                                                        t.toExternal({
                                                                            target: {
                                                                                semanticObject: "ZF07_E072_NAFO",
                                                                                action: "display"
                                                                            },
                                                                            params: {
                                                                                Bpext: e.Bpext
                                                                            }
                                                                        })
                                                                    })
                                                            }, runInvestigationRequestUrl: function() {
                                                                this.getView().getModel("investigationRequestModel"). +
                                                                    read("/ParameterSet(Tabname='FPL9',Param='URL_NAFO_APP')", {
                                                                        success: function(e, t) {
                                                                            let a = e.Value.replace("{gpart}", r);
                                                                            window.open(a, "_blank")
                                                                        }.bind(this),
                                                                        error: function(e) {
                                                                            var t = e.statusText;
                                                                            var n = e.statusCode;
                                                                            if (n == "404") {
                                                                                a.information("Es wurde keine Dat+
                                                                                    en gefunden.
                                                                                    ",{title:"
                                                                                    Information "})}else{a.error(t,{details:"
                                                                                    HTTP Status "+n+": "+t})}}})},displayHistory:function(){this.historyFragment=sap.ui.xmlfragment(this.createId("
                                                                                    historyFragmentId "),"
                                                                                    ZF05_E187_PAYM_OVERVIEW.fragment.historyDialog ",this);this.g+
                                                                                    etView().addDependent(this.historyFragment); jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this.historyFragment);
                                                                                    var e = this.getView().getModel("historyModel");
                                                                                    var t = e.getData().length;
                                                                                    var a = this.byId(sap.ui.core.Fragment.createId("historyFra+
                                                                                        gmentId ","
                                                                                        historyTable "));a.setVisibleRowCount(t>=18?18:t);this.historyFragment.open()},loadClarificationStates:function(){return new Promise(function(e,t){this.getView().getModel("
                                                                                        investigationRequestModel ").read(" / ClarificationStateSet ",{success:functi+
                                                                                        on(t, a) {
                                                                                            this.getView().setModel(new sap.ui.model.json.JSONModel(t.results), "clarificationStateModel");
                                                                                            e()
                                                                                        }.bind(this), error: function(e) {
                                                                                            t()
                                                                                        }
                                                                                    })
                                                                                }.bind(this))
                                                                        },
                                                                        loadNfaStatuses: function() {
                                                                            return new Promise(function(e, t) {
                                                                                    this.getView().getModel("investigatio+
                                                                                        nRequestModel ").read(" / NfaStatusSet ",{success:function(t,a){this.getView().setModel(new sap.ui.model.json.JSONModel(t.results),"
                                                                                        nfaStatusModel ");e()}.bind(this),error:function(e){t()}})}.bind(this))},loadHistory:function(e){var t=this;var n=[];var s=[new+
                                                                                        sap.ui.model.Filter("Gpart", sap.ui.model.FilterOperator.EQ, e)];
                                                                                    var i = [new sap.ui.model.Sorter("Lfdnr", false)];
                                                                                    this.getView().getModel("investigationRequestModel").read("/ClarificationSet", {
                                                                                        urlParameters: {
                                                                                            $expand: "DocumentSet"
                                                                                        },
                                                                                        filters: s,
                                                                                        sorters: i,
                                                                                        succes +
                                                                                        s: function(e, a) {
                                                                                            var s = this.getView().getModel("clarificationStateModel").getData();
                                                                                            var i = this.getView().getModel("nfaStatusModel").getData();
                                                                                            e.results.forEach(e => {
                                                                                                e.DocumentSet.results.forEach(t => {
                                                                                                    let a = s.find(t => t.Param === e.State);
                                                                                                    let r = i.find(e => e.Para +
                                                                                                        m === t.Nfastatus);
                                                                                                    n.push({
                                                                                                        Lfdnr: Number(t.Lfdnr),
                                                                                                        Augbl: t.Augbl,
                                                                                                        Erdat: e.Erdat,
                                                                                                        Augvd: t.Augvd,
                                                                                                        Betrw: t.Betrw,
                                                                                                        State: e.State,
                                                                                                        StateText: a && a.Value ? a.Value : "",
                                                                                                        Nfastatus: t.Nfastatus,
                                                                                                        NfastatusText: r && r.Value ? r.Value : ""
                                                                                                    })
                                                                                                })
                                                                                            });
                                                                                            t.getView().setModel(new sap.ui.model.jso +
                                                                                                n.JSONModel(n), "historyModel")
                                                                                        }.bind(this),
                                                                                        error: function(e) {
                                                                                            var t = e.statusText;
                                                                                            var n = e.statusCode;
                                                                                            if (n == "404") {
                                                                                                a.information("Es wurde keine Daten gefunden.", {
                                                                                                    title: "Information"
                                                                                                })
                                                                                            } else {
                                                                                                a.error(t, {
                                                                                                    details: "HTTP Status " + n + ": " + t
                                                                                                })
                                                                                            }
                                                                                        }
                                                                                    })
                                                                                }, cancelInvestigati +
                                                                                onRequest: function(e) {
                                                                                    a.confirm("Klärungsfall stornieren?", {
                                                                                        actions: [a.Action.YES, a.Action.NO],
                                                                                        onClose: function(t) {
                                                                                            if (t === a.Action.YES) {
                                                                                                this.cancelInvestigationRequestInternal(e)
                                                                                            }
                                                                                        }.bind(this)
                                                                                    })
                                                                                }, cancelInvestigationRequestInternal: function(e) {
                                                                                    var t = this;
                                                                                    t +
                                                                                        his.getView().getModel("investigationRequestModel").callFunction("/CancelInvestigationRequest", {
                                                                                            method: "POST",
                                                                                            urlParameters: {
                                                                                                Lfdnr: e
                                                                                            },
                                                                                            success: function(e) {
                                                                                                t.loadHistory(e.Gpart)
                                                                                            },
                                                                                            error: function(e) {
                                                                                                var t = e.statusText;
                                                                                                var n = e.statusCode;
                                                                                                if (n == "404") {
                                                                                                    a.infor +
                                                                                                        mation("Es wurde keine Daten gefunden.", {
                                                                                                            title: "Information"
                                                                                                        })
                                                                                                } else {
                                                                                                    a.error(t, {
                                                                                                        details: "HTTP Status " + n + ": " + t
                                                                                                    })
                                                                                                }
                                                                                            }
                                                                                        })
                                                                                }
                                                                            })
                                                                    });