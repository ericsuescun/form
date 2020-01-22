const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.urlencoded());

var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-3', { useNewUrlParser: true });

mongoose.connection.on("error", function(e) { console.error(e); });

var schema = mongoose.Schema({
	name: String,
	email: String,
	password: String
});

var User = mongoose.model("User", schema);

app.get('/', (req, res) => {

	res.header("Content-Type", "text/html; charset=utf-8");

	User.find(function(err, users) {
		if(err) {
			return console.error(err);
		} else {
			res.render('index', { users: users });
		}
	})
})

app.get('/register', (req, res) => {

	res.header("Content-Type", "text/html; charset=utf-8");
	res.render('form');

})

app.post('/register', (req, res) => {

	res.header("Content-Type", "text/html; charset=utf-8");

	User.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function(err, user) {
		if(err) {
			return console.error(err);
		} else {
			console.log('Crea: ' + user);
			User.find(function(err, users) {
				if(err) {
					return console.error(err);
				} else {
					res.render('index', { users: users });
				}
			});
		}
	});
	// console.log('Request: ' + req.body.name);

})

app.listen(3000, console.log('Listening on port 3000!'));