import React from "react";
import MainLayout from "../MainLayout/MainLayout";
import styles from "./AddProduct.module.css";
import {Button, Divider, Form} from "antd";
import { Input, Select } from 'antd';
import {CheckCircleOutlined} from "@ant-design/icons";
import HoneyImage1 from '../../../data/images/i1.jpg';
import HoneyImage2 from '../../../data/images/i2.jpg';
import HoneyImage6  from '../../../data/images/i6.webp';

const { TextArea } = Input;
const { Option } = Select;


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

class AddProduct extends React.Component{

    state = {
        picture:HoneyImage1,
        added: false
    }
    choosePicture = (value) => {
        this.setState({picture: value})
    }
    addProduct = (values) => {
        const products = localStorage.getItem('products');
        let productsP = [];
        if(products) productsP = JSON.parse(products);
        productsP.push({...values, image: this.state.picture});
        localStorage.setItem('products', JSON.stringify(productsP));
        this.setState({added:true});
    }
    render(){
        return (
            <MainLayout onLogOut={this.props.onLogOut}>
                <div className={styles.AddProduct}>
                    <div className={styles.content}>
                        <div className={styles.header}>
                            Dodaj proizvod
                        </div>
                        <Divider style={{margin:'0px'}}/>
                        <div className={styles.details}>
                            <div>
                                <div className={styles.imageWrapper}>
                                    <div className={styles.imageHoney} style={{backgroundImage: `url(${this.state.picture})`}}/>
                                </div>
                                <div className={styles.choosePictire}>
                                    <Select defaultValue={HoneyImage1} style={{ width: 200 }}  onChange={this.choosePicture}>
                                        <Option value={HoneyImage1}>Livadski med 1kg</Option>
                                        <Option value={HoneyImage2}>Sumski med 1kg</Option>
                                        <Option value={HoneyImage6}>Med sa sacem 1kg</Option>
                                    </Select>
                                </div>
                            </div>
                            <div className={styles.info}>
                                <br/>
                                <Form
                                    {...layout}
                                    name="basic0"
                                    style={{width:'100%'}}
                                    onFinish={this.addProduct}
                                >
                                    <Form.Item
                                        label="Naziv:"
                                        name="name"
                                        rules={[{ required: true, message: "Please input product name!" }]}
                                    >
                                        <Input/>
                                    </Form.Item>

                                    <Form.Item
                                        label="Cena:"
                                        name="price"
                                        rules={[{ required: true, message: "Please input product price!" }]}
                                    >
                                        <Input/>
                                    </Form.Item>

                                    <Form.Item
                                        label="Opis:"
                                        name="description"
                                        rules={[{ required: true, message: "Please input product description!" }]}
                                    >
                                        <TextArea rows={3} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Nacin koriscenja:"
                                        name="usage"
                                        rules={[{ required: true, message: "Please input product usage!" }]}
                                    >
                                        <TextArea rows={3} />
                                    </Form.Item>
                                    <Form.Item {...tailLayout}>
                                        {!this.state.added  &&  <Button className='orangeButton' htmlType="submit">
                                            Dodaj proizvod
                                        </Button>}
                                        {this.state.added  && (
                                          <div className={styles.message}>
                                              <CheckCircleOutlined className={styles.checked}/>
                                              Proizvod je uspesno dodat!
                                          </div>
                                        )}
                                    </Form.Item>

                                </Form>
                            </div>
                        </div>
                        <div className={styles.addToCart}>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }

}

export default AddProduct;