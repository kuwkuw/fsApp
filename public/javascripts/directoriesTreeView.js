var DirectoriesTreeView = (function(){
    'using strict';
    
    function DirectoriesTreeView(options){
        "use strict";
        this.DIR = 'directory';
        this._element = options.element;

        this._init();
    }

    DirectoriesTreeView.prototype.render = function(dirTree, path){
        if(!dirTree){
            return;
        }

        var _this = this;
        this._directoriesTreeElement.innerHTML = '';
        this._upDirectoryElement.setAttribute('data-path', path + '..\\');
        dirTree.forEach(function(treeElement){
            _this._directoriesTreeElement.appendChild(_this._createTreeElement(treeElement, path));
        });
    };

    DirectoriesTreeView.prototype._init = function(){
        this._initUpDirectoryElement();
        this._initDirectoriesTreeElement();

        this._element.appendChild(this._upDirectoryElement);
        this._element.appendChild(this._directoriesTreeElement);

        this._element.addEventListener('click', this._onTreeElementClicked.bind(this));
        //this._element.addEventListener('click', this._onAddCommentClicked.bind(this));
    };

    DirectoriesTreeView.prototype.onDirectoryClick = function(hendler){
        this._element.addEventListener('directoryChange', hendler);
    };

    DirectoriesTreeView.prototype._onAddCommentClicked = function(hendler){
        this._element.addEventListener('addComment', hendler);
    };

    DirectoriesTreeView.prototype._initUpDirectoryElement = function(){
        this._upDirectoryElement = document.createElement('span');
        this._upDirectoryElement.setAttribute('class', 'up-directory');
        this._upDirectoryElement.setAttribute('data-selector', this.DIR);
        this._upDirectoryElement.setAttribute('data-path', '.\\..\\');
        this._upDirectoryElement.innerText = '..';
    };

    DirectoriesTreeView.prototype._initDirectoriesTreeElement = function(){
        this._directoriesTreeElement = document.createElement('ul');
        this._directoriesTreeElement.setAttribute('class', 'directories-tree-container');
        this._directoriesTreeElement.setAttribute('data-selector', 'directories-tree');
    };

    DirectoriesTreeView.prototype._onTreeElementClicked = function(e){
        var target = e.target;
        var targetAddComentBtn = target.closest('[data-selector = "add-comment"]');
        var tagetFolderElement = target.closest('[data-selector = "' + this.DIR + '"]');
        var path;
        
        if(!targetAddComentBtn && !tagetFolderElement){
            return;
        }

        if(targetAddComentBtn){
            path = targetAddComentBtn.closest('.directory').querySelector('[data-selector = "' + this.DIR + '"]').getAttribute('data-path');
            var event = new CustomEvent('addComment', {detail: path});
        }
        else if(tagetFolderElement){
            path = tagetFolderElement.getAttribute('data-path');
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
        var span = document.createElement('span');
        
        li.setAttribute('class', treeElement.type);
        
        span.innerText = treeElement.name;
        span.setAttribute('data-selector', treeElement.type);
        span.setAttribute('data-path', path + treeElement.name + '\\');
        
        li.appendChild(span);
        li.appendChild(this._createAddCommentBtn());
        return li;
    };

    DirectoriesTreeView.prototype._createShowCommentFormBtn = function(){
        var showCommentFormBtn = document.createElement('button');
        showCommentFormBtn.setAttribute('class', 'show-comment-form-btn btn');
        showCommentFormBtn.innerText = '>';
        return showCommentFormBtn;
    };

    DirectoriesTreeView.prototype._createAddCommentBtn = function(){
        var addCommentBtn = document.createElement('button');
        addCommentBtn.setAttribute('data-selector', 'add-comment');
        addCommentBtn.setAttribute('class', 'add-comment-btn');
        addCommentBtn.innerText = '+';
        return addCommentBtn;
    };

    return DirectoriesTreeView;
})();

