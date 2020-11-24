import { showEditForm } from './modal.js';
import { addLocalStorage } from './localStorage.js';
import { formatDistanceStrict } from 'date-fns'

//array to hold project categories
let categories = ["Web Development", "Yoga", "Podcast", "Life Admin"]
//array of category colors
let colors = ['#FFA987', '#586BA4', '#755B69', '#395B50']

//array to hold projects
let projects = [
    {
        "title": "Yin Yoga course",
        "category": "Yoga",
        "description": "Prepare for Yin Yoga course next year.",
        "dueDate": new Date("2021-4-21"),
        "priority": "Low"
    },
    {
        "title": "The Odin Project Full Stack Course",
        "category": "Web Development",
        "description": "Completing the TOP Full Stack Course (Javascript Stream).",
        "dueDate": new Date("2020-12-31"),
        "priority": "High"
    },
    {
        "title": "The Odin Project - Javascript Module",
        "category": "Web Development",
        "description": "Complete Javascript module of the TOP Full Stack course.",
        "dueDate": new Date("2020-12-5"),
        "priority": "Very High"
    },
    {
        "title": "Episode 2 Research",
        "category": "Podcast",
        "description": "Complete research for Episode 2 of the podcast.",
        "dueDate": new Date("2020-11-28"),
        "priority": "Low"
    },
    {
        "title": "Self Employed Taxes",
        "category": "Life Admin",
        "description": "Complete tax payments  bef",
        "dueDate": new Date("2021-1-21"),
        "priority": "Medium"
    },
    {
        "title": "Complete Episode 1",
        "category": "Podcast",
        "description": "Complete recording/editing of Episode 1.",
        "dueDate": new Date("2020-12-01"),
        "priority": "Low"
    },
];

//array to hold priority levels
let priorities = ["Very-Low", "Low", "Medium", "High", "Very-High"];

//construtor to create project objects
function CreateProject(title, category, description, dueDate, priority) {
    this.title = title,
    this.category = category,
    this.description = description,
    this.dueDate = dueDate,
    this.priority = priority
    };

// function to delete category
function removeCategory(index, category){
    //removes Divs
    let parentDiv = document.getElementById("container");
    //use remove button id
    let categoryDiv = document.getElementById("category" + index);
    parentDiv.removeChild(categoryDiv);
    // removes from object
    categories.splice(categories.indexOf(category), 1);
    addLocalStorage(categories);
};

// function to show/hide projects
function hideShowProjects(index, category){
    let categoryDiv = document.getElementById("category" + index);
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].category === category) {
    let x = document.getElementById("project" + i)
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
    }
}

//function to display project categories on page
function displayCategoryDivs() {
let container = document.getElementById("container");
let div = document.createElement("div");
container.appendChild(div);
    for(let i = 0; i < categories.length; i++) {
        let category = document.createElement("div");
        category.setAttribute("class", "category");        
        category.setAttribute("id", "category" + i);
        category.textContent = categories[i];
        category.style.backgroundColor = colors[i];

        //button to remove categories
        const removeCatBtn = document.createElement('button');
        removeCatBtn.textContent = "Delete";
        removeCatBtn.classList.add("remove");
        let item = categories[i];
        let index = i;
        removeCatBtn.setAttribute("id", "rCat", + categories.indexOf(item));
        category.appendChild(removeCatBtn);
        removeCatBtn.addEventListener('click', () => {
        removeCategory(index, item);
        });

    
        //button to hide/show projects
        const hideShow = document.createElement('button');
        hideShow.textContent = "Hide/Show projects";
        hideShow.classList.add("remove");
        hideShow.setAttribute("id", "hideShow", + categories.indexOf(item));
        category.appendChild(hideShow);
        hideShow.addEventListener('click', () => {
            hideShowProjects(index, item);
        });

        container.appendChild(category);

    }
}

//finds place of project category in category array
function findCategory(object) {
    let assignedCategory = categories.indexOf(object.category);
    return assignedCategory;
};

