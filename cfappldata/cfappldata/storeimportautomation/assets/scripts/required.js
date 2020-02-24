// JavaScript Document
<!--//start mark and identify changes have been made
function markChange() {
	if (document.forms[0].HasChanges) {
		document.forms[0].HasChanges.value = "true";
	}
}

function confirmClose(url) {
	if ((document.forms[0].HasChanges) && (document.forms[0].HasChanges.value == "true") || (document.forms[0].noApprove) && (document.forms[0].noApprove.value == "Y")) {
		if (window.confirm("Are you sure you want to exit this page?\nAny information or changes you have entered will be lost")) {
			window.location=url;
		}
		else {
			return false;
		}
	}

	window.location=url;		
}
<!--//end mark and identify changes have been made

//DELETE CONFIRMATION
<!--
function confirmSubmit()
{
var agree=confirm("Are you sure you wish to delete this record?");
if (agree)
	return true ;
else
	return false ;
}
// -->

<!--//start store form required fields check
function storeFormReq(){
var errors = 0;
var msg = "The following requirements have not been met:\n";
var saveErrors = "";
	if(document.requestForm.reqType.value == '')
		{ saveErrors += "      - Please select a request type from the drop down\n";  errors++; }
	if(document.requestForm.division.value == '')
		{ saveErrors += "      - Please select an operating company from the drop down\n";  errors++; }
	if(document.requestForm.storenumber.value == '')
		{ saveErrors += "      - Please enter a store number\n";  errors++; }
	
	if (saveErrors != "") {
			msg += "\n   - Missing Data:\n" + saveErrors;
	    	alert(msg);
			return false;
	}
			return true;
}
// -->
<!--//End store form required fields check


<!--//start storeMIDs form required fields check
function storeMIDsReq(){
var errors = 0;
var msg = "The following requirements have not been met:\n";
var saveErrors = "";
var numChecked = 0; 
		for (var i=0; i<document.storeMIDs.fuelyn.length; i++) { 
        	if (document.storeMIDs.fuelyn[i].checked) { 
			   numChecked++; 
          	} 
		}
		
		if (numChecked == 0) { 	
			{ saveErrors += "      - Please select yes or no for fuel store\n";  errors++; }
		}
	
	if(document.storeMIDs.pos_pmttech.value != ''){
		if(document.storeMIDs.pos_pmttech.value.length != 12)
			{ saveErrors += "      - Please enter a 12 digit POS Chase Paymentech ID\n";  errors++; }
	}
	
	if(document.storeMIDs.fuel_pmttech.value != ''){
		if(document.storeMIDs.fuel_pmttech.value.length != 12)
			{ saveErrors += "      - Please enter a 12 digit Fuel Chase Paymentech ID\n";  errors++; }
	}
	
	if (saveErrors != "") {
			msg += "\n   - Missing Data:\n" + saveErrors;
	    	alert(msg);
			return false;
	}
			return true;
}
// -->
<!--//End storeMIDs form required fields check

<!--//start Weekly Status Report form required fields check
function weeklyStatusReq(){
var errors = 0;
var msg = "The following requirements have not been met:\n";
var saveErrors = "";
	if(document.requestSearch.reqStartdate.value == '')
		{ saveErrors += "      - Please enter a start date\n";  errors++; }
	if(document.requestSearch.reqEnddate.value == '')
			{ saveErrors += "      - Please enter a end date\n";  errors++; }
	
	if (saveErrors != "") {
			msg += "\n   - Missing Data:\n" + saveErrors;
	    	alert(msg);
			return false;
	}
			return true;
}
// -->
<!--//End Weekly Status Report form required fields check

<!--//start Store Monitoring Report form required fields check
function storeMonitorReq(){
var errors = 0;
var msg = "The following requirements have not been met:\n";
var saveErrors = "";
	if(document.requestSearch.reqStartdate.value == '')
		{ saveErrors += "      - Please enter a start date\n";  errors++; }
	if(document.requestSearch.reqEnddate.value == '')
			{ saveErrors += "      - Please enter a end date\n";  errors++; }
	
	if (saveErrors != "") {
			msg += "\n   - Missing Data:\n" + saveErrors;
	    	alert(msg);
			return false;
	}
			return true;
}
// -->
<!--//End Store Monitoring Report form required fields check

<!-- Begin
var isNN = (navigator.appName.indexOf("Netscape")!=-1);
function autoTab(input,len, e) {
var keyCode = (isNN) ? e.which : e.keyCode; 
var filter = (isNN) ? [0,8,9] : [0,8,9,16,17,18,37,38,39,40,46];
if(input.value.length >= len && !containsElement(filter,keyCode)) {
input.value = input.value.slice(0, len);
input.form[(getIndex(input)+1) % input.form.length].focus();
}
function containsElement(arr, ele) {
var found = false, index = 0;
while(!found && index < arr.length)
if(arr[index] == ele)
found = true;
else
index++;
return found;
}
function getIndex(input) {
var index = -1, i = 0, found = false;
while (i < input.form.length && index == -1)
if (input.form[i] == input)index = i;
else i++;
return index;
}
return true;
}
//  End -->

