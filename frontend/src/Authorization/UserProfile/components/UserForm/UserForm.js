import React from 'react';
import '../../../../css/UserForm_module.css';
import InputForm from "../../../../CommonComponents/CreateForm/Items/InputForm";

class UserForm extends React.Component {
    render() {

        let columns = (
            <div className="formColumns">
                <div className="formCol">
                    <InputForm inputtype="input" type="text" value={localStorage.manager} label="Manager" readOnly="readonly" size="35"></InputForm>
                    <InputForm inputtype="input" type="text" value={localStorage.tribe} label="Tribe" readOnly="readonly" size="35"></InputForm>
                    <InputForm inputtype="input" type="text" value={localStorage.squadGroup} label="Squad group" readOnly="readonly" size="35"></InputForm>
                    <InputForm inputtype="input" type="text" value={localStorage.site} label="Site" readOnly="readonly" size="35"></InputForm>
                </div>
                <div className="formCol">
                    <InputForm inputtype="input" type="text" value={localStorage.username} label="Username" readOnly="readonly" size="35"></InputForm>
                    <InputForm inputtype="input" type="text" value={localStorage.lastName} label="Last name" readOnly="readonly" size="35"></InputForm>
                    <InputForm inputtype="input" type="text" value={localStorage.fullName} label="Full name" readOnly="readonly" size="35"></InputForm>
                    <InputForm inputtype="input" type="text" value={localStorage.email} label="Email" readOnly="readonly" size="35"></InputForm>
                </div>
                <div className="formCol">
                </div>
            </div>
        );

        return (

            <div className="UserForm">
                {columns}
            </div>
        )
    }
}

export default UserForm;