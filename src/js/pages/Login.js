
import React, { Component } from 'react';
import formCreate from './form-create';

// 普通组件Login
class Login extends Component {
    constructor() {
        super();
        this.state = {
            usual: 'usual',
        }
    }
    render() {
        return (
            <div>
                <div>
                    <label id="username">
                        账户
                    </label>
                    <input name="username" {...this.props.getField('username')}/>
                </div>
                <div>
                    <label id="password">
                        密码
                    </label>
                    <input name="password" {...this.props.getField('password')}/>
                </div>
                <div onClick={this.props.handleSubmit}>提交</div>

            </div>
        )
    }
}
export default formCreate(Login);