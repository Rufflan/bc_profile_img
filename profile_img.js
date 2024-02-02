const target = document.body;

const callback = (mutationList, observer) => {
  if(mutationList[0].addedNodes.length > 0){
  	if(mutationList[0].addedNodes[0].localName == "textarea"){
		let tmp_profile_pic = mutationList[0].addedNodes[0].value.split("profiles pic:");
		  
		  let profile_pic = tmp_profile_pic[1].split("\n")[0];
		  let tmp = document.createElement("style");
		  tmp.setAttribute("id","profile_img");
		  tmp.innerHTML = 'textarea#DescriptionInput{width:75% !important;}';
		  document.head.append(tmp);

		  let tmp_img_section = document.createElement("img");
		  tmp_img_section.setAttribute("id","img_profile");
		  tmp_img_section.setAttribute("src",profile_pic);
		  tmp_img_section.setAttribute("style","z-index: 99;position: absolute;right: 3.5%;top: 16%;width: 15%;height: 30%;object-fit: cover;");
		  document.body.append(tmp_img_section);
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
const observer = new MutationObserver(callback);
const config = {
    attributes: false,
    childList: true,
    characterData: true
};
observer.observe(target, config);
