import React from "react";
import {Input, message, Button, Select, Checkbox, DatePicker, InputNumber} from 'antd';
import moment from "moment";

import "../../css/overview/GeneralOverview.css";
import axios from "../../axios/axios";
import UserSelect from "../../CommonComponents/selectors/UserSelect";
import {formatDateTimeToLocal} from "../../CommonComponents/Utils";
import EditAccessModule from "../../CommonComponents/EditAccessModule";
import {Ring} from "react-spinners-css";


const {Option} = Select;
const {TextArea} = Input;



class GeneralOverview extends React.Component {
    constructor(props) {
        super(props);
        this.editAccessModuleHandler = this.editAccessModuleHandler.bind(this);
        this.checkUnsavedChanges = this.checkUnsavedChanges.bind(this);

        this.state = {
            db_data: props.data,
            id: props.data["id"] ? props.data["id"] : "",
            case_number: props.data["case_number"] ? props.data["case_number"] : "",
            creator: props.data["creator"] ? props.data["creator"]["label"] : "",
            status: props.data["status"] ? props.data["status"] : "",
            created_at: props.data["created_at"] ? props.data["created_at"] : "",
            last_updated_at: props.data["last_updated_at"] ? props.data["last_updated_at"] : "",
            assessors: props.data["assessors"] ? props.data["assessors"] : "",
            quality_reviewer: props.data["quality_reviewer"] ? {
                key: props.data["quality_reviewer"]["value"],
                value: props.data["quality_reviewer"]["value"],
                label: props.data["quality_reviewer"]["label"]
            } : null,
            abstract_headline: props.data["abstract_headline"] ? props.data["abstract_headline"] : "",
            product: props.data["product"] ? props.data["product"] : "",
            fault_analysis_id: props.data["fault_analysis_id"] ? props.data["fault_analysis_id"] : "",
            pronto_id: props.data["pronto_id"] ? props.data["pronto_id"].join("\t") : "",
            issue_description: props.data["issue_description"] ? props.data["issue_description"] : "",
            triggering_scenario: props.data["triggering_scenario"] ? props.data["triggering_scenario"] : "",
            triggering_scenario_category: props.data["triggering_scenario_category"] ? props.data["triggering_scenario_category"] : "",
            correction_description: props.data["correction_description"] ? props.data["correction_description"] : "",
            code_deficiency: props.data["code_deficiency"] ? props.data["code_deficiency"] : "",
            injection: props.data["injection"] ? props.data["injection"] : null,
            additional_facts: props.data["additional_facts"] ? props.data["additional_facts"] : "",
            inheritance_recommendation: props.data["inheritance_recommendation"] ? props.data["inheritance_recommendation"] : "",
            how_many_RD_requests: props.data["how_many_RD_requests"] ? props.data["how_many_RD_requests"] : 0,

            edit_mode: props.edit_mode,
            editable: false,
            unsavedChangesFlag: false,
            savedClicked: false,
        }
    }


