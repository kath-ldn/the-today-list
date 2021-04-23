// *** MODULE MAKES AND DISPLAYS NEW project AND task FORMS *** //
import { priorities, newProject, formDataToTask, toggleDisplay } from './createTasks.js';

// form to add new project
//delete any classes and IDs not being used
function makeProjectForm() {
    let newProjectForm = document.createElement("form");
    newProjectForm.setAttribute("name", "newProjectForm");
    newProjectForm.setAttribute("class", "inputNewProject");
    newProjectForm.setAttribute("id", "newProjectForm");

    let inputNewProject = document.createElement("input"); 
    inputNewProject.setAttribute("type", "text");
    inputNewProject.setAttribute("name", "inputNewProject");
    inputNewProject.setAttribute("class", "inputNewProject");
    inputNewProject.setAttribute("id", "inputNewProject");
    inputNewProject.setAttribute("placeholder", "New Project Name");

    let submitProject = document.createElement("input");
    submitProject.setAttribute("type", "submit");
    submitProject.setAttribute("name", "submitProject");
    submitProject.setAttribute("class", "inputNewProject");
    submitProject.setAttribute("id", "submitProject");
    submitProject.setAttribute("class", "submit");
    submitProject.setAttribute("value", "Submit");
    submitProject.addEventListener('click', () => {
        newProject();
        toggleDisplay(newProjectForm);
        });

    document.getElementById("formsDiv").appendChild(newProjectForm);
    newProjectForm.appendChild(inputNewProject);
    newProjectForm.appendChild(submitProject);
};

//annoying workaround as closing was very glitchy
function closeTaskForm(i){
    console.log(i);
    let taskFormContainer = document.getElementById("taskFormContainer" + i);
    taskFormContainer.style.display = "none";
    let plusTask = document.getElementById("plusTask" + i);
    plusTask.style.display = "block";
};

// form to add new task
function makeTaskForm(item, index, cont) {
    let form = document.createElement("form");
    form.setAttribute("name", "taskForm");
    form.setAttribute("class", "taskForm");
    form.setAttribute("id", "taskForm" + index);

    let heading = document.createElement("h3");
    heading.setAttribute("class", "taskFormHeader");
    heading.textContent = "New Task";

    let inputTitle = document.createElement("input"); 
    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("name", "title");
    inputTitle.setAttribute("id", "title" + index);
    inputTitle.setAttribute("placeholder", "Title");

    let priorityDiv = document.createElement("div");
    priorityDiv.classList.add("taskPriorityDiv");

    let inputPriority = document.createElement("select");
    inputPriority.setAttribute("name", "inputPriority");
    inputPriority.setAttribute("id", "inputPriority" + index);
    inputPriority.setAttribute("placeholder", "Priority");

    for (let i = 0; i < priorities.length; i++) {
       let option = document.createElement("option");
       option.value = priorities[i];
       option.text = priorities[i];
       inputPriority.appendChild(option);
    };

    let inputPriorityLabel = document.createElement("Label");
    inputPriorityLabel.setAttribute("for", inputPriority);
    inputPriorityLabel.setAttribute("class", "label");
    inputPriorityLabel.textContent = "Priority";

    let inputDescription = document.createElement("textarea");
    inputDescription.setAttribute("name", "description");
    inputDescription.setAttribute("id", "description" + index);
    inputDescription.setAttribute("placeholder", "Description of task");

    let inputDueDate = document.createElement("input"); 
    inputDueDate.setAttribute("type", "date");
    inputDueDate.setAttribute("name", "inputDueDate");
    inputDueDate.setAttribute("id", "inputDueDate" + index);
    inputDueDate.setAttribute("placeholder", "Due Date");

    let submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("name", "submit");
    submit.setAttribute("id", "submit" + index);
    submit.setAttribute("class", "submit");
    submit.setAttribute("value", "Submit")
    submit.addEventListener('click', () => {
        formDataToTask(form, index, item);
        closeTaskForm(index);
        });

    let close = document.createElement("button");
    close.setAttribute("id", "close" + index);
    close.setAttribute("class", "close");
    close.textContent = "X";
    close.addEventListener('click', () => {
        event.preventDefault();
        closeTaskForm(index);
    });
    form.appendChild(close);    
    form.appendChild(heading);
    form.appendChild(inputTitle);
    form.appendChild(inputDescription);
    form.appendChild(inputDueDate);
    priorityDiv.appendChild(inputPriorityLabel);   
    priorityDiv.appendChild(inputPriority);
    form.appendChild(priorityDiv);
    form.appendChild(submit);
    cont.style.display = "none";
    cont.appendChild(form);
};


export { makeProjectForm }
export { makeTaskForm }