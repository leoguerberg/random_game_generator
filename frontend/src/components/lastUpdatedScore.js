import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Alert from 'react-bootstrap/Alert'
const API = 'http://localhost:9000/lastUpdated';

class LastUpdatedScore extends Component{
    
    constructor(props)
    {
        super(props);
        this.state = 
        {
            timer : null,
            lastUpdated : 0
        }
    }

    convertToDate(timestamp)
    {
        var day = new Date(timestamp).toLocaleDateString("es-AR");
        var time = new Date(timestamp).toLocaleTimeString("es-AR");

        return day + " - " + time;
    }
    async getLastUpdated()
    {
        try{
            console.log("About to fetch last updated time");
            const response = await fetch(API);
            if(response.ok)
            {
                const jsonData = await response.json();
                console.log(jsonData)
                
                this.setState({lastUpdated:this.convertToDate(jsonData[0].last_match_created)});
                
            }
        }
        catch(error)
        {
            throw error;
        }
    }
    
    componentDidMount(){
        this.getLastUpdated();
        this.timer = setInterval(() => this.getLastUpdated(), 10000);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }
    render(){
        return(
            <div>
            <Alert variant="dark" size="sm" responsive="md">
                <center>Last score update: {this.state.lastUpdated}</center>
            </Alert>
            </div>
            );
        }
    }
                
    export default LastUpdatedScore;