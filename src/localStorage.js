import { categories } from './projects.js';
import { projects } from './projects.js';
import { displayAllProjects } from './projects.js';
import { displayCategoryDivs } from './projects.js';

//stores library locally
function addLocalStorage(element) {
    if (element === categories) {
    localStorage.setItem('categories', JSON.stringify(categories));
    }
    
    if (element === projects) {
    localStorage.setItem('projects', JSON.stringify(projects));       
    }
}

function restoreCategories() {
    if(!localStorage.categories) {
    displayCategoryDivs();
    } else {
    let getCategories = localStorage.getItem('categories');
    getCategories = JSON.parse(getCategories);
    categories = getCategories; 
    displayCategoryDivs();
}
}

function fixDates(){
    for (let i=0; i < projects.length; i++) {
        projects[i].dueDate = new Date(projects[i].dueDate);
    }
}

function restoreProjects() {
    if(!localStorage.projects) {
    displayAllProjects();
    } else {
    let getProjects = localStorage.getItem('projects');
    getProjects = JSON.parse(getProjects);
    projects = getProjects;
    fixDates();
    displayAllProjects();
}
}

function restoreData() {
    restoreCategories();
    restoreProjects();
}


export { addLocalStorage }
export { restoreData }
export { projects }
export { categories }