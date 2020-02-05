import React, { Component } from 'react';
import { Table, Divider, Modal, Button, Input, Select } from 'antd';
const { Option } = Select;
const { confirm } = Modal;
export default class List extends Component {
    state = {
        visible: false,
        isLook: false,
        id: 0,
        item: '',
        username: '',
        password: '',
        indent: '',
        rolelist: [], //身份表
        dataList: [], //数据表
        columns: [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '密码',
                dataIndex: 'password',
                key: 'password',
            },
            {
                title: '角色',
                dataIndex: 'indent',
                key: 'indent',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Button onClick={this.headle.bind(this, record)}>查看</Button>{' '}
                        <Modal
                            title="查看"
                            visible={this.state.isLook}
                            onOk={this.headleLook.bind(this)}
                        >
                            <p>用户Id：{this.state.item.id}</p>
                            <p>用户名：{this.state.item.username}</p>
                            <p>密码：{this.state.item.password}</p>
                            <p>身份：{this.state.item.indent}</p>
                        </Modal>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.showModal.bind(this, record)}>
                            编辑
                        </Button>
                        <Modal
                            title="编辑"
                            visible={this.state.visible}
                            onOk={this.handleOk.bind(this, record)}
                        >
                            <p>
                                <Input
                                    value={this.state.username}
                                    placeholder="用户名"
                                    onChange={e =>
                                        this.setState({
                                            username: e.target.value.trim(),
                                        })
                                    }
                                />
                            </p>
                            <p>
                                <Input
                                    value={this.state.password}
                                    placeholder="密码"
                                    onChange={e =>
                                        this.setState({
                                            password: e.target.value.trim(),
                                        })
                                    }
                                />
                            </p>
                            <li>
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
                            </li>
                        </Modal>
                        <Divider type="vertical" />
                        <Button onClick={this.showConfirm.bind(this, record)}>删除</Button>
                    </span>
                ),
            },
        ],
    };

    handleChange(value) {
        this.setState({
            indent: value,
        });
    }
    showModal = record => {
        this.setState({
            visible: true,
            id: record.id,
            username: record.username,
            password: record.password,
        });
    };
    // 编辑
    handleOk = async record => {
        this.setState({
            visible: false,
        });
        const { username, password, indent, id } = this.state;
        let res = await this.http('/edit', { username, password, indent, id }, 'put');
        const { code, msg } = res.data;
        alert(msg);
        if (code === 1) {
            this.initList();
        }
    };
    // 删除
    showConfirm(record) {
        const that = this;
        confirm({
            title: '确认删除此信息吗',
            async onOk() {
                let res = await that.http('/del', { id: record.id }, 'delete');
                const { code } = res.data;
                if (code === 1) {
                    that.initList();
                }
            },
        });
    }
    // 查看
    headle(record) {
        this.setState({
            item: record,
            isLook: true,
        });
    }
    headleLook() {
        this.setState({
            isLook: false,
        });
    }
    render() {
        return (
            <div>
                <Button style={{ marginBottom: '10px' }} onClick={() => this.$route('/home/add')}>
                    添加
                </Button>

                <Table
                    rowKey={(a, index) => index}
                    columns={this.state.columns}
                    dataSource={this.state.dataList}
                />
            </div>
        );
    }
    async componentDidMount() {
        this.initList();
        this.initRole();
    }
    componentWillMount() {
        this.$route = this.props.history.push;
    }
    // 初始数据表
    async initList() {
        let res = await this.http('/getList', '', 'get');
        const { code, data } = res.data;
        if (code === 1) {
            this.setState({
                dataList: data,
            });
        }
    }
    // 初始身份表
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
