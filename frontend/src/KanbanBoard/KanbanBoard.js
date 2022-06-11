import React from 'react';
import {Select, Input, Button, Tooltip} from 'antd';
import axios from "../axios/axios";
import Board from "./Components/Board";
import {DndProvider} from "react-dnd";
import Backend from "react-dnd-html5-backend";
import {Ring} from "react-spinners-css";
import {idGenerator} from "../List5Why/Overview/WhyTree/WhyTreeCommonFunctions";
import UserSelect from "../CommonComponents/selectors/UserSelect";
import {EmptySearchSelector} from "../CommonComponents/selectors/EmptySearchSelector";
import JiraKeySelect from "../CommonComponents/selectors/JiraKeySelect";
import JiraInternalCaseIdSelect from "../CommonComponents/selectors/JiraInternalCaseIdSelect";
import RedoOutlined from "@ant-design/icons/RedoOutlined";

import "../css/KanbanBoard.css";
import {authCheckState} from "../Store/actions/auth";


const { Search } = Input;



class KanbanBoard extends React.Component {

    constructor(props) {
        super(props);
        let initialTribesList = ['All', 'Unassigned'];

        let initialSquadGroupList = [localStorage.squadGroup, 'All', 'Unassigned'];

        this.state = {
            data: null,
            errorLoadingData: false,
            summaryContainsSearchClicked: false,
            assigneeToFind: null,
            summaryContainsSearch: null,
            users: [],
            selectedOrganization: localStorage.squadGroup,
            jiraKeyToFind: null,
            jiraInternalCaseIdToFind: null,
            squad_groups: [...initialSquadGroupList],
            initialSquadGroupList: [...initialSquadGroupList],
            tribes: [...initialTribesList],
            initialTribesList: [...initialTribesList],
            tribesWithGroups: [],
        }
    }

    componentDidMount() {
        let assignee_label = localStorage.getItem("kanbanboard_filter_assigneeToFind_label");
        let assignee_value = localStorage.getItem("kanbanboard_filter_assigneeToFind_value");

        let assigneeToFind = null;
        if (assignee_label && assignee_label === "null" && assignee_value && assignee_value === "null") {
            assigneeToFind = null;
        }
        else if (assignee_label && assignee_value) {
            assigneeToFind = {
                label: assignee_label,
                key: assignee_value,
                value: assignee_value,
            }
        }

        let jiraKeyToFind = localStorage.getItem("kanbanboard_filter_jiraKeyToFind");
        if (jiraKeyToFind && jiraKeyToFind === "null") {
            jiraKeyToFind = null;
        }
        else if (jiraKeyToFind) {
            jiraKeyToFind = {
                label: jiraKeyToFind,
                key: jiraKeyToFind,
                value: jiraKeyToFind,
            }
        }

        let jiraInternalCaseIdToFind = localStorage.getItem("kanbanboard_filter_jiraInternalCaseIdToFind");
        if (jiraInternalCaseIdToFind && jiraInternalCaseIdToFind === "null") {
            jiraInternalCaseIdToFind = null;
        }
        else if (jiraInternalCaseIdToFind) {
            jiraInternalCaseIdToFind = {
                label: jiraInternalCaseIdToFind,
                key: jiraInternalCaseIdToFind,
                value: jiraInternalCaseIdToFind,
            }
        }

        let selectedOrganization = localStorage.getItem("kanbanboard_filter_selectedOrganization");
        if (selectedOrganization && selectedOrganization === "null") {
            selectedOrganization = null;
        }

        let summaryContainsSearch = localStorage.getItem("kanbanboard_filter_summaryContainsSearch");
        let summaryContainsSearchClicked = false;
        if (summaryContainsSearch && summaryContainsSearch === "null") {
            summaryContainsSearch = null;
        }
        else if (summaryContainsSearch) {
            summaryContainsSearchClicked = true;
        }

        if (!assigneeToFind && !selectedOrganization && !jiraKeyToFind && !jiraInternalCaseIdToFind && !summaryContainsSearch) {
            selectedOrganization = localStorage.squadGroup;
        }

        this.setState({
            assigneeToFind: assigneeToFind,
            selectedOrganization: selectedOrganization,
            jiraKeyToFind: jiraKeyToFind,
            jiraInternalCaseIdToFind: jiraInternalCaseIdToFind,
            summaryContainsSearch: summaryContainsSearch,
            summaryContainsSearchClicked: summaryContainsSearchClicked
        }, () => {
            this.getData();
        });
    }

