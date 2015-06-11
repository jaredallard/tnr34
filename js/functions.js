function getImages(search, page) {
	loader();

	/* replace spaces with dashes */
	search = search.replace(" ", "_")

	console.log("Page: "+page)
	console.log("Communicating with the API.")

	$.get("http://192.241.220.134:3000/search/"+search+"/"+page, function(data) {
		if (data.success !== true) {
			$("#final").html("<h2 class='error'>"+data.message+"</h2>");
			$("#nav").html("<div class='nav-wrapper'><button class='btn btn-default btn-lg btn-block' onclick='resetPage()'>Back</button></div>");
		}

		if (data.images.length == 0) {
			$("#final").html("<h2 class='error'>No results found.</h2>");
			$("#nav").html("<div class='nav-wrapper'><button class='btn btn-default btn-lg btn-block' onclick='resetPage()'>Back</button></div>");
		} else {
			console.log("Got "+data.images.length+" images.")

			data.images.forEach(function(v, i) {
				$("#final").append("<img class='image' src='"+v+"'>");
			});

			$("#nav").html("<div class='nav-wrapper'><button class='btn btn-default btn-lg btn-block' onclick='nextPage()'>Next</button></div>")

			/* for next search */
			window.psearch = search
			window.ppage = page+1
		}

		/* on load even */
		$("#loader").attr("style", "display:none;text-align:center;");
		$("#final").show();
		$("#nav").show();
	});
}

function nextPage() {
	getImages(window.psearch, window.ppage)
}

function resetPage() {
	window.psearch = undefined;
	window.ppage   = undefined;

	$("#final").html("");
	$("#form-thing").show();
	$("#search-btn").show();
	$("#search").val("");
	$("#clear-btn").show();
	$("#nav").hide();
	$("#nav").html("");
}

function loader() {
	$("#nav").html("");
	$("#final").html("");
	$("#form-thing").attr("style", "display:none;");
	$("#search-btn").attr("style", "display:none;");
	$("#clear-btn").attr("style", "display:none;");
	$("#loader").show();
	$("#nav, #final").hide()
}

/* ready */
$("#search").prop("disabled", false);
$("#search").keypress(function(e) {
		if(e.which == 13) {
				getImages($("#search").val(), 1);
		}
});
