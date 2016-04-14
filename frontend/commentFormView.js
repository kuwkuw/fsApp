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
