import React, {useEffect, useState} from "react";
import axios from "../axios/axios";
import {message, Modal, Tooltip, DatePicker, Input, Select} from "antd";
import {Ring} from "react-spinners-css";
import {useAsyncDebounce, useFilters, useGlobalFilter, usePagination, useSortBy, useTable} from "react-table";
import { motion, AnimatePresence } from 'framer-motion';
import SwitchSelector from "react-switch-selector";

import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EditFilled from '@ant-design/icons/EditFilled';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import EyeFilled from '@ant-design/icons/EyeFilled';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import SortAscendingOutlined from '@ant-design/icons/SortAscendingOutlined';
import SortDescendingOutlined from '@ant-design/icons/SortDescendingOutlined';
import CaretUpFilled from '@ant-design/icons/CaretUpFilled';
import CaretDownFilled from '@ant-design/icons/CaretDownFilled';
import BackwardOutlined from '@ant-design/icons/BackwardOutlined';
import CaretLeftOutlined from '@ant-design/icons/CaretLeftOutlined';
import CaretRightOutlined from '@ant-design/icons/CaretRightOutlined';
import ForwardOutlined from '@ant-design/icons/ForwardOutlined';

import {formatDateTimeOnlyDate, formatDisplayNameRemoveNokia} from "../CommonComponents/Utils";

import "../css/RcaEdaList.css";


function trim_string_left(str) {
    if(!str) return str;
    return str.replace(/^\s+/g, '');
}


function GlobalFilter({
                          preGlobalFilteredRows,
                          globalFilter,
                          setGlobalFilter
                      }) {
    const count = preGlobalFilteredRows.length;
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 30);

    return (
        <span>
            Search:{' '}
            <Input
                className={"inputFilterGlobal"}
                value={globalFilter || ""}
                onChange={e => {
                    onChange(trim_string_left(e.target.value));
                }}
                placeholder={`${count} records...`}
                allowClear
            />
        </span>
    )
}

function DefaultColumnFilter({
                                 column: {filterValue, preFilteredRows, setFilter},
                             }) {

    return (

        <Input
            className={filterValue ? "inputFilterActive" : "inputFilter"}
            value={filterValue || ''}
            onChange={e => {
                setFilter(trim_string_left(e.target.value) || undefined)
            }}
            allowClear
        />
    )

}

function PickerWithType({ type, onChange, filterValue, setFilter }) {
    let style = {
        backgroundColor: filterValue ? "#00C9FF" : "white"
    };

    let picker = <DatePicker picker={type} placeholder="Select" style={style} onChange={onChange} />;
    if (type === "date") {
        picker = <DatePicker placeholder="Select" style={style}  onChange={onChange} defaultValue={null}/>;
    }
    return picker;
}

function DateDayMonthFilter({
                                 column: {filterValue, preFilteredRows, setFilter},
                             }) {

    const [type, setType] = useState("month");
    return (
        <div
            className="datepicker"
        >
            <div>
                <Select
                    className={filterValue ? "selectFilterActive" : "selectFilter"}
                    value={type}
                    onChange={value => setType(value || "date")}>
                    <Select.Option value="date">Day</Select.Option>
                    <Select.Option value="month">Month</Select.Option>
                    <Select.Option value="year">Year</Select.Option>
                </Select>
            </div>
            <div>
                <PickerWithType
                    type={type}
                    filterValue={filterValue}
                    onChange={(moment, datetime) => {
                        setFilter(datetime || null)
                    }} />
            </div>
        </div>
    )

}

function SelectColumnFilter({
                                column: {filterValue, setFilter, preFilteredRows, id},
                            }) {

    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach(row => {
            options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows])

    return (
        <Select
            className={filterValue ? "selectFilterActive" : "selectFilter"}
            value={filterValue || ""}
            allowClear
            style={{
                width: "100%",
                height: "25px"
                ,padding: "0 !important",
                fontWeight: 500
            }}
            onChange={value => {
                setFilter(value || "")
            }}
        >
            <Select.Option value="">All</Select.Option>
            {options.map((option, i) => (
                <Select.Option key={i} value={option}>
                    {option}
                </Select.Option>
            ))}
        </Select>
    )
}

function CellDate(cellProps) {
    return (
        <div style={{textAlign: "center"}}>
            {formatDateTimeOnlyDate(cellProps.value)}
        </div>);
}