    updateLocalStorage() {
        localStorage.setItem("kanbanboard_filter_assigneeToFind_label", this.state.assigneeToFind ? this.state.assigneeToFind["label"] : null);
        localStorage.setItem("kanbanboard_filter_assigneeToFind_value", this.state.assigneeToFind ? this.state.assigneeToFind["value"] : null);
        localStorage.setItem("kanbanboard_filter_selectedOrganization", this.state.selectedOrganization);
        localStorage.setItem("kanbanboard_filter_jiraKeyToFind", this.state.jiraKeyToFind ? this.state.jiraKeyToFind["value"] : null);
        localStorage.setItem("kanbanboard_filter_jiraInternalCaseIdToFind", this.state.jiraInternalCaseIdToFind ? this.state.jiraInternalCaseIdToFind["value"] : null);
        localStorage.setItem("kanbanboard_filter_summaryContainsSearch", this.state.summaryContainsSearch);
    }


    mapTaskStatus(status) {
        if (status && typeof status !== "undefined") {
            if (status.includes("Done")) {
                return "Closed";
            } else if (status === "Reopened") {
                return "In Progress";
            } else {
                return status;
            }
        }
        return status;
    }

    getData() {
        const squadGroupOrTribe = this.state.selectedOrganization;
        const assigneeUid = this.state.assigneeToFind ? this.state.assigneeToFind["value"] : null;
        const jiraKey = this.state.jiraKeyToFind ? this.state.jiraKeyToFind["value"] : null;
        const jiraInternalCaseId = this.state.jiraInternalCaseIdToFind ? this.state.jiraInternalCaseIdToFind["value"] : null;
        const summaryContainsSearch = this.state.summaryContainsSearch;


        if(!squadGroupOrTribe && !assigneeUid && !jiraKey && !jiraInternalCaseId && !summaryContainsSearch) {
            this.setState({
                errorLoadingData: 500
            });
            authCheckState();
            return;
        } else {
            this.setState({
                errorLoadingData: false
            });
        }

        let params = {
            "limit": 1000,
            "history_days": 14,
        }

        if(assigneeUid !== null) {
            params["assignee_uid"] = assigneeUid;
        }
        else if (jiraKey !== null) {
            params["key"] = jiraKey;
            delete params["history_days"];
        }
        else if (jiraInternalCaseId !== null) {
            params["internal_case_id_contains"] = jiraInternalCaseId;
            delete params["history_days"];
        }
        else if (summaryContainsSearch !== null) {
            params["summary_contains"] = summaryContainsSearch;
            delete params["history_days"];
        }
        else if(this.state.tribes.indexOf(squadGroupOrTribe) >= 0) {
            if (!(squadGroupOrTribe === 'All')) {
                params["assignee_tribe"] = squadGroupOrTribe;
            }
        }
        else if (!(squadGroupOrTribe === 'All')) {
            params["assignee_squad_group"] = squadGroupOrTribe;
        }
        else {
            params["assignee_squad_group"] = this.state.squad_groups[0];
        }

        axios.get(`/kanbanboard/data/`, {
            headers: {'Authorization': `Token ${localStorage.token}`},
            params: params
        }).then(response => {
            if (response.status === 200) {
                try {
                    let tasksData = response.data.results;

                    let json = [];
                    let keyIndex = [];
                    let index = 0;
                    for (let i = 0; i < tasksData.length; i++) {
                        tasksData[i]["originalStatus"] = tasksData[i]["status"];
                        tasksData[i]["status"] = this.mapTaskStatus(tasksData[i]["status"]);
                        // tasksData[i]["icon"] = Status.find(si => si.status === tasksData[i]["status"])["icon"];
                        if (!tasksData[i]["assignee"]) {
                            tasksData[i]["assignee"] = {
                                "value": "unassigned",
                                "label": "Unassigned",
                                "mail": "",
                                "tribe": "Unassigned",
                                "squad_group": "",
                            }
                        }
                        let assigneeUid = tasksData[i]["assignee"]['value'];
                        if (!(assigneeUid in keyIndex)) {
                            keyIndex[assigneeUid] = index;
                            index++;
                        }
                        if (!json[keyIndex[assigneeUid]]) {
                            json.push({
                                'assigneeUid': assigneeUid,
                                'assignee_squad_group': tasksData[i]["assignee"]['squad_group'],
                                'assignee_tribe': tasksData[i]["assignee"]['tribe'],
                                'assignee_mail': tasksData[i]["assignee"]['mail'],
                                'assignee_display_name': tasksData[i]["assignee"]['label'],
                                items: []
                            });
                        }
                        json[keyIndex[assigneeUid]].items.push(tasksData[i]);


                    }

                    json.forEach(function (item, i) {
                        if (item.assigneeUid === localStorage.username) {
                            json.splice(i, 1);
                            json.unshift(item);
                        }
                    })

                    this.setState({
                        data: json,
                        errorLoadingData: false,
                        summaryContainsSearchClicked: false
                    });
                }
                catch (error) {

                }


            }
        }).catch((error) => {
            let response_status = 500;
            if (error.response && error.response.hasOwnProperty("status")) {
                response_status = error.response.status;
            }

            this.setState({
                errorLoadingData: response_status
            });
        });

        if (this.state.tribesWithGroups.length < 1) {
            axios.get(`/kanbanboard/tribes_with_squad_groups/`, {
                headers: {'Authorization': `Token ${localStorage.token}`},
            }).then(response => {
                if (response.status === 200) {
                    let squadGroups = response.data.squad_groups;
                    let userSquadGroupIndex = squadGroups.indexOf(localStorage.squadGroup);
                    if (userSquadGroupIndex > -1) {
                        squadGroups.splice(userSquadGroupIndex, 1);
                    }

                    let newSquadGroupList = [...this.state.initialSquadGroupList, ...squadGroups];

                    let tribes = response.data.tribes;
                    let userTribeIndex = squadGroups.indexOf(localStorage.tribe);
                    if (userTribeIndex > -1) {
                        tribes.splice(userTribeIndex, 1);
                    }
                    let newTribesList = [...this.state.initialTribesList, ...tribes];


                    this.setState({
                        squad_groups: newSquadGroupList,
                        tribes: newTribesList,
                        tribesWithGroups: [{
                            "tribe": "Tribes",
                            "squad_groups": [
                                ...this.state.initialTribesList,
                                ...tribes
                            ]
                        },
                            ...response.data.tribes_with_squad_groups
                        ]
                    });
                }
            });
        }
    }


