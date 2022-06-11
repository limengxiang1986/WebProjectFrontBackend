import React from 'react';
import "../../css/UserProfile.css";
import "./components/UserForm/UserForm";
import UserForm from './components/UserForm/UserForm';


class UserProfile extends React.Component {
    render() {
        return (
            <div className={'mainDiv'}>
                <h3>User profile</h3>
                <UserForm/>
            </div>
        );
    }

}
export default UserProfile;