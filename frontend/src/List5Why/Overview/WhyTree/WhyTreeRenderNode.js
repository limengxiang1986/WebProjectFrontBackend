import MinusCircleOutlined from "@ant-design/icons/MinusCircleOutlined";
import PlusCircleOutlined from "@ant-design/icons/PlusCircleOutlined";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import PlusSquareOutlined from "@ant-design/icons/PlusSquareOutlined";
import moment from 'moment';
import {Popconfirm, Input, DatePicker, Select, Empty, Tooltip} from "antd";
import React from "react";
import UserSelect from "../../../CommonComponents/selectors/UserSelect";
import WhyTreeCommentsModule from "../../../CommonComponents/comments/WhyTreeCommentsModule";


const {TextArea} = Input;
const {Option} = Select;

const nodeHeight = "765px";
const nodeWidth = "550px";

const EmptySelect = (customDescription=null) => {
    return <Empty
                image={null}
                imageStyle={{
                    height: 0
                }}
                description={customDescription ?
                    customDescription
                    : "Nothing was found for your input. Please search again."
                }
            />
}

const renderAiID = (ai_id) => {
    return (
    <div className="jiraLinkDiv">
        <div>
            {ai_id ?
                <a href={"https://jiradc.ext.net.nokia.com/browse/" + ai_id}
                   target="_blank"
                   rel="noreferrer"
                   className="jiraLink"
                >
                    {ai_id}
                </a>
                : <span>JIRA does not exist</span>
            }
        </div>
    </div>);
}

