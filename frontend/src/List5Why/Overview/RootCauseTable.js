import React, {useState} from "react";
import { useTable } from "react-table";
import {formatDateTimeOnlyDate} from "../../CommonComponents/Utils";
import {Ring} from "react-spinners-css";
import RedoOutlined from "@ant-design/icons/RedoOutlined";
import DownloadOutlined from "@ant-design/icons/DownloadOutlined";

import "../../css/overview/RootCauseTable.css";
import axios from "../../axios/axios";


function Table({id, columns, data, props}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    });

    return (
        <>
            <div className={"tableDivSummary"}>
                <table id={id} {...getTableProps()}>
                    <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps([{
                                    style: {
                                        minWidth: column.minWidth,
                                        width: column.width,
                                        maxWidth: column.maxWidth,
                                    },
                                }])}
                                >
                                    {column.render('Header')}
                                </th>))}
                        </tr>
                    ))}
                    </thead>

                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                          prepareRow(row)
                          return (
                            <tr {...row.getRowProps()}>
                              {row.cells.map(cell => {
                                return (
                                    <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                )
                              })}
                            </tr>
                          )
                        })}
                    </tbody>
                </table>
             </div>
        </>
    )
}


function findRootCauseForWhyRecursive(children) {
    let rootCauses = [];
    let childrenLength = children ? children.length : -1;
    for(let i = 0; i < childrenLength; i++) {
        let obj = children[i];
        if(obj["root_cause"] && obj["root_cause"].length > 0) {
            for(let r_id = 0; r_id < obj["root_cause"].length; r_id++) {
                let statement = obj["root_cause"][r_id]["statement"];
                let actions = obj["root_cause"][r_id]["actions"];
                if (actions) {
                    for (let action_id in actions) {
                        let action = actions[action_id];
                        rootCauses.push({
                            statement: statement,
                            action_proposal: action["action_proposal"],
                            cause_category: action["cause_category"],
                            cause_subcategory: action["cause_subcategory"],
                            action_type: action["action_type"],
                            assignee: action["assigned_to"] ? action["assigned_to"]["label"] : "",
                            ai_id: action["ai_id"],
                            completion_target_date: formatDateTimeOnlyDate(action["completion_target_date"])
                        });
                    }
                } else {
                    rootCauses.push({
                        statement: statement
                    });
                }
            }
        }
        else if (obj["root_cause"]) {
            let statement = obj["root_cause"]["statement"];
            let actions = obj["root_cause"]["actions"];
            if (actions) {
                for (let action_id in actions) {
                    let action = actions[action_id];
                    rootCauses.push({
                        statement: statement,
                        action_proposal: action["action_proposal"],
                        cause_category: action["cause_category"],
                        cause_subcategory: action["cause_subcategory"],
                        action_type: action["action_type"],
                        assignee: action["assigned_to"] ? action["assigned_to"]["label"] : "",
                        ai_id: action["ai_id"],
                        completion_target_date: formatDateTimeOnlyDate(action["completion_target_date"])
                    });
                }
            } else {
                rootCauses.push({
                    statement: statement
                });
            }

        }
        else {
            rootCauses.push(obj["root_cause"]);
        }
        if (obj["children"].length > 0) {
            rootCauses.push(...findRootCauseForWhyRecursive(obj["children"]));
        }
    }

    rootCauses = rootCauses.filter(function(r) {
        if(Array.isArray(r)) {
            return r.length;
        }
        return r;
    });

    return rootCauses;
}

function findAllRootCausesToArray(children, question, formType) {
    children = children ? children["children"] : children;
    let rootCauses = findRootCauseForWhyRecursive(children);

    rootCauses = rootCauses.map(x => ({
        ...x,
        question: question,
        form_type: formType
    }));
    if(rootCauses.length < 1) {
        rootCauses.push({
            question: question,
            form_type: formType,
            statement: "",
            actions: []
        });
    }

    return rootCauses;
}

