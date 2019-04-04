var app = new Vue({
  el: '#app',
  data: {
    images: [],
    formData: {},
  },
  created: function () {},
  mounted: function () {
    this.getImages();
    $("#droppable").droppable({
      drop: function (event, ui) {
        // if ($("#droppable img").length == 0) {
        //   $("#dvDest").html("");
        // }
        // ui.draggable.addClass("dropped");
        // $("#droppable").append(ui.draggable);
      }
    });
  },
  methods: {
    fileChange: function (event) {
      const target = event.target;
      const files = target.files;
      this.formData = new FormData();
      this.formData.append('upload', files[0]);
    },
    addText: function() {
      document.getElementById('droppable').innerHTML = "<div id='draggable-text' contenteditable='true'>This text can be edited by the user.</div>";
      $('#draggable-text').draggable();
    },
    onClickUploadImage: function () {
      this.uploadImage(this.formData);
    },
    uploadImage: function (formData) {
      axios
        .post('/uploads', formData)
        .then(response => {
          this.getImages();
        });
    },
    getImages: function () {
      axios
        .get('/images')
        .then(response => {
          this.images = response.data;
          setTimeout(() => {
            $('#draggable img').draggable({
              helper: "clone",
              appendTo: "body",
              stop: function (event, ui) {
                ui.helper.removeClass("draggable");
                var image = this.src.split("/")[this.src.split("/").length - 1];
                if ($.ui.ddmanager.drop(ui.helper.data("draggable"), event)) {
                  alert(image + " dropped.");
                } else {
                  alert(image + " not dropped.");
                }
              }
            });
          }, 2000);
        });
    }
  }
})

// var images = [];
// function fileChange(eventObj) {
//   const target = eventObj.target;
//   const files = target.files;
//   const formData = new FormData();
//   formData.append('file', files[0]);
//   uploadImage(formData);
// }
// function uploadImage(formData) {
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = (res) => {
//     console.log(res);
//     if (res.readyState == 4 && res.status == 200) {
//       alert(res.responseText);
//     }
//   };
//   xhttp.open("POST", "/uploads", true);
//   xhttp.send(formData);
// }
// function getImages() {
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//       images = JSON.parse(this.responseText) || [];
//     }
//   };
//   xhttp.open("GET", "/images", true);
//   xhttp.send();
// }
// getImages();