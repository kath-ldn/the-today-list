let privacyDiv = document.getElementById("privacy-policy-div");
let privacyLink = document.getElementById("privacy-policy-link");

function privacy() {
    privacyLink.addEventListener("click", () => {
        if(privacyDiv.style.display === "none"){
            privacyDiv.style.display = "block"
        } else {
            privacyDiv.style.display = "none"
        }
    })
}

export { privacy }