import { togglePrivacy } from './privacy.js';

function createFooter(){
    let footer = document.getElementById("footer");

    let copyright = document.createElement("p");
    copyright.classList.add("copyright");
    copyright.textContent = "Copyright © 2021 Kath Turner"

    let privacyLink = document.createElement("div");
    privacyLink.setAttribute("id", "privacy-policy-link");
    privacyLink.textContent = "Privacy Policy";
    privacyLink.addEventListener("click", () => {
        togglePrivacy();
    });

    footer.appendChild(copyright);
    footer.appendChild(privacyLink);
};

let privacyDiv = document.getElementById("privacy-policy-div");
let privacyLink = document.getElementById("privacy-policy-link");

export { createFooter }