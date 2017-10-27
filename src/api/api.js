import $ from 'jquery'
import vue from 'vue'
// api
export default class Api {
    constructor() {
        this.apikey = "test";
        this.version = "1";
        this.apiUrl = {
            // 登录
            login: "user/login",
            // 首页查询阅读量
            AllSubScriptionByUserId: "cms_back/AllSubScriptionByUserId",
            // 首页公告
            selectNoticeList: "cms_new/selectNoticeList",
        };
    }
    reqNewAjaxAsync(url, data) {
        let _this = this;
        let defer = $.Deferred();
        $.ajax({
            type: "POST",
            url: '/zxcity_restful/ws/rest/',
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
                defer.reject(err);
                console.log(err.status + ":" + err.statusText);
            }
        });
        return defer.promise();
    }
}