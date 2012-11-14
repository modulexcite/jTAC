if(!window.jTAC){throw new Error("window.jTAC not created.")}jTAC._internal.temp._TypeManagers_base={"abstract":true,constructor:function(a){},config:{friendlyName:null,friendlyLookupKey:null},configrule:{friendlyName:jTAC.checkAsStrOrNull,friendlyLookupKey:jTAC.checkAsStrOrNull},nativeTypeName:function(){this._AM()},dataTypeName:function(){this._AM()},storageTypeName:function(){this._AM()},toString:function(a){if(a===undefined){return this.$className}try{this._pushContext();if(typeof a=="string"){a=this.toValue(a)}a=this._reviewValue(a);return this._nativeToString(a)}finally{this._popContext()}},_nativeToString:function(a){this._AM()},toValue:function(b){try{this._pushContext("TypeManagers.Base ["+b+"]");if(typeof(b)==this.nativeTypeName()){return this._reviewValue(b)}if(typeof(b)!="string"){this._error("Must pass a string in the text parameter.")}if(this._isNull(b)){return null}var a=this._stringToNative(b);return this._reviewValue(a)}finally{this._popContext()}},toValueFromConnection:function(a){try{this._pushContext();if(!(a instanceof jTAC.Connections.Base)){this._error("Must pass a Connection class.")}if(a.typeSupported(this.storageTypeName())){return this._reviewValue(a.getTypedValue(this.storageTypeName()))}return this.toValue(a.getTextValue())}finally{this._popContext()}},_stringToNative:function(a){this._AM()},_isNull:function(a){return a==""||a==null},_reviewValue:function(a){if(typeof(a)!=this.nativeTypeName()){this._error("Type not supported")}return a},toValueNeutral:function(a){this._AM()},toStringNeutral:function(a){this._AM()},isValid:function(c,a){if(a==undefined){a=false}if(c==null){return a}if((typeof(c)=="string")&&(jTAC.trimStr(c)=="")){return a}try{return this.toValue(c)!=null}catch(b){return false}},compare:function(b,a){if(typeof(b)=="string"){b=this.toValue(b)}if(typeof(a)=="string"){a=this.toValue(a)}if((b==null)||(a==null)){this._error("Parameter value was null.")}if(b<a){return -1}else{if(b>a){return 1}}return 0},isValidChar:function(a){if((a==null)||(typeof(a)!="string")||(a.length!=1)){this._error("Parameter must be a single character.")}return true},toNumber:function(a){return null},getFriendlyName:function(){var a=this.config.friendlyName;var b=this.getFriendlyLookupKey();if(b){a=jTAC.translations.lookup(b,a)}if(a==null){a=this.dataTypeName()}return a},getFriendlyLookupKey:function(){if(this.config.friendlyLookupKey==null){return this.dataTypeName()}return this.config.friendlyLookupKey},round:function(g,h,c){if(c==-1){return g}if(jTAC.TypeManagers.Base.prototype.numDecPlaces(g)<=c){return g}var d=Math.pow(10,c);var a=g*d;switch(h){case 0:a=Math.abs(a);a=a.toFixed(1);a=parseFloat(a).toFixed(0);a=parseFloat(a);if(g<0){a=-a}return a/d;case 1:var b=Math.floor(a);var e=a-b;var b=(e==0.5)?((b%2==0)?b:b+1):Math.round(a);return b/d;case 2:a=Math.floor(Math.abs(a));if(g<0){a=-a}return a/d;case 3:a=Math.ceil(a);return a/d;case 4:a=Math.ceil(Math.abs(a));if(g<0){a=-a}return a/d;default:this._inputError("Too many decimal places.")}return 0},numDecPlaces:function(b){var c=jTAC.TypeManagers.Base.prototype.floatToString(b);var a=c.indexOf(".");if(a<0){return 0}return c.length-(a+1)},floatToString:function(c){var b=c.toString();if((b.indexOf("e-")>-1)&&c.toFixed){var a=b.match(/^.e\-(\d*)$/);var d=parseInt(a[1]);b=c.toFixed(d)}return b},asUTCDate:function(j,a,i,e,g,c){if((typeof j=="object")&&(j instanceof Date)){var b=j;j=b.getFullYear();a=b.getMonth();i=b.getDate();e=b.getHours();g=b.getMinutes();c=b.getSeconds()}if((j==null)||(a==null)||(i==null)){return null}if(e==null){e=0}if(g==null){g=0}if(c==null){c=0}var f=new Date(0);f.setUTCFullYear(j,a,i);f.setUTCHours(e,g,c,0);return f}};jTAC.define("TypeManagers.Base",jTAC._internal.temp._TypeManagers_base);jTAC.checkAsTypeManager=function(b,a){return jTAC.checkAsClass(b,a,jTAC.TypeManagers.Base)};jTAC.checkAsTypeManagerOrNull=function(a){return jTAC.checkAsTypeManager(a,null)};jTAC.addDataTypeAttributes=function(a,c,b){var d=jTAC.connectionResolver.create(a);d.setData("jtac-datatype",c);d.setData("jtac-typemanager",b)};jTAC.plugInParser=function(b,e){var c={config:{parserOptions:null,nativeParser:false},_parse:function(f){return this.getNativeParser()?this._nativeParse(f):this.getParserOptions().parse(f)},_valChars:function(){var f=this._nativeValChars();if(!this.getNativeParser()){var g=this.getParserOptions();if(g){f=g.valChars(f)}}return f},getParserOptions:function(){var f=this.config.parserOptions;if(!this.config.parserOptions){f=this.config.parserOptions=jTAC.create(b);f.owner=this;this._registerChild(f)}return f},setParserOptions:function(g){if((g==null)||(typeof g!="object")){this._error("Must pass an object whose properties match those on the parserOptions property.")}if(g.instanceOf&&g.instanceOf(b)){g.owner=this;this.config.parserOptions=g}else{var h=this.getParserOptions();for(var f in h.config){if(g[f]!==undefined){h.config[f]=g[f]}}}}};var a=jTAC.getClass(e);var d=a.prototype;if(d._parse===undefined){jTAC.error("Cannot use jTAC.plugInParser() with ["+e+"].")}d._nativeParse=d._parse;d._nativeValChars=d._valChars;jTAC.addMembers(e,c)};