//finds correct category div for project div
function findCategoryDiv(object) {
    let i = findCategory(object);
    let parentCategory = document.getElementById("category" + i);
    return parentCategory;
};

//item = object  and index = original index (id)
function removeProject(item, index, categoryDiv) {
    //removes Divs
    let parentDiv = categoryDiv;
    //use remove button id
    let projectDiv = document.getElementById("project" + index);
    parentDiv.removeChild(projectDiv);
    // removes from object
    projects.splice(projects.indexOf(item), 1);
    addLocalStorage(projects);
};

function editProjectObject(objectLoc){
    let editForm = document.getElementById("editForm");
    let originalPriority = projects[objectLoc].priority;

    if (editForm.editTitle.value !== "") {
    projects[objectLoc].title = editForm.editTitle.value;
    }

    // projects[objectLoc].category = editForm.editCategory.value;
    
    if (editForm.editDescription.value !== "") {
    projects[objectLoc].description = editForm.editDescription.value;
    }

    projects[objectLoc].dueDate = editForm.editDueDate.value;
    
    projects[objectLoc].priority = editForm.editPriority.value;

    addLocalStorage(projects);
    event.preventDefault();
    //editForm.reset();
}


function editProjectDivs(item, index, objectLoc){
    let editTitle = document.getElementById("title" + index);
    editTitle.textContent = projects[objectLoc].title;

    let editdescription = document.getElementById("description" + index);
    editdescription.textContent = projects[objectLoc].description;

    let editDueDate = document.getElementById("dueDate" + index);
    editDueDate.textContent = projects[objectLoc].dueDate;

    let editPriority = document.getElementById("priority" + index);
    editPriority.textContent = projects[objectLoc].priority;
    editPriority.setAttribute("class", item.priority);
}

function editProject(item, index) {
    let objectLoc = projects.indexOf(item);
    event.preventDefault();
    editProjectObject(objectLoc);
    editProjectDivs(item, index, objectLoc);
}

function changePriority(item, priorityBtn) {
    let priorityIndex = priorities.indexOf(item.priority);
    if(priorityIndex === 4) {
     priorityBtn.textContent = priorities[0];
     item.priority = priorities[0];
     priorityBtn.setAttribute("class", priorities[0]);
     addLocalStorage(projects);
    } else {
     let newIndex = priorities[priorityIndex + 1];
     priorityBtn.textContent = newIndex; 
     priorityBtn.setAttribute("class", newIndex)
     item.priority = newIndex;
     addLocalStorage(projects); 
    }
 };

