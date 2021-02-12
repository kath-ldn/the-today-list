import { makeTaskForm } from './forms.js';
import { makeProjectForm } from './forms.js';
import { editTaskModal } from './editTaskModal.js';
import logoImg from './assets/images/image2.png';

//function to hide 'New' forms
function hideForm(element) {
    for (let i = 0; i < element.length; i++) {
        if (element[i].style.display === "none") { 
            element[i].style.display = "block";
        } else {element[i].style.display = "none";
        } 
    }
};

function defaultHideForms() {
    let inputNewProject = document.getElementsByClassName("inputNewProject");  
    let taskForm = document.getElementsByClassName("taskForm");
    hideForm(inputNewProject)     
    hideForm(taskForm)
};

///function to show/hide task and Project forms
function changeButtonDescription(type) {
    let form = (type === 'task') ? plusTask : plusProject;
    if (form.textContent === "Hide Form") { 
        form.textContent = "New " + type;
    } else { form.textContent = "Hide Form";
    } 
};

function pageStructure() {
    //header div
    const content = document.getElementById("content");
    const headerDiv = document.createElement("div");
    headerDiv.setAttribute("id", "headerDiv");
    content.appendChild(headerDiv);

    //adds logo
    let logo = document.createElement("img");
    logo.src = logoImg;
    logo.setAttribute("id", "logoImg");
    headerDiv.appendChild(logo);
    
    //h1
    const header = document.createElement("h1");
    header.setAttribute("id", "header");
    header.textContent = "TODAY LIST";
    headerDiv.appendChild(header);
    


    //plus buttons div
    const plusDiv = document.createElement("div");
    plusDiv.setAttribute("id", "plusDiv");
    headerDiv.appendChild(plusDiv);

    //plusProject button and div
    const plusProjectDiv = document.createElement("div");
    plusProjectDiv.setAttribute("id", "plusProjectDiv");
    plusDiv.appendChild(plusProjectDiv);
    const plusProject = document.createElement("button");
    plusProject.setAttribute("id", "plusProject");
    plusProject.setAttribute("class", "plus");
    plusProject.textContent = "New Project";
    plusProjectDiv.appendChild(plusProject);
    plusProject.addEventListener("click", () => {
        let inputNewProject = document.getElementsByClassName("inputNewProject")    
        hideForm(inputNewProject);
        changeButtonDescription('Project');
    });

    //plusTask button and div
    const plusTaskDiv = document.createElement("div");
    plusTaskDiv.setAttribute("id", "plusTaskDiv");
    plusDiv.appendChild(plusTaskDiv);
    //creates plusTask button
    const plusTask = document.createElement("button");
    plusTask.setAttribute("id", "plusTask");
    plusTask.setAttribute("class", "plus");
    plusTask.textContent = "New Task";
    plusTaskDiv.appendChild(plusTask);
    plusTask.addEventListener("click", () => {
        let taskForm = document.getElementsByClassName("taskForm")    
        hideForm(taskForm);
        changeButtonDescription('task');
    });
    //holds plysforms when they expand
    const formsDiv = document.createElement("div");
    formsDiv.setAttribute("id", "formsDiv");
    headerDiv.appendChild(formsDiv);

    //footer button to clear local storage
    const clearStorageDiv = document.createElement("div");
    clearStorageDiv.setAttribute("id", "clearStorageDiv");
    const clearStorageButton = document.createElement("button");
    clearStorageButton.setAttribute("id", "clearStorageButton");
    clearStorageButton.textContent = "Nuclear option! Delete all your tasks";
    clearStorageButton.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });
    clearStorageDiv.appendChild(clearStorageButton)
    headerDiv.appendChild(clearStorageDiv)

    //creates container for project boxes
    const container = document.createElement("div");
    container.setAttribute("id", "container");
    content.appendChild(container);
    //adds and hides forms
    makeProjectForm();
    makeTaskForm();
    defaultHideForms();
    editTaskModal();
};

export { pageStructure }