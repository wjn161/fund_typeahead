//shumi namespace
var SM = SM || {};
//yibo init config
var _adwq = _adwq || [];
_adwq.push(['_setAccount', 'mjc7d']);
_adwq.push(['_setDomainName', '.fund123.cn']);
_adwq.push(['_trackPageview']);

SM.dspstat = (function () {
    var doc = document;
    /**
     * default config
     **/
    var defaults = {
        action: "default"
    };
    /**
     * constructor
     **/
    var Dspstat = function (config) {
        this.config = $.extend({}, defaults, config);
    };

    /**
     * tools
     **/
    var utils = {
        isFunction: function (obj) {
            return $.isFunction(obj);
        }
    };
    var jsLoader = {
        /**
        * copy from seajs 2.1.1 request module
        * https://github.com/seajs/seajs
        **/
        load: function (path, callbackFunc) {
            var head = doc.getElementsByTagName("head")[0] || doc.documentElement;
            var baseElement = head.getElementsByTagName("base")[0];

            var IS_CSS_RE = /\.css(?:\?|$)/i;
            var currentlyAddingScript;

            // `onload` event is not supported in WebKit < 535.23 and Firefox < 9.0
            // ref:
            // - https://bugs.webkit.org/show_activity.cgi?id=38995
            // - https://bugzilla.mozilla.org/show_bug.cgi?id=185236
            // - https://developer.mozilla.org/en/HTML/Element/link#Stylesheet_load_events
            var isOldWebKit = +navigator.userAgent
                .replace(/.*AppleWebKit\/(\d+)\..*/, "$1") < 536;
            function addOnload(node, callback, isCSS, url) {
                var supportOnload = "onload" in node;

                // for Old WebKit and Old Firefox
                if (isCSS && (isOldWebKit || !supportOnload)) {
                    setTimeout(function () {
                        pollCss(node, callback);
                    }, 1); // Begin after node insertion
                    return;
                }

                if (supportOnload) {
                    node.onload = onload;
                    node.onerror = function () {
                        console.log("error", { uri: url, node: node });
                        onload();
                    };
                }
                else {
                    node.onreadystatechange = function () {
                        if (/loaded|complete/.test(node.readyState)) {
                            onload();
                        }
                    };
                }

                function onload() {
                    // Ensure only run once and handle memory leak in IE
                    node.onload = node.onerror = node.onreadystatechange = null;

                    // Remove the script to reduce memory leak
                    if (!isCSS) {
                        head.removeChild(node);
                    }

                    // Dereference the node
                    node = null;

                    callback();
                }
            }

            function pollCss(node, callback) {
                var sheet = node.sheet;
                var isLoaded;

                // for WebKit < 536
                if (isOldWebKit) {
                    if (sheet) {
                        isLoaded = true;
                    }
                }
                    // for Firefox < 9.0
                else if (sheet) {
                    try {
                        if (sheet.cssRules) {
                            isLoaded = true;
                        }
                    } catch (ex) {
                        // The value of `ex.name` is changed from "NS_ERROR_DOM_SECURITY_ERR"
                        // to "SecurityError" since Firefox 13.0. But Firefox is less than 9.0
                        // in here, So it is ok to just rely on "NS_ERROR_DOM_SECURITY_ERR"
                        if (ex.name === "NS_ERROR_DOM_SECURITY_ERR") {
                            isLoaded = true;
                        }
                    }
                }

                setTimeout(function () {
                    if (isLoaded) {
                        // Place callback here to give time for style rendering
                        callback();
                    } else {
                        pollCss(node, callback);
                    }
                }, 20);
            }

            function request(url, callback, charset) {
                var isCSS = IS_CSS_RE.test(url);
                var node = doc.createElement(isCSS ? "link" : "script");

                if (charset) {
                    var cs = utils.isFunction(charset) ? charset(url) : charset;
                    if (cs) {
                        node.charset = cs;
                    }
                }

                addOnload(node, callback, isCSS, url);

                if (isCSS) {
                    node.rel = "stylesheet";
                    node.href = url;
                } else {
                    node.async = true;
                    node.src = url;
                }

                // For some cache cases in IE 6-8, the script executes IMMEDIATELY after
                // the end of the insert execution, so use `currentlyAddingScript` to
                // hold current node, for deriving url in `define` call

                // ref: #185 & http://dev.jquery.com/ticket/2709
                baseElement ?
                    head.insertBefore(node, baseElement) :
                    head.appendChild(node);

                currentlyAddingScript = null;
            }
            return request(path, callbackFunc, "utf-8");
        }
    };
    /**
     * prototypes
     **/
    Dspstat.prototype = {
        /**
        * loadScript
        **/
        loadScript: function (callback) {
            //移除了cookie判断
            var url = ("https:" == doc.location.protocol ? "https:" : "http:") + "//webstat.fund123.cn/adw.js";
            if (callback) {
                jsLoader.load(url, callback);
            } else {
                jsLoader.load(url, function () { });
            }
        },
        /**
         * set statistics action
         **/
        setStat: function () {
            var param = this.config;
            if (param) {
                _adwq.push(['_setAction',
                    '29kz4j',
                    param.action
                ]);
            }

        }
    };
    Dspstat.prototype.constructor = Dspstat;
    return {
        init: function (config) {
            var stat = $(this).data('Dspstat');//get from caches
            if (!stat) {
                stat = new Dspstat(config);//create
                $(this).data('Dspstat', stat);//cached
            }
            if (config && config.isLoadScript) {
                stat.loadScript(function () {
                    if (config.action) {
                        if (window.location.href.toLowerCase().indexOf('register/success') > -1) {
                            stat.setStat(config);
                        }
                    }
                });
            }
        }
    };
})();
$(function () {
    /*function getUserId() {
        if ($.cookie) {
            var userCookie = $.cookie("userMenu");
            if (userCookie) {
                eval(userCookie.replace(/\*{8}\!{2}/g, ";"));
                if (User.ID) {
                    return User.ID;
                }
            }
        }
        return null;
    }*/
    var result = { isLoadScript: true,action:'register' };
    /*var url = window.location.href.toLowerCase();   
    var domain = window.location.host.toLowerCase();
    var configs = {
        "webstat.fund123.cn":"all",
        "fund.fund123.cn": "all",
        "www.fund123.cn": "all",
        "gs.fund123.cn": "all",
        "action.fund123.cn": ["downapp", "shangtou", "discountrate"],
        "account.fund123.cn": ["Register/Register.aspx", "Register/Success.aspx"],
        "trade.fund123.cn": ["OpenAccount/Step1", "OpenAccount/Step2", "OpenAccount/Done"]
    };
    if (configs[domain] == "all") {
        result.isLoadScript = true;
    }
    else if ($.isArray(configs[domain])) {
        for (var i = 0; i < configs[domain].length; i++) {
            var page = configs[domain][i];
            if (url.indexOf(page.toLowerCase()) > -1) {
                result.isLoadScript = true;
                //result.action = "openAccount";//有这2个值就会发起动作请求
                //result.userId = getUserId();
                break;
            }
        }
    }*/
    if (SM && SM.dspstat) {
        SM.dspstat.init(result);
    }
});


