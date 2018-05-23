$(document).ready(function(){

  // function to add new Parks/Features
  function add(data, api, images){
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
            if (images){
              upload(result.id, images);
            };
            break;
          case "features":
            $("#subheader").text(`${api} Added!`);
            break;
          case "images":
            console.log("Image(s) added.");
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
            url: item,
            ParkId: id
          });
        });
        add({urlObjArray}, "images");
      };
    });
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
      if (type == 'text' || type == 'password' || tag == 'textarea' || type == 'file') {
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

    // create a data object to send to the parks table
    var form = $("#new-park").serializeArray();
    var data = {};
    form.forEach(function(item){
      data[item.name] = item.value;
    });
    if (images.length === 0){
      add(data, "parks");
    } else {
      add(data, "parks", imgForm);
    };
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


  // $(document).on("click", "#select-park", function() {
  //   id = $("#park-id");
  //   id = id[0].value;
  //   console.log(id);
  //   $.ajax({
  //     method: "GET",
  //     url: `/api/park/features/${id}`
  //   }).then(function(dbFeatures){
  //     console.log(dbFeatures);

  //     $.ajax({
  //       method: "GET",
  //     url: `/api/availdetails`
  //     }).then(function(dbAvailDetails){
  //       console.log(dbAvailDetails);
  //       var f;
  //       var d;
  //       var detailList;
  //       var detailName;

  //       for (var i = 0; i< dbFeatures.length; i++){
  //         f = $("<fieldset>");
  //         f.addClass("pure-group");
  //         d = $("<div>");
  //         d.text(dbAvailDetails[i].name);
  //         d.attr("value", dbFeatures[i].id);
  //         $("#new-detail").append(f, d);
  //         for (var j = 0; j < dbAvailDetails.length; j++){
  //           detailList = $("<input>");
  //           detailList.attr("type", "number");
  //           detailName = $("<p>");
  //           detailName.text(dbAvailDetails[j].name);
  //           $("#new-detail").append(detailName, detailList);
  //         }
        // }
      // })
    // });
  // });

});