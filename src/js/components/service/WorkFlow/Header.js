import React from 'react';
import {Flex, Icon, NavBar} from 'antd-mobile';

//工作流界面-头部
export class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={
            btnval:null
        }
    }

    //点击返回按钮
    onClick= () =>{
        window.app.router.history.goBack();
    }
    render(){
        //alert(this.props.value);
        return(
            <Flex>
            <NavBar
                leftContent={[
                    <Icon onClick={this.onClick} key="0" type="left" />
                ]}
            style={{position: 'fixed',zIndex:'100',width:'100%',top:'0'}}>{this.props.value}</NavBar>
        </Flex>
        );
    }
}