function findAllRootCausesForRca(dbData) {
    let data = [];
    if(dbData.hasOwnProperty("rca_fault_introduced"))
        data.push(...findAllRootCausesToArray(dbData["rca_fault_introduced"], "Why was the fault introduced?", "RCA"));

    if(dbData.hasOwnProperty("rca_not_found_on_review"))
        data.push(...findAllRootCausesToArray(dbData["rca_not_found_on_review"], "Why root cause was not found (on review) with first set of attached symptoms?", "RCA"));

    return data;
}

function findAllRootCausesForEda(dbData) {
    let data = [];

    if(dbData.hasOwnProperty("eda_requirements_reviews"))
        data.push(...findAllRootCausesToArray(dbData["eda_requirements_reviews"], "Why didn't requirements reviews catch this defect?", "EDA"));

    if(dbData.hasOwnProperty("eda_design_reviews"))
        data.push(...findAllRootCausesToArray(dbData["eda_design_reviews"], "Why didn't design reviews catch this defect?", "EDA"));

    if(dbData.hasOwnProperty("eda_code_analysis_tools"))
        data.push(...findAllRootCausesToArray(dbData["eda_code_analysis_tools"], "Why didn't code analysis tools such as Klocwork, Purify, etc catch this defect?", "EDA"));

    if(dbData.hasOwnProperty("eda_code_inspections"))
        data.push(...findAllRootCausesToArray(dbData["eda_code_inspections"], "Why didn't code inspections catch this defect?", "EDA"));

    if(dbData.hasOwnProperty("eda_unit_component_test"))
        data.push(...findAllRootCausesToArray(dbData["eda_unit_component_test"], "Why didn't unit or component test catch this defect?", "EDA"));

    if(dbData.hasOwnProperty("eda_entity_test"))
        data.push(...findAllRootCausesToArray(dbData["eda_entity_test"], "Why didn't entity test catch this defect?", "EDA"));

    if(dbData.hasOwnProperty("eda_et_automated_test"))
        data.push(...findAllRootCausesToArray(dbData["eda_et_automated_test"], "Why didn't ET automated test cases catch this defect?", "EDA"));

    if(dbData.hasOwnProperty("eda_system_test"))
        data.push(...findAllRootCausesToArray(dbData["eda_system_test"], "Why didn't system test catch this defect?", "EDA"));

    if(dbData.hasOwnProperty("eda_st_automated_test"))
        data.push(...findAllRootCausesToArray(dbData["eda_st_automated_test"], "Why didn't ST automated test cases catch this defect?", "EDA"));

    return data;
}

function CellJiraKey(cellProps) {
    const value = cellProps.value;
    return(
        <a
            key={value}
            target="_blank"
            style={{
                fontWeight: "500"
            }}
            rel="noreferrer"
            href={"https://jiradc.ext.net.nokia.com/browse/"+value}
        >
            {cellProps.value}
        </a>
    )
}

