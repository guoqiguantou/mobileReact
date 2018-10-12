import React from 'react';
import {Modal} from 'antd-mobile';

const HEADER_HEIGHT = 66;
const BOTTOM_HEIGHT = 50;

/**
 * 占满全屏模态对话框
 */
export default class FullScreenCon extends React.Component {

    constructor(props) {
        super(props);
        this.contentheight = document.documentElement.clientHeight - BOTTOM_HEIGHT - HEADER_HEIGHT;
    }


    render(){
        return(
            <Modal  transparent={true} {...this.props}>
                <div style={{height:this.contentheight}}>
                    {this.props.children}
                </div>
            </Modal>
        );
    }
}
