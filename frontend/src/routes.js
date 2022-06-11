import React from 'react';
import Loadable from '@docusaurus/react-loadable';
import {Route, Switch} from 'react-router-dom';

const Login = Loadable({
    loader: () => import("./Authorization/Login"),
    loading: () => null
});

const UserProfile = Loadable({
    loader: () => import("./Authorization/UserProfile/UserProfile"),
    loading: () => null
});

const KanbanBoard = Loadable({
    loader: () => import("./KanbanBoard/KanbanBoard"),
    loading: () => null
});

const RcaAndEdaInfoForm = Loadable({
    loader: () => import("./NewRcaAndEdaForm/NewRcaAndEdaInfoForm"),
    loading: () => null
});

const List5Why = Loadable ( {
    loader: () => import("./List5Why/RcaEdaList"),
    loading: () => null
});

const Overview = Loadable ( {
    loader: () => import("./List5Why/Overview/Overview"),
    loading: () => null
});

const PageNotFound = Loadable ( {
    loader: () => import("./PageNotFound/PageNotFound"),
    loading: () => null
});

const PowerBI = Loadable( {
    loader: () => import("./PowerBI/PowerBI"),
    loading: () => null
});
const MNRCAHome = Loadable( {
    loader: () => import("./MNRCAHome/MNRCAHome"),
    loading: () => null
});
const TaskDetail = Loadable( {
    loader: () => import("./MNRCAHome/Detail"),
    loading: () => null
});

const BaseRouter = () => (
    <Switch>
        <Route exact path="/" render={(props) => <KanbanBoard {...props}/>}/>
        <Route path="/login" render={(props) => <Login {...props}/>} />
        <Route path="/kanban" render={(props) => <KanbanBoard {...props}/>}/>
        <Route path="/profile" render={(props) => <UserProfile {...props}/>}/>
        <Route path="/newRcaAndEda/rcaAndEdaInfoForm" render={(props) => <RcaAndEdaInfoForm {...props}/>}/>
        <Route path="/List5Why/All" render={(props) => <List5Why {...props}/>}/>
        <Route path="/powerBI" render={(props) => <PowerBI {...props}/>}/>
        <Route path="/List5Why/RcaEdaOverview/:caseNumber" render={(props) => <Overview {...props}/>}/>
        <Route path="/MNRCAHome" render={(props) => <MNRCAHome {...props}/>}/>
        <Route path="/detail/:PRID" render={(props) => <TaskDetail {...props}/>}/>
        <Route render={(props) => <PageNotFound {...props}/>} />
    </Switch>
);

export default BaseRouter;
