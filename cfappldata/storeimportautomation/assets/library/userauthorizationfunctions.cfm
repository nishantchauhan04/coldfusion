<cffunction name="GetUserAuthorization" returntype="struct">
	<cfargument name="tamUserId" required="yes" type="string">
	<cfargument name="tamOpco" required="yes" type="string">
	<cfargument name="tamGroups" required="yes" type="string">

	<cfset var userAuth = StructNew()>
	<cfset var userInfo = "">
 
	<!--- Set user ID --->
	<cfset userAuth.tamId = arguments.tamUserId>
	<cfset userAuth.verified = false>

	<!--- Set opco information --->
	<cfset userAuth.opco = GetUserOpco(arguments.tamOpco, arguments.tamUserId)> 

	<!--- Set user group information --->
	<cfset userAuth.tamGroups = arguments.tamGroups>
	<cfset userAuth.appGroups = GetAppGroups(arguments.tamGroups)>
    <cfset userAuth.adminAccess = CheckAdminAccess(userAuth.appGroups)>
	<cfset userAuth.securityLVL = SecurityLVL(arguments.tamUserId)>
    <cfset userAuth.securityRole = securityRole>
	<cfif userAuth.securityLVL EQ "admin">
		<cfset userAuth.adminAccess = true>
    </cfif>
    
	<!--- Get user information --->
	<cfset userInfo = GetUserInformation(userAuth.tamId)>
	<cfloop list="#userInfo.columnList#" index="colNm">
		<cfset "userAuth.#colNm#" = Evaluate("userInfo." & colNm)>
	</cfloop>

	<!--- Check for store user --->
	<cfif ListFindNoCase(arguments.tamGroups, "portal_giantc_store") GT 0>
		<cfset userAuth.isStoreUser = true>
	</cfif>
	
	<!--- Check if user has subordinates 
	<cfset userAuth.hassubordinates = UserHasSubordinates(userAuth.globalId)>--->
	<cfreturn userAuth>
</cffunction>


<cffunction name="GetUserOpco" returntype="string">
	<cfargument name="tamOpco" required="yes" type="string">
	<cfargument name="tamUserId" required="yes" type="string">

	<cfset var userOpco = "">

	<cfif arguments.tamOpco NEQ "NOT_FOUND">
		<cfif Left(arguments.tamOpco, 1) EQ "G" OR Left(arguments.tamOpco, 3) EQ "AFS">
			<cfset userOpco = "GC">
		<cfelseif Left(arguments.tamOpco, 1) EQ "S">
			<cfset userOpco = "NS">	
		</cfif>
	<cfelse>
		<cfif UCase(Left(arguments.tamUserId, 1)) EQ "G" OR UCase(Left(arguments.tamUserId, 1)) EQ "X">
			<cfset userOpco = "GC">
		<cfelseif UCase(Left(arguments.tamUserId, 1)) EQ "S">
			<cfset userOpco = "NS">
		</cfif>
	</cfif>	

	<cfreturn userOpco>
</cffunction>

<cffunction name="GetAppGroups" returntype="string">
	<cfargument name="tamGroups" required="yes" type="string">
	<cfset var appGroups = "">

	<cfif ListContainsNoCase(arguments.tamGroups, "giantcwebdev_admin")>
		<cfset appGroups = ListAppend(appGroups, "giantcwebdev_admin")>
	</cfif>

	<cfreturn appGroups>
</cffunction>

<cffunction name="CheckAdminAccess" returntype="boolean">
	<cfargument name="userGroups" required="yes" type="string">

	<cfset var adminAccess = false>

	<!--- Check admin access --->
	<cfif ListContainsNoCase(http_iv_groups, "giantcwebdev_admin")>
		<cfset adminAccess = true>
	</cfif>

	<cfreturn adminAccess>
</cffunction>


<cffunction name="SecurityLVL" returntype="string">
	<cfargument name="tamUserId" required="yes" type="string">
	
    <cfquery name="getSecurityLVLdata" datasource="unitedway">
    SELECT F_SecurityLVL, F_SecurityRole
    FROM tad.tbl_sse_admins
    WHERE UPPER(f_tamid) = <cfqueryparam value="#UCASE(arguments.tamUserId)#" cfsqltype="cf_sql_varchar">
    </cfquery>

	<cfset securityLVL = getSecurityLVLdata.F_SecurityLVL>
    <cfset securityRole = getSecurityLVLdata.F_SecurityRole>
    
    <cfreturn securityLVL>
</cffunction>

<cffunction name="GetUserInformation" returntype="query">
	<cfargument name="userId" required="yes" type="string">

	<cfset var userInfo = QueryNew("")>	
        
	<!--- Get user information from application database --->
	<cfquery name="userInfo" datasource="AholdSyncDb" maxrows="1">
	SELECT globalId, userid as tamId, firstName, middlename as middleInit, lastName, store as storeNum, department as deptNum, jobCode
	FROM _sync_user
	WHERE UPPER(userId) = '#UCase(arguments.userId)#'
	</cfquery>

	<cfreturn userInfo>
</cffunction>

<cffunction name="logInAsAnotherUser" returntype="void">
	<cfargument name="tamId" required="yes" type="string">
	<cfset var userOpco = "">
	<cfset var userLdapGroups = "">
	<cfset var assumedUser = "">

	<!--- Get OPCO information from LDAP --->
	<cfldap action="query" server="ldap.aholdusa.com" name="ldapUserInfo" start="ou=us,o=ahold" filter="cn=#arguments.tamId#" attributes="opco,storenum">
	<cfset userOpco = ldapUserInfo.opco>

	<!--- Get group memberships from LDAP --->
	<cfldap action="query" server="ldap.aholdusa.com" name="ldapUserGroups" start="ou=groups,o=ahold" filter="member=cn=#arguments.tamId#*" attributes="cn">
	<cfloop query="ldapUserGroups">
		<cfset userLdapGroups = ListAppend(userLdapGroups, cn)>
	</cfloop>

	
	<!--- Create new user struct --->
	<cfset assumedUser = GetUserAuthorization(arguments.tamId, userOpco, userLdapGroups)>

	<cfif NOT IsDefined("assumedUser.storenum")>
		<cfset assumedUser.storenum = ldapUserInfo.storenum>
	</cfif>

	<!--- Keep original user info --->
	<cfset session.origuser = session.user>

	<!--- Log in as selected user --->
	<cfset session.user = assumedUser>
</cffunction>

<cffunction name="logOutAsAnotherUser">
	<cfif IsDefined("session.origuser")>
		<!--- Copy the original user data into the current user session variable --->
		<cfset session.user = session.origuser>	
		<cfset session.user.verified = false>

		<!--- Destroy temp session variable --->
		<cfset StructDelete(session, "origuser")>
	</cfif>	
</cffunction>