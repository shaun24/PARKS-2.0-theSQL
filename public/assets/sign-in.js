$(document).ready(function() {
// Get the modal
var modal = document.getElementById('sign-in-modal');
console.log("here");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
checkLogin();
$("#sign-in").on("click",function(){
  if(!sessionStorage.getItem("email")){
    event.preventDefault();
    document.getElementById('sign-in-modal').style.display='block';
  }
  else{
    sessionStorage.clear();
    window.location.reload();
  }
});
$("#sign-in")
    .on("mouseenter",function(){
      if(!sessionStorage.getItem("email")){
      }
      else
      {
        $("#sign-in a").text("Logout");
      }
      })
      .on( "mouseleave", function() {
        if(sessionStorage.getItem("email")){
        $("#sign-in a").text(sessionStorage.getItem("email")); 
        }
      });
// Actually signing in/up
// function to call the post route adding a user to the database
function addUser(data){
  console.log("attempting to add user!");
  $.ajax({
    method: "POST",
    url: "/api/users",
    data: data
  }).done(function(result){
    if (result.errors){
      result.errors.forEach(function(item){
        switch (item.path){
          case "email":
            if (item.validatorKey === "not_unique"){
              $("#sign-in-modal-error").text("There is already an account with the email address.");
            } else {
              $("#sign-in-modal-error").text("That is not a valid email address.");
            };
            break;
          case "password":
             $("#sign-in-modal-error").text("Password must be at least eight characters.");
        };
      });
    } else {
      sessionStorage.setItem("id", result.id);
      sessionStorage.setItem("email", data.email);
      sessionStorage.setItem("password", data.password);
      document.getElementById('sign-in-modal').style.display='none';
      checkLogin();
    };
  }).fail(function(xhr, responseText, responseStatus){
    if (xhr){
      console.log(xhr.responseText);
    };
  });
};

// function to check the user's login credentials against the database and set session variables if they are valid
function loginUser(data){
  $.get("/api/users", data, function(result){
   
    sessionStorage.clear();
    if (result.loggedin){
      //sessionStorage.setItem("id", result.id);
      sessionStorage.setItem("email", data.email);
      sessionStorage.setItem("password", data.password);
    checkLogin();
    document.getElementById('sign-in-modal').style.display='none';
      
    } else {
      $("#sign-in-modal-error").text("Incorrect username or password.");
    };
  });
};

function checkLogin(){
  var user = sessionStorage.getItem("email");

  if(user){
    $("#sign-in a").text(user);
  }
};

// click event getting the new login information submitted by the user
$("#sign-up-test").on("click", function(event){
  event.preventDefault();
  console.log("form submit captured!");
  var userEmail = $("#sign-in-email").val().trim();
  var userPass = $("#sign-in-password").val();
  //var userName = $("#user-name").val().trim();
  
  var newUser = {
   // displayName: userName,
    email: userEmail,
    password: userPass
  };

  if (userPass.length < 8){
    $("#sign-in-modal-error").text("Password must be at least eight characters.");
  } else {
    addUser(newUser);
  };
});

// click event getting the login credentials submitted by the user
$("#sign-in-test").on("click", function(event){
  event.preventDefault();
  var loginEmail = $("#sign-in-email").val().trim();
  var loginPass = $("#sign-in-password").val();
  
  var loginData = {
    email: loginEmail,
    password: loginPass
  };
console.log(loginData);
  loginUser(loginData);
});

});
