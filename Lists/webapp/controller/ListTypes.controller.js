// @ts-nocheck
sap.ui.define([
		"sap/ui/core/mvc/Controller"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller) {
		"use strict";

		return Controller.extend("mikelazq.Lists.controller.ListTypes", {
			onInit: function () {
                //Cargamos el modelo de datos en la vista
                let oDataModelo = new sap.ui.model.json.JSONModel();
                oDataModelo.loadData("./localService/mockdata/ListData.json");
                this.getView().setModel(oDataModelo)
			},
            obtenerCabeceraGrupo: function(oGrupo){
                var cabeceraGrupo = new sap.m.GroupHeaderListItem({
                    title: oGrupo.key,
                    upperCase: true
                });

                return cabeceraGrupo
            },
            muestraSelItem: function (){
                var standardList = this.getView().byId("standardlist");
                var selectedItems = standardList.getSelectedItems();

                var i18nModel = this.getView().getModel("i18n").getResourceBundle()

                if(selectedItems.length === 0){
                    sap.m.MessageToast.show(i18nModel.getText("noSelection"))
                }else{
                    var textMessage = i18nModel.getText("Selection")

                    for( let item in selectedItems){
                        var context = selectedItems[item].getBindingContext()
                        var oContext = context.getObject();
                        textMessage = textMessage + ' - ' + oContext.Material
                    }

                    sap.m.MessageToast.show(textMessage)

                }

            },
            deleteSelItem: function(){
                var standardList = this.getView().byId("standardlist");
                var selectedItems = standardList.getSelectedItems();

                var i18nModel = this.getView().getModel("i18n").getResourceBundle()

                if(selectedItems.length === 0){
                    sap.m.MessageToast.show(i18nModel.getText("noSelection"))
                }else{
                    var textMessage = i18nModel.getText("Selection")
                    var modelActual = this.getView().getModel()
                    var products = modelActual.getProperty("/Products")

                    var arrayOfDeleted = []

                    for(var item in selectedItems){
                        var context = selectedItems[item].getBindingContext()
                        var oContext = context.getObject();

                        arrayOfDeleted.push(oContext.Id)
                        textMessage = textMessage + ' - ' + oContext.Material
                    }

                    products = products.filter((product)=>{
                        return !arrayOfDeleted.includes(product.Id)
                    })
                    modelActual.setProperty("/Products", products)    

                    sap.m.MessageToast.show(textMessage)

                }
            },
            borrarFila: function(evento){
                var selectedRow = evento.getParameter("listItem");
                var context = selectedRow.getBindingContext()
                var splitPath = context.getPath().split("/")
                var indexSelectedRow = splitPath[splitPath.length - 1]
                var modelActual = this.getView().getModel()
                var products = modelActual.getProperty("/Products")
                products.splice(indexSelectedRow,1)
                modelActual.refresh()
            }
		});
	});
