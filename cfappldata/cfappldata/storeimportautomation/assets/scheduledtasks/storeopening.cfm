
<cftry>
    <cfquery name="storeOpenData" datasource="#application.datasources.appDbUW#">
    SELECT f_storenum, f_busopendate, f_busclosedate
    FROM wmf.tbl_store
    WHERE f_busopendate = <cfqueryparam value="#DateFormat(Dateadd('d', '+14', now()), "DD-MMM-YY")#" cfsqltype="cf_sql_varchar" />
    order by f_storenum            
    </cfquery>
<cfcatch type="all">
    Error in storeWMFData<cfabort>
</cfcatch>
</cftry>

<cfdump var="#storeOpenData#">
<cfabort>

<cfif IsDefined("storeOpenData.recordcount") AND storeOpenData.recordcount GTE '1'>
	<cfoutput query="storeOpenData">
        <cfquery name="storeOpenData" datasource="#application.datasources.appDbUW#">
        UPDATE wmf.tbl_sia_storeinfo
        SET	f_flagged = <cfqueryparam value="Y" cfsqltype="cf_sql_char" maxlength="1">,
        f_flagdate = <cfqueryparam value="#CreateODBCDateTime(now())#" cfsqltype="cf_sql_timestamp">,
        f_storeopendate = <cfqueryparam value="#CreateODBCDateTime(now())#" cfsqltype="cf_sql_timestamp">,
        f_recordtype = <cfqueryparam value="AS" cfsqltype="cf_sql_char" maxlength="2">,
        f_storeopen =  <cfqueryparam value="Y" cfsqltype="cf_sql_char" maxlength="2">
        WHERE f_storenum = <cfqueryparam value="#storeOpenData.f_storenum#" cfsqltype="cf_sql_varchar" />
        </cfquery>
    </cfoutput>
</cfif>

<cfmail to="gerald.durham@aholdusa.com" 
from="gerald.durham@aholdusa.com"
subject="store opening task" type="html">
completed
</cfmail>

result=success 