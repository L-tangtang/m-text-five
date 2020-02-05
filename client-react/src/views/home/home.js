import React, { Component } from 'react';
import Map from '../../router/map';
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
export default class home extends Component {
    componentWillMount = () => {
        this.$route = this.props.history.push;
    };
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <div className="home-box">
                <Layout>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <div
                            className="logo"
                            style={{
                                color: '#fff',
                                height: '60px',
                                lineHeight: '60px',
                                paddingLeft: '45px',
                            }}
                            onClick={() => {
                                this.props.history.push('/home/echearts');
                            }}
                        >
                            工作台
                        </div>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                                <Icon type="user" />
                                <span onClick={() => this.$route('/home/userList')}>用户列表</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="video-camera" />
                                <span onClick={() => this.$route('/home/indentList')}>
                                    角色列表
                                </span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: '20px' }}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                            <span style={{ float: 'right ' }}>
                                欢迎 {localStorage.getItem('name')} |{' '}
                                <b
                                    onClick={() => {
                                        localStorage.clear();
                                        this.props.history.push('/login');
                                    }}
                                >
                                    退出
                                </b>
                            </span>
                        </Header>
                        <Content
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                background: '#fff',
                                minHeight: 280,
                            }}
                        >
                            <Map routes={this.props.routes} />
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}
