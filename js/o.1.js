/* ....

*/
window.onload = function () {

var vid = document.getElementById('v1');
var bar = document.getElementById('coreprogress').firstChild;
vid.addEventListener("loadedmetadata", recupSize(), false);
//events boutons
var lesEvents = [
	function(){
		vid.play();
		},
	function(){
		vid.pause();
		},
	function(){
		vid.pause();
		vid.currentTime = 0;
		},
	function(){
		var total = vid.duration;
		var pos = vid.currentTime;
		var prog = Math.round((pos/total)*100);
		var min = parseInt(pos/60);
		var sec = parseInt(pos - (min*60));
		bar.firstChild.firstChild.nodeValue = prog+'%';
		bar.style.width = prog + '%';
		},
	function(){
		if(vid.muted == false){
			vid.muted = true;
			btns[4].firstChild.src = 'screens/mute2.png';
		}
		else{
			vid.muted = false;
			btns[4].firstChild.src = 'screens/mute1.png';
		}
		}
];

var btns = document.querySelectorAll("#commandes")[0].children;
for (var i = 0; i<5; i++){
	if (i == 3){
	vid.addEventListener("timeupdate",lesEvents[i],false);
	}
	else{
	btns[i].addEventListener("click",lesEvents[i],false);
	}
}
//END events boutons
var flyingCurs = document.getElementById("flycursor");
var savePos = "";
var posPourcent ="";
var posInVideo = "";
flyingCurs.addEventListener("click",function(e){
					vid.currentTime = posInVideo;
					console.log("SAVEPOS: "+savePos+ "pos% "+posPourcent+ "inVid "+posInVideo);
					},false);
var Xleft = btns[3].getBoundingClientRect().left;
var flying = btns[3].addEventListener("mousemove",function(e){
					var Xmax = Xleft+465;
					var cursorPos = 465 - (Xmax - e.clientX);
					console.log("CLIENTX: "+e.clientX+" POS: "+cursorPos );
					flyingCurs.style.left = cursorPos+"px";
					savePos = cursorPos;
					posPourcent = Math.round((100/465)*savePos);
					posInVideo = Math.round (vid.duration/100 * posPourcent);
					var minutes = parseInt(posInVideo / 60);
					var secondes = parseInt(posInVideo - (minutes*60)); 
					flyingCurs.firstChild.firstChild.nodeValue = minutes+":"+secondes;
					}, false);

//
function recupSize(){
	vid.width = vid.videoWidth;
	vid.height = vid.videoHeight;
}

};

