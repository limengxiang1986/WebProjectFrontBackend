import React from "react";


class EditionMode extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            userFormData: [],
            data: "",
            header: "",
            popupAdd: false,
            popupRemoveAlert: false,
            popupEdit: false,
            popupAction: false

        }
    }


    render() {
        return (
            <div style={{display: "flex", height: "625px"}}>
                <div style={{float: "left", width: "35%", height: "100%", marginRight: "20px", backgroundColor: "lightgray", padding: "10px"}}>
                    left column
                </div>
                <div style={{float: "left", height: "100%", width: "100%", backgroundColor: "lightgray", padding: "10px"}}>
                    right column
                </div>
            </div>
        );
    }

}

export default EditionMode;