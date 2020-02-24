<!--//
<!---DEPT/CATEGORY DROP DOWNS--->
var http_request = false;

myForm = " ";
function ChangeAuth(iType, iValue, iform) {
  var F_Department = document.forms[iform].F_Department.value;
  var F_Category = document.forms[iform].F_Category.value; 
  var F_SubDept = document.forms[iform].F_SubDept.value;
  myForm = iform;
  
  var F_Department = F_Department.replace(/&/g, "~Z~" );
  var F_Category = F_Category.replace(/&/g, "~Z~" );
  var F_SubDept = F_SubDept.replace(/&/g, "~Z~" );
  
  //if (F_Department && F_Category && F_SubDept) {
	  var strVars = "";
	  
	  switch (iType) {
	  	case "dept":
			strVars = "dept_field_id=" + F_Department//F_Department.options[F_Department.selectedIndex].value;
			break;
			
		case "category":
			strVars = "dept_field_id=" + F_Department +
						"&category_field_id=" + F_Category;
			break;
			
		case "subcat":
			strVars = "dept_field_id=" + F_Department +
						"&category_field_id=" + F_Category +
						"&subcat_field_id=" + F_SubDept;
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

	  http_request.open('POST', 'assets/webservices/departments.cfm', true);
	
	 // Send the proper header information along with the request
	  http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	  http_request.setRequestHeader("Content-length", strVars.length);
	  http_request.setRequestHeader("Connection", "close");

	  http_request.onreadystatechange = ShowAuth;
	  http_request.send(strVars);
  //}
}

function ShowAuth() {
	if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			var jsonResult = eval("(" + jsonFix(http_request.responseText) + ")");			
			var divData = document.getElementById("divData");			
			
			if (jsonResult.field_type)
				switch (jsonResult.field_type) {
					case "category":
						var F_Category = document.forms[myForm].F_Category;
						var F_SubDept = document.forms[myForm].F_SubDept;
						
						if (divData) divData.style.display = "none";
						
						if (F_Category)
							for (var i = F_Category.options.length - 1; i >= 0; i--) {
								F_Category.remove(i);
							}
							for (var i = 0; i < jsonResult.field.length; i++) {
								var optFld = document.createElement("OPTION");
								optFld.text = jsonResult.field[i].field_name;
								optFld.value = jsonResult.field[i].field_id;
								F_Category.options.add(optFld);
							}

						var F_SubDept = document.forms[myForm].F_SubDept;
						
						if (F_SubDept)
							for (var i = F_SubDept.options.length - 1; i >= 0; i--) {
								F_SubDept.remove(i);
							}
						break;
					
					case "subcat":
						var F_SubDept = document.forms[myForm].F_SubDept;

						if (divData) divData.style.display = "none";
						
						if (F_SubDept)
							for (var i = F_SubDept.options.length - 1; i >= 0; i--) {
								F_SubDept.remove(i);
							}
							for (var i = 0; i < jsonResult.field.length; i++) {
								var optFld = document.createElement("OPTION");
								optFld.text = jsonResult.field[i].field_name;
								optFld.value = jsonResult.field[i].field_id;
								F_SubDept.options.add(optFld);
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