import React, { Component } from 'react';
import '../css/App.css';
import axios from 'axios';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            judgeJson: '',
            id: '',
            firstName: '',
            lastName: '',
            number: '',
            idToGrab: ''
        };

        this.getJudges = this.getJudges.bind(this);
        this.getJudge = this.getJudge.bind(this);
        this.deleteJudge = this.deleteJudge.bind(this);
    }

    getJudges() {
        axios.get("http://localhost:8080/judges").then(res => {
            console.log(res.data);
            let thing = '';
            for (let i = 0; i < res.data.length; i++) {
                thing = thing + "First Name: " + res.data[i].firstName + " --- ";
            }
            // this.setState({judgeJson: "id: " + res.data[0].id + " --- first name: " + res.data[0].firstName
            //         + " --- last name: " + res.data[0].lastName + " --- number: " + res.data[0].number});
            this.setState({judgeJson: thing})
        }, err => {
            console.log("Error: " + err);
        })
    }

    getJudge(number) {
        axios.get("http://localhost:8080/judges/" + number).then(res => {
            this.setState({
                id: res.data.id,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                number: res.data.number
            })
        }, err => {
            console.log(err);
        })
    }

    deleteJudge(number) {
        axios.delete("http://localhost:8080/judges/" + number).then(res => {
            console.log("Deleted!");
            this.setState({
                id: '',
                firstName: '',
                lastName: '',
                number: ''
            })
        })
    }

    render() {
        return (
            <div className="Main">
                <header className="App-header">
                    <h1 className="App-title">Judge Actions</h1>
                </header>
                <p className="App-intro">
                    <span>
                        <input id="number" onChange={(evt) => { this.setState({idToGrab: evt.target.value}) }} />
                        <button class="btn btn-primary" onClick={() => this.getJudge(this.state.idToGrab)}>Get Judge</button> <br/>
                        {/*<span>{this.state.judgeJson}</span>*/}
                        {/*<input defaultValue={this.state.id} /> <br/>*/}
                        First Name: <input defaultValue={this.state.firstName} /> <br/>
                        Last Name: <input defaultValue={this.state.lastName} /> <br/>
                        Number: <input defaultValue={this.state.number} /> <br/>
                        {/*<button>Update Judge</button> <br/>*/}
                        <button onClick={() => this.deleteJudge(this.state.idToGrab)}>Delete Judge</button>
                    </span>
                </p>
            </div>
        );
    }
}

export default Main;