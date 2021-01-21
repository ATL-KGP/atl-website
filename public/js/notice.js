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
                    console.log("file url:"+geturl);
                    
                    
                    document.getElementById("link").href = url;

                });





            });
            $('#table1').append(content);
        }
    });

    //document.getElementById("table1").innerHTML = content;


}());








