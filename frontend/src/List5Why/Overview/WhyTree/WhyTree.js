import React from "react";
import Tree from "react-d3-tree";
import "../../../css/WhyTree.css";
import {message, Popconfirm, Tooltip} from 'antd';
import moment from 'moment';
import {formatDateTimeOnlyDate} from "../../../CommonComponents/Utils";
import {fetchWhyTreeData, findAndChangeObjectById, findObjectByLabel, idGenerator} from "./WhyTreeCommonFunctions";
import {saveFiveWhyForm} from "./WhyTreeRecursiveMapTreeToData";
import {renderForeignObjectNode} from "./WhyTreeRenderNode";
import RedoOutlined from "@ant-design/icons/RedoOutlined";
import {Ring} from "react-spinners-css";
import {BorderOuterOutlined} from "@ant-design/icons";
import EditAccessModule from "../../../CommonComponents/EditAccessModule";
import _ from "lodash";

class WhyTree extends React.Component {

    constructor(props) {
        super(props);
        this.editAccessModuleHandler = this.editAccessModuleHandler.bind(this);

        this.state = {
            status: this.props.currentStatus === null ? 0 : this.props.currentStatus,
            width: 0,
            height: 0,
            data: {},
            edition: false,
            editMode: this.props.editMode,
            caseNumber: this.props.caseNumber,
            loading: false,
            header: "",
            dropDownMenu: "Not rated yet!",
            refreshDisabled: false,
            saveDisabled: false,
            alignTreeDisabled: false,
            activeCommentSection: false,
            whyTreeBoxHeight: this.props.whyTreeBoxHeight,
            whyTreeTranslateHeight: this.props.whyTreeTranslateHeight,
            zoomLevel: 0.38,


        }

    }


