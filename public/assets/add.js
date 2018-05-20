$(document).ready(function(){
  // function to add new Parks
  function addPark(data){
    $.ajax({
      method: "POST",
      url: "/api/parks",
      data: data
    }).then(function(result) {
      if (result.errors) {
        $("#subheader").text(`${result.errors[0].message}!`);
      } else {
        $("#subheader").text(`${result.name} Added!`);
      };
    })
  };

  // add Park button click
  $(document).on("submit", "#add-park", function(event) {
    event.preventDefault();
    var form = $("#add-park").serializeArray();
    var data = {};
    form.forEach(function(item){
      data[item.name] = item.value;
    });
    addPark(data);
  });

  $("input").focus(function(){
    $("#subheader").text("Add your favorite park to our database");
  })
});