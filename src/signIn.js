import firebase from 'firebase';
require('firebase/auth');
import { provider } from './index.js';
import { projects, tasks } from './projectData.js';

function getProfilePicUrl() {
    return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
};

function signIn() {
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

}

function makeSignInBtn(){
    //sign-in button
    let signUpDiv = document.getElementById("signUpDiv");
    const signInButton = document.createElement("button");
    signInButton.setAttribute("id", "signInButton");
    signInButton.textContent = "Sign In With Google";
    signInButton.addEventListener("click", () => {
        signIn();
    });
    signUpDiv.appendChild(signInButton);
};

function signOutData(){
    let parentDiv = document.getElementById("container");
    while(parentDiv.firstChild){
        parentDiv.removeChild(parentDiv.firstChild);
    }
    projects = [];
    tasks = [];
}

function makeSignOutBtn(){
    //sign-in button
    let signUpDiv = document.getElementById("signUpDiv");
    let userPicElement = document.getElementById('userPic');
    let userNameElement = document.getElementById('userName');
    const signOutButton = document.createElement("button");
    signOutButton.setAttribute("id", "signOutButton");
    signOutButton.textContent = "Sign Out";
    signOutButton.addEventListener("click", () => {
        signOutData();
        firebase.auth().signOut();
        signOutButton.style.display = "none";
        document.getElementById("signInButton").style.display = "block";
        userPicElement.style.display = "none";
        userNameElement.style.display = "none";
    });
    signUpDiv.appendChild(signOutButton);
};



function updateUserDetails() {
    let userPicElement = document.getElementById('userPic');
    let userNameElement = document.getElementById('userName');
    var profilePicUrl = getProfilePicUrl();
    var userName = getUserName();
    userPicElement.style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
    userNameElement.textContent = userName;
    userPicElement.style.display = "block";
    userNameElement.style.display = "block";

};

function addSizeToGoogleProfilePic(url) {
    if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
      return url + '?sz=150';
    }
    return url;

};

  
  // Returns the signed-in user's display name.
function getUserName() {
    return firebase.auth().currentUser.displayName;
};

export { signIn, makeSignInBtn, makeSignOutBtn, updateUserDetails } 