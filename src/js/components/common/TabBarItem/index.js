import React from 'react';
import { TabBar } from 'antd-mobile';

/**
 * antd TabBar.Item的包装组件，使其支持显示时才动态加载组件
 */
export default class TabBarItem extends React.Component {

    render(){
        return(
            <TabBar.Item {...this.props}>
               {this.props.selected && this.props.children}
            </TabBar.Item>
        );
    }
}
