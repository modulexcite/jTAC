jTAC._internal.temp._TypeManagers_BaseNumber={extend:"TypeManagers.BaseCulture","abstract":true,constructor:function(a){this.callParent([a])},config:{allowNegatives:true,showGroupSep:true,allowGroupSep:true,strictSymbols:false},nativeTypeName:function(){return"number"},_reviewValue:function(a){if(a===null){return a}a=this.callParent([a]);if(isNaN(a)){this._error("Cannot pass NaN.")}this._checkAllowNegatives(a);return a},toNumber:function(a){return a},getMaxDecimalPlaces:function(){return 0},toStringNeutral:function(d){if(d==null){return""}var b=d.toString();if((b.indexOf("e")>-1)&&d.toFixed){var a=b.match(/^.+e[\-\+](\d*)$/);var c=parseInt(a[1],10);if(isNaN(c)){return""}b=d.toFixed(c)}return b},_nf:function(a){return this.numberFormat(a)},_checkNegSymbol:function(a){if((a.indexOf("(")>-1)&&!this._negPatHasParen()){this._error("Illegal negative symbol")}},_negPatHasParen:function(){var a=this._cache.nPAP;if(a==null){a=this._cache.nPAP=this._nf("NegPattern").indexOf("(")>-1}return a},_checkStrictSymbols:function(h){var g=this._nf("NegSymbol");var i=(h.indexOf(g)>-1)||h.indexOf("(")>-1;var d=this._nf(i?"NegPattern":"PosPattern")||"";if(!d){return}h=h.replace(g,"-");var c=this._nf("Symbol")||"";var b=d.indexOf("$")>-1?"$":(d.indexOf("%")>-1?"%":"");var a=h.indexOf(c)>-1;if(a){h=h.replace(c,b);d=jTAC.escapeRE(d);d=d.replace("\\ ","\\s?")}else{d=jTAC.replaceAll(d," ","");d=d.replace(b,"");d=jTAC.escapeRE(d)}d=d.replace("n","\\d+(\\.\\d*)?");d="^"+d+"$";var f=new RegExp(d);if(!f.test(h)){this._inputError("Symbols are not correctly positions.")}},_applyGroupSep:function(l){var c=this._nf("GroupSep");if(c==null){return l}var a="";var m=this._nf("DecimalSep");var j=l.indexOf(m);var g=l.length;if(j>-1){a=l.substring(j,g);g=j}var d=this._nf("GroupSizes");if(d==null){d=[3]}var b=0;var h=d[0];var k=0;for(var f=g-1;f>=0;f--){a=l.charAt(f)+a;if(f==0){break}k++;if(k==h){a=c+a;if(b<d.length-1){b++}if(d[b]==0){h=999}else{h=h+d[b]}}}return a},_checkAllowNegatives:function(a){if(!this.getAllowNegatives()&&(typeof a=="number")&&(a<0)){this._inputError("Negative values not allowed")}},_stripGroupSep:function(a){return jTAC.replaceAll(a,this._nf("GroupSep"),"",true)},_cleanTrailingZeros:function(f,g){if(g){var b=new RegExp(jTAC.escapeRE(this._nf("DecimalSep"))+"\\d*");var a=b.exec(f);if(a){var c=a[0];while(g<(c.length-1)){if(c.charAt(c.length-1)!="0"){break}c=c.substr(0,c.length-1)}var d=g-(c.length-1);if(d>0){c+="000000000000".substr(0,d)}f=f.replace(a[0],c)}}return f}};jTAC.define("TypeManagers.BaseNumber",jTAC._internal.temp._TypeManagers_BaseNumber);jTAC._internal.temp._TypeManagers_BaseFloat={extend:"TypeManagers.BaseNumber","abstract":true,constructor:function(a){this.callParent([a])},config:{maxDecimalPlaces:null,trailingZeroDecimalPlaces:1,roundMode:null,acceptPeriodAsDecSep:false},configrules:{maxDecimalPlaces:jTAC.checkAsIntOrNull,trailingZeroDecimalPlaces:jTAC.checkAsInt,roundMode:jTAC.checkAsIntOrNull},_nativeToString:function(d){if(d==null){return""}var b=this.floatToString(Math.abs(d));b=this._applyTrailingZeros(b);var c=this._nf("DecimalSep");if(c!="."){b=b.replace(".",c)}if(this.getShowGroupSep()){b=this._applyGroupSep(b)}var f=(d<0)?"NegPattern":"PosPattern";var a=this._nf(f);if(a){b=a.replace("n",b)}return b},_applyTrailingZeros:function(c){var d=this.getTrailingZeroDecimalPlaces();if((d==null)&&(c.indexOf(".")==-1)){c+=".0"}if(d>0){var b=c.indexOf(".");var a=d;if(b==-1){c+="."}else{a=d-(c.length-b-1)}if(a>0){c+=String("000000000000000000").substr(0,a)}}return c},_reviewValue:function(a){a=this.callParent([a]);if(a!=null){a=this._applyMaxDec(a)}return a},_stringToNative:function(b){this._checkNegSymbol(b);if(!this.getAllowGroupSep()){var a=this.numberFormat("GroupSep");if(a&&(b.indexOf(a)>-1)){this._inputError("Group separator not allowed.")}}var c=this._parse(b);if(isNaN(c)){this._inputError("Cannot convert ["+b+"] to "+this.dataTypeName()+".")}return c},_parse:function(g){var b=this._nf("Symbol");if(b){g=g.replace(b,"!!")}g=this._replaceDecSep(g);g=this._stripGroupSep(g);var i=this._nf("DecimalSep");if(i!="."){if(g.indexOf(".")>-1){this._inputError("Period character not supported in this culture.")}g=g.replace(i,".")}if(this.getStrictSymbols()){var h=b?g.replace("!!",b):g;this._checkStrictSymbols(h)}if(g.indexOf("!!")>-1){g=jTAC.trimStr(g.replace("!!",""))}var f=this._nf("NegSymbol");var d=(g.indexOf(f)>-1)||((g.indexOf("(")>-1)&&this._negPatHasParen());g=jTAC.trimStr(g);var j=this._cache.floatCharsRE;if(!j){var a=jTAC.escapeRE(f);this._cache.floatCharsRE=j=new RegExp("^(["+a+"\\(])?\\d+(\\.(\\d*))?(["+a+"\\)])?$")}if(!j.test(g)){this._inputError("Invalid characters found")}if(d){g=jTAC.trimStr(g.replace(f,"").replace("(","").replace(")",""))}var c=parseFloat(g);if(isNaN(c)){return c}if(d){c=-c}return c},_applyMaxDec:function(b){var a=this.getMaxDecimalPlaces();if(a){return this.round(b,this.getRoundMode(),a)}return b},toValueNeutral:function(a){if(a==null){return null}try{this._pushContext(null,a);if(typeof(a)=="number"){return this._reviewValue(a)}if(/^\-?\d+(\.\d+)?$/.test(a)){return parseFloat(a)}this._inputError("Required format: [-]digits[.digits]")}finally{this._popContext()}},toStringNeutral:function(b){if(b==null){return""}var a=this.callParent([b]);if(a.indexOf(".")==-1){a=a+".0"}return a},_valCharRE:function(){var a=this._nf("NegPattern")||"";var b="";if(this.getAllowNegatives()){b="-";if(a.indexOf("(")>-1){b+="()"}}var d=a.indexOf(" ")>-1?" ":"";var c=this.getMaxDecimalPlaces()!=0?this._nf("DecimalSep"):"";return new RegExp("[\\d"+jTAC.escapeRE(this._nf("GroupSep")+c+b+this._moreValidChars())+d+"]")},_moreValidChars:function(){return""},getMaxDecimalPlaces:function(){return this.config.maxDecimalPlaces},_replaceDecSep:function(g){if(!this.getAcceptPeriodAsDecSep()){return g}var d=this._nf("DecimalSep");if((d!=".")&&(g.indexOf(".")>-1)){if(g.indexOf(d)==-1){var a=false;var f=this._nf("GroupSep");if(f!="."){a=true}else{var c=g.indexOf(f);var b=g.lastIndexOf(f);if((c==-1)||(c==b)){a=true}}if(a){g=g.replace(".",d)}}}return g}};jTAC.define("TypeManagers.BaseFloat",jTAC._internal.temp._TypeManagers_BaseFloat);jTAC._internal.temp._TypeManagers_Integer={extend:"TypeManagers.BaseNumber",constructor:function(a){this.callParent([a])},config:{fillLeadZeros:0},configrules:{fillLeadZeros:jTAC.checkAsIntOrNull},dataTypeName:function(){return"integer"},storageTypeName:function(){return"integer"},_stringToNative:function(b){if(b==null){this._error("Cannot evaluate null value")}if(b.indexOf(this.numberFormat("DecimalSep"))>-1){this._error("Cannot evaluate a floating point number.")}var a=this.numberFormat("GroupSep");if(!this.getAllowGroupSep()&&a&&(b.indexOf(a)>-1)){this._inputError("Group separator not allowed.")}var c=this._parse(b);if(isNaN(c)){this._inputError("Cannot convert ["+b+"] to "+this.dataTypeName()+".")}return c},_parse:function(d){d=this._stripGroupSep(d);if(this.getStrictSymbols()){this._checkStrictSymbols(d)}var c=this._nf("NegSymbol");var g=d.indexOf(c)>-1;var b=this._cache.intCharsRE;if(!b){var a=jTAC.escapeRE(c);this._cache.intCharsRE=b=new RegExp("^("+a+")?\\d+("+a+")?$")}if(!b.test(d)){this._inputError("Illegal character found.")}if(g){d=d.replace(c,"")}var f=parseInt(d,10);if(!isNaN(f)&&(f!=null)&&((f>2147483647)||(f<-2147483648))){this._inputError("Exceeds 32 bit integer.")}if(g){f=-f}return f},_nativeToString:function(c){if(c==null){return""}var b=Math.abs(c).toString();if(this.getShowGroupSep()){b=this._applyGroupSep(b)}var a=this.getFillLeadZeros();if(a&&(b.length<a)){e="0000000000";b=e.substr(0,a-b.length)+b}if(c<0){b=this.numberFormat("NegPattern").replace("n",b)}return b},_reviewValue:function(a){if(Math.floor(a)!=a){this._inputError("Has decimal point.")}return this.callParent([a])},toValueNeutral:function(a){if(a==null){return null}try{this._pushContext();if(typeof(a)=="number"){return this._reviewValue(a)}if(/^\-?\d+$/.test(a)){return parseInt(a)}this._inputError("Required format: [-]digits")}finally{this._popContext()}},_valCharRE:function(){var b=this.getAllowGroupSep()?this.numberFormat("GroupSep"):"";var a=this.getAllowNegatives()?this.numberFormat("NegSymbol"):"";return new RegExp("[\\d"+jTAC.escapeRE(b+a)+"]")}};jTAC.define("TypeManagers.Integer",jTAC._internal.temp._TypeManagers_Integer);jTAC.defineAlias("Integer","TypeManagers.Integer");jTAC.defineAlias("Integer.Positive","TypeManagers.Integer",{allowNegatives:false});jTAC._internal.temp._TypeManagers_Float={extend:"TypeManagers.BaseFloat",constructor:function(a){this.callParent([a])},dataTypeName:function(){return"float"},storageTypeName:function(){return"float"}};jTAC.define("TypeManagers.Float",jTAC._internal.temp._TypeManagers_Float);jTAC.defineAlias("Float","TypeManagers.Float");jTAC.defineAlias("Float.Positive","TypeManagers.Float",{allowNegatives:false});jTAC._internal.temp._TypeManagers_Currency={extend:"TypeManagers.BaseFloat",constructor:function(a){this.callParent([a])},config:{trailingZeroDecimalPlaces:null,showCurrencySymbol:true,allowCurrencySymbol:true,useDecimalDigits:true,hideDecimalWhenZero:false},dataTypeName:function(){return"currency"},storageTypeName:function(){return"float"},_nativeToString:function(d){var c=this.callParent([d]);if(!this.getShowCurrencySymbol()){var b=/\s?\$\s?/;c=c.replace(b,"")}else{var a=this._nf("Symbol");c=c.replace("$",a)}if(this.getHideDecimalWhenZero()){var b=this._cache.checkDecRE;if(!b){this._cache.checkDecRE=b=new RegExp(jTAC.escapeRE(this._nf("DecimalSep"))+"0+(?![1-9])")}c=c.replace(b,"")}return c},_stringToNative:function(a){if(!this.getAllowCurrencySymbol()&&(a.indexOf(this._nf("Symbol"))>-1)){this._inputError("Currency symbol found but not allowed.")}return this.callParent([a])},_applyMaxDec:function(a){if(this.getUseDecimalDigits()){return this.callParent([a])}return a},_moreValidChars:function(){return this.getAllowCurrencySymbol()?this._nf("Symbol"):""},getMaxDecimalPlaces:function(){if(this.config.maxDecimalPlaces!=null){return this.config.maxDecimalPlaces}return this._nf("Decimals")},getTrailingZeroDecimalPlaces:function(){if(this.config.trailingZeroDecimalPlaces!=null){return this.config.trailingZeroDecimalPlaces}return this._nf("Decimals")},_nf:function(b){var a=this.currencyFormat(b);if(a===undefined){a=this.numberFormat(b)}return a}};jTAC.define("TypeManagers.Currency",jTAC._internal.temp._TypeManagers_Currency);jTAC.defineAlias("Currency","TypeManagers.Currency");jTAC.defineAlias("Currency.Positive","TypeManagers.Currency",{allowNegatives:false});jTAC._internal.temp._TypeManagers_Percent={extend:"TypeManagers.BaseFloat",constructor:function(a){this.callParent([a])},config:{trailingZeroDecimalPlaces:null,showPercentSymbol:true,allowPercentSymbol:true,oneEqualsOneHundred:true},dataTypeName:function(){return"percent"},storageTypeName:function(){return"float"},_stringToNative:function(a){if(!this.getAllowPercentSymbol()&&(a.indexOf(this._nf("Symbol"))>-1)){this._inputError("Percent symbol found but not allowed.")}var b=this.callParent([a]);b=this._toNativeAdjust(b);return b},_nativeToString:function(c){c=this._toStringAdjust(c);var b=this.callParent([c]);if(!this.getShowPercentSymbol()){var a=this._cache.stripSymbolRE;if(!a){a=this._cache.stripSymbolRE=new RegExp("\\s?%\\s?")}b=b.replace(a,"")}else{b=b.replace("%",this._nf("Symbol"))}return b},toValueNeutral:function(b){var a=this.callParent([b]);return this._toNativeAdjust(a)},toStringNeutral:function(a){a=this._toStringAdjust(a);return this.callParent([a])},_moreValidChars:function(a){return this.getAllowPercentSymbol()?this._nf("Symbol"):""},getTrailingZeroDecimalPlaces:function(){if(this.getMaxDecimalPlaces()==0){return 0}if(this.config.trailingZeroDecimalPlaces!=null){return this.config.trailingZeroDecimalPlaces}return this._nf("Decimals")},_toNativeAdjust:function(b){var a=this.getMaxDecimalPlaces();if((b!=null)&&this.getOneEqualsOneHundred()&&(a!=0)){var c=this.numDecPlaces(b);b=b/100;c=c+2;b=this.round(b,2,c)}return b},_toStringAdjust:function(b){var a=this.getMaxDecimalPlaces();if((b!=null)&&this.getOneEqualsOneHundred()&&(a!=0)){var c=this.numDecPlaces(b);b=100*b;c=c-2;if(c<0){c=0}b=this.round(b,2,c)}return b},_nf:function(b){var a=this.percentFormat(b);if(a===undefined){a=this.numberFormat(b)}return a}};jTAC.define("TypeManagers.Percent",jTAC._internal.temp._TypeManagers_Percent);jTAC.defineAlias("Percent","TypeManagers.Percent");jTAC.defineAlias("Percent.Positive","TypeManagers.Percent",{allowNegatives:false});jTAC.defineAlias("Percent.Integer","TypeManagers.Percent",{maxDecimalPlaces:0});jTAC.defineAlias("Percent.Integer.Positive","TypeManagers.Percent",{maxDecimalPlaces:0,allowNegatives:false});