import React, { Component } from "react";
import "./App.css";
import Papa from "papaparse";

class App extends Component {
  state = {
    doe: [],
    data: [],
    filtered: [],
    questions: [],
    answers: [],
    query: ""
  };

  componentDidMount() {
    this.setState({
      doe: this.state.data.map(input =>{
        
      })
    })
  }

  setQuery = event => {
    this.setState({
      query: event.target.value,
      filtered: this.state.data.filter(question =>
        question.toLowerCase().includes(event.target.value.toLowerCase())
      )
    });
  };

  componentWillMount() {
    this.getCsvData();
  }

  fetchCsv = async () => {
    const response = await fetch("./data.csv");
    console.log(response);
    let reader = response.body.getReader();
    let decoder = new TextDecoder("utf-8");
    const result = await reader.read();
    return decoder.decode(result.value);
  };

  getData = result => {
    this.setState({
      data: result.data,
      questions: result.data.filter(el => !isNaN(parseFloat(el[0]))),
      answers: result.data.filter(el => el[2] === "+")
    });
  };

  async getCsvData() {
    let csvData = await this.fetchCsv();

    Papa.parse(csvData, {
      complete: this.getData
    });
  }

  render() {
    this.state.data.forEach(el => {
      if (!isNaN(parseFloat(el[0]))) console.log(el[1]);
    });
    this.state.data.forEach(el => {
      if (el[2] === "+") console.log(el[1]);
    });
    return (
      <div className="App">
        <input type="text" value={this.state.query} onChange={this.setQuery} />
        <ul>
          {this.state.filtered.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
