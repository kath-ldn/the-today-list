import { getHelpfulDate, priorities } from './createTasks.js';
import { tasks } from './projectData';
import firebase from "firebase/app";
import { db } from './index.js';

//refactor this - when remove global object stored here, will remove lots of this code
function editTaskObject(objectLoc){
    let editForm = document.getElementById("editForm");
    let task = tasks[objectLoc];
    if (editForm.editTitle.value !== "") {
        task.title = editForm.editTitle.value;
    };
    if (editForm.editDescription.value !== "") {
        task.description = editForm.editDescription.value;
    };
    if (editForm.editDueDate.value !== "") {
        task.dueDate = new Date(editForm.editDueDate.value);
    } else {
        let date = new Date(tasks[objectLoc].dueDate)
        task.dueDate = date;
    }
    task.priority = editForm.editPriority.value;
    
    let user = firebase.auth().currentUser;
    let uid;
    if(user != null){
        uid = user.uid;
        db.collection("users").doc(uid).collection('tasks').doc(task.id).update({
            "title": task.title,
            "description": task.description,
            "dueDate": task.dueDate,
            "priority": task.priority
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
    
    event.preventDefault();
    editForm.reset();
};

function editTaskDivs(item, index, objectLoc){
    let editTitle = document.getElementById("title" + index);
    editTitle.textContent = tasks[objectLoc].title;
    let editdescription = document.getElementById("description" + index);
    editdescription.textContent = tasks[objectLoc].description;
    let editDueDate = document.getElementById("dueDate" + index);
    let newdueDate = new Date(tasks[objectLoc].dueDate);
    editDueDate.textContent = newdueDate.toDateString();
    let helpfulDateDiv = document.getElementById("helpfulDateDiv" + index);
    let helpfulDate = getHelpfulDate(newdueDate);
    helpfulDateDiv.textContent = helpfulDate[0];
    helpfulDateDiv.setAttribute("class", helpfulDate[1]);  
    let editPriority = document.getElementById("priority" + index);
    editPriority.textContent = tasks[objectLoc].priority;
    let priorityClass = item.priority.toString();
    priorityClass = priorityClass.replace(/\s/g, '');
    editPriority.setAttribute("class", priorityClass);
    editPriority.classList.add("priority");
};

function editTask(item, index) {
    let objectLoc = tasks.indexOf(item);
    event.preventDefault();
    editTaskObject(objectLoc);
    editTaskDivs(item, index, objectLoc);
};

function updatePriority(task){
    let user = firebase.auth().currentUser;
    let uid;
    if(user != null){
        uid = user.uid;
        db.collection("users").doc(uid).collection('tasks').doc(task.id).update({
            "priority": task.priority
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
}

function changePriority(item, priorityBtn) {
    let priorityIndex = priorities.indexOf(item.priority);
    if(priorityIndex === 4) {
        item.priority = priorities[0];
        priorityBtn.setAttribute("class", priorities[0]);
        priorityBtn.classList.add("priority");
        updatePriority(item);
        priorityBtn.textContent = priorities[0];
    } else {
        let newIndex = priorities[priorityIndex + 1];
        priorityBtn.setAttribute("class", newIndex)
        priorityBtn.classList.add("priority");
        item.priority = newIndex;
        updatePriority(item);
        priorityBtn.textContent = newIndex; 
    }
 };

 export { editTask, changePriority }