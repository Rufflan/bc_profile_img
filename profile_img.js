var target = document.body;

//ElementPositionFix("DescriptionInput", 36, 100, 160, 1790, 750);
function calcPosition(ElementID, Font, X, Y, W, H) {
	var E = document.getElementById(ElementID);
	// Verify the element exists
	if (!E) {
		console.warn("A call to ElementPositionFix was made on non-existent element with ID '" + ElementID + "'");
		return;
	}

	// Different positions based on the width/height ratio
	const HRatio = MainCanvas.canvas.clientHeight / 1000;
	const WRatio = MainCanvas.canvas.clientWidth / 2000;
	Font *= Math.max(HRatio, WRatio);
	const Top = MainCanvas.canvas.offsetTop + Y * HRatio;
	const Height = H * HRatio;
	const Left = MainCanvas.canvas.offsetLeft + X * WRatio;
	const Width = W * WRatio;

	// Sets the element style
	Object.assign(E.style, {
		fontSize: Font + "px",
		fontFamily: CommonGetFontName(),
		position: "fixed",
		left: Left + "px",
		top: Top + "px",
		width: Width + "px",
		height: Height + "px",
		display: "inline"
	});

}

var callback = (mutationList, observer) => {
  if(mutationList[0].addedNodes.length > 0){
  	if(mutationList[0].addedNodes[0].localName == "textarea"){
		let tmp_profile_pic = mutationList[0].addedNodes[0].value.split("profiles pic:");
		  
		  if(tmp_profile_pic.length > 1){
			  setTimeout(function(){
				  
				  let width = mutationList[0].addedNodes[0].style.width.replace("px","");
				  let height = mutationList[0].addedNodes[0].style.height.replace("px","");
				  let top = mutationList[0].addedNodes[0].style.top.replace("px","");
				  let left = mutationList[0].addedNodes[0].style.left.replace("px","");
				  console.log(left);
				  let profile_pic = tmp_profile_pic[1].split("\n")[0];
				  let tmp = document.createElement("style");
				  tmp.setAttribute("id","profile_img");
				  tmp.innerHTML = 'textarea#DescriptionInput{width:'+(eval(width) * 0.8)+'px !important;}';
				  document.head.append(tmp);
	
				  let tmp_img_section = document.createElement("img");
				  tmp_img_section.setAttribute("id","img_profile");
				  tmp_img_section.setAttribute("src",profile_pic);
				  tmp_img_section.setAttribute("style","z-index: 99;position: absolute;left: "+((eval(width) * 0.8) + (eval(left) * 1.1) + ((eval(width) * 0.2) / 8) - 10)+"px;top: "+(eval(top))+"px;width: "+(eval(width) * 0.2)+"px;height: "+(eval(width) * 0.2)+"px;object-fit: cover;");
				  document.body.append(tmp_img_section);
			  },200);
		  }
	}else if(mutationList[0].addedNodes[0].localName != "img"){
		if(document.getElementById("profile_img")){
			document.getElementById("profile_img").remove();
		}
		if(document.getElementById("img_profile")){
			document.getElementById("img_profile").remove();
		}
	}
  }else{
	if(document.getElementById("profile_img")){
		document.getElementById("profile_img").remove();
	}
	if(document.getElementById("img_profile")){
		document.getElementById("img_profile").remove();
	}
  }
};

var observer = new MutationObserver(callback);

var config = {
    attributes: false,
    childList: true,
    characterData: true
};
observer.observe(target, config);


//observer.disconnect();