    editAccessModuleHandler(newEditableState) {
        this.setState({
            edition: newEditableState
        });
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.editMode !== this.props.editMode) {
            this.setState({
                editMode: this.props.editMode,
                edition: false
            })
        }
    }


    componentDidMount() {

        //getting width and height of the tree container
        this.setState({
            width: this.container.offsetWidth,
            height: this.container.offsetHeight,
        });

        if (this.state.caseNumber && this.state.caseNumber !== undefined && this.state.caseNumber !== null && this.state.caseNumber !== "")
            if (this.props.currentData === null)
                fetchWhyTreeData(this, this.state.caseNumber, 1, false);
            else {
                fetchWhyTreeData(this, this.state.caseNumber, 0, false);
                this.setState({
                    data: this.props.currentData
                });
            }
    }


    updateOverviewUnsavedChangesFlag(prevStatus, newStatus) {
        if (newStatus !== prevStatus) {
            let unsavedChangesFlag = false;

            if (newStatus > 1) {
                unsavedChangesFlag = true;
                this.props.updateOverviewUnsavedChangesFlag(unsavedChangesFlag);
            }
        }
    }


    addWhy(event = null, parentId = null) {

        //creating a copy of a why tree object
        let copyObj =  _.cloneDeep(this.state.data)

        //finding a subwhy node object based on a why tittle
        let foundObj = findObjectByLabel(copyObj, parentId);

        //creating ids for new why question nodes
        let id1 = parentId + "_why_" + idGenerator();

        //adding why to the children array of objects
        if (foundObj !== null && (event || parentId)) {
            foundObj.children.push({
                id: id1,
                type: "why_question",
                active: false,
                question: event ? event.whyQuestion : "",
                answer: event ? event.whyAnswer : "",
                parent: parentId,
                branch: foundObj.branch,
                branch_type: foundObj.branch_type,
                children: [],
                comments: {
                    commentList: [],
                    numberOfComments: 0,
                    notAnswered: false
                }
            })

            this.changeHeightOfTheTree("increase", parentId, false)

            let translateHeightChange = this.getTranslateHeightChange(foundObj, "increase")

            //replacing tree object with new one
            const prevStatus = this.state.status;
            this.setState({
                refreshState: true,
                data: copyObj,
                status: 3,
                whyTreeTranslateHeight: this.state.whyTreeTranslateHeight + translateHeightChange
            }, this.updateOverviewUnsavedChangesFlag(prevStatus, 3))


            message.success({
                content: 'Why was successfully added!',
                className: 'statusAlert',
                duration: 1.3
            });

        }
        else {
            message.error({
                content: 'Unable to add why! Something went wrong!',
                className: 'statusAlert',
                duration: 3
            });
        }

    }


    addFiveWhyAtOneWithCauseAndAction(event = null, parentId = null) {

        //creating a copy of a why tree object
        let copyObj =  _.cloneDeep(this.state.data)

        //finding a subwhy node object based on a why tittle
        let foundObj = findObjectByLabel(copyObj, parentId);

        //creating ids for new why question nodes
        let id1 = parentId + "_why_" + idGenerator();
        let id2 = parentId + "_why_" + idGenerator();
        let id3 = parentId + "_why_" + idGenerator();
        let id4 = parentId + "_why_" + idGenerator();
        let id5 = parentId + "_why_" + idGenerator();
        let cause_id = parentId + "_cause_" + idGenerator();
        let action_id = parentId + "_action_" + idGenerator();


        //adding why to the children array of objects
        if (foundObj !== null && (event || parentId)) {
            if (foundObj.branch_name) {
                foundObj.children.push({
                    id: id1,
                    type: "why_question",
                    active: false,
                    question: event ? event.whyQuestion : "",
                    answer: event ? event.whyAnswer : "",
                    parent: parentId,
                    branch: foundObj.branch,
                    branch_type: foundObj.branch_type,
                    children: [
                        {
                            id: id2,
                            type: "why_question",
                            active: false,
                            question: "",
                            answer: "",
                            parent: id1,
                            branch: foundObj.branch,
                            branch_type: foundObj.branch_type,
                            children: [
                                {
                                    id: id3,
                                    type: "why_question",
                                    active: false,
                                    question: "",
                                    answer: "",
                                    parent: id2,
                                    branch: foundObj.branch,
                                    branch_type: foundObj.branch_type,
                                    children: [
                                        {
                                            id: id4,
                                            type: "why_question",
                                            active: false,
                                            question: "",
                                            answer: "",
                                            parent: id3,
                                            branch: foundObj.branch,
                                            branch_type: foundObj.branch_type,
                                            children: [
                                                {
                                                    id: id5,
                                                    type: "why_question",
                                                    active: false,
                                                    question: "",
                                                    answer: "",
                                                    parent: id4,
                                                    branch: foundObj.branch,
                                                    branch_type: foundObj.branch_type,
                                                    children: [
                                                        {
                                                            cause: foundObj.branch_type === "RCA" ? "Root Cause" : "Escape Cause",
                                                            id: cause_id,
                                                            type: "cause",
                                                            active: false,
                                                            statement: "",
                                                            parent: id5,
                                                            branch: foundObj.branch,
                                                            branch_type: foundObj.branch_type,
                                                            children: [
                                                                {
                                                                    action: "Action ",
                                                                    id: action_id,
                                                                    type: "action",
                                                                    active: false,
                                                                    parent: cause_id,
                                                                    branch: foundObj.branch,
                                                                    branch_type: foundObj.branch_type,
                                                                    action_proposal: "",
                                                                    cause_category: "",
                                                                    cause_subcategory: "",
                                                                    action_type: "",
                                                                    assigned_to: "",
                                                                    assigned_to_object: null,
                                                                    ai_id: "",
                                                                    completion_target_date_string: "",
                                                                    completion_target_date: null,
                                                                    children: [],
                                                                    comments: {
                                                                        commentList: [],
                                                                        numberOfComments: 0,
                                                                        notAnswered: false
                                                                    }
                                                                }
                                                            ],
                                                            comments: {
                                                                commentList: [],
                                                                numberOfComments: 0,
                                                                notAnswered: false
                                                            }
                                                        }
                                                    ],
                                                    comments: {
                                                        commentList: [],
                                                        numberOfComments: 0,
                                                        notAnswered: false
                                                    }
                                                }
                                            ],
                                            comments: {
                                                commentList: [],
                                                numberOfComments: 0,
                                                notAnswered: false
                                            }
                                        }
                                    ],
                                    comments: {
                                        commentList: [],
                                        numberOfComments: 0,
                                        notAnswered: false
                                    }
                                }
                            ],
                            comments: {
                                commentList: [],
                                numberOfComments: 0,
                                notAnswered: false
                            }
                        }
                    ],
                    comments: {
                        commentList: [],
                        numberOfComments: 0,
                        notAnswered: false
                    }
                })
            } else {
                foundObj.children.push({
                    id: id1,
                    type: "why_question",
                    active: false,
                    question: event ? event.whyQuestion : "",
                    answer: event ? event.whyAnswer : "",
                    parent: parentId,
                    branch: foundObj.branch,
                    branch_type: foundObj.branch_type,
                    children: [
                        {
                            id: id2,
                            type: "why_question",
                            active: false,
                            question: "",
                            answer: "",
                            parent: id1,
                            branch: foundObj.branch,
                            branch_type: foundObj.branch_type,
                            children: [
                                {
                                    id: id3,
                                    type: "why_question",
                                    active: false,
                                    question: "",
                                    answer: "",
                                    parent: id2,
                                    branch: foundObj.branch,
                                    branch_type: foundObj.branch_type,
                                    children: [
                                        {
                                            id: id4,
                                            type: "why_question",
                                            active: false,
                                            question: "",
                                            answer: "",
                                            parent: id3,
                                            branch: foundObj.branch,
                                            branch_type: foundObj.branch_type,
                                            children: [
                                                {
                                                    cause: foundObj.branch_type === "RCA" ? "Root Cause" : "Escape Cause",
                                                    id: cause_id,
                                                    type: "cause",
                                                    active: false,
                                                    statement: "",
                                                    parent: id4,
                                                    branch: foundObj.branch,
                                                    branch_type: foundObj.branch_type,
                                                    children: [
                                                        {
                                                            action: "Action ",
                                                            id: action_id,
                                                            type: "action",
                                                            active: false,
                                                            parent: cause_id,
                                                            branch: foundObj.branch,
                                                            branch_type: foundObj.branch_type,
                                                            action_proposal: "",
                                                            cause_category: "",
                                                            cause_subcategory: "",
                                                            action_type: "",
                                                            assigned_to: "",
                                                            assigned_to_object: null,
                                                            ai_id: "",
                                                            completion_target_date_string: "",
                                                            completion_target_date: null,
                                                            children: [],
                                                            comments: {
                                                                commentList: [],
                                                                numberOfComments: 0,
                                                                notAnswered: false
                                                            }
                                                        }
                                                    ],
                                                    comments: {
                                                        commentList: [],
                                                        numberOfComments: 0,
                                                        notAnswered: false
                                                    }
                                                }
                                            ],
                                            comments: {
                                                commentList: [],
                                                numberOfComments: 0,
                                                notAnswered: false
                                            }
                                        }
                                    ],
                                    comments: {
                                        commentList: [],
                                        numberOfComments: 0,
                                        notAnswered: false
                                    }
                                }
                            ],
                            comments: {
                                commentList: [],
                                numberOfComments: 0,
                                notAnswered: false
                            }
                        }
                    ],
                    comments: {
                        commentList: [],
                        numberOfComments: 0,
                        notAnswered: false
                    }
                })
            }

            this.changeHeightOfTheTree("increase", foundObj.parent, false)

            let translateHeightChange = this.getTranslateHeightChange(foundObj, "increase", true)

            //replacing tree object with new one
            const prevStatus = this.state.status;
            this.setState({
                refreshState: true,
                data: copyObj,
                status: 3,
                whyTreeTranslateHeight: this.state.whyTreeTranslateHeight + translateHeightChange
            }, this.updateOverviewUnsavedChangesFlag(prevStatus, 3))


            message.success({
                content: 'Why was successfully added!',
                className: 'statusAlert',
                duration: 1.3
            });

        }
        else {
            message.error({
                content: 'Unable to add why! Something went wrong!',
                className: 'statusAlert',
                duration: 3
            });
        }

    }


    deleteWhy(node) {

        //creating a copy of a why tree object
        let copyObj =  _.cloneDeep(this.state.data)

        //geting the parent node object
        let foundParentObj = findObjectByLabel(copyObj, node.parent)

        //removing children with concrete tittle
        if (foundParentObj !== null) {

            let deletionChangeHeightFlag = foundParentObj.children && foundParentObj.children.length > 1

            for (let i = 0; i < foundParentObj["children"].length; i++) {
                if (foundParentObj["children"][i]["id"] === node.id) {
                    if (i === 0) {
                        foundParentObj.children.splice(i, i + 1)
                    } else foundParentObj.children.splice(i, i)

                }

            }

            this.changeHeightOfTheTree("decrease", null, deletionChangeHeightFlag)

            let translateHeightChange = this.getTranslateHeightChange(foundParentObj, "decrease", false, deletionChangeHeightFlag)

            //replacing tree object with new one
            const prevStatus = this.state.status;
            this.setState({
                refreshState: true,
                data: copyObj,
                status: 3,
                whyTreeTranslateHeight: this.state.whyTreeTranslateHeight + translateHeightChange,
            }, this.updateOverviewUnsavedChangesFlag(prevStatus, 3))

            message.success({
                content: 'Why was successfully removed!',
                className: 'statusAlert',
            });

        }
        else {
            message.error({
                content: 'unable to delete why! Something went wrong!',
                className: 'statusAlert',
            });
        }

    }


    addCauseStatement(event = null, parentId = null, branchId = null) {

        //creating a copy of a why tree object
        let copyObj = _.cloneDeep(this.state.data)

        //finding why object based on an why id
        let foundObj = findObjectByLabel(copyObj, parentId);

        //adding cause to the children array of objects
        if (foundObj !== null && (event || (parentId && branchId))) {
            foundObj.children.push({
                cause: foundObj.branch_type === "RCA" ? "Root Cause" : "Escape Cause",
                id: branchId + "_cause_" + idGenerator(),
                type: "cause",
                active: event ? event.causeStatement === undefined ? false : true : false,
                statement: event ? event.causeStatement : "",
                parent: parentId,
                branch: branchId,
                branch_type: foundObj.branch_type,
                children: [],
                comments: {
                    commentList: [],
                    numberOfComments: 0,
                    notAnswered: false
                }
            })
            

            //replacing tree object with new one
            const prevStatus = this.state.status;
            this.setState({
                data: copyObj,
                refreshState: true,
                status: 3
            }, this.updateOverviewUnsavedChangesFlag(prevStatus, 3))


            message.success({
                content: 'Cause statement was successfully added!',
                className: 'statusAlert',
                duration: 1.3,
            });

        }
        else {
            message.error({
                content: 'Unable to add cause! Something went wrong!',
                className: 'statusAlert',
                duration: 3,
            });
        }

    }


    deleteCause(node) {
        //creating a copy of a why tree object
        let copyObj = _.cloneDeep(this.state.data)

        //geting the parent node object
        let foundParentObj = findObjectByLabel(copyObj, node.parent)

        let index = null;

        //removing children with concrete tittle
        if (foundParentObj !== null) {
            for (let i = 0; i < foundParentObj["children"].length; i++) {
                if (foundParentObj["children"][i]["id"] === node.id) {
                    index = i
                    if (i === 0) {
                        foundParentObj.children.splice(i, i + 1)
                    } else foundParentObj.children.splice(i, i)

                }
                if (index !== null && index <= i && i < foundParentObj["children"].length) {
                    //foundParentObj["children"][i]["id"] = parentString + "-" + (i+1).toString()
                }
            }

            //replacing tree object with new one
            const prevStatus = this.state.status;
            this.setState({
                refreshState: true,
                data: copyObj,
                status: 3
            }, this.updateOverviewUnsavedChangesFlag(prevStatus, 3))

            message.success({
                content: 'Cause was successfully removed!',
                className: 'statusAlert',
            });

        }
        else {
            message.error({
                content: 'unable to delete cause! Something went wrong!',
                className: 'statusAlert',
            });
        }

    }


    addAction(event = null, parentId = null, branchId = null) {
        //creating a copy of a why tree object
        let copyObj = _.cloneDeep(this.state.data)

        //finding cause object based on an cause tittle
        let foundObj = findObjectByLabel(copyObj, parentId);

        //adding action to the children array of objects
        if (foundObj !== null && (event || (parentId && branchId))) {
            foundObj.children.push({
                action: "Action ",
                id: branchId + "_action_" + idGenerator(),
                type: "action",
                active: false,
                parent: parentId,
                branch: branchId,
                branch_type: foundObj.branch_type,
                action_proposal: event ? event.actionProposal : "",
                cause_category: event ? event.actionCategory : "",
                cause_subcategory: event ? event.actionSubcategory : "",
                action_type: event ? event.actionType : "",
                assigned_to: event ? event.assignUser ? event.assignUser.label : "Not assigned yet" : "",
                assigned_to_object: event ? event.assignUser ? event.assignUser : null : null,
                ai_id: event ? event.aiId : "",
                completion_target_date_string: event ? formatDateTimeOnlyDate(moment(event.completionTargetDate).format().toString()) : "",
                completion_target_date: event ? event.completionTargetDate : null,
                children: [],
                comments: {
                    commentList: [],
                    numberOfComments: 0,
                    notAnswered: false
                }
            })

            this.changeHeightOfTheTree("increase", parentId, false)

            let translateHeightChange = this.getTranslateHeightChange(foundObj, "increase")

            //replacing tree object with new one
            const prevStatus = this.state.status;
            this.setState({
                refreshState: true,
                data: copyObj,
                status: 3,
                whyTreeTranslateHeight: this.state.whyTreeTranslateHeight + translateHeightChange,
            }, this.updateOverviewUnsavedChangesFlag(prevStatus, 3))


            message.success({
                content: 'Action was successfully added!',
                className: 'statusAlert',
                duration: 1.3,
            });

        }
        else {
            message.error({
                content: 'Unable to add action! Something went wrong!',
                className: 'statusAlert',
                duration: 3,
            });
        }
    }


    deleteAction(node) {
        //creating a copy of a why tree object
        let copyObj = _.cloneDeep(this.state.data)

        //geting the parent node object
        let foundParentObj = findObjectByLabel(copyObj, node.parent)

        //removing children with concrete tittle
        if (foundParentObj !== null) {

            let deletionChangeHeightFlag = foundParentObj.children && foundParentObj.children.length > 1

            for (let i = 0; i < foundParentObj["children"].length; i++) {
                if (foundParentObj["children"][i]["id"] === node.id) {
                    if (i === 0) {
                        foundParentObj.children.splice(i, i + 1)
                    } else foundParentObj.children.splice(i, i)

                }
            }

            this.changeHeightOfTheTree("decrease", null, deletionChangeHeightFlag)

            let translateHeightChange = this.getTranslateHeightChange(foundParentObj, "decrease", false, deletionChangeHeightFlag)

            //replacing tree object with new one
            const prevStatus = this.state.status;
            this.setState({
                refreshState: true,
                data: copyObj,
                status: 3,
                whyTreeTranslateHeight: this.state.whyTreeTranslateHeight + translateHeightChange,
            }, this.updateOverviewUnsavedChangesFlag(prevStatus, 3))

            message.success({
                content: 'Action was successfully removed!',
                className: 'statusAlert',
            });

        }
        else {
            message.error({
                content: 'unable to delete action! Something went wrong!',
                className: 'statusAlert',
            });
        }

    }


    assignToBranch(event = null, branchId = null, assignedUser = null) {
        //creating a copy of a why tree object
        let copyObj = _.cloneDeep(this.state.data)

        //getting the object that is going to be edited
        let foundObj = findObjectByLabel(copyObj, branchId)

        //assigning new values from the form
        if (foundObj !== null) {
            foundObj.assigned_to = event ? event.assignUser ? event.assignUser.label : "Not assigned yet" : assignedUser.label ? assignedUser.label : "Not assigned yet";
            foundObj.assigned_to_object = event ? event.assignUser ? event.assignUser : null : assignedUser;


            //replacing tree object with new one
            const prevStatus = this.state.status;
            this.setState({
                data: copyObj,
                assigned_to: null,
                status: 3
            }, this.updateOverviewUnsavedChangesFlag(prevStatus, 3))

            message.success({
                content: 'User was successfully assigned to the branch!',
                className: 'statusAlert',
                duration: 1.3,
            });

        }
        else {
            message.error({
                content: 'Unable to assign user to this branch! Something went wrong!',
                className: 'statusAlert',
                duration: 3
            });
        }
    }


    rateBranch(event = null, branchId = null, grade = null) {
        //creating a copy of a why tree object
        let copyObj = _.cloneDeep(this.state.data)

        //getting the object that is going to be edited
        let foundObj = findObjectByLabel(copyObj, branchId)

        //assigning new values from the form
        if (foundObj !== null) {
            foundObj.grade = event ? event.rateBranch : grade;

            //replacing tree object with new one
            const prevStatus = this.state.status;
            this.setState({
                data: copyObj,
                grade: "",
                status: 3
            }, this.updateOverviewUnsavedChangesFlag(prevStatus, 3))

            message.success({
                content: 'Branch was successfully rated!',
                className: 'statusAlert',
                duration: 1.3,
            });

        }
        else {
            message.error({
                content: 'Unable to rate this branch! Something went wrong!',
                className: 'statusAlert',
                duration: 3,
            });
        }
    }


    editWhyWithoutPopup(data) {
        let copyObj =  _.cloneDeep(this.state.data)

        //getting the object that is going to be edited
        let changedObj = findAndChangeObjectById(copyObj, data, data.id)

        //replacing tree object with new one
        const prevStatus = this.state.status;
        this.setState({
            data: changedObj,
            status: 3
        }, () => {
            if(prevStatus !== 3) {
                this.updateOverviewUnsavedChangesFlag(prevStatus, 3)
            }
        })
    }


    editWhyTreeInputOnChange(e, state, nodeDatum, type) {
        /*
        type === 1 - Why question
        type === 2 - Why answer
        type === 3 - Root/Escape cause statement
        type === 4 - Action proposal
        type === else - null
        */

        let input = type === 1 ? nodeDatum.question : type === 2 ? nodeDatum.answer : type === 3 ?
        nodeDatum.statement : type === 4 ? nodeDatum.action_proposal : null

        if(input !== null) {
            if (state.state.status !== 3 || state.state.saveDisabled !== false) {
                let prevStatus = this.state.status
                state.setState({
                    status: 3,
                    saveDisabled: false
                }, this.updateOverviewUnsavedChangesFlag(prevStatus, 3))
            }
        }
    }


    editWhyTreeInputOnBlur(e, state, nodeDatum, type) {
        /*
        type === 1 - Why question
        type === 2 - Why answer
        type === 3 - Root/Escape cause statement
        type === 4 - Action proposal
        type === else - null
        */


        let input = type === 1 ? nodeDatum.question : type === 2 ? nodeDatum.answer : type === 3 ?
            nodeDatum.statement : type === 4 ? nodeDatum.action_proposal : null

        if (type === 1) {
            nodeDatum.question = e.target.value;
        } else if (type === 2) {
            nodeDatum.answer = e.target.value
        } else if (type === 3) {
            nodeDatum.statement = e.target.value
        } else if (type === 4) {
            nodeDatum.action_proposal = e.target.value
        }


        if (input !== null) {
            state.editWhyWithoutPopup(nodeDatum);
        }
    }


    changeHeightOfTheTree(type, parentId, deletionChangeHeightFlag) {
        let copyObj = _.cloneDeep(this.state.data)

        let foundParentObj = findObjectByLabel(copyObj, parentId)

        if(type === "increase" && parentId !== null) {
            if(foundParentObj.children && foundParentObj.children.length >= 1) {
                this.setState({
                    whyTreeBoxHeight: this.state.whyTreeBoxHeight + 320
                })
            }
        }
        else if (type === "decrease" && deletionChangeHeightFlag === true) {
            this.setState({
                whyTreeBoxHeight: this.state.whyTreeBoxHeight - 320
            })
        }
    }

    getTranslateHeightChange(foundObj, mode, five_why = false, deletionChangeHeightFlag) {
        let translateHeightChange = 0

        if (mode === "increase" && foundObj.children && foundObj.children.length - 1 >= 1) {
            if (foundObj.branch === "branch1") {
                if(five_why) {
                    translateHeightChange = 232.5
                }
                else {
                   translateHeightChange = 272.5
                }
            } else if (foundObj.branch === "branch11") {
                    translateHeightChange = 77.5
            } else {
                translateHeightChange = 155
            }
        } else if (mode === "decrease" && deletionChangeHeightFlag) {
            if (foundObj.branch === "branch1") {
                if(five_why) {
                    translateHeightChange = -232.5
                }
                else {
                    translateHeightChange = -272.5
                }
            } else if (foundObj.branch === "branch11") {
                    translateHeightChange = -77.5
            } else {
                translateHeightChange = -155
            }
        }

        return translateHeightChange
    }


    render() {

        const containerStyles = {
            width: "100%",
            height: this.state.whyTreeBoxHeight,
            border:  "rgb(18,65,145) 1px solid",
        };

        const translate = {
            x: -172.5,
            y: this.state.whyTreeTranslateHeight
        }


        //const [translate, containerRef] = useCenteredTree();
        const nodeSize = {x: 600, y: 800};
        const foreignObjectProps = {width: nodeSize.x, height: nodeSize.y, x: -100, y: -175};
        const zoomExtent = {
            min: 0.05,
            max: 1
        };


        return (
            <div className="fiveWhyTree" style={{position: "relative", paddingTop: "15px"}}>

                {/*Render of the status panel: */}
                <EditAccessModule
                    editMode={this.state.editMode}
                    editableChangeHandler={this.editAccessModuleHandler}
                    accessType="tree"
                    caseNumber={this.state.caseNumber}
                />


                <div className="statusBox">
                    {this.state.edition ?
                        <button disabled={this.state.saveDisabled || this.state.status === 0
                                    || this.state.status === 1 || this.state.status === 2}
                                className={this.state.saveDisabled || this.state.status === 0
                                    || this.state.status === 1 || this.state.status === 2 ? "btnSaveDisabled" : "btnSave"}
                                onClick={() => {
                                    saveFiveWhyForm(this, "all", this.props);
                                }}>
                            Save all
                        </button>
                        :
                        null
                    }

                    <span className="statusText">Status: </span>
                    <span>
                    {this.state.loading ? null : <span className="statusText"
                                                       style={this.state.status === 1 || this.state.status === 2 ? {color: "green"} : {color: "red"}}>
                        {this.state.status === 0 ? "Error! Data couldn't be fetched!" : this.state.status === 1 ? "Up to date!" : this.state.status === 2 ? "Saved!" : this.state.status === 3 ?
                            "You have unsaved changes!" : "Network problems!"} </span>}
                        {this.state.loading ? <>
                            <Ring className="loadingSpinner" color="grey" size={40}/>
                            {this.state.saveDisabled && this.state.status === 3 ?
                            <span className="statusText" style={{
                                fontSize: "16px",
                                marginTop: "8px",
                                color: "#FFA908"
                            }}>Saving the tree and updating JIRA tasks which take longer to update but is only performed when necessary</span> : null}
                        </>: null}
                    </span>

                    {this.state.refreshDisabled ?
                        <div>
                            <button disabled={this.state.refreshDisabled} id="btnTreeAlign"
                                className={this.state.refreshDisabled ? "btnRefreshDisabled" : "btnRefresh"}
                                style={{position: "absolute", right: "73px"}}
                                onClick={() => {
                                    this.props.alignWhyTreeWithCurrentData(this.state.data, this.state.status, this.state.whyTreeBoxHeight,
                                            this.state.zoomLevel)

                                }}
                            >
                                <BorderOuterOutlined style={{fontSize: "24px", paddingTop: "4px"}}/>
                            </button>

                            <button disabled={this.state.refreshDisabled} id="btnRefresh"
                                className={this.state.refreshDisabled ? "btnRefreshDisabled" : "btnRefresh"}
                                style={{position: "absolute", right: "15px"}}
                                onClick={() => {
                                    fetchWhyTreeData(this, this.state.caseNumber, 1, true)
                                }}
                            >
                                <RedoOutlined style={{fontSize: "24px", paddingTop: "4px"}}/>
                            </button>
                        </div>
                        :
                        <div>
                            <Tooltip color={"rgb(18,65,145)"} title="Restores 5Why tree view to initial position">
                                <button disabled={this.state.refreshDisabled} id="btnTreeAlign2"
                                        className={this.state.refreshDisabled ? "btnRefreshDisabled" : "btnRefresh"}
                                        style={{position: "absolute", right: "73px"}}
                                        onClick={() => {
                                            this.props.alignWhyTreeWithCurrentData(this.state.data, this.state.status, this.state.whyTreeBoxHeight,
                                            this.state.zoomLevel)
                                        }}
                                >
                                    <BorderOuterOutlined style={{fontSize: "24px", paddingTop: "4px"}}/>
                                </button>
                            </Tooltip>

                            <Popconfirm
                                className={"whyFormPopConfirm"}
                                title="Are you sure that you want to restore 5Why Tree data? All yours unsaved changes
                                in the tree will be lost in the process of it"
                                onConfirm={async () => {
                                    const prevStatus = this.state.status;
                                    await fetchWhyTreeData(this, this.state.caseNumber, 1, true);
                                    this.updateOverviewUnsavedChangesFlag(prevStatus, this.state.status);
                                }}
                                onCancel={() => {
                                }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Tooltip color={"rgb(18,65,145)"} title="Restores 5Why tree data from the server.
                                Do not click if you have some unsaved changes that you would want to save">

                                        <button disabled={this.state.refreshDisabled}
                                                id="btnRefresh2"
                                                className={this.state.refreshDisabled ? "btnRefreshDisabled" : "btnRefresh"}
                                                style={{position: "absolute", right: "15px"}}
                                        >
                                            <RedoOutlined style={{fontSize: "24px", paddingTop: "4px"}}/>
                                        </button>

                                </Tooltip>
                            </Popconfirm>
                        </div>
                    }

                </div>


                {/*info about the use of SHIFT key in the 5Why tree*/}
                <span className="shiftKeyInfo">*
                    In order to move the tree around please press
                    <span className="shift">
                         SHIFT
                    </span>
                    key on your keyboard
                </span>


                {/*Tree container div:*/}
                <div id="5WhyTreeContainer" style={containerStyles} ref={el => (this.container = el)}>
                    {/*Tree component*/}
                    <Tree
                        id="5WhyTree"
                        data={this.state.data}
                        nodeSize={nodeSize}
                        zoom={0.38}
                        zoomable={true}
                        hasInteractiveNodes={true}
                        onUpdate={(onUpdateObject) => {
                            if(this.state.zoomLevel !== onUpdateObject.zoom && onUpdateObject.zoom !== 0.38) {
                                this.setState({
                                    zoomLevel: onUpdateObject.zoom
                                })
                            }
                        }}
                        scaleExtent={zoomExtent}
                        translate={translate}
                        pathFunc={"elbow"}
                        renderCustomNodeElement={(rd3tProps) =>
                            renderForeignObjectNode({...rd3tProps, foreignObjectProps}, this)
                        }
                        orientation="horizontal"
                        separation={{siblings: 1.025, nonSiblings: 1}}
                    />

                </div>

            </div>
        );
    }
}

export default WhyTree;