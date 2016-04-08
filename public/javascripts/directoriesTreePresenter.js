
var DirectoriesTreePresenter = (function(){
    "use strict";

    function DirectoriesTreePresenter(view){
        this._view = view;
        this._path = '.\\';

        this._init()
    }


    DirectoriesTreePresenter.prototype._init = function(){
        this._getDirectoryTree();

        this._view.onDirectoryClick(this.onDirectoryClick.bind(this));
    };

    DirectoriesTreePresenter.prototype.onDirectoryClick = function(e){
        this._path = e.detail;
        this._getDirectoryTree();
    };


    DirectoriesTreePresenter.prototype._getDirectoryTree = function(){
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET','api/'+encodeURI(_this._path), true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
        xhr.onreadystatechange = function(data){
            if (this.readyState !== 4){
                return;
            }

            if (this.status !== 200) {
                console.warn( 'Error: ' + (this.status ? this.statusText : 'folder not found.') );
                return;
            }
            if(this.responseText){
                _this._view.render(JSON.parse(this.responseText), _this._path);
            }
        };
    };

    return DirectoriesTreePresenter;
})();
