class RcaformBase():
    def __init__(self, case_number, product, abstract_headline, assessors, quality_reviewer,
                 issue_description, triggering_scenario, triggering_scenario_category,
                 code_deficienc, correction_description, injection_type,
                 injection_time, additional_facts, inheritance_recommendation,
                 how_many_times):
        self.case_number = case_number
        self.product = product
        self.abstract_headline = abstract_headline
        self.assessors = assessors
        self.quality_reviewer = quality_reviewer
        self.issue_description = issue_description
        self.triggering_scenario = triggering_scenario
        self.triggering_scenario_category = triggering_scenario_category
        self.code_deficienc = code_deficienc
        self.correction_description = correction_description
        self.injection_type = injection_type
        self.injection_time = injection_time
        self.additional_facts = additional_facts
        self.inheritance_recommendation = inheritance_recommendation
        self.how_many_times = how_many_times

    def to_string(self):
        return 'case_number :' + str(self.case_number) + ',' + \
               'product :' + str(self.product) + ',' + \
               'abstract_headline :' + str(self.abstract_headline) + ',' + \
               'assessors :' + str(self.assessors) + ',' + \
               'quality_reviewer :' + str(self.quality_reviewer) + ',' + \
               'issue_description :' + str(self.issue_description) + ',' + \
               'triggering_scenario :' + str(self.triggering_scenario) + ',' + \
               'triggering_scenario_category :' + str(self.triggering_scenario_category) + ',' + \
               'code_deficienc :' + str(self.code_deficienc) + ',' + \
               'correction_description :' + str(self.correction_description) + ',' + \
               'injection_type :' + str(self.injection_type) + ',' + \
               'injection_time :' + str(self.injection_time) + ',' + \
               'additional_facts :' + str(self.additional_facts) + ',' + \
               'inheritance_recommendation :' + str(self.inheritance_recommendation) + ',' + \
               'how_many_times :' + str(self.how_many_times)


class RcaformRootCauseLine():
    def __init__(self, why1, why2, why3, why4, why5, rootcause, actionproposal, root_cause_category,
                 root_cause_subcategory, rca_action_type, assigned_to, rca_ai_id, completion_target_date):
        self.why1 = why1
        self.why2 = why2
        self.why3 = why3
        self.why4 = why4
        self.why5 = why5
        self.rootcause = rootcause
        self.actionproposal = actionproposal
        self.root_cause_category = root_cause_category
        self.root_cause_subcategory = root_cause_subcategory
        self.rca_action_type = rca_action_type
        self.assigned_to = assigned_to
        self.rca_ai_id = rca_ai_id
        self.completion_target_date = completion_target_date

    def to_string(self):
        return 'why1 :' + str(self.why1) + ',' + \
               'why2 :' + str(self.why2) + ',' + \
               'why3 :' + str(self.why3) + ',' + \
               'why4 :' + str(self.why4) + ',' + \
               'why5 :' + str(self.why5) + ',' + \
               'rootcause :' + str(self.rootcause) + ',' + \
               'actionproposal :' + str(self.actionproposal) + ',' + \
               'root_cause_category :' + str(self.root_cause_category) + ',' + \
               'root_cause_subcategory :' + str(self.root_cause_subcategory) + ',' + \
               'rca_action_type :' + str(self.rca_action_type) + ',' + \
               'assigned_to :' + str(self.assigned_to) + ',' + \
               'rca_ai_id :' + str(self.rca_ai_id) + ',' + \
               'completion_target_date :' + str(self.completion_target_date)


class RcaformRootCause():
    def __init__(self, why_was_the_fault_introduced, why_root_cause_was_not_found):
        self.why_was_the_fault_introduced = why_was_the_fault_introduced  # 数组，RcaformRootCauseLine
        self.why_root_cause_was_not_found = why_root_cause_was_not_found  # 数组，RcaformRootCauseLine

    def to_string(self):
        return 'why_was_the_fault_introduced:' + str(self.why_was_the_fault_introduced) + \
               ',why_root_cause_was_not_found:' + str(self.why_root_cause_was_not_found)


