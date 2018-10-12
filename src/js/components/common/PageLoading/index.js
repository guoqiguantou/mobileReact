import React from 'react';
import {ActivityIndicator} from 'antd-mobile';
import styles from './style/index.scss';
import PropTypes from 'prop-types';

const propTypes = {
    /**
     * 超时提示
     */
    timeOutInfo: PropTypes.string,
    /**
     * 加载提示
     */
    loadInfo: PropTypes.string,
    /**
     * 错误提示
     */
    errInfo: PropTypes.string,
}

const defaultProps = {
    timeOutInfo:'页面加载超时!',
    loadInfo:'页面加载中…',
    errInfo:'错误! 页面加载失败！'
}


/***
 * 路由按需加载Loading
 */
export default function PageLoading(props) {
    const {isLoading,timedOut,pastDelay,error,timeOutInfo,loadInfo,errInfo} = props;
    if (isLoading) {
        if (timedOut) {
            return <div className={styles.loadCon}>{timeOutInfo}</div>;
        } else if (pastDelay) {
            return <div className={styles.loadCon}><ActivityIndicator text={loadInfo}/></div>;
        } else {
            return null;
        }
    } else if (error) {
        return <div className={styles.loadCon}>{errInfo}</div>;
    } else {
        return null;
    }
}

PageLoading.propTypes = propTypes;
PageLoading.defaultProps = defaultProps;

