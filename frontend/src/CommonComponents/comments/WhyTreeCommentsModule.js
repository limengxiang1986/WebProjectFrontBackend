import React from "react";
import "../../css/comments/WhyTreeCommentsModule.css";
import {Button, message, Popover, Tooltip} from "antd";
import {MessageOutlined} from "@ant-design/icons";
import {
    checkIfNotAnswered,
    findObjectByLabel,
    idGenerator
} from "../../List5Why/Overview/WhyTree/WhyTreeCommonFunctions";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import _ from "lodash";


class WhyTreeCommentsModule extends React.Component {

    constructor(props) {
        super(props);

        let copyNodeDatum = _.cloneDeep(this.props.nodeDatum)
        let copyNodeDatumOld = _.cloneDeep(copyNodeDatum)

        this.state = {
            visible: false,
            treeState: this.props.state ? this.props.state : null,
            nodeDatum: copyNodeDatum,
            nodeDatumOld: copyNodeDatumOld,
            notAnswered: false,
            refreshStateVariable: false,
            alertText: "",
            typeOfTheAlert: "none",
            editable: this.props.editable
        }

    }

    componentDidUpdate(prevProps, prevState, Snapshot) {
        if(prevProps.nodeDatum !== this.props.nodeDatum) {

            let copyNodeDatum = _.cloneDeep(this.props.nodeDatum)
            let copyNodeDatumOld = _.cloneDeep(copyNodeDatum)

            this.setState({
                nodeDatum: copyNodeDatum,
                nodeDatumOld: copyNodeDatumOld,
                treeState: this.props.state
            })
        }
        else if(prevProps.editable !== this.props.editable) {
            this.setState({
                editable: this.props.editable,
                refreshStateVariable: this.state.refreshStateVariable,
            })
        }
    }


    handleClickChange = visible => {
        if(this.state.visible) {

            let copyNodeDatum = _.cloneDeep(this.state.nodeDatumOld)

            this.setState({
                nodeDatum: copyNodeDatum
            })

            this.state.treeState.setState({
                activeCommentSection: false
            })

        }
        else {
            this.state.treeState.setState({
                activeCommentSection: true
            })
        }

        this.setState({
            visible: visible,
            refreshStateVariable: !this.state.refreshStateVariable
        });


    }

    hidePopover(state) {
       state.setState({
            visible: false
        });
    }

    updateCommentList(state) {
        state.setState({
            refreshStateVariable: !state.state.refreshStateVariable
        })
    }

    displayAlertText(state, type, mode, time) {
        if (mode === "add")
            state.setState({
                alertText: type === "comment" ? "The comment has been added!" : "The answer has been added!",
                typeOfTheAlert: mode
            })
        else if (mode === "edit") {
            state.setState({
                alertText: type === "comment" ? "The comment has been updated!" : "The answer has been updated!",
                typeOfTheAlert: mode
            })
        }
        else if (mode === "remove") {
            state.setState({
                alertText: type === "comment" ? "The comment has been removed!" : "The answer has been removed!",
                typeOfTheAlert: mode
            })
        }
        else {
           state.setState({
                alertText: "Oops! Something went wrong!",
                typeOfTheAlert: "error"
            })
        }

        setTimeout(() => {
            state.setState({
                alertText: "",
                typeOfTheAlert: "none"
            })
        }, time * 1000)
    }


    saveCommentSection() {

        this.updateCommentList(this)

        if(this.state.treeState !== null && this.state.nodeDatum !== null) {
            let copyObj = _.cloneDeep(this.state.treeState.state.data)

            let foundObj = findObjectByLabel(copyObj, this.state.nodeDatum.id)

            if(foundObj !== null) {
                let comparison = _.isEqual(foundObj.comments, this.state.nodeDatum.comments)

                if (comparison === false) {

                    let tempComment = _.cloneDeep(this.state.nodeDatum.comments)

                    let notAnswered = checkIfNotAnswered(tempComment.commentList)

                    tempComment.numberOfComments = tempComment.commentList.length
                    tempComment.notAnswered = notAnswered
                    foundObj.comments = tempComment

                    this.state.treeState.setState({
                        data: copyObj,
                        activeCommentSection: false,
                        status: 3,
                    })

                    this.setState({
                        visible: false,
                        notAnswered: notAnswered
                    });


                    message.success({
                        content: 'Comments section was successfully changed!',
                        className: 'statusAlert',
                    })

                } else {
                    this.state.treeState.setState({
                        activeCommentSection: false
                    })

                    this.setState({
                        visible: false
                    });


                }
            }
            else {
                this.state.treeState.setState({
                    activeCommentSection: false
                })

                this.setState({
                    visible: false
                });

                message.error({
                    content: 'Something went wrong!',
                    className: 'statusAlert',
                })
            }

        } else {
            this.state.treeState.setState({
                activeCommentSection: false
            })

            this.setState({
                visible: false
            });

            message.error({
                content: 'Unable to change the comments section! Something went wrong!',
                className: 'statusAlert',
            })
        }
    }


