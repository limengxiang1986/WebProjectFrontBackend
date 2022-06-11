import {checkIfNotAnswered, idGenerator} from "./WhyTreeCommonFunctions";
import {formatDateTimeOnlyDate} from "../../../CommonComponents/Utils";


//map comments data to comments in the tree
export const mapCommentsData = (comments) => {

    let mappedComments = {
            commentList: [],
            numberOfComments: 0,
            notAnswered: false
    }


    if(comments && comments !== null && comments !== undefined && comments.length !== 0) {
        let commentList = []

        for (let c = 0; c < comments.length; c++) {
            let answers = []

            commentList.push({
                author: comments[c].author_display_name,
                author_uid: comments[c].author_uid,
                content: comments[c].content,
                id: idGenerator(),
                createdAt: comments[c].created_at,
                editedAt: comments[c].updated_at,
                answers: answers
            })

            if(comments[c].answers && comments !== null && comments !== undefined && comments[c].answers.length !== 0) {

                let answersData = comments[c].answers

                for (let a = 0; a < answersData.length; a++) {
                    answers.push({
                        author: answersData[a].author_display_name,
                        author_uid: answersData[a].author_uid,
                        content: answersData[a].content,
                        id: idGenerator(),
                        createdAt: answersData[a].created_at,
                        editedAt: answersData[a].updated_at,
                    })
                }
            }
        }

        mappedComments.commentList = commentList
        mappedComments.numberOfComments = commentList.length
        mappedComments.notAnswered = checkIfNotAnswered(commentList)


    }

    return mappedComments
}


//map data to tree branch children
export const mapDataToBranchTreeRecursively = (objChildren, data, branch, branch_type, parent, index) => {

    if (data && data !== null && data !== undefined && data[index]) {
        let children = [];

        // please do not change that (this id is used for optimise TextArea onChange function)
        let id = branch + "_why_" + idGenerator();

        objChildren.push({
            id: id,
            type: "why_question",
            active: data[index].question !== "" || data[index].answer !== "",
            question: data[index].question,
            answer: data[index].answer,
            parent: parent,
            branch: branch,
            branch_type: branch_type,
            children: children,
            comments: data[index].comments ? mapCommentsData(data[index].comments) : mapCommentsData(null)
        })

        if (data[index].children && data[index].children !== null && data[index].children !== undefined && data[index].children.length !== 0) {
            mapDataToBranchTreeRecursively(objChildren, data[index].children, branch, branch_type, parent, 0)
        }


        if (data[index].root_cause && data[index].root_cause !== null) {

            let actions = [];
            let cause_id = branch + "_cause_" + idGenerator();
            let cData = data[index].root_cause;

            children.push({
                cause: branch_type === "RCA" ? "Root Cause" : "Escape Cause",
                id: cause_id,
                type: "cause",
                active: cData.statement !== "",
                statement: cData.statement,
                parent: id,
                branch: branch,
                branch_type: branch_type,
                children: actions,
                comments: cData.comments ? mapCommentsData(cData.comments) : mapCommentsData(null)
            })

            if (cData.actions && cData.actions.length !== 0) {
                let aData = cData.actions;

                for (let a = 0; a < aData.length; a++) {
                    let action_id = branch + "_action_" + idGenerator();

                    actions.push({
                        action: "Action ",
                        id: action_id,
                        type: "action",
                        active: (aData[a].action_proposal !== "" && aData[a].action_proposal !== null) ||
                            (aData[a].cause_category !== "" && aData[a].cause_category !== null ) ||
                            (aData[a].cause_subcategory !== "" && aData[a].cause_subcategory !== null) ||
                            (aData[a].action_type !== "" && aData[a].action_type !== null) ||
                            (aData[a].assigned_to !== "" && aData[a].assigned_to !== null) ||
                            (aData[a].ai_id !== "" && aData[a].ai_id !== null) ||
                            (aData[a].completion_target_date !== null),
                        parent: cause_id,
                        branch: branch,
                        branch_type: branch_type,
                        action_proposal: aData[a].action_proposal,
                        cause_category: aData[a].cause_category,
                        cause_subcategory: aData[a].cause_subcategory,
                        action_type: aData[a].action_type,
                        assigned_to: aData[a].assigned_to && aData[a].assigned_to !== null ? aData[a].assigned_to.label : "Not assigned",
                        assigned_to_object: aData[a].assigned_to,
                        ai_id: aData[a].ai_id,
                        completion_target_date: aData[a].completion_target_date !== null ? aData[a].completion_target_date : null,
                        completion_target_date_string: aData[a].completion_target_date !== null ?
                            formatDateTimeOnlyDate(aData[a].completion_target_date) : "",
                        children: [],
                        comments: aData[a].comments ? mapCommentsData(aData[a].comments) : mapCommentsData(null)
                    });
                }
            }
        }

        if (index + 1 < data.length) {
            mapDataToBranchTreeRecursively(children, data, branch, branch_type, id, index + 1)
        }
    }
}


