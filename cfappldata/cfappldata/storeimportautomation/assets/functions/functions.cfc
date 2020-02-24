<cfcomponent>
    <!---SYNC USER LOOKUP--->
    <cffunction name="GetUserInformation" returntype="query">
        <cfargument name="argTamID" required="yes" type="string">
        <cfargument name="argGlobalID" required="yes" type="string">
       
        <cftry>
            <cfquery name="GetUserInformationData" datasource="AholdSyncDb" maxrows="1">
            SELECT globalId, userid as tamId, firstName, middlename as middleInit, lastName, store as storeNum, department as deptNum, jobCode
            FROM _sync_user
            <cfif IsDefined("arguments.argTamID") AND arguments.argTamID NEQ "">
            	WHERE UPPER(userId) = <cfqueryparam value="#UCase(arguments.argTamID)#" cfsqltype="cf_sql_varchar" maxlength="10">
            	<cfif IsDefined("arguments.argGlobalID") AND arguments.argGlobalID NEQ "">
                	AND UPPER(globalid) = <cfqueryparam value="#UCase(arguments.argGlobalID)#" cfsqltype="cf_sql_varchar" maxlength="16">
                </cfif>
			</cfif>
            </cfquery>
    	<cfcatch type="all">
            Error in GetUserInformationData<cfabort>
        </cfcatch>
        </cftry>
        
        <cfreturn GetUserInformationData>
    </cffunction>

	<!---STORE MID TABLE--->
    <cffunction name="storeMid" returntype="query">
    	<cfargument name="storenum" required="no" type="string">
        <cfargument name="division" required="no" type="string">
                        
        <cftry>
           	<cfquery name="storeMidData" datasource="unitedway">
            select f_storenum, f_division, f_fuel, f_storename
            from UNITEDWAY."tbl_sia_storeinfo"
            <cfif IsDefined("arguments.storenum") AND arguments.storenum NEQ "">
             where f_storenum = <cfqueryparam value="#arguments.storenum#" cfsqltype="cf_sql_varchar" maxlength="4" />
            </cfif>
            order by f_storenum            
            </cfquery>
        <cfcatch type="all">
            Error in storeMidData<cfabort>
        </cfcatch>
        </cftry>
        
        <cfreturn storeMidData>
    </cffunction>
    
    <!---STORE POS CARDTYPE DATA TABLE--->
    <cffunction name="storePosCardType" returntype="query">
    	<cfargument name="storenum" required="no" type="string">
        <cfargument name="merchtype" required="no" type="string">
        <cfargument name="cardcode" required="no" type="string">
        <cfargument name="allcards" required="no" type="string">
                        
        <cftry>
           	<cfquery name="storePosCardTypeData" datasource="unitedway">
            SELECT f_storenum, f_merchtype, f_cardcode, f_merchid1, f_merchid2, f_date, f_cardtype
            FROM UNITEDWAY."tbl_sia_cardtype_data"
            WHERE 0=0
            <cfif NOT IsDefined("arguments.allcards")>
            	AND f_cardtype != <cfqueryparam value="DC" cfsqltype="cf_sql_varchar" maxlength="2" />
            </cfif>
			<cfif IsDefined("arguments.storenum") AND arguments.storenum NEQ "">
             	AND f_storenum = <cfqueryparam value="#arguments.storenum#" cfsqltype="cf_sql_varchar" maxlength="4" />
            </cfif>
            <cfif IsDefined("arguments.merchtype") AND arguments.merchtype NEQ "">
             	AND f_merchtype = <cfqueryparam value="#arguments.merchtype#" cfsqltype="cf_sql_varchar" maxlength="4" />
            </cfif>
            <cfif IsDefined("arguments.cardcode") AND arguments.cardcode NEQ "">
             	AND f_cardcode IN(<cfqueryparam value="#arguments.cardcode#" cfsqltype="cf_sql_varchar" list="yes">)
            </cfif>
            order by f_storenum, f_merchtype, f_cardcode           
            </cfquery>
        <cfcatch type="all">
            Error in storePosCardTypeData<cfabort>
        </cfcatch>
        </cftry>
        
        <cfreturn storePosCardTypeData>
    </cffunction>
    
    <!---MERCHTYPE SUPPORT DATA TABLE--->
    <cffunction name="supportData" returntype="query">
    	<cfargument name="merchtypedesc" required="no" type="string">
                        
        <cftry>
           	<cfquery name="supportDataCodes" datasource="unitedway">
            SELECT f_merchtypedesc, f_merchtype, f_cardcodes
            FROM UNITEDWAY."tbl_sia_supportdata"
            WHERE 0=0
			<cfif IsDefined("arguments.merchtypedesc") AND arguments.merchtypedesc NEQ "">
             	AND f_merchtypedesc = <cfqueryparam value="#arguments.merchtypedesc#" cfsqltype="cf_sql_varchar" maxlength="4" />
            </cfif>
            order by f_merchtypedesc         
            </cfquery>
        <cfcatch type="all">
            Error in supportDataCodes<cfabort>
        </cfcatch>
        </cftry>
        
        <cfreturn supportDataCodes>
    </cffunction>
    
    
    <!---STORE unitedway TABLE--->
    <cffunction name="storeWMF" returntype="query">
    	<cfargument name="storenum" required="no" type="string">
        <cfargument name="division" required="no" type="string">
                        
        <cftry>
           	<cfquery name="storeunitedwayData" datasource="unitedway">
            SELECT f_storenum, f_storeaddress, f_storeaddress2, f_storecity, f_storestate, f_storezip, f_storezip2, f_storeregion, 
            f_storedistrict, f_busopendate, f_busclosedate
            FROM UNITEDWAY."tbl_store"
            WHERE f_storestatus != <cfqueryparam value="Z" cfsqltype="cf_sql_varchar" maxlength="1" />
            <cfif IsDefined("arguments.storenum") AND arguments.storenum NEQ "">
             	AND f_storenum = <cfqueryparam value="#Right(RepeatString('0', 4) & arguments.storenum, 4)#" cfsqltype="cf_sql_varchar" maxlength="4" />
            </cfif>
            order by f_storenum            
            </cfquery>
        <cfcatch type="all">
            Error in storeunitedwayData<cfabort>
        </cfcatch>
        </cftry>
        
        <cfreturn storeunitedwayData>
    </cffunction>
    
    <!---STORE PHONE TABLE--->
    <cffunction name="storePhone" returntype="query">
    	<cfargument name="storenum" required="no" type="string">
                        
        <cftry>
           	<cfquery name="storePhoneData" datasource="unitedway">
            SELECT f_phonenum
            FROM UNITEDWAY."tbl_store_detailinfo"
            WHERE f_specialdeptkey = <cfqueryparam value="000" cfsqltype="cf_sql_varchar" maxlength="3" />
            <cfif IsDefined("arguments.storenum") AND arguments.storenum NEQ "">
            	AND f_storenum = <cfqueryparam value="#Right(RepeatString('0', 4) & arguments.storenum, 4)#" cfsqltype="cf_sql_varchar" maxlength="4" />
            </cfif>
            order by f_storenum            
            </cfquery>
        <cfcatch type="all">
            Error in storePhoneData<cfabort>
        </cfcatch>
        </cftry>
        
        <cfreturn storePhoneData>
    </cffunction>
              
    <!---Store Divisions--->
    <cffunction name="storeDiv" returntype="query">
    	<cfargument name="division" required="no" type="string">
        <cfargument name="divisioncode" required="no" type="string">
                        
        <cftry>
           	<cfquery name="storeDivData" datasource="unitedway">
            select f_division, f_divisioncode, f_divisionname, f_friendlyname
            from UNITEDWAY."tbl_sia_divisions"
            where 0=0
            <cfif IsDefined("arguments.division") AND arguments.division NEQ "">
            	AND UPPER(f_division) = <cfqueryparam value="#UCASE(arguments.division)#" cfsqltype="cf_sql_varchar" maxlength="4" />
            </cfif>
            <cfif IsDefined("arguments.divisioncode") AND arguments.divisioncode NEQ "">
            	AND f_divisioncode = <cfqueryparam value="#UCASE(arguments.divisioncode)#" cfsqltype="cf_sql_varchar" maxlength="1" />
            </cfif> 
            order by f_divisionname            
            </cfquery>
        <cfcatch type="all">
            Error in storeDivData<cfabort>
        </cfcatch>
        </cftry>
                
        <cfreturn storeDivData>
    </cffunction>
    
    <!---Store Divisions--->
    <cffunction name="cardCodeDefaults" returntype="query">
    	<cfargument name="merchtype" required="no" type="string">
    	<cfargument name="cardcode" required="no" type="string">
        <cfargument name="divisioncode" required="no" type="string">
                        
        <cftry>
           	<cfquery name="cardCodeDefaultsData" datasource="unitedway">
            SELECT f_merchtype, f_cardcode, f_merchid1, f_merchid2, f_divisioncode
            FROM UNITEDWAY."tbl_sia_cardcode_defaults"
            WHERE 0=0
            <cfif IsDefined("arguments.merchtype") AND arguments.merchtype NEQ "">
            	AND f_merchtype = <cfqueryparam value="#arguments.merchtype#" cfsqltype="cf_sql_varchar" maxlength="4" />
            </cfif>
            <cfif IsDefined("arguments.cardcode") AND arguments.cardcode NEQ "">
            	AND f_cardcode = <cfqueryparam value="#arguments.cardcode#" cfsqltype="cf_sql_varchar" maxlength="4" />
            </cfif>
            <cfif IsDefined("arguments.divisioncode") AND arguments.divisioncode NEQ "">
            	AND f_divisioncode = <cfqueryparam value="#UCASE(arguments.divisioncode)#" cfsqltype="cf_sql_varchar" maxlength="1" />
            </cfif> 
            order by f_cardcode, f_divisioncode            
            </cfquery>
        <cfcatch type="all">
            Error in cardCodeDefaultsData<cfabort>
        </cfcatch>
        </cftry>
        
        <cfreturn cardCodeDefaultsData>
    </cffunction>
    
    <!---Form Fields--->
    <cffunction name="formFields" returntype="query">
    	<cfargument name="merchtype" required="no" type="string">
    	               
        <cftry>
           	<cfquery name="formFieldsData" datasource="unitedway">
            SELECT f_prikey, f_fieldname_org, f_fieldname, f_fieldname2, f_cardcode, f_merchtype
            FROM UNITEDWAY."tbl_sia_formfields"
            <cfif IsDefined("arguments.merchtype") AND arguments.merchtype NEQ "">
            	WHERE f_merchtype = <cfqueryparam value="#TRIM(arguments.merchtype)#" cfsqltype="cf_sql_varchar" maxlength="4" />
            </cfif>
            ORDER BY f_prikey            
            </cfquery>
        <cfcatch type="all">
            Error in formFieldsData<cfabort>
        </cfcatch>
        </cftry>
        
        <cfreturn formFieldsData>
    </cffunction>
    
</cfcomponent>



