import React, { Component } from 'react';
import styles from './style/sign.scss';
import ReactDOM from 'react-dom'
import BtnGroup from '../../components/common/BtnGroup'
import Signal from './../WorkFlow/SignalObj'

export default class Sign extends Component {
    constructor(props) {
        super(props);
        this.state={
            id:1,
            imageUrl:''
        }
    }
    click=(key,name)=>{
        console.log('BtnGroup',key,name);
        if(key=="confrim"){
            if(this.refs.myCanvas.toDataURL()!="data:image/png;base64,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"){
                Signal.sign.dispatch(this.refs.myCanvas.toDataURL());
                this.refs.myCanvas.height=window.screen.availHeight-50;
                this.setState({imageUrl:this.refs.myCanvas.toDataURL()})
            }else{
                Signal.sign.dispatch("");
                this.refs.myCanvas.height=window.screen.availHeight-50
            }
        }else if(key=="again"){
            this.refs.myCanvas.height=window.screen.availHeight-50
        }else if(key="concel"){
            console.log('imageUrl',this.state.imageUrl);
            Signal.sign.dispatch("取消");
            this.refs.myCanvas.height=window.screen.availHeight-50
        }
    }
     render() {
         console.log('重新绘制')
         return (
             <div>
                {/* <div> */}
                    <canvas ref="myCanvas" style={{height:'500'}}></canvas>
                    {/* <div className={styles.tips}>请在白色区域内书写签名</div> */}
                {/* </div> */}
                <div style={{position: 'fixed',bottom:'0'}} className={styles.btngroup}>
                        <BtnGroup data={[{id:'concel',name:'取消'},{id:'again',name:'重新'},{id:'confrim',name:'确定'}]} onBtnClick={this.click}/>
                </div>
             </div>
         );
     }
    componentDidMount() {
        const canvas = ReactDOM.findDOMNode(this.refs.myCanvas);
        const board = canvas.getContext('2d');

        let cheight = window.screen.availHeight-50;
        let cwidth = window.screen.availWidth;

        let mousePress = false;
        let last = null;
        function beginDraw() {
            mousePress = true;
            // document.getElementsByClassName("tips").style.display = "none";
        }

        function drawing(event) {
            board.lineWidth = 3;
            event.preventDefault();
            if(!mousePress) return;
            let xy = pos(event);
            if(last != null) {
                board.beginPath();
                board.moveTo(last.x, last.y);
                board.lineTo(xy.x, xy.y);
                board.stroke();
            }
            last = xy;
        }

        function endDraw(event) {
            mousePress = false;
            event.preventDefault();
            last = null;
        }

        function pos(event) {
            let x, y;
            if(isTouch(event)) {
                x = event.touches[0].pageX;
                y = event.touches[0].pageY;
            } else {
                x = event.offsetX + event.target.offsetLeft;
                y = event.offsetY + event.target.offsetTop;
            }
            return {
                x: x,
                y: y
            };
        }
        function isTouch(event) {
            let type = event.type;
            if(type.indexOf('touch') >= 0) {
                return true;
            } else {
                return false;
            }
        }

        canvas.height = cheight;
        canvas.width = cwidth;
        //ctx.fillStyle = 'rgb(255,0,0)';
        //ctx.fillRect(0, 0, cwidth, cheight);
        canvas.onmousedown = beginDraw;
        canvas.onmousemove = drawing;
        canvas.onmouseup = endDraw;
        canvas.addEventListener('touchstart', beginDraw, false);
        canvas.addEventListener('touchmove', drawing, false);
        canvas.addEventListener('touchend', endDraw, false);

    }

}