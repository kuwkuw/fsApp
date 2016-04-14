'use strict';

var DirectoriesTreeView = require("./directoriesTreeView.js");
var DirectoriesTreePresenter = require("./directoriesTreePresenter.js");

var view = new DirectoriesTreeView({
    element: document.querySelector("[data-component='dir-tree']")
});

var presenter = new DirectoriesTreePresenter(view);
