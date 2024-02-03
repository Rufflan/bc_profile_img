var target = document.body;

var callback = (mutationList, observer) => {
  if(mutationList[0].addedNodes.length > 0){
  	if(mutationList[0].addedNodes[0].localName == "textarea"){
		let tmp_profile_pic = mutationList[0].addedNodes[0].value.split("profiles pic:");
		  
		  if(tmp_profile_pic.length > 1){
			  setTimeout(function(){
				  
				  console.log(mutationList[0].addedNodes[0].offsetHeight);
				  let width = mutationList[0].addedNodes[0].style.width.replace("px","");
				  console.log(width);
				  let height = mutationList[0].addedNodes[0].style.height.replace("px","");
				  let top = mutationList[0].addedNodes[0].style.top.replace("px","");
				  let profile_pic = tmp_profile_pic[1].split("\n")[0];
				  let tmp = document.createElement("style");
				  tmp.setAttribute("id","profile_img");
				  tmp.innerHTML = 'textarea#DescriptionInput{width:'+(eval(width) * 0.8)+'px !important;}';
				  document.head.append(tmp);
	
				  let tmp_img_section = document.createElement("img");
				  tmp_img_section.setAttribute("id","img_profile");
				  tmp_img_section.setAttribute("src",profile_pic);
				  tmp_img_section.setAttribute("style","z-index: 99;position: absolute;left: "+(eval(width) + (eval(width) * 0.2) - 10)+"px;top: "+(eval(top))+"px;width: "+(eval(width) * 0.2)+"px;height: "+(eval(width) * 0.2)+"px;object-fit: cover;");
				  document.body.append(tmp_img_section);
			  },100);
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
