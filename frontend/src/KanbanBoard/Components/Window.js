import React from "react";
import Modal from "react-modal";
import "../../css/KanbanBoard.css";
import {formatDateTime} from "../../CommonComponents/Utils";



const Window = ({show, onClose, item}) => {
    return (
        <div>
            <Modal
                appElement={document.getElementById("kanbanBoardDivId")}
                isOpen={show}
                onRequestClose={onClose}
                className={"item-details-modal"}
                overlayClassName={"overlay"}
            >
                <div className={"close-btn-ctn"}>
                    <h2 style={{flex: "1 90%", textAlign: "center"}}>{item.summary} ({item.key})</h2>
                    <button className="close-btn" onClick={onClose}>X</button>
                </div>
                <div className={"item-details"}>
                    <div id="left">
                        <div className="modalItemBig">
                            <h3>Description</h3>
                            <p>{item.description}</p>
                        </div>

                        <div>
                            <h3>Priority</h3>
                            <p>{item.priority}</p>
                        </div>

                        <div>
                            <h3>Status</h3>
                            <p>{item.icon} {`${item.originalStatus.charAt(0).toUpperCase()}${item.originalStatus.slice(1)}`}</p>
                        </div>

                        <div className="assignee">
                            <h3>Assignee</h3>
                            <p>{item.assignee ? item.assignee["label"] : ""}</p>
                            <p>Team:&nbsp;&nbsp;{item.assignee ? item.assignee["squad_group"] : ""}</p>
                            <p>Tribe:&nbsp;&nbsp;{item.assignee ? item.assignee["tribe"] : ""}</p>
                        </div>
                    </div>
                    <div id="right">
                        <div>
                            <h3>Pronto ID</h3>
                            {item.pronto_ids ? item.pronto_ids.map(x =>
                                    x.indexOf("http") >= 0 ?
                                        null
                                        :
                                        <a
                                            key={x}
                                            href={"https://pronto.int.net.nokia.com/pronto/problemReport.html?prid="+x}
                                            target="_blank"
                                            rel="noreferrer"
                                        >{x}</a>
                            ) : null}
                        </div>
                        <div>
                            <h3>Created at</h3>
                            <p>{formatDateTime(item.created_at)}</p>
                        </div>

                        <div>
                            <h3>Last updated at</h3>
                            <p>{formatDateTime(item.last_updated_at)}</p>
                        </div>

                        <div>
                        <h3>Done at</h3>
                        <p>{formatDateTime(item.done_at)}</p>
                        </div>

                        <div className="assignee">
                            <h3>Reporter</h3>
                            <p>{item.reporter ? item.reporter["label"] : ""}</p>
                            <p>Team:&nbsp;&nbsp;{item.reporter ? item.reporter["squad_group"] : ""}</p>
                            <p>Tribe:&nbsp;&nbsp;{item.reporter ? item.reporter["tribe"] : ""}</p>
                        </div>

                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Window;