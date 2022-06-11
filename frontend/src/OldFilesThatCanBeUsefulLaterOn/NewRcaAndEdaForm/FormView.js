import React from "react";
import axios from "../../axios/axios";
import EditionMode from "./EditionMode"
import { Tabs } from 'antd';
import WhyTree from "../../List5Why/Overview/WhyTree/WhyTree";


const { TabPane } = Tabs;

class WhyFormVersion2 extends React.Component {





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

    componentDidMount() {
        //checking if someone is just entering the URL
        // if(this.props.location.state === undefined) {
        //
        //     this.props.history.push("/newRcaAndEda/rcaForm");
        // }
        // else {
        //
        //     this.setState({
        //         header: this.props.location.state.data.header
        //     })
        // }


        //getting list of users
        const result = axios.get(`/users-lessdata/`,
                        {
                        headers: {'Authorization': `Token ${localStorage.token}`}
                        }).then(response => {

            if (response.status === 200) {

                let usersData = response.data.results;
                let users = [];
                let assignToMe = {};
                let squadGroup = {};
                let squadGroupArray = []
                let others = {};
                let othersArray = []

                 assignToMe = {
                    label: "Assign to me:",
                    options: [{value: localStorage["fullName"] + " (" + localStorage["squadGroup"] + ")"}]
                }

                usersData.map(user => {

                    if(user["full_name"] != localStorage["fullName"]) {

                        if(user["squad_group"] == localStorage["squadGroup"]) {
                            squadGroupArray.push({
                                value: user["full_name"] + " (" + user["squad_group"] + ")"
                            })
                        }
                        else {
                            othersArray.push({
                                value: user["full_name"] + " (" + user["squad_group"] + ")"
                            })
                        }
                    }

                    squadGroup = {
                        label: "Squad group:",
                        options: squadGroupArray
                    }

                    others = {
                        label: "Others:",
                        options: othersArray
                    }

                })

                users.push(assignToMe);
                users.push(squadGroup);
                users.push(others)


                this.setState({
                    users: users
                })

            }
        }).catch(error => {
            // console.log(error);
        })

    }

    render() {
        return (
            <div>
                <WhyTree edition={true}/>
            </div>
        );
    }

}

export default WhyFormVersion2;