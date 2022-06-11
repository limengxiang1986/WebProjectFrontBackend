import React from "react";
import {Input, Popconfirm} from "antd";
import Person from "@material-ui/icons/Person";
import "../../css/comments/Comment.css";
import {Button} from "@material-ui/core";
import {idGenerator} from "../../List5Why/Overview/WhyTree/WhyTreeCommonFunctions";
import {formatDateTimeToLocal} from "../Utils";

const {TextArea} = Input;


class Comment extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            id: this.props.id ? this.props.id : idGenerator(),
            style: this.props.style,
            commentList: this.props.commentList ? this.props.commentList : null,
            comment: this.props.comment ? this.props.comment : null,
            image: this.props.image ? this.props.image : null,
            author: this.props.author,
            author_uid: this.props.author_uid,
            text: this.props.text,
            type: this.props.type ? this.props.type : "standard",
            createdAt: this.props.createdAt,
            editedAt: this.props.editedAt,
            editable: this.props.editable,
            editing: false,
            removable: this.props.removable,
            disabled: true,
            titleStyle: this.props.titleColor ?
                {
                    fontWeight: "600",
                    color: this.props.titleColor
                }
                :
                {
                    fontWeight: "600",
                    color: "black"
                },
        }

    }

    componentDidUpdate(prevProps, prevState, Snapshot) {
        if(prevProps.comment !== this.props.comment || prevProps.commentList !== this.props.commentList || prevProps.id !== this.props.id) {
            this.setState({
                id: this.props.id ? this.props.id : idGenerator(),
                style: this.props.style,
                commentList: this.props.commentList ? this.props.commentList : null,
                comment: this.props.comment ? this.props.comment : null,
                image: this.props.image ? this.props.image : null,
                author: this.props.author,
                author_uid: this.props.author_uid,
                text: this.props.text,
                type: this.props.type ? this.props.type : "standard",
                createdAt: this.props.createdAt,
                editedAt: this.props.editedAt,
                editable: this.props.editable,
                editing: false,
                removable: this.props.removable,
                disabled: true,
                titleStyle: this.props.titleColor ?
                    {
                        fontWeight: "600",
                        color: this.props.titleColor
                    }
                    :
                    {
                        fontWeight: "600",
                        color: "black"
                    },
            })
        }
    }

    startEditing() {
        this.setState({
            editing: true,
            oldVersionText: this.state.text
        })
    }

    cancelEditing() {
       this.setState({
            editing: false,
            text: this.state.oldVersionText
        })
    }


    editComment() {
        if(this.state.comment !== null && this.state.text !== "") {
            let comment = this.state.comment

            if(this.state.text !== this.state.oldVersionText) {

                comment.content = this.state.text
                comment.editedAt = new Date()

                this.setState({
                    comment: comment
                })

                if (this.props.refreshList && this.props.commentListState) {
                    this.props.refreshList(this.props.commentListState);
                }

                if(this.props.alertMessage && this.props.commentListState) {
                    this.props.alertMessage(this.props.commentListState, this.state.type === "answer" ? "answer" : "comment", "edit", 4.5)
                }
            }
            else {
                this.cancelEditing()
            }
        }
        else {
            if(this.props.alertMessage && this.props.commentListState) {
                this.props.alertMessage(this.props.commentListState, this.state.type === "answer" ? "answer" : "comment", "error", 7.5)
            }
        }


    }

    removeComment() {
        if(this.state.commentList !== null) {
            let commentIndex = this.state.commentList.findIndex(n => n.id === this.state.id);
            if (commentIndex !== null) {
                let commentList = this.state.commentList;
                commentList.splice(commentIndex, 1);


                this.setState({
                    commentList: commentList
                })

                if(this.props.refreshList && this.props.commentListState) {
                    this.props.refreshList(this.props.commentListState);
                }

                if(this.props.alertMessage && this.props.commentListState) {
                    this.props.alertMessage(this.props.commentListState, this.state.type === "answer" ? "answer" : "comment", "remove", 4.5)
                }
            }
            else {
                if(this.props.alertMessage && this.props.commentListState) {
                    this.props.alertMessage(this.props.commentListState, this.state.type === "answer" ? "answer" : "comment", "error", 7.5)
                }
            }
        }
    }

    onChange(text) {
        this.setState({
            text: text
        })
    }

    render() {
        return (
            <div className="commentComponent" style={this.state.style}>
                <div style={this.state.titleStyle}>
                    {!this.state.editing ?
                    <span>
                        <Person style={this.state.titleStyle} className={'profile-icon'}/> {this.state.author && this.state.author !== "" &&
                        this.state.author !== null ? this.state.author : "X"}
                        {this.state.type === "5WhyTreeComment" || this.state.type === "standard" ?
                        " commented:" : " answered:"}
                    </span>
                    :
                    <span className="editTitleStyle">
                        {this.state.type === "answer" ?
                            "You are currently editing this answer:"
                            :
                            "You are currently editing this comment:"}
                    </span>
                    }
                </div>
                {
                    !this.state.editing ?
                        <div className="date createdAt">
                            Created at: {formatDateTimeToLocal(this.state.createdAt)}
                        </div>
                    :
                        null
                }
                <TextArea
                    className={this.state.type === "standard" || this.state.editing ? "textAreaInputComment textAreaInputStandardComment" :
                        this.state.type === "5WhyTreeComment" ?
                        "textAreaInputComment textAreaInput5WhyTreeComment" : "textAreaInputComment textAreaInputAnswerComment"}
                    value={this.state.text}
                    onChange={(e) => {this.onChange(e.target.value)}}
                    disabled={!this.state.editing}
                    autoSize={{ minRows: 1, maxRows: 6}}
                />
                {this.state.editing ?
                    <div style={{display: "flex"}}>
                        <Button className="cancelButton" onClick={() => {this.cancelEditing()}}>
                            Cancel
                        </Button>
                        <Button className="saveEditButton" onClick={() => {this.editComment()}}>
                            Edit
                        </Button>
                    </div>
                    :
                    <div style={{display: "flex"}}>
                        { this.state.editable && this.state.author === localStorage.displayName && this.state.author_uid === localStorage.username ?
                            <Button className="editButton" onClick={() => {this.startEditing()}} >
                                Edit
                            </Button>
                            :
                            null
                        }
                        {this.state.commentList !== null && this.state.removable && localStorage.displayName && this.state.author_uid === localStorage.username ?
                            <Popconfirm
                                className={"commentPopConfirm"}
                                title={this.state.type === "answer" ? "Are you sure that you want to delete this answer?" :
                                "Are you sure that you want to delete this comment?"}
                                onConfirm={(e) => {
                                    this.removeComment()
                                }}
                                onCancel={() => {
                                }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button className="removeButton" >
                                    Delete
                                </Button>
                            </Popconfirm>
                            :
                            null
                        }
                       {
                        this.state.editedAt !== null ?
                            <div className="date editedAt">
                                Modified at: {formatDateTimeToLocal(this.state.editedAt)}
                            </div>
                        :
                            null
                        }
                    </div>
                }

            </div>
        )
    }

}

export default Comment;
