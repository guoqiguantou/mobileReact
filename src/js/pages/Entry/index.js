import React from 'react';
import {TabBar} from 'antd-mobile';
import CustomIcon from '../../components/common/CustomIcon'//引入svg组件
import FullScreenCon from '../../components/common/FullScreenCon'//引入全屏组件
import Index from '../Index'
/**
 * 入口文件
 */
export default class HelloWorld extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'page1',
        };
    }

    componentDidMount() {
       // console.log('logo',require('images/svg/menu1.svg') )
    }
    onTabChange(tabKey) {
        this.setState({
            selectedTab: tabKey,
        });
    }

    render() {
        return (
            <FullScreenCon>


                <TabBar  unselectedTintColor="#949494"
                        tintColor="#33A3F4"
                        barTintColor="white">
                    <TabBar.Item
                        title="图文首页"
                        key="page1"
                        icon={<CustomIcon path={require('images/svg/menu1.svg')} color="#888" />}
                        selectedIcon={<CustomIcon path={require('images/svg/menu1.svg')} color="#29A1F7" />}
                        selected={this.state.selectedTab === 'page1'}
                        onPress={this.onTabChange.bind(this, 'page1')}
                    >

                            <Index/>

                    </TabBar.Item>

                    <TabBar.Item
                        title="活动中心"
                        key="page2"
                        icon={<CustomIcon path={require('images/svg/menu3.svg')} color="#888" />}
                        selectedIcon={<CustomIcon path={require('images/svg/menu3.svg')} color="#29A1F7" />}
                        selected={this.state.selectedTab === 'page2'}
                        onPress={this.onTabChange.bind(this, 'page2')}
                    >

                    </TabBar.Item>

                    <TabBar.Item
                        title="个人设置"
                        key="page3"
                        icon={<CustomIcon path={require('images/svg/menu2.svg')} color="#888" />}
                        selectedIcon={<CustomIcon path={require('images/svg/menu2.svg')} color="#29A1F7" />}
                        selected={this.state.selectedTab === 'page3'}
                        onPress={this.onTabChange.bind(this, 'page3')}
                    >

                    </TabBar.Item>
                </TabBar>

            </FullScreenCon>
        );
    }
}



