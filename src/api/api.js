import $ from 'jquery'
import vue from 'vue'
// api
export default class Api {
    constructor() {
        this.apikey = "test";
        this.version = "1";
        this.apiUrl = {
            selectAdvList: "selectAdvList",
            login: "user/login",
            queryReArticleHotList:"cms_new/queryReArticleHotList"
        };
    }
    reqNewAjaxAsync(url, data) {
        let _this = this;
        let defer = $.Deferred();
        $.ajax({
            type: "POST",
            url:'/zxcity_restful/ws/rest/',
            dataType: "json",
            async: true, //默认为异步
            headers: {
                apikey: "test"
            },
            data: {
                "cmd": url,
                "data": JSON.stringify(data) || "",
                "version": _this.version
            },
            success: function(data) {
                defer.resolve(data);
            },
            error: function(err) {
                defer.resolve(err);
                console.log(err.status + ":" + err.statusText);
            }
        });
        return defer.promise();
    }
}