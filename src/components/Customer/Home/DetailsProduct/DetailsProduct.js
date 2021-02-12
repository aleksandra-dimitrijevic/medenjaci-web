import React from "react";
import styles from './DetailsProduct.module.css';
import {Button, Divider} from 'antd';
import {ShoppingCartOutlined, PlusCircleOutlined, MinusCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import '../../../../App.css'
import { Input } from 'antd';


class DetailsProduct extends React.Component{

    state={
        quantity:1,
        added: false
    }
    handleBack = () => {
        this.props.showDetails();
    }
    onInputChange = ( event) => {
        this.setState({quantity: event.target.value? parseInt(event.target.value): null})
    }
    increment = () => {
        this.setState({quantity: this.state.quantity+1})
    }
    decrement = () => {
        this.setState({quantity: this.state.quantity>1?this.state.quantity-1:this.state.quantity})
    }
    addToCart = () => {
        const cart = localStorage.getItem('cart');
        const user = JSON.parse(localStorage.getItem('user'))
        let cartP = {products:[],user:user};
        if(cart) cartP = JSON.parse(cart);
        cartP.products.push({
            product: this.props.product,
            quantity: this.state.quantity
        });
        localStorage.setItem('cart', JSON.stringify(cartP));
        this.setState({added:true});
        this.props.addCount();
    }
    render(){
        return (
            <div className={styles.ProductDetails}>
                <div
                    className={styles.ProductDetailsBackground}
                    onClick={this.handleBack}
                />
                <div className={styles.ProductDetailsContent}>
                    <div className={styles.header}>
                        <div > Detalji proizvoda </div>
                        <CloseCircleOutlined className={styles.icon} onClick={this.handleBack}/>
                    </div>
                    <Divider style={{margin:'0px'}}/>
                    <div className={styles.details}>
                        <div>
                            <div className={styles.imageWrapper}>
                                <div className={styles.imageHoney} style={{backgroundImage: `url(${this.props.product.image})`}}/>
                            </div>
                            <div className={styles.quantity}>
                                <b> Kolicina </b>
                                <MinusCircleOutlined className={styles.iconSmall} onClick={this.decrement}/>
                                <Input  value={this.state.quantity} className={styles.quantityInput}  onChange={this.onInputChange}/>
                                <PlusCircleOutlined className={styles.iconSmall} onClick={this.increment}/>
                           </div>
                        </div>
                        <div className={styles.info}>
                           <p> <b>Naziv:</b>  {this.props.product.name} </p>
                            <p> <b>Cena:</b>  {this.props.product.price} din</p>
                            <p> <b>Opis:</b>  {this.props.product.description} </p>
                            <p> <b>Način korišćenja:</b>  {this.props.product.usage} </p>
                        </div>
                    </div>
                    <Divider style={{margin:'8px'}}/>
                    <div className={styles.addToCart}>
                        <div>
                            <ShoppingCartOutlined className={styles.icon}/>
                        </div>
                        <div>
                            { !this.state.added && <Button className='orangeButton' onClick={this.addToCart}> Dodaj u korpu</Button>}
                            { this.state.added && <div className={styles.message}>Proizvod dodat!</div>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailsProduct;