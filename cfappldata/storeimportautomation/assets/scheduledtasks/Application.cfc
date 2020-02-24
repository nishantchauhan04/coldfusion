<cfcomponent extends="/cfappldata/storeimportautomation/Application">
    <cffunction name="onRequestStart"> 
       <cfargument name="requestedPage" required="yes" type="string">             
       <cfset StructDelete(THIS, "OnRequest")> 
    
       <cfreturn true>      
    </cffunction> 
    
    <!---<cffunction name="onRequestEnd" returntype="void" output="yes"> 
       <cfargument name="requestedPage" required="yes" /> 
        
    </cffunction>--->  
    
    <cffunction name="onSessionStart"> 
       <cfset StructDelete(THIS, "onSessionStart")>  
         
       <cfreturn true>      
    </cffunction>
</cfcomponent>