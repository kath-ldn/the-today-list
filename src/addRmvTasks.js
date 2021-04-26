import { showEditForm } from './editTaskForm';
import { formatDistanceStrict } from 'date-fns';
import { tasks, currentTaskIndex, currentTaskDiv } from './projectData';
import { toggleDisplay, findProjectDiv } from './helpers';
import { changePriority } from './editTasks.js';
import { db } from './index.js';
import firebase from "firebase/app";

//construtor to create task objects
function CreateTask(id, title, project, description, dueDate, priority) {
    this.id = id,
    this.title = title,
    this.project = project,
    this.description = description,
    this.dueDate = dueDate,
    this.priority = priority
};

//array to hold priority levels
let priorities = ["Very Low", "Low", "Medium", "High", "Very High"];

//checks that random ID used for tasks is unique
function checkRandomId(randomId){
    let user = firebase.auth().currentUser;
    if(user != null){
        let uid = user.uid;
        db.collection("users").doc(uid).collection('tasks').doc(randomId).get().then((doc) => {
            if (doc.exists) {
                return false;
            } else {
                return true;
            }
        }).catch((error) => {
            console.log("Error checking random ID", error);
            return false;
        });
    }
}; 

//gets a random ID or the task(remains constant even if task data is changed)
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

function removeTaskFromDatabase(item){
    let user = firebase.auth().currentUser;
        let uid;
        if(user != null){
            uid = user.uid;
            db.collection("users").doc(uid).collection('tasks').doc(item.id).delete()
            .catch((error) => {
                console.error("Error deleting task from database ", error);
            });
        }
};

//item = object and index = original index (id)
function removeTask(item, index, projectDiv) {
    let parentDiv = projectDiv;
    let taskDiv = document.getElementById("task" + index);
    parentDiv.removeChild(taskDiv);
    tasks.splice(tasks.indexOf(item), 1);
    removeTaskFromDatabase(item);
};

function changeDescription(element) {
    if (element.textContent === "Show Description") { 
        element.textContent = "Hide Description";
    } else { element.textContent = "Show Description";
    } 
};

//shows if due date is in past or future
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

/* Creates task elements */
function createTaskDiv(index){
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.setAttribute("id", "task" + index);
    return taskDiv;
};

function createTitle(item, index){
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    const title = document.createElement("h3");
    title.setAttribute("id", "title" + index);
    title.textContent = item.title;
    title.classList.add("taskTitle");
    titleDiv.appendChild(title);
    return titleDiv;
};

function createDescriptionDiv(item, index){
    const descriptionDiv = document.createElement("div");
    descriptionDiv.textContent = item.description;
    descriptionDiv.setAttribute("class", "description");
    descriptionDiv.setAttribute("id", "description" + index);
    descriptionDiv.style.display = "none";
    return descriptionDiv;
};

function createDescriptionBtn(descriptionDiv, index){
    const descriptionButton = document.createElement("button");
    descriptionButton.textContent = "Show Description";
    descriptionButton.setAttribute("class", "toggleDescription");
    descriptionButton.setAttribute("id", "descriptionButton" + index);
    descriptionButton.addEventListener("click", () => {
        toggleDisplay(descriptionDiv);
        changeDescription(descriptionButton);
    });
    return descriptionButton;
};

function createDueDate(item, index){
    let date = new Date(item.dueDate);
    let helpfulDate = getHelpfulDate(item.dueDate);
    const dueDateDiv = document.createElement("div");
    dueDateDiv.setAttribute("class", "dueDateDiv");
    const due = document.createElement("div");
    due.setAttribute("class", "due");
    due.textContent = "Due ";
    const dueDate = document.createElement("div");
    dueDate.setAttribute("id", "dueDate" + index);
    dueDate.textContent = date.toDateString();
    const helpfulDateDiv = document.createElement("div");
    helpfulDateDiv.setAttribute("id", "helpfulDateDiv" + index);
    helpfulDateDiv.textContent = helpfulDate[0];
    helpfulDateDiv.setAttribute("class", helpfulDate[1]); 
    helpfulDateDiv.classList.add("helpfulDateDiv");
    dueDateDiv.appendChild(due);
    dueDateDiv.appendChild(dueDate);
    dueDateDiv.appendChild(helpfulDateDiv);
    return dueDateDiv;
};

