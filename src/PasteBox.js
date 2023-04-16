import React from "react";
import './PasteBox.css';

export default class PasteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: "",
      locationValue: "",
    };

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleLocationChange(event) {
    this.setState({locationValue: event.target.value});
  }

  handleTextChange(event) {
    this.setState({textValue: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.locationValue !== "" && this.state.textValue !== "") {
      await this.props.handleSubmit(
        this.state.locationValue,
        this.state.textValue,
      );
    }
  }

  render() {
    return (
      <form className="PasteBox" onSubmit={this.handleSubmit}>
        <label>
          <textarea
            rows={12}
            value={this.state.textValue}
            onChange={this.handleTextChange}
            placeholder="paste items here"
          />
          <select
            value={this.state.locationValue}
            onChange={this.handleLocationChange}
          >
            <option value="" disabled>select location</option>
            <option value="1DQ">1DQ1-A</option>
            <option value="Delve">Delve</option>
            <option value="Querious">Querious</option>
            <option value="Period Basis">Period Basis</option>
            <option value="Senda">Senda</option>
          </select>
          <input
            type="submit"
            value="Submit"
          />
        </label>
      </form>
    );
  }
}
