import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../Store/actions/auth';
import Button from 'antd/lib/button';
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import nokia from "../images/NOKIA_LOGO_WHITE_LR.png";
//import logo from "../images/LOGO.png"
import MailOutlined from "@material-ui/icons/MailOutlined";
import DescriptionOutlined from "@material-ui/icons/DescriptionOutlined";
import Person from "@material-ui/icons/Person";
import $ from "jquery";
import '../css/App/Layout.css';


const { Footer } = Layout;
const { Header, Content } = Layout;


class CustomLayout extends React.Component {


    componentDidUpdate(prevProps, prevState, snapshot) {

        if(window.location.pathname === "/kanban") {
            $(".KANBAN_BOARD").click();
        }
        else if(window.location.pathname === "/newRcaAndEda/rcaAndEdaInfoForm") {
            $(".NRE").click();
        }
        else if(window.location.pathname === "/MNRCAHome") {
            $(".MNRCAHome").click();
        }
        else if(window.location.pathname === "/List5Why/All") {
            $(".LIST_5WHY").click();
        }
        else if(window.location.pathname === "/powerBI") {
            $(".PB").click();
        }
    }

    onCreateJiraClick = () => {
        let url = "https://jiradc.ext.net.nokia.com/secure/CreateIssueDetails!init.jspa?&issuetype=1&pid=114080&priority=4&labels=support&resolution=1&assignee=-1";
        if (localStorage.username)
           url += `&reporter=${localStorage.username}`;
        window.open(url, '_blank');
    };

     redirectToPreviousPage = () => {
         this.props.history.push({
             pathname: this.props.location.state.prevURL,
         })
         this.props.history.go()
    }


    render(){


      return (
        <Layout >
            {
              this.props.isAuthenticated ? <Header style={{ position: 'inherit', zIndex: 1, width: '100%', background: 'rgb(0, 17, 53)', height: 'unset !important' }}>
                  <AuthenticatedMenu logout={this.props.logout}/> </Header> : null
            }

            <Content >
                {
                  this.props.isAuthenticated ?
                      (
                        window.location.pathname === "/login" ?
                            this.props.location.state && this.props.location.state.prevURL &&
                            typeof this.props.location.state.prevURL !== "undefined" ?
                                this.redirectToPreviousPage()
                            :
                                this.props.history.push({
                                    pathname: "/MNRCAHome",
                                })

                        :
                            <div className={"mainContent"} style={{ padding: "20px 20px 0px 20px", marginBottom: "25px", background: 'white', height: "100%" }}>
                                {this.props.children}
                            </div>)
                  :
                      (

                          window.location.pathname === "/login" ?
                                <div>
                                    {this.props.children}
                                </div>
                          :
                              (
                                this.props.history.push({
                                pathname: '/login',
                                state: { prevURL: window.location.pathname }
                                })
                                //window.location.reload()
                              )
                      )
                }

            </Content>
            <Footer className={"footer"}>
                <a href="https://nokia.sharepoint.com/sites/Nokia_Central" target="_blank" rel="noreferrer">
                    <img
                        src={nokia}
                        alt={'nokia'}
                        style={{ height: '18px', marginLeft: "1%"}}
                    />
                </a>
                <div className={"footer-container"}>
                    <a className="aFooter"
                       href="mailto:I_5WHY@internal.nsn.com">
                        <MailOutlined className="footer-icon"/>
                        I_5WHY@internal.nsn.com
                    </a>
                </div>
                <span style={{height: "26px", width: "1px", float: 'right', background: 'white'}}/>
                <div className={"footer-container"}>
                    <a className="aFooter"
                       target="_blank"
                       href="https://confluence.ext.net.nokia.com/display/5PT/5WHY+tool"
                       rel="noreferrer">
                        <DescriptionOutlined className={'footer-icon'}/>
                        Confluence
                    </a>
                </div>
                <span style={{height: "26px", width: "1px", marginLeft: "20px", float: 'right', background: 'white'}}/>
                <div className={"footer-container"}>
                    <Button id={"jira-btn"} onClick={this.onCreateJiraClick} size={'small'} type={"button"}>
                        Report a bug
                    </Button>
                </div>
            </Footer>

        </Layout>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  }
};

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));

class AuthenticatedMenu extends React.Component {

    constructor(props){
        super(props);
        this.state = { logout: props.logout};
    }

    render() {
        return (
            <div className="headerContainer">
                <Link className="logoContainer" to="/MNRCAHome">
                    RCA Shark
                </Link>

                <div className="headerMenuContainer">
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{lineHeight: '50px',}}

                    >

                        <Menu.Item
                            className="MNRCAHome"
                            key="MNRCAHome"
                            style={{float: 'left'}}
                        >
                            <Link to="/MNRCAHome">MNRCAHome</Link>
                        </Menu.Item>
                        <Menu.Item
                            className="KANBAN_BOARD"
                            key="KANBAN_BOARD"
                            style={{float: 'left'}}
                        >
                            <Link to="/kanban">Kanban Board</Link>
                        </Menu.Item>

                        

                        <Menu.Item
                            className="NRE"
                            key="NRE"
                            style={{float: 'left'}}
                        >
                            <Link to="/newRcaAndEda/rcaAndEdaInfoForm"> New RCA/EDA</Link>
                        </Menu.Item>
                        <Menu.Item
                            className="LIST_5WHY"
                            key="LIST_5WHY"
                            style={{float: 'left'}}
                        >
                            <Link to="/List5Why/All"> 5Why List</Link>
                        </Menu.Item>
                        <Menu.Item
                            className="PB"
                            key="PB"
                            style={{float: 'left'}}
                        >
                            <Link to="/powerBI"> Power BI</Link>
                        </Menu.Item>
                        <Menu.SubMenu
                            key={'submenuKey'}
                            title={
                                <div className="profile-submenu-container" key="profileDivKey">
                                    <div className="user-span" key="profileDivUserFullNameKey">{localStorage.fullName}</div>
                                    <Person className={'profile-icon'}/>
                                </div>
                            }
                            className={"profile-submenu"}
                        >
                            <Menu.Item
                                key="profile-menu-item"
                            >
                                <a href={"/profile"}>Profile</a>
                            </Menu.Item>
                            <Menu.Item>
                                <a href={"/"}
                                key="Logout"
                                onClick={this.state.logout}
                                >
                                    Logout
                                </a>
                            </Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </div>
            </div>
        )}
}
