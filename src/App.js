import React, { Component } from 'react';
import './App.css';
import Papa from 'papaparse';

class App extends Component {
  state = {
    data: [],
    filtered: [],
    query: ""
  }

  setQuery = event => {
    this.setState({
      query: event.target.value,
      filtered: this.state.data.filter(question =>
        question.toLowerCase().includes(event.target.value.toLowerCase()))
    })
  }

  getCsvData = () => {
    let csvData = require('./data.csv');

    Papa.parse(csvData, {
      complete: this.getData
    });
  }

  componentWillMount() {
    this.fetchCsv();
  }

  fetchCsv = () => {
    return fetch('./data.csv').then(function (response) {
      let reader = response.body.getReader();
      let decoder = new TextDecoder('utf-8');

      return reader.read().then(function (result) {
        return decoder.decode(result.value);
      });
    });
  }

  getData = (result) => {
    console.log(result)
    this.setState({ data: result.data });
  }

  render() {
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
