
import firebase from "firebase/app";
import { db } from './index.js';
import { displayProjectDivs } from './addRmvProjs.js';
import { CreateTask, addTaskToArray } from './addRmvTasks.js';
import { restoreData } from "./restoreData.js";

//array to hold projects
let projects = [];

//array to hold task objects
let tasks = [];

let currentTaskIndex = '';

let currentTaskDiv = '';

function createSampleTasks(){
    let sampleTask = new CreateTask('0000001', 'A Sample Task', 'Sample Project', 'To complete this Sample Task', new Date(), 'Medium')
    addTaskToArray(sampleTask, '0');
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
                displayProjectDivs();
                createSampleTasks();
            } else {
                console.log("no user data");
            }
        }).catch((error) => {
            console.log("Error getting user data:", error);
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
                restoreData()
                } else {
                    console.log("No such user data. Creating user data...");
                    projArray.set({
                        projects: ['Sample Project']
                    })
                    getSampleData()
                }
            })
        .catch((error) => {
            console.error("Error adding user datat: ", error);
        })
    }
};

export { tasks, projects, createSampleData, currentTaskIndex, currentTaskDiv }