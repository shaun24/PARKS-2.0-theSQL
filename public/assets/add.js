$(document).ready(function(){
  // function to add new Parks/Features
  function add(data, api){
    $.ajax({
      method: "POST",
      url: `/api/${api}`,
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
  $(document).on("submit", "#new-park", function(event) {
    event.preventDefault();
    var form = $("#new-park").serializeArray();
    var data = {};
    form.forEach(function(item){
      data[item.name] = item.value;
    });
    console.log(data);
    // add(data, "parks");
  });

  // add Feature button click
  $(document).on("submit", "#new-feature", function(event) {
    var form = $("#new-feature").serializeArray();
    var data = {};
    form.forEach(function(item) {
      data[item.name] = item.value;
    });
    add(data, "features");
  });

  $("input").focus(function(){
    if (window.location.pathname === "/add-park"){
      $("#subheader").text("Add your favorite park to our database");
    };
  });

  $("select").focus(function(){
    if (window.location.pathname === "/add-feature"){
      $("#subheader").text("Add a new feature to a park we may have missed to our database");
    };
  });
});