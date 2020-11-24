function hideForm(element) {
    for (let i = 0; i < element.length; i++) {
           if (element[i].style.display === "none") { 
            element[i].style.display = "block";
        } else {element[i].style.display = "none";
} 
    }
}

///function to show/hide project and category forms
function changePFButtonDescription() {
    if (plusProject.textContent === "Hide 'New Project' Form") { 
        plusProject.textContent = "Show 'New Project' Form";
    } else { plusProject.textContent = "Hide 'New Project' Form";
    } 
}

function changeCatButtonDescription() {
    if (plusCategory.textContent === "Hide 'New Category' Form") { 
        plusCategory.textContent = "Show 'New Category' Form";
    } else { plusCategory.textContent = "Hide 'New Category' Form";
    } 
}

function pageStructure() {
//identifies content div
const content = document.getElementById("content");
//creates div for header
const headerDiv = document.createElement("div");
headerDiv.setAttribute("id", "headerDiv");
content.appendChild(headerDiv);
//creates header
const header = document.createElement("h1");
header.setAttribute("id", "header");
header.textContent = "Your To-Do List";
headerDiv.appendChild(header);

//creates di to hold plus buttons
const plusDiv = document.createElement("div");
plusDiv.setAttribute("id", "plusDiv");
content.appendChild(plusDiv);

//creates div for plusCategory button
const plusCategoryDiv = document.createElement("div");
plusCategoryDiv.setAttribute("id", "plusCategoryDiv");
plusDiv.appendChild(plusCategoryDiv);
//creates plusCategory button
const plusCategory = document.createElement("button");
plusCategory.setAttribute("id", "plusCategory");
plusCategory.setAttribute("class", "plus");
plusCategory.textContent = "Show 'New Category' Form";
plusCategoryDiv.appendChild(plusCategory);
plusCategory.addEventListener("click", () => {
    let inputNewCategory = document.getElementsByClassName("inputNewCategory")    
    hideForm(inputNewCategory);
    changeCatButtonDescription()
})

//creates div for plusProject button
const plusProjectDiv = document.createElement("div");
plusProjectDiv.setAttribute("id", "plusProjectDiv");
plusDiv.appendChild(plusProjectDiv);
//creates plusProject button
const plusProject = document.createElement("button");
plusProject.setAttribute("id", "plusProject");
plusProject.setAttribute("class", "plus");
plusProject.textContent = "Show 'New Project' Form";
plusProjectDiv.appendChild(plusProject);
plusProject.addEventListener("click", () => {
    let projectForm = document.getElementsByClassName("projectForm")    
    hideForm(projectForm);
    changePFButtonDescription();
})

const formsDiv = document.createElement("div");
formsDiv.setAttribute("id", "formsDiv");
content.appendChild(formsDiv);

/*
//creates div for show all projects button
const showAllDiv = document.createElement("div");
showAllDiv.setAttribute("id", "showAllDiv");
content.appendChild(showAllDiv);
//creates show all projects button
const showAll = document.createElement("button");
showAll.setAttribute("id", "showAll");
showAll.setAttribute("class", "plus");
showAll.textContent = "Show all projects";
showAllDiv.appendChild(showAll);
*/

//creates container for project boxes
const container = document.createElement("div");
container.setAttribute("id", "container");
content.appendChild(container);

//clear local storage option
const clearStorageDiv = document.createElement("div");
const clearStorageButton = document.createElement("button");
clearStorageButton.setAttribute("id", "clearStorageButton");
clearStorageButton.textContent = "Nuclear option! Delete all your projects";

clearStorageButton.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});

clearStorageDiv.appendChild(clearStorageButton)
content.appendChild(clearStorageDiv)



}

function defaultHideForms() {
let inputNewCategory = document.getElementsByClassName("inputNewCategory");  
let projectForm = document.getElementsByClassName("projectForm");

hideForm(inputNewCategory)     
hideForm(projectForm)

}

export { pageStructure }
export { defaultHideForms }