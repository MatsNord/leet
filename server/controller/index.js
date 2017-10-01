
function register(db, base62){
	// I want the first short url path to start at 100000
	const OFFS = Math.pow(62, 5);

	const get = (req, res) => {
		const url = db.get('urls')
		.find({ id: base62.decode(req.params.short)})
		.value();
		res.send(url)
	};

	const post = (req, res) => {
		let nextId = db.get('urls').size().value() + OFFS;
		db.get('urls')
		.push( req.body )
		.last()
		.assign({ id: nextId })
		.write()
		.then(post => res.send({ "url": "http://localhost:3000/" + base62.encode(post.id)}));
	};
	return {
		get, 
		post
	};
}
module.exports.register = register;

