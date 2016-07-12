"use strict";

var CommentFormView = require("./commentFormView.js");
var Ajax = require("./ajax.js");

function DirectoriesTreePresenter(view){
    this._view = view;
    this._commentFormView = new CommentFormView();
    
    this._path = './';

    this._init();
}


DirectoriesTreePresenter.prototype._init = function(){
    this._loadDirectoryTree();

    this._view.onDirectoryClick(this.onDirectoryClick.bind(this));
    this._view.onAddCommentClicked(this.onAddCommentClick.bind(this));
    this._view.onDirectoriesItemLoaded(this._loadComents.bind(this));
    this._commentFormView.onAddComment(this._saveComent.bind(this));
};

DirectoriesTreePresenter.prototype.onDirectoryClick = function(e){
    this._path = e.detail;
    this._loadDirectoryTree();
};

DirectoriesTreePresenter.prototype.onAddCommentClick = function(e){
    var comentWrp = e.detail;
    this._commentFormView.show(comentWrp);
};

DirectoriesTreePresenter.prototype._loadDirectoryTree = function(){
    Ajax.get({
        url: 'api/'+encodeURIComponent(this._path),
        callBack: this._view.render.bind(this._view),
        errorCallBack: function(){
            console.warn( 'Error: ' + (this.status ? this.statusText : 'folder not found.') );
        }
    });
};

DirectoriesTreePresenter.prototype._loadComents = function(query){
    Ajax.get({
        url: 'api/comments/'+encodeURIComponent(query),
        callBack: this._view.renderComments.bind(this._view),
        errorCallBack: function(){
            console.warn( 'Error: ' + (this.status ? this.statusText : 'not found.') );
        }
    });
}

DirectoriesTreePresenter.prototype._saveComent = function(coment){
    console.log(coment);
    var query;
    Ajax.post({
        url: 'api/comments/',
        body: JSON.stringify(coment),
        callBack: this._view.renderComment.bind(this._view),
        errorCallBack: function(){
            console.warn( 'Error: ' + this.status);
        }
    });
}

module.exports = DirectoriesTreePresenter;

