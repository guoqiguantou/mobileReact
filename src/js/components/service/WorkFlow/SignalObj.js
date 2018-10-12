import React from 'react';

const signals= require('signals');
/****广播功能组件****/
const Signal = {
  started : new signals.Signal(),//选择步骤传参
  select:new signals.Signal(), //选择审批人的传参
  sendpeople:new signals.Signal(),//审批人选择后提交传参
  suggested : new signals.Signal(),//意见文本框传参
  sign:new signals.Signal(),//签名
  otherstep:new signals.Signal()//上一步id，当前步id
};
export default Signal
