import React from "react";
import styles from "./Order.module.css";
import 'antd/dist/antd.css';
import {Button, Divider, Input } from 'antd';
import {CheckCircleOutlined, CloseCircleOutlined, ShoppingCartOutlined} from '@ant-design/icons';


class  Order extends React.Component{
  state={
    days: 0,
    status:0
  }
  componentDidMount() {
    this.setState({
      status: this.props.order.status? this.props.order.status: 0,
      days: this.props.order.days? this.props.order.days :0
    })
  }

  onInputChange = (event) =>{
    this.setState({days: event.target.value})
  }
  acceptOrder = () =>{
    if(!this.state.days) return;
    let orders = JSON.parse(localStorage.getItem('orders'));
    orders[this.props.index] = { ...orders[this.props.index], status: 1, days: this.state.days};
    localStorage.setItem('orders', JSON.stringify(orders));
    this.setState({status:1});
    this.props.onStatusChange();
  }
  rejectOrder = () => {
    let orders = JSON.parse(localStorage.getItem('orders'));
    orders[this.props.index] = { ...orders[this.props.index], status: -1};
    localStorage.setItem('orders', JSON.stringify(orders));
    this.setState({status:-1});
    this.props.onStatusChange();
  }

  render(){

      const products = [];
      const sum = this.props.order.products.reduce((a, b) => a + (b.quantity*b.product.price || 0), 0);
      this.props.order.products.forEach( product => {
        products.push(
          <li>
            <div className={styles.item}>
              <div>{product.product.name} </div>
              <div>  x{product.quantity} </div>
              <div>  {product.quantity*product.product.price}din </div>
            </div>
          </li>
        )
      })

    return (
      <>
        <ul>
          {products}
        </ul>
        <div className={styles.days}>
          {this.state.status ===0 && <>
            <div>Vreme isporuke:</div>
            <Input value={this.state.days} className={styles.daysInput} onChange={this.onInputChange}/>
            <div>dan</div>
          </>}
          {this.state.status ===1 && <div>{'Vreme isporuke: '+ this.state.days+ ' dan'}</div>}

        </div>
        <Divider/>
        <div className={styles.footer}>
          <div className={styles.order}>
            <div><ShoppingCartOutlined className={styles.icon}/></div>
            <div>{sum? sum : 0} din</div>
          </div>
          <div>
            { this.state.status!==1 && this.state.status!==-1 && <>
                <Button onClick={this.rejectOrder} style={{marginRight: '8px'}}> Odbij</Button>
                <Button className='orangeButton' onClick={this.acceptOrder}> Prihvati</Button>
              </>}
            { this.state.status ===1 && <div style={{color:'#FFCC00'}}> <CheckCircleOutlined className={styles.checked}/> Prihvacena narudzbina!</div>}
            { this.state.status ===-1 && <div> <CloseCircleOutlined className={styles.checked}/> Odbijena narudzbina!</div>}
          </div>
        </div>
      </>
    );
  }
}

export default Order;