import React from "react";
import "../../css/KanbanBoard.css";

const Column = ({ isOver, children }) => {
    const className = isOver ? " highlight-region" : "";

    return (
        <div className={`col${className}`}>
            {children}
        </div>
    );
};

export default Column;