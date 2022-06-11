
export const WhyTreeDataStructureTemplate = () => {

    return {
        form_name: "Case X",
        id: "case_number",
        type: "root",
        children: [
            {
                branch_name: "Why the fault was introduced?",
                id: "branch1",
                type: "branch",
                branch_type: "Root Cause Analysis",
                branch: "branch1",
                parent: "case_number",
                assigned_to: "not assigned yet",
                assigned_to_object: null,
                grade: "Not rated yet",
                children: [
                    {
                        id: "branch1_why_1",
                        type: "why_question",
                        active: false,
                        question: "",
                        answer: "",
                        parent: "branch1",
                        branch: "branch1",
                        children: [
                            {
                                id: "branch1_why_2",
                                type: "why_question",
                                active: false,
                                question: "",
                                answer: "",
                                parent: "branch1_why_1",
                                branch: "branch1",
                                children: [
                                    {
                                        id: "branch1_why_3",
                                        type: "why_question",
                                        active: false,
                                        question: "",
                                        answer: "",
                                        parent: "branch1_why_2",
                                        branch: "branch1",
                                        children: [
                                            {
                                                id: "branch1_why_4",
                                                type: "why_question",
                                                active: false,
                                                question: "",
                                                answer: "",
                                                parent: "branch1_why_3",
                                                branch: "branch1",
                                                children: [
                                                    {
                                                        id: "branch1_why_5",
                                                        type: "why_question",
                                                        active: false,
                                                        question: "",
                                                        answer: "",
                                                        parent: "branch1_why_4",
                                                        branch: "branch1",
                                                        children: [
                                                            {
                                                                root_cause: "Root Cause ",
                                                                id: "branch1_cause_1",
                                                                type: "cause",
                                                                active: false,
                                                                statement: "",
                                                                parent: "branch1_why_5",
                                                                branch: "branch1",
                                                                children: [
                                                                    {
                                                                        action: "Action ",
                                                                        id: "branch1_action_1",
                                                                        type: "action",
                                                                        active: false,
                                                                        parent: "branch1_cause_1",
                                                                        branch: "branch1",
                                                                        action_proposal: "",
                                                                        cause_category: "",
                                                                        cause_subcategory: "",
                                                                        action_type: "",
                                                                        assigned_to: "Not assigned yet",
                                                                        assigned_to_object: null,
                                                                        ai_id: "",
                                                                        completion_target_date: null,
                                                                        completion_target_date_string: null,
                                                                        children: [],
                                                                        comments: []
                                                                    }
                                                                ],
                                                                comments: []
                                                            }
                                                        ],
                                                        comments: []
                                                    }
                                                ],
                                                comments: []
                                            }
                                        ],
                                        comments: []
                                    }
                                ],
                                comments: []
                            }
                        ],
                        comments: []
                    }
                ],
                comments: []
            },
            {
                branch_name: "Why root cause was not found with first set of attached symptoms?",
                id: "branch2",
                type: "branch",
                branch_type: "Root Cause Analysis",
                branch: "branch2",
                parent: "case_number",
                assigned_to: "not assigned yet",
                assigned_to_object: null,
                grade: "Not rated yet",
                children: [
                    {
                        id: "branch2_why_1",
                        type: "why_question",
                        active: false,
                        question: "",
                        answer: "",
                        parent: "branch2",
                        branch: "branch2",
                        children: [
                            {
                                id: "branch2_why_2",
                                type: "why_question",
                                active: false,
                                question: "",
                                answer: "",
                                parent: "branch2_why_1",
                                branch: "branch2",
                                children: [
                                    {
                                        id: "branch2_why_3",
                                        type: "why_question",
                                        active: false,
                                        question: "",
                                        answer: "",
                                        parent: "branch2_why_2",
                                        branch: "branch2",
                                        children: [
                                            {
                                                id: "branch2_why_4",
                                                type: "why_question",
                                                active: false,
                                                question: "",
                                                answer: "",
                                                parent: "branch2_why_3",
                                                branch: "branch2",
                                                children: [
                                                    {
                                                        id: "branch2_why_5",
                                                        type: "why_question",
                                                        active: false,
                                                        question: "",
                                                        answer: "",
                                                        parent: "branch2_why_4",
                                                        branch: "branch2",
                                                        children: [
                                                            {
                                                                root_cause: "Root Cause ",
                                                                id: "branch2_cause_1",
                                                                type: "cause",
                                                                active: false,
                                                                statement: "",
                                                                parent: "branch2_why_5",
                                                                branch: "branch2",
                                                                children: [
                                                                    {
                                                                        action: "Action ",
                                                                        id: "branch2_action_1",
                                                                        type: "action",
                                                                        active: false,
                                                                        parent: "branch2_cause_1",
                                                                        branch: "branch2",
                                                                        action_proposal: "",
                                                                        cause_category: "",
                                                                        cause_subcategory: "",
                                                                        action_type: "",
                                                                        assigned_to: "Not assigned yet",
                                                                        assigned_to_object: null,
                                                                        ai_id: "",
                                                                        completion_target_date: null,
                                                                        completion_target_date_string: null,
                                                                        children: [],
                                                                        comments: []
                                                                    }
                                                                ],
                                                                comments: []
                                                            }
                                                        ],
                                                        comments: []
                                                    }
                                                ],
                                                comments: []
                                            }
                                        ],
                                        comments: []
                                    }
                                ],
                                comments: []
                            }
                        ],
                        comments: []
                    }
                ],
                comments: []
            },
            {
                branch_name: "1. Why didn't Requirements reviews catch this defect?",
                id: "branch3",
                type: "branch",
                branch_type: "Escape Defect Analysis",
                branch: "branch3",
                parent: "case_number",
                assigned_to: "not assigned yet",
                assigned_to_object: null,
                grade: "Not rated yet",
                children: [
                    {
                        id: "branch3_why_1",
                        type: "why_question",
                        active: false,
                        question: "",
                        answer: "",
                        parent: "branch3",
                        branch: "branch3",
                        children: [
                            {
                                id: "branch3_why_2",
                                type: "why_question",
                                active: false,
                                question: "",
                                answer: "",
                                parent: "branch3_why_1",
                                branch: "branch3",
                                children: [
                                    {
                                        id: "branch3_why_3",
                                        type: "why_question",
                                        active: false,
                                        question: "",
                                        answer: "",
                                        parent: "branch3_why_2",
                                        branch: "branch3",
                                        children: [
                                            {
                                                id: "branch3_why_4",
                                                type: "why_question",
                                                active: false,
                                                question: "",
                                                answer: "",
                                                parent: "branch3_why_3",
                                                branch: "branch3",
                                                children: [
                                                    {
                                                        id: "branch3_why_5",
                                                        type: "why_question",
                                                        active: false,
                                                        question: "",
                                                        answer: "",
                                                        parent: "branch3_why_4",
                                                        branch: "branch3",
                                                        children: [
                                                            {
                                                                root_cause: "Escape Cause ",
                                                                id: "branch3_cause_1",
                                                                type: "cause",
                                                                active: false,
                                                                statement: "",
                                                                parent: "branch3_why_5",
                                                                branch: "branch3",
                                                                children: [
                                                                    {
                                                                        action: "Action ",
                                                                        id: "branch3_action_1",
                                                                        type: "action",
                                                                        active: false,
                                                                        parent: "branch3_cause_1",
                                                                        branch: "branch3",
                                                                        action_proposal: "",
                                                                        cause_category: "",
                                                                        cause_subcategory: "",
                                                                        action_type: "",
                                                                        assigned_to: "Not assigned yet",
                                                                        assigned_to_object: null,
                                                                        ai_id: "",
                                                                        completion_target_date: null,
                                                                        completion_target_date_string: null,
                                                                        children: [],
                                                                        comments: []
                                                                    }
                                                                ],
                                                                comments: []
                                                            }
                                                        ],
                                                        comments: []
                                                    }
                                                ],
                                                comments: []
                                            }
                                        ],
                                        comments: []
                                    }
                                ],
                                comments: []
                            }
                        ],
                        comments: []
                    }
                ],
                comments: []
            },
            {
                branch_name: "2. Why didn't Design reviews catch this defect?",
                id: "branch4",
                type: "branch",
                branch_type: "Escape Defect Analysis",
                branch: "branch4",
                parent: "case_number",
                assigned_to: "not assigned yet",
                assigned_to_object: null,
                grade: "Not rated yet",
                children: [
                    {
                        id: "branch4_why_1",
                        type: "why_question",
                        active: false,
                        question: "",
                        answer: "",
                        parent: "branch4",
                        branch: "branch4",
                        children: [
                            {
                                id: "branch4_why_2",
                                type: "why_question",
                                active: false,
                                question: "",
                                answer: "",
                                parent: "branch4_why_1",
                                branch: "branch4",
                                children: [
                                    {
                                        id: "branch2_why_3",
                                        type: "why_question",
                                        active: false,
                                        question: "",
                                        answer: "",
                                        parent: "branch4_why_2",
                                        branch: "branch4",
                                        children: [
                                            {
                                                id: "branch4_why_4",
                                                type: "why_question",
                                                active: false,
                                                question: "",
                                                answer: "",
                                                parent: "branch4_why_3",
                                                branch: "branch4",
                                                children: [
                                                    {
                                                        id: "branch4_why_5",
                                                        type: "why_question",
                                                        active: false,
                                                        question: "",
                                                        answer: "",
                                                        parent: "branch4_why_4",
                                                        branch: "branch4",
                                                        children: [
                                                            {
                                                                root_cause: "Escape Cause ",
                                                                id: "branch4_cause_1",
                                                                type: "cause",
                                                                active: false,
                                                                statement: "",
                                                                parent: "branch4_why_5",
                                                                branch: "branch4",
                                                                children: [
                                                                    {
                                                                        action: "Action ",
                                                                        id: "branch4_action_1",
                                                                        type: "action",
                                                                        active: false,
                                                                        parent: "branch4_cause_1",
                                                                        branch: "branch4",
                                                                        action_proposal: "",
                                                                        cause_category: "",
                                                                        cause_subcategory: "",
                                                                        action_type: "",
                                                                        assigned_to: "Not assigned yet",
                                                                        assigned_to_object: null,
                                                                        ai_id: "",
                                                                        completion_target_date: null,
                                                                        completion_target_date_string: null,
                                                                        children: [],
                                                                        comments: []
                                                                    }
                                                                ],
                                                                comments: []
                                                            }
                                                        ],
                                                        comments: []
                                                    }
                                                ],
                                                comments: []
                                            }
                                        ],
                                        comments: []
                                    }
                                ],
                                comments: []
                            }
                        ],
                        comments: []
                    }
                ],
                comments: []
            },
            {
                branch_name: "3. Why didn't code analysis tools such as Klocwork, Purify, etc catch this defect?",
                id: "branch5",
                type: "branch",
                branch_type: "Escape Defect Analysis",
                branch: "branch5",
                parent: "case_number",
                assigned_to: "not assigned yet",
                assigned_to_object: null,
                grade: "Not rated yet",
                children: [
                    {
                        id: "branch5_why_1",
                        type: "why_question",
                        active: false,
                        question: "",
                        answer: "",
                        parent: "branch5",
                        branch: "branch5",
                        children: [
                            {
                                id: "branch5_why_2",
                                type: "why_question",
                                active: false,
                                question: "",
                                answer: "",
                                parent: "branch5_why_1",
                                branch: "branch5",
                                children: [
                                    {
                                        id: "branch5_why_3",
                                        type: "why_question",
                                        active: false,
                                        question: "",
                                        answer: "",
                                        parent: "branch5_why_2",
                                        branch: "branch5",
                                        children: [
                                            {
                                                id: "branch5_why_4",
                                                type: "why_question",
                                                active: false,
                                                question: "",
                                                answer: "",
                                                parent: "branch5_why_3",
                                                branch: "branch5",
                                                children: [
                                                    {
                                                        id: "branch5_why_5",
                                                        type: "why_question",
                                                        active: false,
                                                        question: "",
                                                        answer: "",
                                                        parent: "branch5_why_4",
                                                        branch: "branch5",
                                                        children: [
                                                            {
                                                                root_cause: "Escape Cause ",
                                                                id: "branch5_cause_1",
                                                                type: "cause",
                                                                active: false,
                                                                statement: "",
                                                                parent: "branch5_why_5",
                                                                branch: "branch5",
                                                                children: [
                                                                    {
                                                                        action: "Action ",
                                                                        id: "branch5_action_1",
                                                                        type: "action",
                                                                        active: false,
                                                                        parent: "branch5_cause_1",
                                                                        branch: "branch5",
                                                                        action_proposal: "",
                                                                        cause_category: "",
                                                                        cause_subcategory: "",
                                                                        action_type: "",
                                                                        assigned_to: "Not assigned yet",
                                                                        assigned_to_object: null,
                                                                        ai_id: "",
                                                                        completion_target_date: null,
                                                                        completion_target_date_string: null,
                                                                        children: [],
                                                                        comments: []
                                                                    }
                                                                ],
                                                                comments: []
                                                            }
                                                        ],
                                                        comments: []
                                                    }
                                                ],
                                                comments: []
                                            }
                                        ],
                                        comments: []
                                    }
                                ],
                                comments: []
                            }
                        ],
                        comments: []
                    }
                ],
                comments: []
            },
            {
                branch_name: "4. Why didn't code inspections catch this defect?",
                id: "branch6",
                type: "branch",
                branch_type: "Escape Defect Analysis",
                branch: "branch6",
                parent: "case_number",
                assigned_to: "not assigned yet",
                assigned_to_object: null,
                grade: "Not rated yet",
                children: [
                    {
                        id: "branch6_why_1",
                        type: "why_question",
                        active: false,
                        question: "",
                        answer: "",
                        parent: "branch6",
                        branch: "branch6",
                        children: [
                            {
                                id: "branch6_why_2",
                                type: "why_question",
                                active: false,
                                question: "",
                                answer: "",
                                parent: "branch6_why_1",
                                branch: "branch6",
                                children: [
                                    {
                                        id: "branch6_why_3",
                                        type: "why_question",
                                        active: false,
                                        question: "",
                                        answer: "",
                                        parent: "branch6_why_2",
                                        branch: "branch6",
                                        children: [
                                            {
                                                id: "branch6_why_4",
                                                type: "why_question",
                                                active: false,
                                                question: "",
                                                answer: "",
                                                parent: "branch6_why_3",
                                                branch: "branch6",
                                                children: [
                                                    {
                                                        id: "branch6_why_5",
                                                        type: "why_question",
                                                        active: false,
                                                        question: "",
                                                        answer: "",
                                                        parent: "branch6_why_4",
                                                        branch: "branch6",
                                                        children: [
                                                            {
                                                                root_cause: "Escape Cause ",
                                                                id: "branch6_cause_1",
                                                                type: "cause",
                                                                active: false,
                                                                statement: "",
                                                                parent: "branch6_why_5",
                                                                branch: "branch6",
                                                                children: [
                                                                    {
                                                                        action: "Action ",
                                                                        id: "branch6_action_1",
                                                                        type: "action",
                                                                        active: false,
                                                                        parent: "branch6_cause_1",
                                                                        branch: "branch6",
                                                                        action_proposal: "",
                                                                        cause_category: "",
                                                                        cause_subcategory: "",
                                                                        action_type: "",
                                                                        assigned_to: "Not assigned yet",
                                                                        assigned_to_object: null,
                                                                        ai_id: "",
                                                                        completion_target_date: null,
                                                                        completion_target_date_string: null,
                                                                        children: [],
                                                                        comments: []
                                                                    }
                                                                ],
                                                                comments: []
                                                            }
                                                        ],
                                                        comments: []
                                                    }
                                                ],
                                                comments: []
                                            }
                                        ],
                                        comments: []
                                    }
                                ],
                                comments: []
                            }
                        ],
                        comments: []
                    }
                ],
                comments: []
            },
            {
                branch_name: "5. Why didn't unit or component test catch this defect?",
                id: "branch7",
                type: "branch",
                branch_type: "Escape Defect Analysis",
                branch: "branch7",
                parent: "case_number",
                assigned_to: "not assigned yet",
                assigned_to_object: null,
                grade: "Not rated yet",
                children: [
                    {
                        id: "branch7_why_1",
                        type: "why_question",
                        active: false,
                        question: "",
                        answer: "",
                        parent: "branch7",
                        branch: "branch7",
                        children: [
                            {
                                id: "branch7_why_2",
                                type: "why_question",
                                active: false,
                                question: "",
                                answer: "",
                                parent: "branch7_why_1",
                                branch: "branch7",
                                children: [
                                    {
                                        id: "branch7_why_3",
                                        type: "why_question",
                                        active: false,
                                        question: "",
                                        answer: "",
                                        parent: "branch7_why_2",
                                        branch: "branch7",
                                        children: [
                                            {
                                                id: "branch7_why_4",
                                                type: "why_question",
                                                active: false,
                                                question: "",
                                                answer: "",
                                                parent: "branch7_why_3",
                                                branch: "branch7",
                                                children: [
                                                    {
                                                        id: "branch7_why_5",
                                                        type: "why_question",
                                                        active: false,
                                                        question: "",
                                                        answer: "",
                                                        parent: "branch7_why_4",
                                                        branch: "branch7",
                                                        children: [
                                                            {
                                                                root_cause: "Escape Cause ",
                                                                id: "branch7_cause_1",
                                                                type: "cause",
                                                                active: false,
                                                                statement: "",
                                                                parent: "branch7_why_5",
                                                                branch: "branch7",
                                                                children: [
                                                                    {
                                                                        action: "Action ",
                                                                        id: "branch7_action_1",
                                                                        type: "action",
                                                                        active: false,
                                                                        parent: "branch7_cause_1",
                                                                        branch: "branch7",
                                                                        action_proposal: "",
                                                                        cause_category: "",
                                                                        cause_subcategory: "",
                                                                        action_type: "",
                                                                        assigned_to: "Not assigned yet",
                                                                        assigned_to_object: null,
                                                                        ai_id: "",
                                                                        completion_target_date: null,
                                                                        completion_target_date_string: null,
                                                                        children: [],
                                                                        comments: []
                                                                    }
                                                                ],
                                                                comments: []
                                                            }
                                                        ],
                                                        comments: []
                                                    }
                                                ],
                                                comments: []
                                            }
                                        ],
                                        comments: []
                                    }
                                ],
                                comments: []
                            }
                        ],
                        comments: []
                    }
                ],
                comments: []
            },
            {
                branch_name: "6. Why didn't Entity Test test catch this defect?",
                id: "branch8",
                type: "branch",
                branch_type: "Escape Defect Analysis",
                branch: "branch8",
                parent: "case_number",
                assigned_to: "not assigned yet",
                assigned_to_object: null,
                grade: "Not rated yet",
                children: [
                    {
                        id: "branch8_why_1",
                        type: "why_question",
                        active: false,
                        question: "",
                        answer: "",
                        parent: "branch8",
                        branch: "branch8",
                        children: [
                            {
                                id: "branch8_why_2",
                                type: "why_question",
                                active: false,
                                question: "",
                                answer: "",
                                parent: "branch8_why_1",
                                branch: "branch8",
                                children: [
                                    {
                                        id: "branch8_why_3",
                                        type: "why_question",
                                        active: false,
                                        question: "",
                                        answer: "",
                                        parent: "branch8_why_2",
                                        branch: "branch8",
                                        children: [
                                            {
                                                id: "branch8_why_4",
                                                type: "why_question",
                                                active: false,
                                                question: "",
                                                answer: "",
                                                parent: "branch8_why_3",
                                                branch: "branch8",
                                                children: [
                                                    {
                                                        id: "branch8_why_5",
                                                        type: "why_question",
                                                        active: false,
                                                        question: "",
                                                        answer: "",
                                                        parent: "branch8_why_4",
                                                        branch: "branch8",
                                                        children: [
                                                            {
                                                                root_cause: "Escape Cause ",
                                                                id: "branch8_cause_1",
                                                                type: "cause",
                                                                active: false,
                                                                statement: "",
                                                                parent: "branch8_why_5",
                                                                branch: "branch8",
                                                                children: [
                                                                    {
                                                                        action: "Action ",
                                                                        id: "branch8_action_1",
                                                                        type: "action",
                                                                        active: false,
                                                                        parent: "branch8_cause_1",
                                                                        branch: "branch8",
                                                                        action_proposal: "",
                                                                        cause_category: "",
                                                                        cause_subcategory: "",
                                                                        action_type: "",
                                                                        assigned_to: "Not assigned yet",
                                                                        assigned_to_object: null,
                                                                        ai_id: "",
                                                                        completion_target_date: null,
                                                                        completion_target_date_string: null,
                                                                        children: [],
                                                                        comments: []
                                                                    }
                                                                ],
                                                                comments: []
                                                            }
                                                        ],
                                                        comments: []
                                                    }
                                                ],
                                                comments: []
                                            }
                                        ],
                                        comments: []
                                    }
                                ],
                                comments: []
                            }
                        ],
                        comments: []
                    }
                ],
                comments: []
            },
            {
                branch_name: "Why didn't ET automated test cases  catch this defect?",
                id: "branch9",
                type: "branch",
                branch_type: "Escape Defect Analysis",
                branch: "branch9",
                parent: "case_number",
                assigned_to: "not assigned yet",
                assigned_to_object: null,
                grade: "Not rated yet",
                children: [
                    {
                        id: "branch9_why_1",
                        type: "why_question",
                        active: false,
                        question: "",
                        answer: "",
                        parent: "branch9",
                        branch: "branch9",
                        children: [
                            {
                                id: "branch9_why_2",
                                type: "why_question",
                                active: false,
                                question: "",
                                answer: "",
                                parent: "branch9_why_1",
                                branch: "branch9",
                                children: [
                                    {
                                        id: "branch9_why_3",
                                        type: "why_question",
                                        active: false,
                                        question: "",
                                        answer: "",
                                        parent: "branch9_why_2",
                                        branch: "branch9",
                                        children: [
                                            {
                                                id: "branch9_why_4",
                                                type: "why_question",
                                                active: false,
                                                question: "",
                                                answer: "",
                                                parent: "branch9_why_3",
                                                branch: "branch9",
                                                children: [
                                                    {
                                                        id: "branch9_why_5",
                                                        type: "why_question",
                                                        active: false,
                                                        question: "",
                                                        answer: "",
                                                        parent: "branch9_why_4",
                                                        branch: "branch9",
                                                        children: [
                                                            {
                                                                root_cause: "Escape Cause ",
                                                                id: "branch9_cause_1",
                                                                type: "cause",
                                                                active: false,
                                                                statement: "",
                                                                parent: "branch9_why_5",
                                                                branch: "branch9",
                                                                children: [
                                                                    {
                                                                        action: "Action ",
                                                                        id: "branch9_action_1",
                                                                        type: "action",
                                                                        active: false,
                                                                        parent: "branch9_cause_1",
                                                                        branch: "branch9",
                                                                        action_proposal: "",
                                                                        cause_category: "",
                                                                        cause_subcategory: "",
                                                                        action_type: "",
                                                                        assigned_to: "Not assigned yet",
                                                                        assigned_to_object: null,
                                                                        ai_id: "",
                                                                        completion_target_date: null,
                                                                        completion_target_date_string: null,
                                                                        children: [],
                                                                        comments: []
                                                                    }
                                                                ],
                                                                comments: []
                                                            }
                                                        ],
                                                        comments: []
                                                    }
                                                ],
                                                comments: []
                                            }
                                        ],
                                        comments: []
                                    }
                                ],
                                comments: []
                            }
                        ],
                        comments: []
                    }
                ],
                comments: []
            },
            {
                branch_name: "7. Why didn't System Test catch this defect?",
                id: "branch10",
                type: "branch",
                branch_type: "Escape Defect Analysis",
                branch: "branch10",
                parent: "case_number",
                assigned_to: "not assigned yet",
                assigned_to_object: null,
                grade: "Not rated yet",
                children: [
                    {
                        id: "branch10_why_1",
                        type: "why_question",
                        active: false,
                        question: "",
                        answer: "",
                        parent: "branch10",
                        branch: "branch10",
                        children: [
                            {
                                id: "branch10_why_2",
                                type: "why_question",
                                active: false,
                                question: "",
                                answer: "",
                                parent: "branch10_why_1",
                                branch: "branch10",
                                children: [
                                    {
                                        id: "branch10_why_3",
                                        type: "why_question",
                                        active: false,
                                        question: "",
                                        answer: "",
                                        parent: "branch10_why_2",
                                        branch: "branch10",
                                        children: [
                                            {
                                                id: "branch10_why_4",
                                                type: "why_question",
                                                active: false,
                                                question: "",
                                                answer: "",
                                                parent: "branch10_why_3",
                                                branch: "branch9",
                                                children: [
                                                    {
                                                        id: "branch10_why_5",
                                                        type: "why_question",
                                                        active: false,
                                                        question: "",
                                                        answer: "",
                                                        parent: "branch10_why_4",
                                                        branch: "branch10",
                                                        children: [
                                                            {
                                                                root_cause: "Escape Cause ",
                                                                id: "branch10_cause_1",
                                                                type: "cause",
                                                                active: false,
                                                                statement: "",
                                                                parent: "branch10_why_5",
                                                                branch: "branch10",
                                                                children: [
                                                                    {
                                                                        action: "Action ",
                                                                        id: "branch10_action_1",
                                                                        type: "action",
                                                                        active: false,
                                                                        parent: "branch10_cause_1",
                                                                        branch: "branch10",
                                                                        action_proposal: "",
                                                                        cause_category: "",
                                                                        cause_subcategory: "",
                                                                        action_type: "",
                                                                        assigned_to: "Not assigned yet",
                                                                        assigned_to_object: null,
                                                                        ai_id: "",
                                                                        completion_target_date: null,
                                                                        completion_target_date_string: null,
                                                                        children: [],
                                                                        comments: []
                                                                    }
                                                                ],
                                                                comments: []
                                                            }
                                                        ],
                                                        comments: []
                                                    }
                                                ],
                                                comments: []
                                            }
                                        ],
                                        comments: []
                                    }
                                ],
                                comments: []
                            }
                        ],
                        comments: []
                    }
                ],
                comments: []
            },
            {
                branch_name: "Why didn't ST automated test cases  catch this defect?",
                id: "branch11",
                type: "branch",
                branch_type: "Escape Defect Analysis",
                branch: "branch11",
                parent: "case_number",
                assigned_to: "not assigned yet",
                assigned_to_object: null,
                grade: "Not rated yet",
                children: [
                    {
                        id: "branch11_why_1",
                        type: "why_question",
                        active: false,
                        question: "",
                        answer: "",
                        parent: "branch11",
                        branch: "branch11",
                        children: [
                            {
                                id: "branch11_why_2",
                                type: "why_question",
                                active: false,
                                question: "",
                                answer: "",
                                parent: "branch11_why_1",
                                branch: "branch11",
                                children: [
                                    {
                                        id: "branch11_why_3",
                                        type: "why_question",
                                        active: false,
                                        question: "",
                                        answer: "",
                                        parent: "branch11_why_2",
                                        branch: "branch11",
                                        children: [
                                            {
                                                id: "branch11_why_4",
                                                type: "why_question",
                                                active: false,
                                                question: "",
                                                answer: "",
                                                parent: "branch11_why_3",
                                                branch: "branch11",
                                                children: [
                                                    {
                                                        id: "branch11_why_5",
                                                        type: "why_question",
                                                        active: false,
                                                        question: "",
                                                        answer: "",
                                                        parent: "branch11_why_4",
                                                        branch: "branch11",
                                                        children: [
                                                            {
                                                                root_cause: "Escape Cause ",
                                                                id: "branch11_cause_1",
                                                                type: "cause",
                                                                active: false,
                                                                statement: "",
                                                                parent: "branch11_why_5",
                                                                branch: "branch11",
                                                                children: [
                                                                    {
                                                                        action: "Action ",
                                                                        id: "branch11_action_1",
                                                                        type: "action",
                                                                        active: false,
                                                                        parent: "branch11_cause_1",
                                                                        branch: "branch11",
                                                                        action_proposal: "",
                                                                        cause_category: "",
                                                                        cause_subcategory: "",
                                                                        action_type: "",
                                                                        assigned_to: "Not assigned yet",
                                                                        assigned_to_object: null,
                                                                        ai_id: "",
                                                                        completion_target_date: null,
                                                                        completion_target_date_string: null,
                                                                        children: [],
                                                                        comments: []
                                                                    }
                                                                ],
                                                                comments: []
                                                            }
                                                        ],
                                                        comments: []
                                                    }
                                                ],
                                                comments: []
                                            }
                                        ],
                                        comments: []
                                    }
                                ],
                                comments: []
                            }
                        ],
                        comments: []
                    }
                ],
                comments: []
            }
        ]
    }

}