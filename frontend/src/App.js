import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseRouter from './routes';
import { ConfigProvider } from 'antd';
import en_GB from 'antd/lib/locale-provider/en_GB';
import 'moment/locale/en-gb';
import 'antd/dist/antd.css';
import './css/App/App.css';
import Layout from "./CommonComponents/Layout";
import * as actions from "./Store/actions/auth";

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup(this.props.history);
  }

  render() {
    return (
      <div style={{height: "100%", background: "white"}}>
        <Router>
          <ConfigProvider locale={en_GB}>
            <Layout {...this.props}>
                <BaseRouter />
            </Layout>
          </ConfigProvider>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: true,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

