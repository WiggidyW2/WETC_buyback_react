import React from "react";
import './ItemRow.css';

export default class ItemRow extends React.Component {
  constructor(props) {
    super(props);

    this.quantityFmt = this.quantityFmt.bind(this);
    this.pricePerFmt = this.pricePerFmt.bind(this);
    this.priceTotalFmt = this.priceTotalFmt.bind(this);
    this.getSubItemsJson = this.getSubItemsJson.bind(this);
    this.getSubItems = this.getSubItems.bind(this);

    this.subItems = this.getSubItemsJson();
  }

  getSubItemsJson() {
    if (this.props.source.substring(0, 2) === "MP") {
      return JSON.parse(this.props.source.substring(2));
    } else {
      return {
        description: this.props.source,
        values: [],
      };
    }
  }

  getSubItems() {
    return this.subItems.values.map(jsonRow => (
      <ItemRow
        className={"SubItemRow"}
        name={jsonRow.item + " (Reprocessed ↑)"}
        quantity={jsonRow.quantity * this.props.quantity}
        source={jsonRow.description}
      />
    ))
  }

  quantityFmt() {
    return this.props.quantity.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
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
    return this.subItems.description;
  }

  render() {
    return (
      <>
      <tr className={this.props.className}>
        <td className={"col1"}>{this.props.name}</td>
        <td className={"col2"}>{this.quantityFmt()}</td>
        <td className={"col3"}>{this.pricePerFmt()}</td>
        <td className={"col4"}>{this.priceTotalFmt()}</td>
        <td className={"col5"}>{this.sourceFmt()}</td>
      </tr>
      {this.getSubItems()}
      </>
    );
  }
}
