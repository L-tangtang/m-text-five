import React, { Component } from 'react';
import { Icon, Input, Button } from 'antd';
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default class login extends Component {
    componentWillMount = () => {
        this.$route = this.props.history.push;
    };
    state = {
        username: '',
        password: '',
    };
    render() {
        return (
            <div className="login-wrapper">
                <div className="login-div">this is login left</div>
                <div className="login-box">
                    <Input
                        prefix={<Icon type="user" />}
                        placeholder="Username"
                        onChange={e =>
                            this.setState({
                                username: e.target.value.trim(),
                            })
                        }
                    />
                    <Input
                        prefix={<Icon type="lock" />}
                        placeholder="Password"
                        onChange={e =>
                            this.setState({
                                password: e.target.value.trim(),
                            })
                        }
                    />
                    <Button type="primary" onClick={this.headleLogin.bind(this)}>
                        Login in
                    </Button>
                </div>
            </div>
        );
    }
    async headleLogin() {
        let { http } = this;
        let { username, password } = this.state;
        let res = await http('/login', { username, password }, 'post');
        const { code, msg, data } = res.data;
        alert(msg);
        if (code === 1) {
            localStorage.setItem('name', JSON.parse(res.config.data).username);
            localStorage.setItem('token', data);
            this.$route('/home');
        }
    }
}
