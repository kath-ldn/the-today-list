import { makeTaskForm } from './forms.js';
import { makeProjectForm } from './forms.js';
import { editTaskModal } from './editTaskModal.js';
import logoImg from './assets/images/logoImg.png';
import { signIn, getUser, seeStatus } from './signIn.js';
import { provider } from './index.js';
import { makeSignInBtn } from './signIn.js';
import { displayProjectDivs, displayAllTasks } from './createTasks';
import { projects, tasks } from './projectData.js';
import { privacy } from './privacy.js';

let user;

//temp fix - not updating project options for task form when loading data from firebase
//find reason why and amend
function addProjOptions(){
    let inputProject = document.getElementById("inputProject");
    while(inputProject.firstChild){
        inputProject.removeChild(inputProject.firstChild)
    }
    for (let i = 0; i < projects.length; i++) {
        let option = document.createElement("option");
        option.value = projects[i];
        option.text = projects[i];
        inputProject.appendChild(option);
     }
};

//function to hide 'New' forms
function toggleForm(element) {
    for (let i = 0; i < element.length; i++) {
        if (element[i].style.display === "none") {
            element[i].style.display = "block";
        } else {element[i].style.display = "none";
        } 
    }
    addProjOptions();
};

function defaultHideForms() {
    let inputNewProject = document.getElementsByClassName("inputNewProject");  
    let taskForm = document.getElementsByClassName("taskForm");

    toggleForm(inputNewProject);     
    toggleForm(taskForm);
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

    const userContainer = document.createElement("div");
    userContainer.setAttribute("id", "userContainer");
    const userPic = document.createElement("div");
    userPic.setAttribute("id", "userPic");
    const userName = document.createElement("div");
    userName.setAttribute("id", "userName");
    userContainer.appendChild(userPic);
    userContainer.appendChild(userName);
        headerDiv.appendChild(userContainer);
    userPic.style.display = "none";
    userName.style.display = "none";

    //sign up div
    const signUpDiv = document.createElement("div");
    signUpDiv.setAttribute("id", "signUpDiv");
    userContainer.appendChild(signUpDiv);
    if(!user){
        makeSignInBtn();
    }

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
        toggleForm(inputNewProject);
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
        toggleForm(taskForm);
        changeButtonDescription('task');
    });
    //holds plysforms when they expand
    const formsDiv = document.createElement("div");
    formsDiv.setAttribute("id", "formsDiv");
    headerDiv.appendChild(formsDiv);

    //creates container for project boxes
    const container = document.createElement("div");
    container.setAttribute("id", "container");
    content.appendChild(container);
    //adds and hides forms
    makeProjectForm();
    makeTaskForm();
    defaultHideForms();
    editTaskModal();
    privacy();
};

export { pageStructure }