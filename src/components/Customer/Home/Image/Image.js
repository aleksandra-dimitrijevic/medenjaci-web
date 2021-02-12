import React from "react";
import styles from './Image.module.css';
import DetailsProduct from "../DetailsProduct/DetailsProduct";

class Image extends React.Component {
  state = {
    details: false
  }
  showDetails = () => {
    this.setState({details: !this.state.details})
  }

  render() {

    return (
      <>
        {!this.state.details && <div className={styles.product} onClick={this.showDetails}>
          <div className={styles.imageWrapper} >
            <div className={styles.imageHoney} style={{backgroundImage: `url(${this.props.product.image})`}}/>
          </div>
          <span>{this.props.product.name}</span>
          <span>{this.props.product.price} din</span>
        </div>}
        {this.state.details && <div>
          <DetailsProduct
            showDetails={this.showDetails}
            product={this.props.product}
            addCount={this.props.addCount}
          />
        </div>

        }
      </>

    );
  }
}

export default Image;