//Firebase-Configuration

var firebaseConfig = {
    apiKey: "AIzaSyBBat5q5jZlGdDgaJ3y_cuXcgvX7beAAvY",
    authDomain: "atlab-83c90.firebaseapp.com",
    databaseURL: "https://atlab-83c90.firebaseio.com",
    projectId: "atlab-83c90",
    storageBucket: "atlab-83c90.appspot.com",
    messagingSenderId: "903439281146",
    appId: "1:903439281146:web:373459ef248bd7e6b5d243"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
 //Sign-Up Function
function signUp() {
  event.preventDefault();
  console.log("signup");
  var userEmail = document.getElementById('sign-up-email').value;
  var userPass = document.getElementById('sign-up-pass').value;
  var userPasscmf = document.getElementById('confirm-pass').value;
  if (userPass == userPasscmf) {
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).then(cred => {
      firebase.auth().signOut().then(function () {
        window.location.href = 'SignIn-Up.html';
      }).catch(error => {
        console.log(error.message);
      })
    }); 
  } else {
    window.alert("Password doesn't match!!");
  }
  //var userName = document.getElementById('iptxt').value;
 }
// Sign-In Function
function signIn() {
  event.preventDefault();
  console.log("signin");
  var userEmail = document.getElementById('sign-in-email').value;
  var userPass = document.getElementById('sign-in-pass').value;
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(cred => {
    window.location.href = 'index.html';
  });  
}
//Sign-Out Function
function signOut() {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    window.location.href = 'index.html';
  }).catch(function (error) {
    // An error happened.
  });
  
}
// Firebase Auth-State Check
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log("logged in");
    console.log(firebaseUser);
    setupUI(firebaseUser);
  } else {
    console.log("logged out");
    setupUI();
    if (document.URL.includes('userProfile.html')) {
      window.location.href = 'index.html';
    }
  }
});
//Contact-Form
document.querySelector(".contact-form").addEventListener("submit", submitForm);
function submitForm() {
  event.preventDefault();
  //Retriving variables values
  var name = document.getElementById('name').value;
  var sub = document.getElementById('sub').value;
  var email = document.getElementById("contact-email").value;
  var contactNo = document.getElementById("contact-no").value;
  var message = document.getElementById('msg').value;
  //console.log(name, sub, email, contactNo, message);
  sendEmail(name, sub, email, contactNo, message);
  automail(name, sub, email);
}
//send mail to admin
function sendEmail(name,sub,email,contactNo,message){
  Email.send({
    Host: "smtp.gmail.com",
    Username: "toaditya1999@gmail.com",
    Password: "nodkgugpfdscjbmf",
    To: "tinker.kharagpur@gmail.com",
    From: "admin@atlkgp.com",
    Subject: `${sub}`,
    Body: `Name: ${name} <br/> Email: ${email} <br/> Contact No: ${contactNo} <br/> Message: ${message}`,
  }).then((message) => alert("mail sent successfully"));
  
}
//auto-generated mail
function automail(name, sub, email) {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "toaditya1999@gmail.com",
    Password: "nodkgugpfdscjbmf",
    To: `${email}`,
    From: "admin@atlkgp.com",
    Subject: `${sub}`,
    Body: `Hello ${name} <br/> Thank you for writing to us. This is an system generated response email. We have received your message about ${sub} and will get back to you within 24 hours. Until then, you can give us a call anytime at xxx-xxxxx or email tinker.kharagpur@gmail.com.<br/>ATL Kharagpur`,
  });
}