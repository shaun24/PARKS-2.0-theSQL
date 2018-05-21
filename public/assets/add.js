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
        if (api === "parks") {
          $("#subheader").text(`${result.name} Added!`);
        } else {
          $("#subheader").text(`${api} Added!`);
        };
      };
    })
  };

  // clears all the form values
  function clearForm(form) {
    // iterate over all of the inputs for the form
    // element that was passed in
    $(':input', form).each(function() {
      var type = this.type;
      var tag = this.tagName.toLowerCase(); // normalize case
      // it's ok to reset the value attr of text inputs,
      // password inputs, and textareas
      if (type == 'text' || type == 'password' || tag == 'textarea') {
        this.value = "";
      }
      // checkboxes and radios need to have their checked state cleared
      // but should *not* have their 'value' changed
      else if (type == 'checkbox' || type == 'radio') {
        this.checked = false;
      }
      // select elements need to have their 'selectedIndex' property set to -1
      // (this works for both single and multiple select elements)
      else if (tag == 'select') {
        this.selectedIndex = 0;
      }
    });
  };

  // add Park button click
  $(document).on("submit", "#new-park", function(event) {
    event.preventDefault();
    var form = $("#new-park").serializeArray();
    var data = {};
    form.forEach(function(item){
      data[item.name] = item.value;
    });
    add(data, "parks");
    clearForm($("#new-park"));
  });

  // add Feature button click
  $(document).on("submit", "#new-feature", function(event) {
    event.preventDefault();
    var form = $("#new-feature").serializeArray();
    var feature = {};
    var park;
    var array = [];
    form.forEach(function(item){
      if (item.name === "ParkId") {
        park = item.value;
      } else if (feature.name != item.name) {
        feature = {};
        feature.name = item.name;
        if (feature.name) {
          array.push(feature);
        };
      } else if (feature.name === item.name) {
        feature[item.value] = true;
      };
      feature.ParkId = park;
    });
    add({array}, "features");
    clearForm($("#new-feature"));
  });

  $("input").focus(function(){
    if (window.location.pathname === "/add-park"){
      $("#subheader").text("Add your favorite park to our database");
    };
  });

  $("select").focus(function(){
    if (window.location.pathname === "/add-feature"){
      $("#subheader").text("Add new features to a park we may have missed to our database");
    };
  });
});