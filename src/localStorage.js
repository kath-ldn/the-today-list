// *** MODULE HANDLES LOCAL STORAGE *** //
import { projects } from './createTasks.js';
import { tasks } from './createTasks.js';
import { displayAllTasks } from './createTasks.js';
import { displayProjectDivs } from './createTasks.js';

//stores data locally
function addLocalStorage(element) {
    if (element === projects) {
        localStorage.setItem('projects', JSON.stringify(projects));
    }
    if (element === tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));       
    }
};

//restores projects from local library
function restoreProjects() {
    if(!localStorage.projects) {
        displayProjectDivs();
    } else {
        let getProjects = localStorage.getItem('projects');
        getProjects = JSON.parse(getProjects);
        projects = getProjects; 
        displayProjectDivs();
    }
};

//function ensures compatability with stored and displayed dates
function fixDates(){
    for (let i=0; i < tasks.length; i++) {
        tasks[i].dueDate = new Date(tasks[i].dueDate);
    }
};

//function restores tasks from LS
function restoreTasks() {
    if(!localStorage.tasks) {
        displayAllTasks();
    } else {
        let getTasks = localStorage.getItem('tasks');
        getTasks = JSON.parse(getTasks);
        tasks = getTasks;
        fixDates();
        displayAllTasks();
    };
};

//function to handle all local storage restoration
function restoreData() {
    restoreProjects();
    restoreTasks();
}

export { addLocalStorage }
export { restoreData }
export { tasks }
export { projects }