function RootCauseTable(props) {
    const [dbData, setDbData] = useState(null);
    const [rcaTableData, setRcaTableData] = useState(null);
    const [edaTableData, setEdaTableData] = useState(null);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);



    React.useEffect(() => {
        if(props.data !== dbData) {
            setDbData(props.data);
            setRcaTableData(findAllRootCausesForRca(props.data));
            setEdaTableData(findAllRootCausesForEda(props.data));
        }
    }, [dbData, props.data]);



    const columns = React.useMemo(
        () => [
            {
                Header: "Question",
                headerClassName: "react-table-wordwrap",
                accessor: "question",
            },
            {
                Header: "Root cause",
                headerClassName: "react-table-wordwrap",
                accessor: "statement",
            },
            {
                Header: "Action proposal",
                headerClassName: "react-table-wordwrap",
                accessor: "action_proposal",
            },
            {
                Header: "Cause category",
                headerClassName: "react-table-wordwrap",
                accessor: "cause_category",
            },
            {
                Header: "Cause subcategory",
                headerClassName: "react-table-wordwrap",
                accessor: "cause_subcategory",
            },
            {
                Header: "Action type",
                headerClassName: "react-table-wordwrap",
                accessor: "action_type",
            },
            {
                Header: "Assignee",
                headerClassName: "react-table-wordwrap",
                accessor: "assignee",
            },
            {
                Header: "AI ID",
                headerClassName: "react-table-wordwrap",
                accessor: "ai_id",
                Cell: CellJiraKey,
            },
            {
                Header: "Completion target date",
                headerClassName: "react-table-wordwrap",
                accessor: "completion_target_date",
            }
        ],
        []
    );



    const refreshButton = () => {
        return (
            <button className={isBtnDisabled ? "refreshSummaryButtonDisabled" :
                "refreshSummaryButton"}
                    disabled={isBtnDisabled}
                    title="Refresh tables"
                    onClick={() => {
                        props.refreshSummaryTable(dbData, setIsBtnDisabled);
                    }}>
                <RedoOutlined style={{fontSize: "22px"}}/>
            </button>
        )
    }

    const downloadButton = () => {
        return (
            <button className="downloadButton"
                    onClick={() => {
                        const url = '/rcaeda/summary/' + dbData.case_number;
                        axios.get(url, {
                            headers: {'Authorization': `Token ${localStorage.token}`},
                            responseType: "blob",
                        }).then(response => {
                            const url = window.URL.createObjectURL(new Blob([response.data]));
                            const link = document.createElement("a");
                            link.href = url;
                            link.setAttribute("download", dbData.case_number + ".xlsx"); //or any other extension
                            document.body.appendChild(link);
                            link.click();
                        });
                    }}>
                Download RCA/EDA summary as Excel file <DownloadOutlined style={{fontSize: "20px"}}/>
            </button>
        )
    }

    if (rcaTableData && edaTableData) {
        return (
            <div key="rootCauseActionTableDiv" className="overviewSummaryTables">
                <div className="overviewSummaryTablesTitle">
                    <div/>
                    <div className="tableTitleP">
                        Root Cause Analysis
                        {refreshButton()}
                    </div>
                    <div>
                        {downloadButton()}
                    </div>
                </div>
                <Table id="rca-summary-table" data={rcaTableData} columns={columns} props={props}/>

                <div className="overviewSummaryTablesTitle">
                    <div/>
                    <div className="tableTitleP">
                        Escape Defect Analysis
                        {refreshButton()}
                    </div>
                </div>
                <Table id="eda-summary-table" data={edaTableData} columns={columns} props={props}/>
            </div>
        );
    }
    else if (edaTableData) {
        return (
            <div key="rootCauseActionTableDiv" className="overviewSummaryTables">
                <div className="overviewSummaryTablesTitle">
                    <div/>
                    <div className="tableTitleP">
                        Root Cause Analysis
                        {refreshButton()}
                    </div>
                    <div>
                        {downloadButton()}
                    </div>
                </div>
                <p className="errorMessage">Unavailable</p>

                <div className="overviewSummaryTablesTitle">
                    <div/>
                    <div className="tableTitleP">
                        Escape Defect Analysis
                        {refreshButton()}
                    </div>
                </div>
                <Table id="eda-summary-table" data={edaTableData} columns={columns} props={props}/>
            </div>
        );
    }
    else if (rcaTableData) {
        return (
            <div key="rootCauseActionTableDiv" className="overviewSummaryTables">
                <div className="overviewSummaryTablesTitle">
                    <div/>
                    <div className="tableTitleP">
                        Root Cause Analysis
                        {refreshButton()}
                    </div>
                    <div>
                        {downloadButton()}
                    </div>
                </div>
                <Table id="rca-summary-table" data={rcaTableData} columns={columns} props={props}/>

                <div className="overviewSummaryTablesTitle">
                    <div/>
                    <div className="tableTitleP">
                        Escape Defect Analysis
                        {refreshButton()}
                    </div>
                </div>
                <p className="errorMessage">Unavailable</p>
            </div>
        );
    }
    else {
        return (
            <div>
                <p className="loadingMessage" style={{margin: 0, padding: 0}}>Loading summary tables</p>
                <Ring size="40" color="grey" style={{left: "48.5%", top: "0%" }}/>
                <br/>
                <p className="loadingMessage"></p>
            </div>
        );
    }

}

export default RootCauseTable;