    static getDerivedStateFromProps(props, current_state) {
        if (current_state.db_data !== props.data || current_state.edit_mode !== props.edit_mode) {
            return {
                db_data: props.data,
                id: props.data["id"] ? props.data["id"] : "",
                case_number: props.data["case_number"] ? props.data["case_number"] : "",
                creator: props.data["creator"] ? props.data["creator"]["label"] : "",
                status: props.data["status"] ? props.data["status"] : "",
                created_at: props.data["created_at"] ? props.data["created_at"] : "",
                last_updated_at: props.data["last_updated_at"] ? props.data["last_updated_at"] : "",
                assessors: props.data["assessors"] ? props.data["assessors"] : "",
                quality_reviewer: props.data["quality_reviewer"] ? {
                    key: props.data["quality_reviewer"]["value"],
                    value: props.data["quality_reviewer"]["value"],
                    label: props.data["quality_reviewer"]["label"]
                } : null,
                abstract_headline: props.data["abstract_headline"] ? props.data["abstract_headline"] : "",
                product: props.data["product"] ? props.data["product"] : "",
                fault_analysis_id: props.data["fault_analysis_id"] ? props.data["fault_analysis_id"] : "",
                pronto_id: props.data["pronto_id"] ? props.data["pronto_id"].join("\t") : "",
                issue_description: props.data["issue_description"] ? props.data["issue_description"] : "",
                triggering_scenario: props.data["triggering_scenario"] ? props.data["triggering_scenario"] : "",
                triggering_scenario_category: props.data["triggering_scenario_category"] ? props.data["triggering_scenario_category"] : "",
                correction_description: props.data["correction_description"] ? props.data["correction_description"] : "",
                code_deficiency: props.data["code_deficiency"] ? props.data["code_deficiency"] : "",
                injection: props.data["injection"] ? props.data["injection"] : null,
                additional_facts: props.data["additional_facts"] ? props.data["additional_facts"] : "",
                inheritance_recommendation: props.data["inheritance_recommendation"] ? props.data["inheritance_recommendation"] : "",
                how_many_RD_requests: props.data["how_many_RD_requests"] ? props.data["how_many_RD_requests"] : "0",

                edit_mode: props.edit_mode,
                editable: false,
            }
        }
        return null
    }

    checkUnsavedChanges() {
        function checkUnsavedInjection(state_i, db_data_i) {
            if (state_i && db_data_i) {
                if (state_i.feature_id !== db_data_i.feature_id
                    || state_i.first_build_containing_issue !== db_data_i.first_build_containing_issue
                    || state_i.issue_injected_in_maintenance !== db_data_i.issue_injected_in_maintenance
                    || state_i.name_of_dfc !== db_data_i.name_of_dfc
                    || state_i.time_latest_file_revision !== db_data_i.time_latest_file_revision
                    || state_i.type !== db_data_i.type
                    || state_i.time_merged !== db_data_i.time_merged
                ) {
                    return true;
                }
            } else if (!state_i && !db_data_i) {
                return false;
            } else {
                return true;
            }
            return false;
        }

        function checkUnsavedQualityReviewer(state_q, db_data_q) {
            if (state_q && db_data_q) {
                if (state_q.value !== db_data_q.value
                    || state_q.label !== db_data_q.label
                ) {
                    return true;
                }
            } else if (!state_q && !db_data_q) {
                return false;
            } else {
                return true;
            }
            return false;
        }

        let newUnsavedChangesFlag = false;

        if (checkUnsavedInjection(this.state.injection, this.state.db_data["injection"])
            || checkUnsavedQualityReviewer(this.state.quality_reviewer, this.state.db_data["quality_reviewer"])
            || this.state.status !== this.state.db_data["status"]
            || this.state.abstract_headline !== this.state.db_data["abstract_headline"]
            || this.state.product !== this.state.db_data["product"]
            || this.state.issue_description !== this.state.db_data["issue_description"]
            || this.state.code_deficiency !== this.state.db_data["code_deficiency"]
            || this.state.inheritance_recommendation !== this.state.db_data["inheritance_recommendation"]
            || this.state.correction_description !== this.state.db_data["correction_description"]
            || this.state.triggering_scenario_category !== this.state.db_data["triggering_scenario_category"]
            || this.state.triggering_scenario !== this.state.db_data["triggering_scenario"]
            || this.state.additional_facts !== this.state.db_data["additional_facts"]
            || this.state.how_many_RD_requests !== this.state.db_data["how_many_RD_requests"]
        ) {
            newUnsavedChangesFlag = true;
        }

        if (this.state.unsavedChangesFlag !== newUnsavedChangesFlag) {
            this.setState({
               unsavedChangesFlag: newUnsavedChangesFlag
            },
                this.props.updateOverviewUnsavedChangesFlag(newUnsavedChangesFlag)
            );
        }
    }

    onChangeInput(e, name) {
        if (this.state.editable) {
            if (name === "how_many_RD_requests") {
                this.setState({
                        [name]: e
                    },
                    () => this.checkUnsavedChanges()
                );
            }  else if (`this.state.${name}`) {
                this.setState({
                        [name]: e.target.value
                    },
                    () => this.checkUnsavedChanges()
                );
            }
        }
    }

