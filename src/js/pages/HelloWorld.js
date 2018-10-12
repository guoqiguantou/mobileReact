import React from 'react';
import {Link} from 'react-router-dom';

/**
 * Hello World
 */
export default class HelloWorld extends React.Component {



    render() {
        return (<div>
            <ul>
                <li><Link to='/listTest'>通用列表测试</Link></li>
                <li><Link to='/pageTest'>通用页面控件测试</Link></li>
                <li><Link to='/multListTest'>3测试</Link></li>
            </ul>
        </div>);
    }
}