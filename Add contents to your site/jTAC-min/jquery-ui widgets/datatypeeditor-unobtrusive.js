(function($){function applyOne(idx,element){element=$(element);var options=element.data("jtac-datatypeeditor");if(options!=null){element.data("datatypeeditor",null);try{if(options){if(typeof options=="string"){options=window.eval("("+options+");")}element.dataTypeEditor(options)}else{element.dataTypeEditor()}}catch(e){jTAC.error("Could not parse the data-jtac-datatypeeditor attribute of id ["+element.get()[0].id+"] Error info:"+e.toString())}}}function apply(){try{jTAC._internal.pushContext("datatypeeditor-unobtrusive.apply()");var elements=$("input[type=text]");elements.each(applyOne)}finally{jTAC._internal.popContext()}}if(!window.jTAC_DataTypeEditorOptions){jTAC.error("Requires the datatypeeditor scripts.")}$(document).ready(apply)})(jQuery);