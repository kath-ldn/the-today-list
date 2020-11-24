//function to make and display form on page
import { formDataToProject } from './projects.js';
import { priorities } from './projects.js';
import { newCategory } from './projects.js';
import { categories } from './projects.js';

function makeCategoryForm() {
    let newCategoryForm = document.createElement("form");
    newCategoryForm.setAttribute("name", "newCategoryForm");
    newCategoryForm.setAttribute("class", "inputNewCategory");
    newCategoryForm.setAttribute("id", "newCategoryForm");

    let inputNewCategory = document.createElement("input"); 
    inputNewCategory.setAttribute("type", "text");
    inputNewCategory.setAttribute("name", "inputNewCategory");
    inputNewCategory.setAttribute("class", "inputNewCategory");
    inputNewCategory.setAttribute("id", "inputNewCategory");
    inputNewCategory.setAttribute("placeholder", "New Category Name");

    let submitCategory = document.createElement("input");
    submitCategory.setAttribute("type", "submit");
    submitCategory.setAttribute("name", "submitCategory");
    submitCategory.setAttribute("class", "inputNewCategory");
    submitCategory.setAttribute("id", "submitCategory");
    submitCategory.setAttribute("value", "Submit");
    submitCategory.addEventListener('click', () => {
        newCategory();
        });

    document.getElementById("formsDiv").appendChild(newCategoryForm);
    newCategoryForm.appendChild(inputNewCategory);
    newCategoryForm.appendChild(submitCategory);
    
};

function makeProjectForm() {
    let form = document.createElement("form");
    form.setAttribute("name", "projectForm");
    form.setAttribute("class", "projectForm");
    form.setAttribute("id", "projectForm");
    //form.setAttribute("method", "post");
    //form.setAttribute("action", "submit.php");
    //check whether removing name or ID changes functionality - not sure which works!

    let inputTitle = document.createElement("input"); //input element,text. TITLE
    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("name", "title");
    inputTitle.setAttribute("class", "projectForm");
    inputTitle.setAttribute("id", "title");
    inputTitle.setAttribute("placeholder", "Title");

    // Input Category Dropdown
    let inputCategory = document.createElement("select"); //input element,text. TITLE
    inputCategory.setAttribute("name", "inputCategory");
    inputCategory.setAttribute("id", "inputCategory");
    inputCategory.setAttribute("class", "projectForm");
    inputCategory.setAttribute("placeholder", "Project Category");

    for (let i = 0; i < categories.length; i++) {
        let option = document.createElement("option");
        option.value = categories[i];
        option.text = categories[i];
        inputCategory.appendChild(option);
     };

     let inputCategoryLabel = document.createElement("Label");
     inputCategoryLabel.setAttribute("for", inputCategory);
     inputCategoryLabel.setAttribute("class", "projectForm");
     inputCategoryLabel.textContent = "Project Category";

     //Input Priority Dropdown
    let inputPriority = document.createElement("select");
    inputPriority.setAttribute("name", "inputPriority");
    inputPriority.setAttribute("id", "inputPriority");
    inputPriority.setAttribute("class", "projectForm");
    inputPriority.setAttribute("placeholder", "Priority");
    // add label

    for (let i = 0; i < priorities.length; i++) {
       let option = document.createElement("option");
       option.value = priorities[i];
       option.text = priorities[i];
       inputPriority.appendChild(option);
    };

    let inputPriorityLabel = document.createElement("Label");
    inputPriorityLabel.setAttribute("for", inputPriority);
    inputPriorityLabel.setAttribute("class", "projectForm");
    inputPriorityLabel.textContent = "Project Priority";

    let inputDescription = document.createElement("input"); //input element,text. DESCRIPTION
    inputDescription.setAttribute("type", "text");
    inputDescription.setAttribute("name", "description");
    inputDescription.setAttribute("class", "projectForm");
    inputDescription.setAttribute("id", "description");
    inputDescription.setAttribute("placeholder", "Description");

    let inputDueDate = document.createElement("input"); //input element,date. DUE DATE
    inputDueDate.setAttribute("type", "date");
    inputDueDate.setAttribute("name", "inputDueDate");
    inputDueDate.setAttribute("id", "inputDueDate");
    inputDueDate.setAttribute("class", "projectForm");
    inputDueDate.setAttribute("placeholder", "Due Date");

    let submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("name", "submit");
    submit.setAttribute("id", "submit");
    submit.setAttribute("class", "projectForm");
    submit.setAttribute("value", "Submit")
    submit.addEventListener('click', () => {
        formDataToProject();
        });
    form.appendChild(inputTitle);
    form.appendChild(inputCategoryLabel);
    form.appendChild(inputCategory);
    form.appendChild(inputDescription);
    form.appendChild(inputDueDate);
    form.appendChild(inputPriorityLabel);   
    form.appendChild(inputPriority);
    form.appendChild(submit)

    //add more input elements
    //ensure submit button works

    document.getElementById("formsDiv").appendChild(form);
};


export { makeCategoryForm }
export { makeProjectForm }