import { addLocalStorage } from './localStorage.js';
import { getHelpfulDate, priorities } from './createTasks.js';
import { projects, tasks } from './projectSampleData';

function editTaskObject(objectLoc){
    let editForm = document.getElementById("editForm");
    if (editForm.editTitle.value !== "") {
        tasks[objectLoc].title = editForm.editTitle.value;
    };
    if (editForm.editDescription.value !== "") {
        tasks[objectLoc].description = editForm.editDescription.value;
    };
    if (editForm.editDueDate.value !== "") {
        tasks[objectLoc].dueDate = editForm.editDueDate.value;
    } else {
        let date = new Date(tasks[objectLoc].dueDate)
        tasks[objectLoc].dueDate = date.toDateString()
    }
    tasks[objectLoc].priority = editForm.editPriority.value;
    addLocalStorage(tasks);
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

function changePriority(item, priorityBtn) {
    let priorityIndex = priorities.indexOf(item.priority);
    if(priorityIndex === 4) {
        priorityBtn.textContent = priorities[0];
        item.priority = priorities[0];
        priorityBtn.setAttribute("class", priorities[0]);
        priorityBtn.classList.add("priority");
        addLocalStorage(tasks);
    } else {
        let newIndex = priorities[priorityIndex + 1];
        priorityBtn.textContent = newIndex; 
        priorityBtn.setAttribute("class", newIndex)
        priorityBtn.classList.add("priority");
        item.priority = newIndex;
        addLocalStorage(tasks); 
    }
 };

 export { editTask, changePriority }