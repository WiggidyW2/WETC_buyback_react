import React from "react";
import './ItemRow.css';

export default class ItemRow extends React.Component {
  constructor(props) {
    super(props);
    this.quantityFmt = this.quantityFmt.bind(this);
    this.pricePerFmt = this.pricePerFmt.bind(this);
    this.priceTotalFmt = this.priceTotalFmt.bind(this);
  }

  quantityFmt() {
    return this.props.quantity.toLocaleString();
  }

  pricePerFmt() {
    if (this.props.price_per !== undefined) {
      return this.props.price_per.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } else {
      return "";
    }
  }

  priceTotalFmt() {
    if (this.props.price_per !== undefined) {
      return this.props.price_total.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } else {
      return "";
    }
  }

  sourceFmt() {
    return this.props.source;
  }

  render() {
    return (
      <tr className={"ItemRow"}>
        <td className={"col1"}>{this.props.name}</td>
        <td className={"col2"}>{this.quantityFmt()}</td>
        <td className={"col3"}>{this.pricePerFmt()}</td>
        <td className={"col4"}>{this.priceTotalFmt()}</td>
        <td className={"col5"}>{this.sourceFmt()}</td>
      </tr>
    );
  }
}
