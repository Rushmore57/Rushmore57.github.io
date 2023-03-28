   
   // Import the functions you need from the SDKs you need
   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
   import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
   import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
  } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDREgVOsEPGBGNtsBv3rLw57Dfvalj2d00",
    authDomain: "recipe-book-e3141.firebaseapp.com",
    databaseURL: "https://recipe-book-e3141-default-rtdb.firebaseio.com",
    projectId: "recipe-book-e3141",
    storageBucket: "recipe-book-e3141.appspot.com",
    messagingSenderId: "332398574208",
    appId: "1:332398574208:web:9c4590ff1e0532dcc58465",
    measurementId: "G-WX8EMW0PKH"
  };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();

    //login filed .
     const emailInput = document.getElementById("email");
     const passwordInput = document.getElementById("password");
     const logIn = document.getElementById("log_in");
     const submitButton = document.getElementById("submit_btn");
     const  returnBtn = document.getElementById("hide") 

     //signup field
     const signupEmailIn = document.getElementById("newemail");
     const confirmEmailIn = document.getElementById("confirmemail");
     const signupPasswordIn = document.getElementById("newpassword");
     const confirmPasswordIn = document.getElementById("confirmpassword");
     const signUP = document.getElementById("sign_up");
     const createAccountButton = document.getElementById("creat_account_btn");
     const backButton = document.getElementById("back_btn");
     var email,
     password,
     signupEmail,
     signupPassword,
     confirmEmail,
     confirmPassword;

createAccountButton.addEventListener("click", function (){
  var isVarified = true;

  signupEmail = signupEmailIn.value;
  confirmEmail = confirmEmailIn.value;
  if (signupEmail != confirmEmail) {
    window.alert(" your emails did not match, please check and try again.");
    isVarified = false;
  }

  signupPassword = signupPasswordIn.value;
  confirmPassword = confirmPasswordIn.value;
  if (signupPassword != confirmPassword) {
    window.alert("your passwords did not match, please check and try again.")
    isVarified = false;
  };

  if (
    signupEmail == null ||
    confirmEmail == null ||
    signupPassword == null ||
    confirmPassword == null 
    ) {
    window.alert("please fill in all the fields");
    isVarified = false;
  };

      if (isVarified) {
        createUserWithEmailAndPassword(auth,signupEmail,signupPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          window.alert("account created successfully");
          window.location = "./plpfinalproject.html";
        });
      };
     });
     returnBtn.addEventListener("click",function(){
      document.getElementById("log_in").style.display="none",
      document.getElementById("sign_up").style.display="block"
     });
     backButton.addEventListener("click",function(){
      document.getElementById("log_in").style.display="block",
      document.getElementById("sign_up").style.display="none"
     });
     submitButton.addEventListener("click", function () {
      email = emailInput.value;
      // console.log(email);
      password = passwordInput.value;
      // console.log(password);
    
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
    
          window.alert("Success! Welcome back!");
          window.location = "./plpfinalproject.html";
    
          // ...
        })
        .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;
          window.alert("oops!, something went wrong Try again.");
        });
    });


  
     
