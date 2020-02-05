import React, { Component } from 'react';
import { Input, Select, Button } from 'antd';
const { Option } = Select;

export default class add extends Component {
    state = {
        username: '',
        password: '',
        indent: '',
        rolelist: [],
    };
    render() {
        return (
            <div>
                <div style={{ marginBottom: '10px' }}>
                    <Input
                        placeholder="用户名"
                        onChange={e =>
                            this.setState({
                                username: e.target.value.trim(),
                            })
                        }
                    />
                    <Input
                        style={{ marginTop: '10px', marginBottom: '10px' }}
                        placeholder="密码"
                        onChange={e =>
                            this.setState({
                                password: e.target.value.trim(),
                            })
                        }
                    />
                    <Select
                        defaultValue="身份"
                        style={{ width: 120 }}
                        onChange={this.handleChange.bind(this)}
                    >
                        {this.state.rolelist.map(item => {
                            return (
                                <Option key={item.id} value={item.name}>
                                    {item.name}
                                </Option>
                            );
                        })}
                    </Select>
                </div>
                <Button onClick={this.headleAdd.bind(this)}>添加</Button>
            </div>
        );
    }
    handleChange(value) {
        this.setState({
            indent: value,
        });
    }
    async headleAdd() {
        let { username, password, indent } = this.state;
        let res = await this.http('/add', { username, password, indent }, 'post');
        const { code, msg } = res.data;
        alert(msg);
        if (code === 1) {
            this.props.history.push('/home/userList');
        }
    }
    componentDidMount() {
        this.initRole();
    }
    async initRole() {
        let res = await this.http('/getRole', '', 'get');
        const { code, data } = res.data;
        if (code === 1) {
            this.setState({
                rolelist: data,
            });
        }
    }
}
