import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table'
import CsvDownload from 'react-json-to-csv';

const API = 'http://localhost:9000/topScores';

class TopScoreList extends Component{
    
    constructor(props)
    {
        super(props);
        this.state = 
        {
            timer : null,
            itemsList : []
        }
    }
    async getTopScores()
    {
        try{
            console.log("About to fetch top scores");
            const response = await fetch(API);
            if(response.ok)
            {
                console.log("Fetched");
                const jsonData = await response.json();
                
                this.setState({itemsList:jsonData});
            }
        }
        catch(error)
        {
            throw error;
        }
    }
    componentDidMount(){
        this.getTopScores();
        this.timer = setInterval(() => this.getTopScores(), 10000);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }
    render(){
        return(
            <div>
            <Table striped bordered hover variant="dark" size="sm" responsive="x1">
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Nickname</th>
                    <th>Score</th>
                </tr>
            </thead>
                {this.state.itemsList.map((scoreDetail,index)=>
                {
                    return(
                    <tr>
                        <td>{index+1}</td>
                        <td>{scoreDetail.nickname_player}</td>
                        <td>{scoreDetail.acumulated_score}</td>
                    </tr>
                );}
                )
                }
            <tbody>
            
            </tbody>

            </Table>
            
            <center><CsvDownload style={{ height: 40, width: 180,fontSize:18}} data={this.state.itemsList} filename="top scores.csv"/></center>
            </div>
            );
        }
    }
    
    export default TopScoreList;