import ItemTable from "./ItemTable";
import PropTypes from "prop-types";
import React from "react";
import './Appraisal.css';

const HelperStyle = {
  border: "4px solid rgb(151, 0, 210)",
}

export default class Appraisal extends React.Component {
  static propTypes = {
    accepted: PropTypes.array,
    rejected: PropTypes.array,
    hash: PropTypes.string,
    location: PropTypes.string,
    sum: PropTypes.number,
    timestamp: PropTypes.number,
    version: PropTypes.string,
  }

  static defaultProps = {
    accepted: [],
    rejected: [],
    hash: undefined,
    location: undefined,
    sum: undefined,
    timestamp: undefined,
    version: undefined,
  }
  
  constructor(props) {
    super(props);
    this.hashFmt = this.hashFmt.bind(this);
    this.locationFmt = this.locationFmt.bind(this);
    this.sumFmt = this.sumFmt.bind(this);
    this.localTzFmt = this.localTzFmt.bind(this);
    this.eveTzFmt = this.eveTzFmt.bind(this);
    this.versionFmt = this.versionFmt.bind(this);
  }

  hashFmt() {
    if (this.props.hash === undefined) {
      return "";
    } else {
      return this.props.hash;
    }
  }

  locationFmt() {
    if (this.props.location === undefined) {
      return "";
    } else {
      return this.props.location;
    }
  }

  sumFmt() {
    if (this.props.sum === undefined) {
      return "0";
    } else {
      return this.props.sum.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    }
  }

  localTzFmt() {
    if (this.props.timestamp === undefined || this.props.timestamp === 0) {
      return "";
    } else {
      return new Date(this.props.timestamp * 1000).toLocaleString()
    }
  }

  eveTzFmt() {
    if (this.props.timestamp === undefined || this.props.timestamp === 0) {
      return "";
    } else {
      return new Date(this.props.timestamp * 1000).toUTCString();
    }
  }

  versionFmt() {
    if (this.props.version === undefined || this.props.version === "") {
      return "";
    } else {
      return this.props.version
    }
  }

  helperStr() {
    if (this.props.sum > 0.0) {
      return (
        <div style={HelperStyle}>
          {"Contract to: "}
          <strong>{"War Eagle Trading Co."}</strong>
          <br></br>
          {"Reward: "}
          <strong>{this.sumFmt()}</strong> 
          <br></br>
          {"Description: "}<strong>{this.hashFmt()}</strong> 
        </div>
      );
    } else {
      return undefined;
    }
  }

  render() {
    return (
      <div className={"Appraisal"}>
        <div className={"Helper"}>
          {this.helperStr()}
        </div>
        <table className={"Results"}>
          <thead>
            <tr>
              <td>{"Location"}</td>
              <td>{"Total"}</td>
              <td>{"Hash"}</td>
              <td>{"Local TZ"}</td>
              <td>{"EVE TZ"}</td>
              <td>{"Version"}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.locationFmt()}</td>
              <td>{this.sumFmt()}</td>
              <td>{this.hashFmt()}</td>
              <td>{this.localTzFmt()}</td>
              <td>{this.eveTzFmt()}</td>
              <td>{this.versionFmt()}</td>
            </tr>
          </tbody>
        </table>
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