//function responsible for rendering each node of the tree
export const renderForeignObjectNode = ({
                                            nodeDatum,
                                            toggleNode,
                                            foreignObjectProps,

                                        }, state) => (
    <g ref={el => (state.cont = el)}>
        {/*<circle r={20}/>*/}
        {/* `foreignObject` requires width & height to be explicitly set. */}
        <foreignObject {...foreignObjectProps}>
            {nodeDatum.type === "root" ?
                <div style={{
                    padding: "10px",
                    width: "500px",
                    border: "2px solid white",
                    color: "white",
                    backgroundColor: "rgba(0,0,0,0)"
                }}>
                    <h1 style={{color: "rgba(0,0,0,0)"}}>
                        <div style={{fontWeight: "bold", fontSize: "64px"}}> {nodeDatum.form_name}</div>
                    </h1>
                </div>

                :

                nodeDatum.type === "branch" ?
                    <div style={nodeDatum.branch_type === "RCA" ?
                        {
                            padding: "10px",
                            width: nodeWidth,
                            height: nodeHeight,
                            border: "2px solid black",
                            color: "black",
                            backgroundColor: "rgb(255,223,5)",
                        }
                        :
                        {
                            padding: "10px",
                            width: nodeWidth,
                            height: nodeHeight,
                            border: "2px solid black", color: "black",
                            backgroundColor: "rgb(255,247,166)",
                        }}>

                        <div style={{display: "flex"}}>
                            <div style={{float: "left"}}>
                                <h1 className="branchInnerContainerBranchType">
                                    {nodeDatum.branch_type && nodeDatum.branch_type === "RCA" ? "RCA" : "EDA" }
                                </h1>
                                {!state.state.edition ?
                                    <div className="commentsSectionViewMode">
                                        <WhyTreeCommentsModule state={state} nodeDatum={nodeDatum}
                                                               editable={state.state.edition}/>
                                    </div>
                                    :
                                    null
                                }
                            </div>

                            <div style={{
                                fontSize: "40px",
                                float: "left",
                                right: "50px",
                                top: "0px",
                                position: "absolute"
                            }}>

                                {
                                state.state.edition ?
                                    <WhyTreeCommentsModule state={state} nodeDatum={nodeDatum} editable={state.state.edition}/>
                                :
                                    null
                                }

                                {state.state.edition ?
                                    <Tooltip color={"rgb(18,65,145)"} title="Add 5Why complete branch">
                                        <PlusSquareOutlined className="clickBranchWhyIcon clickWhyCauseIcon" onClick={() => {
                                            state.addFiveWhyAtOneWithCauseAndAction(null, nodeDatum.id);
                                        }} style={{marginRight: "3px"}}/>
                                    </Tooltip>

                                    :

                                    null}
                            </div>

                        </div>

                        <div>
                            <h1 className="branchInnerContainerUp">
                                {nodeDatum.branch_name}
                            </h1>
                        </div>
                        {state.state.edition ?
                            <div className="branchInnerContainer">
                                <h1 className="branchInnerContainerText">
                                    JIRA key:
                                    <a href={"https://jiradc.ext.net.nokia.com/browse/" + nodeDatum.jira_key}
                                       target="_blank"
                                       rel="noreferrer"
                                       className="jiraLink"
                                    >
                                        {nodeDatum.jira_key}
                                    </a>
                                </h1>
                                <h1 className="branchInnerContainerText">
                                    Assigned to:
                                </h1>

                                <h1 className="branchInnerContainerInput">
                                    <UserSelect className="dropDownMenu"
                                                style={{
                                                    width: "100%",
                                                    fontSize: "20px",
                                                }}
                                                value={nodeDatum.assigned_to_object}
                                                placeholder="Type and select a person"
                                                onChange={(newValue) => {
                                                    nodeDatum.assigned_to_object = newValue;
                                                    nodeDatum.assigned_to = newValue.hasOwnProperty("label") ? ["label"] : "Unavailable";
                                                    state.assignToBranch(null, nodeDatum.id, newValue);
                                                }}
                                    />
                                </h1>

                                <h1 className="branchInnerContainerText">
                                    Grade:
                                </h1>

                                <h1 className="branchInnerContainerInput">
                                    <Select
                                        className="dropDownMenu"
                                        style={{
                                            width: "100%",
                                            fontSize: "20px"
                                        }}
                                        value={nodeDatum.grade}
                                        showSearch
                                        placeholder="Type and select a grade"
                                        onChange={(newValue) => {
                                            nodeDatum.grade = newValue;
                                            state.rateBranch(null, nodeDatum.id, newValue);
                                        }}
                                    >
                                        <Option value="A grade">A grade</Option>
                                        <Option value="B grade">B grade</Option>
                                        <Option value="C grade">C grade</Option>
                                        <Option value="D grade">D grade</Option>
                                        <Option value="E grade">E grade</Option>
                                        <Option value="Not rated yet!">Not rated yet!</Option>
                                    </Select>
                                </h1>
                            </div>

                            :

                            <div className="branchInnerContainer">
                                <h1 className="branchInnerContainerText">
                                    JIRA key:
                                    <a href={"https://jiradc.ext.net.nokia.com/browse/" + nodeDatum.jira_key}
                                       target="_blank"
                                       rel="noreferrer"
                                       className="jiraLink"
                                    >
                                        {nodeDatum.jira_key}
                                    </a>
                                </h1>

                                <h1 className="branchInnerContainerText">
                                    Assigned to:
                                </h1>

                                <h1 className="branchInnerContainerInput">
                                    <UserSelect
                                        className={nodeDatum.branch_type === "RCA" ?
                                            "dropDownMenu branchDisabledStyleRcaActive"
                                            :
                                            "dropDownMenu branchDisabledStyleEdaActive"
                                        }
                                        style={{
                                            width: "100%",
                                            fontSize: "20px",
                                        }}
                                        value={nodeDatum.assigned_to_object}
                                        disabled={true}
                                        onChange={(newValue) => {
                                            nodeDatum.assigned_to_object = newValue;
                                            nodeDatum.assigned_to = newValue.hasOwnProperty("label") ? ["label"] : "Unavailable";
                                            state.assignToBranch(null, nodeDatum.id, newValue);
                                        }}
                                    />
                                </h1>

                                <h1 className="branchInnerContainerText">
                                    Grade:
                                </h1>

                                <h1 className="branchInnerContainerInput">
                                    <Select
                                        className={nodeDatum.branch_type === "RCA" ?
                                            "dropDownMenu branchDisabledStyleRcaActive"
                                            :
                                            "dropDownMenu branchDisabledStyleEdaActive"
                                        }
                                        style={{
                                            width: "100%",
                                            fontSize: "20px"
                                        }}
                                        value={nodeDatum.grade}
                                        showSearch
                                        disabled={true}
                                        placeholder="Type and select a grade"
                                        onChange={(newValue) => {
                                            nodeDatum.grade = newValue;
                                            state.rateBranch(null, nodeDatum.id, newValue);
                                        }}
                                    >
                                        <Option value="A grade">A grade</Option>
                                        <Option value="B grade">B grade</Option>
                                        <Option value="C grade">C grade</Option>
                                        <Option value="D grade">D grade</Option>
                                        <Option value="E grade">E grade</Option>
                                        <Option value="Not rated yet!">Not rated yet!</Option>
                                    </Select>
                                </h1>
                            </div>}
                        </div>

                    :

                    nodeDatum.type === "why_question" ?
                        state.state.edition ?
                            <div style={nodeDatum.active ?
                                nodeDatum.branch_type === "RCA" ?
                                    {
                                        padding: "10px",
                                        width: nodeWidth,
                                        height: nodeHeight,
                                        border: "2px solid black",
                                        color: "white",
                                        backgroundColor: "rgb(15,39,100)",
                                        overflowY: "hidden",
                                        position: "absolute"
                                    }
                                    :
                                    {
                                        padding: "10px",
                                        width: nodeWidth,
                                        height: nodeHeight,
                                        border: "2px solid black",
                                        color: "white",
                                        backgroundColor: "rgb(18,65,145)",
                                        overflowY: "hidden",
                                        position: "absolute"
                                    }
                                :
                                nodeDatum.branch_type === "RCA" ?
                                    {
                                        padding: "10px",
                                        width: nodeWidth,
                                        height: nodeHeight,
                                        border: "3px dashed black",
                                        color: "black",
                                        backgroundColor: "rgb(175,175,175)",
                                        overflowY: "hidden",
                                        position: "absolute"
                                    }
                                    :
                                    {
                                        padding: "10px",
                                        width: nodeWidth,
                                        height: nodeHeight,
                                        border: "3px dashed black",
                                        color: "black",
                                        backgroundColor: "rgb(206,205,205)",
                                        overflowY: "hidden",
                                        position: "absolute"
                                    }
                            }>

                                <div style={{display: "flex"}}>
                                    <div style={{float: "left"}}>
                                        <h1 style={nodeDatum.active ? {
                                                color: "white",
                                                fontWeight: "bold",
                                                marginBottom: "10px",
                                                fontSize: "46px",
                                        }
                                            :

                                                {color: "black",
                                                fontWeight: "bold",
                                                marginBottom: "10px",
                                                fontSize: "46px",
                                                }}>
                                                    Why
                                        </h1>
                                    </div>

                                    <div style={{float: "left", right: "10px", position: "absolute"}}>
                                       <WhyTreeCommentsModule state={state} nodeDatum={nodeDatum} editable={state.state.edition}/>


                                        <Tooltip color={"rgb(18,65,145)"} title="Add next Why box or start a new Why branch">
                                            <PlusCircleOutlined className="clickWhyIcon clickWhyAddIcon"
                                                                style={{marginRight: "3px"}} onClick={() => {
                                                state.addWhy(null, nodeDatum.id);
                                            }}/>
                                        </Tooltip>


                                        <Tooltip color={"rgb(18,65,145)"} title="Remove rest of 5Why branch from this point">
                                            <Popconfirm
                                                className={"whyFormPopConfirm"}
                                                title="Are you sure you want to delete this 'Why box' and its all descendants (root/escape cause boxes and action boxes)?"
                                                onConfirm={() => {
                                                    state.deleteWhy(nodeDatum)
                                                }}
                                                onCancel={() => {
                                                }}
                                                okText="Yes"
                                                cancelText="No"
                                            >

                                                <MinusCircleOutlined className="clickWhyIcon clickWhyDeleteIcon"
                                                                     style={{marginRight: "5px"}}
                                                />

                                            </Popconfirm>
                                        </Tooltip>



                                        {!(Array.isArray(nodeDatum.children) && nodeDatum.children.length)
                                        || !(nodeDatum["children"].some(e => e["type"] === "cause")) ?
                                            <Tooltip color={"rgb(18,65,145)"} title="Add a Root/Escape cause box here">
                                                <PlusSquareOutlined className="clickWhyIcon clickWhyCauseIcon"
                                                                    style={{marginRight: "3px"}} onClick={(e) => {
                                                    state.addCauseStatement(null, nodeDatum.id, nodeDatum.branch);
                                                }}/>
                                            </Tooltip>

                                            :
                                            null}

                                    </div>

                                </div>


                                <div className="whyQuestionAnswerDiv">
                                    <div className="label" style={{marginTop: "5px"}}>
                                        Q:
                                    </div>
                                    <div className="input" style={{marginLeft: "15px"}}>
                                        <TextArea rows={5}
                                                  defaultValue={nodeDatum.question}
                                                  key={nodeDatum.question}
                                                  onChange={(e) => {
                                                      state.editWhyTreeInputOnChange(e, state, nodeDatum, 1)
                                                  }}
                                                  onBlur={(e) => {
                                                      state.editWhyTreeInputOnBlur(e, state, nodeDatum, 1)
                                                  }}
                                                  style={{
                                                      "width": "100%",
                                                      "fontSize": "30px"
                                                  }}/>
                                    </div>

                                    <div className="label" style={{marginTop: "35px"}}>
                                        A:
                                    </div>
                                    <div className="input" style={{marginTop: "30px", marginLeft: "15px"}}>
                                        <TextArea rows={8}
                                                  defaultValue={nodeDatum.answer}
                                                  key={nodeDatum.answer}
                                                  onChange={(e) => {
                                                      state.editWhyTreeInputOnChange(e, state, nodeDatum, 2)
                                                  }}
                                                  onBlur={(e) => {
                                                      state.editWhyTreeInputOnBlur(e, state, nodeDatum, 2)
                                                  }}
                                                  style={{
                                                      "width": "100%",
                                                      "fontSize": "30px"
                                                  }}/>
                                    </div>
                                </div>


                            </div>

                            :

                            <div className="whyQADiv" style={nodeDatum.active ?
                                nodeDatum.branch_type === "RCA" ?
                                    {
                                        padding: "10px",
                                        width: nodeWidth,
                                        height: nodeHeight,
                                        border: "2px solid black",
                                        color: "white",
                                        backgroundColor: "rgb(15,39,100)",
                                        overflowY: "hidden",
                                        position: "absolute"
                                    }
                                    :
                                    {
                                        padding: "10px",
                                        width: nodeWidth,
                                        height: nodeHeight,
                                        border: "2px solid black",
                                        color: "white",
                                        backgroundColor: "rgb(18,65,145)",
                                        overflowY: "hidden",
                                        position: "absolute"
                                    }
                                :
                                nodeDatum.branch_type === "RCA" ?
                                    {
                                        padding: "10px",
                                        width: nodeWidth,
                                        height: nodeHeight,
                                        border: "3px dashed black",
                                        color: "black",
                                        backgroundColor: "rgb(175,175,175)",
                                        overflowY: "hidden",
                                        position: "absolute"
                                    }
                                    :
                                    {
                                        padding: "10px",
                                        width: nodeWidth,
                                        height: nodeHeight,
                                        border: "3px dashed black",
                                        color: "black",
                                        backgroundColor: "rgb(206,205,205)",
                                        overflowY: "hidden",
                                        position: "absolute"
                                    }
                            }>

                                <div style={{display: "flex"}}>
                                    <div style={{float: "left"}}>
                                        <h1 style={nodeDatum.active ? {
                                                color: "white",
                                                fontWeight: "bold",
                                                marginBottom: "10px",
                                                fontSize: "50px",
                                                display: "inline-block",
                                        }
                                            :

                                                {color: "black",
                                                fontWeight: "bold",
                                                marginBottom: "10px",
                                                fontSize: "50px",
                                                display: "inline-block",
                                                }}>
                                                    Why
                                        </h1>
                                        <div className="commentsSectionViewMode">
                                            <WhyTreeCommentsModule state={state} nodeDatum={nodeDatum} editable={state.state.edition}/>
                                        </div>
                                    </div>


                                </div>


                                <div className="whyQuestionAnswerDiv">
                                    <div className="label" style={{marginTop: "5px"}}>
                                        Q:
                                    </div>
                                    <div className="input disabledStyle" style={{marginLeft: "15px"}}>
                                        <TextArea rows={5}
                                                  defaultValue={nodeDatum.question}
                                                  key={nodeDatum.question}
                                                  disabled={true}
                                                  className={nodeDatum.active ?
                                                        nodeDatum.branch_type === "RCA" ?
                                                            "disabledStyleRcaActive"
                                                            :
                                                            "disabledStyleEdaActive"
                                                        :
                                                        nodeDatum.branch_type === "RCA" ?
                                                            "disabledStyleRcaNotActive"
                                                            :
                                                            "disabledStyleEdaNotActive"
                                                  }
                                                  style={{
                                                      "width": "100%",
                                                      "fontSize": "30px"
                                                  }}/>
                                    </div>

                                    <div className="label" style={{marginTop: "35px"}}>
                                        A:
                                    </div>
                                    <div className="input" style={{marginTop: "30px", marginLeft: "15px"}}>
                                        <TextArea rows={8}
                                                  defaultValue={nodeDatum.answer}
                                                  key={nodeDatum.answer}
                                                  disabled={true}
                                                  className={nodeDatum.active ?
                                                        nodeDatum.branch_type === "RCA" ?
                                                            "disabledStyleRcaActive"
                                                            :
                                                            "disabledStyleEdaActive"
                                                        :
                                                        nodeDatum.branch_type === "RCA" ?
                                                            "disabledStyleRcaNotActive"
                                                            :
                                                            "disabledStyleEdaNotActive"
                                                  }
                                                  style={{
                                                      "width": "100%",
                                                      "fontSize": "30px"
                                                  }}/>
                                    </div>
                                </div>

                            </div>

                        :

                        nodeDatum.type === "cause" ?
                            state.state.edition ?
                                <div style={nodeDatum.active ?
                                    nodeDatum.branch_type === "RCA" ?
                                        {
                                            padding: "10px",
                                            width: nodeWidth,
                                            height: nodeHeight,
                                            border: "2px solid black",
                                            color: "white",
                                            backgroundColor: "rgb(217,98,4)",
                                            overflow: "hidden",
                                            position: "absolute"
                                        }
                                        :
                                        {
                                            padding: "10px",
                                            width: nodeWidth,
                                            height: nodeHeight,
                                            border: "3px dashed black",
                                            color: "white",
                                            backgroundColor: "rgb(255,148,64)",
                                            overflow: "hidden",
                                            position: "absolute"
                                        }
                                    :
                                    nodeDatum.branch_type === "RCA" ?
                                        {
                                            padding: "10px",
                                            width: nodeWidth,
                                            height: nodeHeight,
                                            border: "3px dashed black",
                                            color: "black",
                                            backgroundColor: "rgb(175,175,175)",
                                            overflow: "hidden",
                                            position: "absolute"
                                        }
                                        :
                                        {
                                            padding: "10px",
                                            width: nodeWidth,
                                            height: nodeHeight,
                                            border: "3px dashed black",
                                            color: "black",
                                            backgroundColor: "rgb(206,205,205)",
                                            overflow: "hidden",
                                            position: "absolute"
                                        }
                                }>

                                    <div style={{display: "flex"}}>
                                        <div style={{float: "left"}}>
                                            <h1 style={nodeDatum.active ?
                                            {
                                                color: "white",
                                                marginBottom: "10px",
                                                fontSize: "46px",
                                                fontWeight: "bold",
                                            }
                                        :
                                            {
                                                color: "black",
                                                marginBottom: "10px",
                                                fontSize: "46px",
                                                fontWeight: "bold",
                                            }
                                            }>{nodeDatum.cause}</h1>
                                        </div>


                                        <div style={{float: "left", right: "0px", position: "absolute"}}>

                                            <WhyTreeCommentsModule state={state} nodeDatum={nodeDatum} editable={state.state.edition}/>

                                            <Tooltip color={"rgb(18,65,145)"} title="Add an Action box">
                                                <PlusOutlined className="cIcon cActionIcon" style={{marginRight: "3px"}}
                                                              onClick={(e) => {
                                                                  state.addAction(null, nodeDatum.id, nodeDatum.branch);
                                                              }}/>
                                            </Tooltip>


                                            <Tooltip color={"rgb(18,65,145)"} title="Remove Root/Escape cause with Action box">
                                                <Popconfirm
                                                    className={"whyFormPopConfirm"}
                                                    title="Are you sure you want to delete this root cause statement with all its actions?"
                                                    onConfirm={(e) => {
                                                        state.deleteCause(nodeDatum)
                                                    }}
                                                    onCancel={() => {
                                                    }}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >

                                                    <MinusCircleOutlined className="cIcon cDeleteIcon"
                                                                         style={{marginRight: "5px"}}
                                                    />

                                                </Popconfirm>
                                            </Tooltip>

                                        </div>

                                    </div>

                                    <TextArea
                                        rows={14}
                                        defaultValue={nodeDatum.statement}
                                        key={nodeDatum.statement}
                                        onChange={(e) => {
                                            state.editWhyTreeInputOnChange(e, state, nodeDatum, 3)
                                        }}
                                        onBlur={(e) => {
                                            state.editWhyTreeInputOnBlur(e, state, nodeDatum, 3)
                                        }}
                                        style={{
                                            width: "100%",
                                            fontSize: "30px",

                                        }}
                                    />

                                </div>

                                :

                                <div className="cause" style={nodeDatum.active ?
                                    nodeDatum.branch_type === "RCA" ?
                                        {
                                            padding: "10px",
                                            width: nodeWidth,
                                            height: nodeHeight,
                                            border: "2px solid black",
                                            color: "white",
                                            backgroundColor: "rgb(217,98,4)",
                                            overflow: "hidden",
                                            position: "absolute"
                                        }
                                        :
                                        {
                                            padding: "10px",
                                            width: nodeWidth,
                                            height: nodeHeight,
                                            border: "3px solid black",
                                            color: "white",
                                            backgroundColor: "rgb(255,148,64)",
                                            overflow: "hidden",
                                            position: "absolute"
                                        }
                                    :
                                    nodeDatum.branch_type === "RCA" ?
                                        {
                                            padding: "10px",
                                            width: nodeWidth,
                                            height: nodeHeight,
                                            border: "3px dashed black",
                                            color: "black",
                                            backgroundColor: "rgb(175,175,175)",
                                            overflow: "hidden",
                                            position: "absolute"
                                        }
                                        :
                                        {
                                            padding: "10px",
                                            width: nodeWidth,
                                            height: nodeHeight,
                                            border: "3px dashed black",
                                            color: "black",
                                            backgroundColor: "rgb(206,205,205)",
                                            overflow: "hidden",
                                            position: "absolute"
                                        }
                                }>

                                    <div style={{display: "flex"}}>
                                        <div style={{float: "left"}}>
                                            <h1 style={nodeDatum.active ?
                                            {
                                                color: "white",
                                                marginBottom: "10px",
                                                fontSize: "50px",
                                                fontWeight: "bold",
                                                display: "inline-block"
                                            }
                                        :
                                            {
                                                color: "black",
                                                marginBottom: "10px",
                                                fontSize: "50px",
                                                fontWeight: "bold",
                                                display: "inline-block"
                                            }
                                            }>
                                                {nodeDatum.cause}
                                            </h1>
                                            <div className="commentsSectionViewMode">
                                                <WhyTreeCommentsModule state={state} nodeDatum={nodeDatum} editable={state.state.edition}/>
                                            </div>
                                        </div>

                                    </div>

                                    <TextArea
                                        rows={14}
                                        value={nodeDatum.statement}
                                        disabled={true}
                                        className={nodeDatum.active ?
                                            nodeDatum.branch_type === "RCA" ?
                                                "disabledStyleRcaActive"
                                                :
                                                "disabledStyleEdaActive"
                                            :
                                            nodeDatum.branch_type === "RCA" ?
                                                "disabledStyleRcaNotActive"
                                                :
                                                "disabledStyleEdaNotActive"
                                        }
                                        onChange={(e) => {
                                            nodeDatum.statement = e.target.value;
                                            state.editWhyWithoutPopup(nodeDatum);
                                        }
                                        }
                                        style={{
                                            "width": "100%",
                                            "fontSize": "30px"
                                        }}
                                    />

                                </div>

                            :

                            nodeDatum.type === "action" ?
                                state.state.edition ?
                                    <div style={nodeDatum.active ?
                                        nodeDatum.branch_type === "RCA" ?
                                            {
                                                padding: "10px",
                                                width: nodeWidth,
                                                height: nodeHeight,
                                                border: "2px solid black",
                                                color: "white",
                                                backgroundColor: "rgb(5,154,3)",
                                                overflowY: "hidden",
                                                position: "absolute"
                                            }
                                            :
                                            {
                                                padding: "10px",
                                                width: nodeWidth,
                                                height: nodeHeight,
                                                border: "2px solid black",
                                                color: "white",
                                                backgroundColor: "rgb(6,189,3)",
                                                overflowY: "hidden",
                                                position: "absolute"
                                            }
                                        :
                                        nodeDatum.branch_type === "RCA" ?
                                            {
                                                padding: "10px",
                                                width: nodeWidth,
                                                height: nodeHeight,
                                                border: "3px dashed black",
                                                color: "black",
                                                backgroundColor: "rgb(175,175,175)",
                                                overflowY: "hidden",
                                                position: "absolute"
                                            }
                                            :
                                            {
                                                padding: "10px",
                                                width: nodeWidth,
                                                height: nodeHeight,
                                                border: "3px dashed black",
                                                color: "black",
                                                backgroundColor: "rgb(206,205,205)",
                                                overflowY: "hidden",
                                                position: "absolute"
                                            }
                                    }>

                                        <div style={{display: "flex"}}>
                                            <div style={{float: "left"}}>
                                                <h1 style={nodeDatum.active ? {
                                                    color: "white",
                                                    fontWeight: "bold",
                                                    marginBottom: "0px",
                                                    fontSize: "46px",
                                                } : {
                                                    color: "black",
                                                    fontWeight: "bold",
                                                    marginBottom: "0px",
                                                    fontSize: "46px"
                                                }}>{nodeDatum.action}</h1>
                                            </div>

                                            <div style={{float: "left", right: "0px", position: "absolute"}}>

                                                <WhyTreeCommentsModule state={state} nodeDatum={nodeDatum} editable={state.state.edition}/>

                                                <Tooltip color={"rgb(18,65,145)"} title="Remove Action box">
                                                    <Popconfirm
                                                            className={"whyFormPopConfirm"}
                                                            title="Are you sure that you want to delete this action?"
                                                            onConfirm={() => {
                                                                state.deleteAction(nodeDatum)
                                                            }}
                                                            onCancel={() => {
                                                            }}
                                                            okText="Yes"
                                                            cancelText="No"
                                                    >

                                                        <MinusCircleOutlined className="actionIcon actionDeleteIcon"
                                                                             style={{marginRight: "5px"}}
                                                        />

                                                    </Popconfirm>
                                                </Tooltip>

                                            </div>
                                        </div>

                                        <div className="actionsDiv">
                                            {renderAiID(nodeDatum.ai_id)}
                                            <div className="label">Action proposal:</div>
                                            <div className="input actionProposalInput">
                                                <TextArea
                                                    rows={3}
                                                    defaultValue={nodeDatum.action_proposal}
                                                    key={nodeDatum.action_proposal}
                                                    onChange={(e) => {
                                                        state.editWhyTreeInputOnChange(e, state, nodeDatum, 4)
                                                    }}
                                                    onBlur={(e) => {
                                                        state.editWhyTreeInputOnBlur(e, state, nodeDatum, 4)
                                                    }}
                                                    style={{
                                                        width: "100%",
                                                        fontSize: "26px",
                                                    }}
                                                />
                                            </div>

                                            <div className="label">Cause category:</div>
                                            <div className="input">
                                                <Select
                                                    style={{
                                                        width: "100%",
                                                        fontSize: "26px"
                                                    }}
                                                    value={nodeDatum.cause_category || undefined}
                                                    showSearch
                                                    notFoundContent={EmptySelect()}
                                                    placeholder="Type and select a cause category"
                                                    onChange={(newValue) => {
                                                        nodeDatum.cause_category = newValue;
                                                        nodeDatum.cause_subcategory = "";
                                                        state.editWhyWithoutPopup(nodeDatum);
                                                    }}
                                                >
                                                    {nodeDatum.branch_type ? nodeDatum.branch_type.includes("RCA") ?
                                                        <>
                                                            <Option value="Requirements">Requirements</Option>
                                                            <Option value="Architecture">Architecture</Option>
                                                            <Option value="High level design">High level design</Option>
                                                            <Option value="Low level design">Low level design</Option>
                                                            <Option value="Code">Code</Option>
                                                            <Option value="User documentation including release note">User documentation including release note</Option>
                                                            <Option value="Configuration and fault management">Configuration and fault management</Option>
                                                            <Option value="Collaborated mode with suppliers">Collaborated mode with suppliers</Option>
                                                        </>
                                                        : nodeDatum.branch_type.includes("EDA") ?
                                                        <>
                                                            <Option value="Technical reviews">Technical reviews</Option>
                                                            <Option value="Code analysis tools">Code analysis tools</Option>
                                                            <Option value="Unit tests">Unit tests</Option>
                                                            <Option value="System component or module test">System component or module test</Option>
                                                            <Option value="Entity or integration and verification test">Entity or integration and verification test</Option>
                                                            <Option value="System verification functional test">System verification functional test</Option>
                                                            <Option value="System verification non-functional testing">System verification non-functional testing</Option>
                                                            <Option value="Collaborated mode with suppliers">Collaborated mode with suppliers</Option>
                                                        </>
                                                        : null : null
                                                    }
                                                </Select>
                                            </div>

                                            <div className="label">Cause subcategory:</div>
                                            <div className="input">
                                                <Select
                                                    className="dropDownMenu"
                                                    style={{
                                                        width: "100%",
                                                        fontSize: "26px"
                                                    }}
                                                    value={nodeDatum.cause_subcategory || undefined}
                                                    showSearch
                                                    notFoundContent={nodeDatum.cause_category ?
                                                        EmptySelect() : EmptySelect("Please select cause category in order to select its subcategory.")}
                                                    placeholder="Type and select a cause subcategory"
                                                    onChange={(newValue) => {
                                                        nodeDatum.cause_subcategory = newValue;
                                                        state.editWhyWithoutPopup(nodeDatum);
                                                    }}
                                                >
                                                    { nodeDatum.branch_type ? nodeDatum.branch_type.includes("RCA") ?
                                                        (
                                                            nodeDatum.cause_category === "Requirements" ?
                                                            <>
                                                                <Option value="Changing requirements">Changing requirement</Option>
                                                                <Option value="Customer specific configuration/traffic requirements not accounted for">Customer specific configuration/traffic requirements not accounted for</Option>
                                                                <Option value="Missing requirement">Missing requirement</Option>
                                                                <Option value="Incorrect requirement">Incorrect requirement</Option>
                                                                <Option value="Unclear requirement">Unclear requirement</Option>
                                                                <Option value="Misunderstood customer requirement">Misunderstood customer requirement</Option>
                                                                <Option value="Late added feature(s)">Late added feature(s)</Option>
                                                                <Option value="Standards interpretation error">Standards interpretation error</Option>
                                                            </>
                                                            : nodeDatum.cause_category === "Architecture" ?
                                                            <>
                                                                <Option value="Interworking error - feature or component interaction">Interworking error - feature or component interaction</Option>
                                                                <Option value="Memory consumption error">Memory consumption error</Option>
                                                                <Option value="CPU overload error">CPU overload error</Option>
                                                                <Option value="Software robustness error">Software robustness error</Option>
                                                                <Option value="Stability error">Stability error</Option>
                                                                <Option value="Architecture gap">Architecture gap</Option>
                                                                <Option value="Architecture specification error">Architecture specification error</Option>
                                                            </>
                                                            : nodeDatum.cause_category === "High level design" ?
                                                            <>
                                                                <Option value="Hardware compatibility">Hardware compatibility</Option>
                                                                <Option value="3rd party compatibility/interoperability">3rd party compatibility/interoperability</Option>
                                                                <Option value="Legacy interaction error">Legacy interaction error</Option>
                                                                <Option value="High level design missing/gap">High level design missing/gap</Option>
                                                                <Option value="Design error">Design error</Option>
                                                            </>
                                                            : nodeDatum.cause_category === "Low level design" ?
                                                            <>
                                                                <Option value="Low level design missing/gap">Low level design missing/gap</Option>
                                                                <Option value="Deficient design/design error">Deficient design/design error</Option>
                                                                <Option value="Design knowledge, skills, competence (timer management, buffer handling, etc.)">Design knowledge, skills, competence (timer management, buffer handling, etc.)</Option>
                                                            </>
                                                            : nodeDatum.cause_category === "Code" ?
                                                            <>
                                                                <Option value="Code too complex">Code too complex</Option>
                                                                <Option value="Coding logic error">Coding logic error</Option>
                                                                <Option value="Code language knowledge/expertise">Code language knowledge/expertise</Option>
                                                                <Option value="Coding standards violations">Coding standards violations</Option>
                                                                <Option value="Implementation missing">Implementation missing</Option>
                                                                <Option value="Implementation error">Implementation error</Option>
                                                            </>
                                                            : nodeDatum.cause_category === "User documentation including release note" ?
                                                            <>
                                                                <Option value="Incorrect information used to create end-user documentation">Incorrect information used to create end-user documentation</Option>
                                                                <Option value="Missing content/step in procedure">Missing content/step in procedure</Option>
                                                                <Option value="Missing detailed content (delivered content not sufficient from users PoV)">Missing detailed content (delivered content not sufficient from users PoV)</Option>
                                                                <Option value="Outdated content">Outdated content</Option>
                                                                <Option value="Language error">Language error</Option>
                                                                <Option value="Incorrect information filled in change note">Incorrect information filled in change note</Option>
                                                                <Option value="Inconsistency within the same customer document">Inconsistency within the same customer document</Option>
                                                                <Option value="User documentation not tested">User documentation not tested</Option>
                                                            </>
                                                            : nodeDatum.cause_category === "Configuration and fault management" ?
                                                            <>
                                                                <Option value="Build error/incorrect version">Build error/incorrect version</Option>
                                                                <Option value="Merge error">Merge error</Option>
                                                                <Option value="Missed defect inheritance or porting process error">Missed defect inheritance or porting process error</Option>
                                                            </>
                                                            : nodeDatum.cause_category === "Collaborated mode with suppliers" ?
                                                            <>
                                                                <Option value="Delivery failure">Delivery failure</Option>
                                                                <Option value="Lack of specification">Lack of specification</Option>
                                                                <Option value="Documentation failure">Documentation failure</Option>
                                                                <Option value="Implementation failure">Implementation failure</Option>
                                                                <Option value="Lack of testing">Lack of testing</Option>
                                                                <Option value="Missing requirement">Missing requirement</Option>
                                                                <Option value="Project management">Project management</Option>
                                                                <Option value="3rd party software limitations">3rd party software limitations</Option>
                                                            </>
                                                            :
                                                            null
                                                        )
                                                        : nodeDatum.branch_type.includes("EDA") ?
                                                        (
                                                            nodeDatum.cause_category === "Technical reviews" ?
                                                            <>
                                                                <Option value="Requirements not reviewed with customer">Requirements not reviewed with customer</Option>
                                                                <Option value="Internal requirements review gap">Internal requirements review gap</Option>
                                                                <Option value="Architecture review gap">Architecture review gap</Option>
                                                                <Option value="Design review gap">Design review gap</Option>
                                                                <Option value="Missing analysis of impact of change">Missing analysis of impact of change</Option>
                                                                <Option value="Code review gap">Code review gap</Option>
                                                                <Option value="Test strategy review gap">Test strategy review gap</Option>
                                                                <Option value="Unit or component testcase review gap">Unit or component testcase review gap</Option>
                                                                <Option value="Entity or integration test review gap">Entity or integration test review gap</Option>
                                                                <Option value="System testcase review gap">System testcase review gap</Option>
                                                                <Option value="CuDo internal review gap">CuDo internal review gap</Option>
                                                            </>
                                                            : nodeDatum.cause_category === "Code analysis tools" ?
                                                            <>
                                                                <Option value="Test tools availability/capability">Test tools availability/capability</Option>
                                                                <Option value="Inappropriate tool usage">Inappropriate tool usage</Option>
                                                                <Option value="Insufficient use of static analyzers">Insufficient use of static analyzers</Option>
                                                                <Option value="Insufficient use of dynamic analyzers">Insufficient use of dynamic analyzers</Option>
                                                            </>
                                                            : nodeDatum.cause_category === "Unit tests" ?
                                                            <>
                                                                <Option value="Code not covered by test">Code not covered by test</Option>
                                                                <Option value="Wrong check in testcase">Wrong check in testcase</Option>
                                                                <Option value="Stubs or mocks do not reflect real world scenarios">Stubs or mocks do not reflect real world scenarios</Option>
                                                                <Option value="Objects initialized with wrong values">Objects initialized with wrong values</Option>
                                                                <Option value="Error cases/paths not tested">Error cases/paths not tested</Option>
                                                            </>
                                                            : nodeDatum.cause_category === "System component or module test" ?
                                                            <>
                                                                <Option value="Functionality not covered">Functionality not covered</Option>
                                                                <Option value="Feature interaction coverage gap">Feature interaction coverage gap</Option>
                                                                <Option value="Corner case and error case test gap">Corner case and error case test gap</Option>
                                                                <Option value="Limitation of test framework or environment">Limitation of test framework or environment</Option>
                                                                <Option value="Configuration coverage gap">Configuration coverage gap</Option>
                                                                <Option value="Test did not execute the planned scenario">Test did not execute the planned scenario</Option>
                                                            </>
                                                            : nodeDatum.cause_category === "Entity or integration and verification test" ?
                                                            <>
                                                                <Option value="Requirement coverage gap">Requirement coverage gap</Option>
                                                                <Option value="Limitation of test framework or environment">Limitation of test framework or environment</Option>
                                                                <Option value="Configuration coverage gap">Configuration coverage gap</Option>
                                                                <Option value="Test did not execute the planned scenario">Test did not execute the planned scenario</Option>
                                                                <Option value="Exploratory testing (negative, sequence, abnormal, boundary, corner case) gap">Exploratory testing (negative, sequence, abnormal, boundary, corner case) gap</Option>
                                                            </>
                                                            : nodeDatum.cause_category === "System verification functional test" ?
                                                            <>
                                                                <Option value="Network or solution verification testing gap">Network or solution verification testing gap</Option>
                                                                <Option value="Regression test gap">Regression test gap</Option>
                                                                <Option value="Configuration coverage gap">Configuration coverage gap</Option>
                                                                <Option value="Requirement coverage gap">Requirement coverage gap</Option>
                                                                <Option value="Feature interaction coverage gap">Feature interaction coverage gap</Option>
                                                                <Option value="Exploratory testing (negative, sequence, abnormal, boundary, corner case) gap">Exploratory testing (negative, sequence, abnormal, boundary, corner case) gap</Option>
                                                                <Option value="Testing of UE software">Testing of UE software</Option>
                                                                <Option value="Insufficient testing of 3rd party SW/HW">Insufficient testing of 3rd party SW/HW</Option>
                                                                <Option value="Performance measurement verification gap">Performance measurement verification gap</Option>
                                                                <Option value="Limitation of test framework or environment">Limitation of test framework or environment</Option>
                                                                <Option value="Test automation gap">Test automation gap</Option>
                                                                <Option value="Test did not execute the planned scenario">Test did not execute the planned scenario</Option>
                                                                <Option value="Not reproducible in Nokia lab - can be detected in live network">Not reproducible in Nokia lab - can be detected in live network</Option>
                                                            </>
                                                            : nodeDatum.cause_category === "System verification non-functional testing" ?
                                                            <>
                                                                <Option value="Performance testing gap">Performance testing gap</Option>
                                                                <Option value="Robustness/stability test gap">Robustness/stability test gap</Option>
                                                                <Option value="Limitation of test framework or environment">Limitation of test framework or environment</Option>
                                                                <Option value="Test automation gap">Test automation gap</Option>
                                                                <Option value="Testcase was not executed">Testcase was not executed</Option>
                                                            </>
                                                            : nodeDatum.cause_category === "Collaborated mode with suppliers" ?
                                                            <>
                                                                <Option value="Delivery failure">Delivery failure</Option>
                                                                <Option value="Lack of specification">Lack of specification</Option>
                                                                <Option value="Documentation failure">Documentation failure</Option>
                                                                <Option value="Implementation failure">Implementation failure</Option>
                                                                <Option value="Lack of testing">Lack of testing</Option>
                                                                <Option value="Missing requirement">Missing requirement</Option>
                                                                <Option value="Project management">Project management</Option>
                                                                <Option value="3rd party software limitations">3rd party software limitations</Option>
                                                            </>
                                                            :
                                                            null
                                                        )
                                                        : null :null
                                                    }
                                                </Select>

                                            </div>

                                            <div className="label">Action type:</div>
                                            <div className="input">
                                                <Select
                                                    className="dropDownMenu"
                                                    style={{
                                                        width: "100%",
                                                        fontSize: "26px"
                                                    }}
                                                    value={nodeDatum.action_type || undefined}
                                                    showSearch
                                                    notFoundContent={EmptySelect()}
                                                    placeholder="Type and select an action type"
                                                    onChange={(newValue) => {
                                                        nodeDatum.action_type = newValue;
                                                        state.editWhyWithoutPopup(nodeDatum);
                                                    }}
                                                >
                                                    {nodeDatum.branch_type ? nodeDatum.branch_type.includes("RCA") ?
                                                        <>
                                                            <Option value="Requirements improvement">Requirements improvement</Option>
                                                            <Option value="Architecture improvement">Architecture improvement</Option>
                                                            <Option value="High-level design improvement">High-level design improvement</Option>
                                                            <Option value="Low-level design improvement">Low-level design improvement</Option>
                                                            <Option value="Coding quality improvement">Coding quality improvement</Option>
                                                            <Option value="User documentation (including release note) improvement">User documentation (including release note) improvement</Option>
                                                            <Option value="Configuration and fault management improvement">Configuration and fault management improvement</Option>
                                                            <Option value="Knowledge/Expertise/Training improvement">Knowledge/Expertise/Training improvement</Option>
                                                        </>
                                                        : nodeDatum.branch_type.includes("EDA") ?
                                                        <>
                                                            <Option value="Technical reviews improvement">Technical reviews improvement</Option>
                                                            <Option value="Code analysis tools improvement">Code analysis tools improvement</Option>
                                                            <Option value="Unit test improvement">Unit test improvement</Option>
                                                            <Option value="System component/module test improvement">System component/module test improvement</Option>
                                                            <Option value="Entity/Integration and verification test improvement">Entity/Integration and verification test improvement</Option>
                                                            <Option value="System verification functional test improvement">System verification functional test improvement</Option>
                                                            <Option value="System verification non-functional testing improvement">System verification non-functional testing improvement</Option>
                                                        </>
                                                        : null : null
                                                    }
                                                </Select>

                                            </div>

                                            <div className="label">Assigned to:</div>
                                            <div className="input">
                                                <UserSelect className="dropDownMenu"
                                                            style={{
                                                                width: "100%",
                                                                fontSize: "26px"
                                                            }}
                                                            value={nodeDatum.assigned_to_object}
                                                            placeholder="Type and select a person"
                                                            onChange={(newValue) => {
                                                                nodeDatum.assigned_to_object = newValue;
                                                                nodeDatum.assigned_to = newValue.hasOwnProperty("label") ? ["label"] : "Unavailable";
                                                                state.editWhyWithoutPopup(nodeDatum);
                                                            }}
                                                />
                                            </div>

                                            <div className="inputCompletionDate">
                                                <div className="label"
                                                style={{width: "400px", lineHeight: "2"}}>
                                                    Completion target date:
                                                </div>
                                                <div>
                                                    <DatePicker
                                                        placeholder="Type and select a date"
                                                        value={nodeDatum.completion_target_date ? moment(new Date(nodeDatum.completion_target_date)) : null}
                                                        onChange={(moment, datetime) => {
                                                            nodeDatum.completion_target_date_string = datetime;
                                                            nodeDatum.completion_target_date = datetime;
                                                            state.editWhyWithoutPopup(nodeDatum);
                                                        }}
                                                        style={{
                                                            width: "100%",
                                                            height: "55px",
                                                            fontSize: "26px"
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    :

                                    <div style={nodeDatum.active ?
                                        nodeDatum.branch_type === "RCA" ?
                                            {
                                                padding: "10px",
                                                width: nodeWidth,
                                                height: nodeHeight,
                                                border: "2px solid black",
                                                color: "white",
                                                backgroundColor: "rgb(5,154,3)",
                                                overflowY: "hidden",
                                                position: "absolute"
                                            }
                                            :
                                            {
                                                padding: "10px",
                                                width: nodeWidth,
                                                height: nodeHeight,
                                                border: "2px solid black",
                                                color: "white",
                                                backgroundColor: "rgb(6,189,3)",
                                                overflowY: "hidden",
                                                position: "absolute"
                                            }
                                        :
                                        nodeDatum.branch_type === "RCA" ?
                                            {
                                                padding: "10px",
                                                width: nodeWidth,
                                                height: nodeHeight,
                                                border: "3px dashed black",
                                                color: "black",
                                                backgroundColor: "rgb(175,175,175)",
                                                overflowY: "hidden",
                                                position: "absolute"
                                            }
                                            :
                                            {
                                                padding: "10px",
                                                width: nodeWidth,
                                                height: nodeHeight,
                                                border: "3px dashed black",
                                                color: "black",
                                                backgroundColor: "rgb(206,205,205)",
                                                overflowY: "hidden",
                                                position: "absolute"
                                            }
                                    }>

                                        <div style={{display: "flex"}}>
                                            <div style={{float: "left"}}>
                                                <h1 style={nodeDatum.active ? {
                                                    color: "white",
                                                    fontWeight: "bold",
                                                    marginBottom: "0px",
                                                    fontSize: "50px",
                                                    display: "inline-block",
                                                } : {
                                                    color: "black",
                                                    fontWeight: "bold",
                                                    marginBottom: "0px",
                                                    fontSize: "50px",
                                                    display: "inline-block",
                                                }}>{nodeDatum.action}</h1>
                                                <div className="commentsSectionViewMode">
                                                    <WhyTreeCommentsModule state={state} nodeDatum={nodeDatum} editable={state.state.edition}/>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="actionsDiv">
                                            {renderAiID(nodeDatum.ai_id)}
                                            <div className="label">Action proposal:</div>
                                            <div className="input actionProposalInput">
                                                <TextArea
                                                    rows={3}
                                                    value={nodeDatum.action_proposal}
                                                    disabled={true}
                                                    className={nodeDatum.active ?
                                                        nodeDatum.branch_type === "RCA" ?
                                                            "disabledStyleRcaActive"
                                                            :
                                                            "disabledStyleEdaActive"
                                                        :
                                                        nodeDatum.branch_type === "RCA" ?
                                                            "disabledStyleRcaNotActive"
                                                            :
                                                            "disabledStyleEdaNotActive"
                                                    }
                                                    style={{
                                                        width: "100%",
                                                        fontSize: "26px",
                                                    }}
                                                />
                                            </div>

                                            <div className="label">Cause category:</div>
                                            <div className="input">
                                                <Select
                                                    className={nodeDatum.active ?
                                                        nodeDatum.branch_type === "RCA" ?
                                                            "dropDownMenu disabledStyleRcaActive"
                                                            :
                                                            "dropDownMenu disabledStyleEdaActive"
                                                        :
                                                        nodeDatum.branch_type === "RCA" ?
                                                            "dropDownMenu disabledStyleRcaNotActive"
                                                            :
                                                            "dropDownMenu disabledStyleEdaNotActive"
                                                    }
                                                    style={{
                                                        width: "100%",
                                                        fontSize: "26px"
                                                    }}
                                                    value={nodeDatum.cause_category}
                                                    showSearch
                                                    disabled={true}
                                                    onChange={(newValue) => {
                                                        nodeDatum.cause_category = newValue;
                                                        nodeDatum.cause_subcategory = "";
                                                        state.editWhyWithoutPopup(nodeDatum);
                                                    }}
                                                >
                                                    <Option value="Technical reviews">Technical reviews</Option>
                                                    <Option value="Code analysis tools">Code analysis tools</Option>
                                                    <Option value="Unit tests">Unit tests</Option>
                                                    <Option value="System component or module test">System component or module test</Option>
                                                    <Option value="Entity or integration and verification test">Entity or integration and verification test</Option>
                                                    <Option value="System verification functional test">System verification functional test</Option>
                                                    <Option value="System verification non-functional testing">System verification non-functional testing</Option>
                                                    <Option value="Collaborated mode with suppliers">Collaborated mode with suppliers</Option>
                                                </Select>
                                            </div>

                                            <div className="label">Cause subcategory:</div>
                                            <div className="input">
                                                <Select
                                                    className={nodeDatum.active ?
                                                        nodeDatum.branch_type === "RCA" ?
                                                            "dropDownMenu disabledStyleRcaActive"
                                                            :
                                                            "dropDownMenu disabledStyleEdaActive"
                                                        :
                                                        nodeDatum.branch_type === "RCA" ?
                                                            "dropDownMenu disabledStyleRcaNotActive"
                                                            :
                                                            "dropDownMenu disabledStyleEdaNotActive"
                                                    }
                                                    style={{
                                                        width: "100%",
                                                        fontSize: "26px"
                                                    }}
                                                    disabled={true}
                                                    value={nodeDatum.cause_subcategory}
                                                    showSearch
                                                    onChange={(newValue) => {
                                                        nodeDatum.cause_subcategory = newValue;
                                                        state.editWhyWithoutPopup(nodeDatum);
                                                    }}
                                                >
                                                    { nodeDatum.cause_category==="Technical reviews" ?
                                                        <>
                                                            <Option value="Requirements not reviewed with customer">Requirements not reviewed with customer</Option>
                                                            <Option value="Internal requirements review gap">Internal requirements review gap</Option>
                                                            <Option value="Architecture review gap">Architecture review gap</Option>
                                                            <Option value="Design review gap">Design review gap</Option>
                                                            <Option value="Missing analysis of impact of change">Missing analysis of impact of change</Option>
                                                            <Option value="Code review gap">Code review gap</Option>
                                                            <Option value="Test strategy review gap">Test strategy review gap</Option>
                                                            <Option value="Unit or component testcase review gap">Unit or component testcase review gap</Option>
                                                            <Option value="Entity or integration test review gap">Entity or integration test review gap</Option>
                                                            <Option value="System testcase review gap">System testcase review gap</Option>
                                                            <Option value="CuDo internal review gap">CuDo internal review gap</Option>
                                                        </>
                                                        : nodeDatum.cause_category==="Code analysis tools" ?
                                                        <>
                                                            <Option value="Test tools availability/capability">Test tools availability/capability</Option>
                                                            <Option value="Inappropriate tool usage">Inappropriate tool usage</Option>
                                                            <Option value="Insufficient use of static analyzers">Insufficient use of static analyzers</Option>
                                                            <Option value="Insufficient use of dynamic analyzers">Insufficient use of dynamic analyzers</Option>
                                                        </>
                                                        : nodeDatum.cause_category==="Unit tests" ?
                                                        <>
                                                            <Option value="Code not covered by test">Code not covered by test</Option>
                                                            <Option value="Wrong check in testcase">Wrong check in testcase</Option>
                                                            <Option value="Stubs or mocks do not reflect real world scenarios">Stubs or mocks do not reflect real world scenarios</Option>
                                                            <Option value="Objects initialized with wrong values">Objects initialized with wrong values</Option>
                                                            <Option value="Error cases/paths not tested">Error cases/paths not tested</Option>
                                                        </>
                                                        : nodeDatum.cause_category==="System component or module test" ?
                                                        <>
                                                            <Option value="Functionality not covered">Functionality not covered</Option>
                                                            <Option value="Feature interaction coverage gap">Feature interaction coverage gap</Option>
                                                            <Option value="Corner case and error case test gap">Corner case and error case test gap</Option>
                                                            <Option value="Limitation of test framework or environment">Limitation of test framework or environment</Option>
                                                            <Option value="Configuration coverage gap">Configuration coverage gap</Option>
                                                            <Option value="Test did not execute the planned scenario">Test did not execute the planned scenario</Option>
                                                        </>
                                                        : nodeDatum.cause_category==="Entity or integration and verification test" ?
                                                        <>
                                                            <Option value="Requirement coverage gap">Requirement coverage gap</Option>
                                                            <Option value="Limitation of test framework or environment">Limitation of test framework or environment</Option>
                                                            <Option value="Configuration coverage gap">Configuration coverage gap</Option>
                                                            <Option value="Test did not execute the planned scenario">Test did not execute the planned scenario</Option>
                                                            <Option value="Exploratory testing (negative, sequence, abnormal, boundary, corner case) gap">Exploratory testing (negative, sequence, abnormal, boundary, corner case) gap</Option>
                                                        </>
                                                        : nodeDatum.cause_category==="System verification functional test" ?
                                                        <>
                                                            <Option value="Network or solution verification testing gap">Network or solution verification testing gap</Option>
                                                            <Option value="Regression test gap">Regression test gap</Option>
                                                            <Option value="Configuration coverage gap">Configuration coverage gap</Option>
                                                            <Option value="Requirement coverage gap">Requirement coverage gap</Option>
                                                            <Option value="Feature interaction coverage gap">Feature interaction coverage gap</Option>
                                                            <Option value="Exploratory testing (negative, sequence, abnormal, boundary, corner case) gap">Exploratory testing (negative, sequence, abnormal, boundary, corner case) gap</Option>
                                                            <Option value="Testing of UE software">Testing of UE software</Option>
                                                            <Option value="Insufficient testing of 3rd party SW/HW">Insufficient testing of 3rd party SW/HW</Option>
                                                            <Option value="Performance measurement verification gap">Performance measurement verification gap</Option>
                                                            <Option value="Limitation of test framework or environment">Limitation of test framework or environment</Option>
                                                            <Option value="Test automation gap">Test automation gap</Option>
                                                            <Option value="Test did not execute the planned scenario">Test did not execute the planned scenario</Option>
                                                            <Option value="Not reproducible in Nokia lab - can be detected in live network">Not reproducible in Nokia lab - can be detected in live network</Option>
                                                        </>
                                                        : nodeDatum.cause_category==="System verification non-functional testing" ?
                                                        <>
                                                            <Option value="Performance testing gap">Performance testing gap</Option>
                                                            <Option value="Robustness/stability test gap">Robustness/stability test gap</Option>
                                                            <Option value="Limitation of test framework or environment">Limitation of test framework or environment</Option>
                                                            <Option value="Test automation gap">Test automation gap</Option>
                                                            <Option value="Testcase was not executed">Testcase was not executed</Option>
                                                        </>
                                                        : nodeDatum.cause_category==="Collaborated mode with suppliers" ?
                                                        <>
                                                            <Option value="Delivery failure">Delivery failure</Option>
                                                            <Option value="Lack of specification">Lack of specification</Option>
                                                            <Option value="Documentation failure">Documentation failure</Option>
                                                            <Option value="Implementation failure">Implementation failure</Option>
                                                            <Option value="Lack of testing">Lack of testing</Option>
                                                            <Option value="Missing requirement">Missing requirement</Option>
                                                            <Option value="Project management">Project management</Option>
                                                            <Option value="3rd party software limitations">3rd party software limitations</Option>
                                                        </>
                                                        :
                                                        null
                                                    }
                                                </Select>

                                            </div>

                                            <div className="label">Action type:</div>
                                            <div className="input">
                                                <Select
                                                    className={nodeDatum.active ?
                                                        nodeDatum.branch_type === "RCA" ?
                                                            "dropDownMenu disabledStyleRcaActive"
                                                            :
                                                            "dropDownMenu disabledStyleEdaActive"
                                                        :
                                                        nodeDatum.branch_type === "RCA" ?
                                                            "dropDownMenu disabledStyleRcaNotActive"
                                                            :
                                                            "dropDownMenu disabledStyleEdaNotActive"
                                                    }
                                                    style={{
                                                        width: "100%",
                                                        fontSize: "26px"
                                                    }}
                                                    disabled={true}
                                                    value={nodeDatum.action_type}
                                                    showSearch
                                                    onChange={(newValue) => {
                                                        nodeDatum.action_type = newValue;
                                                        state.editWhyWithoutPopup(nodeDatum);
                                                    }}
                                                >
                                                    <Option value="Technical reviews improvement">Technical reviews improvement</Option>
                                                    <Option value="Code analysis tools improvement">Code analysis tools improvement</Option>
                                                    <Option value="Unit test improvement">Unit test improvement</Option>
                                                    <Option value="System component/module test improvement">System component/module test improvement</Option>
                                                    <Option value="Entity/Integration and verification test improvement">Entity/Integration and verification test improvement</Option>
                                                    <Option value="System verification functional test improvement">System verification functional test improvement</Option>
                                                    <Option value="System verification non-functional testing improvement">System verification non-functional testing improvement</Option>
                                                </Select>

                                            </div>

                                            <div className="label">Assigned to:</div>
                                            <div className="input">
                                                <UserSelect className={nodeDatum.active ?
                                                                nodeDatum.branch_type === "RCA" ?
                                                                    "dropDownMenu disabledStyleRcaActive"
                                                                    :
                                                                    "dropDownMenu disabledStyleEdaActive"
                                                                :
                                                                nodeDatum.branch_type === "RCA" ?
                                                                    "dropDownMenu disabledStyleRcaNotActive"
                                                                    :
                                                                    "dropDownMenu disabledStyleEdaNotActive"
                                                            }
                                                            style={{
                                                                width: "100%",
                                                                fontSize: "26px"
                                                            }}
                                                            disabled={true}
                                                            value={nodeDatum.assigned_to_object}
                                                            onChange={(newValue) => {
                                                                nodeDatum.assigned_to_object = newValue;
                                                                nodeDatum.assigned_to = newValue.hasOwnProperty("label") ? ["label"] : "Unavailable";
                                                                state.editWhyWithoutPopup(nodeDatum);
                                                            }}
                                                />
                                            </div>

                                            <div className="inputCompletionDate">
                                                <div className="label"
                                                style={{width: "400px", lineHeight: "2"}}>
                                                    Completion target date:
                                                </div>
                                                <div>
                                                    <DatePicker
                                                        className={nodeDatum.active ?
                                                            nodeDatum.branch_type === "RCA" ?
                                                                "dropDownMenu disabledStyleRcaActive"
                                                                :
                                                                "dropDownMenu disabledStyleEdaActive"
                                                            :
                                                            nodeDatum.branch_type === "RCA" ?
                                                                "dropDownMenu disabledStyleRcaNotActive"
                                                                :
                                                                "dropDownMenu disabledStyleEdaNotActive"
                                                        }
                                                        placeholder=""
                                                        value={nodeDatum.completion_target_date ? moment(new Date(nodeDatum.completion_target_date)) : null}
                                                        onChange={(moment, datetime) => {
                                                            nodeDatum.completion_target_date_string = datetime;
                                                            nodeDatum.completion_target_date = datetime;
                                                            state.editWhyWithoutPopup(nodeDatum);
                                                        }}
                                                        style={{color: "white"}}
                                                        disabled={true}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                :

                                null
            }

        </foreignObject>
    </g>
);
