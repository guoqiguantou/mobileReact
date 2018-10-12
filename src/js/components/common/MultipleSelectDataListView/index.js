import React from 'react';
import PropTypes from 'prop-types';
import styles from './style/index.scss';
import DateListView from '../DataListView';
import { Map } from "immutable";
import sessionStorageUtil from "../../../utils/sessionStorageUtil";
import {Card, Button, Checkbox} from 'antd-mobile';

const propTypes = {
    /**
     * 数据接口路径
     */
    dataUrl: PropTypes.string.isRequired,

    /**
     * 每页行数
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
     *    从数据源(data source)中接受一条数据，以及它和它所在section的ID。返回一个可渲染的组件来为这行数据进行渲染。默认情况下参数中的数据就是放进数据源中的数据本身，不过也可以提供一些转换器。如果某一行正在被高亮（通过调用highlightRow函数），ListView会得到相应的通知。
     *    (rowData, sectionID, rowID, highlightRow) => renderable
     */
    renderRow: PropTypes.func.isRequired,

    /**
     * 列表头部渲染函数
     */
    renderHeader: PropTypes.func,

    /**
     * 列表底部渲染函数
     */
    renderFooter: PropTypes.func,

    /**
     * 如果提供了此函数，会为每个小节(section)渲染一个标题
     * (sectionData, sectionID) => renderable
     */
    renderSectionHeader: PropTypes.func,

    /**
     * 如果提供了此属性，一个可渲染的组件会被渲染在每一行下面，除了小节标题的前面的最后一行。在其上方的小节ID和行ID，以及邻近的行是否被高亮会作为参数传递进来。
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
    /**
     * 存储多选结果的key
     */
    storageKey: PropTypes.string,
    /**
     * 确定选择回调
     */
    onConfirmSelectClick: PropTypes.func,
    /**
     * cell点击事件，不建议使用<Link>标签进行跳转，防止在选择情况下可以点击cell
     */
    onCellClick: PropTypes.func,
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

/***
 * 支持多选的多选组件
 */
export default class MultipleSelectDataListView extends React.Component {

    constructor(props) {
        super(props);
        let _selectItems = new Map();
        let temp;
        if (this.props.storageKey) {
            temp = sessionStorageUtil.read(this.props.storageKey);
            if (temp) {
                for (let key in temp) {
                    _selectItems = _selectItems.set(key, temp[key]);
                }
            }
        }
        this.state = {
            canSelect: temp ? true : false,
            selectItems: _selectItems,
        }
    }

    /**
     * 设置可选状态
     * @param status true：可以多选 false：不可以多选
     */
    changeSelectStatus = (status)=> {
        this.setState({
            canSelect: status,
            selectItems: this.state.selectItems.clear()
        })
    }


    /**
     * 多选事件
     * @param rowData
     * @param rowID
     * @param e
     */
    onCheckChange = (rowData, rowID, e)=> {
        if (e.target.checked) {
            this.setState({
                selectItems: this.state.selectItems.set(rowID, rowData)
            })
        } else {
            this.setState({
                selectItems: this.state.selectItems.delete(rowID)
            })
        }
    }


    /**
     * cell点击事件
     * @param rowData
     * @param rowID
     */
    onCardClick = (rowData, rowID)=> {
        if (this.state.canSelect) {
            if (this.state.selectItems.get(rowID)) {
                this.setState({
                    selectItems: this.state.selectItems.delete(rowID)
                })
            } else {
                this.setState({
                    selectItems: this.state.selectItems.set(rowID, rowData)
                })
            }
        } else {
            if (this.props.onCellClick) {
                this.props.onCellClick(rowData, rowID);
            }
        }
    }

    /**
     * 清除存储数据
     */
    cleanStorage = ()=> {
        sessionStorageUtil.remove(this.props.storageKey)
    }

    bottomBtnClick = (index)=> {
        switch (index) {
            case 0:
                //取消全选
                this.setState({
                    selectItems: this.state.selectItems.clear()
                })
                break;
            case 1:
                //全选
                let temp = this.state.selectItems.clear();
                for(let index in this.refs.muilSelectList.getDataSource()) {
                    temp = temp.set(index, this.refs.muilSelectList.getDataSource()[index])
                }
                this.setState({
                    selectItems: temp
                })
                break;
            case 2:
                //确定
                if (this.props.storageKey) {
                    sessionStorageUtil.save(this.props.storageKey, this.state.selectItems);
                }
                if (this.props.onConfirmSelectClick) {
                    this.props.onConfirmSelectClick(this.state.selectItems)
                }
                this.setState({
                    canSelect: false,
                    selectItems: this.state.selectItems.clear()
                })
                break
        }
    }

    renderRow = (rowData, sectionID, rowID, highlightRow)=> {
        return (
            <Card full className={styles.myCard} onClick={this.onCardClick.bind(null, rowData, rowID)}>
                {this.state.canSelect ?
                    <Card.Header extra={<Checkbox key={'card' + rowID} checked={this.state.selectItems.get(rowID) ? true : false} onChange={this.onCheckChange.bind(null, rowData, rowID)}/>}/> : null}
                <Card.Body>
                    {this.props.renderRow(rowData, sectionID, rowID, highlightRow)}
                </Card.Body>
            </Card>
        )
    }

    render() {
        return (
            <div style={this.state.canSelect ? {paddingBottom:'44px'} : {}} className={styles.listContent}>
                <DateListView
                    ref="muilSelectList"
                    dataUrl={this.props.dataUrl}
                    pageSize={this.props.pageSize}
                    style={this.props.style}
                    enablePullToRefresh={this.props.enablePullToRefresh}
                    renderRow={this.renderRow}
                    renderHeader={this.props.renderHeader}
                    renderFooter={this.props.renderFooter}
                    renderSectionHeader={this.props.renderSectionHeader}
                    renderSeparator={this.props.renderSeparator}
                    scrollHandler={this.props.scrollHandler}
                    onDataFirstLoad={this.props.onDataFirstLoad}
                    listVarName={this.props.listVarName}
                    totalVarName={this.props.totalVarName}
                    pageParamName={this.props.pageParamName}
                    pageSizeParamName={this.props.pageSizeParamName}
                    cache={this.props.cache}
                    cacheKey={this.props.cacheKey}
                    autoLoad={this.props.autoLoad}
                    columns={this.props.columns}
                />
                <div className={styles.bottomBtnLayout + ' ' + (this.state.canSelect ? styles.show : '')}>
                    <Button type="warning" size="small" className={styles.bottomBtn} onClick={this.bottomBtnClick.bind(null, 0)}>取消全选</Button>
                    <Button type="warning" size="small" className={styles.bottomBtn} onClick={this.bottomBtnClick.bind(null, 1)}>全选当前页</Button>
                    <Button type="primary" size="small" className={styles.bottomBtn} onClick={this.bottomBtnClick.bind(null, 2)}>确定</Button>
                </div>
            </div>
        )
    }
}

MultipleSelectDataListView.propTypes = propTypes;
MultipleSelectDataListView.defaultProps = defaultProps;
