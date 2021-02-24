
import firebase from "firebase/app";
import { db } from './index.js';
import { addTaskToArray, CreateTask, displayProjectDivs } from './createTasks.js';
import { restoreData, restoreProjects, restoreTasks } from "./restoreData.js";

//array to hold projects
let projects = [];

//array to hold task objects
let tasks = [];


function createSampleTasks(){
    let sampleTask = new CreateTask('0000001', 'A Sample Task', 'Sample Project', 'To complete this Sample Task', new Date(), 'Medium')
    addTaskToArray(sampleTask);
};

//pretty much identical to restoreProject aside from callback - must be better way
function getSampleData(){
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
                createSampleTasks();
            } else {
                console.log("no such document");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });   
    }
};


function createSampleData(){
    let user = firebase.auth().currentUser;
    let uid;
    if(user != null){
        uid = user.uid;
        let projArray = db.collection("users").doc(uid);
        projArray.get().then((doc) => {
            if(doc.exists) {
                console.log("Documents Exist", doc.data())
                restoreData()
                } else {
                    console.log("No such document. Creating document...");
                    projArray.set({
                        projects: ['Sample Project']
                    })
                    getSampleData()
                }
            })
        .catch((error) => {
            console.error("Error adding document: ", error);
        })
    }
}

export { tasks, projects, createSampleData }