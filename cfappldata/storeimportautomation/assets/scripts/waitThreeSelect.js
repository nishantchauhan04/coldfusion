function onLoad() {
	if (window.XMLHttpRequest == null) { // IE6
		var divWait = document.getElementById("divWait");
		if (divWait)
			divWait.style.position = "absolute";
		
		var ifWait = document.getElementById("ifWait");
		if (ifWait)
			ifWait.style.position = "absolute";
		
		var divBatch = document.getElementById("divBatch");
		if (divBatch)
			divBatch.style.position = "absolute";
	}
}

window.onscroll = scroll;

function scroll() {
	
	try {	// quick and dirty IE6 postion:fixed workaround...
		var divWait = document.getElementById("divWait");
		if (divWait)
			divWait.style.top = document.documentElement.scrollTop + 100 + "px";

		var ifWait = document.getElementById("ifWait");
		if (ifWait)
			ifWait.style.top = document.documentElement.scrollTop + 100 + "px";

		var divBatch = document.getElementById("divBatch");
		if (divBatch)
			divBatch.style.top = document.documentElement.scrollTop + 100 + "px";
	} catch (e) {
	}
	
/*	
	try { 	// keep header row and buttons on the screen...
		var tblData = document.getElementById("tblData");
		var divActionButtons = document.getElementById("divActionButtons");
		var intOffset = divActionButtons.offsetTop;

	
		if (navigator.userAgent.toLowerCase().indexOf("msie") != -1) { // IE
			var arrTh = document.getElementsByTagName("TH");
			if (document.documentElement.scrollTop > intOffset) {			
				divActionButtons.style.top = document.documentElement.scrollTop - divActionButtons.offsetHeight + "px";
				
				for (var i = 0; i < arrTh.length; i++) {
					arrTh[i].style.top = document.documentElement.scrollTop - divActionButtons.offsetHeight + "px";
				}
			} else {
				divActionButtons.style.top = "-1px";

				for (var i = 0; i < arrTh.length; i++) {
					arrTh[i].style.top = "-1px";
				}
			}
		} else {			// non-IE
			var arrDiv = document.getElementsByTagName("DIV");
			
			if (document.documentElement.scrollTop > intOffset) {			
				divActionButtons.style.top = document.documentElement.scrollTop - divActionButtons.offsetHeight + "px";

				for (var i = 0; i < arrDiv.length; i++) {
					if (arrDiv[i].className == "divHdr") {
						arrDiv[i].style.position = "absolute";
						arrDiv[i].style.top = document.documentElement.scrollTop + divActionButtons.offsetHeight + 5 + "px";
						arrDiv[i].style.display = "block";
					}
				}
			} else {
				divActionButtons.style.top = "-1px";

				for (var i = 0; i < arrDiv.length; i++) {
					if (arrDiv[i].className == "divHdr") {
						arrDiv[i].style.position = "relative";
						arrDiv[i].style.top = "-1px";
						arrDiv[i].style.display = "none";
					}
				}
			}
		}
	} catch (e) {
	}
*/	
}


function waitDialog(iSwitch) {
	var elemWait1 = document.getElementById("divWait");
	var elemWait2 = document.getElementById("ifWait");
	var elemBlur = document.getElementById("divBlur");
	
	if (elemBlur)
		if (iSwitch)
			elemBlur.style.display = "block";				
		else
			elemBlur.style.display = "none";				
	
	if (elemWait1) 
		if (iSwitch)
			elemWait1.style.display = "block";
		else
			elemWait1.style.display = "none";

	if (elemWait2) 
		if (iSwitch)
			elemWait2.style.display = "block";
		else
			elemWait2.style.display = "none";
}


