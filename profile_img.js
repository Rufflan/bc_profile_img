var target = document.body;

function calc_position(X, Y, W, H) {


    // Different positions based on the width/height ratio
    let HRatio = document.getElementById("MainCanvas").clientHeight / 1000;
    let WRatio = document.getElementById("MainCanvas").clientWidth / 2000;
    let Top = document.getElementById("MainCanvas").offsetTop + Y * HRatio;
    let Height = H * HRatio;
    let Left = document.getElementById("MainCanvas").offsetLeft + X * WRatio;
    let Width = W * WRatio;

    // Sets the element style
    let data = {
        fontFamily: CommonGetFontName(),
        position: "fixed",
        left: Left + "px",
        top: Top + "px",
        width: Width + "px",
        height: Height + "px",
        display: "inline"
    };
    return data;
}

function create_img_frame(tmp_profile_pic, text_nods, type) {

    switch (type) {
        case "textarea":
            if (tmp_profile_pic.length > 1) {
                let calc_data = calc_position(100, 160, 1790 * 0.8, 750);
                let img_calc_data = calc_position((1790 * 0.82 + 100), 160, 1790 * 0.2, 1790 * 0.2);
                //let width = text_nods.style.width.replace("px", "");
                //let height = text_nods.style.height.replace("px", "");
                let profile_pic = tmp_profile_pic[1].split("\n")[0];
                let tmp = document.createElement("style");
                tmp.setAttribute("id", "profile_img");
                tmp.innerHTML = 'textarea#DescriptionInput{width:' + calc_data.width + ' !important;}';
                document.head.append(tmp);

                let tmp_img_section = document.createElement("img");
                tmp_img_section.setAttribute("id", "img_profile");
                tmp_img_section.setAttribute("src", profile_pic);
                tmp_img_section.setAttribute("style", "z-index: 99;position: absolute;left: " + img_calc_data.left + ";top: " + img_calc_data.top + ";width: " + img_calc_data.width + ";height: " + img_calc_data.height + ";object-fit: cover;");
                document.body.append(tmp_img_section);
            }
            break;
        case "div":
            //console.log("create frame div");
            let calc_data = calc_position(100, 160, 1790 * 0.8, 750);
            let img_calc_data = calc_position((1790 * 0.82 + 100), 160, 1790 * 0.2, 1790 * 0.2);
            let profile_pic = tmp_profile_pic[1].split("\n")[0];
            let tmp = document.createElement("style");
            tmp.setAttribute("id", "profile_img");
            tmp.innerHTML = 'div#bceRichOnlineProfile{width:' + calc_data.width + ' !important;height:' + calc_data.height + ' !important;top:' + calc_data.top + ' !important;left:' + calc_data.left + ' !important}';
            document.head.append(tmp);

            let tmp_img_section = document.createElement("img");
            tmp_img_section.setAttribute("id", "img_profile");
            tmp_img_section.setAttribute("src", profile_pic);
            tmp_img_section.setAttribute("style", "z-index: 99;position: absolute;left: " + img_calc_data.left + ";top: " + img_calc_data.top + ";width: " + img_calc_data.width + ";height: " + img_calc_data.height + ";object-fit: cover;");
            document.body.append(tmp_img_section);
            break;
    }
}
var resize_observer;

var callback = (mutationList, observer) => {
    //console.log(mutationList);
    let added_chk = mutationList.filter(null_chk => null_chk.addedNodes.length != 0);

    if(added_chk.length > 0){
        let rich_online_chk = added_chk.filter(filter_text => filter_text.addedNodes[0].id.includes("bceRichOnlineProfile"));

        if(rich_online_chk.length > 0){
            let text_nods = document.getElementById("bceRichOnlineProfile");
            let tmp_profile_pic = text_nods.getAttribute("bce-original-text").split("profiles pic:");

            if(tmp_profile_pic.length > 1){
                let callback = (entries, observer) => {
                    if (document.getElementById("profile_img")) {
                        document.getElementById("profile_img").remove();
                    }
                    if (document.getElementById("img_profile")) {
                        document.getElementById("img_profile").remove();
                    }
                    create_img_frame(tmp_profile_pic, text_nods, "div");
                };
                if(resize_observer){
                    resize_observer.disconnect();
                }
                resize_observer = new ResizeObserver(callback);
                let el = document.getElementById('MainCanvas');
                resize_observer.observe(el);

                if (document.getElementById("profile_img")) {
                    document.getElementById("profile_img").remove();
                }
                if (document.getElementById("img_profile")) {
                    document.getElementById("img_profile").remove();
                }
                create_img_frame(tmp_profile_pic, text_nods, "div");
            }            
        }
    }else{
        let removed_chk = mutationList.filter(null_chk => null_chk.removedNodes.length != 0);

        if(removed_chk.length > 0){
            let rich_online_chk = removed_chk.filter(filter_text => filter_text.removedNodes[0].id.includes("bceRichOnlineProfile"));
    
            if(rich_online_chk.length > 0){
                if(document.getElementById("DescriptionInput")){
                    //console.log("description detected");
                    let text_nods = document.getElementById("DescriptionInput");
                    let tmp_profile_pic = document.getElementById("DescriptionInput").value.split("profiles pic:");
                    if(tmp_profile_pic.length > 1){
                        let callback = (entries, observer) => {
                            if (document.getElementById("profile_img")) {
                                document.getElementById("profile_img").remove();
                            }
                            if (document.getElementById("img_profile")) {
                                document.getElementById("img_profile").remove();
                            }
                            create_img_frame(tmp_profile_pic, text_nods, "textarea");
                        };
                        if(resize_observer){
                            resize_observer.disconnect();
                        }
                        resize_observer = new ResizeObserver(callback);
                        let el = document.getElementById('MainCanvas');
                        resize_observer.observe(el);
    
                        if (document.getElementById("profile_img")) {
                            document.getElementById("profile_img").remove();
                        }
                        if (document.getElementById("img_profile")) {
                            document.getElementById("img_profile").remove();
                        }
                        create_img_frame(tmp_profile_pic, text_nods, "textarea");
                    }
                }else{
                    if (document.getElementById("profile_img")) {
                        document.getElementById("profile_img").remove();
                    }
                    if (document.getElementById("img_profile")) {
                        document.getElementById("img_profile").remove();
                    }
                    try{
                        resize_observer.disconnect();
                    }catch(e){
                        console.log(e);
                    }
                }
            }
        }
    }
};

var observer = new MutationObserver(callback);

var config = {
    attributes: false,
    childList: true,
    characterData: false,
    subtree: false
};
observer.observe(target, config);
/*

*/
//observer.disconnect();
