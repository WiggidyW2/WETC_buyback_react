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

  render() {
    return (
      <table className={"ItemTable"}>
        <thead>
          <tr>
            <td className={"col1"}>{"Name"}</td>
            <td className={"col2"}>{"Quantity"}</td>
            <td className={"col3"}>{"Single (price)"}</td>
            <td className={"col4"}>{"Total (price)"}</td>
          </tr>
        </thead>
        <tbody>
          {this.props.rows.map(jsonRow => (
            <ItemRow
              name={jsonRow.name}
              quantity={jsonRow.quantity}
              price_per={jsonRow.price_per}
              price_total={jsonRow.price_total}
            />
          ))}
        </tbody>
      </table>
    );
  }
}
