//create overall page structure
import { pageStructure } from './page-structure.js';
import { defaultHideForms } from './page-structure.js';
//make form on page
import { makeProjectForm } from './form.js';
import { makeCategoryForm } from './form.js';

//edit project modal
import { editProjectModal } from './modal.js';

//import local storage or set default page
import { restoreData } from './localStorage.js';

// create and display projects
import { categories } from './projects.js';
import { projects } from './projects.js';
import { CreateProject } from './projects.js';
import { displayCategoryDivs } from './projects.js';
import { getCategory } from './projects.js';
import { findCategory } from './projects.js';
import { findCategoryDiv } from './projects.js';
import { makeProjectDivs } from './projects.js';
import { addProjectToArray } from './projects.js';
import { displayAllProjects } from './projects.js';
import { formDataToProject } from './projects.js';
import { removeProject } from './projects.js';
import { editProject } from './projects.js';

//experiment with removing functions called in other functions (e.g. find/get cat div)

pageStructure();
makeCategoryForm();
makeProjectForm();
restoreData();
editProjectModal();
//submitForm();
defaultHideForms();
