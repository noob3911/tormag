const request = require('request');
const searchCode =(address, callback)=>{
    const searchURl = `http://samcloud.tplinkdns.com:50000/getTorrents?search_key=${address}`;
    request({url:searchURl, json:true},(error,res)=>{
        const torData =res.body.torrents;
        const torOBJ =[];
        for(var i=0;i<torData.length;i++){
            torOBJ[i]={
                name:torData[i].name,
                seeds:torData[i].seeds,
                size:torData[i].size,
                link:torData[i].link
            }
        }
        if(error){
            callback("Unable to connect..",undefined);
        }else if(res.body.torrents.length===0){
            callback('Unable to find location, Try another search',undefined);
        }else{
            callback(undefined,
                torOBJ 
            )
        }
    })
}

module.exports =searchCode;