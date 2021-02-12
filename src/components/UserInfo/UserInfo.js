import React from "react";
import styles from "./UserInfo.module.css";
import {Button, Divider, Form, Input} from "antd";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {users} from "../../data/users";


const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 8},
};
const tailLayout = {
  wrapperCol: {offset: 8, span: 16},
};

class UserInfo extends React.Component {
  state = {
    changedInfo: false,
    changedPassword: 0
  }
  changeUserInfo = (values) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const changedUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      address: values.address,
      userType: user.userType,
      username: user.username,
      password: user.password
    }
    localStorage.setItem("user", JSON.stringify(changedUser));
    this.setState({changedInfo: true});
    const index = users.findIndex(u => user.username === u.username);
    if (index !== -1) users[index] = changedUser;
    else {

      const users = JSON.parse(localStorage.getItem('users'));
      const index = users.findIndex(u => user.username === u.username);
      users[index] = changedUser;
      localStorage.setItem('users', JSON.stringify(users))
    }

  };
  changePassword = (values) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (values.newPass !== values.repeatedPass) {
      this.setState({changedPassword: -1});
      return;
    }
    if (user.password !== values.currentPass) {
      this.setState({changedPassword: -2});
      return;
    }
    user.password = values.newPass;
    this.setState({changedPassword: 1});
    localStorage.setItem('user', JSON.stringify(user));
    const index = users.findIndex(u => user.username === u.username);
    if (index !== -1) users[index] = user;
    else {
      const users = JSON.parse(localStorage.getItem('users'));
      const index = users.findIndex(u => user.username === u.username);
      users[index] = user;
      localStorage.setItem('users', JSON.stringify(users))
    }

  };

  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
      <div className={styles.content}>
        <div className={styles.formInfo}>
          <div className={styles.header}>
            Licni podaci
          </div>
          <Divider style={{margin: '0px'}}/>
          <br/>
          <Form
            {...layout}
            name="basic0"
            onFinish={this.changeUserInfo}
          >
            <Form.Item
              label="Ime:"
              name="firstName"
              initialValue={user.firstName}
              rules={[{required: true, message: "Please input your firstName!"}]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="Prezime:"
              name="lastName"
              initialValue={user.lastName}
              rules={[{required: true, message: "Please input your lastName!"}]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="Kontakt telefon:"
              name="phoneNumber"
              initialValue={user.phoneNumber}
              rules={[{required: true, message: "Please input your phone number!"}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Adresa:"
              name="address"
              initialValue={user.address}
              rules={[{required: true, message: "Please input your address!"}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button className='orangeButton' htmlType="submit">
                Izmeni podatke
              </Button>
            </Form.Item>
            {this.state.changedInfo && (
              <div className={styles.message}>
                <CheckCircleOutlined className={styles.checked}/>
                Podaci izmenjeni!
              </div>
            )}
          </Form>
        </div>
        <div className={styles.formInfo}>
          <div className={styles.header}>
            Promena sifre
          </div>
          <Divider style={{margin: '0px'}}/>
          <Form
            {...layout}
            name="basic"
            onFinish={this.changePassword}
          >
            <br/>

            <Form.Item
              label="Trenutna sifra:"
              name="currentPass"
              rules={[{required: true, message: "Please input your password!"}]}
            >
              <Input.Password/>
            </Form.Item>

            <Form.Item
              label="Nova sifra:"
              name="newPass"
              rules={[{required: true, message: "Please input your new password!"}]}
            >
              <Input.Password/>
            </Form.Item>

            <Form.Item
              label="Nova sifra:"
              name="repeatedPass"
              rules={[{required: true, message: "Please input your new password!"}]}
            >
              <Input.Password/>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button className='orangeButton' htmlType="submit">
                Izmeni sifru
              </Button>
            </Form.Item>
            {this.state.changedPassword === -1 && (
              <div className={styles.errorMessage}>
                <CloseCircleOutlined className={styles.checked}/>
                Nove sifre se ne pododaraju!
              </div>
            )}
            {this.state.changedPassword === -2 && (
              <div className={styles.errorMessage}>
                <CloseCircleOutlined className={styles.checked}/>
                Netacna sifra!
              </div>
            )}
            {this.state.changedPassword === 1 && (
              <div className={styles.message}>
                <CheckCircleOutlined className={styles.checked}/>
                Sifra izmenjena!
              </div>
            )}
          </Form>
        </div>
      </div>
    );
  }
}

export default UserInfo;