//creates divs for new projects
function makeProjectDivs(item) {
    let container = document.getElementById("container");
    const projectDiv = document.createElement("div");
    const titleDiv = document.createElement("div");
    const descriptionButton = document.createElement("button");    
    const descriptionDiv = document.createElement("div");
    const dueDateDiv = document.createElement("div");
    const helpfulDateDiv = document.createElement("div");
    const priorityBtn = document.createElement("button");
    const removeBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    let index = projects.indexOf(item);

    projectDiv.classList.add("project");
    //projectDiv.classList.add(categories.indexOf(item.category));
    projectDiv.setAttribute("id", "project" + projects.indexOf(item));

    titleDiv.textContent = item.title;
    titleDiv.setAttribute("id", "title" + projects.indexOf(item));
    titleDiv.classList.add("title");
    projectDiv.appendChild(titleDiv);

    function hideDescription(element) {
        if (element.style.display === "none") { 
            element.style.display = "block";
        } else {element.style.display = "none";
        } 
    }

    function changeDescription() {
        if (descriptionButton.textContent === "Show Description") { 
            descriptionButton.textContent = "Hide Description";
        } else { descriptionButton.textContent = "Show Description";
        } 
    }

    descriptionButton.textContent = "Show Description";
    descriptionButton.setAttribute("id", "descriptionButton" + index);
    descriptionButton.addEventListener("click", () => {
        hideDescription(descriptionDiv);
        changeDescription();
    })
    projectDiv.appendChild(descriptionButton);

    descriptionDiv.textContent = item.description;
    descriptionDiv.classList.add("description");
    descriptionDiv.setAttribute("id", "description" + projects.indexOf(item));
    descriptionDiv.style.display = "none"
    projectDiv.appendChild(descriptionDiv);

    dueDateDiv.textContent = item.dueDate.toDateString();
    dueDateDiv.setAttribute("id", "dueDate" + projects.indexOf(item));
    dueDateDiv.classList.add("dueDate");
    projectDiv.appendChild(dueDateDiv);

    let currentDate = new Date();
    let helpfulDate = formatDistanceStrict(item.dueDate, currentDate);
    helpfulDateDiv.textContent = "In " + helpfulDate;
    dueDateDiv.classList.add("dueDate");
    projectDiv.appendChild(helpfulDateDiv);

    priorityBtn.textContent = item.priority;
    priorityBtn.classList.add("priority");
    priorityBtn.setAttribute("class", item.priority);
    priorityBtn.setAttribute("id", "priority" + projects.indexOf(item));
    projectDiv.appendChild(priorityBtn); 


    priorityBtn.addEventListener('click', () => {
        changePriority(item, priorityBtn);
        });

    removeBtn.textContent = "Delete";
    removeBtn.classList.add("remove");
    removeBtn.setAttribute("id", "rProject", + projects.indexOf(item));
    let categoryDiv = findCategoryDiv(item);
    projectDiv.appendChild(removeBtn);
    removeBtn.addEventListener('click', () => {
        removeProject(item, index, categoryDiv);
            });

    editBtn.textContent = "Edit";
    editBtn.classList.add("edit");
    editBtn.setAttribute("id", "eProject", + projects.indexOf(item));
    projectDiv.appendChild(editBtn);
    editBtn.addEventListener('click', () => {
        showEditForm(item, index);
        let submitEdit = document.getElementById("submitEdit");
        submitEdit.addEventListener('click', () => {
            editProject(item, index);
            hideModal();
        })
    });

    let parentDiv = findCategoryDiv(item);
    parentDiv.appendChild(projectDiv);

}

function hideModal() {
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
}

//loops through projects array and create divs for each project
function displayAllProjects() {
    for (let i=0; i < projects.length; i++) {
        makeProjectDivs(projects[i]);
    }
}

function displayNewProject(newProject) {
        makeProjectDivs(newProject);
}

function addProjectToArray(newProject) {
    projects.push(newProject);
    addLocalStorage(projects);
    displayNewProject(newProject);
};

function formDataToProject() {
    let title = projectForm.title.value;
    let category = projectForm.inputCategory.value;
    let description = projectForm.description.value;
    let dueDate = projectForm.inputDueDate.value;
    let priority = projectForm.inputPriority.value;
    event.preventDefault();
    let newProject = new CreateProject(title, category, description, dueDate, priority);
    addProjectToArray(newProject);
    projectForm.reset();
};

function addCategoryToDropdown(index) {
    let inputCategory = document.getElementById("inputCategory");
    let option = document.createElement("option");
    option.value = categories[index];
    option.text = categories[index];
    inputCategory.appendChild(option);
};

function addNewCategory(index) {
    let category = document.createElement("div");
    category.setAttribute("class", "category");        
    category.setAttribute("id", "category" + index);
    category.textContent = categories[index];
    container.appendChild(category);
};

function newCategory() {
    let newCategory = newCategoryForm.inputNewCategory.value;
    if (categories.includes(newCategory)){
        let message = "Oops! Looks like that already exists";
        alert(message);
        event.preventDefault();
    } else {
    event.preventDefault();
    categories.push(newCategory);
    addLocalStorage(categories);
    let index = categories.indexOf(newCategory);
    addNewCategory(index);
    addCategoryToDropdown(index);
    };
}

export { categories }
export { projects }
export { priorities }
export { CreateProject }
export { displayCategoryDivs }
export { findCategory }
export { findCategoryDiv }
export { makeProjectDivs }
export { addProjectToArray }
export { displayAllProjects }
export { formDataToProject }
export { removeProject }
export { newCategory }
export { editProject }
