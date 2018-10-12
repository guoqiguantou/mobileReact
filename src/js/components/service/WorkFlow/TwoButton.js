import React from 'react';
import {Toast} from 'antd-mobile';
import Signal from './SignalObj';
import ajaxUtil from './../../utils/ajaxUtil';
import BtnGroup from './../../components/common/BtnGroup';

/****工作流界面-底部确定和取消按钮组件****/
export class Twobutton extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            doctypeid:null,//业务号
            billid:null,//单据号
            stepidpre:null,//上一步骤号
            stepidcur:null,//当前步骤号
            stepidnext:null,//下一步骤号
            operids:null,//办理人ID  
            opernms:null,//办理人  
            stepnext_ihicuridprev:null,//审批历史主键值
            advice:null,//办理意见
            operphoto:null,//签名
            btnval:null//按钮值

        }
        Signal.started.add(this.onStarted);//接收选择的步骤号
        Signal.suggested.add(this.onGetsuggest);//接收意见组件传递过来的意见
        Signal.sendpeople.add(this.onSendpeople);//接收选择的审批人
        Signal.sign.add(this.onSign);//接收base64签名图片
    }

     onStarted=(param1)=>{
        this.state.stepidnext=param1;//下一步骤号
     }

     onGetsuggest=(param2)=>{
        this.state.advice=param2;//办理意见
     }

     onSendpeople=(param3)=>{
        let peopleid1=[],peoplename1=[];
        let peopleid,peoplename;
        if(param3!="" && param3!=null){
            for(var i in param3){
                peopleid1.push(param3[i].id);
                peoplename1.push(param3[i].name);
            }

            peopleid=peopleid1.join(',');
            peoplename=peoplename1.join(',');
        }

        this.state.operids=peopleid;//办理人ID  
        this.state.opernms=peoplename;//办理人  
     }

     onSign=(param4)=>{
        this.state.operphoto=param4;//签名
    }

    //获取index.js传递的基础信息
    getBasicinfo=(data)=>{
        console.log("twobtn",data);
        this.setState({
            doctypeid:data.indoctypeid,//业务号
            billid:data.billid,//单据号
            stepidpre:data.stepnext_istepidprev,//上一步骤号
            stepidcur:data.stepnext_istepidcur,//当前步骤号
            stepnext_ihicuridprev:data.stepnext_ihicuridprev,//审批历史主键值
            advice:data.stepnext_soperadvice,//上一步骤提交的意见-默认意见
            btnval:data.btnval
        })
    }

     //点击确定按钮时先提交base64位的签名图片至服务器裁剪后返回新图片url
    confirmbtn = () => {
       let qmphoto={
         base64StrImgData:this.state.operphoto
       }
       this.sendEditautograph(qmphoto);
       // console.log("aaaaaaaaaaaaaaaaaaaa",this.state);
    }
    //签名图片上传至服务器修改后提交
    sendEditautograph(qmphoto){
        ajaxUtil.post(__apiRoot + '/common/wap/base/jpg', qmphoto, (err, res) => {
            console.log("sendphoto", qmphoto);
            if (!err) {
              console.log("sendEditautograph",res.body.content);
              //当签名裁剪后的url正确返回时，判断点击的按钮是同意还是驳回后，将接口所需参数提交
              setTimeout(() => { 
                let sendurl,data;
                if(this.state.btnval=="0"){
                    sendurl="flowCommitNext";
                    data={
                        doctypeid:this.state.doctypeid,//业务号
                        billid:this.state.billid,//单据号
                        stepidpre:this.state.stepidpre,//上一步骤号
                        stepidcur:this.state.stepidcur,//当前步骤号
                        stepidnext:this.state.stepidnext,//下一步骤号
                        operids:this.state.operids,//办理人ID  
                        opernms:this.state.opernms,//办理人  
                        advice:this.state.advice,//办理意见
                        operphoto:res.body.content//签名
                    };
                }else if(this.state.btnval=="1"){
                    sendurl="flowCommitBack";
                    data={
                        doctypeid:this.state.doctypeid,
                        billid:this.state.billid,
                        curidprev:this.state.stepnext_ihicuridprev,
                        stepidprev:this.state.stepidpre,
                        advice:this.state.advice,
                        operphoto:res.body.content
                    }
        
                }

                this.sendSplc(sendurl,data);

                },1);
            }
          });
    }

    //提交审批流程ajax
    sendSplc(sendurl,data){
        ajaxUtil.post(__apiRoot + '/wap/bpm/'+sendurl, data, (err, res) => {
            console.log("sendbtn", data);
            if (!err) {
              console.log("resbody",res.body);
              setTimeout(() => { 
                  //提交完成后返回至单据明细页
                  Toast.info(res.body.msg, 2, function(){
                    window.app.router.history.goBack();
                  }, false);
                },1);
            }
          });
    }

    //点击取消按钮直接返回至单据明细页
    backbtn= () => {
        window.app.router.history.goBack();
    }
    
    render() {
        return (
            <BtnGroup data={[{id:'confirmbtn',name:'确定'},{id:'backbtn',name:'取消'}]}  onBtnClick={(id,name)=>{
                if(id=="confirmbtn"){
                    this.confirmbtn();
                }else if(id=="backbtn"){
                    this.backbtn();
                }
            }} />
        );
    }
}