//map data to the tree branch and start mapping its children
export const mapDataToBranchTree = (branch_name, index, branch_type, data, case_number) => {
    let branchObj = {
        branch_name: branch_name,
        id: "branch" + index,
        type: "branch",
        branch_type: branch_type,
        branch: "branch" + index,
        parent: case_number,
        jira_key: data !== undefined && data !== null && data.jira_key !== null ? data.jira_key : null,
        assigned_to: data !== undefined && data !== null && data.assigned_to !== undefined && data.assigned_to !== null && data.assigned_to.label ? data.assigned_to.label : "Not assigned",
        assigned_to_object: data !== undefined && data !== null && data.assigned_to !== null && data.assigned_to !== undefined ? data.assigned_to : null,
        grade: data !== undefined && data !== null && data.grade !== null ? data.grade : "Not rated yet",
        children: [],
        comments: data !== undefined && data !== null && data.comments !== null && data.comments !== undefined ? mapCommentsData(data.comments) : mapCommentsData(null)
    }

    if (data !== undefined && data !== null) {
        if (data.children && data.children.length !== 0) {
            mapDataToBranchTreeRecursively(branchObj.children, data.children, "branch" + index, branch_type, "branch" + index, 0)
        }
    }

    return branchObj
}


//start recursion that is mapping data to the tree structure
export const displayWhyTree = (nextProps, state) => {

    //create WhyTree
    let whyTreeData = {
        form_name: nextProps.case_number,
        id: nextProps.case_number,
        type: "root",
        children: []
    }


    //rca related
    let branch1 //why_fault_introduced
    let branch2; //why_not_found_on_review

    branch1 = mapDataToBranchTree("Why the fault was introduced?", 1, "RCA",
        nextProps["rca_fault_introduced"], nextProps.case_number)


    branch2 = mapDataToBranchTree("Why root cause was not found with first set of attached symptoms?", 2, "RCA",
        nextProps["rca_not_found_on_review"], nextProps.case_number)

    //eda related
    let branch3; //why_requirements_reviews
    let branch4; //why_design_reviews
    let branch5; //why_code_analysis_tools
    let branch6; //why_code_inspections
    let branch7; //why_unit_component_test
    let branch8; //why_entity_test
    let branch9; //why_et_automated_test
    let branch10; //why_system_test
    let branch11; //why_st_automated_test

    branch3 = mapDataToBranchTree("1. Why didn't Requirements reviews catch this defect?", 3, "EDA",
        nextProps["eda_requirements_reviews"], nextProps.case_number)

    branch4 = mapDataToBranchTree("2. Why didn't Design reviews catch this defect??", 4, "EDA",
        nextProps["eda_design_reviews"], nextProps.case_number)

    branch5 = mapDataToBranchTree("3. Why didn't code analysis tools such as Klocwork, Purify, etc catch this defect?", 5, "EDA",
        nextProps["eda_code_analysis_tools"], nextProps.case_number)

    branch6 = mapDataToBranchTree("4. Why didn't code inspections catch this defect?", 6, "EDA",
        nextProps["eda_code_inspections"], nextProps.case_number)

    branch7 = mapDataToBranchTree("5. Why didn't unit or component test catch this defect?", 7, "EDA",
        nextProps["eda_unit_component_test"], nextProps.case_number)

    branch8 = mapDataToBranchTree("6. Why didn't Entity Test test catch this defect?", 8, "EDA",
        nextProps["eda_entity_test"], nextProps.case_number)

    branch9 = mapDataToBranchTree("Why didn't ET automated test cases  catch this defect?", 9, "EDA",
        nextProps["eda_et_automated_test"], nextProps.case_number)

    branch10 = mapDataToBranchTree("7. Why didn't System Test catch this defect?", 10, "EDA",
        nextProps["eda_system_test"], nextProps.case_number)

    branch11 = mapDataToBranchTree("Why didn't ST automated test cases  catch this defect?", 11, "EDA",
        nextProps["eda_st_automated_test"], nextProps.case_number)


    whyTreeData.children.push(
        branch1,
        branch2,
        branch3,
        branch4,
        branch5,
        branch6,
        branch7,
        branch8,
        branch9,
        branch10,
        branch11,
    )


    state.setState({
        data: whyTreeData,
        status: 1,
    }, () => {
        state.props.alignWhyTreeWithCurrentData(state.state.data, state.state.status, state.state.whyTreeBoxHeight,
        state.state.zoomLevel)
    })
}