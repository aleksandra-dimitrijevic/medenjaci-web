import React from "react";
import styles from './Menu.module.css';
import {ShoppingCartOutlined, UserOutlined, PoweroffOutlined} from '@ant-design/icons'
import Cart from "../Cart/Cart";
import {withRouter} from "react-router-dom";

class Menu extends React.Component{
    state = {
        cart:false,
    }
    setOrdered = (value) => {
        this.setState({ordered: value});
    }
    showProducts = () => {
        this.props.history.push("/homecustomer");
    }
    showCart = () => {
        this.setState({ cart: !this.state.cart});
    }
    showUserInfo = () =>{
        this.props.history.push("/userinfo-customer");
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
                    <div className={styles.icon} onClick={this.showProducts} style={{cursor: "pointer"}}>
                        <div className={styles.honeyIcon}></div>
                    </div>
                    <UserOutlined className={styles.icon} onClick={this.showUserInfo} />
                    <div style={{position:'relative'}}>
                        <ShoppingCartOutlined  className={styles.icon} onClick={this.showCart}/>
                        <div className={styles.count}>{this.props.count}</div>
                    </div>
                    { this.state.cart && <Cart showCart={this.showCart} order={this.props.order}/>}
                </div>
                <div>
                    <PoweroffOutlined className={styles.logoutIcon} onClick={this.logOut}/>
                </div>
            </div>
        );
    }
}

export default withRouter(Menu);