import React from "react";
import {Input} from "antd";
import "../../css/comments/CreateComment.css";
import {Button} from "@material-ui/core";
import {idGenerator} from "../../List5Why/Overview/WhyTree/WhyTreeCommonFunctions";
import moment from "moment";

const {TextArea} = Input;


class CreateComment extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            text: this.props.text ? this.props.text : "",
            type: this.props.type === "answer" ? "answer" : "comment",
            commentModuleState: this.props.commentListState,
            commentList: this.props.commentList,
            editable: this.props.editable
        }

    }

    componentDidUpdate(prevProps, prevState, Snapshot) {
        if(prevProps.commentList !== this.props.commentList) {
            this.setState({
                commentList: this.props.commentList
            })
        }
    }


    onChange(text) {
        this.setState({
            text: text,
        })
    }

    createComment() {
        if(this.state.commentList !== null && this.state.text !== "") {

            let answer = {
                author: localStorage.displayName,
                author_uid: localStorage.username,
                content: this.state.text,
                id: idGenerator(),
                createdAt: moment.utc(new Date()),
                editedAt: null,
            }

            let commentList = this.state.commentList;

            if(this.state.type === "comment") {
                let comment = {...answer, answers: []}
                commentList.push(comment)
            }
            else {
                commentList.push(answer)
            }



            this.setState({
                commentList: commentList,
                text: ""
            })

            if(this.props.refreshList && this.props.commentListState) {
                this.props.refreshList(this.props.commentListState);
            }


            if(this.props.alertMessage && this.props.commentListState) {
                this.props.alertMessage(this.props.commentListState, this.state.type === "comment" ? "comment" : "answer", "add", 4.5)
            }

        }
        else {
            if(this.props.alertMessage && this.props.commentListState) {
                this.props.alertMessage(this.props.commentListState, this.state.type === "comment" ? "comment" : "answer", "error", 7.5)
            }
        }
    }


    render() {
        return (
            <div className={this.state.type === "comment" ? "create createComment" : "create createAnswer" }>
                <div className="createTitle">
                    {this.state.type === "comment" ? "Create new comment:" : "Answer the comment:"}
                </div>
                <TextArea
                    className="createCommentTextArea"
                    placeholder={this.state.type === "comment" ? "Write your comment here:" : "Write your answer here:"}
                    value={this.state.text}
                    onChange={(e) => {this.onChange(e.target.value)}}
                    disabled={!this.state.editable}
                    autoSize={{ minRows: 4, maxRows: 8}}
                />
                <Button className={this.state.type === "comment" ? this.state.text === "" || !this.state.editable ? "createButtonDisabled" : "createButton" :
                    this.state.text === "" || !this.state.editable ? "answerButtonDisabled" : "answerButton"}
                        onClick={() => {this.createComment()}}
                        disabled={this.state.text === "" || !this.state.editable}
                    >
                    {this.state.type === "comment" ? "Create" : "Answer"}
                </Button>
            </div>
        )
    }

}

export default CreateComment;
