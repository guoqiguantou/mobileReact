import React from 'react';
import {Header} from './header';
import {Nextstep} from './SelectNextstep';
import {SelectPeople1} from './SelectPeople1';
import {Textarea} from './TextArea';
import {Twobutton} from './TwoButton';
import styles from './style/selectNextstep.scss';
import ajaxUtil from './../../utils/ajaxUtil';
// import { ApprovalHistory } from './ApprovalHistory';


//工作流主界面-index
export default class WorkflowLoad extends React.Component{
    constructor(props){
        super(props);
        this.state={
            steplist:null,//步骤选择列表
            btnclick:null,//记录按钮状态，将状态传递给Header组件
            stepnext_soperadvice:null//上一步骤选择人的意见
            // btnval:null,//按钮标识
            // pickerstates:null,//下一步是否可选
            // clickstates:null,//审批人添加按钮是否显示
            //nowstepid:null//当前步骤号

        }
    }
    //界面跳转后获取传过来的参数
    componentDidMount(){
        let url = location.search; //获取url中"?"符后的字串 ('?modFlag=business&role=1')  
        const theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1); //substr()方法返回从参数值开始到结束的字符串；  
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
            console.log('theRequest',theRequest); //此时的theRequest就是我们需要的参数

            //保存业务id和单据id
            // this.state.indoctypeid=theRequest.doctypeid;
            // this.state.billid=theRequest.billid; 
        }
       
        let basicinfo;//定义全局变量存储基础信息

        if(theRequest.btnid=="approvebtn"){
            basicinfo = {
                pickerstates:false,//选择器状态，是否可选，false可选，true不可选
                clickstates:false,//添加审批人按钮状态，是否隐藏，false可选，true不可选
                btnclick:"同意",//点击的按钮名称
                btnval:"0"//点击的按钮的key
           }
           
        }else if(theRequest.btnid=="overrulebtn"){
            basicinfo={
                pickerstates:true,
                clickstates:true,
                btnclick:"驳回",
                btnval:"1"
           }
        }else if(theRequest.btnid=="transferbtn"){
            basicinfo={
                pickerstates:true,
                clickstates:false,
                btnclick:"转交",
                btnval:"2"
           }
        }
         //执行获取步骤的ajax
         let stepUrl;//定义变量，根据点击的按钮调用不同的接口
         let sendData = { "doctypeid": theRequest.doctypeid, "billid": theRequest.billid, "access_token": localStorage.getItem("LUCK_AUT") }
         if(basicinfo.btnval=="0"){//同意接口
             stepUrl="getStepNext";
         }else if(basicinfo.btnval=="1"){//驳回接口
             stepUrl="getStepBack";
         }
        this.getStepinfo(stepUrl,sendData,basicinfo);

    }

    //获取当前步骤信息和下一步骤信息
    getStepinfo=(stepUrl,data,basicinfo)=>{
        ajaxUtil.get(__apiRoot + '/wap/bpm/'+stepUrl, data, (err, res) => {
            //ajaxUtil.get(__apiRoot + '../../js/pages/workflow/demo.json', data, (err, res) => {
            console.log("sendData", data);
            if (!err) {
            //console.log("resbody-all", res.body.steplistcon);
              console.log("resbody-all", res.body.content);
              let resultinfo = res.body.content;
             // let resultinfo = res.body.steplistcon
              let steplist=[];//存储步骤和用户列表
              let nextstep=[];
              if(resultinfo!="" && resultinfo!=null && resultinfo!=undefined && resultinfo.length>=1){
                  this.state.stepnext_soperadvice=resultinfo[0].stepnext_soperadvice;//上一步骤选择人的意见
                  let detailinfo=[];
                  let fixdinfo;
                  if(basicinfo.btnval=="0"){
                    fixdinfo={
                        "indoctypeid": data.doctypeid,//业务号
                        "billid":data.billid,//单据号
                        "stepnext_istepidprev":resultinfo[0].stepnext_istepidprev,//上一步步骤号
                        "stepnext_istepidcur":resultinfo[0].stepnext_istepidcur,//当前步骤号
                        "stepnext_sstepnmcur":resultinfo[0].stepnext_sstepnmcur,//当前步骤名称
                        "stepnext_ihicuridprev":resultinfo[0].stepnext_ihicuridprev,//审批历史主键值
                        "stepnext_soperadvice":resultinfo[0].stepnext_soperadvice,//上一步骤选择人的意见
                        "pickerstates":basicinfo.pickerstates,//下一步是否可选
                        "clickstates":basicinfo.clickstates,//审批人是否可选
                        "btnval":basicinfo.btnval//按钮标志：0,1
                    };
                    
                    for(var i in resultinfo){
                        let peoplelist = [];
                        let stepval = resultinfo[i].stepnext_istepidnext;
                        //将步骤信息修改格式存储在nextstep中
                        nextstep.push({"value": resultinfo[i].stepnext_istepidnext,
                            "label": resultinfo[i].stepnext_sstepnmnext});
                        
                        let userimgs=[],userids=[],usernames=[]
                        //取出用户头像
                        if(resultinfo[i].stepnext_soperphotos!=""){
                            userimgs=resultinfo[i].stepnext_soperphotos.split(",");
                        }
                        //取出用户id
                        if(resultinfo[i].stepnext_soperids!=""){
                            userids=resultinfo[i].stepnext_soperids.split(",");
                        }
                        
                        //取出用户名
                        if(resultinfo[i].stepnext_sopernms!=""){
                            usernames=resultinfo[i].stepnext_sopernms.split(",");
                        }
                       
                        //alert(userids.length)
                        //将用户id、用户名、用户头像存储在键值对中
                        if(userids!="" && userids!=null && userids.length>0){
                            for(var i in userids){
                                peoplelist.push({
                                    "imgurl":userimgs[i],
                                    "id":userids[i],
                                    "name":usernames[i]
                                })
                                }
                        }
                        detailinfo.push({stepval:stepval,peoplelist:peoplelist});
                          
                    }

                  }else if(basicinfo.btnval=="1"){//改字段
                    fixdinfo={
                        "indoctypeid": data.doctypeid,//业务号
                        "billid":data.billid,//单据号
                        "stepnext_istepidprev":resultinfo[0].stepnext_istepidprev,//上一步步骤号
                        "stepnext_istepidcur":resultinfo[0].stepnext_istepidcur,//当前步骤号
                        "stepnext_sstepnmcur":resultinfo[0].stepnext_sstepnmcur,//当前步骤名称
                        "stepnext_ihicuridprev":resultinfo[0].stepnext_ihicuridprev,//审批历史主键值
                        "stepnext_soperadvice":resultinfo[0].stepnext_soperadvice,//上一步骤选择人的意见
                        "pickerstates":basicinfo.pickerstates,//下一步是否可选
                        "clickstates":basicinfo.clickstates,//审批人是否可选
                        "btnval":basicinfo.btnval//按钮标志：0,1
                    };
                    
                    for(var i in resultinfo){
                        let peoplelist = [];
                        let stepval = resultinfo[i].stepnext_istepidnext;
                        nextstep.push({"value": resultinfo[i].indocno,
                            "label": resultinfo[i].sname});
                            let userimgs=[],userids=[],usernames=[];
                            //取出用户头像
                            if(resultinfo[i].stepnext_soperphotos!=""){
                                userimgs=resultinfo[i].stepnext_soperphotos.split(",");
                            }
                            //取出用户id
                            if(resultinfo[i].stepnext_soperids!=""){
                                userids=resultinfo[i].stepnext_soperids.split(",");
                            }
                            
                            //取出用户名
                            if(resultinfo[i].stepnext_sopernms!=""){
                                usernames=resultinfo[i].stepnext_sopernms.split(",");
                            }
                        //alert(userids.length)
                        if(userids!="" && userids!=null && userids.length>0){
                            for(var i in userids){
                                peoplelist.push({
                                    "imgurl":userimgs[i],
                                    "id":userids[i],
                                    "name":usernames[i]
                                })
                                }
                        }
                        
                        detailinfo.push({stepval:stepval,peoplelist:peoplelist});
                          
                    }
                  }
                    
                    steplist={fix:fixdinfo,detail:detailinfo,nextstep:nextstep}   
                    console.log("steplist",steplist);
                    this.setstep.getstepinfo(steplist);
                    this.setpeople.getpeopleinfo(steplist);
                    this.setState({
                        steplist:steplist,
                        btnclick:basicinfo.btnclick

                    });
                    this.setbasicinfo.getBasicinfo(fixdinfo);
              }
            }
          });
    }

    render(){
        // alert("basicinfo"+JSON.stringify(basicinfo));
        //alert(this.state.indoctypeid);
        //alert("aaa"+JSON.stringify(this.state.steplist));
        return(<div className={styles.listcon} style={{ marginTop: '2.8rem'}}>
            <Header value={this.state.btnclick} />
           {/*<ApprovalHistory />*/} 
            <Nextstep ref={e=>this.setstep=e} />
            {/*<SelectPeople1 datalist={this.state.steplist} />*/}
            <SelectPeople1 ref={e=>this.setpeople=e} />
            <Textarea defaultadvice={this.state.stepnext_soperadvice} />
            <Twobutton ref={e=>this.setbasicinfo=e} />
            </div>
        );
    }
}
