jTAC._internal.temp._TypeManagers_BaseString={extend:"TypeManagers.Base","abstract":true,constructor:function(a){this.callParent([a])},nativeTypeName:function(){return"string"},storageTypeName:function(){return"string"},toValue:function(b){if(b==null){return""}if(typeof(b)!="string"){b=b.toString()}var a=this._stringToNative(b);return this._reviewValue(a)},toString:function(a){if(a==null){return""}if(typeof(a)!="string"){a=a.toString()}a=this._reviewValue(a);return this._nativeToString(a)},_nativeToString:function(a){if(a==null){return""}return a.toString()},_stringToNative:function(a){return a},_isNull:function(a){if(a==""){return true}return a==null},compare:function(b,a){b=this.toValue(b);a=this.toValue(a);if((b==null)||(a==null)){this._error("Parameter value was null.")}if(this._isCaseIns()){b=b.toLowerCase();a=a.toLowerCase()}if(b<a){return -1}else{if(b>a){return 1}}return 0},_isCaseIns:function(){return false},toValueNeutral:function(a){return a},toStringNeutral:function(a){return this.toString(a)},isValidChar:function(a){return true},toNumber:function(a){return null}};jTAC.define("TypeManagers.BaseString",jTAC._internal.temp._TypeManagers_BaseString);jTAC._internal.temp._TypeManagers_BaseStrongPatternString={extend:"TypeManagers.BaseString","abstract":true,constructor:function(a){this.callParent([a])},config:{altREPattern:""},configrules:{},_reviewValue:function(b){var c=this.callParent([b]);if(c==""){return c}var a;if(this.getAltREPattern()){a=new RegExp(this.getAltREPattern(),this._isCaseIns()?"i":"")}else{a=this._regExp()}if(!a||a.test(c)){return c}this._inputError("Invalid "+this.dataTypeName()+" ["+c+"]")},_regExp:function(){this._AM()}};jTAC.define("TypeManagers.BaseStrongPatternString",jTAC._internal.temp._TypeManagers_BaseStrongPatternString);jTAC._internal.temp._TypeManagers_BaseRegionString={extend:"TypeManagers.BaseString","abstract":true,constructor:function(a){this.callParent([a])},config:{region:"",regionsData:null},configrules:{},_nativeToString:function(b){if(b==null){return""}var c=b.toString();if(c==""){return""}var a=this._getRegionNode(c);if(!a){this._inputError("Invalid "+this.dataTypeName())}if(a.toFormat){c=a.toFormat(c)}return c},_reviewValue:function(b){b=this.callParent([b]);if(b==""){return b}var a=this._getRegionNode(b);if(!a){this._inputError("Invalid "+this.dataTypeName()+" ["+b+"]")}return b},isValidChar:function(d){if(!this.callParent([d])){return false}var a=this._selectRegionNodes();if(!a.length){return true}for(var b=0;b<a.length;b++){var e=a[b];if(!e.validChar){return true}if(typeof e.validChar=="string"){var c=this._cache.validCharRE;if(!c){c=this._cache=new RegExp(e.validChar)}return c.test(d)}if(e.validChar(d)){return true}}return false},toValueNeutral:function(b){if(!b){return""}try{this._pushContext();var a=this._getRegionNode(b);if(!a){this._inputError("Invalid "+this.dataTypeName()+" ["+b+"]")}if(a.toNeutral){b=a.toNeutral(b)}return b}finally{this._popContext()}},_selectRegionNodes:function(){function d(j){var h=j.split("|");var f=this.getRegionsData();for(var e=0;e<h.length;e++){var g=f[h[e]];if(!g){this._error("Region ["+h[e]+"] not defined in the regionsData object.")}if(typeof g=="string"){d.call(this,g);continue}if(typeof g=="object"){c.push(g)}else{this._error("Region ["+g+"] definition invalid.")}}}var a=this._internal.rds;if(!a||(this._internal.rdc!=jTAC._globalRegionNameCount)){var b=this.getRegion();if(b==""){b=this.getRegionsData().defaultName}if(b=="GLOBAL"){b=jTAC._globalRegionName}if(!b){this._error("Could not identify a region name from the region property.")}var c=[];d.call(this,b);a=this._internal.rds=c;this._internal.rdc=jTAC._globalRegionNameCount}return a},_getRegionNode:function(e){var d=this._selectRegionNodes();for(var b=0;b<d.length;b++){var a=d[b];if(!e){return a}if(typeof a.pattern=="function"){if(a.call(this,e)){return a}}else{var c=new RegExp(this._resolvePattern.call(this,a),a.caseIns?"i":"");if(c.test(e)){return a}}}return null},_resolvePattern:function(a){return a.pattern},_defaultRegionsData:function(){this._AM()},applyNumberMask:function(k,n,c,e){var l=c?0:k.length-1;var d=c?0:n.length-1;var b=c?1:-1;var g=c?k.length:-1;var j=c?n.length-1:0;var a="";for(var h=d;c?h<=j:h>=j;h=h+b){var f=n.charAt(h);if(f=="#"){do{if(l==g){f=e;break}f=k.charAt(l);l=l+b}while((f<"0")||(f>"9"))}if(c){a=a+f}else{a=f+a}}if(l!=g){for(var h=l;c?h<g:h>g;h=h+b){var f=k.charAt(h);if((f>="0")&&(f<="9")){if(c){a=a+f}else{a=f+a}}}}return a},setRegion:function(a){this.config.region=jTAC.checkAsStr(a);this._internal.rds=null},getRegionsData:function(){var a=this.config.regionsData;if(!a){a=this.config.regionsData=this._defaultRegionsData()}return a},setRegionsData:function(a){if(typeof(a)!="object"){this._error("RegionsData must be an object")}this.config.regionsData=a}};jTAC.define("TypeManagers.BaseRegionString",jTAC._internal.temp._TypeManagers_BaseRegionString);jTAC.setGlobalRegionName=function(a){jTAC._globalRegionName=a;jTAC._globalRegionNameCount++};jTAC._globalRegionName=null;jTAC._globalRegionNameCount=0;jTAC._internal.temp._TypeManagers_String={extend:"TypeManagers.BaseString",constructor:function(a){this.callParent([a])},config:{caseIns:false},dataTypeName:function(){return"string"},_isCaseIns:function(){return this.config.caseIns}};jTAC.define("TypeManagers.String",jTAC._internal.temp._TypeManagers_String);jTAC.defineAlias("String","TypeManagers.String");jTAC.defineAlias("String.caseins","TypeManagers.String",{caseIns:true});jTAC._internal.temp._TypeManagers_EmailAddress={extend:"TypeManagers.BaseStrongPatternString",constructor:function(a){this.callParent([a])},config:{multiple:false,delimiterRE:";[ ]?"},dataTypeName:function(){return"EmailAddress"},_regExp:function(){var a="^"+this._addressRE;if(this.getMultiple()){a+="("+this.getDelimiterRE()+this._addressRE+")*"}a+="$";return new RegExp(a,"i")},_addressRE:"([\\w\\.!#\\$%\\-+.'_]+@[A-Za-z0-9\\-]+(\\.[A-Za-z0-9\\-]{2,})+)"};jTAC.define("TypeManagers.EmailAddress",jTAC._internal.temp._TypeManagers_EmailAddress);jTAC.defineAlias("EmailAddress","TypeManagers.EmailAddress");jTAC.defineAlias("EmailAddress.Multiple","TypeManagers.EmailAddress",{multiple:true});jTAC._internal.temp._TypeManagers_PhoneNumber={extend:"TypeManagers.BaseRegionString",constructor:function(a){this.callParent([a])},config:{supportsExt:false},dataTypeName:function(){return"PhoneNumber"},_resolvePattern:function(a){var c=a.pattern;if(this.getSupportsExt()){var b=a.extensionRE||"(\\s?\\#\\d{1,10})?";c=jTAC.replaceAll(c,"\\$\\)",b+"$)",false)}return c},_defaultRegionsData:function(){return window.jTAC_PhoneNumberRegionsData}};jTAC.define("TypeManagers.PhoneNumber",jTAC._internal.temp._TypeManagers_PhoneNumber);jTAC.defineAlias("PhoneNumber","TypeManagers.PhoneNumber");jTAC.defineAlias("PhoneNumber.NorthAmerica","TypeManagers.PhoneNumber",{region:"NorthAmerica"});jTAC.defineAlias("PhoneNumber.NorthAmerica.CountryCode","TypeManagers.PhoneNumber",{region:"NorthAmerica|CountryCode"});jTAC.defineAlias("PhoneNumber.UnitedStates","TypeManagers.PhoneNumber",{region:"UnitedStates"});jTAC.defineAlias("PhoneNumber.UnitedKingdom","TypeManagers.PhoneNumber",{region:"UnitedKingdom"});jTAC.defineAlias("PhoneNumber.France","TypeManagers.PhoneNumber",{region:"France"});jTAC.defineAlias("PhoneNumber.Japan","TypeManagers.PhoneNumber",{region:"Japan"});jTAC.defineAlias("PhoneNumber.Germany","TypeManagers.PhoneNumber",{region:"Germany"});jTAC.defineAlias("PhoneNumber.China","TypeManagers.PhoneNumber",{region:"China"});jTAC.defineAlias("PhoneNumber.Canada","TypeManagers.PhoneNumber",{region:"Canada"});var jTAC_PhoneNumberRegionsData={defaultName:"Any",Any:{name:"Any",pattern:"(^\\+?\\d([\\-\\.]?\\d){6,19}$)",validChar:"[0-9\\+\\-\\.]"},CountryCode:{name:"CountryCode",pattern:"(^\\+(?:\\d ?){6,14}\\d$)",validChar:"[0-9\\+ ]"},NorthAmerica:{name:"NorthAmerica",pattern:"(^([1])?[ ]?((\\([2-9]\\d{2}\\))|([2-9]\\d{2}))?[ ]?\\d{3}[ \\-]?\\d{4}$)",validChar:"[0-9\\+\\- \\(\\)]",toNeutral:function(d){var c="";for(var a=0;a<d.length;a++){var b=d.charAt(a);if((b>="0")&&(b<="9")){c+=b}}return c},toFormat:function(c){var b=jTAC_PhoneNumberRegionsData.NorthAmerica;var a=b.toNeutral(c);return jTAC.TypeManagers.BaseRegionString.prototype.applyNumberMask(a,b.formatMask,false,"")},formatMask:"#(###) ###-####"},UnitedStates:"NorthAmerica",Canada:"NorthAmerica",France:{name:"France",pattern:"(^(0( \\d|\\d ))?\\d\\d \\d\\d(\\d \\d| \\d\\d )\\d\\d$)",validChar:"[0-9 ]"},Japan:{name:"Japan",pattern:"(^(0\\d{1,4}-|\\(0\\d{1,4}\\) ?)?\\d{1,4}-\\d{4}$)",validChar:"[0-9\\- \\(\\)]"},Germany:{name:"Germany",pattern:"(^((\\(0\\d\\d\\) |(\\(0\\d{3}\\) )?\\d )?\\d\\d \\d\\d \\d\\d|\\(0\\d{4}\\) \\d \\d\\d-\\d\\d?)$)",validChar:"[0-9\\- \\(\\)]"},China:{name:"China",pattern:"(^(\\(\\d{3}\\)|\\d{3}-)?\\d{8}$)",validChar:"[0-9\\- \\(\\)]"},UnitedKingdom:{name:"UnitedKingdom",pattern:"(^(((\\+44\\s?\\d{4}|\\(?0\\d{4}\\)?)\\s?\\d{3}\\s?\\d{3})|((\\+44\\s?\\d{3}|\\(?0\\d{3}\\)?)\\s?\\d{3}\\s?\\d{4})|((\\+44\\s?\\d{2}|\\(?0\\d{2}\\)?)\\s?\\d{4}\\s?\\d{4}))$)",validChar:"[0-9\\+ \\(\\)]"}};jTAC._internal.temp._TypeManagers_PostalCode={extend:"TypeManagers.BaseRegionString",constructor:function(a){this.callParent([a])},config:{supportsExt:false},dataTypeName:function(){return"PostalCode"},_defaultRegionsData:function(){return window.jTAC_PostalCodeRegionsData}};jTAC.define("TypeManagers.PostalCode",jTAC._internal.temp._TypeManagers_PostalCode);jTAC.defineAlias("PostalCode","TypeManagers.PostalCode");jTAC.defineAlias("PostalCode.NorthAmerica","TypeManagers.PostalCode",{region:"NorthAmerica"});jTAC.defineAlias("PostalCode.UnitedStates","TypeManagers.PostalCode",{region:"UnitedStates"});jTAC.defineAlias("PostalCode.UnitedKingdom","TypeManagers.PostalCode",{region:"UnitedKingdom"});jTAC.defineAlias("PostalCode.France","TypeManagers.PostalCode",{region:"France"});jTAC.defineAlias("PostalCode.Japan","TypeManagers.PostalCode",{region:"Japan"});jTAC.defineAlias("PostalCode.Germany","TypeManagers.PostalCode",{region:"Germany"});jTAC.defineAlias("PostalCode.China","TypeManagers.PostalCode",{region:"China"});jTAC.defineAlias("PostalCode.Canada","TypeManagers.PostalCode",{region:"Canada"});var jTAC_PostalCodeRegionsData={defaultName:"UnitedStates|Canada",UnitedStates:{name:"UnitedStates",pattern:"(^(\\d{5}-\\d{4}|\\d{5})$)",validChar:"[0-9\\-]"},Canada:{name:"Canada",pattern:"(^[ABCEGHJ-NPRSTVXY]\\d[ABCEGHJ-NPRSTV-Z][ ]?\\d[ABCEGHJ-NPRSTV-Z]\\d$)",caseIns:true,validChar:"[0-9A-Za-z ]"},NorthAmerica:"UnitedStates|Canada",UnitedKingdom:{name:"UnitedKingdom",pattern:"(^(GIR 0AA|[A-PR-UWYZ]([0-9][0-9A-HJKPS-UW]?|[A-HK-Y][0-9][0-9ABEHMNPRV-Y]?) [0-9][ABD-HJLNP-UW-Z]{2})$)",validChar:"[0-9A-Z ]"},France:{name:"France",pattern:"(^\\d{5}$)",validChar:"[0-9]"},Japan:{name:"Japan",pattern:"(^\\d{3}(-(\\d{4}|\\d{2}))?$)",validChar:"[0-9\\-]"},Germany:{name:"Germany",pattern:"(^\\d{5}$)",validChar:"[0-9\\-D]"},China:{name:"China",pattern:"(^\\d{6}$)",validChar:"[0-9]"}};jTAC._internal.temp._TypeManagers_CreditCardNumber={extend:"TypeManagers.BaseString",constructor:function(a){this.callParent([a])},config:{brands:[{len:16,prefix:"51|52|53|54|55"},{len:13,prefix:"4"},{len:16,prefix:"4"},{len:15,prefix:"34|37"},{len:14,prefix:"300|301|302|303|305|36|38"},{len:16,prefix:"6011"}],allowSeps:""},configrules:{},dataTypeName:function(){return"CreditCardNumber"},_reviewValue:function(j){if(j==""){return""}var c=this.getAllowSeps();if(c){j=jTAC.replaceAll(j,c,"",true)}var f=j.length;if(f<10){this._inputError("Not enough digits")}if(!/^(\d+)$/.test(j)){this._inputError("Illegal character")}var m=this.getBrands();if(m){var a=0;for(var e=0;e<m.length;e++){var b=m[e];if(b.len==f){var l=new RegExp("^("+b.prefix+")","i");if(l.test(j)){a=1;break}}}if(!a){this._inputError("Brand mismatch")}}var k=0;var g=true;for(var e=f-1;e>=0;e--){var h=parseInt(j.charAt(e),10);if(g){k+=h}else{h=h*2;if(h>9){k+=1+(h%10)}else{k+=h}}g=!g}if(k%10!=0){this._inputError("Failed Luhns")}return j},isValidChar:function(a){if(!this.callParent([a])){return false}if(this.getAllowSeps()==a){return true}return"1234567890".indexOf(a)>-1},setBrands:function(a){if((a instanceof Array)||(a==null)){this.config.brands=a}else{this._error("Parameter must be an array or null.")}},setAllowSeps:function(a){if((typeof a=="string")&&(a.length<=1)){this.config.allowSeps=a}else{this._error("Parameter must be a 1 character string.")}}};jTAC.define("TypeManagers.CreditCardNumber",jTAC._internal.temp._TypeManagers_CreditCardNumber);jTAC.defineAlias("CreditCardNumber","TypeManagers.CreditCardNumber");jTAC.defineAlias("CreditCardNumber.AllBrands","TypeManagers.CreditCardNumber",{brands:null});jTAC._internal.temp._TypeManagers_URL={extend:"TypeManagers.BaseStrongPatternString",constructor:function(a){this.callParent([a])},config:{uriScheme:"http|https",domainExt:"aero|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|travel|jobs|mobi|pro|co",supportsIP:false,supportsPort:false,supportsPath:true,requireUriScheme:true},configrules:{},dataTypeName:function(){return"Url"},_regExp:function(){var a="^((?:"+this.getUriScheme()+")\\://)";if(!this.getRequireUriScheme()){a+="?"}if(this.getSupportsIP()){a+="(("}a+=this._domainRE;var b=this.getDomainExt();if(!b){b=this._defDomainExt}a+=this._domainExtRE.replace("{DE}",b);if(this.getSupportsIP()){a+=")|("+this._IPAddressRE+"))"}if(this.getSupportsPort()){a=a+this._portRE}if(this.getSupportsPath()){a+="/?("+this._filePathRE+")?"}else{a+="/?"}a+="$";return new RegExp(a,"i")},_domainRE:"[a-zA-Z0-9\\-\\.]+",_IPAddressRE:"(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|0?[1-9]{1}[0-9]{1}|0{0,2}[1-9])\\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|0?[1-9]{1}[0-9]{1}|0{0,2}[1-9]|0)\\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|0?[1-9]{1}[0-9]{1}|0{0,2}[1-9]|0)\\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|0?[1-9]{1}[0-9]{1}|0{0,2}[0-9])",_domainExtRE:"(?:\\.[a-z]{2})?\\.(?:{DE})(?:\\.[a-z]{2})?",_defDomainExt:"[a-zA-Z]{2,3}",_portRE:"(?:\\:\\d+)?",_filePathRE:"(?:/[a-zA-Z0-9_/%\\$#~][a-zA-Z0-9\\-\\._\\'/\\+%\\$#~]+[A-Za-z0-9])*"};jTAC.define("TypeManagers.Url",jTAC._internal.temp._TypeManagers_URL);jTAC.defineAlias("Url","TypeManagers.Url");jTAC.defineAlias("Url.FTP","TypeManagers.Url",{uriScheme:"ftp"});