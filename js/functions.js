function getImages(search, page) {
	loader();
	if(page>1) {
		console.log("Append")
		$("#nav").hide();
	}
	search = search.replace(" ", "_")
	console.log(search);
	console.log("making Request");
	var data = $.ajax({
		url: "http://rule34.paheal.net/post/list/"+search+"/"+page,
		success: function(html) {
      				strReturn = html;
      				return strReturn;
    	},
		async: false
	});
	data = data.responseText;
	data = stripScripts(data);
	console.log("Putting html into #images")
	/** #12 fix **/
	window.interval = setInterval(function() {
		getImagesFinal();
	}, 3500);
	console.log("Gen Nav");
	$("#nav").html("<div style='text-align:center;margin-top:20px;width:100%'><button class='btn btn-default btn-lg btn-block' onclick='getImages($(\"#search\").val(), "+(page+1)+")'>Next</button></div>");
	console.log("Gen Images");

	/** For some reason, this function below stops any scripts, refer to the fix #12 **/
	$("#images").html(data);
}

  function stripScripts(s) {
    var div = document.createElement('div');
    div.innerHTML = s;
    var scripts = div.getElementsByTagName('script');
    var i = scripts.length;
    while (i--) {
      scripts[i].parentNode.removeChild(scripts[i]);
    }
    return div.innerHTML;
  }

function resetPage() {
	$("#final").html(" ");
	$("#form-thing").show();
	$("#search-btn").show();
	$("#search").val("");
	$("#clear-btn").show();
	$("#nav").hide();
	$("#nav").html(" ");
}

function loader() {
	$("#form-thing").attr("style", "display:none;");
	$("#search-btn").attr("style", "display:none;");
	$("#clear-btn").attr("style", "display:none;");
	$("#loader").show();
}

function getImagesFinal() {
	clearInterval(window.interval);
	console.log("parsing HTML");
	$("a:contains('Image Only')").each(function(key, value) {
		$("#final").append("<img class='image' src='"+value.href+"'>");
	});
	console.log("Displaying");
	$("#loader").attr("style", "display:none;text-align:center;");
	if($("#final").html().trim()==="") {
		$("#final").html("<h2 style='text-align:center;'>No Results for '"+$("#search").val()+"'</h2>");
		$("#nav").html("<div style='text-align:center;margin-top:20px;width:100%'><button class='btn btn-default btn-lg btn-block' onclick='resetPage()'>Back</button></div>");
	}
	$("#final").show();
	$("#nav").show();
}