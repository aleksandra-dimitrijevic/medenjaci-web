import React from "react";
import styles from "../../Customer/Home/Menu/Menu.module.css";
import {PoweroffOutlined,PlusCircleOutlined, UserOutlined,BarsOutlined} from "@ant-design/icons";
import {withRouter} from 'react-router-dom';

class Menu extends React.Component{

    userInfo = () => {
        this.props.history.push("/userinfo-seller");
    }
    addProduct = () => {
        this.props.history.push("/add-product");
    }
    homeSeller = () => {
        this.props.history.push("/homeseller");
    }
    logOut = () => {
        localStorage.removeItem('user')
        this.props.onLogOut();
        this.props.history.push("/");
    }
    render(){
        return (
            <div className={styles.menu}>
                <div>
                    <BarsOutlined className={styles.icon} onClick={this.homeSeller}/>
                    <PlusCircleOutlined className={styles.icon} onClick={this.addProduct}/>
                    <UserOutlined className={styles.icon} onClick={this.userInfo}/>
                </div>
                <div>
                    <PoweroffOutlined className={styles.logoutIcon} onClick={this.logOut}/>
                </div>
            </div>
        );
    }
}

export default withRouter(Menu);