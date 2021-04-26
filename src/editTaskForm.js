import { priorities } from './addRmvTasks.js';
import { editTask } from './editTasks';

//reformats date to pre-fill the modal
function formatDate(date) {
    let temp = new Date(date);
    let month = (temp.getMonth() + 1).toString();
    let day = (temp.getDate()).toString();
    let year = temp.getFullYear();
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    return [year, month, day].join('-');
};

/*Creates the edit task form */
function editFormContent(item){
    let editTitle = document.getElementById("editTitle");
    editTitle.value = item.title;
    let editDescription = document.getElementById("editDescription");
    editDescription.value = item.description;
    let editDueDate = document.getElementById("editDueDate");
    let date = item.dueDate;
    let displayDate = formatDate(date);
    editDueDate.value = displayDate;
    let editPriority = document.getElementById("editTaskPriority");
    editPriority.value = item.priority;
};

function showEditForm(item){
    let modal = document.getElementById("editTaskModal");
    let modalSpan = document.getElementById("closeModal");
    editFormContent(item);
    modal.style.display = "block";
    modalSpan.onclick = function() {
        modal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        };
    };
};

function createModalDiv(identi, className){
    let div = document.createElement("div");
    div.setAttribute("id", identi)
    if(className != "none"){
        div.setAttribute("class", className);
    };
    return div;
};

function createCloseModal(){
    let closeModal = document.createElement("button");
    closeModal.setAttribute("id", "closeModal");
    closeModal.textContent = "x";
    return closeModal;
};

function createModalHeaderText(){
    let modalHeaderText = document.createElement("h2");
    modalHeaderText.setAttribute("id", "modalHeaderText");
    modalHeaderText.textContent = "Edit Task"; 
    return modalHeaderText;
};

function createEditTaskForm(){
    let editForm = document.createElement("form");
    editForm.setAttribute("id", "editForm");
    editForm.setAttribute("name", "editForm");
    return editForm;
};

function createFormElement(name, className, type, placeholder){
    let element = document.createElement("input");
    element.setAttribute("type", type);
    element.setAttribute("name", name);
    element.setAttribute("class", className);
    element.setAttribute("id", name);
    if(placeholder != 'none'){
        element.setAttribute("placeholder", placeholder);
    };
    return element;
};

function createPriorityList(){
    let editPriorityDiv = document.createElement("div");
    editPriorityDiv.setAttribute("id", "editPriorityDiv");
    let editTaskPriority = document.createElement("select");
    editTaskPriority.setAttribute("name", "editTaskPriority");
    editTaskPriority.setAttribute("id", "editTaskPriority");
    editTaskPriority.setAttribute("class", "editFormInput");
    for (let i = 0; i < priorities.length; i++) {
        let option = document.createElement("option");
        option.value = priorities[i];
        option.text = priorities[i];
        editTaskPriority.appendChild(option);
    };
    let editPriorityLabel = document.createElement("Label");
    editPriorityLabel.setAttribute("for", editTaskPriority);
    editPriorityLabel.setAttribute("class", "editFormInput");
    editPriorityLabel.setAttribute("id", "editPriorityLabel");
    editPriorityLabel.textContent = "Priority";
    editPriorityDiv.appendChild(editPriorityLabel);
    editPriorityDiv.appendChild(editTaskPriority);
    return editPriorityDiv;
};

function createSubmit(){
    let submitEdit = document.createElement("input");
    submitEdit.setAttribute("type", "submit");
    submitEdit.setAttribute("name", "submitEdit");
    submitEdit.setAttribute("id", "submitEdit");
    submitEdit.setAttribute("class", "editFormInput");
    submitEdit.setAttribute("value", "Submit");
    submitEdit.addEventListener("click", editTask);
    return submitEdit;
};

function editTaskModal(){
    let editFormModal = createModalDiv("editTaskModal", "modal");
    let modalContent = createModalDiv("modal-content", "none");
    let modalHeader = createModalDiv("modalHeader", "none");
    let closeModal = createCloseModal();
    let modalHeaderText = createModalHeaderText();
    let modalBody = createModalDiv("modalBody", "none");
    let editForm = createEditTaskForm();
    let editTitle = createFormElement('editTitle', 'editTitle', 'text', 'Edit Title');
    let editPriorityDiv = createPriorityList();
    let editDescription = createFormElement("editDescription", "editFormInput", "textarea", "Edit Description");
    let editDueDate = createFormElement("editDueDate", "editFormInput", "date", "Due Date");
    let submitEdit = createSubmit();
    editForm.appendChild(editTitle);
    editForm.appendChild(editDescription);
    editForm.appendChild(editDueDate);
    editForm.appendChild(editPriorityDiv);   
    editForm.appendChild(submitEdit)
    editFormModal.appendChild(modalContent);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(closeModal);
    modalContent.appendChild(modalHeaderText);
    modalContent.appendChild(modalBody);
    modalBody.appendChild(editForm);
    document.getElementById("content").appendChild(editFormModal);
};

export { showEditForm, editTaskModal }