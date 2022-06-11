import React, {useCallback, useEffect, useRef, useState} from "react";
import axios from "../../axios/axios";
import WhyTree from "./WhyTree/WhyTree";
import {Button} from 'antd';
import {Ring} from "react-spinners-css";
import CollapseComponent from "./CollapseComponent";
import GeneralOverview from "./GeneralOverview";
import RootCauseTable from "./RootCauseTable";
import SwitchSelector from "react-switch-selector";
import {Prompt} from "react-router-dom";
import $ from 'jquery';
import "../../css/overview/Overview.css";
import {getNumberOfRowsIn5WhyTree} from "./WhyTree/WhyTreeCommonFunctions";


function Overview(props) {

    const caseNumber = props.match.params["caseNumber"];
    const [isOpen, setIsOpen] = useState({
        general: false,
        summary: false,
        rcaEda: true
    });
    const [isExpandedAll, setIsExpandedAll] = useState(false);
    const [unsavedChangesFlag, setUnsavedChangesFlag] = useState({
        general: false,
        tree: false
    });
    const [data, setData] = useState(undefined);
    const [editMode, setEditMode] = useState(props.location.state ? props.location.state["edit_mode"] : false);

    const [summaryTableKey, setSummaryTableKey] = useState(1000);
    const [whyTreeKey, setWhyTreeKey] = useState(5000);
    const [whyTree, setWhyTree] = useState({
        currentData: null,
        currentStatus: null,
        boxHeight: 3420,
        translateHeight: 1635,

    });

    const reSectionRef = useRef();


    const getData = useCallback(() => {
        const url = '/rcaeda/' + caseNumber;
        axios.get(url, {
            headers: {'Authorization': `Token ${localStorage.token}`},
        }).then(response => {
            if (response.status === 200) {
                setData(response.data);
            } else {
                setData(null);
            }
        }).catch(error => {
            setData(null);
        });
    }, [caseNumber]);

    useEffect(() => {
        if (data === undefined) {
            getData();
        }

        if (Object.values(unsavedChangesFlag).includes(true)) {
            window.addEventListener('beforeunload', alertUser);
        } else {
            window.removeEventListener('beforeunload', alertUser);
        }
        return () => {
            window.removeEventListener('beforeunload', alertUser)
        }
    }, [data, getData, unsavedChangesFlag]);

    const alertUser = e => {
        e.preventDefault()
        e.returnValue = "";
    }

    const updateGeneralUnsavedChangesFlag = (newFlag) => {
        setUnsavedChangesFlag({
            ...unsavedChangesFlag,
            general: newFlag
        });
    }

    const updateTreeUnsavedChangesFlag = (newFlag) => {
        setUnsavedChangesFlag({
            ...unsavedChangesFlag,
            tree: newFlag
        });
    }

    const toggleGeneral = () => {
        const newIsOpen = {
            ...isOpen,
            general: !isOpen.general
        }
        setIsOpen(newIsOpen);
        checkToggleStatus(newIsOpen);
    }

    const toggleRcaEda = () => {
        const newIsOpen = {
            ...isOpen,
            rcaEda: !isOpen.rcaEda
        }
        setIsOpen(newIsOpen);
        checkToggleStatus(newIsOpen);

        setTimeout(() => {
            if(newIsOpen.rcaEda && reSectionRef.current) {
                reSectionRef.current.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }, 500);
    }

    const toggleSummary = () => {
        const newIsOpen = {
            ...isOpen,
            summary: !isOpen.summary
        }
        setIsOpen(newIsOpen);
        checkToggleStatus(newIsOpen);
    }

    const toggleAll = () => {
        let newState = !isExpandedAll;
        setIsOpen({
            general: newState,
            rcaEda: newState,
            summary: newState
        });
        setIsExpandedAll(newState);
    }

    const checkToggleStatus = (newIsOpen) => {
        setIsExpandedAll(Object.values(newIsOpen).every(value => value));
    }

    const toggleViewEditMode = () => {
        setEditMode(!editMode);
    }

    const updateChangesFromGeneralOverview = (newData) => {
        for (const [key, value] of Object.entries(data)) {
            if(!newData.hasOwnProperty(key)) {
                newData[key] = value;
            }
        }
        setData(newData);
    }

    const refreshSummaryTable = (dbData, setIsBtnDisabled) => {
        setIsBtnDisabled(true);
        setTimeout(() => {
            getData();
            if (dbData !== data) {
                setSummaryTableKey(summaryTableKey-1);
            }
            setIsBtnDisabled(false);
        }, 1500,)
    }

    const changeSummaryTableKey = () => {
        getData();
        setSummaryTableKey(summaryTableKey-1);
    }

    const changeWhyTreeKey = () => {
        setWhyTreeKey(whyTreeKey+1);
    }

    const alignWhyTreeWithCurrentData = (data, status, whyTreeHeight, zoomLevel) => {

        let tree_height = 0
        let translate_height = 0

       if(data) {
           let names = $('[class*=rd3t-g-]').attr('class').split(' ');
           let className;
           $.each(names, function () {
               if (this.toLowerCase().indexOf("rd3t-g-") >= 0)
                   className = this;
           })

           let rd3t_g_elementList = document.getElementsByClassName(className);

           tree_height = rd3t_g_elementList[0].getBoundingClientRect().height;
           tree_height = (tree_height * (1 / zoomLevel)) * 0.38

           translate_height = tree_height / 2

           if (data.children) {
               let numberOfRowsInFirstBranch = getNumberOfRowsIn5WhyTree(data.children[0])
               let numberOfRowsInLastBranch = getNumberOfRowsIn5WhyTree(data.children[10])

               let diff = numberOfRowsInFirstBranch - numberOfRowsInLastBranch

               translate_height = translate_height + (diff * 77.5) - 50
           }
       }


        changeWhyTreeKey();
        setWhyTree({
            ...whyTree,
            currentData: data,
            currentStatus: status,
            boxHeight: tree_height + 125,
            translateHeight: translate_height - 20,
        });
    }



    let content;

    if (data !== undefined && data === null) {
        content =
            <div className="loadingMessage">
                <p>Error data fetching</p>
                <p>Please check if the internal case ID <span style={{fontStyle: "italic", fontWeight: 500}}>{caseNumber}</span> is correct</p>
            </div>;
    } else if (data && data.hasOwnProperty("case_number") && data["case_number"] === caseNumber) {
        content = <div className={"collapses"}>
            <CollapseComponent
                isOpen={isOpen.general}
                onToggle={() => toggleGeneral()}
                firstHeading="Initial RCA/EDA information form"
            >
                <div className={"CollapseDiv"}>
                    <GeneralOverview data={data} edit_mode={editMode}
                                     updateOverviewProps={updateChangesFromGeneralOverview}
                                     updateOverviewUnsavedChangesFlag={updateGeneralUnsavedChangesFlag}
                    />
                </div>
            </CollapseComponent>

            <CollapseComponent
                isOpen={isOpen.summary}
                onToggle={() => toggleSummary()}
                firstHeading="Root cause summary"
            >
                <div className={"CollapseDiv"}>
                    <RootCauseTable key={summaryTableKey}
                                    refreshSummaryTable={refreshSummaryTable}
                                    data={data}
                    />
                </div>
            </CollapseComponent>

            <CollapseComponent
                isOpen={isOpen.rcaEda}
                onToggle={() => toggleRcaEda()}
                firstHeading="RCA / EDA analysis"
            >
                <div className={"CollapseDiv"}
                     ref={reSectionRef}
                >
                    <WhyTree key={whyTreeKey}
                             changeWhyTreeKey={changeWhyTreeKey}
                             whyTreeBoxHeight={whyTree.boxHeight}
                             whyTreeTranslateHeight={whyTree.translateHeight}
                             editMode={editMode}
                             caseNumber={caseNumber}
                             alignWhyTreeWithCurrentData={alignWhyTreeWithCurrentData}
                             currentData={whyTree.currentData}
                             currentStatus={whyTree.currentStatus}
                             refreshSummaryTable={changeSummaryTableKey}
                             updateOverviewUnsavedChangesFlag={updateTreeUnsavedChangesFlag}
                    />
                </div>
            </CollapseComponent>

        </div>;
    } else {
        content =
            <div className="loadingMessage">
                <p>Loading...</p>
                <Ring size="80" color="grey" style={{position: "fixed", left: "48%", top: "40%", transform: "translate(-50%, -50%)" }}/>
            </div>;
    }

    return (
        <div className="overViewDiv">
            <div className="header">
                <div id="header_caseNumber">
                    <span className="caseNumber">{caseNumber}</span>
                    { data && "jira_keys" in data && Array.isArray(data["jira_keys"])?
                        <a
                           target="_blank"
                           href={"https://jiradc.ext.net.nokia.com/browse/" + data["jira_keys"][0] + "?jql=labels%20%3D%20" + caseNumber + "%20AND%20labels%20%3D%205WhyTool"}
                           rel="noreferrer">
                            <span className="caseNumber" style={{marginLeft: "30px"}}>JIRA tasks</span>
                        </a>
                        : null
                    }
                </div>
                <div className="switchSelectorWrapper" id="header_switch">
                    <SwitchSelector
                        disabled={!data || (editMode && Object.values(unsavedChangesFlag).includes(true))}
                        onChange={() => toggleViewEditMode()}
                        options={[
                           {
                               label: "View mode",
                               value: "view_mode",
                               selectedBackgroundColor: "#3f66ff",
                           },
                           {
                               label: "Edit mode",
                               value: "edit_mode",
                               selectedBackgroundColor: "#ffa908"
                           }
                        ]}
                        initialSelectedIndex={editMode ? 1 : 0}
                        backgroundColor="#f5f5f5"
                        fontColor="#000000"
                        fontSize="20"
                    />
                </div>
                {editMode ?
                    <div className="unsavedChangesInfo">

                        {Object.values(unsavedChangesFlag).includes(true) ?
                            <div className="unsaved">
                                Unsaved changes
                                <div className="sections">
                                    {Object.entries(unsavedChangesFlag).map(([key, value]) => value ? <span key={key}>{key}</span> : null)}
                                </div>
                            </div>
                            : <div className="saved">All saved</div>}
                    </div>
                    : <div/>
                }
                <div>
                    <Button
                        className="ExpandCollapseButton"
                        id="ExpandCollapseButton"
                        onClick={e => toggleAll()}
                        disabled={!data}
                    >
                        {isExpandedAll ? "Collapse all" : "Expand all"}
                    </Button>
                </div>
            </div>

            {content}

            <Prompt
                when={Object.values(unsavedChangesFlag).includes(true)}
                message="You have unsaved changes, are you sure you want to leave?"
            />
        </div>
    );



}

export default Overview;