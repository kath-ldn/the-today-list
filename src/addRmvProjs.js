import { projects, tasks } from './projectData';
import { db } from './index.js';
import firebase from "firebase/app";
import { makeTaskForm } from './forms.js';
import { toggleDisplay, toggleFlexForm } from './helpers';
import { removeTaskFromDatabase } from './addRmvTasks';

/* FUNCTIONS TO REMOVE PROJECTS */
//removes divs containing project from DOM
function removeFromVisuals(index){
    let parentDiv = document.getElementById("container");
    let projectDiv = document.getElementById("projectWrapper" + index);
    parentDiv.removeChild(projectDiv);
};

function removeAllProjectTasks(deletedProj){
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].project === deletedProj){
            console.log(tasks[i])
            removeTaskFromDatabase(tasks[i])
        }
    }
};

//removes project data from Firebase
function removeFromFirebase(project){
    projects.splice(projects.indexOf(project), 1);
    removeAllProjectTasks(project)
    let user = firebase.auth().currentUser;
    let uid = user.uid;
        db.collection("users").doc(uid).update({
            projects: firebase.firestore.FieldValue.arrayRemove(project)
        })
        .catch((error) => {
            console.error("Error deleting project from Firebase: ", error);
        });
};

//deletes project from DOM & Firebase
function removeProject(index, project){
    removeFromVisuals(index);
    removeFromFirebase(project);
};

/* FUNCTIONS TO SHOW EXISTING PROJECTS */
let colors = ["#777da7", "#54a2a5", "#499da0", "#48bf84", "#3a2449", "#5f8173"];

function getRandomColor(){
    let random = Math.floor(Math.random() * 10);
    let randomColor = (colors[random]) ? colors[random] : colors[0];
    return randomColor;
};

function coloritems(project, projTitle){
    let randomColor = getRandomColor();
    project.style.border = "2px solid" + randomColor;
    projTitle.style.color = randomColor;
}

function createProjectWrapper(i){
    let projectWrapper = document.createElement("div");
    projectWrapper.setAttribute("class", "projectWrapper");
    projectWrapper.setAttribute("id", "projectWrapper" + i);
    return projectWrapper;
};

function createProjectDiv(i){
    let project = document.createElement("div");
    project.setAttribute("class", "project");        
    project.setAttribute("id", "project" + i);
    return project;
};

function createProjectHeader(){
    let projHeader = document.createElement("div");
    projHeader.setAttribute("class", "projHeader");
    return projHeader;
};

function createProjectTitle(item){
let projTitle = document.createElement("h2");
    projTitle.setAttribute("class", "projTitle");  
    projTitle.textContent = item;
    return projTitle;
};

function createProjectActions(){
    let projActions = document.createElement("div");
    projActions.setAttribute("class", "projActions");
    return projActions;
};

function createHideShow(i, taskContainer){
    const hideShow = document.createElement('button');
    hideShow.classList.add("hideShow");
    hideShow.setAttribute("id", "hideShow", + i);
    hideShow.addEventListener('click', () => {
        toggleDisplay(taskContainer);
    });
    return hideShow;
};

function createRemoveProject(i, item){
    const removeProjBtn = document.createElement('button');
    removeProjBtn.classList.add("remove");
    removeProjBtn.setAttribute("id", "rProj", + i);
    removeProjBtn.addEventListener('click', () => {
        removeProject(i, item);
    });
    return removeProjBtn;
};

function createTaskContainer(i){
    let taskContainer = document.createElement("div");
    taskContainer.setAttribute("class", "taskContainer");        
    taskContainer.setAttribute("id", "taskContainer" + i);
    return taskContainer
};

function createPlusTaskDiv(i){
    const plusTaskDiv = document.createElement("div");
    plusTaskDiv.setAttribute("id", "plusTaskDiv" + i);
    plusTaskDiv.classList.add("plusTaskDiv");
    return plusTaskDiv;
};

function createPlusTask(i, taskFormContainer){
    const plusTask = document.createElement("button");
    plusTask.setAttribute("id", "plusTask" + i);
    plusTask.setAttribute("class", "plus");
    plusTask.textContent = "New Task";
    plusTask.addEventListener("click", () => {
        toggleFlexForm(plusTask, taskFormContainer);
    });
    return plusTask;
};

function createTaskFormContainer(i, item){
    let taskFormContainer = document.createElement("div");
    taskFormContainer.setAttribute("class", "taskFormContainer");
    taskFormContainer.setAttribute("id", "taskFormContainer" + i);
    makeTaskForm(i, taskFormContainer, item);
    return taskFormContainer;
};

function displayProject(i){
    let item = projects[i];
    //creates all elements
    let projectWrapper = createProjectWrapper(i);
    let project = createProjectDiv(i);
    let projHeader = createProjectHeader();
    let projTitle = createProjectTitle(item);
    let projActions = createProjectActions();
    let removeProjBtn = createRemoveProject(i, item);
    let taskContainer = createTaskContainer(i);
    let hideShow = createHideShow(i, taskContainer);
    let plusTaskDiv = createPlusTaskDiv(i);
    let taskFormContainer = createTaskFormContainer(i, item);
    let plusTask = createPlusTask(i, taskFormContainer);
    // Appends all elements to wrapper
    project.appendChild(projHeader);
    projHeader.appendChild(projTitle);
    projHeader.appendChild(projActions);
    projActions.appendChild(hideShow);
    projActions.appendChild(removeProjBtn);
    project.appendChild(taskContainer);
    project.appendChild(plusTaskDiv);
    plusTaskDiv.appendChild(plusTask);
    projectWrapper.appendChild(project);
    projectWrapper.appendChild(taskFormContainer);
    //adds random styling to select elements
    coloritems(project, projTitle);
    //ties it all together - appends project wrapper to container
    let container = document.getElementById("container");
    container.appendChild(projectWrapper);
};

//function to display all projects on page
function displayProjectDivs() {
    for(let i = 0; i < projects.length; i++) {
        displayProject(i);
    };
};

/* FUNCTIONS TO ADD AND DISPLAY NEW PROJECTS */
function projectAlreadyExists(){
    let message = "Oops! Looks like that already exists";
    alert(message);
    event.preventDefault();
};

function addNewProject(newProject){
    event.preventDefault();
    projects.push(newProject);
    let user = firebase.auth().currentUser;
    let uid;
    if(user != null){
        uid = user.uid;
        db.collection("users").doc(uid).update({
            projects: firebase.firestore.FieldValue.arrayUnion(newProject)
        })
        .catch((error) => {
            console.error("Error adding project: ", error);
        });
    };
};

function newProject() {
    let newProject = newProjectForm.inputNewProject.value;
    if (projects.includes(newProject)){
        projectAlreadyExists()
    } else {
        addNewProject(newProject)
        let index = projects.indexOf(newProject);
        displayProject(index);
    };
};

export { projects, tasks, displayProjectDivs, newProject };