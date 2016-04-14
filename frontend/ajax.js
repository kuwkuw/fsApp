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