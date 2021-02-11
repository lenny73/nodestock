//stock exchange portfolio//
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
const request = require('request');


//use body parser middleware
app.use(bodyParser.urlencoded({extented: false}));
//API key pk_062031d20883444f9ea74e2610fe2011
//create call API
function call_api(finishedAPI, ticker){
request('https://cloud.iexapis.com/stable/stock/'+ ticker +'/quote?token=pk_062031d20883444f9ea74e2610fe2011',{json:true},(err,res,body)=>{
		if(err){return console.log(err);}
		console.log(body);
		if(res.statusCode ===200){
			//console.log(body);
			finishedAPI(body);
		};
});
};

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff =" hello there, thid is new stuff!";

app.get('/',function(req,res){
	call_api(function(doneAPI){
			res.render('home',{
			stock: doneAPI
		});
	}, "fb");
});
//call_api(function, req.body.stock_ticker)
app.post('/', function(req,res){
	call_api(function(doneAPI){
			//posted_stuff =req.body.stock_ticker;
			res.render('home',{
			stock: doneAPI,
		});
	}, req.body.stock_ticker);
});


app.get('/about.html',function(req,res){
	res.render('about');
});


app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server listening on port ' + PORT));
