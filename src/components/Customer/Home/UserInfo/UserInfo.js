import React from "react";
import styles from '../HomeCustomer.module.css';
import Menu from '../Menu/Menu';
import UserInfo from "../../../UserInfo/UserInfo";

class UserInfoCustomer extends React.Component{
  state ={
    count:0
  }
  componentDidMount() {
    let cart = localStorage.getItem('cart');
    if(cart) {
      cart = JSON.parse(cart);
      this.setState({ count: cart.products.length});
    }
  }

  order = () => {
    this.setState({count:0});
  }
  render(){
    return (
      <div className={styles.home}>
        <div className={styles.backgroundImage}>
          <Menu onLogOut={this.props.onLogOut} count={this.state.count} order={this.order}></Menu>
          <UserInfo style={{height:"100%"}}/>
        </div>
      </div>
    );
  }
}

export default UserInfoCustomer;