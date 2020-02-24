<cfcomponent> 
	
	<cfset this.name = "storeimportautomation">
    <cfset this.Sessionmanagement = "True">
    <cfset RealTime = #CreateODBCDateTime(Now())#>
    <cfset truetime = "#DateFormat(RealTime, "YYYY-MM-DD")# #TimeFormat(RealTime, "HH:MM:SS")#">

    
            <html>
            <head>
            <title>Ahold USA Store Import Automation<cfif IsDefined("pageName")><cfoutput> - #pageName#</cfoutput></cfif></title>
            <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
            <basefont face="Verdana, Arial, Helvetica, sans-serif">
            
			
           
            <cfif IsDefined("session.user.securityLVL") AND session.user.securityLVL EQ "denied">            
                <table width="100%" align="center" class="cube" border=0 cellspacing=0 cellpadding=2>
                    
                    <tr>
                    <td height="25" class="fieldheading2" align="center" valign="middle">
                        <div class="errormsg" style="font-size:24px; color:#FF0000;"><img src="assets/images/denied.jpg" align="absmiddle">&nbsp;&nbsp;&nbsp;Access Denied!</div>
                        <br />
                        <div class="fielderror" style="font-size:14px; font-weight:bold; margin-left:10px;">
                        You currently do not have access to the Store Import Automation Web Application<cfabort>
                        <br /><br />       
                    </td>
                    </tr>    
                </table>
            </cfif>
            
            <link rel="stylesheet" type="text/css" href="assets/styles/default.css">
                    <link rel="stylesheet" type="text/css" href="assets/styles/menu.css">        
                    <link rel="stylesheet" type="text/css" href="assets/styles/toolbar.css">
					
  
            </head>
            
            <body <cfif IsDefined("bodyOnLoadJs")>onLoad="<cfoutput>#bodyOnLoadJs#</cfoutput>"</cfif>>
			            <cfif NOT IsDefined("hideHeader")>
                <div id="header" style="width:91%">
                    <cfif IsDefined("altPathAdmin") AND altPathAdmin EQ "Y">
                        <div id="logo"><a href="../welcome.html"><img src="../assets/images/storeimportautomation.gif" align="middle" alt="Store Import Automation" border="0"></a></div>
                    <cfelse>
                        <div id="logo"><a href="welcome.html"><img src="assets/images/storeimportautomation.gif" align="middle" alt="Store Import Automation" border="0"></a></div>
                    </cfif>
                    <cfif IsDefined("session.user")>
                    <cfif NOT IsDefined("hideAllMenus")>
                        <div id="loggedinuser"><cfoutput>Logged in as: #session.user.firstName# <!---#session.user.middleInit#---> #session.user.lastName#</cfoutput>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        </cfif>
                    </cfif>
                </div>
            </cfif>
			<div id="header" style="width:91%">
			<div id="loggedinuser"><cfoutput>Logged in as: Vibhor <!---#session.user.middleInit#---> Bhatnagar</cfoutput>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
			</div>
            <div style="padding: 2px 2px 2px 2px;">

            <cfif NOT IsDefined("hideAllMenusExcel")>
                <cfif IsDefined("adminMenu") AND adminMenu EQ "admin">
                    <cfinclude template="assets/includes/adminmenu.html">
                <cfelseif IsDefined("altPathAdmin") AND altPathAdmin EQ "Y">
                        <cfinclude template="assets/includes/dirappmenu.html">
                <cfelseif IsDefined("adminMenu") AND adminMenu EQ "reports">
                        <cfinclude template="assets/includes/reportsmenu.html">
                <cfelseif NOT IsDefined("hideAllMenus")>
                        <cfinclude template="assets/includes/menu.html">
                </cfif>
            </cfif>
            </div>

            </body>
            </html>
        <!--- End page request actions --->
    
	<!---</cfif>--->
</cfcomponent>
