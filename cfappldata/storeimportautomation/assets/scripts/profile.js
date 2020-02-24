<!--//
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


<!--//start supply transfer deletes
function delSupply(id) {
var agree=confirm("Are you sure you wish to delete this transfer?");
	if (agree){
	document.mySupplyTrsfr.Action.value = "D";
	document.mySupplyTrsfr.DelTmpKey.value = id;
	document.mySupplyTrsfr.submit();
		
	}
	else{
		return false;
		
	}
}
<!--//end supply transfer deletes

<!--//start inventory transfer deletes
function delInventory(id) {
var agree=confirm("Are you sure you wish to delete this transfer?");
	if (agree){
	document.myInventoryTrsfr.Action.value = "D";
	document.myInventoryTrsfr.DelTmpKey.value = id;
	document.myInventoryTrsfr.submit();
		
	}
	else{
		return false;
		
	}
}
<!--//end inventory transfer deletes

<!--//start check all cutback percents are entered
function cutbackPCT(cutBacks) {
var errors = 0;
var msg = "The following requirements have not been met:\n";
var saveErrors = "";
var numChecked = 0; 
var i=1;
while (i<=cutBacks)
  {
  	if (document.myCutBacks.elements['cutbackDeptNum'+i].value == "") { 
	numChecked++; 
	}
	if (document.myCutBacks.elements['cutbackDept'+i].value == "") { 
	numChecked++; 
	}
	if (document.myCutBacks.elements['cutbackpct'+i].value == "") { 
	numChecked++; 
	}
  i++;
  }

	if (numChecked >= 1) {
		{ saveErrors += "      - Please enter a cutback percent for all departments\n";  errors++; }
	}
	
	if (saveErrors != "") {
			msg += "\n   - Missing Data:\n" + saveErrors;
	    	alert(msg);
			return false;
	}

}
<!--//end check all cutback percents are entered

<!--//start check all mapping accounts are entered
function mappingUpdChk(mapCnts) {
var errors = 0;
var msg = "The following requirements have not been met:\n";
var saveErrors = "";
var numChecked = 0; 
var i=1;
while (i<=mapCnts)
  {
  	if (document.myAcctMapping.elements['acctNum'+i].value == "") { 
	numChecked++; 
	}
	if (document.myAcctMapping.elements['glNum'+i].value == "") { 
	numChecked++; 
	}
  i++;
  }

	if (numChecked >= 1) {
		{ saveErrors += "      - Please enter a acct and GL number for all departments\n";  errors++; }
	}
	
	if (saveErrors != "") {
			msg += "\n   - Missing Data:\n" + saveErrors;
	    	alert(msg);
			return false;
	}

}
<!--//end check all mapping accounts are entered

<!--//start check all mapping add/delete requirements
function mappingCHK() {
var errors = 0;
var msg = "The following requirements have not been met:\n";
var saveErrors = "";

	if((document.myAcctMapping.deptNum.value == ""))		
			{ saveErrors += "      - Please enter department number\n";  errors++; }
	if((document.myAcctMapping.deptName.value == ""))		
			{ saveErrors += "      - Please enter department name\n";  errors++; }
	if((document.myAcctMapping.acctNum.value == ""))		
			{ saveErrors += "      - Please enter account number\n";  errors++; }
	if((document.myAcctMapping.GLNum.value == ""))		
			{ saveErrors += "      - Please enter GL number\n";  errors++; }

	if (saveErrors != "") {
			msg += "\n   - Missing Data:\n" + saveErrors;
	    	alert(msg);
			return false;
	}

}

function delMapping(id,dept) {
var agree=confirm("Are you sure you wish to delete " + dept +" department?");
	if (agree){
	/*document.myAcctMapping.Action.value = "D";
	document.myAcctMapping.DelAcct.value = id;
	document.myAcctMapping.submit();*/
	window.location="acctmapping_action.html?DelDept="+id;	
	}
	else{
		return false;
		
	}
}
<!--//end check all mapping add/delete requirements

<!--//start check all cutback add/delete requirements
function addCutBackCHK() {
var errors = 0;
var msg = "The following requirements have not been met:\n";
var saveErrors = "";

	if((document.myCutBack.deptNum.value == ""))		
			{ saveErrors += "      - Please enter department number\n";  errors++; }
	if((document.myCutBack.deptName.value == ""))		
			{ saveErrors += "      - Please enter department name\n";  errors++; }
	if((document.myCutBack.cutbackpct.value == ""))		
			{ saveErrors += "      - Please enter the cutback pct\n";  errors++; }
	
	if (saveErrors != "") {
			msg += "\n   - Missing Data:\n" + saveErrors;
	    	alert(msg);
			return false;
	}
	
	document.myCutBack.Action.value = "Add";
	document.myCutBack.submit();
	
}

function delDept(id,dept) {
var agree=confirm("Are you sure you wish to delete " + dept +" department?");
	if (agree){
	/*document.myCutBacks.Action.value = "DelDept";
	document.myCutBacks.DelDept.value = id;
	document.myCutBacks.submit();*/
	window.location="cutbackpct_action.html?DelDept="+id;
	
	}
	else{
		return false;
		
	}
}

<!--//end check all cutback add/delete requirements

<!--//start exception add/delete requirements
function exceptionCHK() {
var errors = 0;
var msg = "The following requirements have not been met:\n";
var saveErrors = "";

	if((document.myAddException.DelstrNum.value == "")){
		if((document.myAddException.addstr.value.length != 4 || document.myAddException.addstr.value == ""))		
			{ saveErrors += "      - Please enter a 4 digit store number\n";  errors++; }
	}
	
	if (saveErrors != "") {
			msg += "\n   - Missing Data:\n" + saveErrors;
	    	alert(msg);
			return false;
}

}

function delException(str) {
var agree=confirm("Are you sure you wish to delete store " + str +"?");
	if (agree){
	document.myAddException.Action.value = "D";
	document.myAddException.DelstrNum.value = str;
	document.myAddException.submit();
		
	}
	else{
		return false;
		
	}
}
<!--//end exception add/delete requirements

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

<!--//Allow integers and decimal point & - sign start
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
	
	if((keyCode != 0 && keyCode != 8 && keyCode != 46 && keyCode != 48 && keyCode != 49 && keyCode != 50 && keyCode != 51 && keyCode != 52 && keyCode != 53 && keyCode != 54 && keyCode != 55 && keyCode != 56 && keyCode != 57 && keyCode != 45 && keyCode != 109 && keyCode != 189)){ // Allow only integers
		alert("Only numbers and decimal point allowed");
		return false
	}

	return true
}

<!--//Allow integers and decimal point end

<!--//Allow integers and decimal point start
function keyCheck3(eventObj, obj)
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
	
	if((keyCode != 0 && keyCode != 8 && keyCode != 46 && keyCode != 48 && keyCode != 49 && keyCode != 50 && keyCode != 51 && keyCode != 52 && keyCode != 53 && keyCode != 54 && keyCode != 55 && keyCode != 56 && keyCode != 57 && keyCode)){ // Allow only integers
		alert("Only numbers and decimal point allowed");
		return false
	}

	return true
}

<!--//Allow integers and decimal point end

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

//-->