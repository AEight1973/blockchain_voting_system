import { MailOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import {Route, Routes} from "react-router-dom";

const items = [
    {
        key: 'election',
        icon: <MailOutlined/>,
        label: '投票',
    }
];

const onClick = (e) => {
    console.log('click', e);
};

const MainPanel  = () => (
    <div>
        <Menu onClick={onClick} style={{ width: 256 }} mode="vertical" items={items} />
        <Routes>
            <Route path="/" component={Electio} />
        </Routes>
    </div>
);

export default MainPanel;
