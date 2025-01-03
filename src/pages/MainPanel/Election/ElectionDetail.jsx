import {LeftOutlined} from "@ant-design/icons";
import {Card, Flex} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import PieChart from "../../../components/echarts/PieChart.jsx";

const electionDetailContainerStyle ={

}

const ElectionList = () => {
    // 暂时使用url传参的方式 但是会有安全性问题
    const {id} = useParams();

    const [election, setElection] = useState({
        id: null,
        name: null,
        type: 0,
        state: 1,
        anonymity: 1,
        votable: 0,
        voterList: [],
        voteFor: []
    })

    const getElection = (id) => {
        // TODO 添加请求
        const response = {
            id: id,
            name: '测试投票',
            type: 0,
            state: 1,
            anonymity: 1,
            votable: 0,
            voteFor: ['2', '3'],
            voterList: [
                {id: '1', name: '测试投票人1', value: 23},
                {id: '2', name: '测试投票人2', value: 43},
                {id: '3', name: '测试投票人3', value: 12},
            ]
        }


        setElection({
            ...response,
            type: ['公开', '封闭'],
            state: ['未开始', '进行中', '已结束'][response.state],
            anonymity: ['强制匿名', '可匿名', '强制实名'][response.anonymity],
        });
    }

    useEffect(() => {
        getElection(id);
    }, [id]);

    const navigate = useNavigate();

    const onClickBack = () => {
        navigate("/main/list");
    }

    return <div className="container" style={electionDetailContainerStyle}>
        <div onClick={onClickBack} style={{cursor: 'pointer', height: 24, fontSize: 18, lineHeight: '24px', fontWeight: 'bold'}}>
            <LeftOutlined /> 返回
        </div>
        <div className="block">
            <div className="title">基本信息</div>
            <div className="list">
                <div className="item"><span>名称</span>{election.name}</div>
                <div className="item"><span>类型</span>{election.type}</div>
                <div className="item"><span>状态</span>{election.state}</div>
                <div className="item"><span>匿名</span>{election.anonymity}</div>
            </div>
        </div>
        <div className="block">
            <div className="title">投票结果</div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <PieChart key='1' data={election?.voterList} title="竞选结果"/>
                <PieChart key='2' data={election?.voterList} title="投票结构"/>
            </div>

        </div>
        <div className="block">
            <div className="title">投票</div>
            <Flex wrap gap="middle">
                {
                    election.voterList.map((voter,index) => {
                        return <Card
                                hoverable
                                key={index}
                                style={{ width: 240 , background: election.voteFor?.indexOf(voter.id) >= 0? '#95de64': 'white'}}
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                            >
                                {voter.name}
                            </Card>
                    })
                }
            </Flex>
            <div>投票状态：{['无权限', '未投票', '已投票'][election.votable]}</div>
        </div>
    </div>
}

export default ElectionList
