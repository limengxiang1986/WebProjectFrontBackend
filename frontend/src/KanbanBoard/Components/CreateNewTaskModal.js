import Modal from "antd/es/modal/Modal";
import React from "react";
import axios from "../../axios/axios";
import {Form, Input, Button, Select} from 'antd';
import "../../css/CreateNewTaskModal.css";

const {Option} = Select;
const {TextArea} = Input;

class CreateNewTaskModal extends React.Component {

    formRef = React.createRef();
    updateBoardOnCreateTask;
    addTask;

    constructor(props) {
        super(props);
        this.state = {
            showPopUp: false,
            messageField: "",
            errorField: "",
            users: props.users
        };
        this.addTask = props.addTask;
    }

    static getDerivedStateFromProps(props, current_state) {
    if (current_state.users !== props.users) {
      return {
        users: [...props.users]
      }
    }
    return null
   }

    showModal = e => {
        this.setState({
            showPopUp: true
        });
    };

    handleAddClick(e) {

        const data = {
            "assignee_id": e.assignee_id,
            "reporter_id": localStorage.id,
            "squad_group": this.state.users.find(u => u.id === e.assignee_id)["squad_group"],
            "title": e.title,
            "description": e.description,
            "priority": e.priority,
            "status": e.status,
        };

        axios.post(`/kanbanboard/`, data, {
            headers: {'Authorization': `Token ${localStorage.token}`}
        }).then(response => {
            if (response.status === 201) {
                this.setState({
                    messageField: "Task successfully created",
                    errorField: "",
                });
                this.formRef.current.resetFields();
                this.addTask(response.data);

            } else {
                this.setState({
                    showPopUp: true,
                    messageField: "",
                    errorField: "Cannot create task (error)"
                });
            }
        });


    }

    handleCancelClick(e) {
        this.setState({
            showPopUp: false,
            messageField: "",
            errorField: ""
        });
        this.formRef.current.resetFields();
    }

    render() {
        return (
            <div>
                <button className="CreateButton" onClick={e => {
                    this.showModal()
                }}>Create new task
                </button>


                <Modal
                    className={"modal"}
                    title="Create new task"
                    visible={this.state.showPopUp}
                    onCancel={e => {
                        this.handleCancelClick(e)
                    }}
                    footer={[
                        <Button form="createTask" className="CreateButton" key="submit" htmlType="submit">
                            Create
                        </Button>
                    ]}

                >
                    <Form
                        name="createTask"
                        onFinish={e => this.handleAddClick(e)}
                        ref={this.formRef}
                        labelCol={{span: 6}}
                        wrapperCol={{span: 18}}
                    >

                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input title of the task!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input description of the task!',
                                },
                            ]}
                        >
                            <TextArea rows={3}/>
                        </Form.Item>

                        <Form.Item
                            label="Priority"
                            name="priority"
                            initialValue="2"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                placeholder="Select a priority"
                            >
                                <Option value="1">1 - Low</Option>
                                <Option value="2">2 - Medium</Option>
                                <Option value="3">3 - High</Option>
                                <Option value="4">4 - Critical</Option>
                            </Select>
                        </Form.Item>


                        <Form.Item
                            label="Assignee"
                            name="assignee_id"
                            initialValue={localStorage.id}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                placeholder="Select an assignee"
                            >
                                {this.state.users.map((user) => (
                                    <Select.Option value={user["id"]}>{user["full_name"]} ({user["squad_group"]})</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Status"
                            name="status"
                            initialValue="To-Do"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                placeholder="Select a status"
                            >
                                <Option value="To-Do">To-Do</Option>
                                <Option value="In progress">In progress</Option>
                                <Option value="In review">In review</Option>
                            </Select>
                        </Form.Item>


                    </Form>

                    <label className="MessageField">{this.state.messageField}</label>
                    <label className="ErrorField">{this.state.errorField}</label>

                </Modal>
            </div>
        );
    }
}

export default CreateNewTaskModal;