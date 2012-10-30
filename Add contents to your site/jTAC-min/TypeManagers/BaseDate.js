jTAC._internal.temp._TypeManagers_BaseDate={extend:"TypeManagers.BaseDatesAndTimes","abstract":true,config:{dateFormat:0,twoDigitYear:true},configrules:{dateFormat:{values:[0,1,2,10,20,100],clearCache:true}},storageTypeName:function(){return"date"},supportsDates:function(){return true},supportsTimes:function(){return false},_parse:function(a){return this._parseDate(a)},_format:function(a){return this._formatDate(a)},_valChars:function(){var g="",h=new Array(),a="1234567890",l=this.dateTimeFormat("ShortDateSep"),f="(d{3,4})|(M{3,4})|('[^']+')|(\\s)|(\\,)|(/)",n=new RegExp(f,"g"),e,d,c,j=this._datePattern();if(j){g+=j;a+=l}while((e=n.exec(g))!=null){d=e[0];if(h.indexOf(d)==-1){c=null;var b=null;switch(d){case"ddd":b="DaysAbbr";break;case"dddd":b="Days";break;case"MMM":b="MonthsAbbr";break;case"MMMM":b="Months";break;case"/":break;default:a+=((d.indexOf("'")==0)?d.replace("'",""):d);break}if(b){c=this.dateTimeFormat(b)}if(c){var k=c.join("");a+=k.toLowerCase()+k.toUpperCase()}h.push(d)}}return a},_setNeutralFormat:function(a){this.setDateFormat(100);this.setTwoDigitYear(false)},_dateToNumber:function(a){return Math.floor(a.valueOf()/86400000)},_skipDatePart:function(){return""},_timePattern:function(){return""},setDateFormat:function(a){this._defaultSetter("dateFormat",a);this._clearCache()},_parseDate:function(h){var e=this._createDatePatternRE();var g=e.exec(h);if(!g){return null}var f={y:1900,m:0,d:1},b,a=this._patternOrder(true,"Mdy");for(i=0;i<a.length;i++){f[a[i]]=b=parseInt(g[i+1],10);if(!isNaN(b)){switch(a[i]){case"d":if((b>31)||(b==0)){b=NaN}break;case"M":if((b>12)||(b==0)){b=NaN}break;case"y":if(b<100){if(this.getTwoDigitYear()){f.y+=(2000+b)<this.dateTimeFormat("TwoDigitYearMax")?2000:1900}else{this._inputError("Requires 4 digit year")}}else{if(b>9999){b=NaN}}break}}if(isNaN(b)){this._inputError("Invalid date part: "+a[i])}}var b=new Date(f.y,f.M-1,f.d,0,0,0,0),c=b.getFullYear(),d=b.getMonth();if((c!=f.y)||(d!=(f.M-1))){this._inputError("Day exceeds month range")}return f},_createDatePatternRE:function(){var b=this._cache.shortDateRE;if(!b){var a=this._datePattern();a=jTAC.replaceAll(a,"'","");a=a.replace(/d?d/,"(\\d{1,2})");a=a.replace(/M?M/,"(\\d{1,2})");a=a.replace(/y{2,4}/,this.getTwoDigitYear()?"(\\d{2,4})":"(\\d{4})");a=jTAC.replaceAll(a,"/",this.dateTimeFormat("ShortDateSep"),true);a="^"+a+"$";this._cache.shortDateRE=b=new RegExp(a)}return b},_formatDate:function(e,c){var d=c||this._datePattern();var a=this._extractLiterals(d);d=a.pat;d=jTAC.replaceAll(d,"/",this.dateTimeFormat("ShortDateSep"),true);d=this._replacePart("d",e.d,d);d=d.replace("yyyy",e.y.toString());d=d.replace("yy",String(e.y%100));if(d.indexOf("MMMM")>-1){var b=this.dateTimeFormat("Months")[e.M-1];d=d.replace("MMMM",b)}else{if(d.indexOf("MMM")>-1){var b=this.dateTimeFormat("MonthsAbbr")[e.M-1];if(this.getDateFormat()==2){b=b.toUpperCase()}d=d.replace("MMM",b)}else{d=this._replacePart("M",e.M,d)}}return this._restoreLiterals(d,a.lit)},_datePattern:function(){var a;switch(this.getDateFormat()){case 0:a="ShortDatePattern";break;case 1:case 2:a="ShortDatePatternMN";break;case 10:a="AbbrDatePattern";break;case 20:a="LongDatePattern";break;case 100:return"yyyy'-'MM'-'dd";default:return""}return this.dateTimeFormat(a)}};jTAC.define("TypeManagers.BaseDate",jTAC._internal.temp._TypeManagers_BaseDate);