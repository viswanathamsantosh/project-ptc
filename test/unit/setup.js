const $ = require('jquery');
global.$ = global.jQuery = $;

createAppDiv();
function createAppDiv() {
 var app = document.createElement('div');
 app.setAttribute('id', 'app');
 document.body.appendChild(app);
}