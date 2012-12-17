if(!window.jTAC){throw new Error("window.jTAC not created.")}jTAC._internal.temp._TypeManagers_BaseDatesAndTimes={extend:"TypeManagers.BaseCulture","abstract":true,config:{useUTC:false},nativeTypeName:function(){return"object"},supportsDates:function(){this.AM()},supportsTimes:function(){this.AM()},_stringToNative:function(b){var a=this._parse(b);if(a==null){this._inputError("Cannot convert ["+b+"] to "+this.dataTypeName()+".")}return this._fromNeutralToDate(a)},_parse:function(a){this.AM()},_nativeToString:function(b){if(b==null){return""}var a=this._fromDateToNeutral(b);return this._format(a)},_format:function(a){this.AM()},compare:function(b,a){if(typeof b=="string"){b=this.toValue(b)}b=this.toNumber(b);if(typeof a=="string"){a=this.toValue(a)}a=this.toNumber(a);return this.callParent([b,a])},isValidChar:function(b){if(!this.callParent([b])){return false}var a=this._cache.validChars;if(a==null){a=this._cache.validChars=this._valChars()}return a.indexOf(b)>-1},_valChars:function(){this.AM()},toValueNeutral:function(a){if(a==null){return null}try{this._pushContext();if(a instanceof Date){return this._reviewValue(a)}return this._getNeutralFormatTM().toValue(a)}finally{this._popContext()}},toStringNeutral:function(a){if(a==null){return""}return this._getNeutralFormatTM().toString(a)},_getNeutralFormatTM:function(){var a=this._internal.neutralTM;if(!a){a=this._internal.neutralTM=jTAC.create(this.$fullClassName);a._setNeutralFormat(this)}return a},_setNeutralFormat:function(a){this.setUseUTC(a.getUseUTC())},toNumber:function(a){if(a==null){return 0}if(a instanceof Date){return this._dateToNumber(a)}else{if(typeof a=="number"){return a}}return null},_dateToNumber:function(a){return Math.floor(a.valueOf()/1000)},_fromNeutralToDate:function(b){var a=new Date();if(b.y===undefined){b.y=a.getFullYear();b.M=a.getMonth();b.d=a.getDate()}if(b.h===undefined){b.h=b.m=b.s=0}if(this.getUseUTC()){a.setUTCFullYear(b.y,b.M-1,b.d);a.setUTCHours(b.h,b.m,b.s,0)}else{a.setFullYear(b.y,b.M-1,b.d);a.setHours(b.h,b.m,b.s,0)}return a},_fromDateToNeutral:function(a,d){var c={};var b=this.getUseUTC();if(d!=2){c.y=b?a.getUTCFullYear():a.getFullYear();c.M=b?a.getUTCMonth()+1:a.getMonth()+1;c.d=b?a.getUTCDate():a.getDate()}if(d!=1){c.h=b?a.getUTCHours():a.getHours();c.m=b?a.getUTCMinutes():a.getMinutes();c.s=b?a.getUTCSeconds():a.getSeconds()}return c},_patternOrder:function(d,b){var f=this._cache.order;if(!f){var a=d?this._datePattern():this._timePattern();f=[];var g=false;for(var c=0;c<a.length;c++){var e=a.charAt(c);if((b.indexOf(e)>-1)&&(f.indexOf(e)==-1)&&!g){f.push(e)}else{if(e=="'"){g=!g}}}this._cache.order=f}return f},_replacePart:function(e,g,f){var d=g.toString();var c=new RegExp("("+e+"+)");var a=c.exec(f);if(!a){return f}var b=a[0].length-d.length;if(b>0){d="000000".substr(0,b)+d}return f.replace(a[0],d)},_extractLiterals:function(c){var d=/(['"]([^'"]+)['"])/;var a,e,b=null;while(a=d.exec(c)){if((a[2].charAt(0)!="'")&&(a[2].charAt(0)!='"')){if(!b){b=[]}e=b.length;b.push(a[2]);c=c.replace(a[1],"{"+e+"}")}}return{pat:c,lit:b}},_restoreLiterals:function(c,a){if(a){for(var b=0;b<a.length;b++){c=c.replace("{"+b+"}",a[b])}}return c},_isNullYear:function(c){if(c instanceof Date){return c.getUTCFullYear()==1}var a=this._internal;var b=a.nullPat;if(b==null){b=a.nullPat=this._format({y:1,M:1,d:1,h:0,m:0,s:0})}return c===b}};jTAC.define("TypeManagers.BaseDatesAndTimes",jTAC._internal.temp._TypeManagers_BaseDatesAndTimes);jTAC._internal.temp._TypeManagers_BaseDate={extend:"TypeManagers.BaseDatesAndTimes","abstract":true,config:{dateFormat:0,twoDigitYear:true},configrules:{dateFormat:{values:[0,1,2,10,20,100],clearCache:true}},storageTypeName:function(){return"date"},supportsDates:function(){return true},supportsTimes:function(){return false},_parse:function(a){return this._parseDate(a)},_format:function(a){return this._formatDate(a)},_valChars:function(){var g="",h=new Array(),a="1234567890",l=this.dateTimeFormat("ShortDateSep"),f="(d{3,4})|(M{3,4})|('[^']+')|(\\s)|(\\,)|(/)",n=new RegExp(f,"g"),e,d,c,j=this._datePattern();if(j){g+=j;a+=l}while((e=n.exec(g))!=null){d=e[0];if(h.indexOf(d)==-1){c=null;var b=null;switch(d){case"ddd":b="DaysAbbr";break;case"dddd":b="Days";break;case"MMM":b="MonthsAbbr";break;case"MMMM":b="Months";break;case"/":break;default:a+=((d.indexOf("'")==0)?d.replace("'",""):d);break}if(b){c=this.dateTimeFormat(b)}if(c){var k=c.join("");a+=k.toLowerCase()+k.toUpperCase()}h.push(d)}}return a},_setNeutralFormat:function(a){this.callParent([a]);this.setDateFormat(100);this.setTwoDigitYear(false)},_dateToNumber:function(a){return Math.floor(a.valueOf()/86400000)},_skipDatePart:function(){return""},_timePattern:function(){return""},setDateFormat:function(a){this._defaultSetter("dateFormat",a);this._clearCache()},_parseDate:function(h){var e=this._createDatePatternRE();var g=e.exec(h);if(!g){return null}var f={y:1900,m:0,d:1},b,a=this._patternOrder(true,"Mdy");for(i=0;i<a.length;i++){f[a[i]]=b=parseInt(g[i+1],10);if(!isNaN(b)){switch(a[i]){case"d":if((b>31)||(b==0)){b=NaN}break;case"M":if((b>12)||(b==0)){b=NaN}break;case"y":if(b<100){if(this.getTwoDigitYear()){f.y+=(2000+b)<this.dateTimeFormat("TwoDigitYearMax")?2000:1900}else{this._inputError("Requires 4 digit year")}}else{if(b>9999){b=NaN}}break}}if(isNaN(b)){this._inputError("Invalid date part: "+a[i])}}var b=new Date(f.y,f.M-1,f.d,0,0,0,0),c=b.getFullYear(),d=b.getMonth();if((c!=f.y)||(d!=(f.M-1))){this._inputError("Day exceeds month range")}return f},_createDatePatternRE:function(){var b=this._cache.shortDateRE;if(!b){var a=this._datePattern();a=jTAC.replaceAll(a,"'","");a=a.replace(/d?d/,"(\\d{1,2})");a=a.replace(/M?M/,"(\\d{1,2})");a=a.replace(/y{2,4}/,this.getTwoDigitYear()?"(\\d{2,4})":"(\\d{4})");a=jTAC.replaceAll(a,"/",this.dateTimeFormat("ShortDateSep"),true);a="^"+a+"$";this._cache.shortDateRE=b=new RegExp(a)}return b},_formatDate:function(e,c){var d=c||this._datePattern();var a=this._extractLiterals(d);d=a.pat;d=jTAC.replaceAll(d,"/",this.dateTimeFormat("ShortDateSep"),true);d=this._replacePart("d",e.d,d);d=this._replacePart("yyyy",e.y,d);d=this._replacePart("yy",e.y,d);if(d.indexOf("MMMM")>-1){var b=this.dateTimeFormat("Months")[e.M-1];d=d.replace("MMMM",b)}else{if(d.indexOf("MMM")>-1){var b=this.dateTimeFormat("MonthsAbbr")[e.M-1];if(this.getDateFormat()==2){b=b.toUpperCase()}d=d.replace("MMM",b)}else{d=this._replacePart("M",e.M,d)}}return this._restoreLiterals(d,a.lit)},_datePattern:function(){var a;switch(this.getDateFormat()){case 0:a="ShortDatePattern";break;case 1:case 2:a="ShortDatePatternMN";break;case 10:a="AbbrDatePattern";break;case 20:a="LongDatePattern";break;case 100:return"yyyy'-'MM'-'dd";default:return""}return this.dateTimeFormat(a)}};jTAC.define("TypeManagers.BaseDate",jTAC._internal.temp._TypeManagers_BaseDate);jTAC._internal.temp._TypeManagers_Date={extend:"TypeManagers.BaseDate",constructor:function(a){this.callParent([a])},dataTypeName:function(){return"date"},_isNull:function(b){var a=this.callParent([b]);if(a){return true}return this._isNullYear(b)}};jTAC.define("TypeManagers.Date",jTAC._internal.temp._TypeManagers_Date);jTAC.defineAlias("Date","TypeManagers.Date");jTAC.defineAlias("Date.Short","TypeManagers.Date");jTAC.defineAlias("Date.Abbrev","TypeManagers.Date",{dateFormat:10});jTAC.defineAlias("Date.Long","TypeManagers.Date",{dateFormat:20});