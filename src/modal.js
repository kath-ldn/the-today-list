import { priorities } from './projects.js';
import { categories } from './projects.js';

function editEditFormContent(item){
    let editTitle = document.getElementById("editTitle");
    editTitle.setAttribute("placeholder", item.title);

    let editDescription = document.getElementById("editDescription");
    editDescription.setAttribute("placeholder", item.description);

    let editDueDate = document.getElementById("editDueDate");

    let editPriority = document.getElementById("editPriority");

}

function showEditForm(item, index){
    // Get the modal
    let modal = document.getElementById("myModal");
    let modalContent = document.getElementById("modal-content");
    let modalSpan = document.getElementById("closeModal");

    editEditFormContent(item);

    // When the user clicks on the button, open the modal
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    modalSpan.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none";
  }
}
}

function editProjectModal(item, index){
    let editFormModal = document.createElement("div");
    editFormModal.setAttribute("class", "modal");
    editFormModal.setAttribute("id", "myModal");

    let modalContent = document.createElement("div");
    modalContent.setAttribute("id", "modal-content");

    let modalHeader = document.createElement("div");
    modalHeader.setAttribute("id", "modalHeader");

    let closeModal = document.createElement("button");
    closeModal.setAttribute("id", "closeModal");
    closeModal.textContent = "x"; 

    let modalHeaderText = document.createElement("h2");
    modalHeaderText.setAttribute("id", "modalHeaderText");
    modalHeaderText.textContent = "Edit Project"; 

    let modalBody = document.createElement("div");
    modalBody.setAttribute("id", "modalBody");

    // creates the actual form
    let editForm = document.createElement("form");
    editForm.setAttribute("id", "editForm");
    editForm.setAttribute("name", "editForm");
    editForm.setAttribute("class", "editForm");

    let editTitle = document.createElement("input"); //input element,text. TITLE
    editTitle.setAttribute("type", "text");
    editTitle.setAttribute("name", "editTitle");
    editTitle.setAttribute("class", "editForm");
    editTitle.setAttribute("id", "editTitle");
    editTitle.setAttribute("placeholder", "Edit Title");

    // Input Category Dropdown
    /* let editCategory = document.createElement("select"); //input element,text. TITLE
    editCategory.setAttribute("name", "editCategory");
    editCategory.setAttribute("id", "editCategory");
    editCategory.setAttribute("class", "editForm");
    editCategory.setAttribute("placeholder", "Edit Category");

    for (let i = 0; i < categories.length; i++) {
        let option = document.createElement("option");
        option.value = categories[i];
        option.text = categories[i];
        editCategory.appendChild(option);
        };

    let editCategoryLabel = document.createElement("Label");
    editCategoryLabel.setAttribute("for", editCategory);
    editCategoryLabel.setAttribute("class", "editForm");
    editCategoryLabel.textContent = "Edit Category";
    */

    //Input Priority Dropdown
    let editPriority = document.createElement("select");
    editPriority.setAttribute("name", "editPriority");
    editPriority.setAttribute("id", "editPriority");
    editPriority.setAttribute("class", "editForm");
    editPriority.setAttribute("placeholder", "Edit Priority");
        // add label

    for (let i = 0; i < priorities.length; i++) {
        let option = document.createElement("option");
        option.value = priorities[i];
        option.text = priorities[i];
        editPriority.appendChild(option);
        };

    let editPriorityLabel = document.createElement("Label");
    editPriorityLabel.setAttribute("for", editPriority);
    editPriorityLabel.setAttribute("class", "editForm");
    editPriorityLabel.textContent = "Edit Priority";

    let editDescription = document.createElement("input"); //input element,text. DESCRIPTION
    editDescription.setAttribute("type", "text");
    editDescription.setAttribute("name", "editDescription");
    editDescription.setAttribute("class", "editForm");
    editDescription.setAttribute("id", "editDescription");
    editDescription.setAttribute("placeholder", "Edit Description");

    let editDueDate = document.createElement("input"); //input element,date. DUE DATE
    editDueDate.setAttribute("type", "date");
    editDueDate.setAttribute("name", "editDueDate");
    editDueDate.setAttribute("id", "editDueDate");
    editDueDate.setAttribute("class", "editForm");
    editDueDate.setAttribute("placeholder", "Due Date");

    let submitEdit = document.createElement("input");
    submitEdit.setAttribute("type", "submit");
    submitEdit.setAttribute("name", "submitEdit");
    submitEdit.setAttribute("id", "submitEdit");
    submitEdit.setAttribute("class", "editForm");
    submitEdit.setAttribute("value", "Submit")

    editForm.appendChild(editTitle);
    //editForm.appendChild(editCategoryLabel);
    //editForm.appendChild(editCategory);
    editForm.appendChild(editDescription);
    editForm.appendChild(editDueDate);
    editForm.appendChild(editPriorityLabel);   
    editForm.appendChild(editPriority);
    editForm.appendChild(submitEdit)
    //need to append form

    let modalFooter = document.createElement("div");
    modalFooter.setAttribute("id", "modalFooter");

    let modalFooterText = document.createElement("h3");
    modalFooterText.setAttribute("id", "modalFooterText");
    modalFooterText.textContent = "Footer"; 

    editFormModal.appendChild(modalContent);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(closeModal);
    modalContent.appendChild(modalHeaderText);
    modalContent.appendChild(modalBody);
    modalBody.appendChild(editForm);
    modalContent.appendChild(modalFooter);
    modalFooter.appendChild(modalFooterText);

    document.getElementById("container").appendChild(editFormModal);

}

export { showEditForm }
export { editProjectModal }