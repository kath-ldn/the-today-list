import { makeProjectForm } from './forms.js';
import { editTaskModal } from './editTaskModal.js';
import logoImg from './assets/images/logoImg.png';
import { makeSignInBtn } from './signIn.js';
import { privacy } from './privacy.js';
import firebase from "firebase/app";
import {toggleDisplay} from "./createTasks"


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
    header.textContent = "The Today List";
    headerDiv.appendChild(header);
    //holds plysforms when they expand
    const formsDiv = document.createElement("div");
    formsDiv.setAttribute("id", "formsDiv");
    headerDiv.appendChild(formsDiv);
    const plusProject = document.createElement("button");
    plusProject.setAttribute("id", "plusProject");
    plusProject.setAttribute("class", "plus");
    plusProject.textContent = "Add Project";
    formsDiv.appendChild(plusProject);
    plusProject.addEventListener("click", () => {
        let newProjectForm = document.getElementById("newProjectForm");
        toggleDisplay(newProjectForm);
    });
    //user container
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
    let user;
    user = firebase.auth().currentUser;
    if(user == null || user == undefined){
        makeSignInBtn();
    };
    //creates container for project boxes
    const container = document.createElement("div");
    container.setAttribute("id", "container");
    content.appendChild(container);
    //adds and hides forms
    makeProjectForm();
    editTaskModal();
    privacy();
};

export { pageStructure }