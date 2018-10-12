import React from 'react';
import { Icon, Picker } from 'antd-mobile';
import ajaxUtil from './../../utils/ajaxUtil';

/****工作流界面-意见选择框组件****/
export class PickerAdvice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      value: null,
    };
  }

  onClick = () => {
    //console.log('start loading data');
    setTimeout(() => {
      this.selAdviceData();
    }, 500);
  }
  
  //获取意见列表
  selAdviceData() {
    ajaxUtil.load(__apiRoot + '/wap/bpm/getFlowAdvice', (err, res) => {
      if (!err) {
        console.log("advicelist", res.body.content);
        let advicelist = [];
        if (res.body.content != "" && res.body.content != null && res.body.content != undefined && res.body.content.length > 0) {
          for (var i in res.body.content) {
            //将取出的数据修改格式后存在数组中
            advicelist.push({
              label: res.body.content[i].sname,
              value: res.body.content[i].sname
            })
          }
        }
        this.setState({
          data: advicelist
        })

      }

    });
  }

  onChange = (value) => {
    this.props.getAdvice(value);
  }

  render() {
    console.log("afsfa", this.state.data);
    return (
      <Picker data={this.state.data} cols={1} onChange={this.onChange} extra={""}
        // value={this.state.value}
        // disabled={this.props.pickerstates}
      > 
        <Icon type="down" onClick={this.onClick} style={{ position: "absolute", zIndex: "111", top: "5px", right: "1em" }}></Icon>
      </Picker>
    );
  }
}
