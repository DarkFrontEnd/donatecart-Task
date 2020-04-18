import React from 'react';
import ProductList from './jsonData/products.json';
import './products.css';

class ProductsData extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'INR', currVal: null, };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
    const url = "https://api.exchangeratesapi.io/latest?base=INR";
    fetch(url).then(res => res.json()).then(
      result => {
        this.setState({
          currVal: result.rates[this.state.value]
        });
      })
  }
  render() {
    return (
      <div>
        <label for="Currency">Currency </label>
        <select value={this.state.value} onChange={this.handleChange} class="custom-select">
          <option value="INR">INR</option>
          <option value="USD">USD</option>
        </select>
        <div class="flex-container">
        {ProductList.product.map((productJsonData, index) => {
          return <div>
            <img src={require('./images' + productJsonData.imagesrc)} width="100px" height="100px" />
            <h6>{productJsonData.name}</h6>
        <p>{this.state.value == 'INR' ? <span>&#8377;</span> : <span>&#36;</span>}{this.state.value == 'INR' ? (productJsonData.price).toFixed(2) : (productJsonData.price * this.state.currVal).toFixed(3)}</p>
            </div>
        })}
        </div>
      </div>)
  }
}
export default ProductsData;