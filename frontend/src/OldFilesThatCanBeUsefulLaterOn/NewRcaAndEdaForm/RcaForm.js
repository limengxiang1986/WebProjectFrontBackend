import React from "react";
import '../../css/oldFilesThatCanBeUsedLaterOn/RcaForm.css';
import {Button} from "antd";

class RcaForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userFormData: [],
            why_one: "Why was the fault introduced? (Process RCA)",
            why_two: "Why root cause was not found with first set of attached symptoms? (see CDI Guideline)"
        }

    }

    componentDidMount() {
        //checking if someone is just entering the URL -- to Do
    }

    edit(header, id) {
        let data = {
            header: header
        }
        this.props.history.push({
            pathname: `/newRcaAndEda/rca/whyForm${id}`,
            state: { data: data }
        });
    }

    render() {


          return (
            <div className="rootCauseAnalysis">
                <h1 id="rootCauseAnalysisHeader">
                    Root Cause Analysis:
                </h1>

                <div id="whyContainer">

                    <div id="firstWhy">
                        <span id="firstWhyHeader" className="boldText">
                            Why was the fault introduced? (Process RCA)
                        </span>

                        <Button className="editButton" type="primary" onClick={() => {this.edit(this.state.why_one, 1)}} htmlType="submit">
                            Edit
                        </Button>

                        <div id="firstWhyText">
                            See Process RCA guideline for information how to proceed
                        </div>
                    </div>

                    <div id="secondWhy">
                        <span id="secondWhyHeader" className="boldText">Why root cause was not found with first set of attached symptoms?
                            (see CDI Guideline)
                        </span>

                        <Button className="editButton" type="primary" onClick={() => {this.edit(this.state.why_two, 2)}} htmlType="submit">
                            Edit
                        </Button>

                        <div id="secondWhyText">
                             Mandatory if there was at least one symptoms/log re-collection requested
                        </div>
                    </div>

                </div>

                 <div id="nextBtn">
                    <Button id="nextButton1" type="primary" htmlType="submit">
                        Next
                    </Button>
                </div>

            </div>
    )};
}

export default RcaForm;
