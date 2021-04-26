// *** MODULE HANDLES FIREBASE STORAGE *** //
import { displayProjectDivs } from './addRmvProjs.js';
import { displayAllTasks } from './addRmvTasks.js';
import { db } from './index.js';
import { projects, tasks } from './projectData.js'
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
                console.log("no user data");
            }
        }).catch((error) => {
            console.log("Error getting user data:", error);
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
            console.log("Error getting user data: ", error)
        });
    }
};

function restoreData(){
    restoreProjects();
    restoreTasks();
};

export { restoreData, restoreTasks, restoreProjects }