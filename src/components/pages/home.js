import React, {Component} from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  componentWillMount() {
    fetch('/api/home').then(response => {
      return response.json()
    }).then(result => {
      this.setState({message: result.message})
    });
  }

  render() {
    return (
      <div>
        <h1>Homepage</h1>
        <p>{this.state.message}</p>
      </div>
    );
  }
}