class RcaformEscapeDefectLine():
    def __init__(self, why1, why2, why3, why4, why5, escape_cause, actionproposal, escape_cause_category,
                 escape_cause_subcategory, eda_action_type, assigned_to, rca_ai_id, completion_target_date):
        self.why1 = why1
        self.why2 = why2
        self.why3 = why3
        self.why4 = why4
        self.why5 = why5
        self.escape_cause = escape_cause
        self.actionproposal = actionproposal
        self.escape_cause_category = escape_cause_category
        self.escape_cause_subcategory = escape_cause_subcategory
        self.eda_action_type = eda_action_type
        self.assigned_to = assigned_to
        self.rca_ai_id = rca_ai_id
        self.completion_target_date = completion_target_date

    def to_string(self):
        return 'why1 :' + str(self.why1) + ',' + \
               'why2 :' + str(self.why2) + ',' + \
               'why3 :' + str(self.why3) + ',' + \
               'why4 :' + str(self.why4) + ',' + \
               'why5 :' + str(self.why5) + ',' + \
               'escapecause :' + str(self.escapecause) + ',' + \
               'actionproposal :' + str(self.actionproposal) + ',' + \
               'escape_cause_category :' + str(self.escape_cause_category) + ',' + \
               'escape_cause_subcategory :' + str(self.escape_cause_subcategory) + ',' + \
               'eda_action_type :' + str(self.eda_action_type) + ',' + \
               'assigned_to :' + str(self.assigned_to) + ',' + \
               'rca_ai_id :' + str(self.rca_ai_id) + ',' + \
               'completion_target_date :' + str(self.completion_target_date)


class RcaformEscapeDefect():
    def __init__(self, why_not_requirements_review, why_not_design_review, why_not_analysis_tools,
                 why_not_inspections, why_not_component_test, why_not_entity_test,
                 why_not_et_auto, why_not_system_test, why_not_st_auto):
        self.why_not_requirements_review = why_not_requirements_review
        self.why_not_design_review = why_not_design_review
        self.why_not_analysis_tools = why_not_analysis_tools
        self.why_not_inspections = why_not_inspections
        self.why_not_component_test = why_not_component_test
        self.why_not_entity_test = why_not_entity_test
        self.why_not_et_auto = why_not_et_auto
        self.why_not_system_test = why_not_system_test
        self.why_not_st_auto = why_not_st_auto

    def to_string(self):
        return 'why_not_requirements_review :' + str(self.why_not_requirements_review) + ',' + \
               'why_not_design_review :' + str(self.why_not_design_review) + ',' + \
               'why_not_analysis_tools :' + str(self.why_not_analysis_tools) + ',' + \
               'why_not_inspections :' + str(self.why_not_inspections) + ',' + \
               'why_not_component_test :' + str(self.why_not_component_test) + ',' + \
               'why_not_entity_test :' + str(self.why_not_entity_test) + ',' + \
               'why_not_et_auto :' + str(self.why_not_et_auto) + ',' + \
               'why_not_system_test :' + str(self.why_not_system_test) + ',' + \
               'why_not_st_auto :' + str(self.why_not_st_auto)


class Rcaform():
    def __init__(self, rcaformbase, rcaformrootcause, rcaformescapedefect):
        self.rcaformbase = rcaformbase
        self.rcaformrootcause = rcaformrootcause
        self.rcaformescapedefect = rcaformescapedefect

    def doSave(rcaform):
        print('save rcaform')

    def to_string(self):
        return 'rcaformbase:' + self.rcaformbase.to_string() + ',rcaformrootcause:' + self.rcaformrootcause.to_string() \
               + ',rcaformescapedefect:' + self.rcaformescapedefect.to_string()

