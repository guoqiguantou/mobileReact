import React from 'react';
import ajaxUtil from './../../utils/ajaxUtil';
import BtnGroup from './../../components/common/BtnGroup/index';

/****工作流-审批按钮组件****/
export class Spbtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            btnval: null//按钮数组
        }
    }

    componentDidMount() {}

    //获取单据明细页传递过来的业务号和单据号
    componentWillReceiveProps(props) {
        //alert("props.billinfo.indoctypeid"+props.billinfo.indoctypeid)
        let sendQxdata = { "doctypeid": props.billinfo.indoctypeid, "billid": props.billinfo.billid, "access_token": localStorage.getItem("LUCK_AUT") };
        if (props.billinfo.indoctypeid != "" && props.billinfo.indoctypeid != null && props.billinfo.indoctypeid != undefined) {
            this.loadUserqx(sendQxdata);
        }

    }

    //判断用户是否有该单据的审批权限
    loadUserqx = (data) => {
        ajaxUtil.get(__apiRoot + '/common/wap/flow/auth', data, (err, res) => {
            console.log("senddata", data);
            if (!err) {
                console.log(res.body);
                this.setState({
                    btnval: res.body
                })
            }
        });
    }

    //按钮点击事件
    onClick = (btnid) => {
        window.app.router.history.push('/workflow?doctypeid=' + this.props.billinfo.indoctypeid + '&billid=' + this.props.billinfo.billid + '&btnid=' + btnid);
    }

    render() {
        let btnval = this.state.btnval;
        return (
            <div>
                {btnval && (
                    <BtnGroup data={btnval} idVarName="btnkey" valueVarName="value" onBtnClick={this.onClick} />
                )}
            </div>
        );
    }



}