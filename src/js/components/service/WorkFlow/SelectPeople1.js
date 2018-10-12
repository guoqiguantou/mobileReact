import React from 'react';
import ReactDOM from 'react-dom';
import { Icon } from 'antd-mobile';
import { AddpeopleBtn } from './AddPeoplebtn';
import Signal from './SignalObj';


//工作流界面-选择下一步处理人（审批人）
export class SelectPeople1 extends React.Component {
    constructor(props) {
        //    alert(3);
        super(props);
        this.state = {
            peopleall: null,//用户全部信息列表
            clickstate: null,//添加功能是否可用
            uservalue: null,//人员选择屏选择的审批人
            userData: null,//默认显示的审批人
            id: 1,//监听state变化重绘组件
            peopleHeight: 0//计算出来的组件高度
        }
        Signal.started.add(this.onStarted);//获取从步骤选择框传递过来的步骤id
        Signal.select.add(this.onSelect);//获取从通讯录获取到的选择的人员信息

    }

    componentDidMount() {
        this.calculateHeight();
    }

    componentWillReceiveProps() {
        this.parentRender = true;
    }

    //获取从index.js传递过来的参数
    getpeopleinfo = (data) => {
        console.log("审批人组件", data.fix.clickstates);
        this.setState({
            clickstate: data.fix.clickstates,
            peopleall: data.detail,
            userData: data.detail[0].peoplelist
        });
    }

    componentDidUpdate() {
        // console.log("this.state.userData",this.state.userData)
        //将选择好的审批人传递到提交按钮组件中
        Signal.sendpeople.dispatch(this.state.userData);
        if (this.parentRender) {
            this.parentRender = false;
            this.calculateHeight();
        }
    }
    /**
     * 重新计算添加审批人高度
     */
    calculateHeight() {
        let height = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.people).offsetTop - 295;
        this.setState({ peopleHeight: height })
    }
    //获取从下一步步骤id
    onStarted = (stepid) => {
        //console.log('onStarted', this.state.peopleall);
        let peoplelist = [];
        if (this.state.peopleall != "" && this.state.peopleall != null && this.state.peopleall != undefined && this.state.peopleall.length >= 1) {
            for (var i in this.state.peopleall) {
                // alert(this.state.peopleall[i].stepval);
                if (stepid == this.state.peopleall[i].stepval) {
                    peoplelist = this.state.peopleall[i];
                }
            }
            //console.log("peoplelist",peoplelist.peoplelist);
            //this.state.userData = peoplelist.peoplelist;
            this.setState({
                userData: peoplelist.peoplelist
            })
        }
        console.log("onStartedBBBBBBBBBBBB", peoplelist.peoplelist);
    }
    //人员选择(打开人员选择页)
    onSelect = (param4) => {
        // console.log("param4",param4);
        //数组去重
        if (this.state.userData != "") {
            let userid = [];
            for (var i in this.state.userData) {
                userid.push(Number(this.state.userData[i].id));
            }
            console.log("userid", userid);
            if (userid.indexOf(param4.id) == -1) {
                this.state.userData.push(param4);
            }
        } else {
            this.state.userData.push(param4);
        }
        console.log("onSelectAAAAAAAAAAAAAAA", this.state.userData);
    }

    //点击用户头像删除用户信息
    onClick = (event) => {
        console.log(event.target.getAttribute("name"))
        this.state.userData.splice(event.target.getAttribute("name"), 1);
        this.setState({
            id: this.state.id++
        })
    }

    render() {
        console.log("rrrrRRRRRRRRR11", this.state.userData);
        //alert(this.state.clickstate);
        const clickstate = this.state.clickstate;
        const titlep = <p>审批人</p>;
        return (
            <div className='listitems2' ref={el => this.people = el} style={{ height: this.state.peopleHeight }}>
                <p>{clickstate ? "驳回不可选择审批人" : "审批人"}</p>
                <div className='peopleList'>
                    {this.state.userData &&
                        this.state.userData.map(function (data, i) {
                            let userimg = "";
                            if (data.imgurl != "" && data.imgurl != null) {
                                userimg = "url(" + data.imgurl + ")";
                            } else {
                                userimg = "url(../../../images/photo.png)";
                            }
                            console.log("heheh", data);
                            return (
                                //用户头像开始
                                <div key={data.id}>
                                    <div className='peoplecon'>
                                        <div className="peopleimg" style={{ backgroundImage: userimg }} name={i} onClick={this.onClick}>
                                            <Icon className="delPeople" name={i} type="cross" />
                                        </div>
                                        <div style={{ fontSize: '14px', textAlign: 'center', margin: 'auto', marginTop: '5px' }}>{data.name}</div>
                                    </div>
                                </div>
                                //用户头像结束
                            )
                        }, this)
                    }
                    {/*根据传递过来的按钮状态，判断是否显示添加审批人按钮组件*/}
                    {clickstate ? "" : <AddpeopleBtn />}

                </div>
            </div>
        );
    }
}

