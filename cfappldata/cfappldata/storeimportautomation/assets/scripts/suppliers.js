<!--//
<!---CFN DROP DOWNS--->
var http_request = false;

myForm = " ";
function ChangeSupplier(iType, iValue, iform) {
  var suppliername = document.forms[iform].suppliername.value;
  var suppsitenum = document.forms[iform].suppsitenum.value;
  var division = document.forms[iform].division.value;
  var location = document.forms[iform].location.value;
  myForm = iform;

  var suppliername = suppliername.replace( "&", "~Z~" );
  var suppsitenum = suppsitenum.replace( "&", "~Z~" );
  var division = division.replace( "&", "~Z~" );
  var location = location.replace( "&", "~Z~" );

  //if (suppliername && suppsitenum && division) {
	  var strVars = "";
	  
	  switch (iType) {
	  	case "supname":
			strVars = "org_field_id=" + suppliername//suppliername.options[suppliername.selectedIndex].value;
			break;
			
		case "supsitenum":
			strVars = "org_field_id=" + suppliername +
						"&branch_field_id=" + suppsitenum;
			break;
			
		case "opco":
			strVars = "org_field_id=" + suppliername +
						"&branch_field_id=" + suppsitenum +
						"&group_field_id=" + division;
			break;
		
		case "loc":
			strVars = "org_field_id=" + suppliername +
						"&branch_field_id=" + suppsitenum +
						"&group_field_id=" + division;
						"&loc_field_id=" + location;
			break;
	  }
  
	  if (window.XMLHttpRequest) { // Mozilla, Safari,...
		 http_request = new XMLHttpRequest();
		 if (http_request.overrideMimeType) {
			// set type accordingly to anticipated content type
			//reqProxy.overrideMimeType('text/xml');
			http_request.overrideMimeType('text/html');
		 }
	  } else if (window.ActiveXObject) { // IE
		 try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		 } catch (e) {
			try {
			   http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		 }
	  }
	  if (!http_request) {
		 alert('Cannot create XMLHTTP instance');
		 return false;
	  }
	
	  waitDialog(true);

	  http_request.open('POST', '/cfappldata/tradingpm/assets/webservices/suppliers.cfm', true);
	
	 // Send the proper header information along with the request
	  http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	  http_request.setRequestHeader("Content-length", strVars.length);
	  http_request.setRequestHeader("Connection", "close");

	  http_request.onreadystatechange = ShowOrganization;
	  http_request.send(strVars);
  //}
}

function ShowOrganization() {
	if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			var jsonResult = eval("(" + jsonFix(http_request.responseText) + ")");			
			var divData = document.getElementById("divData");			
			
			if (jsonResult.field_type)
				switch (jsonResult.field_type) {
					case "supsitenum":
						var suppsitenum = document.forms[myForm].suppsitenum;
						var division = document.forms[myForm].division;
						
						if (divData) divData.style.display = "none";
						
						if (suppsitenum)
							for (var i = suppsitenum.options.length - 1; i >= 0; i--) {
								suppsitenum.remove(i);
							}
							for (var i = 0; i < jsonResult.field.length; i++) {
								var optFld = document.createElement("OPTION");
								optFld.text = jsonResult.field[i].field_name;
								optFld.value = jsonResult.field[i].field_id;
								suppsitenum.options.add(optFld);
							}

						var division = document.forms[myForm].division;
						
						if (division)
							for (var i = division.options.length - 1; i >= 0; i--) {
								division.remove(i);
							}
						break;
					
					case "division":
						var division = document.forms[myForm].division;

						if (divData) divData.style.display = "none";
						
						if (division)
							for (var i = division.options.length - 1; i >= 0; i--) {
								division.remove(i);
							}
							for (var i = 0; i < jsonResult.field.length; i++) {
								var optFld = document.createElement("OPTION");
								optFld.text = jsonResult.field[i].field_name;
								optFld.value = jsonResult.field[i].field_id;
								division.options.add(optFld);
							}
						break;
						
					case "location":
						var location = document.forms[myForm].location;

						if (divData) divData.style.display = "none";
						
						if (location)
							for (var i = location.options.length - 1; i >= 0; i--) {
								location.remove(i);
							}
							for (var i = 0; i < jsonResult.field.length; i++) {
								var optFld = document.createElement("OPTION");
								optFld.text = jsonResult.field[i].field_name;
								optFld.value = jsonResult.field[i].field_id;
								location.options.add(optFld);
							}
						break;
						
					/*case "itm":
						var tblData = document.getElementById("tblData");
						
						if (divData) {
							if (jsonResult.field.length > 0) divData.style.display = "block";
							else divData.style.display = "none";
						}
						
						if (tblData)
							var objBody = tblData.getElementsByTagName("TBODY")[0];
							var rowTemplate = document.createElement("TR");
							var tdTemplate = document.createElement("TD");
							
							var row = null;
							var td = null;
							
							for (var i = objBody.childNodes.length - 1; i >= 0; i--) {
								objBody.removeChild(objBody.childNodes[i]);
							}
							for (var i = 0; i < jsonResult.field.length; i++) {
								row = rowTemplate.cloneNode(false);
								
								td = tdTemplate.cloneNode(false);
								td.setAttribute("class", "colFirst center");		// Moz
								td.setAttribute("className", "colFirst center");	// IE
								td.innerHTML = "<a href='item_detail.html?itm_id=" + jsonResult.field[i].itm_id +
												"' target=_blank>" + jsonResult.field[i].itm_id + "</a>";
								row.appendChild(td);
							
								td = tdTemplate.cloneNode(false);
								if (jsonResult.field[i].brand_desc == "") {
									td.innerHTML = jsonResult.field[i].host_brand;
									td.setAttribute("class", "spnError");		// Moz
									td.setAttribute("className", "spnError");	// IE
								}
								else 
									td.innerHTML = jsonResult.field[i].brand_desc;
								row.appendChild(td);
							
								td = tdTemplate.cloneNode(false);
								if (jsonResult.field[i].description == "") {
									td.innerHTML = jsonResult.field[i].host_desc;
									td.setAttribute("class", "spnError");		// Moz
									td.setAttribute("className", "spnError");	// IE
								}
								else
									td.innerHTML = jsonResult.field[i].description;
								row.appendChild(td);

								td = tdTemplate.cloneNode(false);
								td.innerHTML = jsonResult.field[i].description_ext;
								row.appendChild(td);
														
								td = tdTemplate.cloneNode(false);
								td.setAttribute("class", "colLast");		// Moz
								td.setAttribute("className", "colLast");	// IE
								td.innerHTML = jsonResult.field[i].cfn_size;
								row.appendChild(td);
																						
								objBody.appendChild(row);
							}
						break;*/
				}
		} else {
			alert("HTTP Error: "  + http_request.status);
		}
		
	    waitDialog(false);
	}	
}
<!---END CFN DROP DOWNS--->
//  End -->
//-->