    handleGroupChangeChange = (selectedOrganization) => {
        if (selectedOrganization && typeof selectedOrganization !== "undefined") {
            this.setState({
                data: null,
                assigneeToFind: null,
                selectedOrganization: selectedOrganization,
                jiraKeyToFind: null,
                jiraInternalCaseIdToFind: null,
                summaryContainsSearch: null
            }, () => {
                this.updateLocalStorage();
                this.getData();
            });
        } else {
            this.setState({
                data: null,
                assigneeToFind: null,
                selectedOrganization: null,
                jiraKeyToFind: null,
                jiraInternalCaseIdToFind: null,
                summaryContainsSearch: null
            }, () => {
                this.updateLocalStorage();
            });
        }
    }


    render() {
        let boards = [];
        if (this.state.data) {
            if (this.state.data.length > 0) {
                for (let i = 0; i < this.state.data.length; i++) {
                    boards.push(
                        <Board
                            key={"board" + i}
                            data={this.state.data ? this.state.data[i] : []}
                            parentDataId={i}
                            changeStatusFunction={(item, status, parentDataId) => this.changeStatusFunction(item, status, parentDataId)}
                        />
                    );
                }
            }
            else if (this.state.assigneeToFind) {
                boards.push(
                    <div className="infoMessage" key="infoMessageYourSqgNoTasks">
                        <p style={{color: "blue"}}>{this.state.assigneeToFind["label"]}</p>
                        <p>does not have any tasks.</p>
                    </div>
                );
            }
            else if (this.state.selectedOrganization){
                boards.push(
                    <div className="infoMessage" key="infoMessageNoTasksOrganization">
                        <p>
                            {localStorage.squadGroup === this.state.selectedOrganization ? "Your organization" : "Organization"}
                            <span style={{fontStyle: "italic", fontWeight: 500}}>  {this.state.selectedOrganization}  </span>
                            does not have any tasks.
                        </p>
                    </div>
                );
            }
            else if (this.state.summaryContainsSearch) {
                boards.push(
                    <div className="infoMessage" key="infoMessageNoTasksSearch">
                        <p>
                            Nothing was found for
                            <span style={{
                                fontWeight: 500
                            }}> {this.state.summaryContainsSearch} </span>
                            in any title.
                        </p>
                    </div>
                );
            }
            else {
                boards.push(
                    <div className="infoMessage" key="infoMessageNoTasksLoading">
                        <p>Please select Jira key, person or organization filters or search for Jira title.</p>
                    </div>
                );
            }


        }
        else if (!this.state.jiraKeyToFind && !this.state.jiraInternalCaseIdToFind && !this.state.assigneeToFind && !this.state.selectedOrganization && !this.state.summaryContainsSearch) {
            boards.push(
                <div className="infoMessage" key="infoMessageNoTasksNoFilters">
                    <p>Please select Jira key, internal ID, person or organization filters or search for Jira title.</p>
                </div>
            );
        }
        else if (this.state.summaryContainsSearch && this.state.data === null && this.state.summaryContainsSearchClicked === false) {
            boards.push(
                <div className="infoMessage" key="infoMessageNoTasksNotClicked">
                    <p>Please click search icon to show results.</p>
                </div>
            );
        }
        else if (this.state.data === null && !this.state.errorLoadingData){
            boards.push(
                <div className="infoMessage" key="infoMessageNoTasksLoadingMess">
                    <p>Loading...</p>
                    <Ring size="80" color="grey" style={{position: "fixed", left: "48%", top: "40%", transform: "translate(-50%, -50%)" }}/>
                </div>
            );
        }
        else if(this.state.errorLoadingData) {
            if (this.state.errorLoadingData === 401) {
                boards.push(
                    <div className="infoMessage" key="infoMessageNoTasksUnauthorized">
                        <p>Unauthorized. Redirecting...</p>
                        <Ring size="80" color="grey" style={{position: "fixed", left: "48%", top: "40%", transform: "translate(-50%, -50%)" }}/>
                    </div>
                );
            } else {
                boards.push(
                    <div className="infoMessage" key="infoMessageNoTasksErrorFetching">
                        <p style={{color: "red"}}>Error fetching tasks</p>
                    </div>
                );
            }
        }

        return (
            <div id="kanbanBoardDivId">
                <div className="kanbanControlPanel" key="kanbanControlPanelKey">
                    <div id="cp-1">
                        Kanban board
                    </div>
                    <div id="cp-2">
                        <UserSelect id="idSelectUser"
                            className="searchSelect"
                            allowClear={true}
                            placeholder={"Find a person"}
                            value={this.state.assigneeToFind}
                            onChange={(newValue) => {
                                if (newValue && typeof newValue !== "undefined") {
                                    this.setState({
                                        data: null,
                                        assigneeToFind: newValue,
                                        selectedOrganization: null,
                                        jiraKeyToFind: null,
                                        jiraInternalCaseIdToFind: null,
                                        summaryContainsSearch: null
                                    }, () => {
                                        this.updateLocalStorage();
                                        this.getData();
                                    });
                                } else {
                                    this.setState({
                                        data: null,
                                        assigneeToFind: null,
                                        selectedOrganization: null,
                                        jiraKeyToFind: null,
                                        jiraInternalCaseIdToFind: null,
                                        summaryContainsSearch: null
                                    }, () => {
                                        this.updateLocalStorage();
                                    });
                                }
                            }}
                        />
                    </div>
                    <div id="cp-3">
                        <Select
                            id="idSelectOrganization"
                            className="searchSelect"
                            allowClear={true}
                            showSearch={true}
                            placeholder="Select an organization"
                            onChange={this.handleGroupChangeChange}
                            optionFilterProp="children"
                            notFoundContent={<EmptySearchSelector searchType="organization" dataLength={null}/>}
                            value={this.state.selectedOrganization}
                            filterOption={(input, option) => {
                                if(option && option.value && option.value !== "" && option.value.toLowerCase().includes(input.toLowerCase()))
                                    return true;
                            }}
                        >
                            {this.state.tribesWithGroups.map((tribe) => (
                                <Select.OptGroup label={tribe["tribe"]} key={idGenerator()}>
                                    {tribe["squad_groups"].map((sq) => (
                                        <Select.Option value={sq} key={idGenerator()}>{sq}</Select.Option>
                                    ))}
                                </Select.OptGroup>
                            ))}
                        </Select>
                    </div>
                    <div id="cp-4">
                        <JiraKeySelect id="idSelectJiraKey"
                            className="searchSelect"
                            allowClear={true}
                            placeholder={"Find a Jira key"}
                            value={this.state.jiraKeyToFind}
                            onChange={(newValue) => {
                                if (newValue && typeof newValue !== "undefined") {
                                    this.setState({
                                        data: null,
                                        assigneeToFind: null,
                                        selectedOrganization: null,
                                        jiraKeyToFind: newValue,
                                        jiraInternalCaseIdToFind: null,
                                        summaryContainsSearch: null
                                    }, () => {
                                        this.updateLocalStorage();
                                        this.getData();
                                    });
                                } else {
                                    this.setState({
                                        data: null,
                                        assigneeToFind: null,
                                        selectedOrganization: null,
                                        jiraKeyToFind: null,
                                        jiraInternalCaseIdToFind: null,
                                        summaryContainsSearch: null
                                    }, () => {
                                        this.updateLocalStorage();
                                    });
                                }
                            }}
                        />
                    </div>
                    <div id="cp-5">
                        <JiraInternalCaseIdSelect id="JiraInternalCaseIdSelect"
                            className="searchSelect"
                            allowClear={true}
                            placeholder="Find a 5WHY ID"
                            value={this.state.jiraInternalCaseIdToFind}
                            onChange={(newValue) => {
                                if (newValue && typeof newValue !== "undefined") {
                                    this.setState({
                                        data: null,
                                        assigneeToFind: null,
                                        selectedOrganization: null,
                                        jiraKeyToFind: null,
                                        jiraInternalCaseIdToFind: newValue,
                                        summaryContainsSearch: null
                                    }, () => {
                                        this.updateLocalStorage();
                                        this.getData();
                                    });
                                } else {
                                    this.setState({
                                        data: null,
                                        assigneeToFind: null,
                                        selectedOrganization: null,
                                        jiraKeyToFind: null,
                                        jiraInternalCaseIdToFind: null,
                                        summaryContainsSearch: null
                                    }, () => {
                                        this.updateLocalStorage();
                                    });
                                }
                            }}
                        />
                    </div>
                    <div id="cp-6">
                        <Search id="searchTitleInput"
                            className="searchSelect"
                            placeholder="Search in titles"
                            allowClear
                            value={this.state.summaryContainsSearch}
                            onChange={(e) => {
                                this.setState({
                                    summaryContainsSearch: e.target.value
                                });
                            }}
                            onSearch={(value) => {
                                if (value) {
                                    this.setState({
                                        data: null,
                                        assigneeToFind: null,
                                        selectedOrganization: null,
                                        jiraKeyToFind: null,
                                        jiraInternalCaseIdToFind: null,
                                        summaryContainsSearch: value,
                                        summaryContainsSearchClicked: true
                                    }, () => {
                                        this.updateLocalStorage();
                                        this.getData();
                                    });
                                }
                            }}
                        />
                    </div>
                    <div id="cp-7">
                        <Tooltip color={"rgb(18,65,145)"} placement="bottomRight" title="Reset filters to default">
                            <Button
                                className="searchSelect"
                                icon={<RedoOutlined/>}
                                onClick={() => {
                                    this.setState({
                                        data: null,
                                        assigneeToFind: null,
                                        selectedOrganization: localStorage.squadGroup ? localStorage.squadGroup : null,
                                        jiraKeyToFind: null,
                                        jiraInternalCaseIdToFind: null,
                                        summaryContainsSearch: null
                                    }, () => {
                                        this.updateLocalStorage();
                                        this.getData();
                                    });
                                }}
                            />
                        </Tooltip>

                    </div>
                </div>
                <div className="kanbanBoards">
                    <DndProvider backend={Backend}>
                        {boards.map((board, index) => (
                            <React.Fragment key={index}>
                                {board}
                            </React.Fragment>))}
                    </DndProvider>
                </div>
            </div>
        );
    }
}

export default KanbanBoard;