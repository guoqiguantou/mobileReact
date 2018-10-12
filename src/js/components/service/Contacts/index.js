import React from 'react';
import {List, SearchBar} from 'antd-mobile';
import Loadable from 'react-loadable';
import PageLoading from '../../components/common/PageLoading';
import styles from './style/index.scss';
import DataListView from '../../components/common/DataListView';
import Page from '../../components/common/Page';
import Signal from './../WorkFlow/SignalObj';

/**
 * 通讯录首页
 */
const Item = List.Item;
const Brief = Item.Brief;
export default class Contacts extends React.Component {
    constructor(props) {
        //console.log('props')
        super(props);
        this.his = [];
        this.state = {
            selectedTab: 'branch',
            hidden: false,
            ajax: `${__apiRoot}/common/wap/deptlist.json?`,
            group: 'deptid=',
            did: '10',
            hou: '',
            data: [
                {
                    group: '马鞍山经济技术开发区',
                    way: '10'
                }
            ],
            value: '',
            test: []
        };
    }

    componentDidMount(){
        //console.log('componentDidMount')
        window.addEventListener('popstate', this.backHandler);
    }

    componentWillUnmount(){
        //console.log('componentWillUnmount')
        window.removeEventListener('popstate', this.backHandler);

        if(this.his.length>0){
            window.app.router.history.go(-1);
        }
    }

    backHandler = ()=>{
        //console.log('backHandler')
        if(this.his.length>0){
            this.state.data.pop();
            this.ajaxUrl  = this.his.pop();
            //console.log('backHandler',this.ajaxUrl);
            if(this.his.length>0) history.pushState({}, null);
            this.isBack = true;
            this.forceUpdate();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        ////console.log('componentDidUpdate',prevState)
    }

    componentWillUpdate(nextProps, nextState){
        //console.log('componentWillUpdate',window.history.state);
        if(!this.isBack){
            this.hisProcess(nextProps,nextState);
            this.ajaxUrl = this.getDataUrl(nextState);
        }
        this.isBack = false;
    }

    /**
     * 历史处理
     */
    hisProcess(nextProps,nextState){
        if(nextState!=this.state){
            let nextUrl = this.getDataUrl(nextState);
            let index  = this.his.indexOf(nextUrl);
            if(index==-1){
                if(this.his.length==0) history.pushState({}, null);
                this.his.push(this.ajaxUrl);
            }
            else {
                let len = this.his.length;
                this.his.splice(index,len-index);
                if(this.his.length==0){
                    window.history.go(-1);
                }
            }
        }
    }

    componentWillReceiveProps() {
        //console.log('componentWillReceiveProps');
    }


    componentWillMount() {
        //console.log('componentWillMount');
        this.ajaxUrl = this.getDataUrl(this.state);
    }
    // ajax请求地址
    getDataUrl(state){
        //console.log('getDataUrl');
        return state.ajax + state.group + state.did + state.hou;
    }

    onTabChange(tabKey) {
        //console.log('onTabChange')
        this.setState({
            selectedTab: tabKey
        });
    }
    // 人选选择点击人员事件
    off = (imageUrl,name, id) => {
        //console.log('name',imageUrl,name,id)
        if(imageUrl==''||imageUrl==null){
            Signal.select.dispatch({
                imgurl: '',
                name: name,
                id: id

            });
        }else{
            Signal.select.dispatch({
                imgurl: imageUrl,
                name: name,
                id: id

            });
        }
    }
    // 内容加载
    renderRow = (rowData, sectionID, rowID, highlightRow) => {
        //console.log('renderRow', rowData);
        //console.log(rowData.code);
        // 判断是人员还是部门
        if (rowData.code == 'sysuser') {
            if (rowData.sphoto == '' || rowData.sphoto == null) {
                return (
                    <Item thumb="images/photo.png" multipleLine className={styles.item} key={rowID} onClick={this.off.bind(this,rowData.sphoto, rowData.sname, rowData.indocno)}>
                        {rowData.sname}<span className={styles.job}>{rowData.position}</span> <Brief>{rowData.telphone}</Brief>
                    </Item>
                );
            } else {
                return (
                    <Item thumb={rowData.sphoto} multipleLine className={styles.item} key={rowID} onClick={this.off.bind(this,rowData.sphoto, rowData.sname, rowData.indocno)}>
                        {rowData.sname}<span className={styles.job}>{rowData.position}</span> <Brief>{rowData.telphone}</Brief>
                    </Item>
                );
                //console.log('rowData.sphoto',rowData.sphoto)
            }
        } else {
            //console.log('部门')
            return (
                <Item arrow="horizontal" multipleLine>
                    <div onClick={this.handleClick.bind(this, rowData.indocno, rowData.sname)}>
                        {rowData.sname}
                    </div>
                </Item>
            )
        }
    }
    // 部门列表点击事件--加载
    handleClick(groupid, group, event) {
        //console.log('部门点击')
        this.setState({
            did: groupid
        });
        this.state.data.push({ group: group, way: groupid });
    }
    // 点击面包屑事件
    back = (event) => {
        //console.log('面包屑点击')
        this.setState({
            did: this.state.data[event.target.getAttribute("name")].way,
        });
        this.state.data.splice(event.target.getAttribute("name") + 1, 3);
    }
    // 监听搜索框的值
    handleChange = (val) => {
        // 判断是否是汉字
        // escape(str).indexOf( "%u" )<0
        const man = "searchkey=" + val;
        //console.log('diddidididdid', this.state.did)
        if (escape(val).lastIndexOf("%u") >= 0) {
            this.setState({
                hou: '&' + man,
                value: val
            });
            //console.log(111)
        } else {
            this.setState({
                hou: '',
                value: ''
            });
            //console.log(val);
        }
        // //console.log(event.target.value);
    }
    renderHeader = () => {
        //console.log('renderHeader')
        return (
            <div style={{ height: 90 }}>
                <SearchBar
                    className={styles.clear}
                    value={this.state.value}
                    onChange={this.handleChange}
                />
                <div>
                    <Item className={styles.crumbs}>
                        {this.state.data.map((_value, i) => { return (<div key={i} style={{}}><span style={{ marginRight: '0.5em', color: '#B7B7BC' }}>/</span><span name={i} onClick={this.back}>{this.state.data[i].group}</span></div>) })}
                    </Item>
                </div>
            </div>
        )
    };
    render() {
        return (
            <Page showNavBar={false} inTabBar={true} cacheKey="contacts_home" renderHeader={this.renderHeader}>
                <DataListView style={{ height: '100%' }} cacheKey={this.ajaxUrl} dataUrl={this.ajaxUrl} renderRow={this.renderRow} />
            </Page>
        )
    }
}
