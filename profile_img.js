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
                let width = text_nods.style.width.replace("px", "");
                let height = text_nods.style.height.replace("px", "");
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
            let width = text_nods.style.width.replace("px", "");
            let height = text_nods.style.height.replace("px", "");
            let profile_pic = tmp_profile_pic[1].split("\n")[0];
            let tmp = document.createElement("style");
            tmp.setAttribute("id", "profile_img");
            tmp.innerHTML = 'div#bceRichOnlineProfile{width:' + calc_data.width + ' !important;}';
            document.head.append(tmp);

            let tmp_img_section = document.createElement("img");
            tmp_img_section.setAttribute("id", "img_profile");
            tmp_img_section.setAttribute("src", profile_pic);
            tmp_img_section.setAttribute("style", "z-index: 99;position: absolute;left: " + img_calc_data.left + ";top: " + img_calc_data.top + ";width: " + img_calc_data.width + ";height: " + img_calc_data.height + ";object-fit: cover;");
            document.body.append(tmp_img_section);
            break;
    }
}
var nods_observer;

var callback = (mutationList, observer) => {

    if (mutationList[0].addedNodes.length > 0) {

        //console.log(mutationList);
        //console.log(mutationList[eval(mutationList.length) - 1].addedNodes[0].localName == "textarea");
        //console.log(mutationList[eval(mutationList.length) - 1].addedNodes[0].id == "DescriptionInput");

        if (mutationList[eval(mutationList.length) - 1].addedNodes[0].localName == "textarea" && mutationList[eval(mutationList.length) - 1].addedNodes[0].id == "DescriptionInput") {
            let text_nods = mutationList[eval(mutationList.length) - 1].addedNodes[0];
            let tmp_profile_pic = mutationList[eval(mutationList.length) - 1].addedNodes[0].value.split("profiles pic:");
            let nods_config = {
                attributes: true,
                childList: false,
                characterData: false
            };

            nods_observer = new MutationObserver(function(mtl, ob) {
                console.log(mtl[eval(mtl.length) - 1].type);
                if (document.getElementById("profile_img")) {
                    document.getElementById("profile_img").remove();
                }
                if (document.getElementById("img_profile")) {
                    document.getElementById("img_profile").remove();
                }
                if (mtl[eval(mtl.length) - 1].type == "attributes") {
                    create_img_frame(tmp_profile_pic, text_nods, "textarea");
                    //nods_observer.disconnect();
                }
            });

            nods_observer.observe(document.getElementById("DescriptionInput"), nods_config);

            //create_img_frame(tmp_profile_pic,text_nods);
        } else if (mutationList[eval(mutationList.length) - 1].addedNodes[0].localName == "div" && mutationList[eval(mutationList.length) - 1].addedNodes[0].id == "bceRichOnlineProfile") {
            //console.log("div");
            let text_nods = mutationList[eval(mutationList.length) - 1].addedNodes[0];
            let tmp_profile_pic = {};
            tmp_profile_pic[1] = mutationList[eval(mutationList.length) - 1].addedNodes[0].querySelector("img").src;

            if (document.getElementById("profile_img")) {
                document.getElementById("profile_img").remove();
            }
            if (document.getElementById("img_profile")) {
                document.getElementById("img_profile").remove();
            }
            create_img_frame(tmp_profile_pic, text_nods, "div");
        }
    } else if (mutationList[eval(mutationList.length) - 1].removedNodes.length > 0) {
        //console.log(mutationList);
        if (mutationList[eval(mutationList.length) - 1].removedNodes[0].localName == "textarea" && mutationList[eval(mutationList.length) - 1].removedNodes[0].id == "DescriptionInput") {
            if (document.getElementById("profile_img")) {
                document.getElementById("profile_img").remove();
            }
            if (document.getElementById("img_profile")) {
                document.getElementById("img_profile").remove();
            }

        } else if (mutationList[eval(mutationList.length) - 1].removedNodes[0].localName == "div" && mutationList[eval(mutationList.length) - 1].removedNodes[0].id == "bceRichOnlineProfile") {
            //console.log(mutationList[eval(mutationList.length) - 1].previousSibling.id);
            let text_nods = document.getElementById("DescriptionInput");
            let tmp_profile_pic = document.getElementById("DescriptionInput").value.split("profiles pic:");
            create_img_frame(tmp_profile_pic, text_nods, "textarea");
        } else if (mutationList[eval(mutationList.length) - 1].removedNodes[0].localName == "img" && mutationList[eval(mutationList.length) - 1].removedNodes[0].id == "img_profile") {
            if (document.getElementById("profile_img")) {
                document.getElementById("profile_img").remove();
            }
            if (document.getElementById("img_profile")) {
                document.getElementById("img_profile").remove();
            }
        }
        //nods_observer.disconnect();
    }
};

var observer = new MutationObserver(callback);

var config = {
    attributes: false,
    childList: true,
    characterData: false
};
observer.observe(target, config);
/*

*/
//observer.disconnect();
