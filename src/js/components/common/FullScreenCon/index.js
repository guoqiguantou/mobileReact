import React from 'react';
import styles from './style/index.scss';

/**
 * 占满全屏组件
 */
export default class FullScreenCon extends React.Component {

    render(){
        return(
            <div className={styles.fullScreen}>
                {this.props.children}
            </div>
        );
    }
}
