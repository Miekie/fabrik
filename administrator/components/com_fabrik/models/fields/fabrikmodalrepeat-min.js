/*! Fabrik */
"use strict";var FabrikModalRepeat=my.Class({options:{j3:!0},constructor:function(a,b,c,d){var e=this;if(this.names=b,this.field=c,this.content=!1,this.setup=!1,this.elid=a,this.win={},this.el={},this.field={},this.options=$.extend(this.options,d),this.ready())this.setUp();else{var f=function(){e.testReady.call(e,!0)};this.timer=setInterval(f,500)}},ready:function(){return jQuery("#"+this.elid).length>0},testReady:function(){this.ready()&&(this.timer&&clearInterval(this.timer),this.setUp())},setUp:function(){this.button=jQuery("#"+this.elid+"_button"),this.mask=new Mask(document.body,{style:{"background-color":"#000",opacity:.4,"z-index":9998}}),jQuery(document).on("click","*[data-modal="+this.elid+"]",function(a){a.preventDefault();var b,c=jQuery(this).next("input").id,d=jQuery(this).closest("li");this.field[c]=$(this).next("input"),d||(d=jQuery(this).closest("div.control-group")),this.origContainer=d,b=d.find("table"),b.length>0&&(this.el[c]=b),this.openWindow(c)}.bind(this))},openWindow:function(a){var b=!1;this.win[a]||(b=!0,this.makeTarget(a)),this.el[a].inject(this.win[a],"top"),this.el[a].show(),(!this.win[a]||b)&&this.makeWin(a),this.win[a].show(),this.win[a].position(),this.resizeWin(!0,a),this.win[a].position(),this.mask.show()},makeTarget:function(a){this.win[a]=jQuery(document.createElement("div")).attr({"data-modal-content":a}).css({padding:"5px","background-color":"#fff",display:"none","z-index":9999}).inject(document.body)},makeWin:function(a){var b=this,c=jQuery(document.createElement("button")).addClass("btn button btn-primary").text("close");c.on("click",function(c){c.stopPropagation(),b.store(a),b.el[a].hide(),b.el[a].inject(b.origContainer),b.close()});var d=jQuery(document.createElement("div")).addClass("controls form-actions").css({"text-align":"right","margin-bottom":0}).adopt(c);this.win[a].adopt(d),this.win[a].position(),this.content=this.el[a],this.build(a),this.watchButtons(this.win[a],a)},resizeWin:function(){Object.each(this.win,function(a,b){{var c=this.el[b].getDimensions(!0);a.getDimensions(!0)}a.css({width:c.x+"px"})}.bind(this))},close:function(){Object.each(this.win,function(a){a.hide()}),this.mask.hide()},_getRadioValues:function(a){var b,c=[];return jQuery.each(this.getTrs(a),function(a,d){var e=(b=d.find("input[type=radio]:checked"))?b.get("value"):"";c.push(e)}),c},_setRadioValues:function(a,b){var c;jQuery.each(this.getTrs(b),function(b,d){(c=d.find("input[type=radio][value="+a[b]+"]"))&&(c.checked="checked")})},addRow:function(a,b){var c=this._getRadioValues(a),d=b.closest("table").find("tbody"),e=this.tmpl.clone(!0,!0);e.inject(d),this.stripe(a),this.fixUniqueAttributes(b,e),this._setRadioValues(c,a),this.resizeWin(!1,a),this.resetChosen(e)},fixUniqueAttributes:function(a,b){var c=a.closest("table").find("tr").length-1;jQuery.each(b.find("*[name]"),function(a,b){b.name+="-"+c}),jQuery.each(b.find("*[id]"),function(a,b){b.id+="-"+c}),jQuery.each(b.find("label[for]"),function(a,b){b.label+="-"+c})},watchButtons:function(a,b){var c,d=this;a.on("click","a.add",function(e){(c=d.findTr(e))&&d.addRow(b,c),a.position(),e.stopPropagation()}),a.on("click","a.remove",function(e){(c=d.findTr(e))&&c.dispose(),d.resizeWin(!1,b),a.position(),e.stopPropagation()})},resetChosen:function(a){jQuery("select").chosen&&(a.find("select").removeClass("chzn-done").show(),jQuery(a.find("select"),function(a,b){b.id=b.id+"_"+parseInt(1e7*Math.random(),10)}),a.find(".chzn-container").destroy(),jQuery(a).find("select").chosen({disable_search_threshold:10,allow_single_deselect:!0}))},getTrs:function(a){return this.win[a].find("tbody").find("tr")},stripe:function(a){for(var b=this.getTrs(a),c=0;c<b.length;c++)b[c].removeClass("row1").removeClass("row0"),b[c].addClass("row"+c%2)},build:function(a){this.win[a]||this.makeWin(a);var b=JSON.decode(this.field[a].get("value"));"null"===typeOf(b)&&(b={});for(var c=this.win[a].find("tbody").find("tr"),d=Object.keys(b),e=0===d.length||0===b[d[0]].length?!0:!1,f=e?1:b[d[0]].length,g=1;f>g;g++){var h=c.clone();this.fixUniqueAttributes(c,h),h.inject(c,"after"),this.resetChosen(h)}this.stripe(a);var i=this.getTrs(a);for(g=0;f>g;g++)d.each(function(a){jQuery.each(i[g].find("*[name*="+a+"]"),function(c,d){"radio"===d.get("type")?d.value===b[a][g]&&(d.checked=!0):(d.value=b[a][g],"select"===d.get("tag")&&"undefined"!=typeof jQuery&&jQuery(d).trigger("liszt:updated"))})});this.tmpl=c,e&&c.dispose()},findTr:function(a){var b=a.target.getParents().filter(function(a){return"tr"===a.get("tag")});return 0===b.length?!1:b[0]},store:function(a){var b=this.content;b=this.el[a];for(var c={},d=0;d<this.names.length;d++){var e=this.names[d],f=b.find("*[name*="+e+"]");c[e]=[],f.each(function(a){"radio"===a.get("type")?a.get("checked")===!0&&c[e].push(a.get("value")):c[e].push(a.get("value"))}.bind(this))}return this.field[a].value=JSON.encode(c),!0}});