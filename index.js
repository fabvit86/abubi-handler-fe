//server
'use strict'

const express = require('express')

const app = express()

app.use('/public', express.static(process.cwd()+'/public'))
app.use('/js', express.static(process.cwd()+'/app/js'))

const port = process.env.PORT || 3000;

// home route:
app.route('/').get((req, res) => {
	res.sendFile(process.cwd()+'/public/index.html')
})

app.listen(port, () => 
	console.log('Node.js listening on port '+port+'...')
)
