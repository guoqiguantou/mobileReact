import React from 'react';
import ReactDOM from 'react-dom';
import {PullToRefresh,NavBar,Icon} from 'antd-mobile';
import FullScreenCon from '../FullScreenCon';
import styles from './style/index.scss';
import PropTypes from 'prop-types';
import ajaxUtil from "../../../utils/ajaxUtil";
import sessionStorageUtil from '../../../utils/sessionStorageUtil';
import ScrollView from '../ScrollView';

const TAB_BAR_HEIGHT = 50;

const propTypes = {
    /**
     * 标题
     */
    title: PropTypes.string,

    /**
     * 数据接口路径
     */
    dataUrl: PropTypes.string,

    /**
     * 数据加载完毕回调
     * (json)=>{}
     */
    onDataLoad: PropTypes.func,

    /**
     * 是否显示后退按钮
     */
    showBackBtn: PropTypes.bool,

    /**
     * 是否显示导航条
     */
    showNavBar:PropTypes.bool,

    /**
     * 是否嵌入到TabBar控件中
     */
    inTabBar:PropTypes.bool,

    /**
     * 模式
     * enum{'dark', 'light'}
     */
    mode: PropTypes.string,

    /**
     * 导航右边内容, 参考NavBar控件
     */
    rightContent: PropTypes.any,

    /**
     * 是否用ScrollView控件包含内容
     */
    wrapScollView: PropTypes.bool,

    /**
     * 是否支持数据缓存
     */
    cache: PropTypes.bool,

    /**
     * 缓存KEY
     */
    cacheKey:PropTypes.string,

    /**
     * 是否允许下拉刷新
     */
    enablePullToRefresh:PropTypes.bool,

    /**
     * 头部渲染函数
     */
    renderHeader: PropTypes.func,
    /**
     * 底部渲染函数
     */
    renderFooter: PropTypes.func,
    /**
     * 附加样式类
     */
    className:PropTypes.string
}

const defaultProps = {
    mode: 'dark',
    showBackBtn: true,
    wrapScollView: true,
    cache: true,
    enablePullToRefresh:false,
    showNavBar: true,
    inTabBar:false
}

/**
 * 通用页面控件
 */
class Page extends React.Component {

    constructor(props) {
        super(props);
        this.cacheKey = this.props.cacheKey || sessionStorageUtil.getKey();
        this.state = {};
        this.data = {};
        this.wrapScollView = this.props.wrapScollView;
    }


    componentDidMount() {
        this.calculateHeight();

        const {dataUrl, onDataLoad, cache} = this.props;

        let saveData = false;
        if (cache) saveData = sessionStorageUtil.read(this.cacheKey);
        if (saveData) {
            if(dataUrl){
                this.data = saveData.data;
                if(onDataLoad) onDataLoad(this.data);
            }
            if (this.wrapScollView){
                  setTimeout(()=>{
                      ReactDOM.findDOMNode(this.scrollView).scrollTop = saveData['scrollPosition'];
                  },1);
            }
        }
        else {
            if(dataUrl) this.loadData();
        }
    }

    loadData = (showLoading = true) => {
        ajaxUtil.load(this.props.dataUrl, (err, res) => {
            if (!err) {
                console.log('onDataload', res.body);
                const {onDataLoad} = this.props;
                if (onDataLoad) {
                    this.data = res.body;
                    onDataLoad(this.data);
                }
            }
        },showLoading);
    }

    /**
     * 刷新
     */
    onRefresh = () =>{
        this.loadData(false);
    }

    /**
     * 返回
     */
    onBack = () => {
        window.app.router.history.goBack();
    }

    componentWillUnmount() {
        if (this.props.cache) this.saveState();
    }

    /**
     * 保存状态
     */
    saveState = () => {
        let saveData = {data:this.data};
        if (this.wrapScollView) saveData['scrollPosition'] = ReactDOM.findDOMNode(this.scrollView).scrollTop;
        sessionStorageUtil.save(this.cacheKey, saveData);
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
        this.height = document.documentElement.clientHeight - this.contentDom.offsetTop;
        if(this.props.inTabBar){
            this.height -= TAB_BAR_HEIGHT;
        }
        if (this.state.height !== this.height) {
            this.setState({height: this.height});
        }
    }

    render() {
        const {mode, showBackBtn, title, enablePullToRefresh,inTabBar,renderHeader,renderFooter,showNavBar,rightContent,className} = this.props;
        let Children = this.props.children;
        const WrapCon = inTabBar?React.Fragment:FullScreenCon;

        return (
            <WrapCon>
                <div className={`${styles.page} ${className}`}>
                    {showNavBar && <NavBar
                        mode={mode}
                        icon={showBackBtn && <Icon type="left"/>}
                        onLeftClick={showBackBtn ? this.onBack : null}
                        rightContent={rightContent}
                    >
                        {title}
                    </NavBar>}
                    <div className={styles.header}>{renderHeader && renderHeader()}</div>
                    <div ref={el => this.contentDom = el} className={styles.content} style={{height:this.state.height}}>
                        {this.wrapScollView ? (<ScrollView ref={el => this.scrollView = el} style={{height: '100%'}}
                                                           pullToRefresh={enablePullToRefresh && <PullToRefresh
                                                               distanceToRefresh={60}
                                                               refreshing={false}
                                                               onRefresh={this.onRefresh}
                                                           />}>
                            {Children}
                        </ScrollView>) : Children}
                    </div>
                    <div className={styles.footer}>
                        {renderFooter && renderFooter()}
                    </div>
                </div>
            </WrapCon>
        )
    }
}

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;


export default Page;
