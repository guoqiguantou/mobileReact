import React from 'react';
import {Result} from 'antd-mobile';

/**
 * 列表底部组件
 */
export default function Foot(props) {

    let info;
    if (props.isEmpty) {
        info = '暂无数据';
    }
    else if(props.isLoading){
        info = '加载中...';
    }
    else {
        info = '已加载完毕';
    }

    return <div style={{padding: 30, textAlign: 'center'}}>
        {info}
    </div>;
}
