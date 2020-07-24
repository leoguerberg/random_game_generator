var pool = require('../database');
const Player = require('../model/player');

exports.generateMatch = async () => 
{
    const date = new Date().getTime();
    var playersArray = [];
        
        try
        {
            //create a new game
            var insertedRows = await pool.query(`INSERT INTO game VALUES (${date},'')`);
            
            //search for the players of the game just created
            var randomPlayers = await pool.query(`SELECT * FROM Player`);
            
            randomPlayers.forEach(p => {
                var player = new Player(p.id_player,p.nickname_player,p.image_player,p.creation_date);
                playersArray.push(player);
            })
            
            const shuffledPlayers = randomPlayers.sort(() => 0.5 - Math.random());
            randomPlayers = shuffledPlayers.slice(0, Math.floor(Math.random() * 10));
            
            //generate random score for each player in this match
            randomPlayers.forEach(async p => {
                var randomScore =  Math.floor(Math.random() * 100);
                var insertedStat = await pool.query(`INSERT INTO stats VALUES (${p.id_player},${insertedRows.insertId},${randomScore})`);
            })
            
            console.log("New game generated");
        }
        catch(error)
        {
            throw error;
        }
        
}