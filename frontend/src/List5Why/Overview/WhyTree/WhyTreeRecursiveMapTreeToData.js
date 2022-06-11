import moment from "moment";
import axios from "../../../axios/axios";
import {displayWhyTree} from "./WhyTreeRecursiveMapDataToTree";


//function that maps tree comments data to comments data that will be send to server/database
export const mapTreeCommentsToData = (comments) => {
    let commentsData = []

    if(comments && comments.length !== 0) {
        for(let c = 0; c < comments.length; c++) {

            let answers = []

            commentsData.push({
                author_display_name: comments[c].author,
                author_uid: comments[c].author_uid,
                content: comments[c].content,
                created_at: comments[c].createdAt,
                updated_at: comments[c].editedAt,
                answers: answers
            })

            if(comments[c].answers && comments[c].answers !== 0) {

                let answersData = comments[c].answers

                for(let a = 0; a < answersData.length; a++) {

                    answers.push({
                        author_display_name: answersData[a].author,
                        author_uid: answersData[a].author_uid,
                        content: answersData[a].content,
                        created_at: answersData[a].createdAt,
                        updated_at: answersData[a].editedAt
                    })
                }
            }
        }
    }

    return commentsData
}


//function that maps recursively tree data to data that will be send to server/database
export const mapBranchTreeToDataRecursively = (objChildren, rt_cse, treeBranchData, index) => {

    if(treeBranchData && treeBranchData[index] && treeBranchData[index] !== null && treeBranchData[index] !== undefined && treeBranchData[index].type &&
    treeBranchData[index].type !== null && treeBranchData[index].type !== undefined && treeBranchData[index].type === "why_question") {

        let children = [];
        let root_cause = {};

        let isRootCause = null
        if(treeBranchData[index]["children"]) {
        for(let c=0; c<treeBranchData[index]["children"].length; c++)
            {
                if(treeBranchData[index]["children"][c].type === "cause") {
                    isRootCause = root_cause
                }
            }
        }

        objChildren.push({
            question: treeBranchData[index].question,
            answer: treeBranchData[index].answer,
            root_cause: isRootCause,
            children: children,
            comments: mapTreeCommentsToData(treeBranchData[index].comments.commentList)
        })

        if(index + 1 < treeBranchData.length) {
            if (treeBranchData[index + 1].type === "cause" && rt_cse !== null) {
                mapBranchTreeToDataRecursively(rt_cse, rt_cse, treeBranchData, index + 1)
                if (index + 2 < treeBranchData.length) {
                    mapBranchTreeToDataRecursively(children, rt_cse, treeBranchData, index + 2)
                }
            }
            else if(treeBranchData[index + 1].type === "why_question") {
                mapBranchTreeToDataRecursively(children, rt_cse, treeBranchData, index + 1)
            }
        }

        if(treeBranchData[index].children && treeBranchData[index]["children"][0] &&
        treeBranchData[index]["children"][0].type === "why_question") {
            mapBranchTreeToDataRecursively(objChildren, root_cause, treeBranchData[index].children, 0)
        }
        else if(treeBranchData[index].children && treeBranchData[index]["children"][0] &&
        treeBranchData[index]["children"][0].type === "cause") {
            mapBranchTreeToDataRecursively(root_cause, root_cause, treeBranchData[index].children, 0)
            if(treeBranchData[index]["children"].length > 1)
                mapBranchTreeToDataRecursively(objChildren, root_cause, treeBranchData[index].children, 1)
        }


    }
    else if(treeBranchData[index].type && treeBranchData[index].type !== null
    && treeBranchData[index].type !== undefined && treeBranchData[index].type === "cause") {

        let actions = [];

        let root_cause =  {
            actions: actions,
            statement: treeBranchData[index].statement,
            comments: mapTreeCommentsToData(treeBranchData[index].comments.commentList)
        }

        Object.assign(objChildren, root_cause);


        if(treeBranchData[index].children && treeBranchData[index]["children"][0] &&
        treeBranchData[index]["children"][0].type === "action") {

            for(let a=0; a<treeBranchData[index]["children"].length; a++) {
                mapBranchTreeToDataRecursively(actions, root_cause, treeBranchData[index].children, a)
            }
        }
    }

    else if(treeBranchData[index] && treeBranchData[index] !== null && treeBranchData[index].type && treeBranchData[index].type !== null
    && treeBranchData[index].type !== undefined && treeBranchData[index].type === "action") {
       objChildren.push({
            action_proposal: treeBranchData[index].action_proposal,
            cause_category: treeBranchData[index].cause_category,
            cause_subcategory: treeBranchData[index].cause_subcategory,
            action_type: treeBranchData[index].action_type,
            assigned_to: treeBranchData[index].assigned_to_object,
            ai_id: treeBranchData[index].ai_id,
            completion_target_date: treeBranchData[index].completion_target_date !== null ?  moment.utc(treeBranchData[index].completion_target_date).format().toString() : null,
            comments: mapTreeCommentsToData(treeBranchData[index].comments.commentList)
       })
    }

}

