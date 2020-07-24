const express = require('express');
const cron = require('node-cron');
const cors = require('cors');
const {generateMatch} = require ('./helpers/matchGenerator');
const bodyParser = require('body-parser');
const indexRoutes = require('./routes/index');

const PORT = process.env.PORT || 9000;
const app = express();

//Configure APP
app.use(cors());
app.use(indexRoutes);
app.use(bodyParser.json());


//Initialize crone
cron.schedule('*/5 * * * *', generateMatch);

//Run Server
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));