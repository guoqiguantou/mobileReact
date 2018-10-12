import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {ListView,PullToRefresh} from 'antd-mobile';
import ajaxUtil from '../../../utils/ajaxUtil';
import Foot from './Foot';
import sessionStorageUtil from '../../../utils/sessionStorageUtil';
import styles from './style/index.scss';

const propTypes = {
    /**
     * 数据接口路径
     */
    dataUrl: PropTypes.string.isRequired,

    /**
     * 每页数据条数
     */
    pageSize: PropTypes.number,

    /**
     * 样式
     */
    style: PropTypes.object,

    /**
     * 是否允许下拉刷新
     */
    enablePullToRefresh:PropTypes.bool,

    /**
     *    从数据源(data source)中接受一条数据，以及它和它所在section的ID。
     *    返回一个可渲染的组件来为这行数据进行渲染。默认情况下参数中的数据就是放进数据源中的数据本身，
     *    不过也可以提供一些转换器。
     *    如果某一行正在被高亮（通过调用highlightRow函数），ListView会得到相应的通知。
     *    (rowData, sectionID, rowID, highlightRow) => renderable
     */
    renderRow: PropTypes.func.isRequired,

    /**
     * 列表头部渲染函数
     */
    renderHeader: PropTypes.func,

    /**
     * 如果提供了此函数，会为每个小节(section)渲染一个标题
     * (sectionData, sectionID) => renderable
     */
    renderSectionHeader: PropTypes.func,

    /**
     * 如果提供了此属性，一个可渲染的组件会被渲染在每一行下面，除了小节标题的前面的最后一行。
     * 在其上方的小节ID和行ID，以及邻近的行是否被高亮会作为参数传递进来。
     * (sectionID, rowID, adjacentRowHighlighted) => renderable
     */
    renderSeparator: PropTypes.func,

    /**
     * 滚动回调函数
     * (e)=>{}
     */
    scrollHandler: PropTypes.func,

    /**
     * 第一页数据加载完成回调
     *  (data,isCache)=>{}
     */
    onDataFirstLoad: PropTypes.func,

    /**
     * 列表在JSON数据里的名称
     */
    listVarName:PropTypes.string,

    /**
     * 总数量在JSON数据里的名称
     */
    totalVarName:PropTypes.string,

    /**
     * 分页参数名称
     */
    pageParamName:PropTypes.string,

    /**
     * 分页每页数量参数名称
     */
    pageSizeParamName:PropTypes.string,

    /**
     * 是否支持缓存
     */
    cache:PropTypes.bool,

    /**
     * 缓存KEY
     */
    cacheKey:PropTypes.string,

    /**
     * 自动加载
     */
    autoLoad:PropTypes.bool,
    /**
     * 列数
     */
    columns: PropTypes.number,
};

const defaultProps = {
    pageSize: 15,
    listVarName: 'list',
    totalVarName: 'total',
    pageParamName: 'page',
    pageSizeParamName: 'pagesize',
    enablePullToRefresh: true,
    cache: true,
    autoLoad:true,
    columns:1
};

/**
 * 通用数据加载组件,支持PullToRefresh
 * （注意：该组件的父组件不能包含再scollview，组件自己管理scroll，并且维持状态）
 */
export default class DateListView extends React.Component {

    /*** public method start */
    /**
     * 刷新
     */
    refresh(){
        this.dataList = [];
        this.currentPage = 0;
        this.loadData();
    }

    /**
     * 获取数据源
     * @returns {Array}
     */
    getDataSource(){
        return this.dataList;
    }

    /*** public method end */

