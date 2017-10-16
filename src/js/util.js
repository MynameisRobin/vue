/**
 * author:  qiurui
 * name:    公用js
 * date:    2017/4/18
 * version: 1.0.0
 */
var apikey = sessionStorage.getItem('apikey') || ""; //获取缓存 通行证码
var version = sessionStorage.getItem('version') || "1"; //获取缓存 版本号
var userId = sessionStorage.getItem("userId") || ""; //获取用户id

var mobileExp = /^1[3,5,7-8][0-9]{9}$/i; //手机正则
var passwordExp = /^(?![^a-zA-Z]+$)(?!\D+$)[0-9a-zA-Z]{6,16}$/; //密码正则
var messageExp = /^[0-9]{6}$/; //验证码正则
var nameExp = /^[\u4E00-\u9FA5]{2,10}$/; //真实姓名
var emailExp = /^[a-z0-9]+([._\-]*[a-z0-9])*@([-a-z0-9]*[a-z0-9]+.){2,63}[a-z0-9]+$/i; //邮箱绑定
var videoExp = /[·\~\`\!\^\￥\……\！\$\@\(\)\（\）\_\——\#\+\*\/\-\=\$%\^&\*]{1,20}$/g; //视频
var address = /^[A-Za-z0-9#\(\)（）\u4E00-\u9FA5]{1,50}$/; //地址
var amountExp = /^([1-9]{1}[0-9]{0,7}|0){1}(.[0-9]{1,2}){0,1}$/; //金额
var idcard = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/; //身份证
var $company_name = /^[A-Za-z\u4E00-\u9FA5]{1,90}$/; //企业名称
var $website = /^((http:\/\/)|(https:\/\/))[0-9a-zA-Z-.]{1,90}$/; //网址

/**
 * 检查登录状态
 */
export function checkUserLogin() {
    if (sessionStorage.getItem("scSysUserInfo") == null) {
        //alert('您还没有登录！');
        location.href = 'login.html';
        return false;
    } else {
        var scSysUserInfo = JSON.parse(sessionStorage.getItem("scSysUserInfo"));
        console.log('当前登录平台ID：' + scSysUserInfo.id);
        console.log('当前登录平台用户：' + scSysUserInfo.username);
    }
}

//ajax验证是否匹配key值
export function isApikey(res) {
    if (res.code == 8) {
        location.href = "login.html";
    }
}

//校验正则表达式
export function reg(val, exp) {
    if (!exp.test(val)) {
        return false;
    } else {
        return true;
    }
}
//判断视频名称
export function is_video(val) {
    return reg(val, videoExp);
}
//判断地址
export function is_address(val) {
    return reg(val, address);
}
//判断金额
export function is_amount(val) {
    return reg(val, amountExp);
}
//判断真实姓名正则
export function is_name(val) {
    return reg(val, nameExp);
}
//判断手机正则
export function is_mobile(val) {
    return reg(val, mobileExp);
}
//判断密码正则
export function is_password(val) {
    return reg(val, passwordExp);
}
//判断验证码正则
export function is_message(val) {
    return reg(val, messageExp);
}
//判断推荐码正则
export function is_okey(val) {
    return reg(val, okeyExp);
}
//判断邮箱正则
export function is_email(val) {
    if (val.length > 50) {
        return false;
    }
    return reg(val, emailExp);
}
//判断企业名称
export function is_company_name(val) {
    return reg(val, $company_name);
}
//判断省份
export function is_province(val) {
    return reg(val, $province);
}
//判断城市
export function is_city(val) {
    return reg(val, $city);
}
//判断身份证方法
export function is_identity(id) {
    var strlen = id.length;
    if (strlen != 18) {
        return false;
    }
    var set = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var ver = ['1', '0', 'x', '9', '8', '7', '6', '5', '4', '3', '2'];
    var arr = id.split("");
    var sum = 0;
    for (var i = 0; i < 17; i++) {
        if (isNaN(arr[i])) {
            return false;
        }
        sum += arr[i] * set[i];
    }
    var mod = sum % 11;
    if (ver[mod] != arr[17]) {
        if (mod == 2) {
            if (arr[17] == "X" || arr[17] == "x") {
                return true;
            }
        }
        return false;
    }
    return true;
}

//计算倒计时,dom&时间戳
export function countdown(dom, closeTime) {
    var displayTime;

    function showTime() {
        var day = Math.floor(closeTime / (60 * 60 * 24));
        var hour = Math.floor(closeTime / (3600)) - (day * 24);
        var minute = Math.floor(closeTime / (60)) - (day * 24 * 60) - (hour * 60);
        var second = Math.floor(closeTime) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        closeTime -= 1;
        var html = day + '天' + hour + '小时' + minute + '分' + second + '秒';
        dom.html(html);
        if (closeTime == -1) {
            clearInterval(displayTime);
            document.location.href = document.location.href;
            return;
        }
    }
    showTime();
    displayTime = setInterval(function() {
        showTime();
    }, 1000)
}

//把数组字符串转换为数字
export function strToNum(arr) {
    var json = [];
    for (var i = 0; i < arr.length; i++) {
        json.push(arr[i] - 0);
    }
    return json;
}

//判断正整数加".00"
export function isPositiveNum(s) {
    var re = /^[0-9]*[1-9][0-9]*$/;
    if (re.test(s)) {
        s = s + ".00";
    }
    return s;
}

/**
 * 操作cookie
 * @param key 
 * @param val
 * @param exp 有效期单位为秒
 */
export function setCookie(key, val, exp) {
    var d = new Date();
    d.setTime(d.getTime() + exp * 1000); //1000为毫秒
    var expires = "expires=" + d.toUTCString();
    document.cookie = key + "=" + val + ";" + expires + ";path=/";
}

export function getCookie(key) {
    var cookieArr = document.cookie.split(';');
    for (var i = 0; i < cookieArr.length; i++) {
        var u = cookieArr[i];
        u = u.replace(/(^\s*)|(\s*$)/g, '');
        var d = u.split('=');
        if (key == d[0]) {
            return d[1];
        }
    }
}

export function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

// 数字动画
export function countUp(dom, val) {
    var options = {  
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
    };
    var val = val - 0;
    var demo = new CountUp(dom, 0, val, 0, 1, options);
    demo.start();
}

//判断input输入长度
export function inputLen(inputStar) {
    var bytesCount = 0;
    for (var i = 0; i < inputStar.length; i++) {
        var c = inputStar.charAt(i);
        bytesCount += 1;
    }
    return bytesCount;
}

//判断是否为空
export function isNull(val) {
    if (val == null || val == "null" || val == undefined || val == "") {
        return true;
    }
    return false;
}

//删除数组指定元素
export function removeByValue(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
}
/**
 * 获取地址栏URL里的参数集
 */
export function getParams(url) {
    // var url = location.search;
    var params = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            params[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return params;
}

/**
 * 根据参数名获取地址栏URL里的参数
 */
export function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 * @desc 将时间戳转换为YYYY-MM-DD格式
 * @access public
 * @param 时间戳
 * @return string
 */
export function formatDate(now) {
    var d = new Date(now * 1000);
    var month = parseInt(d.getMonth()) + 1;
    var day = parseInt(d.getDate());
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return d.getFullYear() + "-" + month + "-" + day;
}

  export function format(d, fmt) {
    if (!fmt) fmt = 'yyyy-MM-dd'
    var date = new Date(d)
    if (date === 'Invalid Date') return ''
    var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    return fmt;
}

/**
 * @desc 将时间戳转换为YYYY-MM-DD HH:ii
 * @access public
 * @param
 * @return string
 */
export function formatDateTime(now) {
    var d = new Date(now * 1000);
    var hour = parseInt(d.getHours());
    var minute = parseInt(d.getMinutes());
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    return formatDate(now) + " " + hour + ":" + minute;
}

/**
 * @desc 金额转换，保留2位小数并四舍五入
 * @author：qiurui
 * @param  num / string : 1000.59
 * @return string : 1,000.60
 */
export function getMoneyFormat(number) {
    number = number + ''; //数字转换成字符串
    number = number.replace(/\,/g, ""); //将 , 转换为空
    //判断是否是数字
    if (isNaN(number) || number == "") {
        return "";
    }
    //四舍五入,保留2位
    number = Math.round(number * 100) / 100;
    //是否是负数
    if (number < 0) {
        return '-' + getFormatYuan(Math.floor(Math.abs(number) - 0) + '') + getFormatCents(Math.abs(number) - 0);
    } else {
        return getFormatYuan(Math.floor(number - 0) + '') + getFormatCents(number - 0);
    }
    //格式化整数
    function getFormatYuan(number) {
        //判断是否是0.几几
        if (number.length <= 3) {
            return (number == '' ? '0' : number);
        } else {
            var mod = number.length % 3; //求余
            //截取字符开头的数字
            var output = (mod == 0 ? '' : (number.substring(0, mod)));
            for (var i = 0; i < Math.floor(number.length / 3); i++) {
                //mod==0 && i==0 说明数字的长度被3整除；第一次循环的时候截取（0,3）位
                if ((mod == 0) && (i == 0)) {
                    output += number.substring(mod + 3 * i, mod + 3 * i + 3);
                } else {
                    output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
                }
            }
            return (output);
        }
    }
    //格式化小数
    function getFormatCents(amount) {
        amount = Math.round(((amount) - Math.floor(amount)) * 100);
        return (amount < 10 ? '.0' + amount : '.' + amount);
    }
}

//获取城市列表和领域列表
export function getCity() {
    reqAjaxAsync("cms_back/selectByParentCode", "{'parentCode':'0'}").done(function(re) {
        if (re.code == 9) {
            layer.msg(re.msg);
            return false;
        }
        var province = re.data || [];
        var provinceHtml = '';
        for (var p = 0; p < province.length; p++) {
            provinceHtml += '<option value="' + province[p].code + '">';
            provinceHtml += province[p].areaname;
            provinceHtml += '</option>';
        }
        $('select[name="province"]').append(provinceHtml).attr('onchange', 'showCity()');
    });
}

function showCity() {
    var pid = $('select[name="province"] option:selected').val();
    reqAjaxAsync("cms_back/selectByParentCode", "{'parentCode':'" + pid + "'}").done(function(re) {
        var city = re.data || [];
        var cityHtml = '';
        if (city.length > 0) {
            for (var c = 0; c < city.length; c++) {
                cityHtml += '<option value="' + city[c].code + '">';
                cityHtml += city[c].areaname;
                cityHtml += '</option>';
            }
            $('select[name="city"]').html(cityHtml).css({
                'opacity': 1
            });
        } else {
            $('select[name="city"]').html(cityHtml).css({
                'opacity': 0
            });
        }
    });
}

//上传头像方法

var uploadJson = {
    accessid: '',
    accesskey: '',
    host: '',
    policyBase64: '',
    signature: '',
    callbackbody: '',
    filename: '',
    key: '',
    expire: 0,
    g_object_name: '',
    g_object_name_type: '',
    now:  Date.parse(new Date()) / 1000
};


function send_request() {
    layer.load(0, {
        shade: [0.1, '#fff']
    });
    var xmlhttp = null;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlhttp != null) {
        serverUrl = '/zxcity_restful/ws/oss/ossUpload';
        xmlhttp.onreadystatechange = callbacksuccess;
        xmlhttp.open("POST", serverUrl, false);
        layer.closeAll('loading');
        xmlhttp.send(null);

        function callbacksuccess() {
            layer.closeAll('loading');
            if (xmlhttp.status == 200) {
                layer.msg("上传中，请耐心等待!");
            } else {
                layer.msg("系统繁忙，请稍后再试");
            }
        }
        return xmlhttp.responseText;
    } else {
        alert("Your browser does not support XMLHTTP.");
    }
};

function check_object_radio() {
    var tt = document.getElementsByName('myradio');
    for (var i = 0; i < tt.length; i++) {
        if (tt[i].checked) {
            g_object_name_type = tt[i].value;
            break;
        }
    }
}

//可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
function get_signature() {
    now = timestamp = Date.parse(new Date()) / 1000;
    if (uploadJson.expire < now + 3) {
        body = send_request()
        var obj = eval("(" + body + ")");
        uploadJson.host = obj['host']
        uploadJson.policyBase64 = obj['policy']
        uploadJson.accessid = obj['accessid']
        uploadJson.signature = obj['signature']
        uploadJson.expire = parseInt(obj['expire'])
        uploadJson.callbackbody = obj['callback']
        uploadJson.key = obj['dir']
        return true;
    }
    return false;
};

function random_string(len) {
    len = len || 32;　　
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';　　
    var maxPos = chars.length;　　
    var pwd = '';　　
    for (i = 0; i < len; i++) {　　
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

//得到文件名的后缀
function get_suffix(filename) {
    pos = filename.lastIndexOf('.')
    suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}

//得到文件是本地名还是随机名
function calculate_object_name(filename) {
    g_object_name = g_object_name + '/' + randomString(file.name);
    // g_object_name = g_object_name + '/' + "${filename}"
    return '';
}

function get_uploaded_object_name(filename) {
    tmp_name = g_object_name
    tmp_name = tmp_name.replace("${filename}", filename);
    return tmp_name
}

//返回一个随机数字名称
function randomString(importUrl) {
    var importUrl = /\.[^\.]+$/.exec(importUrl);
    var d = new Date().getTime();
    var random = parseInt(Math.random() * 1000);
    return "zx" + random_string(24) + importUrl;
}

function set_upload_param(up, filename, ret) {
    if (ret == false) {
        ret = get_signature()
    }
    g_object_name = uploadJson.key; //目录
    if (filename != '') {
        // suffix = get_suffix(filename) //得到后缀
        // calculate_object_name(filename) //得到本地或者随机名
        g_object_name = g_object_name + '/' + randomString(filename);
    }
    new_multipart_params = {
        'key': g_object_name,
        'policy': uploadJson.policyBase64,
        'OSSAccessKeyId': uploadJson.accessid,
        'success_action_status': '200', //让服务端返回200,不然，默认会返回204
        'callback': uploadJson.callbackbody,
        'signature': uploadJson.signature,
    };
    up.setOption({
        'url': uploadJson.host,
        'multipart_params': new_multipart_params
    });
    up.start();
}

//配置
function filter(data) {
    var obj = "";
    if (data.flag == "video" || data.flag == "editorVideo") {
        obj = [{
            title: "files",
            extensions: "mpg,m4v,mp4,flv,3gp,mov,avi,rmvb,mkv,wmv"
        }]
    } else {
        obj = [{
            title: "Image files",
            extensions: "jpg,gif,png,bmp"
        }, {
            title: "Zip files",
            extensions: "zip,rar"
        }];
    }
    return obj;
}

//上传OSS
function uploadOss(data) {
    var uploaderLabel = new plupload.Uploader({
        runtimes: 'html5,flash,silverlight,html4',
        browse_button: data.btn,
        //multi_selection: false, 
        // container: document.getElementById(data.dom),
        flash_swf_url: '../assets/plupload-2.1.2/js/Moxie.swf',
        silverlight_xap_url: '../assets/plupload-2.1.2/js/Moxie.xap',
        url: 'http://oss.aliyuncs.com',
        filters: {
            mime_types: filter(data),
            max_file_size: data.size || "50mb", //最大只能上传50mb的文件
            prevent_duplicates: false //不允许选取重复文件
                // prevent_duplicates: true //不允许选取重复文件
        },
        //分片上传文件时，每片文件被切割成的大小，为数字时单位为字节。也可以使用一个带单位的字符串，如"200kb"。当该值为0时表示不使用分片上传功能
        // chunk_size: "5mb",
        init: {
            PostInit: function() {
                if (data.flag == "sendLocal") {
                    document.getElementById('ossfile').innerHTML = '';
                } else if (data.flag == "send" || data.flag == "video" || data.flag == "editorVideo" || data.flag == "cover") {
                    document.getElementById('videoProgress').innerHTML = '';
                }
            },
            FilesAdded: function(up, files) {
                set_upload_param(uploaderLabel, '', false);
                if (data.flag == "sendLocal") {
                    document.getElementById(data.btn).disabled = true;
                    plupload.each(files, function(file) {
                        document.getElementById('ossfile').innerHTML = '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>' +
                            '<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>' +
                            '</div>';
                    });
                } else if (data.flag == "send" || data.flag == "video" || data.flag == "editorVideo" || data.flag == "cover") {
                    document.getElementById(data.btn).disabled = true;
                    plupload.each(files, function(file) {
                        document.getElementById('videoProgress').innerHTML = '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>' +
                            '<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>' +
                            '</div>';
                    });
                }
            },
            BeforeUpload: function(up, file) {
                check_object_radio();
                set_upload_param(up, file.name, true);
            },
            UploadProgress: function(up, file) {
                if (data.flag == "send" || data.flag == "sendLocal" || data.flag == "video" || data.flag == "editorVideo" || data.flag == "cover") {
                    var d = document.getElementById(file.id);
                    d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
                    var prog = d.getElementsByTagName('div')[0];
                    var progBar = prog.getElementsByTagName('div')[0];
                    progBar.style.width = file.percent + "%";
                    progBar.setAttribute('aria-valuenow', file.percent);
                    // progBar.style.width = 2 * file.percent + 'px';
                }
            },
            FileUploaded: function(up, file, info) {
                if (info.status == 200) {
                    if (data.flag == "reg") {
                        return regCallback(file, data);
                    } else if (data.flag == "send") {
                        return sendCallback(file, data);
                    } else if (data.flag == "editorVideo") {
                        return sendEditorVideoCallback(file, data);
                    } else if (data.flag == "cover") {
                        return sendVideoCoverCallback(file, data);
                    } else if (data.flag == "sendLocal") {
                        document.getElementById(data.btn).disabled = false;
                        return sendLocalCallback(file, data);
                    } else if (data.flag == "sendLocals") {
                        document.getElementById(data.btn).disabled = false;
                        return sendLocalCallbacks(file, data);
                    } else if (data.flag == "video") {
                        document.getElementById(data.btn).disabled = false;
                        return sendVideoCallback(file, data);
                    } else if (data.flag == "add") {
                        return sendAddImageCallback(file, data);
                    } else {
                        console.log("请传递标记");
                    }
                } else {
                    document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
                }
            },

            Error: function(up, err) {
                if (err.code == -600) {
                    layer.msg("选择的文件过大");
                } else if (err.code == -601) {
                    layer.msg("选择的文件后缀不对");
                } else if (err.code == -602) {
                    layer.msg("这个文件已经上传过一遍了");
                } else {
                    layer.msg("系统繁忙，请稍后再试!");
                    console.log(err.response);
                }
            }
        }
    });
    uploaderLabel.init();
}

//注册资料上传回调
function regCallback(file, data) {
    layer.msg("上传成功");
    //获取文件后缀名
    var urls = uploadJson.host + "/" + get_uploaded_object_name(file.name);
    var imgName = file.name;
    imgName = imgName.substr(0, imgName.indexOf('.'));
    var img = new Image();
    var fr = new mOxie.FileReader();
    img.onload = function() {
        this.onload = null;
        document.getElementById(data.imgDom).setAttribute("src", urls);
    };
    img.src = urls;
}

//发表页面编辑器上传回调
function sendCallback(file, data) {
    layer.msg("上传成功");
    var img, img2, width, height;
    var urls = uploadJson.host + "/" + get_uploaded_object_name(file.name);
    var imgName = get_uploaded_object_name(file.name);
    imgName = imgName.substr(0, imgName.indexOf('.')).replace("user-dir/", "");
    localStorage.setItem("urls", urls);
    img = "<img src='" + urls + "' class='editor_img " + imgName + "' />";
    data.editor.insertHtml(img);
    var html = data.editor.html();
    //图片宽高
    img2 = "<img src='" + urls + "' class='editor_img" + imgName + "' width='170' height='170' style='margin:20px;'/>";
    data.imgArr.push(img2);
    var userId = sessionStorage.getItem("userId") || "";
    var editorTxt = sessionStorage.setItem("editorTxt_" + userId, html);
    sessionStorage.setItem("html", html);
    sessionStorage.setItem("imgArr", data.imgArr);
}

//发表页面编辑器上传视频
function sendEditorVideoCallback(file, data) {
    layer.msg("上传成功");
    var videoUrls = uploadJson.host + "/" + get_uploaded_object_name(file.name);
    var videoName = get_uploaded_object_name(file.name);
    videoName = videoName.substr(0, videoName.indexOf('.'));
    $("#videoHide").html($("<video src='" + videoUrls + "' controls='controls' style='max-width:950px;'></video>"));
    layer.msg("请上传视频封面!");
}

//发表页面编辑器上传视频的封面
function sendVideoCoverCallback(file, data) {
    layer.msg("上传成功");
    var urls = uploadJson.host + "/" + get_uploaded_object_name(file.name);
    $("#videoHide").find("video").attr("poster", urls);
    $("#videoHide").html($("#videoHide").html());
}

//发表页面本地上传回调
function sendLocalCallback(file, data) {
    layer.msg("上传成功");
    var urls = uploadJson.host + "/" + get_uploaded_object_name(file.name);
    localStorage.setItem("urls", urls);
    var img = "<img src='" + urls + "' class='editor_img' width='170' height='170' style='margin:20px;' />";
    document.getElementById(data.imgDom).innerHTML = img;
}

//发表多图本地上传回调
function sendLocalCallbacks(file, data) {
    layer.msg("上传成功");
    var urls = uploadJson.host + "/" + get_uploaded_object_name(file.name);
    localStorage.setItem("urls", urls);
    var img = "<img src='" + urls + "' class='editor_img' width='170' height='170' style='margin:20px;' />";
    $("#" + data.imgDom).append(img);
}

//上传视频
function sendVideoCallback(file, data) {
    layer.msg("上传成功");
    var videoUrls = uploadJson.host + "/" + get_uploaded_object_name(file.name);
    var videoName = get_uploaded_object_name(file.name);
    videoName = videoName.substr(0, videoName.indexOf('.'));
    $("#videoHide").html($("<video src='" + videoUrls + "' controls='controls' style='max-width:950px;'></video>"))
    sessionStorage.setItem("videoUrls", videoUrls);
}

//图集添加图片
function sendAddImageCallback(file, data) {
    layer.msg("上传成功");
    var urls = uploadJson.host + "/" + get_uploaded_object_name(file.name);
    var imgName = get_uploaded_object_name(file.name);
    var str = '';
    str += '<div class="atlas-upload"><ul class="clearfix atlas-item"><li class="img">';
    str += '<img class="editor_img" src="' + urls + '" width="110" height="110"  name="' + imgName + '" /></li><li class="imgdesc"><textarea class="form-input" name="imgdesc" maxlength="200" placeholder="图片描述(不超过200个字)"></textarea></li>';
    str += '<li class="imgoperate"><a><i class="fa fa-trash-o fa-2x" name="delI"></i></a>';
    str += '</li></ul></div>';
    $('#ossfile2').append(str);
    // document.getElementById('ossfile2').innerHTML += '<div class="atlas-upload"><ul class="clearfix atlas-item"><li class="img">' +
    //     '<img src="' + urls + '" width="110" height="110"  name="' + imgName + '" /></li><li class="imgdesc"><textarea class="form-input" name="imgdesc" placeholder="图片描述(不超过200个字)"></textarea></li>' +
    //     '<li class="imgoperate"><a><i class="fa fa-image fa-2x"></i></a><a><i class="fa fa-trash-o fa-2x" name="delI"></i></a><a><i class="fa fa-bars fa-2x"></i></a>' +
    //     '</li></ul></div>';
}

//初始化kindeditor
function kindInit() {
    var editor = KindEditor.create('#applicationform', {
        items: [
            "source", "|", "undo", "redo", "|", "preview", "code", "cut", "copy", "paste", "plainpaste", "wordpaste", "|", "justifyleft", "justifycenter", "justifyright", "justifyfull", "insertorderedlist", "insertunorderedlist", "indent", "outdent", "subscript", "superscript", "clearhtml", "quickformat", "selectall", "|", "fullscreen", "/", "formatblock",
            "fontname", "fontsize", "|", "forecolor", "hilitecolor", "bold", "italic", "underline", "strikethrough", "lineheight", "removeformat", "|", "images", "table", "hr", "anchor", "link", "unlink", "|", "about"
        ],
        resizeType: 1
    });
    return editor;
}

//获取所有的标签
function getQueryArticleLabelAjax(cmd, dom, zxSelected, channelId) {
    var Response = JSON.stringify({
        userId: userId,
        channelId: channelId
    });
    dom.html("");
    $.ajax({
        type: "POST",
        url: "/zxcity_restful/ws/rest",
        dataType: "json",
        async: false,
        data: {
            "cmd": cmd,
            "version": "1",
            "data": Response
        },
        beforeSend: function(res) {
            layer.load(0, {
                shade: [0.1, '#fff']
            });
            res.setRequestHeader("apikey", apikey)
        },
        success: function(res) {
            isApikey(res);
            layer.closeAll('loading');
            if (res.code == 1) {
                var data = res.data || "";
                var btn = "";
                $.each(data, function(i, v) {
                    btn += '<button class="btn btn-default mr10 mt10 ' + zxSelected + '" labelId="' + v.labelId + '">' + v.labelName + '</button>';
                });
                dom.append(btn);
            } else {
                layer.msg(res.msg);
            }
        },
        error: function() {
            layer.closeAll('loading');
            layer.msg("获取所有标签失败,请稍后再试");
        }
    })
}

//文章标题按键事件
function getKeyup(txt, len) {
    txt.keyup(function() {
        // $(this).val($(this).val().replace(/\s/g, ""));
        var thisLen = $(this).val().length;
        len.text(thisLen);
    });
}

// 设置创客咖啡的id
function getCoffeeUserId() {
    return 53899;
}

// 格式化图片内style标签
function formatImg(html) {
    var newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
        var match = match.replace(/style=\"(.*)\"/gi, '');
        return match;
    });
    return newContent;
}