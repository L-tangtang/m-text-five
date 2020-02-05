import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Map from '../router/map';
import Routes from '../router/views';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Map routes={Routes} />
            </BrowserRouter>
            <h1 style={{ textAlign: 'center', paddingTop: '100px', color: '#aaa' }}>
                用户权限管理
            </h1>
        </div>
    );
}

export default App;
