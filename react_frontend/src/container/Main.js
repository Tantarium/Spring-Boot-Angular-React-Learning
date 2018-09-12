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
            newFirstName: '',
            newLastName: '',
            newNumber: '',
            idToGrab: '',
            enterJudgeIdHidden: true,
            getJudgesButtonHidden: false,
            judgeListHidden: true,
            judgeDetailsHidden: true,
            addJudgeHidden: true
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
                    table = table + res.data[i].firstName + " " + res.data[i].lastName + " --- (" + res.data[i].id + ")";
                } else {
                    table = table + res.data[i].firstName + " " + res.data[i].lastName + " --- (" + res.data[i].id + ")\\n";
                }
            }

            this.setState({
                judgeJson: table,
                enterJudgeIdHidden: false,
                judgeListHidden: false,
                getJudgesButtonHidden: true
            });

        }, err => {
            console.log("Error: " + err);
        });
    };

    //todo --- Need to make sure clicking on this when it is empty will not cause it to load up blank.
    getJudge(number) {
        axios.get("http://localhost:8080/judges/" + number).then(res => {
            this.setState({
                id: res.data.id,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                number: res.data.number,
                enterJudgeIdHidden: true,
                getJudgesButtonHidden: true,
                judgeListHidden: true,
                judgeDetailsHidden: false
            })
        }, err => {
            console.log(err);
        });
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
        });
        window.location.reload();
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
                    <br/>

                    <div className="row justify-content-center">
                        <div className="col-sm-2" hidden={this.state.getJudgesButtonHidden}>
                            <button className="btn btn-primary" onClick={() => this.getJudges()}>
                                Get Judges
                            </button>
                        </div>
                        <div className="col-sm-2" hidden={this.state.getJudgesButtonHidden}>
                            <button
                                className="btn btn-success"
                                onClick={() => this.setState({
                                    addJudgeHidden: false,
                                    getJudgesButtonHidden: true,
                                    judgeDetailsHidden: false
                                })}>
                                Add New Judge
                            </button>
                        </div>
                    </div>

                    <div className="form-inline justify-content-center" hidden={this.state.enterJudgeIdHidden}>
                        <div className="col-sm-2">
                            <label><b>Enter Judge ID: </b></label>
                        </div>
                        <div className="col-sm-2">
                            <input
                                className="form-control"
                                onChange={(evt) => { this.setState({idToGrab: evt.target.value}) }}
                            />
                        </div>
                        <div className="col-sm-2 offset-sm-1">
                            <button className="btn btn-primary" onClick={() => this.getJudge(this.state.idToGrab)}>
                                Get Judge Details
                            </button>
                        </div>
                    </div>

                    <br hidden={this.state.judgeListHidden} />

                    <div className="form-inline justify-content-center" hidden={this.state.judgeListHidden}>
                        <div className="col-sm-2">
                            <label><b>Judges: </b></label>
                        </div>
                        <div className="col-sm-4">
                            {this.state.judgeJson.split('\\n').map((item, key) => {
                                return <span key={key}>{item}<br/></span>
                            })}
                        </div>
                        <div className="col-sm-2">
                            <button className="btn btn-success">Add New Judge</button>
                        </div>
                    </div>

                    <div hidden={this.state.judgeDetailsHidden}>
                        <div className="form-inline justify-content-center">
                            <div className="col-sm-2">
                                <label><b>First Name: </b></label>
                            </div>
                            <div className="col-sm-2">
                                <input
                                    className="form-control"
                                    defaultValue={this.state.firstName}
                                    onChange={(evt) => {this.setState({firstName: evt.target.value})}}
                                    hidden={!this.state.addJudgeHidden}
                                />
                                <input
                                    className="form-control"
                                    defaultValue={this.state.newFirstName}
                                    onChange={(evt) => {this.setState({newFirstName: evt.target.value})}}
                                    hidden={this.state.addJudgeHidden}
                                />
                            </div>
                            <div className="col-sm-2 offset-sm-1">
                                <button
                                    className="btn btn-success"
                                    onClick={() => this.addJudge(
                                        this.state.newFirstName,
                                        this.state.newLastName,
                                        this.state.newNumber
                                    )}
                                    hidden={this.state.addJudgeHidden}
                                >
                                    Add Judge
                                </button>
                                <button
                                    className="btn btn-warning"
                                    onClick={() => this.updateJudge(
                                        this.state.idToGrab,
                                        this.state.firstName,
                                        this.state.lastName,
                                        this.state.number
                                    )}
                                    hidden={!this.state.addJudgeHidden}
                                >
                                    Update Judge
                                </button>
                            </div>
                        </div>

                        <div className="form-inline justify-content-center">
                            <div className="col-sm-2">
                                <label><b>Last Name: </b></label>
                            </div>
                            <div className="col-sm-2">
                                <input
                                    className="form-control"
                                    defaultValue={this.state.lastName}
                                    onChange={(evt) => {this.setState({lastName: evt.target.value})}}
                                    hidden={!this.state.addJudgeHidden}
                                />
                                <input
                                    className="form-control"
                                    defaultValue={this.state.newLastName}
                                    onChange={(evt) => {this.setState({newLastName: evt.target.value})}}
                                    hidden={this.state.addJudgeHidden}
                                />
                            </div>
                            <div className="col-sm-2 offset-sm-1">

                            </div>
                        </div>

                        <div className="form-inline justify-content-center">
                            <div className="col-sm-2">
                                <label><b>Number: </b></label>
                            </div>
                            <div className="col-sm-2">
                                <input
                                    className="form-control"
                                    defaultValue={this.state.number}
                                    onChange={(evt) => {this.setState({number: evt.target.value})}}
                                    hidden={!this.state.addJudgeHidden}
                                />
                                <input
                                    className="form-control"
                                    defaultValue={this.state.newNumber}
                                    onChange={(evt) => {this.setState({newNumber: evt.target.value})}}
                                    hidden={this.state.addJudgeHidden}
                                />
                            </div>
                            <div className="col-sm-2 offset-sm-1">
                                <button
                                    className="btn btn-danger"
                                    onClick={() => this.deleteJudge(this.state.idToGrab)}
                                    hidden={!this.state.addJudgeHidden}
                                >
                                    Delete Judge
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Main;
