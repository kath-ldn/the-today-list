import { priorities } from './createTasks.js';

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
}

function editEditFormContent(item){
    let editTitle = document.getElementById("editTitle");
    editTitle.value = item.title;
    let editDescription = document.getElementById("editDescription");
    editDescription.value = item.description;
    let editDueDate = document.getElementById("editDueDate");
    let date = item.dueDate;
    let displayDate = formatDate(date);
    editDueDate.value = displayDate;
    let editPriority = document.getElementById("editPriority");
    editPriority.value = item.priority;
}

function showEditForm(item){
    let modal = document.getElementById("myModal");
    let modalSpan = document.getElementById("closeModal");
    editEditFormContent(item);
    modal.style.display = "block";
    modalSpan.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

//creates the modal - see if can refine/decouple any of this
function editTaskModal(item, index){
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
    modalHeaderText.textContent = "Edit Task"; 
    let modalBody = document.createElement("div");
    modalBody.setAttribute("id", "modalBody");
    let editForm = document.createElement("form");
    editForm.setAttribute("id", "editForm");
    editForm.setAttribute("name", "editForm");
    let editTitle = document.createElement("input");
    editTitle.setAttribute("type", "text");
    editTitle.setAttribute("name", "editTitle");
    editTitle.setAttribute("class", "editFormInput");
    editTitle.setAttribute("id", "editTitle");
    editTitle.setAttribute("placeholder", "Edit Title");

    let editPriorityDiv = document.createElement("div");
    editPriorityDiv.setAttribute("id", "editPriorityDiv");
    //Input Priority Dropdown
    let editPriority = document.createElement("select");
    editPriority.setAttribute("name", "editPriority");
    editPriority.setAttribute("id", "editPriority");
    editPriority.setAttribute("class", "editFormInput");
        // add label

    for (let i = 0; i < priorities.length; i++) {
        let option = document.createElement("option");
        option.value = priorities[i];
        option.text = priorities[i];
        editPriority.appendChild(option);
        };

    let editPriorityLabel = document.createElement("Label");
    editPriorityLabel.setAttribute("for", editPriority);
    editPriorityLabel.setAttribute("class", "editFormInput");
    editPriorityLabel.setAttribute("id", "editPriorityLabel");
    editPriorityLabel.textContent = "Priority";

    let editDescription = document.createElement("textarea"); 
    editDescription.setAttribute("name", "editDescription");
    editDescription.setAttribute("class", "editFormInput");
    editDescription.setAttribute("id", "editDescription");
    editDescription.setAttribute("placeholder", "Edit Description");

    let editDueDate = document.createElement("input"); 
    editDueDate.setAttribute("type", "date");
    editDueDate.setAttribute("name", "editDueDate");
    editDueDate.setAttribute("id", "editDueDate");
    editDueDate.setAttribute("class", "editFormInput");
    editDueDate.setAttribute("placeholder", "Due Date");

    let submitEdit = document.createElement("input");
    submitEdit.setAttribute("type", "submit");
    submitEdit.setAttribute("name", "submitEdit");
    submitEdit.setAttribute("id", "submitEdit");
    submitEdit.setAttribute("class", "editFormInput");
    submitEdit.setAttribute("value", "Submit")

    editForm.appendChild(editTitle);
    editForm.appendChild(editDescription);
    editForm.appendChild(editDueDate);
    editPriorityDiv.appendChild(editPriorityLabel);
    editPriorityDiv.appendChild(editPriority);
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

export { showEditForm }
export { editTaskModal }