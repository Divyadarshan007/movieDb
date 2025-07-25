
import React, { useState } from 'react';
import { Button, Form, Input, Select, Space } from 'antd';
import MyEditor from '../components/MyEditor';


const SubmitButton = ({ form, children }) => {

    const [submittable, setSubmittable] = React.useState(false);
    const values = Form.useWatch([], form);
    React.useEffect(() => {
        form
            .validateFields({ validateOnly: true })
            .then(() => setSubmittable(true))
            .catch(() => setSubmittable(false));
    }, [form, values]);
    return (
        <Button type="primary" htmlType="submit" disabled={!submittable}>
            {children}
        </Button>
    );
};
const AddMovie = () => {
    const [form] = Form.useForm();
    const [showModal, setShowModal] = useState(false)

    return (
        <div className='container mx-auto '>
            <div className="back-image"></div>
            <div className='flex justify-center items-center h-screen  '>
                {
                    showModal ? <div>
                        <MyEditor setShowModal={setShowModal} showModal={showModal} />
                    </div> : <div className='bg-[#161616] relative p-[30px] w-[500px]'>
                        <Form form={form} className='' name="validateOnly" layout="vertical" autoComplete="off">
                            <Form.Item name="name" label="Title" className='text-white' rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="url"
                                label="URL"
                                rules={[{ required: true }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}>
                                <Input placeholder="" />
                            </Form.Item>
                            <Select className='mb-6'
                                showSearch
                                placeholder="Select a genre"
                                filterOption={(input, option) => {
                                    var _a;
                                    return (
                                        (_a = option === null || option === void 0 ? void 0 : option.label) !== null &&
                                            _a !== void 0
                                            ? _a
                                            : ''
                                    )
                                        .toLowerCase()
                                        .includes(input.toLowerCase());
                                }}
                                options={[
                                    { value: '1', label: 'Horror' },
                                    { value: '2', label: 'Drama' },
                                    { value: '3', label: 'Comedy' },
                                    { value: '4', label: 'Action' },
                                    { value: '5', label: 'Science Fiction' },
                                    { value: '6', label: 'Thriller' },
                                    { value: '7', label: 'Romance' },
                                ]}
                            />
                            <div>
                                <button className='text-white border px-7 py-2 mb-5' onClick={() => setShowModal(!showModal)}>Editor</button>
                            </div>
                            <Form.Item>
                                <Space>
                                    <SubmitButton form={form} >Submit</SubmitButton>
                                    <Button htmlType="reset">Reset</Button>
                                </Space>
                            </Form.Item>
                        </Form>

                    </div>
                }
            </div>
        </div>
    );
};
export default AddMovie;