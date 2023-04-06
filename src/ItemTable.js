import PropTypes from "prop-types";
import ItemRow from "./ItemRow";
import React from "react";
import './ItemTable.css';

export default class ItemTable extends React.Component {
  static propTypes = {
    rows: PropTypes.array,
  };

  static defaultProps = {
    rows: [],
  };

  constructor(props) {
    super(props);

    this.getTbody = this.getTbody.bind(this);
  }

  getTbody() {
    return this.props.rows.map(jsonRow => (
      <ItemRow
        className={"ItemRow"}
        name={jsonRow.name}
        quantity={jsonRow.quantity}
        price_per={jsonRow.price_per}
        price_total={jsonRow.price_total}
        source={jsonRow.source}
      />
    ))
  }

  render() {
    return (
      <table className={"ItemTable"}>
        <thead>
          <tr>
            <td className={"col1"}>{"Name"}</td>
            <td className={"col2"}>{"Quantity"}</td>
            <td className={"col3"}>{"Single Ƶ"}</td>
            <td className={"col4"}>{"Total Ƶ"}</td>
            <td className={"col5"}>{"Source"}</td>
          </tr>
        </thead>
        <tbody>
          {this.getTbody()}
        </tbody>
      </table>
    );
  }
}
