import {Card, Flex, Pagination} from "antd";
import {useNavigate} from "react-router-dom";

const electionListContainerStyle = {
    padding: '16px 32px',
    height: 'calc(100% - 32px)',
}

const electionListStyle = {
    width: '100%',
    height: 'calc(100% - 48px)',
    overflowY: 'auto',
}

const electionPaginationStyle = {
    position: 'absolute',
    bottom: 16,
    right: 32,
    width: 'calc(100% - 32px)',
    height: '32px'
}

const electionList = [
    {
        name: '测试投票1'
    },
    {
        name: '测试投票2'
    },
    {
        name: '测试投票3'
    },
]

const onShowSizeChange = () => {

}

const ElectionList = () => {
    const navigate = useNavigate();

    return <div style={electionListContainerStyle}>
        <div style={electionListStyle}>
            <Flex  wrap gap="middle">
                {
                    electionList.map((election,index) => {
                        return (
                            <Card
                                hoverable
                                key={index}
                                style={{ width: 240, height: 240 }}
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                onClick={() => {navigate('/main/detail/0')}}
                            >
                                {election.name}
                            </Card>
                        )
                    })
                }
            </Flex>
        </div>
        <Pagination
            style={electionPaginationStyle}
            align="end"
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={3}
            total={500}
        />
    </div>
}

export default ElectionList
