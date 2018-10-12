import React from 'react';
import {Tabs} from 'antd-mobile';
import ReactDOM from 'react-dom';
import DataListView from '../DataListView';
import sessionStorageUtil from '../../../utils/sessionStorageUtil';
import PropTypes from 'prop-types';


const TAB_HEIGHT = 43.5;

const propTypes = {
    /**
     * tab数组
     * 结构举例  const tabs = [
     {title: '待处理', dataUrl: `${__apiRoot}/common/wap/task/list`},
     {title: '已发起', dataUrl: `${__apiRoot}/common/wap/task/list?s1=none`}
     ]
     */
    tabs: PropTypes.array.isRequired,
    /**
     * 其他属性同DataListView
     */
    ...DataListView.propTypes
}

const defaultProps = {
    dataUrl:'',
    ...DataListView.defaultProps
}

/**
 * 通用数据列表Tab页
 */
export default class TabDataListView extends React.Component {

    constructor(props) {
        super(props);
        this.cacheKey = 'TAb_' + this.props.cacheKey;
        this.state = sessionStorageUtil.read(this.cacheKey);
        if (!this.state) {
            this.state = {
                selectedTab: 0,
                height: 0
            };
        }
    }

    componentDidMount() {
        this.calculateHeight();
    }

    componentWillReceiveProps() {
        //console.log('componentWillReceiveProps');
        this.parentRender = true;
    }

    componentDidUpdate() {
        //console.log('componentDidUpdate',document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop);
        ///父容易重绘时，判断是否需要重新调整列表大小
        if (this.parentRender) {
            this.parentRender = false;
            this.calculateHeight();
        }
    }

    /**
     * 重新计算高度
     */
    calculateHeight() {
        this.height = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.contentDom).offsetTop - TAB_HEIGHT;
        if (this.props.inTabBar) {
            this.height -= TAB_BAR_HEIGHT;
        }
        if (this.state.height != this.height) {
            this.setState({height: this.height});
        }
    }

    changeHandler = (tab, index) => {
        this.state.selectedTab = index;
        this.saveState();
    }

    /**
     * 保存状态
     */
    saveState = () => {
        sessionStorageUtil.save(this.cacheKey, this.state);
    }

    render() {
        const {tabs, renderRow} = this.props;
        return (
            <Tabs
                useOnPan = {false}
                initialPage={this.state.selectedTab}
                ref={el => this.contentDom = el} tabs={tabs}
                onChange={this.changeHandler}>
                {tabs.map((item, index) => {
                    return (
                        <div key={index} style={{height: this.state.height}}>
                            <DataListView {...this.props} style={{height: '100%'}} cache={true}
                                          cacheKey={'TAB_DATE_LISTVIEW_' + item.dataUrl}
                                          dataUrl={item.dataUrl}
                                          />
                        </div>
                    );
                })}
            </Tabs>
        )
    }
}

TabDataListView.propTypes = propTypes;
TabDataListView.defaultProps = defaultProps;
