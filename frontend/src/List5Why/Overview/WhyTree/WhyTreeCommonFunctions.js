import axios from "../../../axios/axios";
import {displayWhyTree} from "./WhyTreeRecursiveMapDataToTree";
import {message} from "antd";
import _ from "lodash";

//function/method that allows us to find the concrete node of a tree based on its title
export const findObjectByLabel = (object, label) => {
    if (object.hasOwnProperty('id') && object["id"] === label) {
        return object
    }

    if(object["children"] && object["children"].length !== 0) {
        for (let i = 0; i < object["children"].length; i++) {
            let o = findObjectByLabel(object["children"][i], label);
            if (o != null) return o;
        }
    }

    return null;
}

export const findAndChangeObjectById = (object, data, id, children = null) => {
    if (children === null) {
        // finding first parent of tree branch for root "why question"
        let id = data["id"];
        let firstChildId = id.substring(6, id.indexOf("_")) - 1;
        children = object["children"][firstChildId];
    }
    if (children && children.hasOwnProperty('id') && children["id"] === id) {
        if (data.type === "why_question") {
            children.question = data.question;
            children.answer = data.answer;
            children.active = data.question !== "" || data.answer !== "";
        }
        else if (data.type === "cause") {
            children.statement = data.statement;
            children.active = data.statement !== "";
        }
        else if (data.type === "action") {
            children.action_proposal = data.action_proposal;
            children.action_type = data.action_type;
            children.cause_category = data.cause_category;
            children.cause_subcategory = data.cause_subcategory;
            children.assigned_to_object = data.assigned_to_object;
            children.assigned_to = data.assigned_to !== "Not assigned" ? data.assigned_to : "";
            children.ai_id = data.ai_id;
            children.completion_target_date_string = data.completion_target_date_string;
            children.completion_target_date = data.completion_target_date;
            children.active = (children.action_proposal !== "" && children.action_proposal !== null) ||
                (children.cause_category !== "" && children.cause_category !== null ) ||
                (children.cause_subcategory !== "" && children.cause_subcategory !== null) ||
                (children.action_type !== "" && children.action_type !== null) ||
                (children.assigned_to !== "" && children.assigned_to !== null) ||
                (children.ai_id !== "" && children.ai_id !== null) ||
                (children.completion_target_date !== null);
        }
        return children;
    }

    if (children && children["children"] && children["children"].length !== 0) {
        for (let i = 0; i < children["children"].length; i++) {
            let foundChildren = findAndChangeObjectById(object, data, id, children["children"][i]);
            if (foundChildren != null) {
                return object;
            }
        }
    }
    return null;
}


//function responsible for ID generation that its used to identify tree nodes
export const idGenerator = () => {
    let S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}


//function that checks if there are any not answered comments
export const checkIfNotAnswered = (commentList) => {
    let result = false
    if(commentList  && commentList.length !== 0) {
        commentList.forEach((comment) => {
            if (comment.hasOwnProperty("answers")) {
                if (comment.answers.length === 0) {
                    result = true
                }
            }
        })
    }

    return result
}


//function that returns the number of rows recursively in the 5Why Tree branch
export const getNumberOfRowsRecursively = (numberOfRows, rowData) => {
    if (rowData && rowData.children) {
        if (rowData.children.length > 1) {
            numberOfRows.numberOfRows = numberOfRows.numberOfRows + rowData.children.length - 1
        }

        if (rowData.children.length !== 0) {
            for (let r = 0; r < rowData.children.length; r++) {
                getNumberOfRowsRecursively(numberOfRows, rowData.children[r])
            }
        }
    }
}


//function that returns the number of rows in the 5Why Tree branch
export const getNumberOfRowsIn5WhyTree = (branchData) => {
   let numberOfRows = {
       numberOfRows: 1
   }

    if(branchData && branchData.children) {
        if(branchData.children.length > 1)
                   numberOfRows.numberOfRows = branchData.children.length
        if(branchData.children.length !== 0) {
            for (let r = 0; r < branchData.children.length; r++) {
                getNumberOfRowsRecursively(numberOfRows, branchData.children[r])
            }
        }
   }

   return numberOfRows.numberOfRows
}


//function that compares two objects and returns the difference
export const getObjectsDiff = (obj1, obj2) => {
    const diff = Object.keys(obj1).reduce((result, key) => {
        if (!obj2.hasOwnProperty(key)) {
            result.push(key);
        } else if (_.isEqual(obj1[key], obj2[key])) {
            const resultKeyIndex = result.indexOf(key);
            result.splice(resultKeyIndex, 1);
        }
        return result;
    }, Object.keys(obj2));

    return diff;
}


