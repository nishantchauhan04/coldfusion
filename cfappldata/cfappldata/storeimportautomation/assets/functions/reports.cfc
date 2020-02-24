<cfcomponent>		
    <!---Weekly Status Report--->
    <cffunction name="weeklyStatusInfo" returntype="query">                
        <cfargument name="argStartDate" required="yes" type="string">
        <cfargument name="argEndDate" required="yes" type="string">
        
        <cftry>
           	<cfquery name="weeklyStatusInfoData" datasource="#application.datasources.appDbUW#">
            SELECT f_storenum, f_notes, f_datetime, f_name
            FROM wmf.tbl_sia_logfile
            WHERE f_datetime >= <cfqueryparam value="#argStartDate#" cfsqltype="cf_sql_timestamp"> 
            AND f_datetime <= <cfqueryparam value="#DateFormat(argEndDate, "YYYY-MM-DD")# 23:59:59" cfsqltype="cf_sql_timestamp">
            ORDER BY F_notes, f_datetime
            </cfquery>
        <cfcatch type="all">
            Error in weeklyStatusInfoData<cfabort>
        </cfcatch>
        </cftry>
        
        <cfreturn weeklyStatusInfoData>
    </cffunction>
    
    <!---Store Monitoring Report--->
    <cffunction name="storeOpenInfo" returntype="query">
    	<cfargument name="argStartDate" required="yes" type="string">
        <cfargument name="argEndDate" required="yes" type="string">
                        
        <cftry>
           	<cfquery name="storeOpenInfoData" datasource="#application.datasources.appDbUW#">
            SELECT t1.f_storenum, t1.f_storeaddress, t1.f_storeaddress2, t1.f_storecity, t1.f_storestate, t1.f_storezip, t1.f_storezip2, t1.f_storeregion, 
            t1.f_storedistrict, t1.f_busopendate, t2.f_storeopendate, t2.f_storename
            FROM wmf.tbl_store t1 JOIN wmf.tbl_sia_storeinfo t2
            ON(t1.f_storenum = t2.f_storenum)
            WHERE t2.f_storeopendate >= <cfqueryparam value="#argStartDate#" cfsqltype="cf_sql_timestamp">
            AND t2.f_storeopendate <= <cfqueryparam value="#DateFormat(argEndDate, "YYYY-MM-DD")# 23:59:59" cfsqltype="cf_sql_timestamp">
            AND t2.f_storeopen = 'Y'
            order by f_storenum            
            </cfquery>
        <cfcatch type="all">
            Error in storeOpenInfoData<cfabort>
        </cfcatch>
        </cftry>
        
        <cfreturn storeOpenInfoData>
    </cffunction>
    
    <!---Merchant ID Report--->
    <cffunction name="storeNumberInfo" returntype="query">
    	<cfargument name="storenum" required="no" type="string">
        <cfargument name="allcards" required="no" type="string">
                        
        <cftry>
           	<cfquery name="storeNumberInfoData" datasource="#application.datasources.appDbUW#">
            SELECT f_storenum, f_merchtype, f_cardcode, f_merchid1, f_merchid2, f_date, f_cardtype
            FROM wmf.tbl_sia_cardtype_data            
            <cfif IsDefined("arguments.allcards")>
            	WHERE 0=0
            </cfif>
			<cfif IsDefined("arguments.storenum") AND arguments.storenum NEQ "">
             	WHERE f_storenum = <cfqueryparam value="#arguments.storenum#" cfsqltype="cf_sql_varchar" maxlength="4" />
            </cfif>
            order by f_storenum         
            </cfquery>
        <cfcatch type="all">
            Error in storeNumberInfoData<cfabort>
        </cfcatch>
        </cftry>
        
        <cfreturn storeNumberInfoData>
    </cffunction>
    
    <!---SUPPORT DATA TABLE--->
    <cffunction name="supportMerchantInfo" returntype="query">
    	<cfargument name="merchtype" required="yes" type="string">
                        
        <cftry>
           	<cfquery name="supportMerchantInfoData" datasource="#application.datasources.appDbUW#">
            SELECT f_merchtypedesc, f_cardcodes
            FROM wmf.tbl_sia_supportdata
            WHERE f_merchtype = <cfqueryparam value="#arguments.merchtype#" cfsqltype="cf_sql_varchar" maxlength="4" />
            ORDER BY f_merchtypedesc         
            </cfquery>
        <cfcatch type="all">
            Error in supportMerchantInfoData<cfabort>
        </cfcatch>
        </cftry>
        
        <cfreturn supportMerchantInfoData>
    </cffunction>
</cfcomponent>