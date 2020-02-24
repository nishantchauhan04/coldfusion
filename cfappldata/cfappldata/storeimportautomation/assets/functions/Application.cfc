<!--- Extend main Application.CFC sessions --->

<cfcomponent extends="/cfappldata/storeimportautomation/Application">

	<cffunction name="onRequestStart">
       <cfif NOT IsDefined("session.user.tamid")>
           <cflocation url="../index.html">
       </cfif>
	
    	<cfreturn True>
	</cffunction>
    
    <cffunction name="onRequesteND">

	</cffunction>
</cfcomponent>