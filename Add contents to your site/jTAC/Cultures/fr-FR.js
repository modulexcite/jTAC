﻿/* -----------------------------------------------------------
This file hosts culture specific rules for france in French (fr-FR).
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
   curGroupSep: " ", 
   curDecimalSep: ",", 
   curGroupSizes: [3], 
   curNegSymbol: "-",
   pctNegPattern: "-%n",  
   pctPosPattern: "%n", 
   pctSymbol: "%",      
   pctDecimals: 2, 
   pctGroupSep: " ",  
   pctDecimalSep: ",",  
   pctGroupSizes: [3],  
   pctNegSymbol: "-", 
   dtShortDateSep: "/", 
   dtTimeSep: ":",
   dtFirstDay: 0, 
   dtDays: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"], 
   dtDaysAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
   dtDaysShort: ["di","lu","ma","me","je","ve","sa"], 
   dtMonths: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
   dtMonthsAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""],
   dtAM: null, 
   dtPM: null, 
   dtTwoDigitYearMax : 2029,  
   dtShortDatePattern: "dd/MM/yyyy",  
   dtShortDatePatternMN: "dd/MMM/yyyy",  
   dtAbbrDatePattern : "d MMM yyyy",  
   dtLongDatePattern : "d MMMM yyyy", 
   dtShortTimePattern: "HH:mm",  
   dtLongTimePattern : "HH:mm:ss", 
   dtShortDurationPattern: "HH:mm",  
   dtLongDurationPattern: "h:mm:ss", 
   dtShortDateShortTimePattern: "dd/MM/yyyy HH:mm", 
   dtShortDateLongTimePattern: "dd/MM/yyyy HH:mm:ss", 
   dtAbbrDateShortTimePattern: "d MMM yyyy HH:mm",  
   dtAbbrDateLongTimePattern : "d MMM yyyy HH:mm:ss",
   dtLongDateShortTimePattern: "d MMMM yyyy HH:mm",  
   dtLongDateLongTimePattern : "d MMMM yyyy HH:mm:ss", 
   dtShortMonthDayPattern: "dd/MM",  
   dtShortMonthDayPatternMN: "dd/MMM", 
   dtAbbrMonthDayPattern : "d MMM",  
   dtLongMonthDayPattern: "d MMMM",  
   dtShortMonthDayPattern: "MM/yyyy",
   dtShortMonthDayPattern: "MMM/yyyy", 
   dtAbbrMonthYearPattern: "MMM yyyy", 
   dtLongMonthYearPattern: "MMMM yyyy" 
}

jTAC.cultureInfo = jTAC.create("TypeManagers.CultureInfo", jTAC_Temp);
