import {LeftOutlined} from "@ant-design/icons";
import {Card, Flex} from "antd";
import {useNavigate} from "react-router-dom";

const voterList = [
    {
        name: '测试投票人1'
    },
    {
        name: '测试投票人2'
    },
    {
        name: '测试投票人3'
    },
]

const ElectionList = () => {
    const navigate = useNavigate();

    const onClickBack = () => {
        navigate("/main/list");
    }

    return <div>
        <div onClick={onClickBack} style={{cursor: 'pointer'}}>
            <LeftOutlined /> 返回
        </div>
        <div>
            <div>基本信息</div>
        </div>
        <div>
            <div>投票结果</div>
            <div>标签：未开始/已结束/进行中</div>
            图表
        </div>
        <div>
            <div>投票</div>
            <Flex wrap gap="middle">
                {
                    voterList.map((election,index) => {
                        return (
                            <Card
                                hoverable
                                key={index}
                                style={{ width: 240 }}
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                            >
                                {election.name}
                            </Card>
                        )
                    })
                }
            </Flex>
        </div>
    </div>
}

export default ElectionList
