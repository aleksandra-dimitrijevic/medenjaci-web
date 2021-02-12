import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Alert } from "antd";
import "antd/dist/antd.css";
import {users} from "../../data/users";
import styles from './LogIn.module.css';
import '../../App.css'

const layout = {
    labelCol: { span: 16 },
    wrapperCol: { span: 24 },
};
const tailLayout = {
    wrapperCol: { offset: 16, span: 16 },
};

class LogIn extends React.Component {
    state = {
        status: 0,
    };
    handleSubmit = (values) => {
        let usersLS = JSON.parse(localStorage.getItem('users'));
        if(!usersLS) usersLS = [];
        const usersAll = [];
        usersAll.push(...usersLS)
        usersAll.push(...users);
        const user = usersAll.find( u => u.username === values.username && u.password === values.password);
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            this.props.onLogin();
            if(user.userType === 'customer') this.props.history.push("/homecustomer");
            else this.props.history.push("/homeseller");
        } else {
            //password or username incorrect
            this.setState({ status: -1 });
        }
    };

    render() {
        return (
            <div className={styles.login}>
                <div className={styles.backgroundImage}>
                    <div>
                        <div className={styles.loginTitle}>LogIn</div>
                        <Form
                            className={ styles.loginForm}
                            {...layout}
                            name="basic"
                            onFinish={this.handleSubmit}
                            onFinishFailed={this.onFinishFailed}
                        >
                            {this.state.status === -1 && (
                                <Alert message="Wrong username or password" type="error" showIcon />
                            )}

                            <br />

                            <Form.Item
                                label="Korisničko ime"
                                name="username"
                                rules={[{ required: true, message: "Please input your username!" }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Šifra"
                                name="password"
                                rules={[{ required: true, message: "Please input your password!" }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button className='orangeButton' htmlType="submit">
                                    LogIn
                                </Button>
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Link to="/register" className='orangeLink'>Registruj se?</Link>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default LogIn;