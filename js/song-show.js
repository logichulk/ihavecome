var audio = document.getElementById('song');
audio.addEventListener('durationchange', setupSeekbar);
audio.addEventListener('timeupdate', timeupdate);

function setupSeekbar()
{
	console.log('setupSeekbar');
}

var lastTime = 0;
var currentTime = 0;
var currentTarget = "1";
var reverseSeek = [];
var progressShownTime = 0;
var syncTime = 0;
var onceMoved = 0;
var hidden = 0;


function timeupdate()
{
	var currentTimeInt = Math.floor(audio.currentTime);
	var target = undefined;
	var iter = 0;
	
	for(var i = 0; i < 10; i ++)
	{
		target = seek[(currentTimeInt - i)];

		if(target != undefined)
		{
			console.log("Target: " + target);
			break;
		}
		
		console.log("Try " + iter);
	}

	

	if(target != undefined && target != currentTarget)
	{
		if(target == "overview" || target == "last" || target == "zoom-start" || target == "zoom-mid" || target == "zoom-more")
		{
			//var contentElems = document.getElementsByClassName("content");
			
			if(target == "overview" || target == "zoom-more" || target == "last")
			{	
				for(var j = 1; j <= 86; j ++)
				{
					document.getElementById("c" + j + "area" ).className = "contentHidden";
				}
			}

			if(target == "last")
			{
				document.getElementById("clastarea").className = "content";
				document.getElementById("last").style.visibility = "visible";				
			}
			else
			{
				document.getElementById("clastarea").className = "contentHidden";
				document.getElementById("last").style.visibility = "hidden";
			}

			hidden = 1;

			if(target == "overview")
				impress().goto(target, 6000);
			else if(target == "zoom-start")
				impress().goto(target, 1000);
			else if(target == "zoom-mid")
				impress().goto(target, 1000);
			else if(target == "zoom-more")
				impress().goto(target, 2000);
		}
		else
		{			
			impress().goto(target, 1000);

			if(hidden = 1)
			{
					for(var j = 1; j <= 86; j ++)
					{
						document.getElementById("c" + j + "area" ).className = "content";
					}

					hidden = 0;

					document.getElementById("clastarea").className = "contentHidden";
			}

		}

		currentTarget = target
	}

	if(audio.style.visibility != "hidden" && Math.abs(audio.currentTime - progressShownTime) > 2)
	{
		setTimeout("hideAudio()", 5000);
	}
}

function hideAudio()
{
	console.log("hideAudio");
	if(audio.style.visibility != "hidden" && Math.abs(audio.currentTime - progressShownTime) > 2)
	{
		audio.style.visibility = "hidden";
		document.getElementById('impress').style.cursor = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAADUlEQVQYV2P4//8/IwAI/QL/+TZZdwAAAABJRU5ErkJggg=='), url(images/blank.cur), none !important;";
	}
}

document.addEventListener("impress:stepenter", function (event) {
			updateProgressbar(event.target.id);
		});

function updateProgressbar()
{
	if(reverseSeek.length == 0)
	{
		for(var i = 0; i < seek.length; i ++)
		{
			//reverseSeek
		}
	}
}

document.onmousemove = function(){
		console.log("mouse moved");
		if(audio.style.visibility != "visible")
		{
			if(onceMoved == 0)
			{
				audio.style.visibility = "visible";
				progressShownTime = audio.currentTime;
				onceMoved ++;
				document.getElementById('impress').style.cursor = "default";
			}
			else
			{
				onceMoved --;
			}
		}	
	};
