import React from "react";
import axios from "../axios/axios";
import {Ring} from "react-spinners-css";
import {Button, Modal, message} from 'antd';
import MailOutlined from "@material-ui/icons/MailOutlined";
import PhoneOutlined from "@material-ui/icons/PhoneOutlined";

import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import {capitalizeFirstLetter} from "./Utils";

import "../css/EditAccessModule.css";


class EditAccessModule extends React.Component {

    constructor(props) {
        super(props);
        const accessId =  props.caseNumber + "_" + props.accessType.replace(" ", "_");

        this.state = {
            editMode: props.editMode,
            accessType: props.accessType,
            caseNumber: props.caseNumber,
            unsavedChanges: props.unsavedChanges ? props.unsavedChanges : false,
            accessId: accessId,
            editAccess: null,
            timeLeft: null
        }

        this.countTimeLeftId = 0;
        this.countTimeLeft = this.countTimeLeft.bind(this);
        if (props.editMode) {
            this.getEditorData(accessId);
        }
    }

    static getDerivedStateFromProps(props, current_state) {
        if (current_state.edit_mode !== props.editMode) {
            return {
                editMode: props.editMode,
                accessType: props.accessType,
                caseNumber: props.caseNumber,
                unsavedChanges: props.unsavedChanges ? props.unsavedChanges : false,
            }
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.editMode !== prevProps.editMode && this.props.editMode) {
            this.getEditorData();
        }
    }

    componentWillUnmount() {
        clearInterval(this.countTimeLeftId);
    }

    getEditorData(accessId=null) {
        const url = '/rcaeda/access/edit/';

        const params = {
            case_number: accessId ? accessId : this.state.accessId
        };

        axios.get(url, {
            headers: {'Authorization': `Token ${localStorage.token}`},
            params: params
        }).then(response => {
            if (response.status === 200) {
                if (response.data.count < 1) {
                    this.setState({
                        editAccess: 404
                    });
                } else {
                    const responseData = response.data.results[0];
                    let validUser = responseData["editor_uid"] === localStorage.username ? true : false;
                    this.setState({
                        editAccess: responseData
                    });
                    this.props.editableChangeHandler(validUser);
                    this.countTimeLeftId = setInterval(this.countTimeLeft, 1000);
                }
            }
        }).catch(error => {
            if (error.response && error.response.status === 404) {
                this.setState({
                    editAccess: 404
                });
            } else {
                this.setState({
                    editAccess: 500
                });
            }
        });
    }

    gainEditAccess() {
        if (this.state.editAccess && this.state.editAccess === 404) {
            const data = {
                case_number: this.state.accessId,
                editor_uid: localStorage.username,
            }

            axios.post(`/rcaeda/access/edit/`, data, {
                headers: {'Authorization': `Token ${localStorage.token}`}
            }).then(response => {
                if (response.status === 201) {
                    this.clearCountTimeLeft();
                    this.setState({
                        editAccess: response.data
                    })
                    this.props.editableChangeHandler(true);
                    this.countTimeLeftId = setInterval(this.countTimeLeft, 1000);

                }
            }).catch(error => {
                message.error({
                    content: 'Unable to gain the access.',
                    className: 'statusAlert',
                    duration: 3
                });
                this.getEditorData();
            });
        }
    }

    revokeEditAccess() {
        if (this.state.editAccess) {
            const data = {
                case_number: this.state.accessId,
                editor_uid: localStorage.username,
                finish_at: this.state.editAccess["start_at"]
            }

            const url = "/rcaeda/access/edit/" + this.state.accessId + "/";
            axios.put(url, data, {
                headers: {'Authorization': `Token ${localStorage.token}`}
            }).then(response => {
                if (response.status === 200) {
                    this.setState({
                        editAccess: 404
                    })
                    this.props.editableChangeHandler(false);
                    this.clearCountTimeLeft();

                }
            }).catch(error => {
                message.error({
                    content: 'Unable to revoke the access. Try again or refresh the page.',
                    className: 'statusAlert',
                    duration: 3
                });
            });
        }
    }

    countTimeLeft() {
        if (this.state && this.state.editAccess) {
            const today = new Date();
            const localFinishAt = new Date(this.state.editAccess["finish_at"]);
            const diffFromNowInSeconds = (localFinishAt.getTime() - today.getTime()) / 1000;

            if (diffFromNowInSeconds >= 0) {
                const allHours = parseInt(diffFromNowInSeconds / 3600);
                const minutes = parseInt(diffFromNowInSeconds / 60 - allHours * 60);
                const days = parseInt(allHours / 24);
                const hours = allHours % 24;

                if (hours > 0 || minutes > 32) {
                    clearInterval(this.countTimeLeftId);
                    this.countTimeLeftId = setInterval(this.countTimeLeft, 60000);
                } else {
                    clearInterval(this.countTimeLeftId);
                    this.countTimeLeftId = setInterval(this.countTimeLeft, 1000);
                }

                let timeToDisplay = "";
                if (days > 0) {
                    timeToDisplay = days + "d " + hours + "h " + minutes + "m";
                } else if (hours > 0) {
                    timeToDisplay = hours + "h " + minutes + "m";
                } else if (minutes >= 30) {
                    timeToDisplay = minutes + "m";
                } else {
                    const seconds = parseInt(diffFromNowInSeconds % 3600 % 60);
                    if (minutes > 0) {
                        timeToDisplay = minutes + "m " + seconds + "s";
                    } else {
                        timeToDisplay = seconds + "s";
                    }
                }
                timeToDisplay = "Time left: " + timeToDisplay;
                this.setState({
                    timeLeft: timeToDisplay
                });
            } else {
                this.clearCountTimeLeft();
            }
        }
    }

