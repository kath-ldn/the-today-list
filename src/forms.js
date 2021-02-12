// *** MODULE MAKES AND DISPLAYS NEW project AND task FORMS *** //
import { priorities } from './createTasks.js';
import { newProject } from './createTasks.js';
import { projects } from './createTasks.js';
import { formDataToTask } from './createTasks.js';

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
        });

    document.getElementById("formsDiv").appendChild(newProjectForm);
    newProjectForm.appendChild(inputNewProject);
    newProjectForm.appendChild(submitProject);
};

// form to add new task
function makeTaskForm() {
    let form = document.createElement("form");
    form.setAttribute("name", "taskForm");
    form.setAttribute("class", "taskForm");
    form.setAttribute("id", "taskForm");

    let inputTitle = document.createElement("input"); 
    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("name", "title");
    inputTitle.setAttribute("class", "taskForm");
    inputTitle.setAttribute("id", "title");
    inputTitle.setAttribute("placeholder", "Title");

    let inputProject = document.createElement("select");
    inputProject.setAttribute("name", "inputProject");
    inputProject.setAttribute("id", "inputProject");
    inputProject.setAttribute("class", "taskForm");
    inputProject.setAttribute("placeholder", "Project");

    for (let i = 0; i < projects.length; i++) {
        let option = document.createElement("option");
        option.value = projects[i];
        option.text = projects[i];
        inputProject.appendChild(option);
     };

     let inputProjectLabel = document.createElement("Label");
     inputProjectLabel.setAttribute("for", inputProject);
     inputProjectLabel.setAttribute("class", "taskForm");
     inputProjectLabel.textContent = "Project";

    let inputPriority = document.createElement("select");
    inputPriority.setAttribute("name", "inputPriority");
    inputPriority.setAttribute("id", "inputPriority");
    inputPriority.setAttribute("class", "taskForm");
    inputPriority.setAttribute("placeholder", "Priority");

    for (let i = 0; i < priorities.length; i++) {
       let option = document.createElement("option");
       option.value = priorities[i];
       option.text = priorities[i];
       inputPriority.appendChild(option);
    };

    let inputPriorityLabel = document.createElement("Label");
    inputPriorityLabel.setAttribute("for", inputPriority);
    inputPriorityLabel.setAttribute("class", "taskForm");
    inputPriorityLabel.setAttribute("class", "label");
    inputPriorityLabel.textContent = "Task Priority";

    let inputDescription = document.createElement("input");
    inputDescription.setAttribute("type", "text");
    inputDescription.setAttribute("name", "description");
    inputDescription.setAttribute("class", "taskForm");
    inputDescription.setAttribute("id", "description");
    inputDescription.setAttribute("placeholder", "Description");

    let inputDueDate = document.createElement("input"); 
    inputDueDate.setAttribute("type", "date");
    inputDueDate.setAttribute("name", "inputDueDate");
    inputDueDate.setAttribute("id", "inputDueDate");
    inputDueDate.setAttribute("class", "taskForm");
    inputDueDate.setAttribute("placeholder", "Due Date");

    let submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("name", "submit");
    submit.setAttribute("id", "submit");
    submit.setAttribute("class", "taskForm");
    submit.setAttribute("class", "submit");
    submit.setAttribute("value", "Submit")
    submit.addEventListener('click', () => {
        formDataToTask();
        });
    form.appendChild(inputTitle);
    form.appendChild(inputProjectLabel);
    form.appendChild(inputProject);
    form.appendChild(inputDescription);
    form.appendChild(inputDueDate);
    form.appendChild(inputPriorityLabel);   
    form.appendChild(inputPriority);
    form.appendChild(submit)

    document.getElementById("formsDiv").appendChild(form);
};


export { makeProjectForm }
export { makeTaskForm }