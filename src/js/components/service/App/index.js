import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

/***
 * 入口壳
 */
class App extends React.Component {

    constructor(props) {
        super(props);
        window.app = this;
        window.app.router = {history:this.props.history,location:this.props.location,match:this.props.match};
        this.state = {
            themeColor : 'red'
        }
    }
    getChildContext () {
        return {
            themeColor : this.state.themeColor
        }
    }

    componentWillMount(){
        // if(window.sessionStorage.getItem("syjj")==1){
        //
        // }else{
        //     window.app.router.history.push('/');
        // }
}
    render() {
        return (
            <div className="main">
                {this.props.children}
            </div>
        );
    }
}
App.childContextTypes = {//检测的数据类型，传递给下一级
    themeColor:PropTypes.string
}
export default withRouter(App);
