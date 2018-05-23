$(document).ready(function() {
// Get the modal
var modal = document.getElementById('sign-in-modal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
$("#sign-in").on("click",function(){
    event.preventDefault();
    document.getElementById('sign-in-modal').style.display='block';
 
});



});
