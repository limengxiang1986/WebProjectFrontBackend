import React from "react";
import {formatDateTimeOnlyDate} from "../../../CommonComponents/Utils";


export const actions = (nodeDatum) => {
    return (
        <div className="actionsDiv">
            <div className="label">Action proposal:</div>
            <div className="dataText">
                <span>{nodeDatum.action_proposal}</span>
            </div>

            <div className="label">Cause category:</div>
            <div className="dataText">
                <span>{nodeDatum.cause_category}</span>
            </div>

            <div className="label">Cause subcategory:</div>
            <div className="dataText">
                <span>{nodeDatum.cause_subcategory}</span>
            </div>

            <div className="label">Action type:</div>
            <div className="dataText">
                <span>{nodeDatum.action_type}</span>
            </div>

            <div className="label">Assigned to:</div>
            <div className="dataText">
                <span>{nodeDatum.assigned_to}</span>
            </div>

            <div className="label">AI ID:</div>
            <div className="dataText">
                <span>{nodeDatum.ai_id}</span>
            </div>

            <div className="label">Completion target date:</div>
            <div className="dataText">
                <span>{formatDateTimeOnlyDate(nodeDatum.completion_target_date_string)}</span>
            </div>
        </div>
    )
}