    constructor(props) {
        super(props);

        this.setCacheKey(this.props.cacheKey);

        this.dataList = [];
        this.currentPage = 0;
        this.showProgress = true;
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
            isLoading: false,
            hasMore: true,
            isEmpty:false,
            refreshing:false
        };
    }

    /**
     * 设置缓存
     * @param cacheKey
     */
    setCacheKey = (cacheKey)=> {
        if (cacheKey) {
            this.cacheKey = cacheKey?cacheKey:sessionStorageUtil.getKey()+"_list_view";
        }
    }

    componentDidMount() {
        if(this.props.autoLoad) this.initData();
    }

    componentWillReceiveProps(nextProps) {
        //console.log('componentWillReceiveProps');
        this.parentRender = true;
        if(nextProps.dataUrl!=this.props.dataUrl){
            this.saveState();
        }
        if (nextProps.cacheKey != this.props.cacheKey) {
            this.setCacheKey(nextProps.cacheKey);
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(this.parentRender){
            this.parentRender = false;

            if(prevProps.dataUrl==this.props.dataUrl){
                return;
            }

            if(prevProps.dataUrl!=this.props.dataUrl){
                this.dataList = [];
                this.currentPage = 0;
            }
            this.initData();
        }
    }

    initData(){
        const {cache,dataUrl} = this.props;
        // console.log('initData',dataUrl,cacheKey);
        setTimeout(() => {
            let saveData = false;
            if (cache) saveData = sessionStorageUtil.read(this.cacheKey);
            if (saveData) {
                this.onCacheLoad(saveData);
                //console.log('scrollView',this.scrollView);
                ReactDOM.findDOMNode(this.scrollView).scrollTop = saveData['scrollPosition'];
            }
            else {
                this.loadData();
            }
        },1);
    }


    /**
     * 加载数据
     */
    loadData() {
        this.setState({
            isLoading:true,
            refreshing:true
        });

        if(this.currentPage>0){
            this.showProgress = false;
        }

        const {dataUrl,pageParamName,pageSizeParamName,pageSize} = this.props;

        let token = dataUrl.indexOf('?')!=-1?'&':'?';
        ajaxUtil.load(`${dataUrl}${token}${pageParamName}=${++this.currentPage}&${pageSizeParamName}=${pageSize}`, (err, res) => {
            if (!err) {
                this.onDataLoad(res.body);
            }
        },this.showProgress);

        this.showProgress = false;
    }

    /**
     * 数据加载完成
     */
    onDataLoad = (data)=>{
        console.log('onListDataLoad',data);

        if(this.currentPage==1){
            this.dataLoaded = data;
            if(this.props.onDataFirstLoad){
                this.props.onDataFirstLoad(data,false);
            }
        }

        let isEmpty = false;
        let datas = data[this.props.listVarName];
        if(this.currentPage==1 && datas.length==0){
            isEmpty = true;
        }

        this.dataList = this.dataList.concat(data[this.props.listVarName]);

        let hasMore = true;
        if (this.dataList.length >= data[this.props.totalVarName]) {
            hasMore = false;
        }

        this.initialListSize = this.props.pageSize;

        //console.log('dataList',this.dataList);
        // console.log('height',this.height);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.dataList),
            isLoading: false,
            refreshing:false,
            isEmpty:isEmpty,
            hasMore: hasMore
        });
    }

    /**
     * 缓存加载完成
     */
    onCacheLoad = (data)=>{
        console.log('onCacheLoad',data);

        this.dataLoaded = data['dataLoaded'];
        if(this.props.onDataFirstLoad){
            this.props.onDataFirstLoad(data['dataLoaded'],true);
        }

        this.dataList = this.dataList.concat(data['list']);
        this.currentPage = data['currentPage'];
        let hasMore = data['hasMore'];
        let isEmpty = false;
        if(this.currentPage==1 && data['list'].length==0){
            isEmpty = true;
            console.log('isEmpty',isEmpty)
        }
        this.initialListSize = this.dataList.length;
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.dataList),
            hasMore: hasMore,
            isEmpty:isEmpty
        });
    }

    /***
     * 加载更多
     */
    onEndReached = (event) => {
        //console.log('onEndReached')
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading || !this.state.hasMore) {
            return;
        }
        this.loadData();
    }

    onRefresh = ()=>{
        this.refresh();
    }

    componentWillUnmount() {
        if (this.props.cache) this.saveState();
    }

    /**
     * 保存状态
     */
    saveState = () => {
        let saveData = {};
        saveData['list'] = this.dataList;
        saveData['dataLoaded'] = this.dataLoaded;
        saveData['currentPage'] = this.currentPage;
        saveData['hasMore'] = this.state.hasMore;
        saveData['scrollPosition'] = ReactDOM.findDOMNode(this.scrollView).scrollTop;
        sessionStorageUtil.save(this.cacheKey, saveData);
    }

    /**
     * 绘制行
     * @param rowData
     * @param sectionID
     * @param rowID
     * @param highlightRow
     * @returns {*}
     */
    renderRow = (rowData, sectionID, rowID, highlightRow) => {
        return (<div key={rowID} style={{width: 100 / this.props.columns + '%'}}>
            {this.props.renderRow(rowData, sectionID, rowID, highlightRow)}
        </div>);
    }

    /**
     * 绘制头部
     */
    renderHeader = ()=>{
        if(this.props.renderHeader && this.dataLoaded){
            return this.props.renderHeader(this.dataLoaded);
        }
    }


    render() {
        const row = (rowData, sectionID, rowID) => {
            return <div>rowID</div>;
        }
        return (
            <ListView
                ref={el => this.scrollView = el}
                initialListSize = {this.initialListSize}
                style={this.props.style}
                className={styles.myList}
                dataSource={this.state.dataSource}
                renderHeader={this.renderHeader}
                renderFooter={() => (<Foot isLoading = {this.state.isLoading} isEmpty = {this.state.isEmpty} />)}
                renderSectionHeader={this.props.renderSectionHeader}
                renderRow={this.renderRow}
                renderSeparator={this.props.renderSeparator}
                pageSize={this.props.pageSize}
                onScroll={this.scrollHandler}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
                pullToRefresh={this.props.enablePullToRefresh && <PullToRefresh
                    distanceToRefresh = {60}
                    refreshing={false}
                    onRefresh={this.onRefresh}
                />}
            />
        );
    }

}

DateListView.propTypes = propTypes;
DateListView.defaultProps = defaultProps;