    onChangeSelect(value, name) {
        if (this.state.editable === true) {
            if (`this.state.${name}`) {
                this.setState({
                    [name]: value
                },
                    () => this.checkUnsavedChanges()
                );
            }
        }
    }

    handleSaveButton(e) {
        if (!this.state.editable || !this.state.unsavedChangesFlag) {
            return;
        }
        else {
            this.setState({
                savedClicked: true,
            })
        }

        const data = {
            fault_analysis_id: this.state.fault_analysis_id, // required field
            status: this.state.status,
            quality_reviewer: this.state.quality_reviewer,
            abstract_headline: this.state.abstract_headline,
            product: this.state.product,
            issue_description: this.state.issue_description,
            triggering_scenario: this.state.triggering_scenario,
            triggering_scenario_category: this.state.triggering_scenario_category,
            correction_description: this.state.correction_description,
            code_deficiency: this.state.code_deficiency,
            injection: this.state.injection,
            additional_facts: this.state.additional_facts,
            inheritance_recommendation: this.state.inheritance_recommendation,
            how_many_RD_requests: this.state.how_many_RD_requests,
        }

        for (let prop in data) {
            if (data[prop] === null) {
                delete data[prop];
            }
        }

        const url = '/rcaeda/' + this.state.case_number + "/";
        axios.put(url, data, {
            headers: {'Authorization': `Token ${localStorage.token}`},
        }).then(response => {
            if (response.status === 200) {
                this.props.updateOverviewProps(data);
                this.props.updateOverviewUnsavedChangesFlag(false);

                message.success({
                    content: 'General form information data was successfully saved!',
                    className: 'statusAlert',
                });

                this.setState({
                    editable: true,
                    db_data: data,
                    unsavedChangesFlag: false,
                    savedClicked: false,
                });
            } else {
                this.setState({
                    savedClicked: false,
                });

                message.error({
                    content: 'Error! Unable to save general form information data!',
                    className: 'statusAlert',
                },5);
            }
        }).catch(response => {
            this.setState({
                savedClicked: false,
            });

            message.error({
                content: 'Error! Unable to save general form information data!',
                className: 'statusAlert',
            },5);
        });
    }

    editAccessModuleHandler(newEditableState) {
        this.setState({
            editable: newEditableState
        });
    }

