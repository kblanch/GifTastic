var topics = ['Antarctica','Hawaii','London','Switzerland','Paris','Rome','Venice','Athens' ]; 

function createButtonList() {
	$('#button-container').html('');
	for (var i = 0; i < topics.length; i++) {
		var btn = $('<button>').html(topics[i]);
		btn.attr("data-topic",topics[i]);
		btn.addClass("topic-btn");
		$('#button-container').append(btn);
	}

}

createButtonList();

function addTopicBtn(){
	var topic = $('#topic-input').val().trim();
	topics.push(topic);
	$('#topic-input').val('');
	createButtonList();
}

function listGIFs(){
	$('#img-container').html('');
	var imageTitle = $(this).attr("data-topic");
	var limit = 10;
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + imageTitle + "&api_key=dc6zaTOxFJmzC&limit=" + limit + "&rating=g";
	$.ajax({
		url: queryURL,
		method: "GET"			
	}).done(function(response){

		for (var i = 0; i < limit; i++) {
			var imgDiv = $('<div>');
			imgDiv.addClass('img-div');

			var image = $('<img>');
			image.attr('id','gif-image');
			image.attr('src',response.data[i].images.fixed_height_still.url);
			image.attr('data-state','still');
			image.attr('data-topic',imageTitle);
			image.attr('data-still',response.data[i].images.fixed_height_still.url);
			image.attr('data-animate',response.data[i].images.fixed_height.url);

			imgDiv.append(image);


			var ratingDiv = $('<div>');
			ratingDiv.html("Rating:" + response.data[i].rating);
			imgDiv.append(ratingDiv);


			$('#img-container').append(imgDiv);
		}
	});
}

function animateGIF(){
	var newSRC;
	if($(this).attr('data-state') === 'still'){
		newSRC = $(this).attr('data-animate');
		$(this).attr('src',newSRC);
		$(this).attr('data-state','animated');
	}
	else{
		newSRC = $(this).attr('data-still');
		$(this).attr('src',newSRC);
		$(this).attr('data-state','still');
	}
}

$(document).on("click","#add-topic", addTopicBtn);

$(document).on("click",".topic-btn",listGIFs);

$(document).on("click","#gif-image",animateGIF);