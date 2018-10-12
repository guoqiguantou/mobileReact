import React from 'react';
import Page from '../components/common/Page';
import MultipleSelectDataListView from '../components/common/MultipleSelectDataListView';

/**
 * 通用列表DEMO
 */
export default class MultListTest extends React.Component {

    constructor(props) {
        super(props);
        this.selectStatus = false
    }


    renderRow = (rowData, sectionID, rowID, highlightRow) => {
        // console.log('renderRow',rowData);
        return (
            <div style={{padding: 20, border: '1px #999999 solid', height: 300}}>
                <div>{rowData.id}</div>
                <div>{rowData.text}</div>
                <div>{rowData.price}</div>
            </div>

        );
    }


    onCellClick = (data, index)=> {
        console.log('onCellClick', data, index)
    }

    changeSelectStatus = ()=> {
        this.refs.multList.changeSelectStatus(!this.selectStatus)
    }

    onConfirmSelectClick = (data)=> {
        console.log('onConfirmSelectClick', data)
    }

    /**
     * 第一页数据加载
     * @param data
     * @param isCache
     */
    onDataFirstLoad = (data,isCache)=>{
        console.log('onDataFirstLoad',data,isCache);
    }

    /**
     * Header绘制
     * @param data
     * @returns {*}
     */
    renderHeader = (data)=>{
        return <div style={{height: 100}} onClick={this.changeSelectStatus}>
            {data.total}
        </div>
    }

    render() {
        return (<Page title="列表Demo" wrapScollView={false}>
            <MultipleSelectDataListView
                ref='multList'
                renderHeader={this.renderHeader}
                dataUrl={`https://www.easy-mock.com/mock/5b964044e3f68a2002edff94/example/cat`}
                onConfirmSelectClick={this.onConfirmSelectClick}
                onCellClick={this.onCellClick}
                renderRow={this.renderRow}/>
        </Page>)
    }
}