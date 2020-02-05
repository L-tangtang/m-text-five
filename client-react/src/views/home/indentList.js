import React, { Component } from 'react';
import { Button, Input, Modal } from 'antd';

export default class indentList extends Component {
    state = {
        name: '',
        rolelist: [],
        isLook: false,
    };
    render() {
        const { rolelist, name } = this.state;
        return (
            <div>
                <Button onClick={() => this.setState({ isLook: true })}>添加</Button>
                <Modal
                    title="TIANJIA"
                    visible={this.state.isLook}
                    onOk={this.headleLook.bind(this)}
                    onCancel={this.handleCancel}
                >
                    <p>
                        <Input
                            value={name}
                            placeholder="用户名"
                            onChange={e =>
                                this.setState({
                                    name: e.target.value.trim(),
                                })
                            }
                        />
                    </p>
                </Modal>
                <div className="indent-box">
                    <li>
                        <span>ID</span>
                        <span>角色</span>
                    </li>
                    {rolelist.map(item => {
                        return (
                            <li key={item.id}>
                                <span>{item.id}</span>
                                <span>{item.name}</span>
                                <span onClick={this.headleDel.bind(this, item.id)}>删除</span>
                            </li>
                        );
                    })}
                </div>
            </div>
        );
    }
    async headleDel(id) {
        let res = await this.http('/deleteRelo', { id }, 'delete');
        const { code, msg } = res.data;
        alert(msg);
        if (code === 1) {
            this.initRole();
        }
    }
    handleCancel = e => {
        this.setState({
            isLook: false,
        });
    };
    async headleLook() {
        const { name } = this.state;
        this.setState({
            isLook: false,
        });
        let res = await this.http('/addRelo', { name }, 'post');
        const { code, msg } = res.data;
        alert(msg);
        if (code === 1) {
            this.initRole();
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
