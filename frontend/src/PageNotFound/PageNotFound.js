import React from "react";
import '../css/PageNotFound.css';


const PageNotFound = () => {
    return (
        <div className="pageNotFoundContainer">
            <div className="pageNotFoundContainerText">
                <h1>
                    <span className="bold">
                        (ERROR 404)
                    </span>
                    <span>
                        Page not found
                    </span>
                    <span>
                        !!!
                    </span>
                </h1>
            </div>
        </div>
    );
};

export default PageNotFound;