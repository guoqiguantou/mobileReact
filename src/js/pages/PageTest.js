import React from 'react'
import Page from '../components/common/Page'
import {Slider,List} from 'antd-mobile'
import { Link } from "react-router-dom";


const Item = List.Item;
const Brief = Item.Brief;

/**
 * 通用列表DEMO
 */
export default class ScrollTest extends React.Component {

    constructor(props){
        super(props);
    }

    onDataLoad = (data)=>{
         console.log('pageOnDataLoad',data);
    }


    render(){
        return (<Page title="页面控件Demo" dataUrl={`https://www.easy-mock.com/mock/5b964044e3f68a2002edff94/example/cat`} onDataLoad={this.onDataLoad} enablePullToRefresh={true}>
                <List renderHeader={() => 'Basic Style'} className="my-list">
                    <Item extra={'extra content'}>
                        <Slider
                            style={{ marginLeft: 30, marginRight: 30 }}
                            defaultValue={26}
                            min={0}
                            max={30}
                        />
                    </Item>
                </List>
                <List renderHeader={() => 'Subtitle'} className="my-list">
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                        Title <Brief>subtitle</Brief>
                    </Item>
                    <Item
                        arrow="horizontal"
                        multipleLine
                        onClick={() => {}}
                        platform="android"
                    >
                        ListItem （Android）<Brief>There may have water ripple effect of <br /> material if you set the click event.</Brief>
                    </Item>
                    <Item
                        arrow="horizontal"
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        multipleLine
                        onClick={() => {}}
                    >
                        Title <Brief>subtitle</Brief>
                    </Item>
                </List>
                <List renderHeader={() => 'Customized Right Side（Empty Content / Text / Image）'} className="my-list">
                    <Item>Title</Item>
                    <Item arrow="horizontal" onClick={() => {}}>Title</Item>
                    <Item extra="extra content" arrow="horizontal" onClick={() => {}}>Title</Item>
                    <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                        Title <Brief>subtitle</Brief>
                    </Item>
                </List>

                <List renderHeader={() => 'Basic Style'} className="my-list">
                    <Item extra={'extra content'}>Title</Item>
                </List>
                <List renderHeader={() => 'Subtitle'} className="my-list">
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                        Title <Brief>subtitle</Brief>
                    </Item>
                    <Item
                        arrow="horizontal"
                        multipleLine
                        onClick={() => {}}
                        platform="android"
                    >
                        ListItem （Android）<Brief>There may have water ripple effect of <br /> material if you set the click event.</Brief>
                    </Item>
                    <Item
                        arrow="horizontal"
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        multipleLine
                        onClick={() => {}}
                    >
                        Title <Brief>subtitle</Brief>
                    </Item>
                </List>
                <List renderHeader={() => 'Customized Right Side（Empty Content / Text / Image）'} className="my-list">
                    <Item>Title</Item>
                    <Item arrow="horizontal" onClick={() => {}}>Title</Item>
                    <Item extra="extra content" arrow="horizontal" onClick={() => {}}>
                        <Link to="/list">测试跳转</Link>
                    </Item>
                    <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                        Title <Brief>subtitle</Brief>
                    </Item>
                </List>
        </Page>)
    }
}