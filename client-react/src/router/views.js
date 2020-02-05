import Login from '../views/login';

import Home from '../views/home/home';
import UserList from '../views/home/userList';
import IndentList from '../views/home/indentList';
import Add from '../views/home/add';
import Echearts from '../views/home/echearts';
export default [
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        children: [
            {
                path: '/home/userList',
                name: 'userList',
                component: UserList,
            },
            {
                path: '/home/indentList',
                name: 'indentList',
                component: IndentList,
            },
            {
                path: '/home/add',
                name: 'add',
                component: Add,
            },
            {
                path: '/home/echearts',
                name: 'echearts',
                component: Echearts,
            },
        ],
    },
];
