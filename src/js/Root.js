import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Loadable from 'react-loadable'
import PageLoading from './components/common/PageLoading'
import Entry from "./pages/Entry";
import App from './components/service/App'

//Hello
const Hello = Loadable({
    loader: () => import('./pages/HelloWorld'/* webpackChunkName:"HelloWorld" */),
    loading: PageLoading
});
//ListTest
const ListTest= Loadable({
    loader: () => import('./pages/ListTest'/* webpackChunkName:"ListTest" */),
    loading: PageLoading
});
//MultListTest
const MultListTest = Loadable({
    loader: () => import('./pages/MultListTest'/* webpackChunkName:"MultListTest" */),
    loading: PageLoading
});
//scrollTest
const PageTest= Loadable({
    loader: () => import('./pages/PageTest'/* webpackChunkName:"PageTest" */),
    loading: PageLoading
});
export default class Root extends React.Component {


    render() {
        return (
            <Router>
                <App>
                <Switch>
                    <Route exact path="/" component={Entry} />
                    <Route path="/hello" component={Hello} />
                    <Route path="/listTest" component={ListTest} />
                    <Route path="/pageTest" component={PageTest} />
                    <Route path="/multListTest" component={MultListTest} />
                </Switch>
                </App>
            </Router>
        )
    }
}
