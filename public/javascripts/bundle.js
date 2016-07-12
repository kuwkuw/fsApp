/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DirectoriesTreeView = __webpack_require__(1);
	var DirectoriesTreePresenter = __webpack_require__(2);

	var view = new DirectoriesTreeView({
	    element: document.querySelector("[data-component='dir-tree']")
	});

	var presenter = new DirectoriesTreePresenter(view);


/***/ },
/* 1 */
/***/ function(module, exports) {

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




/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var CommentFormView = __webpack_require__(3);
	var Ajax = __webpack_require__(4);

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



/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	function CommentFormView(){
	    
	    this._init();
	}

	CommentFormView.prototype.show = function(element){
	    element.appendChild(this.element);
	};

	CommentFormView.prototype.hide = function(){
	    this.element.outerHTML = '';
	};

	CommentFormView.prototype.onAddComment = function(hendler){
	    this._addComentHendler = hendler;
	};

	CommentFormView.prototype._init = function () {
	    this.element = document.createElement('div');
	    this.element.setAttribute('class', 'add-caomment-form');
	    
	    var commentText = document.createElement('textarea');
	    //commentText.setAttribute('type', 'textarea');
	    commentText.setAttribute('data-selector', 'coment-text');
	    
	    var addCommentBtn = this._createBtnElement({
	        selector:'add-new-coment',
	        value: 'Add'
	        
	    });
	    
	    addCommentBtn.addEventListener('click', this._addCommentClicked.bind(this));
	    
	    var cencelBtn = this._createBtnElement({
	        selector: 'cencel',
	        value: 'cencel'
	    })
	    
	    this.element.appendChild(commentText);
	    this.element.appendChild(addCommentBtn);
	    this.element.appendChild(cencelBtn);
	}

	CommentFormView.prototype._createBtnElement =  function(options){
	    var btn = document.createElement('input');
	    btn.setAttribute('type', 'button');
	    btn.setAttribute('data-selector', options.selector);
	    btn.value = options.value;
	    
	    return btn;
	}

	CommentFormView.prototype._addCommentClicked = function(e){
	    var path = e.target
	                .closest('[data-selector = "dir-item"]')
	                .querySelector('[data-path]')
	                .getAttribute('data-path');
	    var commentText =  e.target
	                        .closest('.add-caomment-form')
	                        .querySelector('[data-selector = "coment-text"]').value;
	    if(commentText === ''){
	        return;
	    }
	    var comment = {
	        path: path,
	        commentText: commentText
	    };
	   this._addComentHendler(comment);
	}

	module.exports = CommentFormView;


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	 
	var Ajax = {
	    get: function(options){
	        this.ajax({
	            method: 'GET',
	            url: options.url,
	            callBack: options.callBack,
	            errorCallBack: options.errorCallBack
	        });
	    },
	    post: function(options){
	        this.ajax({
	            method: 'POST',
	            url: options.url,
	            body: options.body,
	            callBack: options.callBack,
	            errorCallBack: options.errorCallBack
	        });
	    },
	    ajax: function(options){
	        var xhr = new XMLHttpRequest();
	        xhr.open(options.method, options.url , true);
	        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	        xhr.send(options.body);
	        xhr.onreadystatechange = function(){
	            if (this.readyState !== 4){
	                return;
	            }
	            if (this.status !== 200) {
	                options.errorCallBack();
	                return;
	            }
	            if(this.responseText){
	                options.callBack(JSON.parse(this.responseText));
	            }
	        };
	    }
	}

	module.exports = Ajax;

/***/ }
/******/ ]);