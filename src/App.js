import Appraisal from "./Appraisal";
import PasteBox from "./PasteBox";
import React from "react";
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appraisal: <Appraisal key={""}/>,
    };

    this.serviceFetch = this.serviceFetch.bind(this);
    this.setAppraisal = this.setAppraisal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePath = this.handlePath.bind(this);
    this.setHash = this.setHash.bind(this);
    this.getHash = this.getHash.bind(this);
  }

  async componentDidMount() {
    await this.handlePath();
  }

  async handlePath() {
    const validHash = new RegExp("[0123456789abcdef]{15,16}$");
    if (validHash.test(this.getHash())) {
      const data = await this.serviceFetch({
        hash: this.getHash(),
      });
      this.setAppraisal(data);
      // this.forceUpdate();
    }
  }

  async handleSubmit(location, text) {
    const data = await this.serviceFetch({
      location: location,
      raw: text,
    })
    this.setAppraisal(data);
    this.setHash(data.hash);
  }

  async serviceFetch(body) {
    const rep = await fetch(
      "https://wetc-buyback-service-a26gyppleq-uc.a.run.app",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    return await rep.json();
  }

  setAppraisal(data) {
    this.setState({appraisal:
      <Appraisal
        key={data.hash}
        accepted={data.accepted}
        rejected={data.rejected}
        hash={data.hash}
        location={data.location}
        sum={data.sum}
        timestamp={data.timestamp}
        version={data.version}
      />
    });
  }

  getHash() {
    return window.location.pathname.substring(1);
  }

  setHash(hash) {
    window.history.pushState({}, "", "/" + hash);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

          <PasteBox handleSubmit={this.handleSubmit}/>
          
          {this.state.appraisal}
        </header>
      </div>
    );
  }
}
