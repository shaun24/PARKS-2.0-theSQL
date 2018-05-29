$(document).ready(function(){

  // function to add new Parks/Features
  function add(data, api, images, details){
    $.ajax({
      method: "POST",
      url: `/api/${api}`,
      data: data
    }).then(function(result) {
      if (result.errors) {
        $("#subheader").text(`${result.errors[0].message}!`);
      } else {
        switch (api) {
          case "parks":
            $("#subheader").text(`${result.name} Added!`);
            if (images) {
              upload(result.id, images);
            };
            break;
          case "features":
            $("#subheader").text(`${api} Added!`);
            if (details) {
              addDetails(result, details);
            }
            break;
          case "images":
            console.log("Image(s) added.");
            break;
          case "details":
            console.log("Details added.");
            break;
          default:
            console.log(result);
        };
      };
    });
  };

  // function to send any park pictures to the assets/images/parks file location
  function upload(id, images) {
    $.ajax({
      method: "POST",
      url: "/api/upload",
      processData: false,
      contentType: false,
      data: images
    }).then(function(result){
      if (result.errors) {
        console.log(result.errors);
      } else {
        var urlObjArray = [];
        result.forEach(function(item){
          urlObjArray.push({
            file: item,
            ParkId: id
          });
        });
        add({urlObjArray}, "images");
      };
    });
  };

  // function to add details to the database
  function addDetails(features, details) {

    // go through the details array and the returned features array to assign the FeatureId to the correct detail
    details.forEach(function(det, idx) {
      features.forEach(function(feat) {
        if (feat.name === det.feature) {
          details[idx].FeatureId = feat.id;
        };
      });
    });

    // format the details to coincide with the database
    var detObjArray = [];
    details.forEach(function(item){
      detObjArray.push({
        name: item.name,
        quantity: item.value,
        FeatureId: item.FeatureId
      });
    });
    add({detObjArray}, "details");
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
      if (type == 'text' || type == 'password' || tag == 'textarea' || type == 'file' || type == 'number') {
        this.value = "";
      }
      // checkboxes and radios need to have their checked state cleared
      // but should *not* have their 'value' changed
      else if (type == 'checkbox' || type == 'radio') {
        this.checked = false;
      }
      // select elements need to have their 'selectedIndex' property set to 0
      // (this works for both single and multiple select elements)
      else if (tag == 'select') {
        this.selectedIndex = 0;
      }
    });
  };

  // add Park button click
  $(document).on("submit", "#new-park", function(event) {
    event.preventDefault();

    // get image data and append to a new form
    var imgForm = new FormData();
    var images = $("#img-file")[0].files;

    images = Array.from(images);
    images.forEach(function(image, idx){
      imgForm.append("file-" + idx, image)
    });

    // create a data object
    var form = $("#new-park").serializeArray();
    var data = {};
    form.forEach(function(item){
      data[item.name] = item.value.trim();
    });

    // convert the address into latitude and longitude, add them to the data object, and call the fuction to add the park to the database
    $.get("/api/latlng", data, function(response){
      data.lat = response.lat;
      data.lng = response.lng;
      if (images.length === 0){
        add(data, "parks");
      } else {
        add(data, "parks", imgForm);
      };
      clearForm($("#new-park"));
    });
  });

  // add Feature button click
  $(document).on("submit", "#new-feature", function(event) {
    event.preventDefault();
    var feature = {};
    var park;
    var array = [];
    var featArray = [];
    var detArray = [];
    var featureName = "";

    // separate the features and details from the submitted form into separate arrays
    $(":input", $("#new-feature")).each(function(item) {
      var type = this.type;

      // put the selected park and the checkbox values into a features array
      if (type === "checkbox" && this.checked || type === "select-one") {
        featArray.push({
          name: this.name,
          value: this.value
        });

        // assigns the feature name to a variable
        if (this.value == 1) {
          featureName = this.name;
        }

      // put the names/values of the number boxes along with the feature name into a details array
      } else if (type === "number" && this.value != "") {
        detArray.push({
          name: this.name,
          value: this.value,
          feature: featureName
        });
      };
    });

    // formats the feature information to coincide with the database format
    featArray.forEach(function(item){
      if (item.name === "ParkId") {
        park = item.value;
      } else if (item.value == 1) {
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
    add({array}, "features", false, detArray);
    clearForm($("#new-feature"));
  });

  // resets the subheader to the default message
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