// *** MODULE HANDLES FIREBASE STORAGE *** //
import { projects } from './createTasks.js';
import { tasks } from './createTasks.js';
import { displayAllTasks } from './createTasks.js';
import { displayProjectDivs } from './createTasks.js';
import { db } from './index.js';
import firebase from "firebase/app";
import { toDate } from 'date-fns';

//function ensures compatability with stored and displayed dates
function fixDates(){
    for (let i=0; i < tasks.length; i++) {
        tasks[i].dueDate = (tasks[i].dueDate).toDate();
    }
};

function restoreProjects(){
    let user = firebase.auth().currentUser;
    let uid;
    if(user){
        uid = user.uid;
        let projectData = db.collection("users").doc(uid);
        projectData.get().then((doc) => {
            if (doc.exists) {
                let storedProjects = ("Document data:", doc.data().projects);
                projects = storedProjects;
                console.log(projects);
                displayProjectDivs();
            } else {
                console.log("no such document");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });   
    }
};

function restoreTasks(){
    let user = firebase.auth().currentUser;
    let uid;
    if(user){
        uid = user.uid;
        let taskData = db.collection("users").doc(uid).collection("tasks");
        taskData.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(tasks);
                tasks.push(doc.data());
            });
            fixDates();
            displayAllTasks();
        })
        .catch((error) => {
            console.log("Error getting documents: ", error)
        });
    }
};

function restoreData(){
    restoreProjects();
    restoreTasks();
};

   
// FOR EACH NEW USER WILL NEED TO CREATE ARRAY USING SET AFTER PROJECT ID


/* WHAT HAD FOR LOCAL STORAGE


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
*/


export { restoreData, restoreTasks, restoreProjects }
//export { projects }
//export { tasks }