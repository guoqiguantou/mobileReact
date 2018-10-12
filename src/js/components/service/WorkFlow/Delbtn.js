import React from 'react';
import { Icon } from 'antd-mobile';

//审批人头像右上角删除按钮-此按钮没有删除功能,点击头像可删除
export class Delbtn extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Icon className="delPeople" key="0" type="cross" />
        );
    }
}