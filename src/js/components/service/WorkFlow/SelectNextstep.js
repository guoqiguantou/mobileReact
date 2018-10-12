import React from 'react';
import {List, Picker} from 'antd-mobile';
import styles from './style/selectNextstep.scss';
import Signal from './SignalObj';

/****工作流界面-选择下一步步骤****/
export class Nextstep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nowstep: null,//当前步骤名称
      nextsteplist:null,//下一步骤信息列表
      pickerstates: null,//是否可选
      defaultVal:null,//初始化下拉框的值
      defaultlabel:null//初始化下拉框的内容
    }
  }

  //index.js传递过来的步骤信息
  getstepinfo = (data) => {
    console.log("下一步组件",data);
    Signal.started.dispatch(data.nextstep[0].value);//传递默认的步骤号到人员选择组件中
      //alert(data.nextstep[0].value);
      this.setState({
        nowstep: data.fix.stepnext_sstepnmcur,
        nextsteplist: data.nextstep,
        pickerstates: data.fix.pickerstates,
        defaultVal:data.nextstep[0].value,
        defaultlabel:data.nextstep[0].label,
      });
  };

  onClick = () => {
    //点击下一步弹出选择框
  }

  onChange = (value) => {
    Signal.started.dispatch(value);//传递选择的步骤号到人员选择组件中
    this.setState({
      defaultVal:value
    });
    //alert("selval:" + label);
  }

  render() {
    // console.log("sdfasdfsdf");
    return (
      <div>
        <p>当前步骤：{this.state.nowstep}</p>
        <div className='listitems1'>
          <List className={styles.listsel}>
            <Picker
              data={this.state.nextsteplist}
              cols={1}
              value={this.state.defaultVal}
              onChange={this.onChange}
              extra={this.state.defaultlabel}
              disabled={this.state.pickerstates}
            >
              <List.Item arrow="horizontal" onClick={this.onClick}>{this.state.pickerstates?"上一步骤":"下一步骤"}</List.Item>
            </Picker>
          </List>
        </div>
      </div>
    );
  }
}