function CellFaultProntoJira(cellProps) {
    let values = cellProps.value;
    let baseUrl = "";

    if (cellProps.row.original.pronto_id === values) {
        baseUrl = "https://pronto.int.net.nokia.com/pronto/problemReport.html?prid=";
    } else if (cellProps.row.original.fault_analysis_id === values) {
        baseUrl = "https://pronto.int.net.nokia.com/pronto/viewFaultAnalysis.html?fID=";
        values = [values];
    } else if (cellProps.row.original.jira_keys === values) {
        baseUrl = "https://jiradc.ext.net.nokia.com/browse/";
    } else {
        return null;
    }

    let hrefs = [];
    for (const i in values) {
        hrefs.push(
            <a
                key={i}
                target="_blank"
                className="links"
                rel="noreferrer"
                href={baseUrl+values[i]}
            >
                {values[i]}
            </a>
        );
    }
    return hrefs;
}

function Table({columns, tableData, setData, props}) {
    const [deletingInProgress, setDeletingInProgress] = useState(false);

    const filterTypes = React.useMemo(
        () => ({
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
                        : true;
                })
            }
        }),
        []
    )

    const defaultColumn = React.useMemo(
        () => ({
            Filter: DefaultColumnFilter,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        // visibleColumns,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
        setAllFilters,
        state: {pageIndex},
    } = useTable({
            columns,
            data: tableData,
            initialState: {
                pageIndex: 0,
                numOfShown: 5,
                pageSize: 10
            },
            filterTypes,
            defaultColumn,
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
    )

    function handleRowClick(row) {
        props.history.push({
            pathname: "/List5Why/RcaEdaOverview/" + row["case_number"],
            state: {
                edit_mode: false
            }
        });
        props.history.go();
    }

    function handleEditRowClick(row) {
        props.history.push({
            pathname: "/List5Why/RcaEdaOverview/" + row["case_number"],
            state: {
                edit_mode: true
            }
        });
        props.history.go();
    }

    function confirmModal(row) {
        Modal.confirm({
            title: "Confirm deletion",
            icon: <ExclamationCircleOutlined/>,
            content: "Are you sure you want to delete " + row["case_number"] + "?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                handleDeleteRowClick(row);
            }
        });
    }

    function handleDeleteRowClick(row) {
        let request_data = {
            deleted: true,
            fault_analysis_id: row["fault_analysis_id"],
            creator_uid: localStorage.username
        }
        let url = "/rcaeda/" + row["case_number"] + "/";

        setDeletingInProgress("Deleting " + row["case_number"] + " in progress...");
        axios.put(url, request_data, {
            headers: {'Authorization': `Token ${localStorage.token}`}
        }).then(response => {
            if (response.status === 200) {
                message.success({
                    content: row["case_number"] + " has been deleted",
                    className: 'statusAlert',
                }, 2);
                let new_data = tableData;
                let index = new_data.indexOf(row);
                if (index >= 0) {
                    new_data.splice(index, 1)
                }
                setData(new_data);
                setDeletingInProgress(null);
                props.history.go();
            }
        }).catch(response => {
            setDeletingInProgress(null);
            message.error({
                content: "Cannot delete " + row["case_number"],
                className: 'statusAlert',
            }, 5);
        });
    }

    const spring = React.useMemo(
        () => ({
            type: 'spring',
            damping: 50,
            stiffness: 100,
        }),
        []
    );

    if (deletingInProgress) {
        return (<div style={{textAlign: "center", marginTop: "120px"}}>
            <p>{deletingInProgress}</p>
            <Ring size="80" color="grey" style={{position: "fixed", left: "48%", top: "30%", transform: "translate(-50%, -50%)" }}/>
        </div>)
    }

    return (
        <>

            <div className="rcaEdaListControlPanel">
                <div id="cp-1">
                    5Why list
                </div>
                <div id="cp-2">
                    <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={state.globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                    <button className="clearAllButton" onClick={() => {
                        setAllFilters([]);
                        setGlobalFilter(undefined);
                    }}>Clear all filters</button>
                </div>
            </div>
            <div className={"tableDiv"}>
                <table {...getTableProps()}>
                    <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <motion.th {...column.getHeaderProps(
                                    [column.getSortByToggleProps({title: "Click to sort by"}), {
                                        layoutTransition: spring
                                    }])}>
                                    <div className="headerDiv">
                                        <div className="title">
                                            {column.render('Header')}
                                        </div>

                                        <div className="sorting">
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? <SortDescendingOutlined />
                                                    : <SortAscendingOutlined />
                                                    : <>
                                                        <CaretUpFilled />
                                                        <CaretDownFilled />
                                                    </>
                                            }
                                        </div>
                                    </div>
                                </motion.th>))}
                        </tr>
                    ))}

                    {headerGroups.map(headerGroup => (

                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th className={"thFilter"} {...column.getHeaderProps([{}])}
                                >
                                    {column.canFilter ? column.render('Filter') : null}
                                </th>))}
                        </tr>
                    ))}

                    </thead>
                    <tbody {...getTableBodyProps()}>
                    <AnimatePresence>
                        {page.map((row, i) => {
                            prepareRow(row)
                            return (
                                <motion.tr key={`row${i}`} {...row.getRowProps({
                                    layoutTransition: spring,
                                    exit: { opacity: 0, maxHeight: 0 },
                                })}>
                                    {row.cells.map(cell => {
                                        if (cell.column.Header === "Internal ID") {
                                            return <motion.td onClick={() => handleRowClick(row.original)}
                                                {...cell.getCellProps({
                                                    layoutTransition: spring,
                                                })}
                                            >
                                            <p style={{fontWeight: 500}}>
                                                {cell.render('Cell')}
                                            </p>
                                                <span style={{
                                                    textAlign: "center"
                                                }}>
                                                    <Tooltip
                                                        className="tdIcon"
                                                        color={"rgb(18,65,145)"}
                                                        title="Click on the row to enter view mode or press icons to choose other options. CASE can be deleted only by its creator">
                                                        <InfoCircleOutlined className="infoIcon"/>
                                                    </Tooltip>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEditRowClick(row.original);
                                                        }}
                                                        style={{color: "orange"}}
                                                    >
                                                        <EditFilled />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleRowClick(row.original);
                                                        }}
                                                        style={{color: "#3f66ff"}}
                                                    >
                                                        <EyeFilled />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            confirmModal(row.original);
                                                        }}
                                                        disabled={row.original["creator"] ? row.original["creator"]["value"] !== localStorage.username : true}
                                                        style={{
                                                            color: (row.original["creator"] ? row.original["creator"]["value"] !== localStorage.username : true) ? "grey" : "red"
                                                        }}
                                                    >
                                                        <DeleteOutlined />
                                                    </button>
                                                </span>
                                            </motion.td>
                                        } else {
                                            return (
                                                <motion.td
                                                    {...row.getRowProps()}
                                                    {...cell.getCellProps({
                                                        layoutTransition: spring,
                                                    })}
                                                >
                                                    {cell.render('Cell')}
                                                </motion.td>);
                                        }
                                    })}
                                </motion.tr>
                            )
                        })}
                    </AnimatePresence>
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <div id="left">
                    <SwitchSelector
                        onChange={(value) => setPageSize(value)}
                        options={[
                            {
                                label: "5",
                                value: "5",
                            },
                            {
                               label: "10",
                               value: "10",
                            },
                            {
                               label: "15",
                               value: "15",
                            },
                            {
                               label: "30",
                               value: "30",
                            },
                            {
                               label: "50",
                               value: "50",
                            },
                            {
                               label: "100",
                               value: "100",
                            }
                        ]}
                        initialSelectedIndex={1}
                        selectedBackgroundColor="#3f66ff"
                        backgroundColor="#F8F8FF"
                        fontColor="black"
                        fontSize="14"
                    />
                </div>
                <div id="center">
                    {pageOptions.length !== 0
                        ? <span>{pageIndex + 1} of {pageOptions.length}</span>
                        : "Nothing found"
                    }
                </div>
                <div id="right">
                    <button className="pButton" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        <BackwardOutlined />
                    </button>
                    <button className="pButton" onClick={() => previousPage()} disabled={!canPreviousPage}>
                        <CaretLeftOutlined />
                    </button>
                    <button className="pButton" onClick={() => nextPage()} disabled={!canNextPage}>
                        <CaretRightOutlined />
                    </button>
                    <button  className="pButton"onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        <ForwardOutlined />
                    </button>
                </div>
            </div>
        </>
    )
}