    render() {
        return (
            <Popover
                content={
                    <div className="whyTreeCommentSectionModule" style={{height: "715px", width: "450px"}}>
                        <div
                        className="commentSectionAlertMessage"
                        style={this.state.typeOfTheAlert === "add" ? {color: "green"} : this.state.typeOfTheAlert === "edit" ? {color: "orange"} :
                            this.state.typeOfTheAlert === "remove" ? {color: "red"} : {color: "red"} }
                        >
                            {this.state.alertText}
                        </div>
                        <div id={"commentList"} style={this.state.editable ? {height: "450px", width: "450px", overflowY: "scroll"}
                        : {height: "650px", width: "450px", overflowY: "scroll"}}>
                            {this.state.nodeDatum.comments && typeof this.state.nodeDatum.comments.commentList !== 'undefined' &&
                            this.state.nodeDatum.comments.commentList.length > 0 ?
                                this.state.nodeDatum.comments.commentList.map(comment =>
                                    <div key={idGenerator()}>
                                        <Comment
                                            style={{marginBottom: "15px", marginRight: "25px"}}
                                            id={comment.id}
                                            commentList={this.state.nodeDatum.comments.commentList}
                                            comment={comment}
                                            author={comment.author}
                                            author_uid={comment.author_uid}
                                            text={comment.content}
                                            createdAt={comment.createdAt}
                                            editedAt={comment.editedAt}
                                            type="5WhyTreeComment"
                                            titleColor="#ef8405"
                                            refreshList={this.updateCommentList}
                                            commentListState={this}
                                            editable={this.state.editable}
                                            removable={this.state.editable}
                                            alertMessage={this.displayAlertText}

                                        />
                                        {comment.answers.map(answer =>
                                            <div key={idGenerator()}>
                                                <Comment
                                                    style={{marginLeft: "50px", marginBottom: "15px", marginRight: "25px"}}
                                                    id={answer.id}
                                                    commentList={comment.answers}
                                                    comment={answer}
                                                    author={comment.author}
                                                    author_uid={comment.author_uid}
                                                    text={answer.content}
                                                    createdAt={answer.createdAt}
                                                    editedAt={answer.editedAt}
                                                    type="answer"
                                                    titleColor="green"
                                                    refreshList={this.updateCommentList}
                                                    commentListState={this}
                                                    editable={this.state.editable}
                                                    removable={this.state.editable}
                                                    alertMessage={this.displayAlertText}

                                                />
                                            </div>

                                        )}
                                        {this.state.editable ?
                                            <CreateComment commentList={comment.answers}
                                                       type="answer"
                                                       refreshList={this.updateCommentList}
                                                       commentListState={this}
                                                       alertMessage={this.displayAlertText}
                                                       editable={this.state.editable}
                                                       refreshed={this.state.refreshStateVariable}
                                            />
                                        :
                                            null
                                        }
                                    </div>
                                )
                            :
                                <div className="emptyCommentListText">
                                    {"There aren't any comments for this section yet!"}
                                </div>
                            }
                        </div>
                        {this.state.editable ?
                            <CreateComment commentList={this.state.nodeDatum.comments.commentList}
                                           type="comment"
                                           refreshList={this.updateCommentList}
                                           commentListState={this}
                                           alertMessage={this.displayAlertText}
                                           editable={this.state.editable}
                            />
                        :
                            null
                        }

                        {this.state.editable ?
                            <Button className="commentsButton" onClick={() => {this.saveCommentSection()}}>
                                Apply changes
                            </Button>
                        :
                            null
                        }
                    </div>
            }
            title={this.state.nodeDatum.type === "branch" ? "Comments of this Branch section: " : this.state.nodeDatum.type ===
                "why_question" ? "Comments of this Why section: " : this.state.nodeDatum.type === "cause" &&
                this.state.nodeDatum.branch_type === "RCA" ?
                "Comments of this Root Cause section: " : this.state.nodeDatum.type === "cause" &&
                this.state.nodeDatum.branch_type === "EDA" ? "Comments of this Escape Cause section: "
                : this.state.nodeDatum.type === "action" ? "Comments of this Action section: " : "Comments of this section: "}
            trigger="click"
            className={this.state.treeState.state.activeCommentSection ? "notActiveCommentSection" : ""}
            visible={this.state.visible}
            onVisibleChange={this.handleClickChange}>
                <Tooltip color={"rgb(18,65,145)"} title="Add review comments">
                    <span
                        className={(this.state.nodeDatum.comments && this.state.notAnswered &&
                        this.state.notAnswered === true) || (this.state.nodeDatum.comments && this.state.nodeDatum.comments.notAnswered === true) ?
                            "clickWhyIcon clickWhyCommentIcon notAnswered"
                        :
                            "clickWhyIcon clickWhyCommentIcon"
                        }
                        style={{marginRight: "25px"}}
                    >
                        <MessageOutlined/>
                        <span className="commentsIconNumber" >
                            {this.state.nodeDatum.comments.commentList.length}
                        </span>
                    </span>
                </Tooltip>
            </Popover>
        )
    }

}

export default WhyTreeCommentsModule;
