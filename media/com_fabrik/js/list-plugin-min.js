/*! Fabrik */
var FbListPlugin=my.Class({options:{requireChecked:!0,canAJAX:!0,ref:""},constructor:function(a){if(this.options=$.extend(this.options,a),this.result=!0,"null"!==typeOf(this.getList())){if("function"==typeof this.getList().getForm){this.listform=this.getList().getForm();var b=this.listform.find("input[name=listid]");if("null"===typeOf(b))return;this.listid=b.value}else this.listform=this.getList().container.find("form");this.watchButton()}},getList:function(){var a=Fabrik.blocks["list_"+this.options.ref];return"null"===typeOf(a)&&(a=Fabrik.blocks["visualization_"+this.options.ref]),a},getRowId:function(a){return a.hasClass("fabrik_row")||(a=a.closest(".fabrik_row")),a.id.split("_").getLast()},clearFilter:Function.from(),watchButton:function(){"null"!==typeOf(this.options.name)&&$(document).on("click","."+this.options.name,function(a){if(!a.rightClick&&(a.stopPropagation(),a.preventDefault(),$(this).data("list")===this.list.options.listRef)){var b,c;$(this).closest(".fabrik_row")&&(b=$(this).closest(".fabrik_row"),b.find("input[name^=ids]")&&(c=b.find("input[name^=ids]"),this.listform.find("input[name^=ids]").prop("checked",!1),c.set("checked",!0)));var d=!1;if(this.listform.find("input[name^=ids]").each(function(){this.checked&&(d=!0)}),!d&&this.options.requireChecked)return void window.alert(Joomla.JText._("COM_FABRIK_PLEASE_SELECT_A_ROW"));var e=this.options.name.split("-");this.listform.find("input[name=fabrik_listplugin_name]").val(e[0]),this.listform.find("input[name=fabrik_listplugin_renderOrder]").val(e.getLast()),this.buttonAction()}}.bind(this))},buttonAction:function(){var a=this.options.canAJAX?"list.doPlugin":"list.doPlugin.noAJAX";this.list.submit(a)}});