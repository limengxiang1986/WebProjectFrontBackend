import React from 'react';
import { Form, Input, Button, Alert} from 'antd';
import LockOutlined from '@ant-design/icons/LockOutlined';
import UserAddOutlined from '@ant-design/icons/UserAddOutlined';
import { connect } from 'react-redux';
import axios from '../axios/axios';
import { withRouter } from 'react-router-dom';
import  * as actions from '../Store/actions/auth';
import nokia from "../images/NOKIA_LOGO_WHITE_MR.png";
import "../css/Login.css";
import bgImage1 from "../images/background1.jpg";
import bgImage2 from "../images/background2.jpg";
import bgImage3 from "../images/background3.jpg";
import bgImage4 from "../images/background4.jpg";
import bgImage5 from "../images/background5.jpg";
import bgImage6 from "../images/background6.jpg";
import {Ring} from "react-spinners-css";



const FormItem = Form.Item;

let userId = '';
let userLogin = '';
let userFirstName = '';
let userLastName = '';
let userFullName = '';
let userDisplayName = '';
let userManager = '';
let userTribe = '';
let userSquadGroup = '';
let userSite = '';
let userPassword = '';
let userToken = '';
let userEmail = '';

class NormalLoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.count = parseInt((Math.random() * (5 - 0 + 1)), 10)
    this.images = [bgImage1, bgImage2, bgImage3, bgImage4, bgImage5, bgImage6];

    this.slideTime = 60000;
    window.onload = this.changePicture;
  }


    changePicture = () => {
        let bgDiv = document.querySelector('.bg-image');
        if (bgDiv !== null) {
            bgDiv.style.backgroundImage = `url(${this.images[this.count]})`;

            if (this.count < this.images.length - 1) {
                this.count++;
            } else {
                this.count = 0;
            }
            setTimeout(this.changePicture, this.slideTime);
            this.slideTime = 60000;
        }
    }



  state = {
    incorrectCredentialsFlag: false,
    error: false,
    errorMessage: null,
    flagLoader: false,
  }


  handleSubmitSuccess = (e) => {
    let values = {
        username: e.userName,
        password: e.passwordInput
    }
          this.setState({
              flagLoader: true,
              incorrectCredentialsFlag: false,
              error: false
          })

          axios.post('/login', {
              username: values.username,
              password:  values.password
          }
        )
        .then(response => {
            this.setState({flagLoader: false});
            if (response.status === 200){
                userId = response.data.user.id;
                userLogin = values.username;
                userPassword = values.password;
                userFirstName = response.data.user.first_name;
                userLastName = response.data.user.last_name;
                userFullName = response.data.user.full_name;
                userDisplayName = response.data.user.display_name;
                userManager = response.data.user.manager;
                userSite = response.data.user.site;
                userTribe = response.data.user.tribe;
                userSquadGroup = response.data.user.squad_group;
                userToken = response.data.token;
                userEmail = response.data.user.email;
                this.props.onAuth(userId, values.username, userFirstName, userLastName, userFullName, userDisplayName, userManager, userSite, userTribe, userSquadGroup, values.password, userToken, userEmail);
                this.props.history.push('/kanban');
            }
        })
        .catch(error => {
            this.setState({flagLoader: false});
            if (error.response && error.response.status === 401) {
              this.setState({incorrectCredentialsFlag: true});
            }
            else {
              this.setState({ error: true, errorMessage: "Network Error!"});
            }
        })

  }

  onIncorrectCredentialsAlertClose = e => {
    this.setState({incorrectCredentialsFlag: false})
  };

  onAlertClose = () => {
    this.setState({ error: false, errorMessage: null })
  }

  render() {

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
          <p style={{color: "red"}}>
            {this.props.error.message}
          </p>
      );
    }


    return (
      <div className="bg-image layout-content" >



      <div id="login">

          <div id="loginLabelBox">
            <div style={{color: "white", float: "left", width: "100%"}}>
                <img
                    src={nokia}
                    alt={'nokia'}
                    height={"10%"}
                    style={{marginBottom: "0px", width: "100%", height: 'auto', opacity: "85%"}}
                />
                <div id="nameLabel" >
                    Log in to 5WHY
                </div>
            </div>

        </div>


        {errorMessage}
        {
            <Form style={{paddingTop: "10%", background: 'white'}} className="login-form" onFinish={(e) => {this.handleSubmitSuccess(e)}}>

              <FormItem name='userName' rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input prefix={<UserAddOutlined style={{
                    color: 'rgb(0, 17, 53)',
                    marginLeft: "5px"}}/>}
                onFocus={(event) => {
                  event.target.setAttribute('autocomplete', 'off');
                }}
                bordered={false} placeholder="username" />
              </FormItem>



              <FormItem name="passwordInput" rules={[{ required: true, message: 'Please input your Password!' }]}>
                <Input prefix={<LockOutlined  style={{
                    color: 'rgb(0, 17, 53)',
                    marginLeft: "5px"}}/>}
                type="password" bordered={false} placeholder="password" />
              </FormItem>



            {
                this.state.flagLoader ?
                  <FormItem>
                    <Button id="loginBtnDisabled"  disabled ghost >
                        Login
                    </Button>
                  </FormItem>
              :
                  <FormItem>
                    <Button id="loginBtn" type="primary" htmlType="submit" >
                      Login
                    </Button>
                  </FormItem>
            }

            {
                this.state.flagLoader ?
                <div style={{paddingBottom: "25px"}}>
                    <Ring className="loadingSpinner" style={{
                    marginLeft: "41%"}} color="rgb(18,65,145)" size={50}/>
                </div>
                :
                <span> </span>
            }

            </Form>
        }
        {
          this.state.incorrectCredentialsFlag ?
                <Alert
                    message = "Login failed - wrong user credentials"
                    type = "error"
                    closable
                    onClose = {() => {this.onIncorrectCredentialsAlertClose()}}
                />
          :
                <span> </span>
        }
        {
            this.state.error ?
                <Alert
                    message = {this.state.errorMessage}
                    type="error"
                    closable
                    showIcon
                    onClose={() => {this.onAlertClose()}}
                />
            :
                <span> </span>
        }
      </div>
    </div>



    );
  }
}


const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (userId, username, firstName, lastName, fullName, displayName, manager, site, tribe, squadGroup, password, token, userEmail) =>
        dispatch(actions.authLogin(userId, username, firstName, lastName, fullName, displayName, manager, site, tribe, squadGroup, password, token, userEmail))

  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm));
export {userLogin, userFirstName, userLastName, userFullName, userManager, userSite, userTribe, userSquadGroup, userPassword, userToken, userEmail}
