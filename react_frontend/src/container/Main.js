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
        this.addJudge = this.addJudge.bind(this);
        this.updateJudge = this.updateJudge.bind(this);
    }

    getJudges = () => {
        let table = '';
        axios.get("http://localhost:8080/judges").then(res => {
            for (let i = 0; i < res.data.length; i++) {
                if (i === res.data.length - 1) {
                    table = table + res.data[i].firstName + " " + res.data[i].lastName + "(" + res.data[i].id + ")";
                } else {
                    table = table + res.data[i].firstName + " " + res.data[i].lastName + "(" + res.data[i].id + "), \\n";
                }
            }

            this.setState({judgeJson: table});

        }, err => {
            console.log("Error: " + err);
        });
    };

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
        axios.delete("http://localhost:8080/judges/" + number).then(() => {
            alert("Judge " + this.state.firstName + " " + this.state.lastName + " has been deleted.");
            this.setState({
                id: '',
                firstName: '',
                lastName: '',
                number: ''
            })
        })
    }

    addJudge(firstName, lastName, number) {
        axios.post('http://localhost:8080/judges', {
            firstName: firstName,
            lastName: lastName,
            number: number
        }).then(() => {
            alert("Judge " + firstName + " " + lastName + " has been added.");
        });
        window.location.reload();
    }

    updateJudge(id, firstName, lastName, number) {
        axios.put('http://localhost:8080/judges/' + id, {
            firstName: firstName,
            lastName: lastName,
            number: number
        }).then(() => {
            alert("Judge " + firstName + " " + lastName + " has been updated.");
        });
        window.location.reload();
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
                                <label><b>Judges: </b></label>
                            </div>
                            <div className="col-sm-7">
                                {this.state.judgeJson.split('\\n').map((item, key) => {
                                    return <span key={key}>{item}<br/></span>
                                })}
                            </div>
                            <div className="col-sm-1"></div>
                            <div className="col-sm-2">
                                <button className="btn btn-success" onClick={() => this.getJudges()}>Get Judges</button>
                            </div>
                        </div>

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
                                <input className="form-control" defaultValue={this.state.firstName} onChange={(evt) => { this.setState({firstName: evt.target.value}) }} />
                            </div>
                            <div className="col-sm-1"></div>
                            <div className="col-sm-2">
                                <button className="btn btn-success" onClick={() => this.addJudge(this.state.firstName, this.state.lastName, this.state.number)}>Add Judge</button>
                            </div>
                        </div>

                        <div className="form-inline">
                            <div className="col-sm-2">
                                <label><b>Last Name: </b></label>
                            </div>
                            <div className="col-sm-2">
                                <input className="form-control" defaultValue={this.state.lastName} onChange={(evt) => { this.setState({lastName: evt.target.value}) }} />
                            </div>
                            <div className="col-sm-1"></div>
                            <div className="col-sm-2">
                                <button className="btn btn-warning" onClick={() => this.updateJudge(this.state.idToGrab, this.state.firstName, this.state.lastName, this.state.number)}>Update Judge</button>
                            </div>
                        </div>

                        <div className="form-inline">
                            <div className="col-sm-2">
                                <label><b>Number: </b></label>
                            </div>
                            <div className="col-sm-2">
                                <input className="form-control" defaultValue={this.state.number} onChange={(evt) => { this.setState({number: evt.target.value}) }} />
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