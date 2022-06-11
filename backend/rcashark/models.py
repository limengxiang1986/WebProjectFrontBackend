# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Mnapstatus(models.Model):
    apid = models.CharField(db_column='APID', primary_key=True, max_length=64)  # Field name made lowercase.
    prid = models.CharField(db_column='PRID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    apdescription = models.CharField(db_column='APDescription', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    apcreateddate = models.CharField(db_column='APCreatedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    apduedate = models.CharField(db_column='APDueDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    isapcompleted = models.CharField(db_column='IsApCompleted', max_length=64, blank=True, null=True)  # Field name made lowercase.
    apcompletedon = models.CharField(db_column='APCompletedOn', max_length=64, blank=True, null=True)  # Field name made lowercase.
    apassingnedto = models.CharField(db_column='APAssingnedTo', max_length=128, blank=True, null=True)  # Field name made lowercase.
    apcategory = models.CharField(db_column='ApCategory', max_length=32, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Mnapstatus'


class Apstatus(models.Model):
    apid = models.CharField(db_column='APID', primary_key=True, max_length=64)  # Field name made lowercase.
    prid = models.CharField(db_column='PRID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    apdescription = models.CharField(db_column='APDescription', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    apcreateddate = models.CharField(db_column='APCreatedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    apduedate = models.CharField(db_column='APDueDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    apcompletedon = models.CharField(db_column='APCompletedOn', max_length=64, blank=True, null=True)  # Field name made lowercase.
    isapcompleted = models.CharField(db_column='IsApCompleted', max_length=32, blank=True, null=True)  # Field name made lowercase.
    apassingnedto = models.CharField(db_column='APAssingnedTo', max_length=128, blank=True, null=True)  # Field name made lowercase.
    qualityowner = models.CharField(db_column='QualityOwner', max_length=128, blank=True, null=True)  # Field name made lowercase.
    user = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    injectionrootcauseedacause = models.CharField(db_column='InjectionRootCauseEdaCause', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    rcaedacausetype = models.CharField(db_column='RcaEdaCauseType', max_length=128, blank=True, null=True)  # Field name made lowercase.
    rcaedaactiontype = models.CharField(db_column='RcaEdaActionType', max_length=128, blank=True, null=True)  # Field name made lowercase.
    targetrelease = models.CharField(db_column='TargetRelease', max_length=128, blank=True, null=True)  # Field name made lowercase.
    customerap = models.CharField(db_column='CustomerAp', max_length=32, blank=True, null=True)  # Field name made lowercase.
    apcategory = models.CharField(db_column='ApCategory', max_length=32, blank=True, null=True)  # Field name made lowercase.
    shouldhavebeendetected = models.CharField(db_column='ShouldHaveBeenDetected', max_length=128, blank=True, null=True)  # Field name made lowercase.
    apjiraid = models.CharField(db_column='ApJiraId', max_length=32, blank=True, null=True)  # Field name made lowercase.
    jirauser_id = models.IntegerField(blank=True, null=True)
    rcaedacausecategory = models.CharField(db_column='RcaEdaCauseCategory', max_length=128, blank=True, null=True)  # Field name made lowercase.
    evidenceofcompleteness = models.CharField(db_column='EvidenceOfCompleteness', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    rca_pronto_ap_id = models.CharField(max_length=64, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'apstatus'


class Customerdict(models.Model):
    rcafilterid = models.CharField(db_column='RCAFilterId', primary_key=True, max_length=20)  # Field name made lowercase.
    rcafiltername = models.CharField(db_column='RCAFilterName', max_length=128, blank=True, null=True)  # Field name made lowercase.
    customerid = models.IntegerField(db_column='CustomerId')  # Field name made lowercase.
    customername = models.CharField(db_column='CustomerName', max_length=128, blank=True, null=True)  # Field name made lowercase.
    searchrule = models.CharField(db_column='SearchRule', max_length=20, blank=True, null=True)  # Field name made lowercase.
    comment = models.CharField(db_column='Comment', max_length=500, blank=True, null=True)  # Field name made lowercase.
    rcafilteridxh = models.IntegerField(db_column='RCAFilterIdXh', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'customerdict'
        unique_together = (('rcafilterid', 'customerid'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class Edastatus(models.Model):
    prid = models.CharField(db_column='PRID', primary_key=True, max_length=64)  # Field name made lowercase.
    prtitle = models.CharField(db_column='PRTitle', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    prreporteddate = models.CharField(db_column='PRReportedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prcloseddate = models.CharField(db_column='PRClosedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    propendays = models.IntegerField(db_column='PROpenDays', blank=True, null=True)  # Field name made lowercase.
    prrcacompletedate = models.CharField(db_column='PRRcaCompleteDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prrelease = models.CharField(db_column='PRRelease', max_length=128, blank=True, null=True)  # Field name made lowercase.
    prattached = models.CharField(db_column='PRAttached', max_length=128, blank=True, null=True)  # Field name made lowercase.
    islongcycletime = models.CharField(db_column='IsLongCycleTime', max_length=32, blank=True, null=True)  # Field name made lowercase.
    iscatm = models.CharField(db_column='IsCatM', max_length=32, blank=True, null=True)  # Field name made lowercase.
    isrcacompleted = models.CharField(db_column='IsRcaCompleted', max_length=32, blank=True, null=True)  # Field name made lowercase.
    noneeddorcareason = models.CharField(db_column='NoNeedDoRCAReason', max_length=64, blank=True, null=True)  # Field name made lowercase.
    rootcausecategory = models.CharField(db_column='RootCauseCategory', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    functionarea = models.CharField(db_column='FunctionArea', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    codedeficiencydescription = models.CharField(db_column='CodeDeficiencyDescription', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    correctiondescription = models.CharField(db_column='CorrectionDescription', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    rootcause = models.CharField(db_column='RootCause', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    introducedby = models.CharField(db_column='IntroducedBy', max_length=128, blank=True, null=True)  # Field name made lowercase.
    handler = models.CharField(db_column='Handler', max_length=64, blank=True, null=True)  # Field name made lowercase.
    ltecategory = models.CharField(db_column='LteCategory', max_length=32, blank=True, null=True)  # Field name made lowercase.
    customerorinternal = models.CharField(db_column='CustomerOrInternal', max_length=32, blank=True, null=True)  # Field name made lowercase.
    jirafunctionarea = models.CharField(db_column='JiraFunctionArea', max_length=32, blank=True, null=True)  # Field name made lowercase.
    triggerscenariocategory = models.CharField(db_column='TriggerScenarioCategory', max_length=128, blank=True, null=True)  # Field name made lowercase.
    firstfaultecapephase = models.CharField(db_column='FirstFaultEcapePhase', max_length=32, blank=True, null=True)  # Field name made lowercase.
    faultintroducedrelease = models.CharField(db_column='FaultIntroducedRelease', max_length=256, blank=True, null=True)  # Field name made lowercase.
    technicalrootcause = models.CharField(db_column='TechnicalRootCause', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    teamassessor = models.CharField(db_column='TeamAssessor', max_length=64, blank=True, null=True)  # Field name made lowercase.
    edacause = models.CharField(db_column='EdaCause', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    rcarootcause5whyanalysis = models.CharField(db_column='RcaRootCause5WhyAnalysis', max_length=2048, blank=True, null=True)  # Field name made lowercase.
    jirarcabereqested = models.CharField(db_column='JiraRcaBeReqested', max_length=32, blank=True, null=True)  # Field name made lowercase.
    jiraissuestatus = models.CharField(db_column='JiraIssueStatus', max_length=32, blank=True, null=True)  # Field name made lowercase.
    jiraissueassignee = models.CharField(db_column='JiraIssueAssignee', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jirarcapreparedqualityrating = models.IntegerField(db_column='JiraRcaPreparedQualityRating', blank=True, null=True)  # Field name made lowercase.
    jirarcadeliveryontimerating = models.IntegerField(db_column='JiraRcaDeliveryOnTimeRating', blank=True, null=True)  # Field name made lowercase.
    rcasubtaskjiraid = models.CharField(db_column='RcaSubtaskJiraId', max_length=32, blank=True, null=True)  # Field name made lowercase.
    rcaedatribename = models.CharField(db_column='RcaEdaTribeName', max_length=32, blank=True, null=True)  # Field name made lowercase.
    user = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'edastatus'


class Emailservice(models.Model):
    emailserviceid = models.CharField(db_column='EmailServiceId', primary_key=True, max_length=32)  # Field name made lowercase.
    tribename = models.CharField(db_column='TribeName', max_length=128, blank=True, null=True)  # Field name made lowercase.
    qualitymanageremail = models.CharField(db_column='QualityManagerEmail', max_length=64, blank=True, null=True)  # Field name made lowercase.
    rca_emailservice = models.CharField(db_column='RCA_EmailService', max_length=64, blank=True, null=True)  # Field name made lowercase.
    eda_emailservice = models.CharField(db_column='EDA_EmailService', max_length=64, blank=True, null=True)  # Field name made lowercase.
    actionforrca_emailservice = models.CharField(db_column='ActionForRCA_EmailService', max_length=64, blank=True, null=True)  # Field name made lowercase.
    actionforeda_emailservice = models.CharField(db_column='ActionForEDA_EmailService', max_length=64, blank=True, null=True)  # Field name made lowercase.
    addedby = models.CharField(db_column='AddedBy', max_length=64, blank=True, null=True)  # Field name made lowercase.
    registered_on = models.DateTimeField(blank=True, null=True)
    reserved1 = models.CharField(db_column='Reserved1', max_length=128, blank=True, null=True)  # Field name made lowercase.
    reserved2 = models.CharField(db_column='Reserved2', max_length=128, blank=True, null=True)  # Field name made lowercase.
    reserved3 = models.CharField(db_column='Reserved3', max_length=128, blank=True, null=True)  # Field name made lowercase.
    reserved4 = models.CharField(db_column='Reserved4', max_length=128, blank=True, null=True)  # Field name made lowercase.
    reserved5 = models.CharField(db_column='Reserved5', max_length=128, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'emailservice'


class Inchargegroups(models.Model):
    inchargegroupname = models.CharField(db_column='InChargeGroupName', max_length=128)  # Field name made lowercase.
    assessoremail = models.CharField(db_column='AssessorEmail', max_length=64, blank=True, null=True)  # Field name made lowercase.
    addedby = models.CharField(db_column='AddedBy', max_length=64, blank=True, null=True)  # Field name made lowercase.
    user = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    jirauser = models.ForeignKey('Jirausers', models.DO_NOTHING, blank=True, null=True)
    businessunit = models.CharField(db_column='BusinessUnit', max_length=128, blank=True, null=True)  # Field name made lowercase.
    businessline = models.CharField(db_column='BusinessLine', max_length=128, blank=True, null=True)  # Field name made lowercase.
    rcaedacategory = models.CharField(db_column='RCAEDACategory', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jiraproject = models.CharField(db_column='JIRAProject', max_length=128, blank=True, null=True)  # Field name made lowercase.
    labels = models.CharField(db_column='Labels', max_length=128, blank=True, null=True)  # Field name made lowercase.
    registered_on = models.DateTimeField(blank=True, null=True)
    bg = models.CharField(db_column='BG', max_length=64, blank=True, null=True)  # Field name made lowercase.
    du = models.CharField(db_column='DU', max_length=64, blank=True, null=True)  # Field name made lowercase.
    tribe = models.CharField(db_column='Tribe', max_length=64, blank=True, null=True)  # Field name made lowercase.
    rcafilter = models.CharField(db_column='RCAFilter', max_length=128, blank=True, null=True)  # Field name made lowercase.
    eda_assessoremail = models.CharField(db_column='EDA_AssessorEmail', max_length=128, blank=True, null=True)  # Field name made lowercase.
    edacreatingtime = models.CharField(db_column='EDACreatingTime', max_length=128, blank=True, null=True)  # Field name made lowercase.
    edacasetype = models.CharField(db_column='EdaCaseType', max_length=128, blank=True, null=True)  # Field name made lowercase.
    productline = models.CharField(db_column='ProductLine', max_length=128, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'inchargegroups'


class Inchargegroups4(models.Model):
    index = models.IntegerField(blank=True, null=True)
    inchargegroupname = models.CharField(db_column='InChargeGroupName', primary_key=True, max_length=128)  # Field name made lowercase.
    assessoremail = models.CharField(db_column='AssessorEmail', max_length=64, blank=True, null=True)  # Field name made lowercase.
    addedby = models.CharField(db_column='AddedBy', max_length=64, blank=True, null=True)  # Field name made lowercase.
    user = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    jirauser = models.ForeignKey('Jirausers', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'inchargegroups4'


class Jirarcaqualityrating(models.Model):
    rating_id = models.AutoField(primary_key=True)
    prid = models.CharField(db_column='PRID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    ratingvalue = models.IntegerField(db_column='RatingValue', blank=True, null=True)  # Field name made lowercase.
    ratingcomments = models.CharField(db_column='RatingComments', max_length=128, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'jirarcaqualityrating'


class Jirarcatable1(models.Model):
    jiraissueid = models.CharField(db_column='JiraIssueId', primary_key=True, max_length=64)  # Field name made lowercase.
    jiraissuepriority = models.CharField(db_column='JiraIssuePriority', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissuesourcelist = models.CharField(db_column='JiraIssueSourceList', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissuebusinessunit = models.CharField(db_column='JiraIssueBusinessUnit', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jiraissuebusinessline = models.CharField(db_column='JiraIssueBusinessLine', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jiraissueproductline = models.CharField(db_column='JiraIssueProductLine', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jiraissuecustomername = models.CharField(db_column='JiraIssueCustomerName', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jiraissuefeature = models.CharField(db_column='JiraIssueFeature', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jiraissuefeaturecomponent = models.CharField(db_column='JiraIssueFeatureComponent', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jiraissueother = models.CharField(db_column='JiraIssueOther', max_length=256, blank=True, null=True)  # Field name made lowercase.
    jiraissuetype = models.CharField(db_column='JiraIssueType', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissuecasetype = models.CharField(db_column='JiraIssueCaseType', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissuestatus = models.CharField(db_column='JiraIssueStatus', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissuelabels = models.CharField(db_column='JiraIssueLabels', max_length=256, blank=True, null=True)  # Field name made lowercase.
    jiraissueassignee = models.CharField(db_column='JiraIssueAssignee', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jiraissuereporter = models.CharField(db_column='JiraIssueReporter', max_length=128, blank=True, null=True)  # Field name made lowercase.
    prid = models.CharField(db_column='PRID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prtitle = models.CharField(db_column='PRTitle', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    prrcaedaassessor = models.CharField(db_column='PRRcaEdaAssessor', max_length=128, blank=True, null=True)  # Field name made lowercase.
    prrelease = models.CharField(db_column='PRRelease', max_length=128, blank=True, null=True)  # Field name made lowercase.
    prattached = models.CharField(db_column='PRAttached', max_length=512, blank=True, null=True)  # Field name made lowercase.
    prseverity = models.CharField(db_column='PRSeverity', max_length=32, blank=True, null=True)  # Field name made lowercase.
    prgroupincharge = models.CharField(db_column='PRGroupInCharge', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prproduct = models.CharField(db_column='PRProduct', max_length=64, blank=True, null=True)  # Field name made lowercase.
    reportedby = models.CharField(db_column='ReportedBy', max_length=64, blank=True, null=True)  # Field name made lowercase.
    faultcoordinator = models.CharField(db_column='FaultCoordinator', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissuesummary = models.CharField(db_column='JiraIssueSummary', max_length=512, blank=True, null=True)  # Field name made lowercase.
    customername = models.CharField(db_column='CustomerName', max_length=128, blank=True, null=True)  # Field name made lowercase.
    apduedate = models.CharField(db_column='APDueDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    user = models.ForeignKey('Jirausers', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'jirarcatable1'


class Jirausers(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(unique=True, max_length=64, blank=True, null=True)
    password = models.CharField(max_length=256, blank=True, null=True)
    email = models.CharField(max_length=128, blank=True, null=True)
    displayname = models.CharField(db_column='displayName', max_length=128, blank=True, null=True)  # Field name made lowercase.
    linemanageraccountid = models.CharField(db_column='lineManagerAccountId', max_length=128, blank=True, null=True)  # Field name made lowercase.
    linemanagerdisplayname = models.CharField(db_column='lineManagerDisplayName', max_length=128, blank=True, null=True)  # Field name made lowercase.
    linemanageremail = models.CharField(db_column='lineManagerEmail', max_length=128, blank=True, null=True)  # Field name made lowercase.
    squadgroupname = models.CharField(db_column='squadGroupName', max_length=128, blank=True, null=True)  # Field name made lowercase.
    registered_on = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'jirausers'


class Lightrcastatus(models.Model):
    prid = models.CharField(db_column='PRID', primary_key=True, max_length=64)  # Field name made lowercase.
    prtitle = models.CharField(db_column='PRTitle', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    prreporteddate = models.CharField(db_column='PRReportedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prcloseddate = models.CharField(db_column='PRClosedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    propendays = models.IntegerField(db_column='PROpenDays', blank=True, null=True)  # Field name made lowercase.
    prrcacompletedate = models.CharField(db_column='PRRcaCompleteDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prrelease = models.CharField(db_column='PRRelease', max_length=128, blank=True, null=True)  # Field name made lowercase.
    prattached = models.CharField(db_column='PRAttached', max_length=512, blank=True, null=True)  # Field name made lowercase.
    islongcycletime = models.CharField(db_column='IsLongCycleTime', max_length=32, blank=True, null=True)  # Field name made lowercase.
    iscatm = models.CharField(db_column='IsCatM', max_length=32, blank=True, null=True)  # Field name made lowercase.
    isrcacompleted = models.CharField(db_column='IsRcaCompleted', max_length=32, blank=True, null=True)  # Field name made lowercase.
    noneeddorcareason = models.CharField(db_column='NoNeedDoRCAReason', max_length=64, blank=True, null=True)  # Field name made lowercase.
    rootcausecategory = models.CharField(db_column='RootCauseCategory', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    functionarea = models.CharField(db_column='FunctionArea', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    codedeficiencydescription = models.CharField(db_column='CodeDeficiencyDescription', max_length=2048, blank=True, null=True)  # Field name made lowercase.
    correctiondescription = models.CharField(db_column='CorrectionDescription', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    rootcause = models.CharField(db_column='RootCause', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    introducedby = models.CharField(db_column='IntroducedBy', max_length=128, blank=True, null=True)  # Field name made lowercase.
    handler = models.CharField(db_column='Handler', max_length=64, blank=True, null=True)  # Field name made lowercase.
    ltecategory = models.CharField(db_column='LteCategory', max_length=32, blank=True, null=True)  # Field name made lowercase.
    customerorinternal = models.CharField(db_column='CustomerOrInternal', max_length=32, blank=True, null=True)  # Field name made lowercase.
    jirafunctionarea = models.CharField(db_column='JiraFunctionArea', max_length=32, blank=True, null=True)  # Field name made lowercase.
    triggerscenariocategory = models.CharField(db_column='TriggerScenarioCategory', max_length=128, blank=True, null=True)  # Field name made lowercase.
    firstfaultecapephase = models.CharField(db_column='FirstFaultEcapePhase', max_length=32, blank=True, null=True)  # Field name made lowercase.
    faultintroducedrelease = models.CharField(db_column='FaultIntroducedRelease', max_length=256, blank=True, null=True)  # Field name made lowercase.
    technicalrootcause = models.CharField(db_column='TechnicalRootCause', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    teamassessor = models.CharField(db_column='TeamAssessor', max_length=64, blank=True, null=True)  # Field name made lowercase.
    edacause = models.CharField(db_column='EdaCause', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    rcarootcause5whyanalysis = models.CharField(db_column='RcaRootCause5WhyAnalysis', max_length=2048, blank=True, null=True)  # Field name made lowercase.
    jirarcabereqested = models.CharField(db_column='JiraRcaBeReqested', max_length=32, blank=True, null=True)  # Field name made lowercase.
    jiraissuestatus = models.CharField(db_column='JiraIssueStatus', max_length=32, blank=True, null=True)  # Field name made lowercase.
    jiraissueassignee = models.CharField(db_column='JiraIssueAssignee', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jirarcapreparedqualityrating = models.IntegerField(db_column='JiraRcaPreparedQualityRating', blank=True, null=True)  # Field name made lowercase.
    jirarcadeliveryontimerating = models.IntegerField(db_column='JiraRcaDeliveryOnTimeRating', blank=True, null=True)  # Field name made lowercase.
    rcasubtaskjiraid = models.CharField(db_column='RcaSubtaskJiraId', max_length=32, blank=True, null=True)  # Field name made lowercase.
    shouldhavebeendetected = models.CharField(db_column='ShouldHaveBeenDetected', max_length=128, blank=True, null=True)  # Field name made lowercase.
    rcaduedate = models.CharField(db_column='rcaDueDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prseverity = models.CharField(db_column='PRSeverity', max_length=32, blank=True, null=True)  # Field name made lowercase.
    prgroupincharge = models.CharField(db_column='PRGroupInCharge', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prproduct = models.CharField(db_column='PRProduct', max_length=64, blank=True, null=True)  # Field name made lowercase.
    reportedby = models.CharField(db_column='ReportedBy', max_length=64, blank=True, null=True)  # Field name made lowercase.
    faultcoordinator = models.CharField(db_column='FaultCoordinator', max_length=64, blank=True, null=True)  # Field name made lowercase.
    customername = models.CharField(db_column='CustomerName', max_length=128, blank=True, null=True)  # Field name made lowercase.
    feature = models.CharField(db_column='Feature', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jiracustomername = models.CharField(db_column='JiraCustomerName', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jiraproject = models.CharField(db_column='JIRAProject', max_length=128, blank=True, null=True)  # Field name made lowercase.
    edajiraissueassignee = models.CharField(db_column='EdaJiraIssueAssignee', max_length=128, blank=True, null=True)  # Field name made lowercase.
    edasubtaskjiraid = models.CharField(db_column='EdaSubtaskJiraId', max_length=32, blank=True, null=True)  # Field name made lowercase.
    edaduedate = models.CharField(db_column='edaDueDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    edajiraissuestatus = models.CharField(db_column='EdaJiraIssueStatus', max_length=32, blank=True, null=True)  # Field name made lowercase.
    jirauser = models.ForeignKey(Jirausers, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'lightrcastatus'


class Longcycletimercastatus(models.Model):
    prid = models.CharField(db_column='PRID', primary_key=True, max_length=64)  # Field name made lowercase.
    prtitle = models.CharField(db_column='PRTitle', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    prreporteddate = models.CharField(db_column='PRReportedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prcloseddate = models.CharField(db_column='PRClosedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    propendays = models.IntegerField(db_column='PROpenDays', blank=True, null=True)  # Field name made lowercase.
    prrcacompletedate = models.CharField(db_column='PRRcaCompleteDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    islongcycletime = models.CharField(db_column='IsLongCycleTime', max_length=32, blank=True, null=True)  # Field name made lowercase.
    iscatm = models.CharField(db_column='IsCatM', max_length=32, blank=True, null=True)  # Field name made lowercase.
    longcycletimercaiscompleted = models.CharField(db_column='LongCycleTimeRcaIsCompleted', max_length=32, blank=True, null=True)  # Field name made lowercase.
    longcycletimerootcause = models.CharField(db_column='LongCycleTimeRootCause', max_length=2048, blank=True, null=True)  # Field name made lowercase.
    noneeddorcareason = models.CharField(db_column='NoNeedDoRCAReason', max_length=64, blank=True, null=True)  # Field name made lowercase.
    handler = models.CharField(db_column='Handler', max_length=64, blank=True, null=True)  # Field name made lowercase.
    user = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    jirauser_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'longcycletimercastatus'


class MnGics(models.Model):
    prgroupincharge = models.CharField(db_column='PRGroupInCharge', primary_key=True, max_length=64)  # Field name made lowercase.
    bg = models.CharField(db_column='BG', max_length=64, blank=True, null=True)  # Field name made lowercase.
    du = models.CharField(db_column='DU', max_length=64, blank=True, null=True)  # Field name made lowercase.
    tribe = models.CharField(db_column='Tribe', max_length=64, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'mn_gics'


class MnNcdrGics(models.Model):
    prgroupincharge = models.CharField(db_column='PRGroupInCharge', primary_key=True, max_length=64)  # Field name made lowercase.
    bg = models.CharField(db_column='BG', max_length=64, blank=True, null=True)  # Field name made lowercase.
    du = models.CharField(db_column='DU', max_length=64, blank=True, null=True)  # Field name made lowercase.
    tribe = models.CharField(db_column='Tribe', max_length=64, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'mn_ncdr_gics'


class Mnapstatus(models.Model):
    apid = models.CharField(db_column='APID', primary_key=True, max_length=64)  # Field name made lowercase.
    prid = models.CharField(db_column='PRID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    apdescription = models.CharField(db_column='APDescription', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    apcreateddate = models.CharField(db_column='APCreatedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    apduedate = models.CharField(db_column='APDueDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    isapcompleted = models.CharField(db_column='IsApCompleted', max_length=64, blank=True, null=True)  # Field name made lowercase.
    apcompletedon = models.CharField(db_column='APCompletedOn', max_length=64, blank=True, null=True)  # Field name made lowercase.
    apassingnedto = models.CharField(db_column='APAssingnedTo', max_length=128, blank=True, null=True)  # Field name made lowercase.
    apcategory = models.CharField(db_column='ApCategory', max_length=32, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'mnapstatus'


class Mnrcametricstable(models.Model):
    jiraissueid = models.CharField(db_column='JiraIssueId', primary_key=True, max_length=64)  # Field name made lowercase.
    jiraissueparenttaskid = models.CharField(db_column='JiraIssueParentTaskId', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissuesummary = models.CharField(db_column='JiraIssueSummary', max_length=512, blank=True, null=True)  # Field name made lowercase.
    jiraissuetype = models.CharField(db_column='JiraIssueType', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissuecasetype = models.CharField(db_column='JiraIssueCaseType', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissuestatus = models.CharField(db_column='JiraIssueStatus', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissueparentstatus = models.CharField(db_column='JiraIssueParentStatus', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissueassignee = models.CharField(db_column='JiraIssueAssignee', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jiraissuereporter = models.CharField(db_column='JiraIssueReporter', max_length=128, blank=True, null=True)  # Field name made lowercase.
    prid = models.CharField(db_column='PRID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    faid = models.CharField(db_column='FAID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prtitle = models.CharField(db_column='PRTitle', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    prrcaedaassessor = models.CharField(db_column='PRRcaEdaAssessor', max_length=128, blank=True, null=True)  # Field name made lowercase.
    prattached = models.CharField(db_column='PRAttached', max_length=512, blank=True, null=True)  # Field name made lowercase.
    prseverity = models.CharField(db_column='PRSeverity', max_length=32, blank=True, null=True)  # Field name made lowercase.
    prgroupincharge = models.CharField(db_column='PRGroupInCharge', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissuecreateddate = models.CharField(db_column='JiraIssueCreatedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissueparentcreateddate = models.CharField(db_column='JiraIssueParentCreatedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissueresolutiondate = models.CharField(db_column='JiraIssueResolutionDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissueparentresolutiondate = models.CharField(db_column='JiraIssueParentResolutionDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissueduedate = models.CharField(db_column='JiraIssueDueDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissueopendays = models.IntegerField(db_column='JiraIssueOpenDays', blank=True, null=True)  # Field name made lowercase.
    jiraissueparentopendays = models.IntegerField(db_column='JiraIssueParentOpenDays', blank=True, null=True)  # Field name made lowercase.
    jiraissueassigneesquadgroup = models.CharField(db_column='JiraIssueAssigneeSquadGroup', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissueassigneesquadgrouplead = models.CharField(db_column='JiraIssueAssigneeSquadGroupLead', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissueassigneetribe = models.CharField(db_column='JiraIssueAssigneeTribe', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissueassigneetribelead = models.CharField(db_column='JiraIssueAssigneeTribeLead', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissueoverdue = models.CharField(db_column='JiraIssueOverDue', max_length=32, blank=True, null=True)  # Field name made lowercase.
    jiraissueparentoverdue = models.CharField(db_column='JiraIssueParentOverDue', max_length=32, blank=True, null=True)  # Field name made lowercase.
    jiraissueoverduereason = models.CharField(db_column='JiraIssueOverDueReason', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    jiraissueparentoverduereason = models.CharField(db_column='JiraIssueParentOverDueReason', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    reportedby = models.CharField(db_column='ReportedBy', max_length=64, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'mnrcametricstable'


class Mnrcametricstable2(models.Model):
    jiraissueid = models.CharField(db_column='JiraIssueId', primary_key=True, max_length=64)  # Field name made lowercase.
    jiraissueparenttaskid = models.CharField(db_column='JiraIssueParentTaskId', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissuesummary = models.CharField(db_column='JiraIssueSummary', max_length=512, blank=True, null=True)  # Field name made lowercase.
    jiraissuetype = models.CharField(db_column='JiraIssueType', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissuecasetype = models.CharField(db_column='JiraIssueCaseType', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissuestatus = models.CharField(db_column='JiraIssueStatus', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissueparentstatus = models.CharField(db_column='JiraIssueParentStatus', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissueassignee = models.CharField(db_column='JiraIssueAssignee', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jiraissuereporter = models.CharField(db_column='JiraIssueReporter', max_length=128, blank=True, null=True)  # Field name made lowercase.
    prid = models.CharField(db_column='PRID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    faid = models.CharField(db_column='FAID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prtitle = models.CharField(db_column='PRTitle', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    prrcaedaassessor = models.CharField(db_column='PRRcaEdaAssessor', max_length=128, blank=True, null=True)  # Field name made lowercase.
    prattached = models.CharField(db_column='PRAttached', max_length=512, blank=True, null=True)  # Field name made lowercase.
    prseverity = models.CharField(db_column='PRSeverity', max_length=32, blank=True, null=True)  # Field name made lowercase.
    prgroupincharge = models.CharField(db_column='PRGroupInCharge', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissuecreateddate = models.CharField(db_column='JiraIssueCreatedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissueparentcreateddate = models.CharField(db_column='JiraIssueParentCreatedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissueresolutiondate = models.CharField(db_column='JiraIssueResolutionDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissueparentresolutiondate = models.CharField(db_column='JiraIssueParentResolutionDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissueduedate = models.CharField(db_column='JiraIssueDueDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissueopendays = models.IntegerField(db_column='JiraIssueOpenDays', blank=True, null=True)  # Field name made lowercase.
    jiraissueparentopendays = models.IntegerField(db_column='JiraIssueParentOpenDays', blank=True, null=True)  # Field name made lowercase.
    jiraissueassigneesquadgroup = models.CharField(db_column='JiraIssueAssigneeSquadGroup', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissueassigneesquadgrouplead = models.CharField(db_column='JiraIssueAssigneeSquadGroupLead', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissueassigneetribe = models.CharField(db_column='JiraIssueAssigneeTribe', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissueassigneetribelead = models.CharField(db_column='JiraIssueAssigneeTribeLead', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissueoverdue = models.CharField(db_column='JiraIssueOverDue', max_length=32, blank=True, null=True)  # Field name made lowercase.
    jiraissueparentoverdue = models.CharField(db_column='JiraIssueParentOverDue', max_length=32, blank=True, null=True)  # Field name made lowercase.
    jiraissueoverduereason = models.CharField(db_column='JiraIssueOverDueReason', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    jiraissueparentoverduereason = models.CharField(db_column='JiraIssueParentOverDueReason', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    reportedby = models.CharField(db_column='ReportedBy', max_length=64, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'mnrcametricstable2'


class Mnrcatable(models.Model):
    prid = models.CharField(db_column='PRID', primary_key=True, max_length=64)  # Field name made lowercase.
    prtitle = models.CharField(db_column='PRTitle', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    prreporteddate = models.CharField(db_column='PRReportedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prcloseddate = models.CharField(db_column='PRClosedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prrelease = models.CharField(db_column='PRRelease', max_length=128, blank=True, null=True)  # Field name made lowercase.
    prattached = models.CharField(db_column='PRAttached', max_length=512, blank=True, null=True)  # Field name made lowercase.
    prseverity = models.CharField(db_column='PRSeverity', max_length=32, blank=True, null=True)  # Field name made lowercase.
    prgroupincharge = models.CharField(db_column='PRGroupInCharge', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prrcaedaassessor = models.CharField(db_column='PRRcaEdaAssessor', max_length=128, blank=True, null=True)  # Field name made lowercase.
    prproduct = models.CharField(db_column='PRProduct', max_length=64, blank=True, null=True)  # Field name made lowercase.
    reportedby = models.CharField(db_column='ReportedBy', max_length=64, blank=True, null=True)  # Field name made lowercase.
    faultcoordinator = models.CharField(db_column='FaultCoordinator', max_length=64, blank=True, null=True)  # Field name made lowercase.
    customername = models.CharField(db_column='CustomerName', max_length=128, blank=True, null=True)  # Field name made lowercase.
    businessunit = models.CharField(db_column='BusinessUnit', max_length=128, blank=True, null=True)  # Field name made lowercase.
    businessline = models.CharField(db_column='BusinessLine', max_length=128, blank=True, null=True)  # Field name made lowercase.
    productline = models.CharField(db_column='ProductLine', max_length=128, blank=True, null=True)  # Field name made lowercase.
    feature = models.CharField(db_column='Feature', max_length=128, blank=True, null=True)  # Field name made lowercase.
    user = models.ForeignKey(Jirausers, models.DO_NOTHING, blank=True, null=True)
    rcaedacategory = models.CharField(db_column='RCAEDACategory', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jiracustomername = models.CharField(db_column='JiraCustomerName', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jiraproject = models.CharField(db_column='JIRAProject', max_length=128, blank=True, null=True)  # Field name made lowercase.
    farcaedadecisionflag = models.CharField(db_column='FaRcaEdaDecisionFlag', max_length=64, blank=True, null=True)  # Field name made lowercase.
    eda_assessoremail = models.CharField(db_column='EDA_AssessorEmail', max_length=128, blank=True, null=True)  # Field name made lowercase.
    edacreatingtime = models.CharField(db_column='EDACreatingTime', max_length=128, blank=True, null=True)  # Field name made lowercase.
    edacasetype = models.CharField(db_column='EdaCaseType', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jirataskiscreated = models.CharField(db_column='JiraTaskIsCreated', max_length=32, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'mnrcatable'


class Rca5Why(models.Model):
    why_id = models.AutoField(primary_key=True)
    prid = models.CharField(db_column='PRID', max_length=64, blank=True, null=True)  # Field name made lowercase.
    why1 = models.CharField(db_column='Why1', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    why2 = models.CharField(db_column='Why2', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    why3 = models.CharField(db_column='Why3', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    why4 = models.CharField(db_column='Why4', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    why5 = models.CharField(db_column='Why5', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    pr = models.ForeignKey('Rcastatus', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rca5why'


class Rcadelay1(models.Model):
    prid = models.CharField(db_column='PRID', primary_key=True, max_length=64)  # Field name made lowercase.
    prcloseddate = models.CharField(db_column='PRClosedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    rcacreatedate = models.CharField(db_column='rcaCreateDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    rcadelaydays = models.IntegerField(db_column='rcaDelayDays', blank=True, null=True)  # Field name made lowercase.
    isrcacompleted = models.CharField(db_column='IsRcaCompleted', max_length=32, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'rcaDelay1'


class Rcamissratio2018(models.Model):
    prid = models.CharField(db_column='PRID', primary_key=True, max_length=64)  # Field name made lowercase.
    prtitle = models.CharField(db_column='PRTitle', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    prreporteddate = models.CharField(db_column='PRReportedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prcloseddate = models.CharField(db_column='PRClosedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prattached = models.CharField(db_column='PRAttached', max_length=512, blank=True, null=True)  # Field name made lowercase.
    prgroupincharge = models.CharField(db_column='PRGroupInCharge', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jirarcabereqested = models.CharField(db_column='JiraRcaBeReqested', max_length=32, blank=True, null=True)  # Field name made lowercase.
    bg = models.CharField(db_column='BG', max_length=64, blank=True, null=True)  # Field name made lowercase.
    du = models.CharField(db_column='DU', max_length=64, blank=True, null=True)  # Field name made lowercase.
    tribe = models.CharField(db_column='Tribe', max_length=64, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'rcaMissRatio2018'


class RcaPronto(models.Model):
    pronto_id = models.CharField(primary_key=True, max_length=64)
    case_number = models.CharField(max_length=2000, blank=True, null=True)
    product = models.CharField(max_length=2000, blank=True, null=True)
    abstract_headline = models.CharField(max_length=2000, blank=True, null=True)
    assessors = models.CharField(max_length=2000, blank=True, null=True)
    quality_reviewer = models.CharField(max_length=2000, blank=True, null=True)
    entity_json = models.TextField(blank=True, null=True)
    create_time = models.DateTimeField(blank=True, null=True)
    modify_time = models.DateTimeField(blank=True, null=True)
    username = models.CharField(max_length=200, blank=True, null=True)
    yxbz = models.CharField(max_length=1, blank=True, null=True)
    issue_description = models.TextField(blank=True, null=True)
    code_deficience = models.TextField(blank=True, null=True)
    additional_facts = models.TextField(blank=True, null=True)
    triggering_scenario_category = models.CharField(max_length=200, blank=True, null=True)
    injection_type = models.CharField(max_length=500, blank=True, null=True)
    pr_grade = models.CharField(max_length=500, blank=True, null=True)
    inheritance_recommendation = models.TextField(blank=True, null=True)
    how_many_times = models.TextField(blank=True, null=True)
    triggering_scenario = models.TextField(blank=True, null=True)
    correction_description = models.TextField(blank=True, null=True)
    injection_time = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rca_pronto'


class RcaPronto5Why(models.Model):
    why_id = models.CharField(primary_key=True, max_length=64)
    pronto_id = models.CharField(max_length=64)
    rcaedatype = models.CharField(max_length=64, blank=True, null=True)
    scenario = models.CharField(max_length=64, blank=True, null=True)
    why1_question = models.TextField(blank=True, null=True)
    why1_answer = models.TextField(blank=True, null=True)
    why2_question = models.TextField(blank=True, null=True)
    why2_answer = models.TextField(blank=True, null=True)
    why3_question = models.TextField(blank=True, null=True)
    why3_answer = models.TextField(blank=True, null=True)
    why4_question = models.TextField(blank=True, null=True)
    why4_answer = models.TextField(blank=True, null=True)
    why5_question = models.TextField(blank=True, null=True)
    why5_answer = models.TextField(blank=True, null=True)
    order = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rca_pronto_5why'


class RcaProntoComment(models.Model):
    pronto_comment_id = models.CharField(primary_key=True, max_length=50)
    pronto_id = models.CharField(max_length=36)
    comment = models.CharField(max_length=2000, blank=True, null=True)
    username = models.CharField(max_length=200, blank=True, null=True)
    email = models.CharField(max_length=200, blank=True, null=True)
    jiraissueparenttaskid = models.CharField(db_column='JiraIssueParentTaskId', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissuecommentid = models.CharField(db_column='JiraIssueCommentId', max_length=64, blank=True, null=True)  # Field name made lowercase.
    create_time = models.DateTimeField(blank=True, null=True)
    modify_time = models.DateTimeField(blank=True, null=True)
    delete_user = models.CharField(max_length=200, blank=True, null=True)
    yxbz = models.CharField(max_length=1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rca_pronto_comment'


class RcaProntoEdaap(models.Model):
    ap_id = models.CharField(primary_key=True, max_length=64)
    why_id = models.CharField(max_length=64, blank=True, null=True)
    completion_target_date = models.TextField(blank=True, null=True)
    grading = models.CharField(max_length=45, blank=True, null=True)
    escape_cause = models.TextField(blank=True, null=True)
    ap_jiratask_id = models.CharField(max_length=64, blank=True, null=True)
    assigned_to = models.TextField(blank=True, null=True)
    actionproposal = models.TextField(blank=True, null=True)
    order = models.IntegerField(blank=True, null=True)
    eda_action_type_dm = models.CharField(max_length=500, blank=True, null=True)
    eda_action_type_text = models.CharField(max_length=500, blank=True, null=True)
    escape_cause_category_dm = models.CharField(max_length=500, blank=True, null=True)
    escape_cause_category_text = models.CharField(max_length=500, blank=True, null=True)
    escape_cause_subcategory_dm = models.CharField(max_length=500, blank=True, null=True)
    escape_cause_subcategory_text = models.CharField(max_length=500, blank=True, null=True)
    where_could_defect_have_been_detected_dm = models.CharField(max_length=500, blank=True, null=True)
    where_could_defect_have_been_detected_text = models.CharField(max_length=500, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rca_pronto_edaap'


class RcaProntoKz(models.Model):
    pronto_id = models.CharField(primary_key=True, max_length=64)
    jiraissueparenttaskid = models.CharField(db_column='JiraIssueParentTaskId', max_length=64, blank=True, null=True)  # Field name made lowercase.
    pr_grade_dm = models.CharField(max_length=45, blank=True, null=True)
    pr_grade_text = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rca_pronto_kz'


class RcaProntoRcaap(models.Model):
    ap_id = models.CharField(primary_key=True, max_length=64)
    why_id = models.CharField(max_length=64, blank=True, null=True)
    completion_target_date = models.TextField(blank=True, null=True)
    grading = models.CharField(max_length=64, blank=True, null=True)
    rootcause = models.TextField(blank=True, null=True)
    ap_jiratask_id = models.CharField(max_length=64, blank=True, null=True)
    assigned_to = models.TextField(blank=True, null=True)
    actionproposal = models.TextField(blank=True, null=True)
    order = models.IntegerField(blank=True, null=True)
    rca_action_type_dm = models.CharField(max_length=500, blank=True, null=True)
    rca_action_type_text = models.CharField(max_length=500, blank=True, null=True)
    root_cause_category_dm = models.CharField(max_length=500, blank=True, null=True)
    root_cause_category_text = models.CharField(max_length=500, blank=True, null=True)
    root_cause_subcategory_dm = models.CharField(max_length=500, blank=True, null=True)
    root_cause_subcategory_text = models.CharField(max_length=500, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rca_pronto_rcaap'


class RcaProntoVersion(models.Model):
    pronto_version_id = models.CharField(primary_key=True, max_length=50)
    pronto_id = models.CharField(max_length=36)
    case_number = models.CharField(max_length=2000, blank=True, null=True)
    product = models.CharField(max_length=2000, blank=True, null=True)
    abstract_headline = models.CharField(max_length=2000, blank=True, null=True)
    assessors = models.CharField(max_length=2000, blank=True, null=True)
    quality_reviewer = models.CharField(max_length=2000, blank=True, null=True)
    yxbz = models.CharField(max_length=1, blank=True, null=True)
    entity_json = models.TextField(blank=True, null=True)
    create_time = models.DateTimeField(blank=True, null=True)
    modify_time = models.DateTimeField(blank=True, null=True)
    username = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rca_pronto_version'


class RcaXtDm(models.Model):
    type_id = models.CharField(primary_key=True, max_length=10)
    type_name = models.CharField(max_length=100, blank=True, null=True)
    dm = models.CharField(max_length=10)
    csz = models.CharField(max_length=200, blank=True, null=True)
    comment = models.CharField(max_length=500, blank=True, null=True)
    p_type_id = models.CharField(max_length=10, blank=True, null=True)
    p_dm = models.CharField(max_length=10, blank=True, null=True)
    yxbz = models.CharField(max_length=1, blank=True, null=True)
    kz1 = models.CharField(max_length=45, blank=True, null=True)
    kz2 = models.CharField(max_length=45, blank=True, null=True)
    kz3 = models.CharField(max_length=45, blank=True, null=True)
    kz4 = models.CharField(max_length=45, blank=True, null=True)
    kz5 = models.CharField(max_length=45, blank=True, null=True)
    kz6 = models.CharField(max_length=45, blank=True, null=True)
    kz7 = models.CharField(max_length=45, blank=True, null=True)
    kz8 = models.CharField(max_length=45, blank=True, null=True)
    kz9 = models.CharField(max_length=45, blank=True, null=True)
    kz10 = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rca_xt_dm'
        unique_together = (('type_id', 'dm'),)


class RcaXtSequence(models.Model):
    seq_name = models.CharField(primary_key=True, max_length=50)
    current_val = models.IntegerField()
    increment_val = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'rca_xt_sequence'


class Rcadelay1(models.Model):
    prid = models.CharField(db_column='PRID', primary_key=True, max_length=64)  # Field name made lowercase.
    prcloseddate = models.CharField(db_column='PRClosedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    rcacreatedate = models.CharField(db_column='rcaCreateDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    rcadelaydays = models.IntegerField(db_column='rcaDelayDays', blank=True, null=True)  # Field name made lowercase.
    isrcacompleted = models.CharField(db_column='IsRcaCompleted', max_length=32, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'rcadelay1'


class Rcamissratio2018(models.Model):
    prid = models.CharField(db_column='PRID', primary_key=True, max_length=64)  # Field name made lowercase.
    prtitle = models.CharField(db_column='PRTitle', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    prreporteddate = models.CharField(db_column='PRReportedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prcloseddate = models.CharField(db_column='PRClosedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prattached = models.CharField(db_column='PRAttached', max_length=512, blank=True, null=True)  # Field name made lowercase.
    prgroupincharge = models.CharField(db_column='PRGroupInCharge', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jirarcabereqested = models.CharField(db_column='JiraRcaBeReqested', max_length=32, blank=True, null=True)  # Field name made lowercase.
    bg = models.CharField(db_column='BG', max_length=64, blank=True, null=True)  # Field name made lowercase.
    du = models.CharField(db_column='DU', max_length=64, blank=True, null=True)  # Field name made lowercase.
    tribe = models.CharField(db_column='Tribe', max_length=64, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'rcamissratio2018'


class Rcastatus(models.Model):
    prid = models.CharField(db_column='PRID', primary_key=True, max_length=64)  # Field name made lowercase.
    prtitle = models.CharField(db_column='PRTitle', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    prreporteddate = models.CharField(db_column='PRReportedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prcloseddate = models.CharField(db_column='PRClosedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    propendays = models.IntegerField(db_column='PROpenDays', blank=True, null=True)  # Field name made lowercase.
    prrcacompletedate = models.CharField(db_column='PRRcaCompleteDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prrelease = models.CharField(db_column='PRRelease', max_length=128, blank=True, null=True)  # Field name made lowercase.
    prattached = models.CharField(db_column='PRAttached', max_length=512, blank=True, null=True)  # Field name made lowercase.
    islongcycletime = models.CharField(db_column='IsLongCycleTime', max_length=32, blank=True, null=True)  # Field name made lowercase.
    iscatm = models.CharField(db_column='IsCatM', max_length=32, blank=True, null=True)  # Field name made lowercase.
    isrcacompleted = models.CharField(db_column='IsRcaCompleted', max_length=32, blank=True, null=True)  # Field name made lowercase.
    noneeddorcareason = models.CharField(db_column='NoNeedDoRCAReason', max_length=64, blank=True, null=True)  # Field name made lowercase.
    rootcausecategory = models.CharField(db_column='RootCauseCategory', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    functionarea = models.CharField(db_column='FunctionArea', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    codedeficiencydescription = models.CharField(db_column='CodeDeficiencyDescription', max_length=2048, blank=True, null=True)  # Field name made lowercase.
    correctiondescription = models.CharField(db_column='CorrectionDescription', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    rootcause = models.CharField(db_column='RootCause', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    introducedby = models.CharField(db_column='IntroducedBy', max_length=128, blank=True, null=True)  # Field name made lowercase.
    handler = models.CharField(db_column='Handler', max_length=64, blank=True, null=True)  # Field name made lowercase.
    user = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    ltecategory = models.CharField(db_column='LteCategory', max_length=32, blank=True, null=True)  # Field name made lowercase.
    customerorinternal = models.CharField(db_column='CustomerOrInternal', max_length=32, blank=True, null=True)  # Field name made lowercase.
    jirafunctionarea = models.CharField(db_column='JiraFunctionArea', max_length=32, blank=True, null=True)  # Field name made lowercase.
    triggerscenariocategory = models.CharField(db_column='TriggerScenarioCategory', max_length=128, blank=True, null=True)  # Field name made lowercase.
    firstfaultecapephase = models.CharField(db_column='FirstFaultEcapePhase', max_length=32, blank=True, null=True)  # Field name made lowercase.
    faultintroducedrelease = models.CharField(db_column='FaultIntroducedRelease', max_length=256, blank=True, null=True)  # Field name made lowercase.
    technicalrootcause = models.CharField(db_column='TechnicalRootCause', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    teamassessor = models.CharField(db_column='TeamAssessor', max_length=64, blank=True, null=True)  # Field name made lowercase.
    edacause = models.CharField(db_column='EdaCause', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    rcarootcause5whyanalysis = models.CharField(db_column='RcaRootCause5WhyAnalysis', max_length=2048, blank=True, null=True)  # Field name made lowercase.
    jirarcabereqested = models.CharField(db_column='JiraRcaBeReqested', max_length=32, blank=True, null=True)  # Field name made lowercase.
    jiraissuestatus = models.CharField(db_column='JiraIssueStatus', max_length=32, blank=True, null=True)  # Field name made lowercase.
    jiraissueassignee = models.CharField(db_column='JiraIssueAssignee', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jirarcapreparedqualityrating = models.IntegerField(db_column='JiraRcaPreparedQualityRating', blank=True, null=True)  # Field name made lowercase.
    jirarcadeliveryontimerating = models.IntegerField(db_column='JiraRcaDeliveryOnTimeRating', blank=True, null=True)  # Field name made lowercase.
    rcasubtaskjiraid = models.CharField(db_column='RcaSubtaskJiraId', max_length=32, blank=True, null=True)  # Field name made lowercase.
    jirauser_id = models.IntegerField(blank=True, null=True)
    shouldhavebeendetected = models.CharField(db_column='ShouldHaveBeenDetected', max_length=128, blank=True, null=True)  # Field name made lowercase.
    rcaduedate = models.CharField(db_column='rcaDueDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prseverity = models.CharField(db_column='PRSeverity', max_length=32, blank=True, null=True)  # Field name made lowercase.
    prgroupincharge = models.CharField(db_column='PRGroupInCharge', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prproduct = models.CharField(db_column='PRProduct', max_length=64, blank=True, null=True)  # Field name made lowercase.
    reportedby = models.CharField(db_column='ReportedBy', max_length=64, blank=True, null=True)  # Field name made lowercase.
    faultcoordinator = models.CharField(db_column='FaultCoordinator', max_length=64, blank=True, null=True)  # Field name made lowercase.
    customername = models.CharField(db_column='CustomerName', max_length=128, blank=True, null=True)  # Field name made lowercase.
    feature = models.CharField(db_column='Feature', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jiracustomername = models.CharField(db_column='JiraCustomerName', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jiraproject = models.CharField(db_column='JIRAProject', max_length=128, blank=True, null=True)  # Field name made lowercase.
    edajiraissueassignee = models.CharField(db_column='EdaJiraIssueAssignee', max_length=128, blank=True, null=True)  # Field name made lowercase.
    edasubtaskjiraid = models.CharField(db_column='EdaSubtaskJiraId', max_length=32, blank=True, null=True)  # Field name made lowercase.
    edaduedate = models.CharField(db_column='edaDueDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    edajiraissuestatus = models.CharField(db_column='EdaJiraIssueStatus', max_length=32, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'rcastatus'


class Rcatablemn(models.Model):
    prid = models.CharField(db_column='PRID', primary_key=True, max_length=64)  # Field name made lowercase.
    prtitle = models.CharField(db_column='PRTitle', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    prreporteddate = models.CharField(db_column='PRReportedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prcloseddate = models.CharField(db_column='PRClosedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prrelease = models.CharField(db_column='PRRelease', max_length=128, blank=True, null=True)  # Field name made lowercase.
    prattached = models.CharField(db_column='PRAttached', max_length=512, blank=True, null=True)  # Field name made lowercase.
    prseverity = models.CharField(db_column='PRSeverity', max_length=32, blank=True, null=True)  # Field name made lowercase.
    prgroupincharge = models.CharField(db_column='PRGroupInCharge', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prrcaedaassessor = models.CharField(db_column='PRRcaEdaAssessor', max_length=128, blank=True, null=True)  # Field name made lowercase.
    prproduct = models.CharField(db_column='PRProduct', max_length=64, blank=True, null=True)  # Field name made lowercase.
    reportedby = models.CharField(db_column='ReportedBy', max_length=64, blank=True, null=True)  # Field name made lowercase.
    faultcoordinator = models.CharField(db_column='FaultCoordinator', max_length=64, blank=True, null=True)  # Field name made lowercase.
    customername = models.CharField(db_column='CustomerName', max_length=128, blank=True, null=True)  # Field name made lowercase.
    businessunit = models.CharField(db_column='BusinessUnit', max_length=128, blank=True, null=True)  # Field name made lowercase.
    businessline = models.IntegerField(db_column='BusinessLine', blank=True, null=True)  # Field name made lowercase.
    productline = models.CharField(db_column='ProductLine', max_length=128, blank=True, null=True)  # Field name made lowercase.
    feature = models.CharField(db_column='Feature', max_length=128, blank=True, null=True)  # Field name made lowercase.
    rcaedacategory = models.CharField(db_column='RCAEDACategory', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jiracustomername = models.CharField(db_column='JiraCustomerName', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jiraproject = models.CharField(db_column='JIRAProject', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jirarcabereqested = models.CharField(db_column='JiraRcaBeReqested', max_length=32, blank=True, null=True)  # Field name made lowercase.
    jiraissuestatus = models.CharField(db_column='JiraIssueStatus', max_length=32, blank=True, null=True)  # Field name made lowercase.
    jiraissueassignee = models.CharField(db_column='JiraIssueAssignee', max_length=128, blank=True, null=True)  # Field name made lowercase.
    rcasubtaskjiraid = models.CharField(db_column='RcaSubtaskJiraId', max_length=32, blank=True, null=True)  # Field name made lowercase.
    rcacreatedate = models.CharField(db_column='rcaCreateDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    rcadelaydays = models.IntegerField(db_column='rcaDelayDays', blank=True, null=True)  # Field name made lowercase.
    numofapdefined = models.IntegerField(db_column='numOfApDefined', blank=True, null=True)  # Field name made lowercase.
    numofapdone = models.IntegerField(db_column='numOfApDone', blank=True, null=True)  # Field name made lowercase.
    numapofdonewithintargetdate = models.IntegerField(db_column='numApOfDoneWithinTargetDate', blank=True, null=True)  # Field name made lowercase.
    numofapnotdoneyetbutoverdue = models.IntegerField(db_column='numOfApNotDoneYetButOverdue', blank=True, null=True)  # Field name made lowercase.
    rcaresolutiondate = models.CharField(db_column='rcaResolutionDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    isrcacompleted = models.CharField(db_column='IsRcaCompleted', max_length=32, blank=True, null=True)  # Field name made lowercase.
    rcaduedate = models.CharField(db_column='rcaDueDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissuetype = models.CharField(db_column='JiraIssueType', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissuecasetype = models.CharField(db_column='JiraIssueCaseType', max_length=64, blank=True, null=True)  # Field name made lowercase.
    creatorname = models.CharField(db_column='creatorName', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prontorepresentative = models.CharField(db_column='prontoRepresentative', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prontonumber = models.CharField(db_column='prontoNumber', max_length=512, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'rcatablemn'


class Rcatablemn1(models.Model):
    prid = models.CharField(db_column='PRID', primary_key=True, max_length=64)  # Field name made lowercase.
    prtitle = models.CharField(db_column='PRTitle', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    prreporteddate = models.CharField(db_column='PRReportedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prcloseddate = models.CharField(db_column='PRClosedDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prrelease = models.CharField(db_column='PRRelease', max_length=128, blank=True, null=True)  # Field name made lowercase.
    prattached = models.CharField(db_column='PRAttached', max_length=512, blank=True, null=True)  # Field name made lowercase.
    prseverity = models.CharField(db_column='PRSeverity', max_length=32, blank=True, null=True)  # Field name made lowercase.
    prgroupincharge = models.CharField(db_column='PRGroupInCharge', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prrcaedaassessor = models.CharField(db_column='PRRcaEdaAssessor', max_length=128, blank=True, null=True)  # Field name made lowercase.
    prproduct = models.CharField(db_column='PRProduct', max_length=64, blank=True, null=True)  # Field name made lowercase.
    reportedby = models.CharField(db_column='ReportedBy', max_length=64, blank=True, null=True)  # Field name made lowercase.
    faultcoordinator = models.CharField(db_column='FaultCoordinator', max_length=64, blank=True, null=True)  # Field name made lowercase.
    customername = models.CharField(db_column='CustomerName', max_length=128, blank=True, null=True)  # Field name made lowercase.
    businessunit = models.CharField(db_column='BusinessUnit', max_length=128, blank=True, null=True)  # Field name made lowercase.
    businessline = models.IntegerField(db_column='BusinessLine', blank=True, null=True)  # Field name made lowercase.
    productline = models.CharField(db_column='ProductLine', max_length=128, blank=True, null=True)  # Field name made lowercase.
    feature = models.CharField(db_column='Feature', max_length=128, blank=True, null=True)  # Field name made lowercase.
    rcaedacategory = models.CharField(db_column='RCAEDACategory', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jiracustomername = models.CharField(db_column='JiraCustomerName', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jiraproject = models.CharField(db_column='JIRAProject', max_length=128, blank=True, null=True)  # Field name made lowercase.
    jirarcabereqested = models.CharField(db_column='JiraRcaBeReqested', max_length=32, blank=True, null=True)  # Field name made lowercase.
    jiraissuestatus = models.CharField(db_column='JiraIssueStatus', max_length=32, blank=True, null=True)  # Field name made lowercase.
    jiraissueassignee = models.CharField(db_column='JiraIssueAssignee', max_length=128, blank=True, null=True)  # Field name made lowercase.
    rcasubtaskjiraid = models.CharField(db_column='RcaSubtaskJiraId', max_length=32, blank=True, null=True)  # Field name made lowercase.
    rcacreatedate = models.CharField(db_column='rcaCreateDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    rcaresolutiondate = models.CharField(db_column='rcaResolutionDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    rcadelaydays = models.IntegerField(db_column='rcaDelayDays', blank=True, null=True)  # Field name made lowercase.
    numofapdefined = models.IntegerField(db_column='numOfApDefined', blank=True, null=True)  # Field name made lowercase.
    numofapdone = models.IntegerField(db_column='numOfApDone', blank=True, null=True)  # Field name made lowercase.
    numapofdonewithintargetdate = models.IntegerField(db_column='numApOfDoneWithinTargetDate', blank=True, null=True)  # Field name made lowercase.
    numofapnotdoneyetbutoverdue = models.IntegerField(db_column='numOfApNotDoneYetButOverdue', blank=True, null=True)  # Field name made lowercase.
    isrcacompleted = models.CharField(db_column='IsRcaCompleted', max_length=32, blank=True, null=True)  # Field name made lowercase.
    rcaduedate = models.CharField(db_column='rcaDueDate', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissuetype = models.CharField(db_column='JiraIssueType', max_length=64, blank=True, null=True)  # Field name made lowercase.
    jiraissuecasetype = models.CharField(db_column='JiraIssueCaseType', max_length=64, blank=True, null=True)  # Field name made lowercase.
    creatorname = models.CharField(db_column='creatorName', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prontorepresentative = models.CharField(db_column='prontoRepresentative', max_length=64, blank=True, null=True)  # Field name made lowercase.
    prontonumber = models.CharField(db_column='prontoNumber', max_length=512, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'rcatablemn1'


class Squadgroupaccessortable(models.Model):
    assessorid = models.CharField(db_column='assessorId', primary_key=True, max_length=64)  # Field name made lowercase.
    squadgrouprcaedaassessor = models.CharField(db_column='squadGroupRcaEdaAssessor', max_length=64, blank=True, null=True)  # Field name made lowercase.
    tribercaedaleadassessor = models.CharField(db_column='tribeRcaEdaLeadAssessor', max_length=64, blank=True, null=True)  # Field name made lowercase.
    assessorsquadgroupname = models.CharField(db_column='assessorSquadGroupName', max_length=64, blank=True, null=True)  # Field name made lowercase.
    assessorsquadgrouplead = models.CharField(db_column='assessorSquadGroupLead', max_length=64, blank=True, null=True)  # Field name made lowercase.
    assessortribe = models.CharField(db_column='assessorTribe', max_length=64, blank=True, null=True)  # Field name made lowercase.
    assessortribelead = models.CharField(db_column='assessorTribeLead', max_length=64, blank=True, null=True)  # Field name made lowercase.
    squadgroupemailgroup = models.CharField(db_column='squadGroupEmailGroup', max_length=64, blank=True, null=True)  # Field name made lowercase.
    registeredby = models.CharField(db_column='registeredBy', max_length=64, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'squadGroupAccessortable'


class Squadgroupassessortable(models.Model):
    assessorid = models.CharField(db_column='assessorId', primary_key=True, max_length=64)  # Field name made lowercase.
    squadgrouprcaedaassessor = models.CharField(db_column='squadGroupRcaEdaAssessor', max_length=64, blank=True, null=True)  # Field name made lowercase.
    tribercaedaleadassessor = models.CharField(db_column='tribeRcaEdaLeadAssessor', max_length=64, blank=True, null=True)  # Field name made lowercase.
    assessorsquadgroupname = models.CharField(db_column='assessorSquadGroupName', max_length=64, blank=True, null=True)  # Field name made lowercase.
    assessorsquadgrouplead = models.CharField(db_column='assessorSquadGroupLead', max_length=64, blank=True, null=True)  # Field name made lowercase.
    assessortribe = models.CharField(db_column='assessorTribe', max_length=64, blank=True, null=True)  # Field name made lowercase.
    assessortribelead = models.CharField(db_column='assessorTribeLead', max_length=64, blank=True, null=True)  # Field name made lowercase.
    squadgroupemailgroup = models.CharField(db_column='squadGroupEmailGroup', max_length=64, blank=True, null=True)  # Field name made lowercase.
    registeredby = models.CharField(db_column='registeredBy', max_length=64, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'squadGroupAssessorTable'


class Syslog(models.Model):
    index = models.AutoField(db_column='Index', primary_key=True)  # Field name made lowercase.
    loginaccount = models.CharField(db_column='loginAccount', max_length=64, blank=True, null=True)  # Field name made lowercase.
    loginlocation = models.CharField(db_column='loginLocation', max_length=128, blank=True, null=True)  # Field name made lowercase.
    ipaddress = models.CharField(db_column='ipAddress', max_length=128, blank=True, null=True)  # Field name made lowercase.
    browsertype = models.CharField(db_column='browserType', max_length=128, blank=True, null=True)  # Field name made lowercase.
    devicetype = models.CharField(db_column='deviceType', max_length=128, blank=True, null=True)  # Field name made lowercase.
    ostype = models.CharField(db_column='osType', max_length=128, blank=True, null=True)  # Field name made lowercase.
    operationtype = models.CharField(db_column='operationType', max_length=128, blank=True, null=True)  # Field name made lowercase.
    logtime = models.DateTimeField(db_column='logTime', blank=True, null=True)  # Field name made lowercase.
    pridorapid = models.CharField(db_column='prIdorApId', max_length=128, blank=True, null=True)  # Field name made lowercase.
    log1 = models.CharField(max_length=1024, blank=True, null=True)
    log2 = models.CharField(max_length=1024, blank=True, null=True)
    log3 = models.CharField(max_length=3000, blank=True, null=True)
    log4 = models.CharField(max_length=1024, blank=True, null=True)
    log5 = models.CharField(max_length=1024, blank=True, null=True)
    log6 = models.CharField(max_length=1024, blank=True, null=True)
    log7 = models.CharField(max_length=1024, blank=True, null=True)
    log8 = models.CharField(max_length=1024, blank=True, null=True)
    log9 = models.CharField(max_length=1024, blank=True, null=True)
    log10 = models.CharField(max_length=1024, blank=True, null=True)
    log11 = models.CharField(max_length=1024, blank=True, null=True)
    log12 = models.CharField(max_length=1024, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'syslog'


class SystemAdmin(models.Model):
    adminid = models.BigAutoField(primary_key=True)
    adminname = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    yxbz = models.CharField(max_length=1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'system_admin'


class Teammembers(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    emailname = models.CharField(db_column='emailName', max_length=64, blank=True, null=True)  # Field name made lowercase.
    linemanager = models.CharField(db_column='lineManager', max_length=32, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'teammembers'


class Users(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(unique=True, max_length=20, blank=True, null=True)
    password = models.CharField(max_length=250, blank=True, null=True)
    email = models.CharField(unique=True, max_length=50, blank=True, null=True)
    registered_on = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'
