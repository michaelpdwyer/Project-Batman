
    let fetch = require('node-fetch');

//let uri = 'http://jsonplaceholder.typicode.com/users';
let darksky = 'https://api.darksky.net/forecast/';
let key = '6a043f596ac3d5930199341de59fa67e';
let lat = 45.3483;
let lng = -75.7584;
let uri = darksky + key + '/' + lat +','+ lng;
console.log(uri);
uri = uri.concat('?units=ca&exclude=minutely,hourly&lang=ru');
// units - ca, si, us, uk
// exclude - minutely,hourly,daily,currently
// lang - 
let options = {
    method: 'GET',
    mode: 'cors'
}
let req = new fetch.Request(uri, options);

fetch(req)
    .then((response)=>{
        if(response.ok){
            return response.json();
        }else{
            throw new Error('Bad HTTP!')
        }
    })
    .then( (results) =>{
        console.log(results.currently.temperature, results.currently.summary);
        
        console.log( results.daily.data[1] );
        //console.log('JSON data provided');
    })
    .catch( (err) =>{
        console.log('ERROR:', err.message);
    });

