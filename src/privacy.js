import { removeChildrenAndParent } from './helpers';
import { toggleGrid } from './helpers.js';

let privacyHeadings = ["Using this website", "What data do we collect?", "Why do we collect this data?", "How do we store this information?"]
let privacyText = ["This website and its contents are provided for personal use only. No guarantees are made about the effectiveness or security of this platform. The Today List App is currently in beta phase. Therefore you may experience bugs. Please send me any feedback or ideas for improvement about kath.develops@gmail.com.",
" We collect information from Google via Firebase including your email address, location and profile picture . We store the projects and tasks that you submit into this app.", 
"The purpose of collecting this information is in order to enable you to use the service and to improve the service. We will not share this information. Under the GDPR, the lawful  basis we rely on for processing this information is Your Consent. You are able to remove your consent at any time by contacting kath.develops@gmail.com. You have rights under the UK GDPR and can find these on the Information Commissioner's Office Website.",
"Your information is stored by Google using Firebase on European servers. No method of storing information on the internet is completely secure, so bear this in mind as you use the service."]

function loadPrivacy(){
    let content = document.getElementById("content");
    let privacyWrapper = document.createElement("div");
    privacyWrapper.setAttribute("id", "privacyWrapper");
    content.appendChild(privacyWrapper);

    let returnHome = document.createElement("div");
    returnHome.setAttribute("id", "returnHome");
    returnHome.textContent = "Return";
    privacyWrapper.appendChild(returnHome);
    returnHome.addEventListener("click", () => {
        togglePrivacy();
    })

    let privacyPolicy = document.createElement("h3");
    privacyPolicy.textContent = "Privacy Policy";
    privacyWrapper.appendChild(privacyPolicy);

    for(let i = 0; i < privacyHeadings.length; i++){
        let block = document.createElement("h4");
        block.classList.add("pp-sub-header");
        block.textContent = privacyHeadings[i];
        privacyWrapper.appendChild(block);
        if(privacyText[i]){
            let text = document.createElement("p");
            text.classList.add("pp-policy-text");
            text.textContent = privacyText[i];
            privacyWrapper.appendChild(text);
        }
    }
};

function togglePrivacyContent(){
    let container = document.getElementById("container");
    (container.style.display === "none") ? loadPrivacy() : removeChildrenAndParent("privacyWrapper");
};

function togglePrivacy(){
    toggleGrid("container");
    togglePrivacyContent();
};

export { togglePrivacy }