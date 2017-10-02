const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const ctrl = require('./controller');
const adapter = new FileAsync('db.json');
const base62 = require('base62');
let api;

base62.setCharacterSet("fcD6217QL8pgkMYsWKdbOAPriIya5JGVjB43SnNuZTHEzXlxq9ewvFURhto0mC");


const app = express();

app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());

low(adapter)
	.then(db => {
		api = ctrl.register(db, base62);
		app.get('/:short', api.get);
		app.post('/', api.post);
		console.log(api);
    	return db.defaults({ urls: [] })
      		.write();
   })
  .then(() => {
    app.listen(3000, () => console.log('listening on port 3000'))
   });