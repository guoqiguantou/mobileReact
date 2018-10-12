import React from 'react';
import { SwipeAction } from 'antd-mobile';
import PropTypes from "prop-types";
import style from './style/index.scss';


/**
 * 列表行滑动
 */
const propTypes = {

    /**
     * 展示哪些字段
     */
    showField: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),

    /**
     * 行数据源
     */
    rowData: PropTypes.object,

    /**
     * 行数据ID
     */
    rowID: PropTypes.string,

    /**
     * 行删除闭包
     */
    delfunction: PropTypes.func,

};

/***
 * 支持滑动的列表行组件
 */
export default class List extends React.Component {

    constructor(props){
        super(props);
    }

    render() {

        return (
            <SwipeAction
                style={{backgroundColor: 'gray'}}
                autoClose
                right={[
                    {
                        text: '取消',
                        //onPress: () => console.log('cancel'),
                        style: {backgroundColor: '#ddd', color: 'white', width: "5rem"},
                    },
                    {
                        text: '删除',
                        onPress: this.props.delfunction,
                        style: {backgroundColor: '#F4333C', color: 'white', width: "5rem"},
                    },
                ]}
                onOpen={() => {
                }}
                onClose={() => {
                }}
            >

                <div className={style.box}>
                    <div className={style.left}>
                        <div>
                            <p className={style.stime}>{this.props.rowData.dstarttime}</p>
                            <p className={style.etime}>{this.props.rowData.dendtime}</p>
                        </div>
                    </div>
                    <div className={style.icon}>·</div>
                    <div className={style.content}>
                        {this.props.rowData.sname}
                    </div>
                </div>
            </SwipeAction>
        );
    }
}

List.propTypes = propTypes;
