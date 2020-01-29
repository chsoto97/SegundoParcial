let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let {BookmarkList} = require('./model');
let jsonParser = bodyParser.json();
let { DATABASE_URL, PORT } = require( './config' );

let app = express();

let server;

app.put('/api/bookmarks/:id', jsonParser, (req, res) =>{
	if(req.body.id==""){
		res.statusMessage = "No se proporciona el id.";
		res.status(406).send();
	}
	if(req.body.id!=req.params.id){
		res.statusMessage = "Los id enviados no coinciden.";
		res.status(409).send();
	}
	if(req.body.titulo==""&&req.body.descripcion==""&&req.body.url==""){
		res.statusMessage = "No se proporcionan datos para actualizar.";
		res.status(406).send();
	}
	BookmarkList.updateBookmark(req.body.titulo, req.body.id, req.body.descripcion, req.body.url)
	.then((updatedBookmark)=>{
		if(updatedBookmark){
			return res.status(202).json(updatedBookmark);
		}
	})
	.catch((err)=>{
		res.statusMessage = "Error en la conexión a la DB";
		return res.status(505).send();
	})

});

function runServer( port, databaseUrl ){
	return new Promise( (resolve, reject ) => {
		mongoose.connect( databaseUrl, response => {
			if ( response ){
				return reject( response );
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then( () => {
			return new Promise( (resolve, reject) => {
				console.log( 'Closing the server' );
				server.close( err => {
					if ( err ){
						return reject( err );
					}
					else{
						resolve();
					}
				});
			});
		});
}
runServer( PORT, DATABASE_URL );

module.exports = { 
    app, 
    runServer, 
    closeServer 
}