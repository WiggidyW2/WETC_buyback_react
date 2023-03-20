import ItemTable from "./ItemTable";
import PropTypes from "prop-types";
import React from "react";
import './Appraisal.css';

export default class Appraisal extends React.Component {
  static propTypes = {
    accepted: PropTypes.array,
    rejected: PropTypes.array,
    hash: PropTypes.string,
    location: PropTypes.string,
    sum: PropTypes.number,
  }

  static defaultProps = {
    accepted: [],
    rejected: [],
    hash: undefined,
    location: undefined,
    sum: undefined,
  }
  
  constructor(props) {
    super(props);
    this.hashFmt = this.hashFmt.bind(this);
    this.locationFmt = this.locationFmt.bind(this);
    this.sumFmt = this.sumFmt.bind(this);
  }

  hashFmt() {
    if (this.props.hash === undefined) {
      return "N/A";
    } else {
      return this.props.hash;
    }
  }

  locationFmt() {
    if (this.props.location === undefined) {
      return "N/A";
    } else {
      return this.props.location;
    }
  }

  sumFmt() {
    if (this.props.sum === undefined) {
      return "0.00";
    } else {
      return this.props.sum.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  }

  helperStr() {
    if (this.props.sum > 0.0) {
      return (
        <div>
          {"Send your contract to "}
          <strong>{"War Eagle Trading Co."}</strong> 
          {" for the amount "}
          <strong>{this.sumFmt()}</strong> 
          {" and put "}<strong>{this.hashFmt()}</strong> 
          {" in the note."}
        </div>
      );
    } else {
      return undefined;
    }
  }

  render() {
    return (
      <div className={"Appraisal"}>
        <table className={"Results"}>
          <thead>
            <tr>
              <td>Location</td>
              <td>Total</td>
              <td>Hash</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.locationFmt()}</td>
              <td>{this.sumFmt()}</td>
              <td>{this.hashFmt()}</td>
            </tr>
          </tbody>
        </table>
        <div className={"Helper"}>
          {this.helperStr()}
        </div>
        <div className={"AcceptedHeader"}>ACCEPTED</div>
        <div className={"AcceptedTable"}>
          <ItemTable rows={this.props.accepted}/>
        </div>
        <div className={"RejectedHeader"}>REJECTED</div>
        <div className={"RejectedTable"}>
          <ItemTable rows={this.props.rejected}/>
        </div>
      </div>
    );
  }
}
