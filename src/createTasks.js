import { showEditForm } from './editTaskModal.js';
import { formatDistanceStrict } from 'date-fns'
import { projects, tasks } from './projectData'
import { editTask, changePriority } from './editTasks'
import { db } from './index.js';
import firebase from "firebase/app";

//array of project colors
let colors = ['#3ba1c5', '#66b6d2', '#51abcb', '#7cc0d8'];

//array to hold priority levels
let priorities = ["Very Low", "Low", "Medium", "High", "Very High"];

//sort this out - not accounted for duplication
function getRandomId(){
    let randomId = Math.floor((Math.random() * 1000000000) + 1);
    randomId = randomId.toString();
    return randomId;
}

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
function removeProject(index, project){
    let parentDiv = document.getElementById("container");
    let projectDiv = document.getElementById("project" + index);
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

// function to show/hide tasks
function hideShowTasks(index, project){
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].project === project) {
            let x = document.getElementById("task" + i)
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
        }
    }
};

//function to display project
function displayProject(i){
    let project = document.createElement("div");
    project.setAttribute("class", "project");        
    project.setAttribute("id", "project" + i);
    project.style.backgroundColor = (colors[i]) ? colors[i] : colors[0];
    //title
    let projTitle = document.createElement("h2");
    projTitle.setAttribute("class", "projTitle");  
    projTitle.textContent = projects[i];
    project.appendChild(projTitle);
    //buttons to edit and remove projects
    let projEdit = document.createElement("div");
    projEdit.setAttribute("class", "projEdit");
    project.appendChild(projEdit);
    const removeProjBtn = document.createElement('button');
    removeProjBtn.textContent = "Delete Project";
    removeProjBtn.classList.add("remove");
    let item = projects[i];
    let index = i;
    removeProjBtn.setAttribute("id", "rProj", + projects.indexOf(item));
    projEdit.appendChild(removeProjBtn);
    removeProjBtn.addEventListener('click', () => {
        removeProject(index, item);
    });
    //button to hide/show tasks
    const hideShow = document.createElement('button');
    hideShow.textContent = "Hide/Show Tasks";
    hideShow.classList.add("remove");
    hideShow.setAttribute("id", "hideShow", + projects.indexOf(item));
    projEdit.appendChild(hideShow);
    hideShow.addEventListener('click', () => {
        hideShowTasks(index, item);
    });
    let container = document.getElementById("container");
    container.appendChild(project);
};

//function to display task projects on page
function displayProjectDivs() {
    let container = document.getElementById("container");
    let div = document.createElement("div");
    container.appendChild(div);
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
    let parentProject = document.getElementById("project" + i);
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

function hideDescription(element) {
    if (element.style.display === "none") { 
        element.style.display = "block";
    } else {element.style.display = "none";
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
    descriptionButton.addEventListener("click", () => {
        hideDescription(descriptionDiv);
        changeDescription(descriptionButton);
    })
    taskDiv.appendChild(descriptionButton);
    descriptionDiv.textContent = item.description;
    descriptionDiv.setAttribute("class", "description");
    descriptionDiv.setAttribute("id", "description" + tasks.indexOf(item));
    descriptionDiv.style.display = "none"
    taskDiv.appendChild(descriptionDiv);

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
    
    let priorityDiv = document.createElement("div");
    priorityDiv.setAttribute("class", "priorityDiv");
    taskDiv.appendChild(priorityDiv);

    let priorityLabel = document.createElement("Label");
    priorityLabel.setAttribute("for", priorityBtn);
    priorityLabel.setAttribute("class", "priorityLabel");
    priorityLabel.textContent = "Priority";
    priorityDiv.appendChild(priorityLabel);

    priorityBtn.textContent = item.priority;
    priorityBtn.classList.add("priority");
    let priorityClass = item.priority.toString();
    priorityClass = priorityClass.replace(/\s/g, '');
    priorityBtn.classList.add(priorityClass);
    priorityBtn.setAttribute("id", "priority" + tasks.indexOf(item));
    priorityDiv.appendChild(priorityBtn); 
    priorityBtn.addEventListener('click', () => {
        changePriority(item, priorityBtn);
    });

    let modifyDiv = document.createElement("div");
    modifyDiv.setAttribute("class", "modifyDiv");
    editBtn.textContent = "Edit Task";
    editBtn.setAttribute("class", "modifyTask")
    editBtn.setAttribute("id", "eTask", + tasks.indexOf(item));
    modifyDiv.appendChild(editBtn);
    editBtn.addEventListener('click', () => {
        showEditForm(item, index);
        let submitEdit = document.getElementById("submitEdit");
        submitEdit.addEventListener('click', () => {
            editTask(item, index);
            hideModal();
        })
    });
    removeBtn.textContent = "Delete Task";
    removeBtn.setAttribute("class", "modifyTask")
    removeBtn.setAttribute("id", "rTask", + tasks.indexOf(item));
    let projectDiv = findProjectDiv(item);
    modifyDiv.appendChild(removeBtn);
    removeBtn.addEventListener('click', () => {
        removeTask(item, index, projectDiv);
    });
    taskDiv.appendChild(modifyDiv);

    let parentDiv = findProjectDiv(item);
    parentDiv.appendChild(taskDiv);
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

function formDataToTask() {
    event.preventDefault();
    let id = getRandomId();
    let title = taskForm.title.value;
    let project = taskForm.inputProject.value;
    let description = taskForm.description.value;
    let dueDate = new Date(taskForm.inputDueDate.value);
    let priority = taskForm.inputPriority.value;
    let newTask = new CreateTask(id, title, project, description, dueDate, priority);
    addTaskToArray(newTask);
    taskForm.reset();
};

function addProjectToDropdown(index) {
    let inputProject = document.getElementById("inputProject");
    let option = document.createElement("option");
    option.value = projects[index];
    option.text = projects[index];
    inputProject.appendChild(option);
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
    // FOR EACH NEW USER WILL NEED TO CREATE ARRAY USING SET AFTER PROJECT ID

    let index = projects.indexOf(newProject);
    displayProject(index);
    addProjectToDropdown(index);
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
