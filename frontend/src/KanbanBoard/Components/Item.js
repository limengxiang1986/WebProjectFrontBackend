import React, { Fragment, useState, useRef } from "react";
//import { useDrag, useDrop } from "react-dnd";
import Window from "./Window";
import { useHistory } from "react-router";
import EditOutlined from "@ant-design/icons/EditOutlined";
import EyeFilled from '@ant-design/icons/EyeFilled';
import "../../css/KanbanBoard.css";


//const ITEM_TYPE = "ITEM";


const Item = ({ item, index, moveItem, status }) => {
    const ref = useRef(null);
    const history = useHistory();

    // const [, drop] = useDrop({
    //     accept: ITEM_TYPE,
    //     hover(item, monitor) {
    //         if (!ref.current) {
    //             return
    //         }
    //         const dragIndex = item.index;
    //         const hoverIndex = index;
    //
    //         if (dragIndex === hoverIndex) {
    //             return
    //         }
    //
    //         const hoveredRect = ref.current.getBoundingClientRect();
    //         const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
    //         const mousePosition = monitor.getClientOffset();
    //         const hoverClientY = mousePosition.y - hoveredRect.top;
    //
    //         if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
    //             return;
    //         }
    //
    //         if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    //             return;
    //         }
    //         moveItem(dragIndex, hoverIndex);
    //         item.index = hoverIndex;
    //     },
    // });
    //
    // const [{ isDragging }, drag] = useDrag({
    //     item: { type: ITEM_TYPE, ...item, index },
    //     collect: monitor => ({
    //         isDragging: monitor.isDragging()
    //     })
    // });

    const [show, setShow] = useState(false);

    const onOpen = () => setShow(true);

    const onClose = () => setShow(false);

    // drag(drop(ref));

    return (
        <Fragment>
            <div
                ref={ref}
                // style={{ opacity: isDragging ? 0 : 1 }}
                className="item"
                onClick={onOpen}
            >
                <div className="item-title-div">
                    <div className="color-bar" style={{ backgroundColor: status.color }}/>
                    <div className="title">
                        <a href={"https://jiradc.ext.net.nokia.com/browse/"+item.key}
                            target="_blank"
                            onClick={ () => {
                                setTimeout(()=> {onClose()}, 500)}
                            }
                            className="jiraLink"
                            rel="noreferrer"
                        >
                            {item.key}
                        </a>
                    </div>
                    <div className="buttonToTool">
                        <button
                            disabled={item.internal_case_id === null}
                            onClick={(e) => {
                                e.stopPropagation();
                                history.push({
                                    pathname: "/List5Why/RcaEdaOverview/" + item.internal_case_id,
                                        state: {
                                            editable: item.assignee ? localStorage.username === item.assignee["value"] ? true : false : false
                                        }
                                    });
                                history.go();
                            }}
                        >
                            {item.internal_case_id ? item.internal_case_id : "5WHY tool"}
                            {item.assignee ? localStorage.username === item.assignee["value"] ? <EditOutlined/> : <EyeFilled style={{paddingLeft: "3px"}}/> : <EyeFilled style={{paddingLeft: "3px"}}/>}
                        </button>
                    </div>
                </div>
                <div className="typeLinkPanel">
                    <p style={{
                        gridColumn: 1,
                        fontWeight: 500
                    }}>{item.issue_type}</p>
                    <div style={{
                        gridColumn: 2,
                        textAlign: "right"
                    }}>
                        <form action={item.sharepoint_link ? item.sharepoint_link : null} method="POST" target="_blank">
                            <button
                                type="submit"
                                disabled={item.sharepoint_link == null}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                Excel<EditOutlined/>
                            </button>
                        </form>
                    </div>
                </div>

                <p className={"item-description"}>{item.summary}</p>
                {/*<p className={"item-status"}>{item.icon}</p>*/}
            </div>
            <Window
                item={item}
                onClose={onClose}
                show={show}
            />
        </Fragment>
    );
};

export default Item;