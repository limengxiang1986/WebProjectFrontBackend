import React from "react";
import {Button, Collapse, Popconfirm, message, Form, Input, Select, DatePicker, AutoComplete} from 'antd';
import '../../css/oldFilesThatCanBeUsedLaterOn/WhyForm.css';

import PlusOutlined from "@ant-design/icons/PlusOutlined";
import MinusOutlined from "@ant-design/icons/MinusOutlined";
import EditOutlined from "@ant-design/icons/EditOutlined";
import SaveOutlined from "@ant-design/icons/SaveOutlined";

import Modal from "antd/es/modal/Modal";
import axios from "../../axios/axios";
import TextArea from "antd/es/input/TextArea";

const { Panel } = Collapse;

class WhyForm extends React.Component {

    formRefAddWhy = React.createRef();
    formRefEditWhy = React.createRef();
    formRefAddAction = React.createRef();



    constructor(props) {
        super(props);

        let crData = [
                      {
                        why: "Why 1",
                        description: "Some description text ..",
                        root_cause: [{
                                statement: "root statement",
                                actions: [{

                            }]
                        }],
                        children: [
                          {
                            why: "Why 1-1",
                            description: "Some description text ..",
                              root_cause: [{
                                    statement: "root statement",
                                    actions: [{

                                }]
                            }],
                            children: [
                              {
                                why: "Why 1-1-1",
                                description: "Some description text ..",
                                root_cause: [{
                                    statement: "root statement",
                                    actions: [{

                                    }]
                                }],
                                children: [
                                  {
                                    why: "Why 1-1-1-1",
                                    description: "Some description text ..",
                                    children: [
                                        {
                                            why: "Why 1-1-1-1-1",
                                            description: "Some description text ..",
                                            children: [],
                                            root_cause: [{
                                                statement: "root statement",
                                                actions: [{

                                                }]
                                            }]
                                        }
                                    ]
                                  },
                                  {
                                    why: "Why 1-1-1-2",
                                    description: "Some description text ..",
                                    root_cause: [{
                                        statement: "root statement",
                                        actions: [{

                                        }]
                                    }],
                                    children: [
                                        {
                                            why: "Why 1-1-1-2-1",
                                            description: "Some description text ..",
                                            children: [],
                                            root_cause: [{
                                                statement: "root statement",
                                                actions: [{

                                                }]
                                            }]
                                        }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                           why: "Why 1-2",
                           description: "Some description text ..",
                           children: [],
                           root_cause: [{
                               statement: "root statement",
                               actions: [{
                                            action_proposal: "ap",
                                            cause_category: "rcc",
                                            cause_subcategory: "rcsc",
                                            action_type: "rct",
                                            assigned_to: "at",
                                            ai_id: "rai",
                                            completion_target_date: "2021-02-23T12:20:00Z"
                                        },
                                        {
                                            action_proposal: "a2p",
                                            cause_category: "12rcc",
                                            cause_subcategory: "rcsc",
                                            action_type: "rct2",
                                            assigned_to: "a3t",
                                            ai_id: "rai4",
                                            completion_target_date: "2021-07-23T12:20:00Z"
                                        }]
                           }]
                          }
                        ]
                      },
                      {
                        why: "Why 2",
                        description: "Some description text ..",
                        children: [],
                        root_cause: [{
                            statement: "root statement",
                            actions: [{

                            }]
                        }]
                      }
                    ];

        this.state = {
            userFormData: [],
            data: crData,
            header: "",
            popupAdd: false,
            popupRemoveAlert: false,
            popupEdit: false,
            popupAction: false

        }

    }



    componentDidMount() {
        //checking if someone is just entering the URL
        if(this.props.location.state === undefined) {

            this.props.history.push("/newRcaAndEda/rcaForm");
        }
        else {

            this.setState({
                header: this.props.location.state.data.header
            })
        }


        //getting list of users
        const result = axios.get(`/users-lessdata/`,
                        {
                        headers: {'Authorization': `Token ${localStorage.token}`}
                        }).then(response => {

            if (response.status === 200) {

                let usersData = response.data.results;
                let users = [];
                let assignToMe = {};
                let squadGroup = {};
                let squadGroupArray = []
                let others = {};
                let othersArray = []

                 assignToMe = {
                    label: "Assign to me:",
                    options: [{value: localStorage["fullName"] + " (" + localStorage["squadGroup"] + ")"}]
                }

                usersData.map(user => {
                    //users.push({value: user["full_name"] + " (" + user["squad_group"] + ")"})

                    if(user["full_name"] != localStorage["fullName"]) {

                        if(user["squad_group"] == localStorage["squadGroup"]) {
                            squadGroupArray.push({
                                value: user["full_name"] + " (" + user["squad_group"] + ")"
                            })
                        }
                        else {
                            othersArray.push({
                                value: user["full_name"] + " (" + user["squad_group"] + ")"
                            })
                        }
                    }

                    squadGroup = {
                        label: "Squad group:",
                        options: squadGroupArray
                    }

                    others = {
                        label: "Others:",
                        options: othersArray
                    }

                })

                users.push(assignToMe);
                users.push(squadGroup);
                users.push(others)

                //console.log(users)

                this.setState({
                    users: users
                })

            }
        }).catch(error => {
            //console.log(error);
        })

    }

    addWhy(event) {

        //console.log("addwhy")

        let title

        //console.log(data.why);

        // if(data.children.length === 0) {
        //     let index = 1
        //     title =
        // }

        this.state.tempData.push({
            why: this.state.why,
            description: event.whyDescription,
            children: [],
            root_cause: [{
                statement: "root statement",
                actions: [{

                }]
            }]
        });

        //console.log(this.state.data);

        this.setState({
            refreshState: true,
            popupAdd: false
        })

        message.success({
            content: 'Why was successfully added!',
            className: 'statusAlert',
        });
    }

    deleteWhy(data, why) {
        for (let i = 0; i < data.length; i++) {
            //console.log(data[i].why);
            if (data[i].why == why) {
                data.splice(i);
            }
        }

        this.setState({
            refreshState: true
        })

        message.success({
            content: 'Why was successfully removed!',
            className: 'statusAlert',
        });
    }

    showWhyRemoveAlert(e) {
        this.setState({popupRemoveAlert: true});
    }

    hideWhyRemoveAlert(e) {
        this.setState({popupRemoveAlert: false});
    }

    showWhyAddPopup(data, number, oldTitle) {
        let why = "Why " + oldTitle + "-" + number

        this.setState({
            popupAdd: true,
            why: why,
            tempData: data
        });
    }

    hideWhyAddPopup(e) {
        this.setState({
            popupAdd: false,
            why: ""
        });
    }

    showWhyEditPopup(e, description, data) {
        this.setState({
            popupEdit: true,
            tempDescription: description,
            tempData: data
        });
    }

    hideWhyEditPopup(e) {

        this.setState({
            popupEdit: false,
            tempDescription: "",
        });
    }

    editWhy(event) {

        this.state.tempData.description = event.whyDescription

        this.setState({
            tempData: "",
            tempDescription: "",
            popupEdit: false,
        })

        message.success({
            content: 'Why was successfully edited!',
            className: 'statusAlert',
        });
    }

    showActionAddPopup(e) {
        this.setState({popupAction: true});
    }

    hideActionAddPopup(e) {
        this.setState({popupAction: false});
        Modal.destroyAll();
    }




    render() {

        const WhyFormCascadeView = ({data, prevData, level=1, number=1, oldTitle = "1"}) => {
            let title = "";

            return (
                <div className="why">

                    <Button className="btnAdd" type="primary" onClick={() => {
                        this.showWhyAddPopup(data, number, oldTitle)
                    }}
                            htmlType="submit">
                        <PlusOutlined style={{marginRight: "3px"}}/> Add Why
                    </Button>
                    {data.map((m, index) => {
                        return (
                            <Collapse className="why" key={index} defaultActiveKey={data}>
                                <Panel key={m} header={"Why " + oldTitle + "-" + number}>
                                    <Popconfirm
                                        className={"whyFormPopConfirm"}
                                        title="Are you sure to delete this Why and its all descendants?"
                                        onConfirm={() => {
                                            this.deleteWhy(data, m.why)
                                        }}
                                        onCancel={() => {}}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button className="btnRemove" type="primary" onClick={() => {

                                        }}
                                                style={{backgroundColor: "mistyrose", width: "100%", color: "black"}}
                                                htmlType="submit">
                                            <MinusOutlined style={{marginRight: "5px"}}/> Remove Why
                                        </Button>
                                    </Popconfirm>
                                    <div style={{paddingBottom: "15px"}}>
                                        <br/>
                                        <div className="whyDescription" style={{marginTop: "10px", padding: "20px", minHeight: "50px", backgroundColor: "#ececec", border: "black 2px solid", borderRadius: "20px"}}>
                                            <Button className="btnEdit" style={{marginBottom: "20px"}} type="primary" onClick={(e) => {
                                            this.showWhyEditPopup(e, m.description, m)
                                            }}
                                                    htmlType="submit">
                                                <EditOutlined
                                                    style={{marginRight: "3px"}}/> Edit {"Why " + oldTitle + "-" + number} description
                                            </Button>
                                            <div>
                                                <span style={{fontWeight: "bold", marginRight: "10px"}}>{"Why " + oldTitle + "-" + number} description:  </span>
                                                {` ${m.description}`}
                                            </div>
                                        </div>
                                        <div>
                                            <br/>
                                            {m.root_cause && <Collapse className="why"
                                                                       key={index + "rt"} defaultActiveKey={["rt"]}>
                                                <Panel key="rt" header="Root cause:">
                                                    <Button className="btnAddAction" type="primary" onClick={() => {
                                                        this.showActionAddPopup()
                                                    }}
                                                            htmlType="submit">
                                                        <PlusOutlined style={{marginRight: "3px"}}/> Add Action
                                                    </Button>
                                                    <div>
                                                        {m.root_cause[0].statement}
                                                        <br/>
                                                        {"Actions ..."}
                                                    </div>
                                                </Panel>
                                            </Collapse>}
                                        </div>
                                    </div>
                                    {m.children &&
                                    <WhyFormCascadeView data={m.children} prevData={data} level={level + 1} number={1}
                                                        oldTitle={oldTitle + "-" + number++}/>}
                                </Panel>
                            </Collapse>);
                    })}
                </div>
            );
        }


        return (
            <div className="whyForm">
                <div className="whyFormInternal">
                    {/*Add Why popup*/}
                    <Modal
                        className={"whyFormModal"}
                        title="Create new 'Why the fault was introduced':"
                        visible={this.state.popupAdd}
                        destroyOnClose={true}
                        onCancel={e => {
                            this.hideWhyAddPopup(e)
                        }}
                        footer={[
                        <Button key="cancel" onClick={(e) => this.hideWhyAddPopup(e)}>
                          Cancel
                        </Button>,
                        <Button form="addWhy" className="ant-btn-primary" key="submit" htmlType="submit">
                            Add Why
                        </Button>]}
                        style={{textAlign: "center"}}>

                        <Form
                            name="addWhy"
                            onFinish={e => {this.addWhy(e)}}
                            ref={this.formRefEditWhy}>

                            <Form.Item
                                label="Description: "
                                name="whyDescription"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input why description',
                                    },
                                ]}
                                >
                                    <TextArea className="textAreaInput" rows={4} />
                            </Form.Item>

                            <Form.Item
                                label="Root cause statement: "
                                name="rootCauseStatement"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input root cause statement!',
                                    },
                                ]}
                                >
                                    <TextArea className="textAreaInput" rows={4} />
                            </Form.Item>

                            <Form.Item
                                    label="Assignee: "
                                    name="assignee"
                                    initialValue={localStorage["fullName"] + " (" + localStorage["squadGroup"] + ")"}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >

                                <AutoComplete
                                    options={this.state.users}
                                    placeholder="Assign a person!"
                                    allowClear={true}
                                    style={{width: "100%"}}
                                    filterOption={(inputValue, option) => {
                                        if(option.options) {
                                            let suggest = option.options[0].value;
                                            return suggest.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                    }}
                                />
                            </Form.Item>

                        </Form>

                    </Modal>

                    {/*Edit Why popup*/}
                    <Modal
                        className={"whyFormModal"}
                        title="Edit 'Why the fault was introduced':"
                        visible={this.state.popupEdit}
                        onCancel={e => {
                            this.hideWhyEditPopup(e)
                        }}
                        destroyOnClose={true}
                        footer={[
                        <Button key="cancel" onClick={(e) => this.hideWhyEditPopup(e)}>
                          Cancel
                        </Button>,
                        <Button form="editWhy" className="ant-btn-primary" key="submit" htmlType="submit">
                            Edit Why
                        </Button>]}
                        style={{textAlign: "center"}}>

                        <Form
                            name="editWhy"
                            onFinish={e => {this.editWhy(e)}}
                            ref={this.formRefEditWhy}>

                            <Form.Item
                                label="Description: "
                                name="whyDescription"
                                initialValue={this.state.tempDescription}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input why description',
                                    },
                                ]}
                                >
                                    <TextArea className="textAreaInput" rows={4} />
                            </Form.Item>


                        </Form>

                    </Modal>

                    {/*Add action in root cause popup*/}
                    <Modal
                        className={"whyFormModal"}
                        title="Add root cause action:"
                        visible={this.state.popupAction}
                        onCancel={e => {
                            this.hideActionAddPopup(e)
                        }}
                        destroyOnClose={true}
                        footer={[
                        <Button key="cancel" onClick={(e) => this.hideActionAddPopup(e)}>
                          Cancel
                        </Button>,
                        <Button form="addAction" className="ant-btn-primary" key="submit" htmlType="submit">
                            Add action
                        </Button>]}
                        style={{textAlign: "center"}}>

                        {/*   "action_proposal": "a2p",
                        "cause_category": "12rcc",
                        "cause_subcategory": "rcsc",
                        "action_type": "rct2",
                        "assigned_to": "a3t",
                        "ai_id": "rai4",
                        "completion_target_date": "2021-07-23T12:20:00Z" */}

                        <Form
                            name="addAction"
                            onFinish={e => {}}
                            ref={this.formRefAddAction}>

                            <Form.Item
                                label="Action proposal:"
                                name="actionProposal"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input action proposal!',
                                    },
                                ]}
                                >
                                    <Input/>
                            </Form.Item>

                            <Form.Item
                                label="Cause category:"
                                name="actionCategory"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input cause category!',
                                    },
                                ]}
                                >
                                    <Input/>
                            </Form.Item>

                            <Form.Item
                                label="Cause subcategory:"
                                name="actionSubcategory"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input cause subcategory!',
                                    },
                                ]}
                                >
                                    <Input/>
                            </Form.Item>

                            <Form.Item
                                label="Action type:"
                                name="actionType"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input action type!',
                                    },
                                ]}
                                >
                                    <Input/>
                            </Form.Item>


                            {/*<Select*/}
                            {/*    placeholder="Select an assignee"*/}
                            {/*>*/}
                            {/*    {this.state.users ? (this.state.users.map((user) => (*/}
                            {/*        <Select.Option value={user["id"]}>{user["full_name"]} ({user["squad_group"]})</Select.Option>*/}
                            {/*    )))*/}
                            {/*    :*/}
                            {/*        null*/}
                            {/*    }*/}
                            {/*</Select>*/}

                             <Form.Item
                                    label="Assignee: "
                                    name="assignee"
                                    initialValue={localStorage["fullName"] + " (" + localStorage["squadGroup"] + ")"}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >

                                <AutoComplete
                                    style={{ width: 200 }}
                                    options={this.state.users}
                                    placeholder="Assign a person!"
                                    allowClear={true}
                                    style={{width: "100%"}}
                                    filterOption={(inputValue, option) => {
                                        if(option.options) {
                                            let suggest = option.options[0].value;
                                            return suggest.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                label="AI ID:"
                                name="aiId"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Ai ID!',
                                    },
                                ]}
                                >
                                    <Input/>
                            </Form.Item>


                            <Form.Item
                                label="Completion target date:"
                                name="completionTargetDate"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input completion target date!',
                                    },
                                ]}
                                >
                                    <DatePicker  />
                            </Form.Item>

                        </Form>

                    </Modal>

                    <div id="headerOfTheForm">
                        <h3 id="headerText">
                            {this.state.header}
                        </h3>
                        <Button className="btnSave" type="primary" onClick={() => {

                            }}
                            htmlType="submit">
                                <SaveOutlined style={{marginRight: "3px"}}/> Save
                        </Button>
                    </div>
                    <div className="whyFormContainer">
                        <WhyFormCascadeView data={this.state.data} />
                    </div>


                </div>
            </div>

            //commented lines are related to hard coded (not dynamic) whyForm view (mocked up version)
            //these lines are important for now if something won't work

            /* <div className="whyForm">*/
            /*     <h3 id="">*/
            /*         (Why Form header) Why root cause was not found with first set of attached symptoms*/
            /*     </h3>*/
            /*     <div className="whyFormContainer">*/
            /**/
            /*         /!*{rows}*!/*/
            /**/
            /*         <div className="why">*/
            /**/
            /*               <Collapse className="why">*/
            /*                 <Button id="nextButton1" type="primary" style={{backgroundColor: "cyan", width: "100%"}} onClick={() => {}} htmlType="submit">*/
            /*                     (+) Add Why*/
            /*                 </Button>*/
            /*                 <Panel header="Why 1" key="1">*/
            /**/
            /*                       <Collapse className="why">*/
            /*                             <Button id="nextButton1" type="primary" style={{backgroundColor: "cyan", width: "100%"}} htmlType="submit">*/
            /*                                 (+) Add Why*/
            /*                             </Button>*/
            /*                             <Panel header="Why 1-1" key="11">*/
            /*                                 <Collapse className="why">*/
            /*                                     <Button id="nextButton1" type="primary" style={{backgroundColor: "cyan", width: "100%"}} htmlType="submit">*/
            /*                                         (+) Add Why*/
            /*                                     </Button>*/
            /*                                     <Panel header="Why 1-1-1" key="111">*/
            /*                                         <Button id="nextButton1" type="primary" style={{backgroundColor: "cyan", width: "100%"}} htmlType="submit">*/
            /*                                             (+) Add Why*/
            /*                                         </Button>*/
            /*                                         <p>{text}</p>*/
            /*                                     </Panel>*/
            /*                                     <div>*/
            /*                                         Description: some description text ...*/
            /*                                     </div>*/
            /*                                 </Collapse>*/
            /*                             </Panel>*/
            /*                             <div>*/
            /*                                 Description: some description text ...*/
            /*                             </div>*/
            /*                       </Collapse>*/
            /**/
            /**/
            /*                     <Collapse className="why">*/
            /**/
            /*                         <Button id="nextButton1" type="primary" style={{backgroundColor: "cyan", width: "100%"}} htmlType="submit">*/
            /*                                 (+) Add Why*/
            /*                         </Button>*/
            /*                         <Panel header="Why 1-2" key="12">*/
            /**/
            /*                         </Panel>*/
            /*                         <div>*/
            /*                             Description: some description text ...*/
            /*                         </div>*/
            /*                     </Collapse>*/
            /**/
            /**/
            /*                    <Collapse className="why">*/
            /*                         <Button id="nextButton1" type="primary" style={{backgroundColor: "cyan", width: "100%"}} htmlType="submit">*/
            /*                                 (+) Add Why*/
            /*                         </Button>*/
            /*                         <Panel header="Why 1-3" key="12">*/
            /**/
            /*                         </Panel>*/
            /*                         <div>*/
            /*                             Description: some description text ...*/
            /*                         </div>*/
            /*                     </Collapse>*/
            /*                 </Panel>*/
            /*                   <div>*/
            /*                     Description: some description text ...*/
            /*                 </div>*/
            /*               </Collapse>*/
            /**/
            /*             <Collapse className="why">*/
            /*                 <Button id="nextButton1" type="primary" style={{backgroundColor: "cyan", width: "100%"}} htmlType="submit">*/
            /*                     (+) Add Why*/
            /*                 </Button>*/
            /*                 <Panel header="Why 2" key="2">*/
            /*                   <p>{text}</p>*/
            /*                 </Panel>*/
            /*                 <div>*/
            /*                     Description: some description text ...*/
            /*                 </div>*/
            /*             </Collapse>*/
            /**/
            /*             <Collapse className="why">*/
            /*                 <Button id="nextButton1" type="primary" style={{backgroundColor: "cyan", width: "100%"}} htmlType="submit">*/
            /*                     (+) Add Why*/
            /*                 </Button>*/
            /*                 <Panel header="Why 3" key="3">*/
            /*                   <p>{text}</p>*/
            /*                 </Panel>*/
            /*                 <div>*/
            /*                     Description: some description text ...*/
            /*                 </div>*/
            /*             </Collapse>*/
            /**/
            /*             <Collapse className="why">*/
            /*                 <Button id="nextButton1" type="primary" style={{backgroundColor: "cyan", width: "100%"}} htmlType="submit">*/
            /*                     (+) Add Why*/
            /*                 </Button>*/
            /*                 <Panel header="Why 4" key="4">*/
            /*                   <p>{text}</p>*/
            /*                 </Panel>*/
            /*                 <div>*/
            /*                     Description: some description text ...*/
            /*                 </div>*/
            /*             </Collapse>*/
            /**/
            /*         </div>*/
            /**/
            /*     </div>*/
            /**/
            // </div>
    )};
}

export default WhyForm;
