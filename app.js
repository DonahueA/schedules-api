const express = require('express')
const config = require('./config.json')
const app = express()
const port = 3000
const { Client } = require('pg');

const client = new Client({
	user: config.username,
	host: config.ip,
	database: config.database,
	password: config.pass,
	port: 5432,
});

client.connect((err) => {
if (err) {
	console.error('connection error', err.stack);
} else {
	console.log('connected to pSQL');
}
})



app.get('/', (req, res) => res.send('Hello world'))

app.get('/schedule/:subject-:class-:section/', (req, res) => {
	client.query("SELECT * FROM schedules WHERE subject = '" + req.params.subject + "' AND  class = '" + req.params.class + "' AND section = '" + req.params.section + "';", (err, dbres) => {
		if(err){
			res.send(err)
		}else{
			res.send(dbres["rows"])
		}
	})
})

app.get('/schedule/:subject-:class/', (req, res) => {
        client.query("SELECT * FROM schedules WHERE subject = '" + req.params.subject + "' AND  class = '" + req.params.class + "';", (err, dbres) => {
                if(err){
                        res.send(err)
                }else{
                        res.send(dbres["rows"])
                }
        })
})


app.listen(port, ()=> console.log(`Example app listening to port ${port}!`))

