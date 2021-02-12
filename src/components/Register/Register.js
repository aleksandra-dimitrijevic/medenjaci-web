import React from "react";
import styles from './Register.module.css'
import {Button, Divider, Form, Input} from "antd";
import {CloseCircleOutlined} from "@ant-design/icons";
import {users} from "../../data/users";
import {Link} from "react-router-dom";

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 8},
};
const tailLayout = {
  wrapperCol: {offset: 8, span: 16},
};


class Register extends React.Component {
  state = {
    msg: undefined
  }
  register = (values) => {
    if (values.password !== values.repeatedPassword) {
      this.setState({msg: 'Unete sifre nisu iste!'});
      return;
    }
    let usersLS = JSON.parse(localStorage.getItem('users'));
    if (!usersLS) usersLS = [];
    let usersAll = [];
    usersAll.push(...usersLS);
    usersAll.push(...users);
    const user = usersAll.find(u => u.username === values.username);
    if (user) {
      this.setState({msg: 'Korisnicko ime zauzeto!'});
      return;
    }
    const newUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      address: values.address,
      userType: 'customer',
      username: values.username,
      password: values.password,
    }
    localStorage.setItem("user", JSON.stringify(newUser));
    usersLS.push(newUser)
    localStorage.setItem('users', JSON.stringify(usersLS));
    this.props.onLogin();
    this.props.history.push("/homecustomer");
  };

  render() {
    return (
      <div className={styles.backgroundImage}>
        <div className={styles.formInfo}>
          <div className={styles.header}>
            Register
          </div>
          <Divider style={{margin: '0px'}}/>
          <br/>
          <Form
            {...layout}
            name="basic0"
            onFinish={this.register}
          >
            <Form.Item
              label="Ime:"
              name="firstName"
              rules={[{required: true, message: "Please input your firstName!"}]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="Prezime:"
              name="lastName"
              rules={[{required: true, message: "Please input your lastName!"}]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="Kontakt telefon:"
              name="phoneNumber"
              rules={[{required: true, message: "Please input your phone number!"}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Adresa:"
              name="address"
              rules={[{required: true, message: "Please input your address!"}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Username:"
              name="username"
              rules={[{required: true, message: "Please input your username!"}]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="Sifra:"
              name="password"
              rules={[{required: true, message: "Please input your new password!"}]}
            >
              <Input.Password/>
            </Form.Item>

            <Form.Item
              label="Ponovi sifru:"
              name="repeatedPassword"
              rules={[{required: true, message: "Please input your repeatedPassword!"}]}
            >
              <Input.Password/>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button className='orangeButton' htmlType="submit">
                Registruj se!
              </Button>
            </Form.Item>
            {this.state.msg && (
              <div className={styles.errorMessage}>
                <CloseCircleOutlined className={styles.checked}/>
                {this.state.msg}
              </div>
            )}
            <Form.Item {...tailLayout}>
              <Link to="/" className='orangeLink'>LogIn?</Link>
            </Form.Item>

          </Form>
        </div>
      </div>

    );
  }
}

export default Register;