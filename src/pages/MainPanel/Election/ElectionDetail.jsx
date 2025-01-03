import {LeftOutlined} from "@ant-design/icons";
import {Button, Card, Flex} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import PieChart from "../../../components/echarts/PieChart.jsx";
import {getContractInstance} from "../../../web3.js";
import {formatDateTime} from "../../../utils.js";

const electionDetailContainerStyle ={

}

const ElectionList = () => {
    // 暂时使用url传参的方式 但是会有安全性问题
    const {id} = useParams();

    const contract = getContractInstance(id)

    const [election, setElection] = useState({
        id: null,
        name: null,
        type: 0,
        state: 1,
        anonymity: 1,
        votingEndTime: new Date(),
        votable: 0,
        candidates: [],
        hasVoted: false,
        vote: -1
    })

    // 初始化
    useEffect(()=>{
        getElection().then();
    }, [])

    async function getElection() {
        const newElection = {
            id: id,
        }
        // 投票时间
        const votingEndTime = await contract.methods.votingEndTime().call()
        newElection.votingEndTime = new Date(Number(votingEndTime)*1000)
        newElection.state = new Date(Number(votingEndTime)*1000) >= new Date()? '进行中': '已结束'

        // 候选人
        // console.log(new Date(Number(votingEndTime)*1000), new Date(), new Date(Number(votingEndTime)*1000) < new Date())
        if (new Date(Number(votingEndTime)*1000) < new Date()) {
            const candidates = await contract.methods.getResults().call()
            newElection.candidates = candidates.map(candidate => {
                return {
                    id: Number(candidate.id),
                    name: candidate.name,
                    value: Number(candidate.voteCount),
                }
            })
            console.log(newElection.candidates)
        } else {
            const candidates = await contract.methods.getCandidateNames().call()
            newElection.candidates = candidates.map((candidate, index) => {
                return {
                    id: index,
                    name: candidate,
                    value: 0
                }
            })
        }


        // 投票情况
        const vote = await contract.methods.voters('0x76e501a35854eaaaea918696d9d652d8a4d45cf9').call()
        if (vote.id === BigInt(0)) {
            contract.methods.registerVoter('0x76e501a35854eaaaea918696d9d652d8a4d45cf9').send({from: '0x76e501a35854eaaaea918696d9d652d8a4d45cf9'})
        }
        newElection.hasVoted = vote.hasVoted
        newElection.vote = Number(vote.vote)

        setElection({
            ...election,
            ...newElection,
        })
    }

    function handleClickSelect(index) {
        setElection({
            ...election,
            vote: index
        })
    }

    function handleClickVote() {
        contract.methods.vote('0x76e501a35854eaaaea918696d9d652d8a4d45cf9', election.vote).send(
            {from: '0x76e501a35854eaaaea918696d9d652d8a4d45cf9'}
        )
            .then(() => {
                setElection({
                    ...election,
                    hasVoted: true,
                })
            })
    }

    // const getElection = (id) => {
    //     // TODO 添加请求
    //     const response = {
    //         id: id,
    //         name: '测试投票',
    //         type: 0,
    //         state: 1,
    //         anonymity: 1,
    //         votable: 0,
    //         voteFor: ['2', '3'],
    //         voterList: [
    //             {id: '1', name: '测试投票人1', value: 23},
    //             {id: '2', name: '测试投票人2', value: 43},
    //             {id: '3', name: '测试投票人3', value: 12},
    //         ]
    //     }
    //
    //
    //     setElection({
    //         ...response,
    //         type: ['公开', '封闭'],
    //         state: ['未开始', '进行中', '已结束'][response.state],
    //         anonymity: ['强制匿名', '可匿名', '强制实名'][response.anonymity],
    //     });
    // }

    const navigate = useNavigate();

    const onClickBack = () => {
        navigate("/main");
    }

    return <div className="container" style={electionDetailContainerStyle}>
        <div onClick={onClickBack} style={{cursor: 'pointer', height: 24, fontSize: 18, lineHeight: '24px', fontWeight: 'bold', color: '#3e3e3e'}}>
            <LeftOutlined /> 返回
        </div>
        <div className="block">
            <div className="title">基本信息</div>
            <div className="list">
                <div className="item"><span>地址</span>{election.id}</div>
                <div className="item"><span>结束时间</span>{formatDateTime(election.votingEndTime, "yyyy-MM-dd HH:mm:ss")}</div>
                {/*<div className="item"><span>名称</span>{election.name}</div>*/}
                {/*<div className="item"><span>类型</span>{election.type}</div>*/}
                <div className="item"><span>状态</span>{election.state}</div>
                {/*<div className="item"><span>匿名</span>{election.anonymity}</div>*/}
            </div>
        </div>
        <div className="block">
            <div className="title">投票</div>
            <Flex wrap gap="middle">
                {
                    election.candidates.map((voter, index) => {
                        return <Card
                                hoverable
                                key={index}
                                style={{ width: 240 , background: election.vote === index? '#95de64': 'white'}}
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                onClick={() => handleClickSelect(index)}
                            >
                                {voter.name}
                            </Card>
                    })
                }
            </Flex>
            {/*<div>投票状态：{['无权限', '未投票', '已投票'][election.votable]}</div>*/}
            <Button disabled={election.hasVoted} type="primary" onClick={handleClickVote} style={{marginTop: 12}}>投票</Button>
        </div>
        {election.state === '已结束' && <div className="block">
            <div className="title">投票结果</div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <PieChart key='1' data={election.candidates} title="竞选结果"/>
                {/*<PieChart key='2' data={election.candidates} title="投票结构"/>*/}
            </div>
        </div>}
    </div>
}

export default ElectionList
