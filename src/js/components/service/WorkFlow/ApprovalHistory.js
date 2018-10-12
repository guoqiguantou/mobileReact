import React from 'react';
import {Accordion, Steps} from 'antd-mobile';
import styles from './style/approvalHistory.scss';
import ajaxUtil from './../../utils/ajaxUtil';

const Step = Steps.Step;

//自定义步骤条左侧icon
const spicon = () => (
    <svg width="30" height="30" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22.19" cy="22.19" r="15" fill="#6495ED" stroke="#6495ED" transform="matrix(0.9309999,0,0,0.9489999,-5.601284,-5.989)" xmlns="http://www.w3.org/2000/svg" />
        <ellipse cx="20.88" cy="16.75" rx="0" ry="0" fill="#FFFFFF" stroke="#000000" />
        <text x="7.375" y="11.25" fontFamily="Microsoft YaHei UI" fontSize="12" fill="#FFFFFF" stroke="#FFFFFF" transform="matrix(1.284,0,0,1.248,-2.059022,6.220247)" strokeWidth="0.25" xmlns="http://www.w3.org/2000/svg">
            审</text>
        <text x="16.25" y="12.625" fontFamily="Microsoft YaHei UI" fontSize="12" fill="#FFFFFF" stroke="#FFFFFF" baselineShift="baseline" xmlns="http://www.w3.org/2000/svg">
        </text>
    </svg>

)

/***审批历史组件(审批历史步骤条)****/
export class ApprovalHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctypeid: null,//业务号
            billid: null,//单据号
            historyListData: null,//审批历史列表数据
            btnval: null//按钮
        }

    }
    componentWillReceiveProps(props) {
        //获取从单据明细页传递过来的业务号和单据号
        let senddata = { "doctypeid": props.billinfo.indoctypeid, "billid": props.billinfo.billid };
        this.loadspHistory(senddata);
    }

    //加载审批历史数据
    loadspHistory = (data) => {
        // alert(JSON.stringify(data));
        ajaxUtil.get(__apiRoot + '/bpm/getFlowHisLog.html', data, (err, res) => {
            // ajaxUtil.get(__apiRoot + '../../js/pages/workflow/demo.json', data, (err, res) => {
            if (!err) {
                console.log(res.body);
                //将ajax获取到的数据存入historyListData中,重绘列表组件
                this.setState({
                    historyListData: res.body.content
                })
            }
        });

    }

    //折叠面板onChange事件 
    onChange = (key) => {
        console.log(key);
    }


    render() {
        let historyListData = this.state.historyListData;
        //console.log("111", btnval);
        return (
            <Accordion defaultActiveKey="0" className={styles.spls2} onChange={this.onChange}>
                <Accordion.Panel header="审批历史">
                    <Steps current={1} className="splistcon">
                        {historyListData && (historyListData.map(function (data1, i) {
                            // alert(data1.stepid);
                            return (
                                <Step key={"data1" + i} status="wait" title={"步骤名称：" + data1.stepnm} icon={spicon()}
                                    description={
                                        data1.bpmFlowHisLogopers && (data1.bpmFlowHisLogopers.map(function (data2, j) {
                                            //判断签名图片是否存在
                                            let imgsrc;
                                            if (data2.operphoto != "" && data2.operphoto != null && data2.operphoto != undefined) {
                                                imgsrc = <img src={data2.operphoto} style={{ padding: "5px 0", width: "100%", height: "5em", display: "inline-block" }} />;
                                            }
                                            return (
                                                <div key={"data2" + j} className="sprlist">
                                                    <div className="sprlistcon">
                                                        <p>
                                                            <span>{data2.opernm}</span>
                                                            <span style={{ color: "darkslategray", paddingLeft: "15px" }}>{data2.operflag}</span>
                                                        </p>
                                                        <p>
                                                            <span>意见：</span>
                                                            <span style={{ color: "darkslategray" }}>{data2.operadvice}</span>
                                                        </p>
                                                        <p style={{ color: "#958997" }}>{data2.showThdate}</p>
                                                    </div>
                                                    <div style={{ width: "48%", height: "auto", float: "right" }}>
                                                        {imgsrc}
                                                    </div>
                                                </div>
                                            );
                                        }))
                                    }
                                />)
                            //data1 return结束
                        })
                            //data1循环结束   
                        )}
                        {/*historyListData结束*/}
                    </Steps>
                </Accordion.Panel>
            </Accordion>
        );
    }
}
