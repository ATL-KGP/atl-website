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


//Firebase Notice

var noticeadd = firebase.database().ref("notice");
//// CHOICE /////
var files = [];
document.getElementById("files").addEventListener("change", function (e) {
  files = e.target.files;
});

///// SEND FILES //////
document.getElementById("send").addEventListener("click", function () {

  var head = $("#noticeTitle").val();
  var body = $("#noticeBody").val();

  // Push a new recommendation to the database using those values


  if (files.length != 0) {
    for (let i = 0; i < files.length; i++) {
      var storage = firebase.storage().ref();
      var upload = storage.child(`notice/${files[i].name}`).put(files[i]);

      noticeadd.push({
        "head": head,
        "nbody": body,
        "pdf": files[i].name
      });

      upload.on("state_changed", function progress(snapshot) {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.getElementById("progress").value = percentage;
      },

        function error() { alert("Error uploading file."); },

        function complete() { document.getElementById("uploading").innerHTML += `${files[i].name} uploaded <br>`; });
    }

  } else { alert("No file chosen."); }
});

// Getting URL 
document.getElementById("get_url").addEventListener("click", function () {

  var get_url_file = document.getElementById("name").value;

  var storage = firebase.storage().ref(get_url_file);


  storage.getDownloadURL().then(function (url) { document.getElementById("response").innerHTML += `${url}  <br />`; })
    .catch(function (error) { alert("Error encountered."); });

});


//get url


function getFileUrl(filename) {
  //create a storage reference


  var storage = firebase.storage().ref("notice/" + filename);

  //get file url
  storage
    .getDownloadURL()
    .then(function (url) {
      console.log(url);
    })
    .catch(function (error) {
      console.log("error encountered");
    });
}
// LIST FILES 
document.getElementById("list_files").addEventListener("click", function () {
  var storageRef = firebase.storage().ref();
  storageRef.listAll().then(function (result) {
    result.items.forEach(function (urlFile) { document.getElementById("response_list").innerHTML += `${urlFile}  <br />`; });
  }).catch(function (error) { alert("No file chosen."); });
});





var geturl;

(function () {
  // const config = {
  //     //YOUR CONFIGS

  //     apiKey: "AIzaSyBBat5q5jZlGdDgaJ3y_cuXcgvX7beAAvY",
  //     authDomain: "atlab-83c90.firebaseapp.com",
  //     databaseURL: "https://atlab-83c90.firebaseio.com",
  //     projectId: "atlab-83c90",
  //     storageBucket: "atlab-83c90.appspot.com",
  //     messagingSenderId: "903439281146",
  //     appId: "1:903439281146:web:373459ef248bd7e6b5d243"
  // };

  // firebase.initializeApp(config);


  /*const bigTextEvaluationStudents = document.getElementById('bigTextEvaluationStudents');
  const dbBigTextEvaluationStudentsRef = firebase.database().ref().child('bigTextEvaluationStudents');
  dbBigTextEvaluationStudentsRef.on('value', snap => bigTextEvaluationStudents.innerText = snap.val());
 
  var table = document.querySelector('#table1 tbody');
  const dbEvaluationStudentsRef = firebase.database().ref().child('notice');
  dbEvaluationStudentsRef.on('value', snap => {
    while(table.hasChildNodes()) {
            table.removeChild(table.firstChild);
      }
 
    var students = snap.val();
    for(var i in students) {
      var row = table.insertRow(-1);
      for(var j in students[i]) {
                cell = row.insertCell(-1);
                cell.innerHTML = students[i][j];
            }
    }
    
 
 
  });*/

//fetching notice

  var database = firebase.database().ref().child('notice/');


  database.once('value', function (snapshot) {
    console.log("hello! notice db found !")
    if (snapshot.exists()) {
      var content = '';
      snapshot.forEach(function (data) {
        var val = data.val();
        content += '<a href="#" id="link" target="_blank"><p style="color: blue;">' + val.head + '</p> </a>';


        var a_link = val.pdf;
        var doc_ref = firebase.storage().ref().child('notice/' + a_link);
        var checkURL = doc_ref.getDownloadURL();
        checkURL.then(url => {
          geturl = url;
          //content += '<td><a href="'+'#'+'">' + val.pdf + '</a></td>';
          console.log(geturl);
          document.getElementById("link").href = url;

        });





      });
      $('#table1').append(content);
    }
  });

  //document.getElementById("table1").innerHTML = content;


}());

