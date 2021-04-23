// *** MODULE HANDLES FIREBASE STORAGE *** //
import { projects } from './createTasks.js';
import { tasks } from './createTasks.js';
import { displayAllTasks } from './createTasks.js';
import { displayProjectDivs } from './createTasks.js';
import { db } from './index.js';
import firebase from "firebase/app";

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
                displayProjectDivs();
            } else {
                console.log("no such document");
            }
        }).catch((error) => {
            console.log("Error getting document 3:", error);
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
                tasks.push(doc.data());
            });
            fixDates();
            displayAllTasks();
        })
        .catch((error) => {
            console.log("Error getting documents 4: ", error)
        });
    }
};

function restoreData(){
    restoreProjects();
    restoreTasks();
};

export { restoreData, restoreTasks, restoreProjects }