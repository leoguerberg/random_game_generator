import React, { Component } from 'react';
import TopScoreList from './components/topScoreList';
import LastUpdateScore from './components/lastUpdatedScore';


class App extends Component {
  render(){
    return(
      <div>
              <LastUpdateScore/>
              <TopScoreList/>
      </div>
      
      );
    }
  }
  
  export default App;
