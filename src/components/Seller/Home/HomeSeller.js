import React from "react";
import MainLayout from "../MainLayout/MainLayout";
import styles from "./HomeSeller.module.css";
import 'antd/dist/antd.css';
import { Collapse } from 'antd';
import Order from "./Order/Order";

const { Panel } = Collapse;

function callback(key) {

}
class HomeSeller extends React.Component{
    state = {
        orders:[]
    };

    componentDidMount() {
        const orders = localStorage.getItem('orders');
        if(orders) this.setState({orders: JSON.parse(orders)});
    }
    onStatusChange = () => {
        const orders = localStorage.getItem('orders');
        if(orders) this.setState({orders: JSON.parse(orders)});
    }

    render(){
        const ordersDisplay = [];
        this.state.orders.forEach( (order,index) =>{
            ordersDisplay.push(
              <Panel
                header={order.user?.firstName+ ' ' +order.user?.lastName}
                key={index+1}
                className={ order.status === 1 ? styles.accepted : order.status === -1 ? styles.rejected : styles.neutral}
              >
                <Order order={order} index={index} onStatusChange={this.onStatusChange}/>
              </Panel>
            )
        });

        return (
            <MainLayout onLogOut={this.props.onLogOut}>
                <Collapse
                defaultActiveKey={['1']}
                onChange={callback}
                expandIconPosition='right'
                style={{width:'90%',height:'90%',overflowY: "auto"}}
                >
                    {ordersDisplay}
                </Collapse>
            </MainLayout>
        );
    }
}

export default HomeSeller;