import { Alert, Button, Card, Checkbox, Flex, Form, Input, Layout, Space } from "antd"
import { LockFilled, UserOutlined, LockOutlined } from '@ant-design/icons'
import Logo from "../../componets/icons/Logo"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Credentials } from "../../types"
import { login, self } from "../../http/api"
import { useAuthStore } from "../../store"


const loginUser = async (credentials: Credentials) => {
    const { data } = await login(credentials)
    return data;
}

const getSelf = async () => {
    const { data } = await self();
    return data;
}
const LoginPage = () => {
    const { setUser } = useAuthStore();
    const {  refetch } = useQuery({
        queryKey: ['self'],
        queryFn: getSelf,
        enabled: false
    })
    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: ['login'],
        mutationFn: loginUser,
        onSuccess: async () => {
            const selfDataPromise = await refetch();
         
            setUser(selfDataPromise.data)
        }
    })
    return (
        <>
            <Layout style={{ height: '100vh', display: 'grid', placeItems: 'center' }} >
                <Space direction="vertical" align="center" size={"large"} id="login-page-card">
                    <Layout.Content>
                        <Logo />
                    </Layout.Content>
                    <Card
                        bordered={true}
                        style={{ width: 300 }}
                        title={<Space style={{ width: '100%', fontSize: 16, justifyContent: 'center' }}>
                            <LockFilled />
                            Sign in
                        </Space>}>
                        <Form initialValues={{
                            remember: true
                        }}

                            onFinish={(values) => {
                                mutate({ email: values.username, password: values.password })
                                console.log(values);

                            }}
                        >
                            {
                                isError && (
                                    <Alert type="error" message={error.message} style={{ marginBottom: 24 }} />
                                )
                            }
                            <Form.Item name="username" rules={[
                                {
                                    required: true,
                                    message: 'Please input your username'
                                }, {
                                    type: 'email',
                                    message: 'Please enter valid email'
                                }
                            ]}>
                                <Input prefix={<UserOutlined />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item name="password" rules={[
                                {
                                    required: true,
                                    message: "Please enter your password"
                                }
                            ]}>
                                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                            </Form.Item>
                            <Flex justify="space-between" >
                                <Form.Item name="remember" valuePropName="checked" >
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                <a href="#" id="login-form-forget">Forget password</a>
                            </Flex>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: '100%' }} id="login-form-button" loading={isPending}>
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Space>
            </Layout>
        </>
    )
}

export default LoginPage