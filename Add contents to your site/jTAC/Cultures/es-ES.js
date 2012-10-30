﻿/* -----------------------------------------------------------
This file hosts culture specific rules for Spain in Spanish(es-ES).
Load it if you are using this culture and have NOT loaded another 
culture engine, like jquery-globalize.
------------------------------------------------------------- */
jTAC_Temp =
{
   numNegPattern: "-n", 
   numDecimals: 2,      
   numGroupSep: ".",    
   numDecimalSep: ",",  
   numGroupSizes: [3],  
   numNegSymbol: "-",   
   curNegPattern: "-n $", 
   curPosPattern: "n $",  
   curSymbol: "€",      
   curDecimals: 2, 
   curGroupSep: ".", 
   curDecimalSep: ",", 
   curGroupSizes: [3], 
   curNegSymbol: "-",
   pctNegPattern: "-%n",  
   pctPosPattern: "%n", 
   pctSymbol: "%",      
   pctDecimals: 2, 
   pctGroupSep: ".",  
   pctDecimalSep: ",",  
   pctGroupSizes: [3],  
   pctNegSymbol: "-", 
   dtShortDateSep: "/", 
   dtTimeSep: ":",
   dtFirstDay: 1, 
   dtDays: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
   dtDaysAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
   dtDaysShort: ["do","lu","ma","mi","ju","vi","sá"], 
   dtMonths: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
   dtMonthsAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""],
   dtAM: null,
   dtPM: null,
   dtTwoDigitYearMax : 2029, 
   dtShortDatePattern: "dd/MM/yyyy",  
   dtShortDatePatternMN: "dd/MMM/yyyy", 
   dtAbbrDatePattern : "MMM dd, yyyy", 
   dtLongDatePattern : "MMMM dd, yyyy",
   dtShortTimePattern: "H:mm",  
   dtLongTimePattern : "H:mm:ss", 
   dtShortDurationPattern: "H:mm",  
   dtLongDurationPattern: "H:mm:ss", 
   dtShortDateShortTimePattern: "dd/MM/yyyy H:mm",  
   dtShortDateLongTimePattern: "dd/MM/yyyy H:mm:ss",  
   dtAbbrDateShortTimePattern: "dd' de 'MMM' de 'yyyy H:mm",  
   dtAbbrDateLongTimePattern : "dd' de 'MMM' de 'yyyy H:mm:ss", 
   dtLongDateShortTimePattern: "dd' de 'MMMM' de 'yyyy H:mm",  
   dtLongDateLongTimePattern : "dd' de 'MMMM' de 'yyyy H:mm:ss",
   dtShortMonthDayPattern: "dd/MM",   
   dtShortMonthDayPatternMN: "dd/MM",
   dtAbbrMonthDayPattern : "dd' de 'MMM",  
   dtLongMonthDayPattern: "dd' de 'MMMM",  
   dtShortMonthDayPattern: "MM/yyyy", 
   dtShortMonthDayPattern: "MMM/yyyy",
   dtAbbrMonthYearPattern: "MMM' de 'yyyy",
   dtLongMonthYearPattern: "MMMM' de 'yyyy"
}

jTAC.cultureInfo = jTAC.create("TypeManagers.CultureInfo", jTAC_Temp);