'using strict';

function DirectoriesTreeView(options){
    "use strict";
    this.DIR = 'directory';
    this._element = options.element;

    this._init();
}

DirectoriesTreeView.prototype.render = function(dirTree){
    if(!dirTree){
        return;
    }

    var _this = this;
    var path =dirTree.path
    var directoryContent = dirTree.directoryContent;
    this._directoriesTreeElement.innerHTML = '';
    
    this._upDirectoryElement.setAttribute('data-path', path);
    
    directoryContent.forEach(function(treeElement){
        _this._directoriesTreeElement.appendChild(_this._createTreeElement(treeElement, path));
        _this._directoriesItemLoaded(path + treeElement.name + '/');
    });
};

DirectoriesTreeView.prototype.renderComments = function(coments){
    if(coments.length === 0){
        return;
    }
    
    coments.forEach(this.renderComment.bind(this));
};


DirectoriesTreeView.prototype.onDirectoryClick = function(hendler){
    this._element.addEventListener('directoryChange', hendler);
};

DirectoriesTreeView.prototype.onAddCommentClicked = function(hendler){
    this._element.addEventListener('showComments', hendler);
};

DirectoriesTreeView.prototype.onDirectoriesItemLoaded = function(hendler){
    this._onDirectoriesTreeLoadedHendler = hendler;
};

DirectoriesTreeView.prototype._init = function(){
    this._initUpDirectoryElement();
    this._initDirectoriesTreeElement();

    this._element.appendChild(this._upDirectoryElement);
    this._element.appendChild(this._directoriesTreeElement);

    this._element.addEventListener('click', this._onTreeElementClicked.bind(this));
};

DirectoriesTreeView.prototype._directoriesItemLoaded = function(query){
    this._onDirectoriesTreeLoadedHendler(query);
};

DirectoriesTreeView.prototype._initUpDirectoryElement = function(){
    this._upDirectoryElement = document.createElement('span');
    this._upDirectoryElement.setAttribute('class', 'up-directory');
    this._upDirectoryElement.setAttribute('data-selector', this.DIR);
    this._upDirectoryElement.setAttribute('data-path', './../');
    this._upDirectoryElement.innerText = '..';
};

DirectoriesTreeView.prototype._initDirectoriesTreeElement = function(){
    this._directoriesTreeElement = document.createElement('ul');
    this._directoriesTreeElement.setAttribute('class', 'directories-tree-container');
    this._directoriesTreeElement.setAttribute('data-selector', 'directories-tree');
};

DirectoriesTreeView.prototype._onTreeElementClicked = function(e){
    var target = e.target;
    var targetAddComentBtn = target.closest('[data-selector = "comments"]');
    var tagetFolderElement = target.closest('[data-selector = "' + this.DIR + '"]');
    var path;
    
    if(!targetAddComentBtn && !tagetFolderElement){
        return;
    }

    if(targetAddComentBtn){
        var element = targetAddComentBtn.closest('[data-selector = "dir-item"]');
        var event = new CustomEvent('showComments', {detail: element});
    }
    else if(tagetFolderElement){
        if(tagetFolderElement.classList.contains('up-directory')){
            path = this._cutLastDir(tagetFolderElement.getAttribute('data-path'));
        }
        else{
            path = tagetFolderElement.getAttribute('data-path');
        }
        
        var event = new CustomEvent('directoryChange', {detail: path});
    }

    this._element.dispatchEvent(event);
};

//DirectoriesTreeView.prototype._onAddCommentClicked = function(e){
//    e.stopPropagation();
//    var target = e.target.closest('[data-selector = "add-comment"]');
//    var event = new CustomEvent('addComment', {detail: target.getAttribute('data-path')});
//    this._element.dispatchEvent(event);
//};

DirectoriesTreeView.prototype._createTreeElement = function(treeElement, path){
    var li = document.createElement('li');
    var treeItem = this._createEreeItemElement(treeElement, path);
    
    li.setAttribute('class', treeElement.type);
    li.setAttribute('data-selector', 'dir-item');
    
    li.appendChild(treeItem);
    li.appendChild(this._createShowCommentsBtn());
    li.appendChild(this._createCommentsContainerElement());
    
    return li;
};


DirectoriesTreeView.prototype._createCommentsContainerElement = function(comments){
    var commentsContainer = document.createElement('div');
    commentsContainer.setAttribute('class', 'comments');
    commentsContainer.setAttribute('data-selector', 'comments-container');
    return commentsContainer;
};

DirectoriesTreeView.prototype._createEreeItemElement = function(treeElement, path){
    var treeItem = document.createElement('span');
    treeItem.innerText = treeElement.name;
    treeItem.setAttribute('data-selector', treeElement.type);
    treeItem.setAttribute('data-path', path + treeElement.name + '/');
    return treeItem
}

DirectoriesTreeView.prototype._createShowCommentFormBtn = function(){
    var showCommentFormBtn = document.createElement('button');
    showCommentFormBtn.setAttribute('class', 'show-comment-form-btn btn');
    showCommentFormBtn.innerText = '>';
    return showCommentFormBtn;
};

DirectoriesTreeView.prototype._createShowCommentsBtn = function(){
    var addCommentBtn = document.createElement('button');
    addCommentBtn.setAttribute('data-selector', 'comments');
    addCommentBtn.setAttribute('class', 'add-comment-btn');
    addCommentBtn.innerText = '+';
    return addCommentBtn;
};

DirectoriesTreeView.prototype._cutLastDir = function (path){
    if(path === './'){
        return path;
    }
    var pathArr = path.split('/');
    pathArr.length = pathArr.length - 2;
    return pathArr.join('/') + '/';
}


DirectoriesTreeView.prototype.renderComment = function(comentObj){
    var coment = document.createElement('div');
    coment.innerText = comentObj.commentText;
    
    var container = this._getCommentContainer(comentObj.path);
    container.appendChild(coment);
}

DirectoriesTreeView.prototype._getCommentContainer = function(path){
    return this._element
               .querySelector('[data-path="'+path+'"]')
               .parentNode
               .querySelector('[data-selector = "comments-container"]');
}


module.exports = DirectoriesTreeView;


