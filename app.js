const request = require('request');
const express = require('express');
const fetch = require('node-fetch');
const bodyparser = require('body-parser');
const searchCode =require('./webclient/torSearch.js');
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyparser.urlencoded({extended: false}));

app.use(express.static('./public'))

app.get('/tors',(req,res)=>{
	res.setHeader("Access-Control-Allow-Origin", "*");
	if(!req.query.address){
		return res.send({
			error:"Enter the search term"
		})
	}
	searchCode(req.query.address,(err,data)=>{
		if(err){
			return res.send(err);
		} var name=[];
		for(var i in data){
			name[i] ={title: data[i].name,
				size: data[i].size,
				seeds: data[i].seeds,
				link: data[i].link
			};
		}
		res.send(name);
	});
});

app.listen(port,()=>{
	console.log('Server is up')
})
