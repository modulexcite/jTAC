jTAC._internal.temp._TypeManagers_BaseString={extend:"TypeManagers.Base","abstract":true,constructor:function(a){this.callParent([a])},nativeTypeName:function(){return"string"},storageTypeName:function(){return"string"},toValue:function(b){if(b==null){return""}if(typeof(b)!="string"){b=b.toString()}var a=this._stringToNative(b);return this._reviewValue(a)},toString:function(a){if(a==null){return""}if(typeof(a)!="string"){a=a.toString()}a=this._reviewValue(a);return this._nativeToString(a)},_nativeToString:function(a){if(a==null){return""}return a.toString()},_stringToNative:function(a){return a},_isNull:function(a){if(a==""){return true}return a==null},compare:function(b,a){b=this.toValue(b);a=this.toValue(a);if((b==null)||(a==null)){this._error("Parameter value was null.")}if(this._isCaseIns()){b=b.toLowerCase();a=a.toLowerCase()}if(b<a){return -1}else{if(b>a){return 1}}return 0},_isCaseIns:function(){return false},toValueNeutral:function(a){return a},toStringNeutral:function(a){return this.toString(a)},isValidChar:function(a){return true},toNumber:function(a){return null}};jTAC.define("TypeManagers.BaseString",jTAC._internal.temp._TypeManagers_BaseString);