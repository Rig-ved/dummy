let afterElement = null;

window.getParameterByName=function(e,t) {
    t || (t = window.location.href), e = e.toString().replace(/[\[\]]/g, "\\$&");
    var n = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
    return n ? n[2] ? decodeURIComponent(n[2].replace(/\+/g, " ")) : "" : null
}

 window.generateCaptchaConfig=function(e,t) {
    var n = "(" + function(e) {
        var t = !1,
            n = function(e, c, a, r) {
                if (!t) {
                    var l = 0;
                    for (var o in e) {
                        if (++l > 15) break;
                        try {
                            if ("object" == typeof e[o] && a <= r) n(e[o], c, a + 1, r);
                            else if ("callback" == o) return void("function" == typeof e[o] ? (t = !0, e[o](c)) : "string" == typeof e[o] && "function" == typeof window[e[o]] && (t = !0, window[e[o]](c)))
                        } catch (e) {}
                    }
                }
            };
        if (!t && "undefined" != typeof ___grecaptcha_cfg && void 0 !== ___grecaptcha_cfg.clients) {
            var c = null;
            e: for (var a in ___grecaptcha_cfg.clients)
                for (var r in ___grecaptcha_cfg.clients[a])
                    if (___grecaptcha_cfg.clients[a][r] && "string" == typeof ___grecaptcha_cfg.clients[a][r].nodeName && "string" == typeof ___grecaptcha_cfg.clients[a][r].innerHTML && -1 != typeof ___grecaptcha_cfg.clients[a][r].innerHTML.indexOf("iframe") && (0 != ___grecaptcha_cfg.clients[a][r].offsetHeight || ___grecaptcha_cfg.clients[a][r].childNodes.length && 0 != ___grecaptcha_cfg.clients[a][r].childNodes[0].offsetHeight || "invisible" == ___grecaptcha_cfg.clients[a][r].dataset.size)) {
                        if (null === c) {
                            c = a;
                            break
                        }
                        c = null;
                        break e
                    } null !== c && n(___grecaptcha_cfg.clients[c], e, 1, 2)
        }
    } + ')("' + e + '");';
    c = t ? document.createElement("script") : document.getElementsByTagName("iframe")[0].createElement("script"), t ? (c.textContent = n, (document.head || document.documentElement).appendChild(c), c.remove()) : (c.textContent = n, (document.getElementsByTagName("iframe")[0].head || document.getElementsByTagName("iframe")[0].documentElement).appendChild(c), c.remove())
}

if(!window.generateCaptcha) {
    window.generateCaptcha = function(e,t){
         let n;
    null != (n = t ? document.getElementById("g-recaptcha-response") : document.getElementsByTagName("iframe")[0].getElementById("g-recaptcha-response")) && (n.style.display = "none", n.innerHTML = e, generateCaptchaConfig(e, t))
    }
}

let frames = document.getElementsByTagName("iframe"),
    found = !1;
for (let e = 0; e < frames.length; e++)
    if (null != frames[e].offsetParent) {
        let t = frames[e].getAttribute("src");
        if (null != t && (t.startsWith("https://www.google.com/recaptcha") || t.startsWith("https://www.recaptcha.net/recaptcha")) && (id = getParameterByName("k", t), "" != id && null != id)) {
            afterElement = frames[e], found = !0;
            break
        }
    } if (1 != found && frames.length > 0) {
    frames = document.getElementsByTagName("iframe")[0];
    for (let e = 0; e < frames.length; e++)
        if (null != frames[e].offsetParent) {
            let t = frames[e].getAttribute("src");
            if (null != t && (t.startsWith("https://www.google.com/recaptcha") || t.startsWith("https://www.recaptcha.net/recaptcha")) && (id = getParameterByName("k", t), "" != id && null != id)) {
                afterElement = frames[e];
                break
            }
        }
}

