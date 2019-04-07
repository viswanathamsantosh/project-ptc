// const Vue = require('./lib/vue');
// const axios = require('../axios.min');
// var $ = require("jquery");
// require("jquery-ui");
// import Vue from '../vue';
// import axios from '../axios.min';

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
    $('#droppable').droppable({
      drop: function (event, ui) {
        let clonedEle = $(ui.draggable).clone();
        if ($('#droppable').find($(ui.draggable)).length <= 0)
          $('#droppable').append(clonedEle.addClass('dropped').draggable({
            containment: '#droppable'
          }));
        var el = document.createElement('span');
        el.innerHTML = "<a href='Javascript:void(0)' class='xicon delete-button' title='Remove'>X</a>";
        $(el).insertAfter(clonedEle.find('img'));
      }
    });
    $('#deletable').droppable({
      drop: function (event, ui) {
        if (!ui.draggable.hasClass('dropped')) return false;
        ui.draggable.remove();
      }
    });
    if (localStorage.getItem('elems') != null) {
      document.getElementById('droppable').innerHTML = localStorage.getItem('elems');
      let elems = document.getElementById('droppable').children;
      for (let i = 0; i < elems.length; i++) {
        $(elems[i]).draggable();
        // .resizable();
      }
    }
  },
  // lifecycle hook when view is updated
  updated: function () {
    // make the image draggable
    $('#draggable li').draggable({
      helper: 'clone',
      containment: '#droppable',
      revert: 'invalid'
    });
    $('.delete-button').on('click', function () {
      $(this).parent().parent().remove();
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
      let mainDiv = document.createElement('div');
      mainDiv.setAttribute('id', 'draggable-text');
      mainDiv.setAttribute('class', 'dropped draggable-text');
      let ele = document.createElement('div');
      ele.setAttribute('contenteditable', 'true');
      ele.innerText = 'This text can be edited by the user';
      var el = document.createElement('span');
      el.innerHTML = "<a href='Javascript:void(0)' class='xicon delete-button' title='Remove'>X</a>";
      mainDiv.appendChild(el);
      mainDiv.appendChild(ele);
      document.getElementById('droppable').appendChild(mainDiv);
      $('#draggable-text').draggable();
      // $('.delete-button').on('click', function () {
      //   $(this).parent().parent().remove();
      // });
    },
    onClickUploadImage: function () {
      this.uploadImage(this.formData);
    },
    saveLayout: function () {
      let elemsToSave = document.getElementById('droppable').innerHTML;
      localStorage.setItem('elems', elemsToSave);
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

// function sum(a, b) {
//   return a + b;
// }
// module.exports = sum;