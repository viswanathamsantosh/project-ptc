var $ = require("jquery");
require("jquery-ui-bundle");
const Vue = require('./lib/vue');
const axios = require('axios');
const app = require('./index');

jest.mock('axios');

test('app is defined', () => {
  // expect(3).toBe(3);
  // expect(typeof app.created).toBe('function');
  expect(app).toBeDefined();
});
test('images is defined', () => {
  expect(app.images).toBeDefined();
});
test('formData is defined', () => {
  expect(app.formData).toBeDefined();
});
test('fileChange is a defined function', () => {
  expect(typeof app.$options.methods.fileChange).toBe('function');
});
test('fileChange is a defined function', () => {
  expect(typeof app.$options.methods.fileChange).toBe('function');
});
test('addText is a defined function', () => {
  expect(typeof app.$options.methods.addText).toBe('function');
});
test('getImages is a defined function', () => {
  expect(typeof app.$options.methods.getImages).toBe('function');
});
test('onClickUploadImage is a defined function', () => {
  expect(typeof app.$options.methods.onClickUploadImage).toBe('function');
});
test('saveLayout is a defined function', () => {
  expect(typeof app.$options.methods.saveLayout).toBe('function');
});
test('uploadImage is a defined function', () => {
  expect(typeof app.$options.methods.uploadImage).toBe('function');
});
test('mounted is a defined function', () => {
  expect(typeof app.$options.mounted[0]).toBe('function');
});
// test('onClickUploadImage is a defined function', () => {
//   app.$options.methods.onClickUploadImage();
//   expect(app.$options.methods.uploadImage).toBeCalled();
// });
test('getImages', () => {
  const resp = {data: ['a', 'b'] };
  axios.get.mockResolvedValue(resp);
  app.$options.methods.getImages();
  expect(axios.get).toBeCalledWith('/images');
  // expect(app.images).not.toBe([]);
  // expect(app.images).toBe(resp.data);
});