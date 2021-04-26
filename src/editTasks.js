import { getHelpfulDate, priorities } from './addRmvTasks.js';
import { tasks, currentTaskIndex, currentTaskDiv } from './projectData';
import firebase from "firebase/app";
import { db } from './index.js';

/* Edits task in array and updates Firebase */
function editTaskObject(task){
    let editForm = document.getElementById("editForm");
    if (editForm.editTitle.value !== "") {
        task.title = editForm.editTitle.value;
    };
    if (editForm.editDescription.value !== "") {
        task.description = editForm.editDescription.value;
    };
    if (editForm.editDueDate.value !== "") {
        task.dueDate = new Date(editForm.editDueDate.value);
    } else {
        let date = new Date(task.dueDate)
        task.dueDate = date;
    }
    task.priority = editForm.editTaskPriority.value;
    
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
            console.error("Error editing task: ", error);
        });
    }
    
    event.preventDefault();
    editForm.reset();
};

/* Edits task elements on page - index here refers to original DIV id/index */
function editTaskElement(identi, index, item){
    let element = document.getElementById(identi + index);
    element.textContent = item[identi];
};

function editDate(index, item){
    let editDueDate = document.getElementById("dueDate" + index);
    let helpfulDateDiv = document.getElementById("helpfulDateDiv" + index);
    let newdueDate = new Date(item.dueDate);
    editDueDate.textContent = newdueDate.toDateString();
    let helpfulDate = getHelpfulDate(newdueDate);
    helpfulDateDiv.textContent = helpfulDate[0];
    helpfulDateDiv.setAttribute("class", helpfulDate[1]);  
};

function updatePriorityClass(item, index){
    let priorityClass = item.priority.toString();
    priorityClass = priorityClass.replace(/\s/g, '');
    let editPriorityDiv = document.getElementById("priority" + index)
    editPriorityDiv.setAttribute("class", priorityClass);
    editPriorityDiv.classList.add("priority");
};

function editTaskDivs(item, index){
    editTaskElement("title", index, item);
    editTaskElement("description", index, item);
    editDate(index, item);
    editTaskElement("priority", index, item);
    updatePriorityClass(item, index, item);
};

function hideModal() {
    let modal = document.getElementById("editTaskModal");
    modal.style.display = "none";
};

function editTask(event) {
    event.preventDefault();
    let divID = currentTaskDiv;
    let index = currentTaskIndex;
    let item = tasks[index];
    editTaskObject(item);
    editTaskDivs(item, divID);
    hideModal();
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
            console.error("Error updating priority: ", error);
        });
    }
};

function changePriority(item, priorityBtn) {
    let priorityIndex = priorities.indexOf(item.priority);
    if(priorityIndex === 4) {
        item.priority = priorities[0];
        priorityBtn.setAttribute("class", priorities[0]);
        priorityBtn.textContent = priorities[0];
    } else {
        let newIndex = priorities[priorityIndex + 1];
        priorityBtn.setAttribute("class", newIndex)
        item.priority = newIndex;
        priorityBtn.textContent = newIndex; 
    }
    priorityBtn.classList.add("priority");
    updatePriority(item);
 };

 export { editTask, changePriority }