const fetch = require('node-fetch');
const API = 'https://randomuser.me/api';

class dbInitializer
{
    constructor(pool){this.pool = pool;}

    //generate 10 new random players.
    async intializePlayers(cant)
    {
        const date = new Date().getTime();
        var addeedPlayers = 0;
        
        for(var i=0;i<cant;i++)
        {
            try
            {   
                const response = await fetch(API);
                if(response.ok)
                {
                    const jsonData = await response.json();
            
                    const randomNickname = jsonData.results[0].login.username;
                    const randomImage = jsonData.results[0].picture.medium;
                    
                    var insertedRows = await this.pool.query(`INSERT INTO player VALUES ('','${randomNickname}','${randomImage}',${date})`);
                    console.log("New player randomly created");
                    addeedPlayers++;
                }
                else
                {
                    //in case of error, break for loop
                    break;
                }
            }
            catch(error)
            {
                throw error;
            }
            
        }
        if (addeedPlayers<cant)
        {
            this.intializePlayers(cant - addeedPlayers);
        }
    }
}


module.exports = dbInitializer


