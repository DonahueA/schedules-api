const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello world'))

app.get('/schedule/:subject-:class-:section/', (req, res) => {

	res.send({m: ["hours"], t:["hours"]})
	
})

app.listen(port, ()=> console.log(`Example app listening to port ${port}!`))

