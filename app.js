var app = new Vue({
  el: '#app',
  data: {
    images: [],
    formData: {},
  },
  // lifecycle hook when component is created
  created: function () {},
  // lifecycle hook when component is mounted
  mounted: function () {
    this.getImages();
    $("#droppable").droppable({
      drop: function (event, ui) {
        if ($('#droppable').find($(ui.draggable)).length <= 0)
          $("#droppable").append($(ui.draggable).clone().addClass('dropped').draggable());
      }
    });
    $("#deletable").droppable({
      drop: function (event, ui) {
        if (!ui.draggable.hasClass('dropped')) return false;
        ui.draggable.remove();
      }
    });
  },
  // lifecycle hook when view is updated
  updated: function () {
    // make the image draggable
    $('#draggable img').draggable({
      helper: "clone",
      revert: "invalid"
    });
  },
  methods: {
    // event handler for uploading files
    fileChange: function (event) {
      const target = event.target;
      const files = target.files;
      this.formData = new FormData();
      this.formData.append('upload', files[0]);
    },
    // Add editable text element to the canvas area
    addText: function () {
      let ele = document.createElement('div');
      ele.setAttribute('id', 'draggable-text');
      ele.setAttribute('class', 'dropped draggable-text');
      ele.setAttribute('contenteditable', 'true');
      ele.innerText = 'This text can be edited by the user';
      document.getElementById('droppable').appendChild(ele);
      $('#draggable-text').draggable();
    },
    onClickUploadImage: function () {
      this.uploadImage(this.formData);
    },
    // upload Image to node server
    uploadImage: function (formData) {
      axios
        .post('/uploads', formData)
        .then(response => {
          this.getImages();
        });
    },
    // get the list of uploaded images
    getImages: function () {
      axios
        .get('/images')
        .then(response => {
          this.images = response.data;
        });
    }
  }
})