//function responsible for fetching why tree form data from database
export const fetchWhyTreeData = async (state, caseNumber, mode = 0, displayMessage = true, branch = "all") => {
    const url = '/rcaeda/' + caseNumber;

    state.setState({
        loading: true,
        refreshDisabled: true,
        saveDisabled: true,
    })

    const response = await axios.get(url, {
        headers: {'Authorization': `Token ${localStorage.token}`},
    }).then(response => {
        if (response.status === 200) {

            //do different things depending on the mode of the function. default mode is "0"
            if (mode === 0) { //assign the data
                state.setState({
                    fetchedData: response.data,
                    loading: false,
                    refreshDisabled: false,
                    saveDisabled: false,
                });

                return 0;
            } else if (mode === 1) { //assign the data and map it to the why tree with displaying the message
                displayWhyTree(response.data, state)

                setTimeout(() => {
                    state.setState({
                        fetchedData: response.data,
                        loading: false,
                        refreshDisabled: false,
                        saveDisabled: false,
                    })

                    if (displayMessage) {
                        message.success({
                            content: 'Why tree data was successfully fetched and you have up to date version of the tree!',
                            className: 'statusAlert',
                        });
                    }

                    return 1;
                }, 2000)

            } else if (mode === 2) { //assign data, check if its the same as the local data and map it to the why tree if necessary
                if (branch === "all") { //check all branches and form info
                    if (JSON.stringify(state.state.fetchedData) !== JSON.stringify(response.data)) {
                        displayWhyTree(response.data, state)

                        state.setState({
                            fetchedData: response.data,
                            loading: false,
                            refreshDisabled: false,
                            saveDisabled: false,
                        });

                        if (displayMessage) {
                            message.success({
                                content: 'Your action was interrupted in order to fetch the up to date version!',
                                className: 'statusAlert',
                            });
                        }

                        return 1
                    }

                    state.setState({
                        loading: false,
                        refreshDisabled: false,
                        saveDisabled: false,
                    });

                    return 0
                } else { //check only particular branch that you work on
                    if (branch === "branch1") {
                        if (state.fetchedData["rca_fault_introduced"] && response.data["rca_fault_introduced"] &&
                            state.fetchedData["rca_fault_introduced"] !== response.data["rca_fault_introduced"]) {
                            displayWhyTree(response.data, state)
                            state.setState({
                                fetchedData: response.data,
                                loading: false,
                                refreshDisabled: false,
                                saveDisabled: false,
                            });

                            if (displayMessage) {
                                message.success({
                                    content: 'Why tree branch data was successfully fetched!',
                                    className: 'statusAlert',
                                });
                            }

                            return 1
                        }
                        state.setState({
                            loading: false,
                            refreshDisabled: false,
                            saveDisabled: false,
                        });

                        return 0
                    } else if (branch === "branch2") {
                        if (state.fetchedData["rca_not_found_on_review"] && response.data["rca_not_found_on_review"] &&
                            state.fetchedData["rca_not_found_on_review"] !== response.data["rca_not_found_on_review"]) {
                            displayWhyTree(response.data, state)
                            state.setState({
                                fetchedData: response.data,
                                loading: false,
                                refreshDisabled: false,
                                saveDisabled: false,
                            });

                            if (displayMessage) {
                                message.success({
                                    content: 'Why tree branch data was successfully fetched!',
                                    className: 'statusAlert',
                                });
                            }

                            return 1
                        }
                        state.setState({
                            loading: false,
                            refreshDisabled: false,
                            saveDisabled: false,
                        });

                        return 0
                    } else if (branch === "branch3") {
                        if (state.fetchedData["eda_requirements_reviews"] && response.data["eda_requirements_reviews"] &&
                            state.fetchedData["eda_requirements_reviews"] !== response.data["eda_requirements_reviews"]) {
                            displayWhyTree(response.data, state)
                            state.setState({
                                fetchedData: response.data,
                                loading: false,
                                refreshDisabled: false,
                                saveDisabled: false,
                            });

                            if (displayMessage) {
                                message.success({
                                    content: 'Why tree branch data was successfully fetched!',
                                    className: 'statusAlert',
                                });
                            }

                            return 1
                        }
                        state.setState({
                            loading: false,
                            refreshDisabled: false,
                            saveDisabled: false,
                        });

                        return 0
                    } else if (branch === "branch4") {
                        if (state.fetchedData["eda_design_reviews"] && response.data["eda_design_reviews"] &&
                            state.fetchedData["eda_design_reviews"] !== response.data["eda_design_reviews"]) {
                            displayWhyTree(response.data, state)
                            state.setState({
                                fetchedData: response.data,
                                loading: false,
                                refreshDisabled: false,
                                saveDisabled: false,
                            });

                            if (displayMessage) {
                                message.success({
                                    content: 'Why tree branch data was successfully fetched!',
                                    className: 'statusAlert',
                                });
                            }

                            return 1
                        }
                        state.setState({
                            loading: false,
                            refreshDisabled: false,
                            saveDisabled: false,
                        });

                        return 0
                    } else if (branch === "branch5") {
                        if (state.fetchedData["eda_code_analysis_tools"] && response.data["eda_code_analysis_tools"] &&
                            state.fetchedData["eda_code_analysis_tools"] !== response.data["eda_code_analysis_tools"]) {
                            displayWhyTree(response.data, state)
                            state.setState({
                                fetchedData: response.data,
                                loading: false,
                                refreshDisabled: false,
                                saveDisabled: false,
                            });

                            if (displayMessage) {
                                message.success({
                                    content: 'Why tree branch data was successfully fetched!',
                                    className: 'statusAlert',
                                });
                            }

                            return 1
                        }
                        state.setState({
                            loading: false,
                            refreshDisabled: false,
                            saveDisabled: false,
                        });

                        return 0
                    } else if (branch === "branch6") {
                        if (state.fetchedData["eda_code_inspections"] && response.data["eda_code_inspections"] &&
                            state.fetchedData["eda_code_inspections"] !== response.data["eda_code_inspections"]) {
                            displayWhyTree(response.data, state)
                            state.setState({
                                fetchedData: response.data,
                                loading: false,
                                refreshDisabled: false,
                                saveDisabled: false,
                            });

                            if (displayMessage) {
                                message.success({
                                    content: 'Why tree branch data was successfully fetched!',
                                    className: 'statusAlert',
                                });
                            }

                            return 1
                        }
                        state.setState({
                            loading: false,
                            refreshDisabled: false,
                            saveDisabled: false,
                        });

                        return 0
                    } else if (branch === "branch7") {
                        if (state.fetchedData["eda_unit_component_test"] && response.data["eda_unit_component_test"] &&
                            state.fetchedData["eda_unit_component_test"] !== response.data["eda_unit_component_test"]) {
                            displayWhyTree(response.data, state)
                            state.setState({
                                fetchedData: response.data,
                                loading: false,
                                refreshDisabled: false,
                                saveDisabled: false,
                            });

                            if (displayMessage) {
                                message.success({
                                    content: 'Why tree branch data was successfully fetched!',
                                    className: 'statusAlert',
                                });
                            }

                            return 1
                        }
                        state.setState({
                            loading: false,
                            refreshDisabled: false,
                            saveDisabled: false,
                        });

                        return 0
                    } else if (branch === "branch8") {
                        if (state.fetchedData["eda_entity_test"] && response.data["eda_entity_test"] &&
                            state.fetchedData["eda_entity_test"] !== response.data["eda_entity_test"]) {
                            displayWhyTree(response.data, state)
                            state.setState({
                                fetchedData: response.data,
                                loading: false,
                                refreshDisabled: false,
                                saveDisabled: false,
                            });

                            if (displayMessage) {
                                message.success({
                                    content: 'Why tree branch data was successfully fetched!',
                                    className: 'statusAlert',
                                });
                            }

                            return 1
                        }
                        state.setState({
                            loading: false,
                            refreshDisabled: false,
                            saveDisabled: false,
                        });

                        return 0
                    } else if (branch === "branch9") {
                        if (state.fetchedData["eda_et_automated_test"] && response.data["eda_et_automated_test"] &&
                            state.fetchedData["eda_et_automated_test"] !== response.data["eda_et_automated_test"]) {
                            displayWhyTree(response.data, state)
                            state.setState({
                                fetchedData: response.data,
                                loading: false,
                                refreshDisabled: false,
                                saveDisabled: false,
                            });

                            if (displayMessage) {
                                message.success({
                                    content: 'Why tree branch data was successfully fetched!',
                                    className: 'statusAlert',
                                });
                            }

                            return 1
                        }
                        state.setState({
                            loading: false,
                            refreshDisabled: false,
                            saveDisabled: false,
                        });

                        return 0
                    } else if (branch === "branch10") {
                        if (state.fetchedData["eda_system_test"] && response.data["eda_system_test"] &&
                            state.fetchedData["eda_system_test"] !== response.data["eda_system_test"]) {
                            displayWhyTree(response.data, state)
                            state.setState({
                                fetchedData: response.data,
                                loading: false,
                                refreshDisabled: false,
                                saveDisabled: false,
                            });

                            if (displayMessage) {
                                message.success({
                                    content: 'Why tree branch data was successfully fetched!',
                                    className: 'statusAlert',
                                });
                            }

                            return 1
                        }
                        state.setState({
                            loading: false,
                            refreshDisabled: false,
                            saveDisabled: false,
                        });

                        return 0
                    } else if (branch === "branch11") {
                        if (state.fetchedData["eda_st_automated_test"] && response.data["eda_st_automated_test"] &&
                            state.fetchedData["eda_st_automated_test"] !== response.data["eda_st_automated_test"]) {
                            displayWhyTree(response.data, state)
                            state.setState({
                                fetchedData: response.data,
                                loading: false,
                                refreshDisabled: false,
                                saveDisabled: false,
                            });

                            if (displayMessage) {
                                message.success({
                                    content: 'Why tree branch data was successfully fetched!',
                                    className: 'statusAlert',
                                });
                            }

                            return 1
                        }
                        state.setState({
                            loading: false,
                            refreshDisabled: false,
                            saveDisabled: false,
                        });

                        return 0
                    } else {

                        return 0
                    }
                }
            }
        } else {
            state.setState({
                loading: false,
                refreshDisabled: false,
                saveDisabled: false,
            });

            return -1
        }
    });

    return response
}