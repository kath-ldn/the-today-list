import Preview from "./assets/images/preview.png"

function hidePreviewPage(){
    let previewWrapper = document.getElementById("previewWrapper");
    if(previewWrapper != null){
        previewWrapper.style.display = "none";
    }
};

function previewPage(){
    let container = document.getElementById("container");

    let previewWrapper = document.createElement("div");
    previewWrapper.setAttribute("id", "previewWrapper")
    container.appendChild(previewWrapper);

    let previewImg = document.createElement("img");
    previewImg.setAttribute("id", "previewImg")
    previewImg.src = Preview;
    previewWrapper.appendChild(previewImg);

    let previewText = document.createElement("div");
    previewText.setAttribute("id", "previewText");
    previewWrapper.appendChild(previewText);

    let previewTextItem1 = document.createElement("p");
    previewTextItem1.classList.add("previewTextItem");
    previewTextItem1.textContent = "Manage all of your important projects with The Today List"
    previewText.appendChild(previewTextItem1);

    let previewTextItem2 = document.createElement("p");
    previewTextItem2.classList.add("previewTextItem");
    previewTextItem2.textContent = "Use our handy features to add and remove tasks as you complete them, prioritise and set deadline."
    previewText.appendChild(previewTextItem2);

    let previewTextItem3 = document.createElement("p");
    previewTextItem3.classList.add("previewTextItem");
    previewTextItem3.textContent = "Keep track of what is important today"
    previewText.appendChild(previewTextItem3);

    let previewTextItem4 = document.createElement("p");
    previewTextItem4.classList.add("previewTextItem");
    previewTextItem4.textContent = "Sign in above to begin!"
    previewText.appendChild(previewTextItem4);

};

export { previewPage, hidePreviewPage }