let app = {
	init: function(){
		$('.create').on('click', function(event) {
			event.preventDefault();
			const url = $('input').val();
	 		const jsonItem = JSON.stringify({"url": url});
			app.createPost(jsonItem);
		});
	},
	createPost: function(data){
		//CREATE: create new item
		$.ajax({
 			url: '/',
 			type: 'POST',
 			contentType: 'application/json',
 			dataType: 'json',
 			data: data
 		})
 		.done(function(data) {
			 console.log(data);
			 $('#shorturl').text(data.url).attr("href", data.url); 
 		});
	}
}
jQuery(document).ready(function($) {
	app.init();
});
 