<!--//Allow only integers start
function keyCheck(eventObj, obj)
{
	var keyCode

	// Check For Browser Type
	if (document.all){ 
		keyCode=eventObj.keyCode
	}
	else{
		keyCode=eventObj.which
	}
	
	var str=obj.value
	
	//alert(keyCode);
	
	/*if(keyCode==46){ 
		if (str.indexOf(".")>0){
			return false
		}
	}*/

	if((keyCode != 0 && keyCode != 8 && keyCode != 48 && keyCode != 49 && keyCode != 50 && keyCode != 51 && keyCode != 52 && keyCode != 53 && keyCode != 54 && keyCode != 55 && keyCode != 56 && keyCode != 57)){ // Allow only integers
		alert("Only numbers allowed");
		return false
	}

	return true
}
<!--//Allow only integers end

<!--//Allow integers and decimal point start
function keyCheck2(eventObj, obj)
{
	var keyCode

	// Check For Browser Type
	if (document.all){ 
		keyCode=eventObj.keyCode
	}
	else{
		keyCode=eventObj.which
	}

	var str=obj.value

	if(keyCode==46){ 
		if (str.indexOf(".")>0){
			return false
		}
	}
	/*if((keyCode != 8))
	if((keyCode<48 || keyCode >58)   &&   (keyCode != 46)){ // Allow only integers and decimal points
		alert("Only numbers and decimal point allowed");
		return false
	}*/
	
	if((keyCode != 0 && keyCode != 8 && keyCode != 46 && keyCode != 48 && keyCode != 49 && keyCode != 50 && keyCode != 51 && keyCode != 52 && keyCode != 53 && keyCode != 54 && keyCode != 55 && keyCode != 56 && keyCode != 57)){ // Allow only integers
		alert("Only numbers and decimal point allowed");
		return false
	}

	return true
}
<!--//Allow integers and decimal point end

<!--//process image
function openWaitUpd(msg) 
{
    wait_popup = window.createPopup();
    var wait_body = wait_popup.document.body;
    var w = 222;
    var h = 50;
    var x = (window.screen.width - w) / 2;
    var y = (window.screen.height - h) / 2;
    wait_body.style.backgroundColor = "#FFFFFF";
    wait_body.style.borderStyle =  "outset";
    wait_body.style.borderWidth = "1px";
	wait_body.style.borderColor = "#88ADDA";
    wait_body.style.fontFamily = "Tahoma, Arial, Helvetica, sans-serif";
    wait_body.style.fontSize = "14px";
    wait_body.style.fontWeight = "bold";
    wait_body.style.margin = "1px 1px 1px 1px";
	if (msg)
	{	wait_body.innerHTML = '<table width="99%" align="center" valign="middle" cellspacing="0" cellpadding="0"><tr><td align="center"><font face="Tahoma, Arial, Helvetica, sans-serif" size="+1" color="FF0000">' + msg + '</font><br /><img src="assets/images/ajax-loader3.gif"></td></tr></table>'; }
	else
	{	wait_body.innerHTML = '<table width="99%" align="center" valign="middle" cellspacing="0" cellpadding="0"><tr><td align="center"><font face="Tahoma, Arial, Helvetica, sans-serif" size="+1" color="FF0000">Submitting data...</font><br /><img src="assets/images/ajax-loader3.gif"></td></tr></table>'; }
    wait_popup.show(x, y, w, h);
}
<!--//processing image end

<!--//process image
function openWaitAdminUpd(msg) 
{
    wait_popup = window.createPopup();
    var wait_body = wait_popup.document.body;
    var w = 222;
    var h = 50;
    var x = (window.screen.width - w) / 2;
    var y = (window.screen.height - h) / 2;
    wait_body.style.backgroundColor = "#FFFFFF";
    wait_body.style.borderStyle =  "outset";
    wait_body.style.borderWidth = "1px";
	wait_body.style.borderColor = "#88ADDA";
    wait_body.style.fontFamily = "Tahoma, Arial, Helvetica, sans-serif";
    wait_body.style.fontSize = "14px";
    wait_body.style.fontWeight = "bold";
    wait_body.style.margin = "1px 1px 1px 1px";
	if (msg)
	{	wait_body.innerHTML = '<table width="99%" align="center" valign="middle" cellspacing="0" cellpadding="0"><tr><td align="center"><font face="Tahoma, Arial, Helvetica, sans-serif" size="+1" color="FF0000">' + msg + '</font><br /><img src="../assets/images/ajax-loader3.gif"></td></tr></table>'; }
	else
	{	wait_body.innerHTML = '<table width="99%" align="center" valign="middle" cellspacing="0" cellpadding="0"><tr><td align="center"><font face="Tahoma, Arial, Helvetica, sans-serif" size="+1" color="FF0000">Submitting data...</font><br /><img src="../assets/images/ajax-loader3.gif"></td></tr></table>'; }
    wait_popup.show(x, y, w, h);
}
<!--//processing image end