    render() {
        return (
            <div className="generalOverview">
                <EditAccessModule
                    editMode={this.state.edit_mode}
                    editableChangeHandler={this.editAccessModuleHandler}
                    accessType="general"
                    unsavedChanges={this.state.unsavedChangesFlag}
                    caseNumber={this.state.case_number}
                />

                <div className="dataDiv">
                    <div>
                        <div className="item">
                            <div className="label">Product:</div>
                            <div className="textData">
                                <TextArea
                                    name={"product"}
                                    rows={1}
                                    readOnly={!this.state.editable}
                                    spellCheck={this.state.editable}
                                    className={this.state.editable ? "textArea" : "disabledTextArea"}
                                    value={this.state.product}
                                    onChange={(e) => this.onChangeInput(e, "product")}
                                />
                            </div>
                        </div>
                        <div className="item">
                            <div className="label">Abstract headline:</div>
                            <div className="textData">
                                <TextArea
                                    rows={2}
                                    name={"abstract_headline"}
                                    readOnly={!this.state.editable}
                                    spellCheck={this.state.editable}
                                    className={this.state.editable ? "textArea" : "disabledTextArea"}
                                    value={this.state.abstract_headline}
                                    onChange={(e) => this.onChangeInput(e, "abstract_headline")}
                                />
                            </div>
                        </div>
                        <div className="item">
                            <div className="label">Creator:</div>
                            <div className="textData">
                                <Input
                                    name={"creator"}
                                    rows={1}
                                    readOnly={true}
                                    spellCheck={false}
                                    className={this.state.editable ? "textArea" : "disabledTextArea"}
                                    value={this.state.creator}
                                />
                            </div>
                        </div>
                        <div className="item">
                            <div className="label">Status:</div>
                            <div className="textData">
                                <Select
                                    value={this.state.status}
                                    readOnly={!this.state.editable}
                                    disabled={!this.state.editable}
                                    style={{ width: "100%" }}
                                    onChange={(value) => this.onChangeSelect(value, "status")}>
                                        <Option value="In progress">In progress</Option>
                                        <Option value="Done">Done</Option>
                                </Select>
                            </div>
                        </div>
                        <div className="item" style={{marginBottom: "3px"}}>
                            <div className="label">Assessors:</div>
                            <div className="textData">
                                <TextArea
                                    name="assessors"
                                    rows={4}
                                    spellCheck={false}
                                    readOnly={true}
                                    className={this.state.editable ? "textArea" : "disabledTextArea"}
                                    value={this.state.assessors.map(x => "- "+x).join(",\n")}
                                />
                            </div>
                        </div>
                        <div className="item">
                            <div className="label">Issue description:</div>
                            <div className="textData">
                                <TextArea
                                    name={"issue_description"}
                                    rows={5}
                                    readOnly={!this.state.editable}
                                    spellCheck={this.state.editable}
                                    className={this.state.editable ? "textArea" : "disabledTextArea"}
                                    value={this.state.issue_description}
                                    onChange={(e) => this.onChangeInput(e, "issue_description")}
                                />
                            </div>
                        </div>
                        <div className="item">
                            <div className="label">Code deficiency:</div>
                            <div className="textData">
                                <TextArea
                                    name={"code_deficiency"}
                                    rows={5}
                                    readOnly={!this.state.editable}
                                    spellCheck={this.state.editable}
                                    className={this.state.editable ? "textArea" : "disabledTextArea"}
                                    value={this.state.code_deficiency}
                                    onChange={(e) => this.onChangeInput(e, "code_deficiency")}
                                />
                            </div>
                        </div>
                        <div className="item">
                            <div className="label">Inheritance recommendation:</div>
                            <div className="textData">
                                <TextArea
                                    rows={5}
                                    name={"inheritance_recommendation"}
                                    readOnly={!this.state.editable}
                                    spellCheck={this.state.editable}
                                    className={this.state.editable ? "textArea" : "disabledTextArea"}
                                    value={this.state.inheritance_recommendation}
                                    onChange={(e) => this.onChangeInput(e, "inheritance_recommendation")}
                                />
                            </div>
                        </div>

                        <div className="item">
                            <div className="label">Correction description:</div>
                            <div className="textData">
                                <TextArea
                                    name={"correction_description"}
                                    rows={8}
                                    spellCheck={this.state.editable}
                                    readOnly={!this.state.editable}
                                    className={this.state.editable ? "textArea" : "disabledTextArea"}
                                    value={this.state.correction_description}
                                    onChange={(e) => this.onChangeInput(e, "correction_description")}
                                />
                            </div>
                        </div>
                        <div className="item">
                            <div className="label">Created at:</div>
                            <div className="textData">
                                <Input
                                    name={"created_at"}
                                    rows={1}
                                    readOnly={true}
                                    spellCheck={false}
                                    className={this.state.editable ? "textArea" : "disabledTextArea"}
                                    value={formatDateTimeToLocal(this.state.created_at)}
                                />
                            </div>
                        </div>
                        <div className="item">
                            <div className="label">Last updated at:</div>
                            <div className="textData">
                                <Input
                                    name={"last_updated_at"}
                                    rows={1}
                                    readOnly={true}
                                    spellCheck={false}
                                    className={this.state.editable ? "textArea" : "disabledTextArea"}
                                    value={formatDateTimeToLocal(this.state.last_updated_at)}
                                />
                            </div>
                        </div>
                        <div className="item">
                            <div className="label">Done at:</div>
                            <div className="textData">
                                <Input
                                    name={"done_at"}
                                    rows={1}
                                    readOnly={true}
                                    spellCheck={false}
                                    className={this.state.editable ? "textArea" : "disabledTextArea"}
                                    value={formatDateTimeToLocal(this.state.done_at, "done")}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="item">
                            <div className="label">Fault analysis ID:</div>
                            <div className="textData">
                                <Input
                                    readOnly={true}
                                    rows={1}
                                    name={"fault_analysis_id"}
                                    spellCheck={false}
                                    className={this.state.editable ? "textArea" : "disabledTextArea"}
                                    value={this.state.fault_analysis_id}
                                />
                            </div>
                        </div>
                        <div className="item">
                            <div className="label">Pronto ID:</div>
                            <div className="textData">
                                <TextArea
                                    rows={2}
                                    readOnly={true}
                                    name={"pronto_id"}
                                    spellCheck={false}
                                    className={this.state.editable ? "textArea" : "disabledTextArea"}
                                    value={this.state.pronto_id}
                                />
                            </div>
                        </div>
                        <div className="item">
                            <div className="label">Quality reviewer:</div>
                            <div className="textData">
                                <UserSelect id="qualityReviewerDropDownMenu1"
                                    disabled={!this.state.editable}
                                    style={{width: "100%"}}
                                    value={this.state.quality_reviewer}
                                    placeholder={"Select quality reviewer"}
                                    onChange={(value) => {
                                        if (this.state.editable) {
                                            this.setState({
                                                quality_reviewer: {
                                                    ...value
                                                }}, () => this.checkUnsavedChanges()
                                            );
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="item">
                            <div className="label">Injection type:</div>
                            <div className="textData">
                                <Select value={this.state.injection ? this.state.injection["type"] : null}
                                        disabled={!this.state.editable}
                                        style={{ width: "100%" }}
                                        onChange={(value) => {
                                            if (this.state.editable) {
                                                this.setState(prevState => ({
                                                    injection: {
                                                        ...prevState.injection,
                                                        type: value
                                                    }}), () => this.checkUnsavedChanges()
                                                );
                                            }
                                        }}>
                                    <Option value="New feature">New feature</Option>
                                    <Option value="Defective correction">Defective correction</Option>
                                    <Option value="Optimization/refactoring">Optimization/refactoring</Option>
                                    <Option value="Revealed issue">Revealed issue</Option>
                                    <Option value="Legacy code">Legacy code</Option>
                                </Select>
                            </div>
                        </div>
                        <div className="item">
                            <div className="label">Injection date of when the issue was merged:</div>
                            <div className="textData">
                                <DatePicker
                                    placeholder="Type and select a date"
                                    disabled={!this.state.editable}
                                    value={this.state.injection ? this.state.injection["time_merged"] ? moment(this.state.injection["time_merged"]) : undefined : undefined}
                                    allowClear={false}
                                    onChange={(date) => {
                                        if (this.state.editable) {
                                            this.setState(prevState => ({
                                                injection: {
                                                    ...prevState.injection,
                                                    time_merged: moment.utc(date).format().toString()
                                                }}), () => this.checkUnsavedChanges()
                                            );
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="item">
                            <div className="label">Injection first SW build:</div>
                            <div className="textData">
                                <TextArea
                                    rows={2}
                                    name="injection_first_build_containing_issue"
                                    readOnly={!this.state.editable}
                                    spellCheck={this.state.editable}
                                    className={this.state.editable ? "textArea" : "disabledTextArea"}
                                    value={this.state.injection ? this.state.injection["first_build_containing_issue"] : ""}
                                    onChange={(e) => {
                                        if (this.state.editable) {
                                            this.setState(prevState => ({
                                                injection: {
                                                    ...prevState.injection,
                                                    first_build_containing_issue: e.target.value
                                                }}), () => this.checkUnsavedChanges()
                                            );
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="item">
                            <div className="label">Injected in maintenance (P8)?</div>
                            <div className="textData">
                                <Checkbox
                                    disabled={!this.state.editable}
                                    defaultChecked={this.state.injection ? this.state.injection["issue_injected_in_maintenance"] : false}
                                    onChange={(e) => {
                                        if (this.state.editable) {
                                            this.setState(prevState => ({
                                                injection: {
                                                    ...prevState.injection,
                                                    issue_injected_in_maintenance: e.target.checked
                                                }}), () => this.checkUnsavedChanges()
                                            );
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="item">
                            <div className="label">NameOfDFc:</div>
                            <div className="textData">
                                <TextArea
                                    rows={2}
                                    name="injection_first_build_containing_issue"
                                    readOnly={!this.state.editable}
                                    spellCheck={this.state.editable}
                                    className={this.state.editable && this.state.injection &&
                                    this.state.injection["type"] === "Defective correction"
                                        ? "textArea" : "disabledTextArea"}
                                    value={this.state.injection && this.state.injection["type"] === "Defective correction"
                                        ? this.state.injection["name_of_dfc"] : ""}
                                    onChange={(e) => {
                                        if (this.state.editable) {
                                            this.setState(prevState => ({
                                                injection: {
                                                    ...prevState.injection,
                                                    name_of_dfc: e.target.value,
                                                    feature_id: "",
                                                    time_latest_file_revision: null
                                                }}), () => this.checkUnsavedChanges()
                                            );
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="item">
                            <div className="label">Feature ID:</div>
                            <div className="textData">
                                <TextArea
                                    rows={1}
                                    name="injection_first_build_containing_issue"
                                    readOnly={!this.state.editable}
                                    spellCheck={this.state.editable}
                                    className={this.state.editable && this.state.injection["type"] === "New feature"
                                        ? "textArea" : "disabledTextArea"}
                                    value={this.state.injection && this.state.injection["type"] === "New feature" ?
                                        this.state.injection["feature_id"] : ""}
                                    onChange={(e) => {
                                        if (this.state.editable) {
                                            this.setState(prevState => ({
                                                injection: {
                                                    ...prevState.injection,
                                                    name_of_dfc: "",
                                                    feature_id: e.target.value,
                                                    time_latest_file_revision: null
                                                }}), () => this.checkUnsavedChanges()
                                            );
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        {
                         this.state.editable && this.state.injection && this.state.injection["type"] === "Legacy code" ?
                               <div className="item">
                                    <div className="label">Latest file revision date:</div>
                                    <div className="textData">
                                        <DatePicker
                                            placeholder="Type and select a date"
                                            disabled={!this.state.editable}
                                            allowClear={false}
                                            value={this.state.injection && this.state.injection["time_latest_file_revision"] !== null ?
                                                moment(this.state.injection["time_latest_file_revision"]) : null}
                                            onChange={(date) => {
                                                if (this.state.editable) {
                                                    this.setState(prevState => ({
                                                        injection: {
                                                            ...prevState.injection,
                                                            name_of_dfc: "",
                                                            feature_id: "",
                                                            time_latest_file_revision: moment.utc(date).format().toString()
                                                        }}), () => this.checkUnsavedChanges()
                                                    );
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            :
                            this.state.injection && this.state.injection["type"] === "Legacy code" ?

                               <div className="item">
                                    <div className="label">Latest file revision date:</div>
                                    <div className="textData">
                                        <DatePicker
                                            allowClear={false}
                                            value={this.state.injection && this.state.injection["time_latest_file_revision"] !== null ?
                                                moment(this.state.injection["time_latest_file_revision"]) : null}
                                            placeholder=""
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                            :
                                <div className="item">
                                    <div className="label">Latest file revision date:</div>
                                    <div className="textData">
                                        <DatePicker
                                            allowClear={false}
                                            placeholder=""
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                        }

                        <div className="item">
                            <div className="label">Triggering scenario category:</div>
                            <div className="textData">
                                <Select value={this.state.triggering_scenario_category}
                                        style={{ width: "100%" }}
                                        disabled={!this.state.editable}
                                        onChange={(value) => this.onChangeSelect(value, "triggering_scenario_category")}>
                                    <Option value="Installation & startup">Installation & startup</Option>
                                    <Option value="SW upgrade">SW upgrade</Option>
                                    <Option value="SW fallback">SW fallback</Option>
                                    <Option value="Process of configuration/reconfiguration">Process of configuration/reconfiguration</Option>
                                    <Option value="Not supported configuration">Not supported configuration</Option>
                                    <Option value="OAM operations">OAM operations</Option>
                                    <Option value="Feature interaction & interoperability">Feature interaction & interoperability</Option>
                                    <Option value="OAM robustness (high load/stressful scenarios/long duration)">OAM robustness (high load/stressful scenarios/long duration)</Option>
                                    <Option value="Telecom robustness (high load/mobility/stressful scenarios/long duration)">Telecom robustness (high load/mobility/stressful scenarios/long duration)</Option>
                                    <Option value="Debug (counters/alarms/trace/resource monitoring)">Debug (counters/alarms/trace/resource monitoring)</Option>
                                    <Option value="Reset & recovery">Reset & recovery</Option>
                                    <Option value="HW failure">HW failure</Option>
                                    <Option value="Required customer/vendor specific equipment">Required customer/vendor specific equipment</Option>
                                    <Option value="Unknown triggering scenario">Unknown triggering scenario</Option>
                                </Select>
                            </div>
                        </div>
                        <div className="item">
                            <div className="label">Triggering scenario:</div>
                            <div className="textData">
                                <TextArea
                                    name={"triggering_scenario"}
                                    rows={5}
                                    spellCheck={this.state.editable}
                                    className={this.state.editable ? "textArea" : "disabledTextArea"}
                                    value={this.state.triggering_scenario}
                                    readOnly={!this.state.editable}
                                    onChange={(e) => this.onChangeInput(e, "triggering_scenario")}
                                />
                            </div>
                        </div>


                        <div className="item">
                            <div className="label">Additional facts:</div>
                            <div className="textData">
                                <TextArea
                                    name={"additional_facts"}
                                    rows={8}
                                    spellCheck={this.state.editable}
                                    readOnly={!this.state.editable}
                                    className={this.state.editable ? "textArea" : "disabledTextArea"}
                                    value={this.state.additional_facts}
                                    onChange={(e) => this.onChangeInput(e, "additional_facts")}
                                />
                            </div>
                        </div>

                        <div className="item" style={{gridTemplateColumns: "88% 10%"}}>
                            <div className="label">How many times R&D requested for Symptoms/Logs recollection:</div>
                            <div className="textData">
                                <InputNumber
                                    style={{width: "100%"}}
                                    name="how_many_RD_requests"
                                    min={0}
                                    readOnly={!this.state.editable}
                                    className={this.state.editable ? "textArea" : "disabledTextArea"}
                                    value={this.state.how_many_RD_requests}
                                    onChange={(e) => this.onChangeInput(e, "how_many_RD_requests")}
                                />
                            </div>
                        </div>


                        {this.state.editable ? this.state.unsavedChangesFlag ?
                                <div className="statusMessage unsaved">
                                    You have unsaved changes
                                </div>
                                :
                                <div className="statusMessage">
                                    Nothing to save
                                </div>
                                : null
                        }

                        {this.state.editable ?
                                <div className="generalSaveButtonContainer">
                                    <Button
                                        className={!this.state.unsavedChangesFlag || this.state.savedClicked ? "saveButtonDisabled" : "saveButton"}
                                        onClick={e => {
                                            this.handleSaveButton(e)
                                        }}
                                        disabled={!this.state.unsavedChangesFlag || this.state.savedClicked}
                                        style={{
                                            display: this.state.editable ? "block" : "none"
                                        }}
                                        >Save
                                    </Button>
                                    {this.state.savedClicked ?
                                        <Ring size="55" color="grey" className="generalSavedSpinner"/>
                                        :
                                        null
                                    }
                                </div>
                        :
                            <div style={{margin: "162px"}}/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default GeneralOverview;