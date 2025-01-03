/*
* 用于加入或者创建新的投票
* */
import {Button, Form, Input, InputNumber, Modal} from "antd";
import {MinusCircleOutlined, PlusOutlined, UsergroupAddOutlined} from "@ant-design/icons";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {deployContract} from "../../../web3.js";

function ElectionMain() {
    const navigate = useNavigate();

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
        },
    };

    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 },
        },
    };

    const [isOpenAddElection, setIsOpenAddElection] = useState(false);
    const [isOpenCreateElection, setIsOpenCreateElection] = useState(false);

    // 加入投票
    const [addElectionForm] = Form.useForm()

    function handleOpenAddElection() {
        setIsOpenAddElection(true);
    }

    function handleSubmitAddElection() {
        const {address} = addElectionForm.getFieldsValue();
        navigate(`/main/detail/${address}`);
    }

    function handleCloseAddElection() {
        setIsOpenAddElection(false);
    }

    // 创建投票
    const [createElectionForm] = Form.useForm()

    function handleOpenCreateElection() {
        setIsOpenCreateElection(true);
    }

    function handleSubmitCreateElection() {
        const {duration, candidates} = createElectionForm.getFieldsValue();
        deployContract(duration, candidates).then(
            contract => {
                console.log(contract);
                navigate(`/main/detail/${contract._address}`)
            }
        )
    }

    function handleCloseCreateElection() {
        setIsOpenCreateElection(false);
    }

    return <div className='mainContainer'>
        <div>
            <Button type="primary" className='mainButton' icon={<UsergroupAddOutlined style={{fontSize: 40, color: 'white'}} />} onClick={handleOpenAddElection} />
            <div className='text'>加入投票</div>
        </div>
        <div>
            <Button type="primary" className='mainButton' icon={<PlusOutlined  style={{fontSize: 40, color: 'white'}}/>} onClick={handleOpenCreateElection} />
            <div className='text'>创建投票</div>
        </div>
        <Modal open={isOpenAddElection} title="加入投票" onOk={handleSubmitAddElection} onCancel={handleCloseAddElection} okText='确定' cancelText='取消'>
            <Form
                form={addElectionForm}
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                style={{ maxWidth: 600 }}
                autoComplete="off"
            >
                <Form.Item
                    label="地址"
                    name="address"
                    rules={[{ required: true, message: '请输入投票地址' }]}
                    >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
        <Modal open={isOpenCreateElection} title="创建投票" onOk={handleSubmitCreateElection} onCancel={handleCloseCreateElection} okText='确定' cancelText='取消'>
            <Form
                form={createElectionForm}
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item
                    label="持续时间"
                    name="duration"
                    rules={[{ required: true, message: '请输入投票持续时间' }]}
                >
                    <InputNumber/>
                </Form.Item>
                {/*<Form.Item*/}
                {/*    label="参选人"*/}
                {/*    name="candidates"*/}
                {/*    rules={[{ required: true, message: '请输入投票参选人' }]}*/}
                {/*>*/}
                {/*    <Input />*/}
                {/*</Form.Item>*/}
                <Form.List
                    name="candidates"
                    rules={[
                        {
                            validator: async (_, candidates) => {
                                if (!candidates || candidates.length < 2) {
                                    return Promise.reject(new Error('至少两个参选人'));
                                }
                            },
                        },
                    ]}
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? '参选人' : ''}
                                    required={false}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Please input passenger's name or delete this field.",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input placeholder="请输入参选人名称" style={{ width: '60%' }} />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item
                                {...formItemLayoutWithOutLabel}
                            >
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{ width: '60%' }}
                                    icon={<PlusOutlined />}
                                >
                                    添加参选人
                                </Button>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
        </Modal>
    </div>
}


export default ElectionMain
