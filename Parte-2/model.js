let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );

mongoose.Promise = global.Promise;

let bookmarkCollection = mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true
	},
	titulo: {
		type: String,
		required: true
	},
	descripcion:{
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	}
});

let Bookmark = mongoose.model('bookmarks', bookmarkCollection);

let BookmarkList = {
	update : function(titulo, id, descripcion, url){
		let idToUpdate = {
			id
		}
		let updatedObject = {
			id
		}
		if(titulo){
			updatedObject.titulo = titulo;
		}
		if(descripcion){
			updatedObject.descripcion = descripcion;
		}
		if(url){
			updatedObject.url = url;
		}
		Bookmark.updateOne(idToUpdate, updatedObject)
		.then((response)=>{
			return updatedObject;
		})
		.catch((err)=>{
			throw Error(err);
		});
	}
}

module.exports = {
    BookmarkList
};