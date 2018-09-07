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
            alert("Judge " + this.state.firstName + " " + this.state.lastName + " has been deleted.");
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
                <div className="App-intro">
                    <span>
                        <br/>

                        <div className="form-inline">
                            <div className="col-sm-2">
                                <label><b>Enter Judge ID: </b></label>
                            </div>
                            <div className="col-sm-2">
                                <input className="form-control" onChange={(evt) => { this.setState({idToGrab: evt.target.value}) }} />
                            </div>
                            <div className="col-sm-1"></div>
                            <div className="col-sm-2">
                                <button className="btn btn-primary" onClick={() => this.getJudge(this.state.idToGrab)}>Get Judge Details</button>
                            </div>
                        </div>

                        <br/><br/><br/><br/>

                        <div className="form-inline">
                            <div className="col-sm-2">
                                <label><b>First Name: </b></label>
                            </div>
                            <div className="col-sm-2">
                                <input className="form-control" defaultValue={this.state.firstName} />
                            </div>
                        </div>

                        <div className="form-inline">
                            <div className="col-sm-2">
                                <label><b>Last Name: </b></label>
                            </div>
                            <div className="col-sm-2">
                                <input className="form-control" defaultValue={this.state.lastName} />
                            </div>
                        </div>

                        <div className="form-inline">
                            <div className="col-sm-2">
                                <label><b>Number: </b></label>
                            </div>
                            <div className="col-sm-2">
                                <input className="form-control" defaultValue={this.state.number} />
                            </div>
                            <div className="col-sm-1"></div>
                            <div className="col-sm-2">
                                <button className="btn btn-danger" onClick={() => this.deleteJudge(this.state.idToGrab)}>Delete Judge</button>
                            </div>
                        </div>
                    </span>
                </div>
            </div>
        );
    }
}

export default Main;