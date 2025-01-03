import { MailOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Outlet } from "react-router-dom";
import {deployContract} from "../../web3.js";
import {useEffect} from "react";

const headerStyle = {
    textAlign: 'left',
    fontSize: '28px',
    letterSpacing: '14px',
    fontWeight: 'bold',
    color: '#fff',
    height: 64,
    paddingInline: 32,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
};

const contentStyle = {
    position: 'absolute',
    top: 64,
    // left: 256,
    left: 0,
    width: '100%',
    // width: 'calc(100% - 256px)',
    height: 'calc(100% - 64px)',
};

// const menuStyle = {
//     position: 'absolute',
//     left: 0,
//     top: 64,
//     textAlign: 'center',
//     lineHeight: '120px',
//     backgroundColor: '#d1d1d1',
//     width: 256,
//     height: 'calc(100% - 64px)',
// };
//
// const items = [
//     {
//         key: 'election',
//         icon: <MailOutlined/>,
//         label: '投票',
//     }
// ];

const MainPanel  = () => {
    useEffect(() => {
        // createNewAccount().then(account => console.log(account), error => console.log(error));
        // deployContract()
        }, [])


    return <div style={{position: 'relative', width: '100%', height: '100%'}}>
        <div style={headerStyle}>区块链投票系统</div>
        {/*TODO 目前先弃用目录*/}
        {/*<div style={menuStyle}>*/}
        {/*    <Menu onClick={onClick} mode="vertical" items={items}/>*/}
        {/*</div>*/}
        <div style={contentStyle}>
            <Outlet/>
        </div>
    </div>
}

export default MainPanel;
