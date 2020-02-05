import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

export default class login extends Component {
    render() {
        return (
            <Switch>
                <Redirect from="/" to="/login" exact />
                {this.props.routes.map(item => {
                    const Comp = item.component;
                    return (
                        <Route
                            key={item.name}
                            path={item.path}
                            component={prop => {
                                if (item.children) {
                                    return <Comp routes={item.children} {...prop} />;
                                } else {
                                    return <Comp {...prop} />;
                                }
                            }}
                        />
                    );
                })}
            </Switch>
        );
    }
}
