import React from 'react';
import {Modal} from 'antd-mobile';
import Signal from './SignalObj'
import Sign from './Sign'
import {PickerAdvice} from './PickerAdvice';

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}



//工作流界面-意见输入框
export class Textarea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultadvice: null,
            modal2: false,
            sign: "",
            selAdvice: "",
        };
        Signal.sign.add(this.onSign);//获取签名组件传递过来的参数
    }

    componentDidMount() { }

    componentWillReceiveProps(props) {
        this.setState({
            defaultadvice: props.defaultadvice
        })
    }

    //选择意见传参
    setAdvice = (value) => { 
        this.setState({
            defaultadvice: value
        });
       
    };

    //签名传参
    onSign = (param5) => {
        if (param5 != "取消") {
            this.setState({
                sign: param5,
                modal2: false
            })
        } else {
            this.setState({
                modal2: false
            })
        }
    }

    //打开模态框（弹出层）
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }

    //关闭模态框（弹出层）
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }

    openAutograph = () => {
        this.showModal('modal2')
    }

    //意见文本域失去焦点时传递参数至提交按钮组件
    onBlur=(value)=>{
        Signal.suggested.dispatch(value);
    }

    //意见文本域修改时刷新组件
    changeVal = (e) => {
        this.setState({
            defaultadvice: e.target.value
        })
    }

    render() {
        console.log("签名图片", this.state.sign);
        let qmdiv, textAreainput;

        //判断签名div是否有图片，如果没有显示“点击此处签名”提示，如果有则显示签名图片
        if (this.state.sign != "" && this.state.sign != null && this.state.sign != undefined) {
            qmdiv = <img src={this.state.sign} ref={el => this.img = el} style={{ height: '100px', width: "100%" }} />
        } else {
            qmdiv = <div ref={el => this.img = el} style={{ color: "#888", width: "100%", height: '100px', textAlign: 'center', fontSize: '20px', lineHeight: '100px' }}>点击此处签名</div>
        }

        return (
            <div>
                <div className='listitems2'>
                    <p style={{ position: "relative", display: "block" }}>意见
                    <PickerAdvice getAdvice={this.setAdvice} />
                    </p>
                    <textarea value={this.state.defaultadvice} style={{ width: "100%", border: "none", padding: "8px", fontFamily: "微软雅黑" }} rows="3" maxlength="100" placeholder="请输入审批意见" onChange={this.changeVal} onBlur={this.onBlur(this.state.defaultadvice)}></textarea>
                </div>
                <div className='listitems2' onClick={this.showModal('modal2')}>
                    {qmdiv}
                    {/*<img src={this.state.sign} ref={el => this.img = el}   style={{height:'100px',width:"100%"}}/> */}
                </div>
                <Modal
                    popup
                    visible={this.state.modal2}
                    onClose={this.onClose('modal2')}
                    animationType="slide-up"
                >
                    <Sign />
                </Modal>
            </div>
        );
    }
}
