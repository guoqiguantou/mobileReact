import React from 'react';
import {Flex} from 'antd-mobile';
import styles from './style/index.scss';
import PropTypes from 'prop-types';

const propTypes = {
    /**
     * 按钮数组
     * 支持['确定','取消'，…]，[{id:'confrim',name:'确认'},{id:'cancel',name:'取消'}，…] 两种格式
     */
    data: PropTypes.array,
    /**
     * 点击事件
     * (key,name,item)=>{}
     */
    onBtnClick: PropTypes.func,
    /**
     * 标识数据项名称
     */
    idVarName:PropTypes.string,
    /**
     * 值数据项名称
     */
    valueVarName:PropTypes.string
};

const defaultProps = {
    idVarName:'id',
    valueVarName:'name'
}

/**
 * 底部按钮组控件
 */
export default class BtnGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    clickHandler = (key,name) => {
        if(this.props.onBtnClick){
            this.props.onBtnClick(key,name);
        }
    }

    render() {
        const {data,idVarName,valueVarName} = this.props;
        return (
            <div className={styles.btnGroup}>
                <Flex>
                    {
                        data.map((value, index) => {

                            let key;
                            let name;
                            if (typeof(value) == 'string') {
                                key = index;
                                name = value;
                            }
                            else {
                                key = value[idVarName];
                                name = value[valueVarName];
                            }

                            return (
                                <Flex.Item key={key}>
                                    <button onClick={this.clickHandler.bind(this, key, name, value)}>{name}</button>
                                    <span/>
                                </Flex.Item>
                            )
                        })
                    }
                </Flex>
            </div>

        );
    }
}

BtnGroup.propTypes = propTypes;
BtnGroup.defaultProps= defaultProps;
