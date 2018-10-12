import React from 'react'
import Page from '../components/common/Page'
import {Link} from "react-router-dom";
import DataListView from "../components/common/DataListView";

/**
 * 通用列表DEMO
 */
export default class ListTest extends React.Component {




    renderRow = (rowData, sectionID, rowID, highlightRow) => {
        //console.log('renderRow',rowData);
        return (
            <div style={{padding: 20, border: '1px #999999 solid', height: 300}}>
                <Link to='/hello'>
                    <div>{rowData.id}</div>
                    <div>{rowData.text}</div>
                    <div>{rowData.price}</div>
                </Link>
            </div>

        );
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
        return <div style={{height: 100}}>
            {data.total}11111111111
        </div>
    }

    render() {
        return (<Page title="列表Demo" wrapScollView={false}>
            <DataListView onDataFirstLoad={this.onDataFirstLoad} columns={2} renderHeader={this.renderHeader}
                          dataUrl={`https://www.easy-mock.com/mock/5b964044e3f68a2002edff94/example/cat`} renderRow={this.renderRow} listVarName={'goodlista'}/>
        </Page>)
    }
}