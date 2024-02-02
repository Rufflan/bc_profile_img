// ==UserScript==
// @name profile_pic BC
// @namespace https://www.bondageprojects.com/
// @version 0.0.1
// @description Bondage Club with profile pic
// @author  Rufflan
// @match https://bondageprojects.elementfx.com/*
// @match https://www.bondageprojects.elementfx.com/*
// @match https://bondage-europe.com/*
// @match https://www.bondage-europe.com/*
// @match http://localhost:*/*
// @match http://127.0.0.1:*/*

// @grant none
// @run-at document-end
// ==/UserScript==

(function () {
  "use strict";
  const script = document.createElement("script");
  script.type = "module";
  script.setAttribute("crossorigin", "anonymous");
  script.src = `https://rufflan.github.io/bc_profile_img/profile_img.js?v=${Date.now()}`;
  document.head.appendChild(script);
})();
