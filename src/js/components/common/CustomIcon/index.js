import React from 'react'
import styles from './style/index.scss'
import PropTypes from 'prop-types'


const propTypes = {
    /**
     * svg文件路径
     * 例：require('images/svg/app.svg')
     */
    path: PropTypes.string
    ,
    /**
     * 样式名
     */
    className: PropTypes.string,
    /**
     * 色值
     */
    color:PropTypes.string
};

/***
 * 自定义Icon组件
 */
export default function CustomIcon (props){
    return ( <svg
        className={`${styles.icon} ${props.className}`}
        color={props.color}
    >
        <use xlinkHref={props.path} />{/* svg-sprite-loader@0.3.x *!/*/}
        {/*<use xlinkHref={`#${props.path.default.id}`} />  /!* svg-sprite-loader@latest *!/*/}
    </svg>)
}


CustomIcon.propTypes = propTypes;