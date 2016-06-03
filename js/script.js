
$(function(){
	var searchField = $('#searchVideo');
	var icon = $('#search-btn');

	$(searchField).on("focus", function(){
		$(this).animate({
			width: "100%"
		}, 400);
		$(icon).animate({
			right: '10px'
		}, 400);
	});

	//Blue Event Handler
	$(searchField).on("blur", function(){
		if(searchField.val() === ''){
			$(searchField).animate({
				width: "45%"
			}, 400, function(){});

			$(icon).animate({
				right: "360px"
			}, 400, function(){});

		}

	});
	//prevents default form submit behavio.
	$('#search-form').submit(function(e){
		e.preventDefault();
	});
})

function search(){
	$('#results').html('');
	$('#buttons').html('');

	getInput = $('#searchVideo').val();

	$.get(
		"https://www.googleapis.com/youtube/v3/search?", {
			part: 'snippet, id',
			q: getInput,
			type: 'video',
			key: 'AIzaSyCGX3Gzw9xieBCn6XWw0cOMKllZQeMeJUk',
			},
			function(data){
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
				
				// Log Data
				console.log(data);
				
				$.each(data.items, function(i, item){
					// Get Output
					var output = getOutput(item);
					
					// Display Results within the #results ul
					$('#results').append(output);
				});
				var buttons = getButtons(prevPageToken, nextPageToken);

				$('#buttons').append(buttons);
			}
	);
}

	function nextPage(){
		var token = $('#next-button').data('token');
		var q = $('#next-button').data('q');

		$('#results').html('');
		$('#buttons').html('');

	getInput = $('#searchVideo').val();

	$.get(
		"https://www.googleapis.com/youtube/v3/search?", {
			part: 'snippet, id',
			q: getInput,
			pageToken: token,
			type: 'video',
			key: 'AIzaSyCGX3Gzw9xieBCn6XWw0cOMKllZQeMeJUk',
			},
			function(data){
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
				
				// Log Data
				console.log(data);
				
				$.each(data.items, function(i, item){
					// Get Output
					var output = getOutput(item);
					
					// Display Results within the #results ul
					$('#results').append(output);
				});
				var buttons = getButtons(prevPageToken, nextPageToken);

				$('#buttons').append(buttons);
			}
	);
	}

	function prevPage(){
		var token = $('#prev-button').data('token');
		var q = $('#prev-button').data('q');

		$('#results').html('');
		$('#buttons').html('');

	getInput = $('#searchVideo').val();

	$.get(
		"https://www.googleapis.com/youtube/v3/search?", {
			part: 'snippet, id',
			q: getInput,
			pageToken: token,
			type: 'video',
			key: 'AIzaSyCGX3Gzw9xieBCn6XWw0cOMKllZQeMeJUk',
			},
			function(data){
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
				
				// Log Data
				console.log(data);
				
				$.each(data.items, function(i, item){
					// Get Output
					var output = getOutput(item);
					
					// Display Results within the #results ul
					$('#results').append(output);
				});
				var buttons = getButtons(prevPageToken, nextPageToken);

				$('#buttons').append(buttons);
			}
	);
	}


//Display the Output 
	function getOutput(item){
		var videoId = item.id.videoId;
		var title = item.snippet.title;
		var description = item.snippet.description;
		var thumb = item.snippet.thumbnails.high.url;
		var channelTitle = item.snippet.channelTitle;
		var videoDate = item.snippet.publishedAt;

		// Build Output String
	var output = '<li>' +
	'<div class="list-left">' +
	'<img src="'+thumb+'">' +
	'</div>' +
	'<div class="list-right">' +
	'<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
	'<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>' +
	'<p>'+description+'</p>' +
	'</div>' +
	'</li>' +
	'<div class="clearfix"></div>' +
	'';
	
	return output;
}
	function getButtons(prevPageToken, nextPageToken){
		if(!prevPageToken){ 
			var btnoutput = '<div class="button-container">' +
					'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="+q+"' + 
					'onclick="nextPage();">Next Page</button></div>';
		} else {
			var btnoutput = '<div class="button-container">' +
				'<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="+q+"' + 
					'onclick="prevPage();">Previous Page</button></div>' +
					'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="+q+"' + 
					'onclick="nextPage();">Next Page</button></div>';
		}
					return btnoutput
	}


