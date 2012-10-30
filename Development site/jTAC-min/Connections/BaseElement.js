jTAC._internal.temp._Connections_BaseElement={extend:"Connections.Base","abstract":true,constructor:function(a){this.callParent([a])},config:{id:null,allowNone:false,trim:true,unassigned:null,unassignedCase:false},configrules:{id:jTAC.checkAsStrOrNull,unassigned:jTAC.checkAsStrOrNull},getElement:function(b){try{this._pushContext();if(this._internal.element!=null){return this._internal.element}var c=this.getId();if(!c){if(b==null){b=this.getAllowNone()}if(!b){this._error("Did not assign the id.")}return null}var a=document.getElementById(c);if(a){this._checkElement(a)}else{if(!a&&!this.getAllowNone()){this._error("HTML Element not found for "+c)}}return a}finally{this._popContext()}},setElement:function(a){this._internal.element=a},_checkElement:function(a){this.AM()},addEventListener:function(a,b,c){return false},addSupportEventListeners:function(a,b,c){},testElement:function(a){return false},testElementAndCreate:function(b){if(this.testElement(b)){var a=jTAC.createByClassName(this.$fullClassName);(typeof b=="string")?a.setId(b):a.setElement(b);return a}return null},getTypeManager:function(){var a,b=this.getElement(true);if(b){var a=this.getData("typemanager");if(a){return a}a=this._createTypeManager(b);if(a){if(a instanceof jTAC.TypeManagers.Base){this.setData("typemanager",a);return a}}}return null},_createTypeManager:function(el){try{this._pushContext();var tm=this.getData("typemanager");if(tm){return tm}tm=this.getData("jtac-typemanager");if(tm){if(typeof tm=="string"){try{tm=eval("("+tm+");")}catch(e){jTAC.error("JSon parsing error. "+e.message,this,null,true)}}if(tm.jtacClass){tm=jTAC.create(null,tm)}if(tm instanceof jTAC.TypeManagers.Base){this.setData("typemanager",tm);return tm}}var dt=this.getData("jtac-datatype");if(dt){tm=jTAC.create(dt,tm)}if(tm instanceof jTAC.TypeManagers.Base){this.setData("typemanager",tm);return tm}else{if(tm){this._error("data-jtac-typemanager or datatype could not convert into a TypeManager object.")}}return null}finally{this._popContext()}},getData:function(a){var c,b=this.getElement(true);if(b){var c=b["data-"+a];if(c===undefined){c=b.getAttribute("data-"+a);if(c!=null){b["data-"+a]=c}}}return c},setData:function(a,c){var b=this.getElement(true);if(b){b["data-"+a]=c}},isVisible:function(){return this._isDOMVisible(this.getElement(true))},_isDOMVisible:function(b){if(!b){return true}var a=1;while(a&&(b!=null)&&(b!=document.body)){a=!((b.style.visibility=="hidden")||(b.style.display=="none"));b=b.parentNode}return a},isEnabled:function(){return this._isDOMEnabled(this.getElement(true))},_isDOMEnabled:function(a){if(!a||a.disabled==null){return true}return !a.disabled},isEditable:function(){return this.isVisible()&&this.isEnabled()},getLabel:function(){var a=this._locateLabel(this.getElement(true));if(a==null){a=this.callParent()}return a},_locateLabel:function(b){if(!b){return null}var a=b.getAttribute("data-msglabel");var d=b.getAttribute("data-msglabel-lookupid");if(d){a=jTAC.translations.lookup(d,a)}if((a==null)&&window.jQuery){var c=$("label[for='"+b.id+"'][generated!='true']");if(c){a=c.html();if(a){a=this._cleanLabel(a);b.setAttribute("data-msglabel",a)}}}return a},_cleanLabel:function(a){var b=jTAC.replaceAll(a,"<(.|\n)+?>","");b=b.replace(/[^\dA-Za-z]+$/,"");b=b.replace(/^[^\dA-Za-z]+/,"");return b},getClass:function(){var a=this.getElement();if(a&&(a.className!=null)){return a.className}return""},setClass:function(a){var b=this.getElement();if(b&&(b.className!=null)){b.className=a}},addClass:function(b){if(!b){return false}var a=this.getClass();var c=jTAC.delimitedRE(b,"\\s");if(c.test(a)){return false}var d=jTAC.trimStr(a+" "+b);this.setClass(d);return true},removeClass:function(a){if(a){var c=this.getClass();var b=jTAC.delimitedRE(a,"\\s");c=jTAC.trimStr(c.replace(b," "));this.setClass(c)}},_cleanString:function(b){var a=this.getTrim()?jTAC.trimStr(b):b;return this._matchUnassigned(a)?"":a},_matchUnassigned:function(c){var b=this.getUnassigned();if(b){var a=this.getUnassignedCase();if((b==c)||(!a&&(b.toLowerCase()==c.toLowerCase()))){return true}}return false}};jTAC.define("Connections.BaseElement",jTAC._internal.temp._Connections_BaseElement);