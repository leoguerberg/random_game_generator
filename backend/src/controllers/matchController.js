const fs = require('fs');
var pool = require('../database');

exports.topScores = async (req, res) =>
{
    try{
    const queryTopScores = fs.readFileSync('./database/top10Scores.sql').toString();
    var info = await pool.query(queryTopScores);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.status(200).jsonp(info);

    }
    catch(error)
    {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.status(400)
    }

};

exports.lastUpdated = async (req, res) =>
{
    try{
    const queryLastUpdated = fs.readFileSync('./database/lastMatchCreated.sql').toString();
    var info = await pool.query(queryLastUpdated);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.status(200).jsonp(info);

    }
    catch(error)
    {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.status(400)
    }

};



