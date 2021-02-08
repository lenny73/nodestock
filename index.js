const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 5000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff =" hello there, thid is new stuff!";

app.get('/',function(req,res){
	res.render('home',{
		stuff: otherstuff

	});
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server listening on port ' + PORT));
