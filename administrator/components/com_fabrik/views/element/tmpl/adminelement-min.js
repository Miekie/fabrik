/*! Fabrik */
var fabrikAdminElement=my.Class(PluginManager,{options:{id:0,parentid:0,jsevents:[],jsTotal:0,deleteButton:"removeButton"},jsCounter:-1,jsAjaxed:0,constructor:function(a,b,c){var d=this;Fabrik.debug&&fconsole("Fabrik adminelement.js: Initialising",a,b,c),fabrikAdminElement.Super.call(this,a,c,"validationrule"),this.options=$.extend(this.options,b),this.setParentViz(),$(document).ready(function(){0===$("#addJavascript").length?fconsole("Fabrik adminelement.js: javascript tab Add button not found"):$("#addJavascript").on("click",function(a){a.stopPropagation(),d.addJavascript()}),d.watchLabel(),d.watchGroup(),d.options.jsevents.each(function(a){d.addJavascript(a)}),$("#jform_plugin").on("change",function(a){d.changePlugin(a)}),$("#javascriptActions").on("click","a[data-button=removeButton]",function(a){a.stopPropagation(),d.deleteJS(d)}),$("#javascriptActions").on("change",'select[id^="jform_action-"],select[id^="jform_js_e_event-"],select[id^="jform_js_e_trigger-"],select[id^="jform_js_e_condition-"],input[id^="jform_js_e_value-"])',function(){d.setAccordionHeader($(this).closest(".actionContainer"))});var a=$("#plugins");a.on("click","h3.title",function(){var a=this;$("#plugins").find("h3.title").each(function(){this!==a&&$(this).removeClass("pane-toggler-down")}),$(a).toggleClass("pane-toggler-down")})})},watchLabel:function(){var a=this;this.autoChangeDbName=""===$("#jform_name").val(),$("#jform_label").on("keyup",function(){if(a.autoChangeDbName){var b=$("#jform_label").val().trim().toLowerCase();b=b.replace(/\W+/g,"_"),$("#jform_name").val(b)}}),$("#jform_name").on("keyup",function(){a.autoChangeDbName=!1})},watchGroup:function(){var a="fabrik_element_group";if(""===$("#jform_group_id").val()){var b=document.cookie.match("(^|;) ?"+a+"=([^;]*)(;|$)"),c=b?b[2]:null;$("#jform_group_id").val(c)}$("#jform_group_id").on("change",function(){var b=$("#jform_group_id").val(),c=new Date;c.setTime(c.getTime()+864e5);var d="; expires="+c.toGMTString();document.cookie=a+"="+encodeURIComponent(b)+d})},changePlugin:function(a){var b=this;$("#plugin-container").empty().adopt($(document.createElement("span")).text(Joomla.JText._("COM_FABRIK_LOADING")));var c=$.ajax({url:"index.php",evalResponse:!1,evalScripts:function(a){this.script=a}.bind(this),data:{option:"com_fabrik",id:this.options.id,task:"element.getPluginHTML",format:"raw",plugin:a.target.get("value")}}).done(function(a){$("#plugin-container").html(a),Browser.exec(b.script),b.updateBootStrap(),FabrikAdmin.reTip()});Fabrik.requestQueue.add(c)},deleteJS:function(a){var b=a.closest("div.actionContainer");Fabrik.debug&&fconsole("Fabrik adminelement.js: Deleting JS entry: ",b.id),b.dispose(),this.jsAjaxed--},addJavascript:function(a){var b=a&&a.id?a.id:0,c=this,d=$(document.createElement("div")).addClass("actionContainer panel accordion-group"),e=$(document.createElement("a")).addClass("accordion-toggle").attr({href:"#"});e.adopt($(document.createElement("span")).addClass("pluginTitle").text(Joomla.JText._("COM_FABRIK_LOADING")));var f=$(document.createElement("div")).addClass("title pane-toggler accordion-heading").adopt($(document.createElement("strong")).adopt(e)),g=$(document.createElement("div")).addClass("accordion-body");d.adopt(f),d.adopt(g),d.inject(document.id("javascriptActions"));var h=this.jsCounter,i=new $.ajax({url:"index.php",data:{option:"com_fabrik",view:"plugin",task:"top",format:"raw",type:"elementjavascript",plugin:null,plugin_published:!0,c:h,id:b,elementid:this.id}}).always(function(){Fabrik.debug&&fconsole("Fabrik adminelement.js: Adding JS entry",(h+1).toString())}).done(function(a){g.append(a),g.find('textarea[id^="jform_code-"]').on("change",function(){c.setAccordionHeader($(this).closest(".actionContainer"))}),c.setAccordionHeader(d),c.jsAjaxed++,c.updateBootStrap(),FabrikAdmin.reTip()}).fail(function(a,b,c){fconsole("Fabrik adminelement.js addJavascript: ajax failure: ",b,c)});this.jsCounter++,Fabrik.requestQueue.add(i),this.updateBootStrap(),FabrikAdmin.reTip()},setAccordionHeader:function(a){if("null"!==typeOf(a)){var b=a.find("span.pluginTitle"),c=a.find('select[id^="jform_action-"]');if(""===c.value)return void b.html('<span style="color:red;">'+Joomla.JText._("COM_FABRIK_JS_SELECT_EVENT")+"</span>");var d="on "+c.getSelected()[0].text+" : ",e=a.find('textarea[id^="jform_code-"]'),f=a.find('select[id^="jform_js_e_event-"]'),g=a.find('select[id^="jform_js_e_trigger-"]'),h=document.id("jform_name"),i=a.find('input[id^="jform_js_e_value-"]'),j=a.find('select[id^="jform_js_e_condition-"]'),k="";if(""!==e.value.clean()){var l=e.value.split("\n")[0].trim(),m=l.match(/^\/\*(.*)\*\//);k=m?m[1]:Joomla.JText._("COM_FABRIK_JS_INLINE_JS_CODE"),e.value.replace(/(['"]).*?[^\\]\1/g,"").test("//")&&(k+=' &nbsp; <span style="color:red;font-weight:bold;">',k+=Joomla.JText._("COM_FABRIK_JS_INLINE_COMMENT_WARNING").replace(/ /g,"&nbsp;"),k+="</span>")}else if(f.value&&g.value&&h.value){k=Joomla.JText._("COM_FABRIK_JS_WHEN_ELEMENT")+' "'+h.value+'" ',j.getSelected()[0].text.test(/hidden|shown/)?(k+=Joomla.JText._("COM_FABRIK_JS_IS")+" ",k+=j.getSelected()[0].text+", "):k+=j.getSelected()[0].text+' "'+i.value.trim()+'", ';var n=g.getSelected().closest("optgroup").get("label")[0].toLowerCase();k+=f.getSelected()[0].text+" "+n.substring(0,n.length-1),k+=' "'+g.getSelected()[0].text+'"'}else d+='<span style="color:red;">'+Joomla.JText._("COM_FABRIK_JS_NO_ACTION")+"</span>";""!==k&&(d+='<span style="font-weight:normal">'+k+"</span>"),b.html(d)}},setParentViz:function(){0!==parseInt(this.options.parentid,10)&&$("#unlink").on("click",function(){this.checked?$("elementFormTable").fadeIn():$("elementFormTable").fadeOut()}),$("#swapToParent").on("click",function(){var a=document.adminForm;a.task.value="element.parentredirect";var b=this.className.replace("element_","");a.redirectto.value=b,a.submit()})}});