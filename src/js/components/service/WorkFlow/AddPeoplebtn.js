import React from 'react';
import CustomIcon from '../../components/common/CustomIcon';
// import { Link} from "react-router-dom";
import Contacts from './../Contacts/index';
import Signal from './SignalObj';
import FullScreenModal from '../../components/common/FullScreenModal'

/*****工作流组件-添加审批人按钮组件*****/
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
export class AddpeopleBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
      close:''
    };
    Signal.select.add(this.onSelect)
  }
  onSelect=(param4)=>{
    console.log(1);
    // console.log('m4',this.state.modal1)
    this.state.close=param4;
    this.setState({
      close:param4,
      modal1:false
    })
    window.app.router.history.go(-1);
    
 }
  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
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
  // 
  click = () => {
    console.log(11);
    this.showModal('modal1');
    console.log(22);
  }
  render() {
    return (
      <div>
        <div>
          <CustomIcon path={require('images/svg/addPeople.svg')} style={{ width: '4.5em', height: '4.5em', marginTop: '8px',marginLeft:'5px' }} onClick={this.showModal('modal1')}/>
        </div>
        <FullScreenModal
          visible={this.state.modal1}
          popup
          maskClosable={true}
          onClose={this.onClose('modal1')}
          title="通讯录"
          footer={[{ text: '取消', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <Contacts />
        </FullScreenModal>
      </div>
    );
  }
}