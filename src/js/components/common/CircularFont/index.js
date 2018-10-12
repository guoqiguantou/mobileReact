import React from 'react';
import styles from './style/index.scss';
import PropTypes from 'prop-types';

const propTypes = {
    /**
     * 字体颜色
     */
    fontColor: PropTypes.string,
    /**
     * 圆形颜色
     */
    color:PropTypes.string,
};

const defaultProps = {
    fontColor:'#ffffff',
    color:'#108ee9'
}

/***
 * 圆形文字图标组件
 */
export default function CustomIcon (props){
    const {fontColor,color,children} = props;
    return <span style={{backgroundColor:color,color:fontColor}} className={styles.circularFont}>{children}</span>;
}

CustomIcon.propTypes = propTypes;
CustomIcon.defaultProps = defaultProps;