    clearCountTimeLeft() {
        clearInterval(this.countTimeLeftId)
        this.setState({
            timeLeft: null,
            editAccess: 404
        });
        this.props.editableChangeHandler(false);
    }

    render() {
        let content = null;
        if (this.state.editAccess) {
            if (this.state.editAccess === 404) {
                content = <div>
                    {capitalizeFirstLetter(this.state.accessType)} section is currently available for editing
                    <Button
                        className="btn gainAccess"
                        onClick={() => this.gainEditAccess()}
                    >
                        Gain access to edit
                    </Button>
                </div>;
            } else if (this.state.editAccess === 500) {
                content = <div className="editor">
                    <span>Unable to fetch editor data</span>
                </div>
            } else if (this.state.editAccess["editor_uid"] === localStorage.username) {
                content = <div>
                    You have editor permissions
                    <div className="editor">
                        <span>{this.state.timeLeft ? this.state.timeLeft : "Time left: loading ..."}</span>
                    </div>
                    <Button
                        className="btn revokeAccess"
                        onClick={() => {
                            if (this.state.unsavedChanges) {
                               Modal.confirm({
                                    title: "Confirm revoke access",
                                    icon: <ExclamationCircleOutlined/>,
                                    content: "You have unsaved changes! Are you sure you want to revoke access to " + this.state.accessType + " section? Remember to save all changes.",
                                    okText: "Revoke",
                                    okType: "danger",
                                    cancelText: "No",
                                    onOk: () => {
                                        this.revokeEditAccess()
                                    }
                                });
                            } else {
                                Modal.confirm({
                                    title: "Confirm revoke access",
                                    icon: <ExclamationCircleOutlined/>,
                                    content: "Are you sure you want to revoke access to " + this.state.accessType + " section? Remember to save all changes.",
                                    okText: "Revoke",
                                    okType: "danger",
                                    cancelText: "No",
                                    onOk: () => {
                                        this.revokeEditAccess()
                                    }
                                });
                            }
                        }}
                    >
                        Revoke access
                    </Button>
                </div>;
            } else {
                const editorDisplayName = this.state.editAccess["editor_display_name"];
                const editorName = editorDisplayName.substring(editorDisplayName.indexOf(",")+1, editorDisplayName.indexOf(" ("));

                const mailSubject = "?subject=5WHY tool: access request to " + this.state.caseNumber + " " + this.state.accessType;
                const mailBody = "&body=Hi" + editorName + ",%0D%0A%0D%0A" +
                    "I would like to access to " + this.state.caseNumber + " " + this.state.accessType + " editing mode."  +
                    "%0D%0A%0D%0A" +
                    "Best regards,%0D%0A" +
                    localStorage.fullName;

                let mailInfo =
                    <a
                        href={"mailto:" + this.state.editAccess["editor_mail"] + mailSubject + mailBody}
                    >
                        <MailOutlined className="icon"/>
                        {this.state.editAccess["editor_mail"]}
                    </a>
                ;

                let callViaTeamsInfo =
                    <a
                        href={"callto:" + this.state.editAccess["editor_mail"]}
                    >
                        <PhoneOutlined className="icon"/>
                        Call via teams
                    </a>
                ;

                let contactInfo = this.state.editAccess["editor_mobile"] ?
                    <div>
                        <span>{mailInfo}</span>
                        <span className="editorMobile">{callViaTeamsInfo}</span>
                        <span className="editorMobile">
                            <PhoneOutlined className="icon"/>{this.state.editAccess["editor_mobile"]}
                        </span>
                    </div>
                    :
                    <div>
                        <span>{mailInfo}</span>
                        <span className="editorMobile">{callViaTeamsInfo}</span>
                    </div>;


                content = <div className="editor">
                    {capitalizeFirstLetter(this.state.accessType)} section is currently being edited by {this.state.editAccess["editor_display_name"]}
                    {contactInfo}
                    <span>{this.state.timeLeft ? this.state.timeLeft : "Time left: loading ..."}</span>
                </div>;
            }
        } else {
            content = <div>
                Checking editor permissions
                <Ring size="14" color="grey"/>
            </div>
        }

        return (this.state.editMode ?
            <div className="editAccessModule">
                {content}
            </div>
            :
            null
        );
    }
}

export default EditAccessModule;
