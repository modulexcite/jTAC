jTAC._internal.temp._Connections_MockFormElement={extend:"Connections.FormElement",constructor:function(a){this.callParent([a])},getElement:function(a){if(!this._internal.element){this._internal.element=this._createElement("INPUT","text")}return this._internal.element},_createElement:function(a,b){return{signature:"MOCK",id:"",value:"",tagName:a,type:b,disabled:false,checked:false,style:{visibility:"",display:""},selectedIndex:-1,getAttribute:function(c){return this._attributes[c]||null},setAttribute:function(c,d){this._attributes[c]=d},_attributes:{"data-jtac-connection":"Connections.MockFormElement"},options:[{text:"1",value:"1",selected:false},{text:"2",value:"2",selected:false},{text:"3",value:"3",selected:true},{text:"4",value:"4",selected:true},]}},addEventListener:function(a,b,c){return true},addSupportEventListeners:function(a,b,c){},_createButtonsList:function(e){var c=this.getButtons();if(c){if(typeof(c)=="function"){c=c(e)}if(c instanceof Array){var a=[];for(var d=0;d<c.length;d++){if(typeof(c[d])=="string"){var f=this._createElement("INPUT","check");if(f){a.push(f)}else{if(window.console){console.log("'"+c[d]+"' element not found on page. Check spelling and case. Specified in a Connections.FormElement using element id '"+e.id+"'.")}}}else{if(typeof(c[d])=="object"){a.push(c[d])}}}return a.length?a:null}}else{if(e.type=="radio"){return[this._createElement("INPUT","radio"),this.createElement("INPUT","radio"),this.createElement("INPUT","radio"),this.createElement("INPUT","radio")]}}return null},testElement:function(a){if(typeof a=="object"){return a.signature&&a.singature=="MOCK"}return false}};jTAC.define("Connections.MockFormElement",jTAC._internal.temp._Connections_MockFormElement);jTAC.connectionResolver.register("Connections.MockFormElement");