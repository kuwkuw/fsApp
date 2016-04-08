
var view = new DirectoriesTreeView({
    element: document.querySelector("[data-component='dir-tree']")
});

var presenter = new DirectoriesTreePresenter(view);