function createPriorityBtn(item, index){
    let priorityClass = item.priority.toString();
    priorityClass = priorityClass.replace(/\s/g, '');
    const priorityBtn = document.createElement("button");
    priorityBtn.textContent = item.priority;
    priorityBtn.classList.add("priority");
    priorityBtn.classList.add(priorityClass);
    priorityBtn.setAttribute("id", "priority" + index);
    priorityBtn.addEventListener('click', () => {
        changePriority(item, priorityBtn);
    });
    return priorityBtn;
};

function createRemoveBtn(item, projectDiv, index){
    const removeBtn = document.createElement('button');
    removeBtn.setAttribute("class", "modifyTask")
    removeBtn.setAttribute("id", "rTask" + index);
    removeBtn.classList.add("rTask");
    removeBtn.addEventListener('click', () => {
        removeTask(item, index, projectDiv);
    });
    return removeBtn;
};

function createEditBtn(item, index){
    const editBtn = document.createElement('button');
    editBtn.setAttribute("class", "modifyTask")
    editBtn.setAttribute("id", "eTask" + index);
    editBtn.classList.add("eTask");
    editBtn.addEventListener('click', () => {
        showEditForm(item);
        currentTaskIndex = tasks.indexOf(item);
        currentTaskDiv = index;
    });
    return editBtn;
};

function createTaskFooter(item, index, projectDiv){
    let taskFooter = document.createElement("div");
    taskFooter.setAttribute("class", "taskFooter");
    const priorityBtn = createPriorityBtn(item, index);
    const editBtn = createEditBtn(item, index);
    const removeBtn = createRemoveBtn(item, projectDiv, index)
    taskFooter.appendChild(priorityBtn); 
    taskFooter.appendChild(editBtn);
    taskFooter.appendChild(removeBtn);
    return taskFooter;
};

function makeTaskDivs(item) {
    let index = tasks.indexOf(item);
    let projectDiv = findProjectDiv(item);
    const taskDiv = createTaskDiv(index);
    const title = createTitle(item, index);
    const descriptionDiv = createDescriptionDiv(item, index);
    const descriptionButton = createDescriptionBtn(descriptionDiv, index);
    const dueDate = createDueDate(item, index);
    const taskFooter = createTaskFooter(item, index, projectDiv);
    taskDiv.appendChild(title);
    taskDiv.appendChild(descriptionButton);
    taskDiv.appendChild(descriptionDiv);
    taskDiv.appendChild(dueDate);
    taskDiv.appendChild(taskFooter);
    projectDiv.appendChild(taskDiv);
};

function makeNewtaskDiv(item, parent) {
    let index = tasks.indexOf(item);
    let projectDiv = document.getElementById("taskContainer" + parent)
    const taskDiv = createTaskDiv(index);
    const title = createTitle(item, index);
    const descriptionDiv = createDescriptionDiv(item, index);
    const descriptionButton = createDescriptionBtn(descriptionDiv, index);
    const dueDate = createDueDate(item, index);
    const taskFooter = createTaskFooter(item, index, projectDiv);
    taskDiv.appendChild(title);
    taskDiv.appendChild(descriptionButton);
    taskDiv.appendChild(descriptionDiv);
    taskDiv.appendChild(dueDate);
    taskDiv.appendChild(taskFooter);
    projectDiv.appendChild(taskDiv);
};


//loops through tasks array and create divs for each task
function displayAllTasks() {
    for (let i=0; i < tasks.length; i++) {
        makeTaskDivs(tasks[i]);
    }
};

/* Adds task to array and updates Firebase */
function addTaskToArray(newTask, parent) {
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
            console.error("Error adding task: ", error);
        });
    }
    makeNewtaskDiv(newTask, parent);
};

function formDataToTask(taskForm, index, item){
    event.preventDefault();
    let target = event.target.id;
    let parent = target.split("t")[1];
    let id = getRandomId();
    let title = taskForm.title.value;
    let project = item;
    let description = taskForm.description.value;
    let dueDate = new Date(taskForm.inputDueDate.value);
    let priority = taskForm.inputPriority.value;
    let newTask = new CreateTask(id, title, project, description, dueDate, priority);
    addTaskToArray(newTask, parent);
    taskForm.reset();
};

export { priorities, formDataToTask, addTaskToArray, removeTaskFromDatabase, displayAllTasks, getHelpfulDate, CreateTask, getRandomId }