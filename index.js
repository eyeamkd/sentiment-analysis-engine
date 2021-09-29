"use strict";
const sentimentAnalysis = require('./engine');
var bodyParser = require('body-parser');
const express = require('express');

var app = express()

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/analyse',async (req,res)=>{ 
    try{
        console.log("Text being passed is",req.body.text);
        const sentiment = await sentimentAnalysis(req.body.text); 
        res.status(200).send(sentiment[0]); 
        //res.send("Ok").status(200);
    } 
    catch(e){
        return res.status(400).send("Error Occured",e);
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})