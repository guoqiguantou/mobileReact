import React from 'react';
import ajaxUtil from '../../utils/ajaxUtil';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { Carousel, NavBar, Icon ,Button } from 'antd-mobile';

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


                <Carousel
                    autoplay={false}
                    infinite
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                >
                    {this.state.data.map(val => (
                        <a
                            key={val}
                            href="http://www.alipay.com"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>

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

