//
// Copyright 2021 The Dapr Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//     http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

import React from 'react';
import lzbase62 from 'lzbase62';

export class MessageForm extends React.Component {
    constructor(props) {
      super(props);

      this.state = this.getInitialState();
    }
  
    handleInputChange = (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      console.log(`Setting ${name} to ${value}`)
      this.setState({
        [name]: value
      });
    }

    handleSubmit = (event) => {
        this.state.message = lzbase62.compress(this.state.message)
        fetch('/publish', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:"POST",
            body: JSON.stringify(this.state),
        });
        this.state.messageType = "Resultado"
        fetch('/publish', {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          method:"POST",
          body: JSON.stringify(this.state),
      });
        event.preventDefault();
        this.setState(this.getInitialState());
    }

    getInitialState = () => {
      return {
        messageType: "Compresion",
        message: ""
      };
    }

    render() {
      return (
        <div class="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content">
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Select Message Type</label>
          <select className="custom-select custom-select-lg mb-3" name="messageType" onChange={this.handleInputChange} value={this.state.messageType}>
            <option value="Compresion">Comprimir</option>
          </select>
        </div>
        <div className="form-group">
          <label>Enter message</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="message" onChange={this.handleInputChange} value={this.state.message} placeholder="Enter message here"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
      );
    }
  }