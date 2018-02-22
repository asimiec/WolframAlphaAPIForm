const express = require('express');
bodyParser = require('body-parser');
 
require('body-parser-xml')(bodyParser);
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
res.header("Access-Control-Allow-Origin","*");
res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization"
);
if(req.method==='OPTION'){
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, PATCH, DELETE');
    return res.status(200).json({});
}
next();
});

const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI('R6WYLH-H96PRJEWXE');
//let output;
app.set('view engine', 'ejs');
app.use(bodyParser.xml({
  limit: '100MB',   // Reject payload bigger than 1 MB 
  xmlParseOptions: {
    normalize: true,     // Trim whitespace inside text nodes 
    normalizeTags: true, // Transform tags to lowercase 
    explicitArray: false // Only put nodes in array if >1 
  }
}));
//waApi.getSimple('F9TVlu5AmVzL').then(console.log).catch(console.error);
//// Error: Wolfram|Alpha did not understand your input
//
//waApi.getSimple({input:'fourth prime minister of india',output: 'json',
//}).then((url) => {
// // console.log(`<img src="${url}">`)
// //output=`<img src="${url}">`;
// output=`<img src="${url}">`;
//}).catch(console.error);
app.post('/', function (req, res) {
	//res.json(req.body);					
	waApi.getFull({
  input: req.body.name,
  output: req.body.format,
}).then((data)=>{
	output=data;
	console.log(data);
	 res.send(output);
	}).catch(console.error)

});
app.get('/', function (req, res) {
 res.render('pages/index',{});

})

app.listen(3000, () => console.log('Example app listening on port 3000!'))