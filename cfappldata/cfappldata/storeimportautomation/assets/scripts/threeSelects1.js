<!--//
<!---DEPT/CATEGORY DROP DOWNS--->
var http_request = false;

myForm = " ";
function ChangeAuth1(iType, iValue, iform) {
  var F_Department1 = document.forms[iform].F_Department1.value;
  var F_Category1 = document.forms[iform].F_Category1.value; 
  var F_SubDept1 = document.forms[iform].F_SubDept1.value;
  myForm = iform;
  
  var F_Department1 = F_Department1.replace(/&/g, "~Z~" );
  var F_Category1 = F_Category1.replace(/&/g, "~Z~" );
  var F_SubDept1 = F_SubDept1.replace(/&/g, "~Z~" );
  
  //if (F_Department1 && F_Category1 && F_SubDept1) {
	  var strVars = "";
	  
	  switch (iType) {
	  	case "dept1":
			strVars = "dept1_field_id=" + F_Department1//F_Department1.options[F_Department1.selectedIndex].value;
			break;
			
		case "category1":
			strVars = "dept1_field_id=" + F_Department1 +
						"&category1_field_id=" + F_Category1;
			break;
			
		case "subcat1":
			strVars = "dept1_field_id=" + F_Department1 +
						"&category1_field_id=" + F_Category1 +
						"&subcat1_field_id=" + F_SubDept1;
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

	  http_request.open('POST', 'assets/webservices/departments1.cfm', true);
	
	 // Send the proper header information along with the request
	  http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	  http_request.setRequestHeader("Content-length", strVars.length);
	  http_request.setRequestHeader("Connection", "close");

	  http_request.onreadystatechange = ShowAuth1;
	  http_request.send(strVars);
  //}
}

function ShowAuth1() {
	if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			var jsonResult = eval("(" + jsonFix(http_request.responseText) + ")");			
			var divData = document.getElementById("divData");			
			
			if (jsonResult.field_type)
				switch (jsonResult.field_type) {
					case "category1":
						var F_Category1 = document.forms[myForm].F_Category1;
						var F_SubDept1 = document.forms[myForm].F_SubDept1;
						
						if (divData) divData.style.display = "none";
						
						if (F_Category1)
							for (var i = F_Category1.options.length - 1; i >= 0; i--) {
								F_Category1.remove(i);
							}
							for (var i = 0; i < jsonResult.field.length; i++) {
								var optFld = document.createElement("OPTION");
								optFld.text = jsonResult.field[i].field_name;
								optFld.value = jsonResult.field[i].field_id;
								F_Category1.options.add(optFld);
							}

						var F_SubDept1 = document.forms[myForm].F_SubDept1;
						
						if (F_SubDept1)
							for (var i = F_SubDept1.options.length - 1; i >= 0; i--) {
								F_SubDept1.remove(i);
							}
						break;
					
					case "subcat1":
						var F_SubDept1 = document.forms[myForm].F_SubDept1;

						if (divData) divData.style.display = "none";
						
						if (F_SubDept1)
							for (var i = F_SubDept1.options.length - 1; i >= 0; i--) {
								F_SubDept1.remove(i);
							}
							for (var i = 0; i < jsonResult.field.length; i++) {
								var optFld = document.createElement("OPTION");
								optFld.text = jsonResult.field[i].field_name;
								optFld.value = jsonResult.field[i].field_id;
								F_SubDept1.options.add(optFld);
							}
						break;
					
					case "itm":
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
						break;
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