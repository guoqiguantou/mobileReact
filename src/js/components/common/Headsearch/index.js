import React from 'react';
import PropTypes from "prop-types";
import styles from './style/index.scss'
import {Picker, List} from 'antd-mobile';

/**
 * 头部搜索组件
 */
const propTypes = {
    /**
     * 类别
     */
    category: PropTypes.number,

    /**
     * 年份
     */
    year: PropTypes.array,
};

const defaultProps = {
    category: 1,
    year: ['2018'],
};
let myDate = new Date();//获取系统当前时间
let newyear = myDate.getFullYear() + 1;

export default class Headsearch extends React.Component {

    constructor(props) {
        super(props);
        this.categoryarr = ['食品', '药品', '化妆品', '医疗器械'];
        this.yeararr = [[]];
        for (let i = 0; i < newyear - 2016; i++) {
            this.yeararr[0].push({
                label: `${newyear - i}年`,
                value: `${newyear - i}`
            });
        }
    }

    render() {
        let category = this.props.category;
        let year = this.props.year;
        return (
            <div className={styles.header}>
                <div className={styles.headertext}>
                    <p>马鞍山市食品药品监督管理局</p>
                </div>
                <div className={styles.category}>
                    <ul>
                        {
                            this.categoryarr.map((val, index) =>
                                <li key={index} className={`${index == category - 1 ? styles.active : ''}`}
                                    onClick={() => this.props.categoryfunc(index + 1)}>
                                    <a href="javascript:;">{val}</a>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className={styles.year}>
                    <Picker
                        data={this.yeararr}
                        title="选择年份"
                        cascade={false}
                        extra="请选择(可选)"
                        value={this.props.year}
                        onOk={(v) => this.props.yearfunc(v)}
                    >
                        <List.Item></List.Item>
                    </Picker>
                </div>
            </div>
        );
    }
}

Headsearch.propTypes = propTypes;
Headsearch.defaultProps = defaultProps;