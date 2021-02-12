import React from "react";
import styles from './Cart.module.css';
import {CloseCircleOutlined, ShoppingCartOutlined,CheckCircleOutlined} from "@ant-design/icons";
import {Button, Divider} from "antd";

class Cart extends React.Component{
    state = {
        content: [],
        ordered: false,
    }
    componentDidMount() {
        const cart = JSON.parse(localStorage.getItem('cart'));
        if(cart)this.setState({content:cart.products});
    }
    order = () =>{
        const orders = localStorage.getItem('orders');
        const cart = JSON.parse(localStorage.getItem('cart'));
        let ordersP = [];
        if(orders) ordersP = JSON.parse(orders);
        ordersP.push(cart);
        localStorage.setItem('orders', JSON.stringify(ordersP));
        localStorage.removeItem('cart');
        this.setState({ordered:true, content:[]});
        this.props.order();
    }
    render(){
        const products = []
        this.state.content?.forEach( product => {
            products.push(
                <div className={styles.item}>
                    <div>{product.product.name} </div>
                    <div>  x{product.quantity} </div>
                    <div>  {product.quantity*product.product.price}din </div>
                </div>
            )
        })
        const sum = this.state.content?.reduce((a, b) => a + (b.quantity*b.product.price || 0), 0);
        return (
            <>
                <div
                    className={styles.CartBackground}
                    onClick={this.props.showCart}
                />
                <div className={styles.Cart}>
                    <div className={styles.header}>
                        <div > Stavke </div>
                        <div>
                            <CloseCircleOutlined  onClick={this.props.showCart}/>
                        </div>
                    </div>
                    <Divider style={{margin:'0px'}}/>
                    <div className={styles.items}>
                        {products}
                    </div>
                    <div className={styles.footer}>
                        <Divider style={{margin:'0px'}}/>
                        { !this.state.ordered &&  <div className={styles.order}>
                            <div style={{'display':'flex'}}>
                                <div><ShoppingCartOutlined className={styles.icon}/></div>
                                <div>{sum? sum : 0} din</div>
                            </div>
                            <div>
                                <Button className='orangeButton' onClick={this.order}> Naruci</Button>
                            </div>
                        </div>}
                        { this.state.ordered && <div className={styles.order}>
                            <div></div>
                            <div className={styles.message}>
                                <CheckCircleOutlined className={styles.checked}/>
                                Narudzbina poslata!</div>
                        </div>}
                    </div>
                </div>
            </>
        );
    }
}

export default Cart;