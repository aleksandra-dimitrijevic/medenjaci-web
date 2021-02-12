import React from "react";
import styles from './HomeCustomer.module.css';
import Menu from './Menu/Menu';
import Image from './Image/Image'
import {products} from "../../../data/products";
import {LeftOutlined, RightOutlined} from '@ant-design/icons';

class HomeCustomer extends React.Component {
  state = {
    page: 0,
    allProducts: [],
    count: 0
  }
  addCount = () => {
    this.setState({count: this.state.count + 1})
  }

  componentDidMount() {
    var allProducts = [...products];
    if (JSON.parse(localStorage.getItem('products'))) allProducts = allProducts.concat(JSON.parse(localStorage.getItem('products')));
    this.setState({allProducts: allProducts})
    let cart = localStorage.getItem('cart');
    if (cart) cart = JSON.parse(cart);
    else return;
    const user = JSON.parse(localStorage.getItem('user'))
    if (user.username === cart.user.username) {
      this.setState({count: cart.products.length})
      return;
    }
    localStorage.removeItem('cart');
  }

  nextPage = () => {
    const {allProducts} = this.state;
    const nextP = this.state.page * 6 + 5 > allProducts.length ? this.state.page : this.state.page + 1;
    this.setState({page: nextP})
  }
  previousPage = () => {
    const nextP = this.state.page ? this.state.page - 1 : this.state.page;
    this.setState({page: nextP})
  }
  order = () => {
    this.setState({count: 0});
  }

  render() {
    const {allProducts} = this.state;
    const productsOnPage = allProducts.slice(this.state.page * 6, this.state.page * 6 + 5 < allProducts.length ? this.state.page * 6 + 6 : allProducts.length + 1);
    const honeys = [];
    productsOnPage.forEach((product, index) => {
      honeys.push(<Image product={product} addCount={this.addCount} index={index}/>);
      if (index % 3 === 2) honeys.push(<div className={styles.break}/>)
    })
    return (
      <div className={styles.home}>
        <div className={styles.backgroundImage}>
          <Menu onLogOut={this.props.onLogOut} count={this.state.count} order={this.order}></Menu>
          <div className={styles.arrows}>
            <div className={styles.arrow}>
              {this.state.page !== 0 && <LeftOutlined onClick={this.previousPage}/>}
            </div>
            <div className={styles.productsWrapper}>
              {honeys}
            </div>
            <div className={styles.arrow}>
              {this.state.page * 6 + 5 < allProducts.length && <RightOutlined onClick={this.nextPage}/>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeCustomer;