import { showEditForm } from './editTaskModal.js';
import { formatDistanceStrict } from 'date-fns'
import { projects, tasks } from './projectData'
import { editTask, changePriority } from './editTasks'
import { db } from './index.js';
import firebase from "firebase/app";
import { makeTaskForm } from './forms.js';

//array of project colors
let colors = ["#ff6666","#777da7","#fcca46","#62bec1","#6eeb83","#48bf84","#3a2449","#2ec4b6","#a7cdbd"];

//array to hold priority levels
let priorities = ["Very Low", "Low", "Medium", "High", "Very High"];

function checkRandomId(randomId){
    let user = firebase.auth().currentUser;
    if(user != null){
        let uid;
        uid = user.uid;
        db.collection("users").doc(uid).collection('tasks').doc(randomId).get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                return false;
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                return true;
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
            return false;
        });
    }
}; 

function getRandomId(){
    let unique = false;
    let randomId;
    while(unique === false){
        randomId = Math.floor((Math.random() * 1000000000) + 1);
        randomId = randomId.toString();
        unique = checkRandomId(randomId);
    };
    return randomId;
};

//construtor to create task objects
function CreateTask(id, title, project, description, dueDate, priority) {
    this.id = id,
    this.title = title,
    this.project = project,
    this.description = description,
    this.dueDate = dueDate,
    this.priority = priority
};

// function to delete project
//must add way to delete all tasks too
function removeProject(index, project){
    let parentDiv = document.getElementById("container");
    let projectDiv = document.getElementById("projectWrapper" + index);
    parentDiv.removeChild(projectDiv);
    projects.splice(projects.indexOf(project), 1);
    //removes from Firebase storage
    let user = firebase.auth().currentUser;
    let uid;
    if(user != null){
        uid = user.uid;
        db.collection("users").doc(uid).update({
            projects: firebase.firestore.FieldValue.arrayRemove(project)
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    };
};

function toggleDisplay(element){
    (element.style.display === "none") ? element.style.display = "block" : element.style.display = "none";
};

//function to display project
function displayProject(i){
    let item = projects[i];
    let index = i;
    let projectWrapper = document.createElement("div");
    projectWrapper.setAttribute("class", "projectWrapper");
    projectWrapper.setAttribute("id", "projectWrapper" + i);
    //projectdiv
    let project = document.createElement("div");
    project.setAttribute("class", "project");        
    project.setAttribute("id", "project" + i);
    let random = Math.floor(Math.random() * 10);
    let randomColor = (colors[random]) ? colors[random] : colors[0];
    project.style.border = "2px solid" + randomColor;
    let projHeader = document.createElement("div");
    projHeader.setAttribute("class", "projHeader");
    project.appendChild(projHeader);
    //title
    let projTitle = document.createElement("h2");
    projTitle.setAttribute("class", "projTitle");  
    projTitle.textContent = projects[i];
    projTitle.style.color = randomColor;
    projHeader.appendChild(projTitle);
    //buttons to manag project
    let projActions = document.createElement("div");
    projActions.setAttribute("class", "projActions");
    projHeader.appendChild(projActions);
    //button to hide/show tasks
    const hideShow = document.createElement('button');
    hideShow.classList.add("hideShow");
    hideShow.setAttribute("id", "hideShow", + projects.indexOf(item));
    projActions.appendChild(hideShow);
    //remove project
    const removeProjBtn = document.createElement('button');
    removeProjBtn.classList.add("remove");
    removeProjBtn.setAttribute("id", "rProj", + projects.indexOf(item));
    projActions.appendChild(removeProjBtn);
    removeProjBtn.addEventListener('click', () => {
        removeProject(index, item);
    });
    //creates container for tasks
    let taskContainer = document.createElement("div");
    taskContainer.setAttribute("class", "taskContainer");        
    taskContainer.setAttribute("id", "taskContainer" + i);
    //event listener to hide task container
    hideShow.addEventListener('click', () => {
        toggleDisplay(taskContainer);
    });
    project.appendChild(taskContainer);

    //plusTask button and div
    const plusTaskDiv = document.createElement("div");
    plusTaskDiv.setAttribute("id", "plusTaskDiv" + i);
    plusTaskDiv.classList.add("plusTaskDiv")
    project.appendChild(plusTaskDiv);
    //creates plusTask button
    const plusTask = document.createElement("button");
    plusTask.setAttribute("id", "plusTask" + i);
    plusTask.setAttribute("class", "plus");
    plusTask.textContent = "New Task";
    plusTaskDiv.appendChild(plusTask);
    projectWrapper.appendChild(project);

    let taskFormContainer = document.createElement("div");
    projectWrapper.appendChild(taskFormContainer);
    taskFormContainer.setAttribute("class", "taskFormContainer");
    taskFormContainer.setAttribute("id", "taskFormContainer" + i);
    makeTaskForm(item, index, taskFormContainer);
    plusTask.addEventListener("click", () => {   
        plusTask.style.display = "none";
        taskFormContainer.style.display = "flex";
    });
    let container = document.getElementById("container");
    container.appendChild(projectWrapper);
};

//function to display task projects on page
function displayProjectDivs() {
    for(let i = 0; i < projects.length; i++) {
        displayProject(i);
    };
};

//finds place of task project in project array
function findProject(object) {
    let assignedProject = projects.indexOf(object.project);
    return assignedProject;
};

//finds correct project div for task div
function findProjectDiv(object) {
    let i = findProject(object);
    let parentProject = document.getElementById("taskContainer" + i);
    return parentProject;
};

//item = object  and index = original index (id)
function removeTask(item, index, projectDiv) {
    let parentDiv = projectDiv;
    let taskDiv = document.getElementById("task" + index);
    parentDiv.removeChild(taskDiv);
    tasks.splice(tasks.indexOf(item), 1);
    let user = firebase.auth().currentUser;
    let uid;
    if(user != null){
        uid = user.uid;
        db.collection("users").doc(uid).collection('tasks').doc(item.id).delete()
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
};

function changeDescription(element) {
    if (element.textContent === "Show Description") { 
        element.textContent = "Hide Description";
    } else { element.textContent = "Show Description";
    } 
};

function getHelpfulDate(dueDate){
    let currentDate = new Date();
    let helpfulDate = formatDistanceStrict(dueDate, currentDate);
    let text;
    let status;
    if(dueDate < currentDate){
        text = "(" + helpfulDate + " ago.)";
        status = "pastDue"  
    } else if (dueDate > currentDate) {
        text = " (In " + helpfulDate + ")";
        status = "helpfulDateDiv";  
    }
    return [text, status];
};

//creates divs for new tasks - see if can refactor/shorten
function makeTaskDivs(item) {
    const taskDiv = document.createElement("div");
    const titleDiv = document.createElement("div");
    const title = document.createElement("h3");
    const descriptionButton = document.createElement("button");    
    const descriptionDiv = document.createElement("div");
    const dueDateDiv = document.createElement("div");
    const dueDate = document.createElement("div");
    const helpfulDateDiv = document.createElement("div");
    const priorityBtn = document.createElement("button");
    const removeBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    let index = tasks.indexOf(item);
    taskDiv.classList.add("task");
    taskDiv.setAttribute("id", "task" + tasks.indexOf(item));
    titleDiv.appendChild(title);
    title.textContent = item.title;
    title.classList.add("taskTitle");
    titleDiv.setAttribute("id", "title" + tasks.indexOf(item));
    titleDiv.classList.add("title");
    taskDiv.appendChild(titleDiv);
    descriptionButton.textContent = "Show Description";
    descriptionButton.setAttribute("class", "toggleDescription");
    descriptionButton.setAttribute("id", "descriptionButton" + index);
    taskDiv.appendChild(descriptionButton);
    descriptionDiv.textContent = item.description;
    descriptionDiv.setAttribute("class", "description");
    descriptionDiv.setAttribute("id", "description" + tasks.indexOf(item));
    descriptionDiv.style.display = "none"
    taskDiv.appendChild(descriptionDiv);
    descriptionButton.addEventListener("click", () => {
            toggleDisplay(descriptionDiv);
            changeDescription(descriptionButton);
        })
    dueDateDiv.setAttribute("class", "dueDateDiv");
    let due = document.createElement("div");
    due.setAttribute("class", "due");
    due.textContent = "Due "
    dueDateDiv.appendChild(due);
    dueDate.setAttribute("id", "dueDate" + tasks.indexOf(item));
    let date = new Date(item.dueDate);
    dueDate.textContent = date.toDateString();
    helpfulDateDiv.setAttribute("id", "helpfulDateDiv" + tasks.indexOf(item));
    
    let helpfulDate = getHelpfulDate(item.dueDate);
    helpfulDateDiv.textContent = helpfulDate[0];
    helpfulDateDiv.setAttribute("class", helpfulDate[1]);  
    helpfulDateDiv.classList.add("helpfulDateDiv");
    
    dueDateDiv.appendChild(dueDate);
    dueDateDiv.appendChild(helpfulDateDiv);
    taskDiv.appendChild(dueDateDiv);
    
    let taskFooter = document.createElement("div");
    taskFooter.setAttribute("class", "taskFooter");
    taskDiv.appendChild(taskFooter);

    let priorityLabel = document.createElement("Label");
    priorityLabel.setAttribute("for", priorityBtn);
    priorityLabel.setAttribute("class", "priorityLabel");
    priorityLabel.textContent = "Priority";
    taskFooter.appendChild(priorityLabel);

    priorityBtn.textContent = item.priority;
    priorityBtn.classList.add("priority");
    let priorityClass = item.priority.toString();
    priorityClass = priorityClass.replace(/\s/g, '');
    priorityBtn.classList.add(priorityClass);
    priorityBtn.setAttribute("id", "priority" + tasks.indexOf(item));
    taskFooter.appendChild(priorityBtn); 
    priorityBtn.addEventListener('click', () => {
        changePriority(item, priorityBtn);
    });
    editBtn.setAttribute("class", "modifyTask")
    editBtn.setAttribute("id", "eTask", + tasks.indexOf(item));
    taskFooter.appendChild(editBtn);
    editBtn.addEventListener('click', () => {
        showEditForm(item, index);
        let submitEdit = document.getElementById("submitEdit");
        submitEdit.addEventListener('click', () => {
            editTask(item, index);
            hideModal();
            title.textContent = item.title;
            descriptionDiv.textContent = item.description;
            dueDate.textContent = item.date.toDateString();
            helpfulDateDiv.textContent = helpfulDate[0];
            priorityBtn.textContent = item.priority;
        })
    });
    removeBtn.setAttribute("class", "modifyTask")
    removeBtn.setAttribute("id", "rTask", + tasks.indexOf(item));
    let projectDiv = findProjectDiv(item);
    taskFooter.appendChild(removeBtn);
    removeBtn.addEventListener('click', () => {
        removeTask(item, index, projectDiv);
    });
    projectDiv.appendChild(taskDiv);
};

function hideModal() {
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
};

//loops through tasks array and create divs for each task
function displayAllTasks() {
    for (let i=0; i < tasks.length; i++) {
        makeTaskDivs(tasks[i]);
    }
};

function addTaskToArray(newTask) {
    tasks.push(newTask);
    let user = firebase.auth().currentUser;
    let uid;
    if(user != null){
        uid = user.uid;
        db.collection("users").doc(uid).collection('tasks').doc(newTask.id).set({
            "id": newTask.id,
            "title": newTask.title,
            "project": newTask.project,
            "description": newTask.description,
            "dueDate": newTask.dueDate,
            "priority": newTask.priority
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
    makeTaskDivs(newTask);
};

function formDataToTask(taskForm, index, item){
    event.preventDefault();
    let id = getRandomId();
    let title = taskForm.title.value;
    let project = item;
    let description = taskForm.description.value;
    let dueDate = new Date(taskForm.inputDueDate.value);
    let priority = taskForm.inputPriority.value;
    let newTask = new CreateTask(id, title, project, description, dueDate, priority);
    addTaskToArray(newTask);
    taskForm.reset();
};

function newProject() {
    let newProject = newProjectForm.inputNewProject.value;
    if (projects.includes(newProject)){
        let message = "Oops! Looks like that already exists";
        alert(message);
        event.preventDefault();
    } else {
    event.preventDefault();
    projects.push(newProject);
    //adds to Firebase storage
    let user = firebase.auth().currentUser;
    let uid;
    if(user != null){
        uid = user.uid;
        db.collection("users").doc(uid).update({
            projects: firebase.firestore.FieldValue.arrayUnion(newProject)
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    };
    let index = projects.indexOf(newProject);
    displayProject(index);
    };
};

export { projects } 
export { tasks } 
export { priorities }
export { displayProjectDivs }
export { displayAllTasks } 
export { newProject }
export { formDataToTask }
export { getHelpfulDate }
export { addTaskToArray }
export { CreateTask }
export { getRandomId }
export { toggleDisplay }