//function that starts recursively mapping tree data to data that will be send to server/database
export const mapBranchTreeToData = (data, branch_number) => {
    let children = []

    let branchData = {
        assigned_to: data["children"][branch_number].assigned_to_object,
        grade: data["children"][branch_number].grade,
        jira_key: data["children"][branch_number].jira_key,
        children: children,
        comments: mapTreeCommentsToData(data["children"][branch_number].comments.commentList)
    }

    if(data["children"][branch_number]["children"] && data["children"][branch_number]["children"].length !==0) {
        mapBranchTreeToDataRecursively(children, null, data["children"][branch_number]["children"], 0)
    }

    return branchData
}


//function responsible for saving changed 5why form
export const saveFiveWhyForm = (state, branch, overviewProps) => {

    state.setState({
        loading: true,
        refreshDisabled: true,
        saveDisabled: true,
    })

    let data = {};

    if(branch === "branch1") {
        data = {
            fault_analysis_id: state.state.fetchedData.fault_analysis_id,
            rca_fault_introduced: mapBranchTreeToData(state.state.data, 0),
        }
    }
    else if(branch === "branch2") {
        data = {
            fault_analysis_id: state.state.fetchedData.fault_analysis_id,
            rca_not_found_on_review: mapBranchTreeToData(state.state.data, 1),
        }
    }
    else if(branch === "branch3") {
        data = {
            fault_analysis_id: state.state.fetchedData.fault_analysis_id,
            eda_requirements_reviews: mapBranchTreeToData(state.state.data, 2),
        }
    }
    else if(branch === "branch4") {
        data = {
            fault_analysis_id: state.state.fetchedData.fault_analysis_id,
            eda_design_reviews: mapBranchTreeToData(state.state.data, 3),
        }
    }
    else if(branch === "branch5") {
        data = {
            fault_analysis_id: state.state.fetchedData.fault_analysis_id,
            eda_code_analysis_tools: mapBranchTreeToData(state.state.data, 4),
        }
    }
    else if(branch === "branch6") {
        data = {
            fault_analysis_id: state.state.fetchedData.fault_analysis_id,
            eda_code_inspections: mapBranchTreeToData(state.state.data, 5),
        }
    }
    else if(branch === "branch7") {
        data = {
            fault_analysis_id: state.state.fetchedData.fault_analysis_id,
            eda_unit_component_test: mapBranchTreeToData(state.state.data, 6),
        }
    }
    else if(branch === "branch8") {
        data = {
            fault_analysis_id: state.state.fetchedData.fault_analysis_id,
            eda_entity_test: mapBranchTreeToData(state.state.data, 7),
        }
    }
    else if(branch === "branch9") {
        data = {
            fault_analysis_id: state.state.fetchedData.fault_analysis_id,
            eda_et_automated_test: mapBranchTreeToData(state.state.data, 8),
        }
    }
    else if(branch === "branch10") {
        data = {
            fault_analysis_id: state.state.fetchedData.fault_analysis_id,
            eda_system_test: mapBranchTreeToData(state.state.data, 9),
        }
    }
    else if(branch === "branch11") {
        data = {
            fault_analysis_id: state.state.fetchedData.fault_analysis_id,
            eda_st_automated_test: mapBranchTreeToData(state.state.data, 10),
        }
    }
    else {
        data = {
            fault_analysis_id: state.state.fetchedData.fault_analysis_id,
            rca_fault_introduced: mapBranchTreeToData(state.state.data, 0),
            rca_not_found_on_review: mapBranchTreeToData(state.state.data, 1),
            eda_requirements_reviews: mapBranchTreeToData(state.state.data, 2),
            eda_design_reviews: mapBranchTreeToData(state.state.data, 3),
            eda_code_analysis_tools: mapBranchTreeToData(state.state.data, 4),
            eda_code_inspections: mapBranchTreeToData(state.state.data, 5),
            eda_unit_component_test: mapBranchTreeToData(state.state.data, 6),
            eda_entity_test: mapBranchTreeToData(state.state.data, 7),
            eda_et_automated_test: mapBranchTreeToData(state.state.data, 8),
            eda_system_test: mapBranchTreeToData(state.state.data, 9),
            eda_st_automated_test: mapBranchTreeToData(state.state.data, 10),
        }
    }




    if(state.state.status === 3 || state.state.status === 4) {
        axios.put('/rcaeda/' + state.state.fetchedData.case_number + '/', data,
            {
                headers: {'Authorization': `Token ${localStorage.token}`}
            }).then(response => {
            if (response.status === 200) {
                overviewProps.refreshSummaryTable();
                displayWhyTree(response.data, state)


                state.setState({
                    loading: false,
                    status: 2,
                    refreshDisabled: false,
                    saveDisabled: false,
                }, overviewProps.updateOverviewUnsavedChangesFlag(false));
            } else {
                state.setState({
                    loading: false,
                    status: 4,
                    refreshDisabled: false,
                    saveDisabled: false,
                })
            }
        }).catch(error => {
            if (error.response && error.response.status === 500) {
                state.setState({
                    loading: false,
                    status: 4,
                    refreshDisabled: false,
                    saveDisabled: false,
                })
            } else {
                state.setState({
                    loading: false,
                    status: 4,
                    refreshDisabled: false,
                    saveDisabled: false,
                })
            }
        })
    }
    else {
        setTimeout(() => {
        state.setState({
            loading: false,
            refreshDisabled: false,
            saveDisabled: false,
        })
        },2500);
    }
}