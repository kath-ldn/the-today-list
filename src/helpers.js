import { projects, tasks } from './projectData'

function toggleDisplay(element){
    (element.style.display === "none") ? element.style.display = "block" : element.style.display = "none";
};

function toggleFlexForm(button, form){
    if(button.style.display === "none"){
        button.style.display = "block";
        form.style.display = "none";
    } else{
        button.style.display = "none"
        form.style.display = "flex";
    }
};

function findProject(object) {
    let assignedProject = projects.indexOf(object.project);
    return assignedProject;
};

function findProjectDiv(object) {
    let i = findProject(object);
    let parentProject = document.getElementById("taskContainer" + i);
    return parentProject;
};

export { toggleDisplay, toggleFlexForm, findProject, findProjectDiv }