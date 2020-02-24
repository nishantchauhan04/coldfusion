<!--- Extend main Application.CFC sessions --->

<cfcomponent name="Application" extends="/cfappldata/storeimportautomation/ApplicationProxy">
    <cffunction name="onSessionStart">
    	<cfoutput><p>app.Application.onSessionStart()</p></cfoutput>
    	<cfset session.counter = 0 />
    </cffunction>
    <cffunction name="onRequestStart">
    	<!---<cfoutput><p>app.Application.onRequestStart()</p></cfoutput>--->
    	<cfif NOT IsDefined("session.user.tamid")>
           <cflocation url="../index.html">
       </cfif>
		<cfif IsDefined("session.user.securitylvl") AND (session.user.securitylvl EQ "admin")>
		<cfelse>
            <cflocation url="../index.html">
        </cfif>
    </cffunction>
</cfcomponent>
