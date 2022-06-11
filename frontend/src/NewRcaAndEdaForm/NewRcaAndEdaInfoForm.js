import React from "react";
import '../css/NewRcaAndEdaInfoForm.css';
import {Button, DatePicker, Form, Input, InputNumber, Select, Tooltip, Checkbox, message} from "antd";
import {Ring} from "react-spinners-css";
import InfoCircleOutlined from "@ant-design/icons/InfoCircleOutlined";
import UserSelect from "../CommonComponents/selectors/UserSelect";
import axios from '../axios/axios';
import FaultAnalysisIdSelect from "../CommonComponents/selectors/FaultAnalysisIdSelect";
import ProntoIdSelect from "../CommonComponents/selectors/ProntoIdSelect";
import {WhyTreeDataStructureTemplate} from "../List5Why/Overview/WhyTree/WhyTreeDataStructureTemplate";
import {mapBranchTreeToData} from "../List5Why/Overview/WhyTree/WhyTreeRecursiveMapTreeToData";
import {StarOutlined} from "@ant-design/icons";
import moment from "moment";

const {TextArea} = Input;
const {Option} = Select;
const FormItem = Form.Item;


class NewRcaAndEdaInfoForm extends React.Component {

    formRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            inputFaultAnalysisId: null,
            inputProntoId: null,
            fetchedFromFaultAnalysis: false,
            faultAnalysisAlreadyExists: null,
            fetchedFromPronto: false,
            fetchedData: false,
            fetchError: false,
            fetchErrorMessage: "",
            faultAnalysisNotFetchedFormSubmitError: false,
            value: 1,
            error_flag1: false,
            error_flag2: false,
            error_flag3: false,
            error_flag4: false, //dropdown Menu 1 error_flag
            error_flag5: false,
            error_flag6: false, //dropdown Menu 2 error_flag
            error_flag7: false, //injection time
            error_flag8: false,
            error_flag9: false,
            error_flag10: false, //Number input - default value = 0
            error_flag11: false,
            inputError: false, //Are all fields filled?
            loading: false, //For now loading container is active all the time but hidden behind the form
            faultAnalysisError: false,
            prontoError: false,
            submitError: false,
            submitClicked: false,
            submitErrorMessage: "",
            prontoIdArray: {},
            products: "",
            abstract_headline: "",
            faultAnalysisId: "",
            faultAnalysisHref: "",
            lastRevisionHistoryDate: "",
            feature: "",
            threeRowsText: "",
            correctionDescription: "",
            injectionType: "",
            injectionTimeCheck: "everything_else",
            injectionTime: {},
            issueInjTimePreciseDate: null,
            firstFaultySWBuild: "",
            injTimeCheckBox: "No",
            injectionTimeFetched: "",
            NameOfDFc: "",
            featureId: "",
            revisionDate: null,
            injTimeAdditionalRows: false,
            howManyTimes: "",
            textArea1: "",
            textArea2: "",
            textArea3: "",
            dropDownMenu4: "",
            textArea5: "",
            dropDownMenu6: "",
            textArea7: "", //Injection Time
            textArea8: "",
            textArea9: "",
            numberInput10: "",
            quality_reviewer: null,
            formColumnRef: null,
        };
    }


    onChange = e => {
        this.setState({
            value: e.target.value
        });
    }

    injectionTypeOnChange(value) {

        if (value === "New feature" && this.state.fetchedData) {
            this.setState({
                injectionTimeCheck: "new_feature",
                injTimeAdditionalRows: true,
            });
        } else if (value === "Defective correction" && this.state.fetchedData) {

            this.setState({
                injectionTimeCheck: "defective_correction",
                injTimeAdditionalRows: true,
            });
        } else if (value === "Legacy code" && this.state.fetchedData) {

            this.setState({
                injectionTimeCheck: "legacy_code",
                injTimeAdditionalRows: true,
            });
        } else {
            this.setState({
                injectionTimeCheck: "everything_else",
                injTimeAdditionalRows: false,
            });
        }

    }


    async fetchFromFaultAnalysisFunctionality(path) {

        axios.get(`PrTool/fault_analysis/fa/${path}`, {
            headers: {'Authorization': `Token ${localStorage.token}`}
        }).then(response => {
            if (response.status === 200) {
                this.parseResponseData(response.data);
            }
        }).catch(error => {

            if(document.getElementById("inputProntoFaultIdBtn") !== null) {
                document.getElementById("inputProntoFaultIdBtn").removeAttribute("disabled");
            }
            if (error.response && error.response.status === 404) {
                this.setState({
                    fetchError: true,
                    fetchErrorMessage: "Invalid Fault Analysis ID!",
                    loading: false
                })
            } else if (error.response && error.response.status === 500) {
                this.setState({
                    fetchError: true,
                    fetchErrorMessage: "Unexpected network problem occurred! Try again in a moment! If the problem still persists then please contact with us.",
                    loading: false
                });
            }
        })
    }


    fetchFromFaultAnalysis(faultAnalysisId) {
        if (faultAnalysisId !== "") {


            this.fetchFromFaultAnalysisFunctionality(faultAnalysisId).then(response => {
                //some logic regarding returned premise - not needed
                //added to avoid warning ...
            });

        } else {
            this.setState({
                faultAnalysisError: true,
                fetchError: false,
                prontoError: false,
            })
        }
    }

    parseResponseData(data) {

        if (data) {

            let firstSWBuildData = data["first_faulty_sw_build"] !== "" ? + data["first_faulty_sw_build"] : "Not Specified";
            let featureIdData = data["feature"] !== "" ? data["feature"] : "Not Specified";
            let NameOfDFcData = data["nameOfDFc"] !== "" ? data["nameOfDFc"] : "Not Specified";

            this.setState({
                //general overview
                faultAnalysisId: data["fault_analysis_id"],
                faultAnalysisHref: data["fault_analysis_href"],
                faultAnalysisAlreadyExists: data["fault_analysis_id_already_exists"],
                products: data["products"],
                abstract_headline: data["title"],
                prontoIdArray: data["pronto_id"],
                feature: data["feature"],
                lastRevisionHistoryDate: data["last_revision_history_date"],
                //fetched data
                threeRows: data["identification"],
                correctionDescription: data["resolution"],
                howManyTimes: data["how_many_R&D_requested"],
                injectionTimeFetched: "[First SW faulty build:]\n" + firstSWBuildData +
                     "\n\n[Feature:]\n" + featureIdData +
                    "\n\n[NameOfDFc:]\n" + NameOfDFcData,
                fetchedData: true,
                showInjectionTime: true,
                loading: false,
            });
        }


        if (data["defective_software_fix"] === "Yes" || data["defective_software_fix"] === "yes") {
            this.setState({
                injectionType: "Defective correction",
            });
        } else {
            this.setState({
                injectionType: "Not specified",
            });
        }

        const value = this.formRef.current.getFieldValue('injection_type');
        this.injectionTypeOnChange(value);

        document.getElementById("inputProntoFaultIdBtn").sAttribute("disabled");
    }

    async fetchFromPronto(prontoId) {
        if (prontoId !== "") {
            axios.get(`PrTool/fault_analysis/pr/${prontoId}`, {
                headers: {'Authorization': `Token ${localStorage.token}`}
            }).then(response => {
                if (response.status === 200) {
                    this.parseResponseData(response.data);
                }
            }).catch(error => {
                if (document.getElementById("inputProntoFaultIdBtn") !== null) {
                    document.getElementById("inputProntoFaultIdBtn").removeAttribute("disabled");
                }
                if (error.response && error.response.status === 404) {
                    this.setState({
                        fetchError: true,
                        fetchErrorMessage: "Invalid Pronto ID!",
                        loading: false
                    });
                } else if (error.response && error.response.status === 500) {
                    this.setState({
                        fetchError: true,
                        fetchErrorMessage: "Unexpected network problem occurred! Try again in a moment! " +
                            "If the problem still persists then please contact with us.",
                        loading: false
                    });
                }
            })
        } else {
            this.setState({
                prontoError: true,
                fetchError: false,
                faultAnalysisError: false,
                loading: false
            });
        }
    }

    textAreaOnClickStateChange(name, value) {
        if (`this.state.${name}`) {
            this.setState({[name]: value});
        }
    }

    alertColorChange(value, id) {
        if (`this.state.${value}`) {
            this.setState({[value]: false});
        }
        if (document.getElementById(id).value === '') {
            this.setState({[value]: true});
        }
    }

    nextSubmit(event) {
        this.setState({
            inputError: false,
            submitError: false,
            submitErrorMessage: "",
            loading: true,
            submitClicked: true,
        });

        if (this.state.faultAnalysisId === '') {
            this.setState({
                faultAnalysisNotFetchedFormSubmitError: true,
                loading: false,
                submitClicked: false,
            });
            window.scrollTo(0, document.body.scrollHeight);
        } else {
            if (document.getElementById("textAreaInput1").value === '') {
                this.setState({
                    inputError: true,
                    error_flag1: true
                });
            }
            if (document.getElementById("textAreaInput2").value === '') {
                this.setState({
                    inputError: true,
                    error_flag2: true
                });
            }
            if (document.getElementById("textAreaInput3").value === '') {
                this.setState({
                    inputError: true,
                    error_flag3: true
                });
            }
            if (this.state.dropDownMenu4 === "") {
               this.setState({
                    inputError: true,
                    error_flag4: true
                });
            }
            if (document.getElementById("textAreaInput5").value === '') {
                this.setState({
                    inputError: true,
                    error_flag5: true
                });
            }
            if (this.state.dropDownMenu6 === "") {
               this.setState({
                    inputError: true,
                    error_flag6: true
                });
            }
            // if (document.getElementById("textAreaInput8").value === '') {
            //     this.setState({
            //         inputError: true,
            //         error_flag8: true
            //     });
            // }
            // if (document.getElementById("textAreaInput9").value === '') {
            //     this.setState({
            //         inputError: true,
            //         error_flag9: true
            //     });
            // }
            if (document.getElementById("numberInput10").value === '') {
                this.setState({
                    inputError: true,
                    error_flag10: true
                });
            }
            if (!this.state.quality_reviewer || this.state.quality_reviewer === undefined) {
                this.setState({
                    inputError: true,
                    error_flag11: true
                });
            }

            if (!this.state.inputError) {

                let injection = {
                    type: event.injection_type,
                    time_merged: this.state.issueInjTimePreciseDate,
                    first_build_containing_issue: this.state.firstFaultySWBuild,
                    issue_injected_in_maintenance: this.state.injTimeCheckBox === "Yes" ? "true" : "false",
                    feature_id: this.state.featureId,
                    name_of_dfc: this.state.nameOfDFc,
                    time_latest_file_revision: this.state.revisionDate,
                }

                let initialWhyTree = WhyTreeDataStructureTemplate();
                let data = {
                    abstract_headline: this.state.abstract_headline,
                    product: this.state.products,
                    fault_analysis_id: this.state.faultAnalysisId,
                    pronto_id: Object.keys(this.state.prontoIdArray),
                    creator: {
                        value: localStorage.username
                    },
                    issue_description: document.getElementById("textAreaInput1").value,
                    triggering_scenario: document.getElementById("textAreaInput2").value,
                    code_deficiency: document.getElementById("textAreaInput3").value,
                    triggering_scenario_category: event.triggering_scenario,
                    correction_description: document.getElementById("textAreaInput5").value,
                    injection: injection,
                    additional_facts: document.getElementById("textAreaInput8").value,
                    inheritance_recommendation: document.getElementById("textAreaInput9").value,
                    how_many_RD_requests: document.getElementById("numberInput10").value,
                    quality_reviewer: this.state.quality_reviewer,

                    rca_fault_introduced: mapBranchTreeToData(initialWhyTree, 0),
                    rca_not_found_on_review: mapBranchTreeToData(initialWhyTree, 1),
                    eda_requirements_reviews: mapBranchTreeToData(initialWhyTree, 2),
                    eda_design_reviews: mapBranchTreeToData(initialWhyTree, 3),
                    eda_code_analysis_tools: mapBranchTreeToData(initialWhyTree, 4),
                    eda_code_inspections: mapBranchTreeToData(initialWhyTree, 5),
                    eda_unit_component_test: mapBranchTreeToData(initialWhyTree, 6),
                    eda_entity_test: mapBranchTreeToData(initialWhyTree, 7),
                    eda_et_automated_test: mapBranchTreeToData(initialWhyTree, 8),
                    eda_system_test: mapBranchTreeToData(initialWhyTree, 9),
                    eda_st_automated_test: mapBranchTreeToData(initialWhyTree, 10),
                }

                axios.post('/rcaeda/', data,
                    {
                        headers: {'Authorization': `Token ${localStorage.token}`}
                    }).then(response => {
                    if (response.status === 201) {
                        let caseNumber = response.data["case_number"];

                        this.props.history.push({
                            pathname: "/List5Why/RcaEdaOverview/" + caseNumber,
                            state: {
                                edit_mode: true
                            }
                        });

                        this.setState({
                            loading: false,
                            submitClicked: false,
                        })

                        this.props.history.go();

                    }
                }).catch(error => {
                    if (error.response && error.response.status === 400) {
                        this.setState({
                            loading: false,
                            submitClicked: false,
                            submitError: true,
                            submitErrorMessage: "Form that is related to this fault analysis already exists! " +
                                "If you want to see it then check the 5why List in order to find it. " +
                                "Otherwise please fetch data from some other fault analysis."
                        });
                    } else if (error.response && error.response.status === 500) {
                        this.setState({
                            loading: false,
                            submitClicked: false,
                            submitError: true,
                            submitErrorMessage: "Unexpected network problem occurred! " +
                            "Try again in a moment. If the problem persists, please contact us."
                        });
                    }


                    if (this.state.formColumnRef) {
                        this.state.formColumnRef.scrollIntoView({behavior: "smooth"});
                    }
                })

            } else {
                this.setState({
                    loading: false,
                    submitClicked: false,
                })

                if (this.state.formColumnRef) {
                    this.state.formColumnRef.scrollIntoView({behavior: "smooth"});
                }
            }
        }
    }

    searchFaultProntoId(event) {
        const prontoId = this.state.inputProntoId;
        const faultAnalysisId = this.state.inputFaultAnalysisId;
        const prontoList = this.state.prontoIdArray;

        document.getElementById("inputProntoFaultIdBtn").setAttribute("disabled", "disabled");

        if (faultAnalysisId || prontoId) {
            if((faultAnalysisId && faultAnalysisId["label"] !== this.state.faultAnalysisId) ||
                (prontoId && prontoList &&
                !Object.keys(prontoList).includes(prontoId["label"]))) {

                this.setState({
                    fetchError: false,
                    faultAnalysisNotFetchedFormSubmitError: false,
                    faultAnalysisError: false,
                    prontoError: false,
                    fetchedData: false,
                    showInjectionTime: false,
                    submitError: false,
                    faultAnalysisAlreadyExists: false,
                    submitErrorMessage: "",
                    loading: true
                });

                if (faultAnalysisId) {
                    this.fetchFromFaultAnalysis(faultAnalysisId["label"]);

                } else if (prontoId) {
                    this.fetchFromPronto(prontoId["label"]).then(r => {
                    });
                }
            }
            else {
                message.error({
                    content: 'Selected fault analysis ID or pronto ID is already fetched!',
                    className: 'alreadySelectedAlert',
                }, 1.5);

                setTimeout(() => {
                    if(document.getElementById("inputProntoFaultIdBtn") !== null) {
                        document.getElementById("inputProntoFaultIdBtn").removeAttribute("disabled");
                    }
                },2000)

            }
        } else {
            this.setState({
                fetchError: true,
                fetchErrorMessage: "Please select fault analysis ID or pronto ID from lists"
            });

            if(document.getElementById("inputProntoFaultIdBtn") !== null) {
                document.getElementById("inputProntoFaultIdBtn").removeAttribute("disabled");
            }

        }

    }


    render() {
        const prontoIDList = Object.keys(this.state.prontoIdArray).map(prontoID =>
            <span key={prontoID}
                  className="prontoIDList"
                  style={{width: "100%", color: "black", marginBottom: "3%"}}>
                     Pronto ID:
                     <a className="infoIDItem"
                        style={{ marginLeft: "3%"}}
                        href={this.state.prontoIdArray[prontoID]["href"]}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => {
                        }}>
                        {prontoID}
                     </a>
            </span>);

        return (
            <div className="raeiContainer" style={{width: "100%"}}>

                <h1 id="formHeader">New RCA/EDA form</h1>

                <div
                    style={{display: "flex", width: "100%"}}
                >

                    <div className={"firstColumn"}>
                        <h3>Search by Fault Analysis ID or Pronto ID:</h3>

                        <h4>Fault analysis ID:
                            <Tooltip color={"rgb(18,65,145)"}
                                 title="Type and select fault analysis ID from the dropdown menu below!">
                                <InfoCircleOutlined className="infoIcon"/>
                            </Tooltip>
                        </h4>
                        <FaultAnalysisIdSelect
                            id="faultAnalysisDropDownMenu1"
                            className="dropDownMenuFaPr"
                            placeholder={"Input fault analysis ID"}
                            value={this.state.inputFaultAnalysisId}
                            onChange={(newValue) => {
                               this.setState({
                                   inputFaultAnalysisId: newValue,
                                   inputProntoId: null
                               });
                            }}
                        />
                        <h4>Pronto ID:
                            <Tooltip color={"rgb(18,65,145)"}
                                 title="Type and select pronto ID from the dropdown menu below!">
                                <InfoCircleOutlined className="infoIcon"/>
                            </Tooltip>
                        </h4>

                        <ProntoIdSelect
                            id="prontoIdDropDownMenu1"
                            className="dropDownMenuFaPr"
                            placeholder={"Input pronto ID"}
                            value={this.state.inputProntoId}
                            onChange={(newValue) => {
                                this.setState({
                                    inputProntoId: newValue,
                                    inputFaultAnalysisId: null
                                });
                            }}
                        />

                        <Button
                            id={this.state.submitClicked || this.state.loading ? "inputProntoFaultIdBtnDisabled" : "inputProntoFaultIdBtn"}
                            type="primary"
                            htmlType="submit"
                            disabled={this.state.loading || this.state.submitClicked}
                            onClick={(e) => this.searchFaultProntoId(e)}
                        >
                            Fetch data
                        </Button>

                        <h5>
                            {this.state.faultAnalysisError ?
                                <div className="divFetchingMessages"
                                    style={{width: "100%", color: "red", paddingBottom: "15px"}}
                                >
                                    Please properly enter the Fault Analysis ID!
                                </div>

                                :
                                null
                            }
                            {this.state.faultAnalysisAlreadyExists ?
                                <div className="divFetchingMessages"
                                    style={{width: "100%", color: "red", paddingBottom: "15px"}}
                                >
                                    Form with this fault analysis ID already exists. You can't create forms with the
                                    same IDs. <br/>
                                    <button
                                        className="linkButton"
                                        onClick={() => {
                                            this.props.history.push({
                                                pathname: "/List5Why/RcaEdaOverview/" + this.state.faultAnalysisAlreadyExists,
                                                state: {
                                                    edit_mode: true
                                                }
                                            });
                                            this.props.history.go();
                                        }}
                                    >You can edit existing form here &#x2192; <span style={{fontWeight: 700}}>{this.state.faultAnalysisAlreadyExists}</span></button>
                                </div>

                                :
                                null

                            }
                            {this.state.prontoError ?
                                <div className="divFetchingMessages"
                                    style={{width: "100%", color: "red", paddingBottom: "15px"}}
                                >
                                    Please properly enter the Pronto ID!
                                </div>

                                :
                                null
                            }
                            {this.state.fetchError ?
                                <div className="divFetchingMessages"
                                    style={{width: "100%", color: "red", paddingBottom: "15px"}}
                                >
                                    {this.state.fetchErrorMessage}
                                </div>

                                :
                                null
                            }
                            {this.state.fetchedData ?
                                <div className="divFetchingMessages">
                                    <span style={{paddingBottom: "10px"}}>
                                        Fault Analysis ID:
                                         <a className="infoIDItem"
                                            style={{marginLeft: "3%"}}
                                            href={this.state.faultAnalysisHref}
                                            target="_blank"
                                            rel="noreferrer"
                                            onClick={() => {
                                            }}>
                                            {this.state.faultAnalysisId}
                                        </a>
                                    </span>
                                    {prontoIDList}
                                </div>
                                :
                                null}
                        </h5>
                    </div>

                    <div className={'formColumn'}>
                        <Form ref={this.formRef} className="Rca-Eda-Info-form" onFinish={(event) => {
                            this.nextSubmit(event)
                        }}>
                            {this.state.loading ?
                                <div id="loader">
                                    <Ring size="120" color="grey" className="raeiSpinner" />
                                </div> : null
                            }
                            <h3 id="headerLeft">RCA/EDA Info form:</h3>
                            <h3 id="headerRight">Fetched data from Pronto or Fault Analysis:</h3>

                            <h5 id="headerOneLeft" style={{color: this.state.error_flag1 ? "red" : "black"}}>
                                <StarOutlined className="star" /> 1. Issue description:
                                <Tooltip color={"rgb(18,65,145)"} title="What was the problem from the  customer's or tester’s viewpoint?
                                What was wrong or not working?">
                                    <InfoCircleOutlined className="infoIcon"/>
                                </Tooltip>
                            </h5>
                            <div id="leftOne" className="formItem">
                                <div className="textAreaBorder">
                                    <TextArea value={this.state.textArea1} onChange={(e) => {
                                        this.textAreaOnClickStateChange("textArea1", e.target.value)
                                    }}
                                              onBlur={() => {
                                                  this.alertColorChange("error_flag1", "textAreaInput1")
                                              }} id="textAreaInput1" className="textAreaInput" rows={8}/>
                                    </div>
                            </div>

                            {/*Three rows - element in the right column in the RcaAndEdaInfoForm*/}

                            <h5 id="headerOneRight">
                                Fetched - Issue description, Triggering scenario, Code deficiency:
                                <Tooltip color={"rgb(18,65,145)"} title="Fetched data related to
                                issue description, Triggering scenario and code deficiency
                                ">
                                    <InfoCircleOutlined className="infoIcon"/>
                                </Tooltip>
                            </h5>
                            <div id="threeRows" className="formItem">
                                <TextArea className="textAreaInput" id="threeRowsText" value={this.state.threeRows}
                                          disabled={true}/>
                            </div>

                            {/*--------------------------------------------------------------*/}

                            <h5 id="headerTwoLeft" style={{color: this.state.error_flag2 ? "red" : "black"}}>
                                <StarOutlined className="star" /> 2. Triggering scenario:
                                <Tooltip color={"rgb(18,65,145)"} title="What sequence of events is needed to observe the fault?
                                    What environment (e.g. HW/SW configuration) should be used?
                                    What constraints should be satisfied?
                                    Where and how was the issue actually found?
                                    Repeatability %%">
                                    <InfoCircleOutlined className="infoIcon"/>
                                </Tooltip>
                            </h5>
                            <div id="leftTwo" className="formItem">
                                <div className="textAreaBorder">
                                    <TextArea value={this.state.textArea2} onChange={(e) => {
                                        this.textAreaOnClickStateChange("textArea2", e.target.value)
                                    }}
                                              onBlur={() => {
                                                  this.alertColorChange("error_flag2", "textAreaInput2")
                                              }} id="textAreaInput2" className="textAreaInput" rows={8}/>
                                </div>
                            </div>

                            <h5 id="headerThreeLeft" style={{color: this.state.error_flag3 ? "red" : "black"}}>
                                <StarOutlined className="star" /> 3. Code deficiency: What was wrong in the source code?:
                                <Tooltip color={"rgb(18,65,145)"} title="Short technical description like
                                *variable was overwritten due to queue overflow --> The check for queue size was wrong - did allow more entries than actually fit into the queue
                                “name of non-existing file was sent to iOMS” --> “No check for file creation operation success was performed”
                                ">
                                    <InfoCircleOutlined className="infoIcon"/>
                                </Tooltip>
                            </h5>
                            <div id="leftThree" className="formItem">
                                <div className="textAreaBorder">
                                    <TextArea value={this.state.textArea3} onChange={(e) => {
                                        this.textAreaOnClickStateChange("textArea3", e.target.value)
                                    }}
                                              onBlur={() => {
                                                  this.alertColorChange("error_flag3", "textAreaInput3")
                                              }} id="textAreaInput3" className="textAreaInput" rows={8}/>
                                </div>
                            </div>

                            <h5 id="headerFourLeft" style={{color: this.state.error_flag4 ? "red" : "black"}}>
                                <StarOutlined className="star" /> 4. Triggering scenario category:
                                <Tooltip color={"rgb(18,65,145)"}
                                         title="Triggering scenario category: select appropriate item from the list!">
                                    <InfoCircleOutlined className="infoIcon"/>
                                </Tooltip>
                            </h5>
                            <div id="leftFour" className="formItem">
                                <FormItem name="triggering_scenario" >
                                    <Select id="dropDownMenu1" className="dropDownMenu"
                                            placeholder="Please choose the option!"
                                            onChange={(value) => {
                                                this.setState({
                                                    dropDownMenu4: value,
                                                    error_flag4: value === ""
                                                })
                                            }}>
                                        <Option value="SW upgrade">SW upgrade</Option>
                                        <Option value="SW fallback">SW callback</Option>
                                        <Option value="Process of configuration/reconfiguration">Process of
                                            configuration/reconfiguration</Option>
                                        <Option value="Not supported configuration">Not supported configuration</Option>
                                        <Option value="OAM operations">OAM operations</Option>
                                        <Option value="Feature interaction & interoperability">Feature interaction &
                                            interoperability</Option>
                                        <Option
                                            value="OAM robustness (high load / stressful scenarios / long duration)">
                                            OAM robustness (high Load/stressful scenarios/long duration)
                                        </Option>
                                        <Option
                                            value="Telecom robustness (high load/mobility/stressful scenarios/long duration)">
                                            Telecom robustness (high Load/mobility/stressful scenarios/long
                                            duration)
                                        </Option>
                                        <Option value="Debug (counters/alarms/trace/resource monitoring)">
                                            Debug (counters/alarms/trace/resource monitoring)
                                        </Option>
                                        <Option value="Reset & recovery">Reset & recovery</Option>
                                        <Option value="HW failure">HW failure</Option>
                                        <Option value="Required customer / vendor specific equipment">
                                            Required customer/vendor specific equipment
                                        </Option>
                                        <Option value="Unknown triggering scenario">Unknown triggering scenario</Option>
                                    </Select>
                                </FormItem>
                            </div>

                            {/*Empty space next to Triggering Type - right column in the RcaAndEdaInfoForm  */}

                            <div id="emptySpace1">

                            </div>

                            {/*--------------------------------------------------------------*/}

                            <h5 id="headerFiveLeft" style={{color: this.state.error_flag5 ? "red" : "black"}}>
                                <StarOutlined className="star" /> 5. Correction description: How the code was changed to fix the issue?:
                                <Tooltip color={"rgb(18,65,145)"} title="Just a short technical description:
                                *variable was overwritten due to queue overflow --> The check for queue size was wrong - did allow more entries than actually fit into the queue --> “queue size verification was added”
                                “name of non-existing file was sent to iOMS” --> “No check for file creation operation success was performed” --> “file creation operation result is verified before next actions”
                                ">
                                    <InfoCircleOutlined className="infoIcon"/>
                                </Tooltip>
                            </h5>
                            <div id="leftFive" className="formItem">
                                <div className="textAreaBorder">
                                    <TextArea value={this.state.textArea5} onChange={(e) => {
                                        this.textAreaOnClickStateChange("textArea5", e.target.value)
                                    }}
                                              onBlur={() => {
                                                  this.alertColorChange("error_flag5", "textAreaInput5")
                                              }} id="textAreaInput5" className="textAreaInput" rows={8}/>
                                </div>
                            </div>

                            {/*Correction Description - right column in the RcaAndEdaInfoForm  */}

                            <h5 id="headerFiveRight">
                                Fetched - Correction description:
                                <Tooltip color={"rgb(18,65,145)"} title="Fetched data related to correction
                                description”
                                ">
                                    <InfoCircleOutlined className="infoIcon"/>
                                </Tooltip>
                            </h5>
                            <div id="corrDescript" className="formItem">
                                <TextArea className="textAreaInput" id="corrDescriptText"
                                          value={this.state.correctionDescription} disabled={true} rows={8}/>
                            </div>

                            {/*--------------------------------------------------------------*/}

                            <h5 id="headerSixLeft" style={{color: this.state.error_flag6 ? "red" : "black"}}>
                                <StarOutlined className="star" /> 6a. Injection type:
                                <Tooltip color={"rgb(18,65,145)"}
                                         title="Select the injection type from the dropdown menu below!">
                                    <InfoCircleOutlined className="infoIcon"/>
                                </Tooltip>
                            </h5>
                            <div id="leftSix" className="formItem">
                                <FormItem key={this.state.dropDownMenu6} name="injection_type">
                                    <Select id="dropDownMenu2"
                                            className="dropDownMenu"
                                            placeholder="Please choose the option!"
                                            onChange={(value) => {
                                        this.injectionTypeOnChange(value)
                                        this.setState({
                                            dropDownMenu6: value,
                                            error_flag6: value === "",
                                            nameOfDFc: "",
                                            featureID: "",
                                            revisionDate: null
                                        })
                                    }}>
                                        <Option value="New feature">New feature</Option>
                                        <Option value="Defective correction">Defective correction</Option>
                                        <Option value="Optimization/refactoring">Optimization/refactoring</Option>
                                        <Option value="Revealed issue">Revealed issue</Option>
                                        <Option value="Legacy code">Legacy code</Option>
                                    </Select>
                                </FormItem>
                            </div>

                            {/*Injection type - right column in the RcaAndEdaInfoForm  */}

                            <h5 id="headerSixRight">
                                Fetched - Injection type:
                                <Tooltip color={"rgb(18,65,145)"}
                                         title="Fetched data related to injection type">
                                    <InfoCircleOutlined className="infoIcon"/>
                                </Tooltip>
                            </h5>
                            <div id="injType" className="formItem">
                                <Input className="textAreaInput" id="injTypeText" value={this.state.injectionType}
                                       disabled={true}/>
                            </div>

                            {/*--------------------------------------------------------------*/}

                            <h5 id="headerSevenLeft" style={{color: this.state.error_flag7 ? "red" : "black"}}>
                                6b. Injection time:
                                <Tooltip color={"rgb(18,65,145)"} title="When the issue was merged. First build
                                containing the issue. Was the issue injected in maintenance (post P8). Feature
                                ID – mandatory for New Feature injection. PR id  - mandatory for Defective Correction
                                injection. latest file revision (date) which was checked to claim Legacy Code -
                                mandatory for Legacy Code.">
                                    <InfoCircleOutlined className="infoIcon"/>
                                </Tooltip>
                            </h5>
                            <div id="leftSeven" className="formItem">
                                <h5 id="issuePreciseDateMargeHeader">
                                    When the issue was merged:
                                </h5>
                                <DatePicker className="textAreaInput" id="issuePreciseDateMarge" placeholder="Type and select a date"
                                onChange={(date) => {
                                    this.setState({
                                        issueInjTimePreciseDate: moment.utc(date).format().toString()
                                    })
                                }}
                                style={{
                                    height: "47%",
                                    marginTop: "20px",
                                    marginBottom: "15px",
                                }}
                                >

                                </DatePicker>

                                <h5 id="issueFirstSWBuildHeader">
                                    First build containing the issue (SW build):
                                </h5>
                                <input id="issueFirstSWBuildInput" autoComplete="off"
                                value={this.state.firstFaultySWBuild}
                                onChange={(e) => {
                                    this.setState({
                                        firstFaultySWBuild: e.target.value
                                    })
                                }}
                                >

                                </input>

                                <h5 id="issueInjMaintenancePostP8Header">
                                    Was the issue injected in maintenance (post P8)?
                                </h5>
                                <div className="checkBox" id="issueInjMaintenancePostP8CheckBox">
                                    <Checkbox
                                    onChange={(e) => {
                                        this.setState({
                                            injTimeCheckBox: e.target.checked ? "Yes" : "No"
                                        })
                                    }}
                                    style={{
                                        marginTop: "6px",
                                    }} />
                                </div>

                                {/*conditional injection time headers:*/}

                                {this.state.injectionTimeCheck === "defective_correction" ?
                                    <h5 id="issueCorrDescriptHeader">
                                        NameOfDFc (mandatory for Defective correction injection):
                                    </h5>
                                :
                                this.state.injectionTimeCheck === "new_feature" ?
                                    <h5 id="issueNewFeatureHeader">
                                        Feature ID (mandatory for New feature injection):
                                    </h5>
                                :
                                this.state.injectionTimeCheck === "legacy_code" ?
                                    <h5 id="issueLegacyCodeDateHeader">
                                        Latest file revision date which was checked to claim Legacy code:
                                    </h5>
                                :
                                this.state.injectionTimeCheck === "everything_else" ?
                                    null
                                :
                                    null
                                }

                                {/*conditional injection time inputs:*/}

                                {this.state.injectionTimeCheck === "defective_correction" ?
                                    <input id="issueCorrDescriptInput" autoComplete="off"
                                       value={this.state.nameOfDFc}
                                        onChange={(e) => {
                                            this.setState({
                                                nameOfDFc: e.target.value,
                                                featureId: "",
                                                revisionDate: null
                                            })
                                        }}
                                    >
                                    </input>
                                :
                                this.state.injectionTimeCheck === "new_feature" ?
                                    <input id="issueNewFeatureInput" autoComplete="off"
                                       value={this.state.featureId}
                                        onChange={(e) => {
                                            this.setState({
                                                featureId: e.target.value,
                                                nameOfDFc: "",
                                                revisionDate: null
                                            })
                                        }}
                                    >
                                    </input>
                                :
                                this.state.injectionTimeCheck === "legacy_code" ?
                                    <DatePicker className="textAreaInput" id="issueLegacyCodeDate" placeholder="Type and select a date"
                                        onChange={(date) => {
                                            this.setState({
                                                revisionDate: moment.utc(date).format().toString(),
                                                nameOfDFc: "",
                                                featureID: "",
                                            })
                                        }}
                                        style={{
                                            height: "57%",
                                            padding: "5px 10px",
                                            marginTop: "5px",
                                            marginBottom: "15px",
                                        }}
                                        >

                                    </DatePicker>
                                :
                                this.state.injectionTimeCheck === "everything_else" ?
                                    null
                                :
                                    null
                                }

                            </div>


                            {/*Injection time - right column in the RcaAndEdaInfoForm  */}

                            <h5 id="headerSevenRight">
                                Fetched - Injection time:
                                <Tooltip color={"rgb(18,65,145)"} title="Fetched data related to injection time">
                                    <InfoCircleOutlined className="infoIcon"/>
                                </Tooltip>
                            </h5>
                            <div id="injectionTime" className="formItem">
                                {this.state.injTimeAdditionalRows === true ?
                                    <TextArea className="textAreaInput" id="injTimeText"
                                              value={this.state.injectionTimeFetched} disabled={true} rows={9}/>
                                    :
                                    <TextArea className="textAreaInput" id="injTimeText"
                                              value={this.state.injectionTimeFetched} disabled={true} rows={6}/>
                                }
                            </div>


                            {/*Empty space after Injection Time that spans two rows - right column in the RcaAndEdaInfoForm  */}

                            <div id="emptySpace2">

                            </div>

                            {/*--------------------------------------------------------------*/}

                            <h5 id="headerEightLeft" style={{color: "black"}}>
                                7. Additional facts:
                                <Tooltip color={"rgb(18,65,145)"} title="Was the issue corrected in another branch and not propagated to the branch where the issue was detected and reported by Customer?
                                Any other facts worth to be mentioned If case of a doubt (should be mentioned or not) – please do add the information
                                ">
                                    <InfoCircleOutlined className="infoIcon"/>
                                </Tooltip>
                            </h5>
                            <div id="leftEight" className="formItem">
                                <div className="textAreaBorder">
                                    <TextArea value={this.state.textArea8} onChange={(e) => {
                                        this.textAreaOnClickStateChange("textArea8", e.target.value)
                                    }}
                                        id="textAreaInput8" className="textAreaInput" rows={8}/>
                                </div>
                            </div>

                            <h5 id="headerNineLeft" style={{color: "black"}}>
                                8. Inheritance recommendation:
                                <Tooltip color={"rgb(18,65,145)"} title="Should the issue be requested for propagation in maintenance branches?
                                Guidenace is to request inheritance for issues which might lead to an outage (e.g. rolling reboot, sleeping cell, site unavailability, site visit is needed to repair after the fault occurence and etc)
                                ">
                                    <InfoCircleOutlined className="infoIcon"/>
                                </Tooltip>
                            </h5>
                            <div id="leftNine" className="formItem">
                                <div className="textAreaBorder">
                                    <TextArea value={this.state.textArea9} onChange={(e) => {
                                        this.textAreaOnClickStateChange("textArea9", e.target.value)
                                    }}
                                        id="textAreaInput9" className="textAreaInput" rows={8}/>
                                </div>
                            </div>

                            <h5 id="headerTenLeft" style={{color: this.state.error_flag10 ? "red" : "black"}}>
                                <StarOutlined className="star" /> 9. How many times R&D requested for symptoms/logs recollection?:
                                <Tooltip color={"rgb(18,65,145)"}
                                         title="Insert as a number the amount of times R&D requested for Symptoms/Logs Recollection!">
                                    <InfoCircleOutlined className="infoIcon"/>
                                </Tooltip>
                            </h5>
                            <div id="leftTen" className="formItem">
                                <div className="textInputBorder">
                                    <InputNumber value={this.state.numberInput10} onChange={(value) => {
                                        this.textAreaOnClickStateChange("numberInput10", value)
                                    }}
                                         onBlur={() => {
                                             this.alertColorChange("error_flag10", "numberInput10")
                                         }}
                                         id="numberInput10" className="numberInput"
                                         defaultValue={""}
                                         formatter={value => {if(value !== undefined && value !== null && value !== "") {
                                                this.setState({error_flag10: false});
                                                return Number(value);
                                            }
                                             else {
                                                 this.setState({error_flag10: true});
                                                 return "";
                                            }
                                         }}
                                    />
                                </div>
                            </div>

                            {/*How many times R&D requested for Symptoms/Logs recollection - right column in the RcaAndEdaInfoForm  */}

                            <h5 id="headerTenRight">
                                Fetched - How many times R&D requested for symptoms/logs recollection?:
                                <Tooltip color={"rgb(18,65,145)"}
                                         title="Fetched data related to how many time R&D requested for symptoms/logs recollection">
                                    <InfoCircleOutlined className="infoIcon"/>
                                </Tooltip>
                            </h5>
                            <div id="howManyTimes" className="formItem">
                                <Input className="textAreaInput" id="howManyTimesText" value={this.state.howManyTimes}
                                       disabled={true}/>
                            </div>


                            {/*--------------------------------------------------------------*/}
                            <h5 id="headerElevenLeft"
                                style={{
                                    color: this.state.error_flag11 ? (!this.state.quality_reviewer || this.state.quality_reviewer===undefined) ? "red" : "black" : "black"
                                }}>
                                <StarOutlined className="star" /> 10. Quality reviewer:
                                <Tooltip color={"rgb(18,65,145)"}
                                         title="Start writing someone's name in order to choose that person to hold a role of a Quality reviewer of this 5Why form!">
                                    <InfoCircleOutlined className="infoIcon"/>
                                </Tooltip>
                            </h5>
                            <div id="leftEleven" className="formItem">
                                <UserSelect
                                    id="qualityReviewerDropDownMenu1"
                                    className="dropDownMenu"
                                    placeholder={"Select quality reviewer"}
                                    onBlur={() => {
                                        this.alertColorChange("error_flag11", "qualityReviewerDropDownMenu1")
                                    }}
                                    allowClear
                                    onClear={() => {
                                        this.setState({
                                            quality_reviewer: null
                                        })
                                    }}
                                    onChange={(newValue) => {
                                        this.setState({
                                            quality_reviewer: newValue,
                                            error_flag11: newValue ? false : true
                                        });
                                    }}
                                />
                            </div>

                            {/*--------------------------------------------------------------*/}

                            {this.state.faultAnalysisNotFetchedFormSubmitError ?
                                <div className="submitErrorMessage">
                                    You need to fetch fault analysis data first before you submit the form. Please enter
                                    Pronto ID or fault analysis ID in proper fields!!!
                                </div>

                                :

                                null
                            }

                            {this.state.inputError ?
                                <div className="submitErrorMessage">
                                    Please fill up all the required fields that are colored in red!!!
                                </div>

                                :

                                null
                            }

                            {this.state.submitError ?
                                <div className="submitErrorMessage">
                                    {this.state.submitErrorMessage}
                                </div>

                                :

                                null
                            }


                            <div id="createBtnFormItem">
                                <Button
                                    id={this.state.loading || this.state.faultAnalysisAlreadyExists || this.state.submitClicked ?
                                    "createButtonDisabled" : "createButton"}
                                    type="primary" htmlType="submit"
                                    disabled={this.state.loading || this.state.faultAnalysisAlreadyExists || this.state.submitClicked}>
                                    <div>
                                        Create 5Why form
                                    </div>
                                </Button>
                            </div>



                        </Form>
                    </div>
                </div>
            </div>
        )
    }


}

export default NewRcaAndEdaInfoForm;
