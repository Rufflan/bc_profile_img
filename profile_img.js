var target = document.body;

/**
 * Runs and draws the online profile screen
 * @returns {void} - Nothing
 */
function OnlineProfileRun() {
	// Sets the screen controls
	console.log();
	DrawText(TextGet((InformationSheetSelection.IsPlayer()) ? "EnterDescription" : "ViewDescription").replace("CharacterName", InformationSheetSelection.Name), 910, 105, "Black", "Gray");


	var callback = (mutationList, observer) => {
	  if(mutationList[0].addedNodes.length > 0){
		if(mutationList[0].addedNodes[0].localName == "textarea"){
			let tmp_profile_pic = mutationList[0].addedNodes[0].value.split("profiles pic:");
			  if(tmp_profile_pic.length > 1){
				  ElementPositionFix("DescriptionInput", 36, 100, 160, 1790 * 0.8, 750);
			  }else{
				  ElementPositionFix("DescriptionInput", 36, 100, 160, 1790, 750);
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


	observer.disconnect();
/*
	if(data){
		ElementPositionFix("DescriptionInput", 36, data[0], data[1], data[2], data[3]);
	}else{
		
	}
*/
	if (InformationSheetSelection.IsPlayer()) DrawButton(1720, 60, 90, 90, "", "White", "Icons/Accept.png", TextGet("LeaveSave"));
	DrawButton(1820, 60, 90, 90, "", "White", ((InformationSheetSelection.IsPlayer()) ? "Icons/Cancel.png" : "Icons/Exit.png"), TextGet((InformationSheetSelection.IsPlayer()) ? "LeaveNoSave" : "Leave"));

}