function RcaEdaList(props) {

    const [data, setData] = useState(props.data);
    const [loadingMessage, setLoadingMessage] = useState(
        <div>
            <p>Loading...</p>
            <Ring size="80" color="grey" style={{position: "fixed", left: "48%", top: "40%", transform: "translate(-50%, -50%)" }}/>
        </div>
    );

    useEffect(() => {
        axios.get("/rcaeda-list", {
            headers: {'Authorization': `Token ${localStorage.token}`},
        }).then(response => {
            if (response.status === 200) {
                setData(response.data.results);
                if (response.data.results.length < 1) {
                    setLoadingMessage(<p>No data to display</p>);
                }
            } else {
                setLoadingMessage(<p>Error loading data</p>);
            }
        }).catch(response => {
            setLoadingMessage(<p>Network error</p>);
        })
    }, []);


    const columns = React.useMemo(
        () => [
            {
                Header: "Internal ID",
                headerClassName: "react-table-wordwrap",
                accessor: "case_number",
            },
            {
                Header: "Status",
                headerClassName: "react-table-wordwrap",
                accessor: "status",
                Filter: SelectColumnFilter,
            },
            {
                Header: "Abstract headline",
                headerClassName: "react-table-wordwrap",
                accessor: "abstract_headline",
            },
            {
                Header: "Product",
                headerClassName: "react-table-wordwrap",
                accessor: "product",
            },
            {
                id: "prontoId",
                Header: "Pronto ID",
                accessor: row => row.pronto_id ? row.pronto_id: "",
                Cell: CellFaultProntoJira,

            },
            {
                Header: "Fault analysis ID",
                headerClassName: "react-table-wordwrap",
                accessor: row => row.fault_analysis_id ? row.fault_analysis_id: "",
                Cell: CellFaultProntoJira,
            },
            {
                id: "jira_keys",
                Header: "Jira keys",
                accessor: row => row.jira_keys ? row.jira_keys: "",
                Cell: CellFaultProntoJira,
            },
            {
                id: "creator",
                Header: "Creator",
                headerClassName: "react-table-wordwrap",
                accessor: row => row.creator ? formatDisplayNameRemoveNokia(row.creator["label"]) : "Unavailable",
            },
            {
                id: "createdAt",
                Header: "Created at",
                headerClassName: "react-table-wordwrap",
                accessor: row => formatDateTimeOnlyDate(row.created_at),
                Filter: DateDayMonthFilter,
                Cell: CellDate,
            },
            {
                id: "lastUpdatedAt",
                Header: "Updated at",
                headerClassName: "react-table-wordwrap",
                accessor: row => formatDateTimeOnlyDate(row.last_updated_at),
                Filter: DateDayMonthFilter,
                Cell: CellDate,
            },
            {
                id: "doneAt",
                Header: "Done at",
                headerClassName: "react-table-wordwrap",
                accessor: row => formatDateTimeOnlyDate(row.done_at),
                Filter: DateDayMonthFilter,
                Cell: CellDate,
            },
            {
                Header: "Issue description",
                headerClassName: "react-table-wordwrap",
                accessor: "issue_description",
            },
            {
                Header: "Triggering scenario category",
                headerClassName: "react-table-wordwrap",
                accessor: "triggering_scenario_category",
                Filter: SelectColumnFilter,
            },
            {
                Header: "Injection type",
                headerClassName: "react-table-wordwrap",
                accessor: row => {return row.injection ? row.injection["type"] : ""},
                Filter: SelectColumnFilter,
            },
            {
                Header: "Injection build",
                headerClassName: "react-table-wordwrap",
                accessor: row => {return row.injection ? row.injection["first_build_containing_issue"] : ""},
            },
            {
                Header: "How many R&D requested",
                headerClassName: "react-table-wordwrap",
                accessor: "how_many_RD_requests",
            }
        ],
        []
    );

    let webContent = [];


    if (data && data.length > 0) {
        webContent.push(<Table key="table0" tableData={data} setData={setData} columns={columns} props={props}/>);
    } else {
        webContent.push(
            <div className="rcaEdaListControlPanel" key="rcaEdaListControlPanel0">
                <div id="cp-1" key="rcaEdaListControlPanel01">
                    5Why list
                </div>
                <div id="cp-2" key="rcaEdaListControlPanel02">
                    Search:{' '}
                    <input
                        className={"inputFilterGlobal"}
                        defaultValue=""
                    />
                </div>
            </div>
        );
        webContent.push(<div className="loadingMessage" key="loadingMessage0">
            {loadingMessage}
        </div>);
    }

    return (
        <div key="historicalDataView" className="reList">
            {webContent}
        </div>
    );
}

export default RcaEdaList;