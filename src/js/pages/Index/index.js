import React from 'react';
import ajaxUtil from '../../utils/ajaxUtil';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { Carousel, NavBar, Icon ,Button } from 'antd-mobile';
import Login from '../Login'
import Usual from '../Usual'
export default class Index extends React.Component {
    static contextTypes = {
        themeColor: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            imgHeight: 176,
        }

    }

    componentDidMount() {
        console.log(this.context.themeColor);
        // ajaxUtil.load(`./2.json`, (err, res) => {
        //     if (!err) {
        //         console.log(111,res);
        //
        //     }
        // })
    }

    componentWillUnmount() {

    }
    onChange = (val) => {
        console.log(val);
    }
    render() {
        const data = [
            { value: 0, label: 'Ph.D.' },
            { value: 1, label: 'Bachelor' },
            { value: 2, label: 'College diploma' },
        ];
        return (
            <div>
                <NavBar
                    mode="dark"
                    leftContent="Back"
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >NavBar</NavBar>
                <Login></Login>
                <Usual></Usual>


                <div>

                    <ul>
                        <li><Link to='/listTest'>通用列表测试</Link></li>
                        <li><Link to='/pageTest'>通用页面控件测试</Link></li>
                        <li><Link to='/multListTest'>3测试</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}

