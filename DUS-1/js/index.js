/*! Durham University - v0.1.0 - 2019-03-20
 * http://www.dur.ac.uk/
 * Copyright (c) 2019 Durham University;
 */
function exists(variable) {
    return "undefined" != typeof variable && variable !== !1
}

function getURL(domObject) {
    var u = domObject.attr("data-href");
    return exists(u) || (u = document.URL), !!exists(u) && u
}

function getTitle(domObject) {
    var t = domObject.attr("data-title");
    return exists(t) || (t = document.title), exists(t) || (t = ""), t
}

function getCount(shareUrl, entity) {
    $.getJSON(shareUrl + "&callback=?", function (data) {
        var count = 0;
        if (exists(data.share)) {
            var share = data.share;
            exists(share.share_count) && $.isNumeric(share.share_count) && (count = share.share_count)
        }
        if (exists(data.count) && $.isNumeric(data.count) && (count = data.count), count > 999999) count = "1m+"; else if (count > 999) {
            var thousands = Math.round(count / 1e3);
            count = thousands.toString() + "k"
        }
        entity.html(count)
    }).fail(function () {
        entity.html("?")
    })
}

function getCounts(domObj, url) {
    var services = {
        linkedin: "//www.linkedin.com/countserv/count/share?lang=en_US&url=",
        google: "/scripts/social/googleplus.php?u=",
        facebook: "//graph.facebook.com/?id="
    };
    domObj.find("a").each(function () {
        var parent = $(this).parent(".share-button"), provider = $(this).attr("data-provider"),
            count = $(this).find(".social-count");
        exists(provider) && exists(services[provider]) ? (count.css("display", "inline-block"), $("html").hasClass("lt-ie9") && (domObj.hasClass("small-icons") ? parent.width(50) : parent.width(72)), getCount(services[provider] + url, count)) : count.hide()
    })
}

function openPopup() {
    $(".durham-share a").click(function () {
        var href = $(this).attr("href");
        return window.open(href, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600"), !1
    })
}

function showBookmarkCounts() {
    $(".durham-share").each(function () {
        var url = (uuid(), getURL($(this)));
        getTitle($(this));
        getCounts($(this), url)
    })
}

function showCourseContent(element) {
    element.addClass("selected"), element.find(".body").each(function () {
        $(this).slideDown(400, function () {
            var offset = element.offset();
            window.scrollTo(0, offset.top)
        })
    })
}

function hideCourseContent(element) {
    element.removeClass("selected"), element.find(".body").each(function () {
        $(this).slideUp()
    })
}

function jobslistcleantext(text) {
    return text.toLowerCase().replace(/[^a-z]/g, "")
}

function updatejobslist(selecteddept) {
    $("tr.jobslistjob").each(function (index) {
        "all" === jobslistcleantext(selecteddept) || "" === jobslistcleantext(selecteddept) || jobslistcleantext($(this).children(".jobslistdepartment").first().text()) === jobslistcleantext(selecteddept) ? $(this).show() : $(this).hide()
    })
}

function ismobile() {
    return $(window).width() < 768
}

function navtoggle() {
    navshown = !navshown, $(".navbutton").toggleClass("clicked"), $(".overnav").toggleClass("visible")
}

function subnavtoggle(e) {
    $(this).hasClass("shown") ? ($(this).next().next().removeClass("shown"), $(this).removeClass("shown")) : ($("ul#navigation li ul").removeClass("shown"), $("#navigation .haschildren").removeClass("shown"), $(this).next().next().addClass("shown"), $(this).addClass("shown"), $("html, body").animate({scrollTop: $(this).offset().top}, 500))
}

!function (window, undefined) {
    function createOptions(options) {
        var object = optionsCache[options] = {};
        return jQuery.each(options.split(core_rspace), function (_, flag) {
            object[flag] = !0
        }), object
    }

    function dataAttr(elem, key, data) {
        if (data === undefined && 1 === elem.nodeType) {
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            if (data = elem.getAttribute(name), "string" == typeof data) {
                try {
                    data = "true" === data || "false" !== data && ("null" === data ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data)
                } catch (e) {
                }
                jQuery.data(elem, key, data)
            } else data = undefined
        }
        return data
    }

    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) if (("data" !== name || !jQuery.isEmptyObject(obj[name])) && "toJSON" !== name) return !1;
        return !0
    }

    function returnFalse() {
        return !1
    }

    function returnTrue() {
        return !0
    }

    function isDisconnected(node) {
        return !node || !node.parentNode || 11 === node.parentNode.nodeType
    }

    function sibling(cur, dir) {
        do cur = cur[dir]; while (cur && 1 !== cur.nodeType);
        return cur
    }

    function winnow(elements, qualifier, keep) {
        if (qualifier = qualifier || 0, jQuery.isFunction(qualifier)) return jQuery.grep(elements, function (elem, i) {
            var retVal = !!qualifier.call(elem, i, elem);
            return retVal === keep
        });
        if (qualifier.nodeType) return jQuery.grep(elements, function (elem, i) {
            return elem === qualifier === keep
        });
        if ("string" == typeof qualifier) {
            var filtered = jQuery.grep(elements, function (elem) {
                return 1 === elem.nodeType
            });
            if (isSimple.test(qualifier)) return jQuery.filter(qualifier, filtered, !keep);
            qualifier = jQuery.filter(qualifier, filtered)
        }
        return jQuery.grep(elements, function (elem, i) {
            return jQuery.inArray(elem, qualifier) >= 0 === keep
        })
    }

    function createSafeFragment(document) {
        var list = nodeNames.split("|"), safeFrag = document.createDocumentFragment();
        if (safeFrag.createElement) for (; list.length;) safeFrag.createElement(list.pop());
        return safeFrag
    }

    function findOrAppend(elem, tag) {
        return elem.getElementsByTagName(tag)[0] || elem.appendChild(elem.ownerDocument.createElement(tag))
    }

    function cloneCopyEvent(src, dest) {
        if (1 === dest.nodeType && jQuery.hasData(src)) {
            var type, i, l, oldData = jQuery._data(src), curData = jQuery._data(dest, oldData), events = oldData.events;
            if (events) {
                delete curData.handle, curData.events = {};
                for (type in events) for (i = 0, l = events[type].length; i < l; i++) jQuery.event.add(dest, type, events[type][i])
            }
            curData.data && (curData.data = jQuery.extend({}, curData.data))
        }
    }

    function cloneFixAttributes(src, dest) {
        var nodeName;
        1 === dest.nodeType && (dest.clearAttributes && dest.clearAttributes(), dest.mergeAttributes && dest.mergeAttributes(src), nodeName = dest.nodeName.toLowerCase(), "object" === nodeName ? (dest.parentNode && (dest.outerHTML = src.outerHTML), jQuery.support.html5Clone && src.innerHTML && !jQuery.trim(dest.innerHTML) && (dest.innerHTML = src.innerHTML)) : "input" === nodeName && rcheckableType.test(src.type) ? (dest.defaultChecked = dest.checked = src.checked, dest.value !== src.value && (dest.value = src.value)) : "option" === nodeName ? dest.selected = src.defaultSelected : "input" === nodeName || "textarea" === nodeName ? dest.defaultValue = src.defaultValue : "script" === nodeName && dest.text !== src.text && (dest.text = src.text), dest.removeAttribute(jQuery.expando))
    }

    function getAll(elem) {
        return "undefined" != typeof elem.getElementsByTagName ? elem.getElementsByTagName("*") : "undefined" != typeof elem.querySelectorAll ? elem.querySelectorAll("*") : []
    }

    function fixDefaultChecked(elem) {
        rcheckableType.test(elem.type) && (elem.defaultChecked = elem.checked)
    }

    function vendorPropName(style, name) {
        if (name in style) return name;
        for (var capName = name.charAt(0).toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length; i--;) if (name = cssPrefixes[i] + capName, name in style) return name;
        return origName
    }

    function isHidden(elem, el) {
        return elem = el || elem, "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem)
    }

    function showHide(elements, show) {
        for (var elem, display, values = [], index = 0, length = elements.length; index < length; index++) elem = elements[index], elem.style && (values[index] = jQuery._data(elem, "olddisplay"), show ? (values[index] || "none" !== elem.style.display || (elem.style.display = ""), "" === elem.style.display && isHidden(elem) && (values[index] = jQuery._data(elem, "olddisplay", css_defaultDisplay(elem.nodeName)))) : (display = curCSS(elem, "display"), values[index] || "none" === display || jQuery._data(elem, "olddisplay", display)));
        for (index = 0; index < length; index++) elem = elements[index], elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none"));
        return elements
    }

    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value
    }

    function augmentWidthOrHeight(elem, name, extra, isBorderBox) {
        for (var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0; i < 4; i += 2) "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0)), isBorderBox ? ("content" === extra && (val -= parseFloat(curCSS(elem, "padding" + cssExpand[i])) || 0), "margin" !== extra && (val -= parseFloat(curCSS(elem, "border" + cssExpand[i] + "Width")) || 0)) : (val += parseFloat(curCSS(elem, "padding" + cssExpand[i])) || 0, "padding" !== extra && (val += parseFloat(curCSS(elem, "border" + cssExpand[i] + "Width")) || 0));
        return val
    }

    function getWidthOrHeight(elem, name, extra) {
        var val = "width" === name ? elem.offsetWidth : elem.offsetHeight, valueIsBorderBox = !0,
            isBorderBox = jQuery.support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing");
        if (val <= 0 || null == val) {
            if (val = curCSS(elem, name), (val < 0 || null == val) && (val = elem.style[name]), rnumnonpx.test(val)) return val;
            valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]), val = parseFloat(val) || 0
        }
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox) + "px"
    }

    function css_defaultDisplay(nodeName) {
        if (elemdisplay[nodeName]) return elemdisplay[nodeName];
        var elem = jQuery("<" + nodeName + ">").appendTo(document.body), display = elem.css("display");
        return elem.remove(), "none" !== display && "" !== display || (iframe = document.body.appendChild(iframe || jQuery.extend(document.createElement("iframe"), {
            frameBorder: 0,
            width: 0,
            height: 0
        })), iframeDoc && iframe.createElement || (iframeDoc = (iframe.contentWindow || iframe.contentDocument).document, iframeDoc.write("<!doctype html><html><body>"), iframeDoc.close()), elem = iframeDoc.body.appendChild(iframeDoc.createElement(nodeName)), display = curCSS(elem, "display"), document.body.removeChild(iframe)), elemdisplay[nodeName] = display, display
    }

    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) jQuery.each(obj, function (i, v) {
            traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v ? i : "") + "]", v, traditional, add)
        }); else if (traditional || "object" !== jQuery.type(obj)) add(prefix, obj); else for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
    }

    function addToPrefiltersOrTransports(structure) {
        return function (dataTypeExpression, func) {
            "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
            var dataType, list, placeBefore, dataTypes = dataTypeExpression.toLowerCase().split(core_rspace), i = 0,
                length = dataTypes.length;
            if (jQuery.isFunction(func)) for (; i < length; i++) dataType = dataTypes[i], placeBefore = /^\+/.test(dataType), placeBefore && (dataType = dataType.substr(1) || "*"), list = structure[dataType] = structure[dataType] || [], list[placeBefore ? "unshift" : "push"](func)
        }
    }

    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, dataType, inspected) {
        dataType = dataType || options.dataTypes[0], inspected = inspected || {}, inspected[dataType] = !0;
        for (var selection, list = structure[dataType], i = 0, length = list ? list.length : 0, executeOnly = structure === prefilters; i < length && (executeOnly || !selection); i++) selection = list[i](options, originalOptions, jqXHR), "string" == typeof selection && (!executeOnly || inspected[selection] ? selection = undefined : (options.dataTypes.unshift(selection), selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, selection, inspected)));
        return !executeOnly && selection || inspected["*"] || (selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, "*", inspected)), selection
    }

    function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) src[key] !== undefined && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
        deep && jQuery.extend(!0, target, deep)
    }

    function ajaxHandleResponses(s, jqXHR, responses) {
        var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes,
            responseFields = s.responseFields;
        for (type in responseFields) type in responses && (jqXHR[responseFields[type]] = responses[type]);
        for (; "*" === dataTypes[0];) dataTypes.shift(), ct === undefined && (ct = s.mimeType || jqXHR.getResponseHeader("content-type"));
        if (ct) for (type in contents) if (contents[type] && contents[type].test(ct)) {
            dataTypes.unshift(type);
            break
        }
        if (dataTypes[0] in responses) finalDataType = dataTypes[0]; else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break
                }
                firstDataType || (firstDataType = type)
            }
            finalDataType = finalDataType || firstDataType
        }
        if (finalDataType) return finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), responses[finalDataType]
    }

    function ajaxConvert(s, response) {
        var conv, conv2, current, tmp, dataTypes = s.dataTypes.slice(), prev = dataTypes[0], converters = {}, i = 0;
        if (s.dataFilter && (response = s.dataFilter(response, s.dataType)), dataTypes[1]) for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
        for (; current = dataTypes[++i];) if ("*" !== current) {
            if ("*" !== prev && prev !== current) {
                if (conv = converters[prev + " " + current] || converters["* " + current], !conv) for (conv2 in converters) if (tmp = conv2.split(" "), tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                    conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], dataTypes.splice(i--, 0, current));
                    break
                }
                if (conv !== !0) if (conv && s["throws"]) response = conv(response); else try {
                    response = conv(response)
                } catch (e) {
                    return {state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current}
                }
            }
            prev = current
        }
        return {state: "success", data: response}
    }

    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest
        } catch (e) {
        }
    }

    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {
        }
    }

    function createFxNow() {
        return setTimeout(function () {
            fxNow = undefined
        }, 0), fxNow = jQuery.now()
    }

    function createTweens(animation, props) {
        jQuery.each(props, function (prop, value) {
            for (var collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length; index < length; index++) if (collection[index].call(animation, prop, value)) return
        })
    }

    function Animation(elem, properties, options) {
        var result, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function () {
            delete tick.elem
        }), tick = function () {
            for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; index < length; index++) animation.tweens[index].run(percent);
            return deferred.notifyWith(elem, [animation, percent, remaining]), percent < 1 && length ? remaining : (deferred.resolveWith(elem, [animation]), !1)
        }, animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(!0, {specialEasing: {}}, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function (prop, end, easing) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                return animation.tweens.push(tween), tween
            },
            stop: function (gotoEnd) {
                for (var index = 0, length = gotoEnd ? animation.tweens.length : 0; index < length; index++) animation.tweens[index].run(1);
                return gotoEnd ? deferred.resolveWith(elem, [animation, gotoEnd]) : deferred.rejectWith(elem, [animation, gotoEnd]), this
            }
        }), props = animation.props;
        for (propFilter(props, animation.opts.specialEasing); index < length; index++) if (result = animationPrefilters[index].call(animation, elem, props, animation.opts)) return result;
        return createTweens(animation, props), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), jQuery.fx.timer(jQuery.extend(tick, {
            anim: animation,
            queue: animation.opts.queue,
            elem: elem
        })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)
    }

    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) if (name = jQuery.camelCase(index), easing = specialEasing[name], value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], hooks && "expand" in hooks) {
            value = hooks.expand(value), delete props[name];
            for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing)
        } else specialEasing[name] = easing
    }

    function defaultPrefilter(elem, props, opts) {
        var index, prop, value, length, dataShow, toggle, tween, hooks, oldfire, anim = this, style = elem.style,
            orig = {}, handled = [], hidden = elem.nodeType && isHidden(elem);
        opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, oldfire = hooks.empty.fire, hooks.empty.fire = function () {
            hooks.unqueued || oldfire()
        }), hooks.unqueued++, anim.always(function () {
            anim.always(function () {
                hooks.unqueued--, jQuery.queue(elem, "fx").length || hooks.empty.fire()
            })
        })), 1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [style.overflow, style.overflowX, style.overflowY], "inline" === jQuery.css(elem, "display") && "none" === jQuery.css(elem, "float") && (jQuery.support.inlineBlockNeedsLayout && "inline" !== css_defaultDisplay(elem.nodeName) ? style.zoom = 1 : style.display = "inline-block")), opts.overflow && (style.overflow = "hidden", jQuery.support.shrinkWrapBlocks || anim.done(function () {
            style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2]
        }));
        for (index in props) if (value = props[index], rfxtypes.exec(value)) {
            if (delete props[index], toggle = toggle || "toggle" === value, value === (hidden ? "hide" : "show")) continue;
            handled.push(index)
        }
        if (length = handled.length) {
            dataShow = jQuery._data(elem, "fxshow") || jQuery._data(elem, "fxshow", {}), "hidden" in dataShow && (hidden = dataShow.hidden), toggle && (dataShow.hidden = !hidden), hidden ? jQuery(elem).show() : anim.done(function () {
                jQuery(elem).hide()
            }), anim.done(function () {
                var prop;
                jQuery.removeData(elem, "fxshow", !0);
                for (prop in orig) jQuery.style(elem, prop, orig[prop])
            });
            for (index = 0; index < length; index++) prop = handled[index], tween = anim.createTween(prop, hidden ? dataShow[prop] : 0), orig[prop] = dataShow[prop] || jQuery.style(elem, prop), prop in dataShow || (dataShow[prop] = tween.start, hidden && (tween.end = tween.start, tween.start = "width" === prop || "height" === prop ? 1 : 0))
        }
    }

    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing)
    }

    function genFx(type, includeWidth) {
        var which, attrs = {height: type}, i = 0;
        for (includeWidth = includeWidth ? 1 : 0; i < 4; i += 2 - includeWidth) which = cssExpand[i], attrs["margin" + which] = attrs["padding" + which] = type;
        return includeWidth && (attrs.opacity = attrs.width = type), attrs
    }

    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType && (elem.defaultView || elem.parentWindow)
    }

    var rootjQuery, readyList, document = window.document, location = window.location, navigator = window.navigator,
        _jQuery = window.jQuery, _$ = window.$, core_push = Array.prototype.push, core_slice = Array.prototype.slice,
        core_indexOf = Array.prototype.indexOf, core_toString = Object.prototype.toString,
        core_hasOwn = Object.prototype.hasOwnProperty, core_trim = String.prototype.trim,
        jQuery = function (selector, context) {
            return new jQuery.fn.init(selector, context, rootjQuery)
        }, core_pnum = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, core_rnotwhite = /\S/, core_rspace = /\s+/,
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, rvalidchars = /^[\],:{}\s]*$/, rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
        rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi, fcamelCase = function (all, letter) {
            return (letter + "").toUpperCase()
        }, DOMContentLoaded = function () {
            document.addEventListener ? (document.removeEventListener("DOMContentLoaded", DOMContentLoaded, !1), jQuery.ready()) : "complete" === document.readyState && (document.detachEvent("onreadystatechange", DOMContentLoaded), jQuery.ready())
        }, class2type = {};
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery, init: function (selector, context, rootjQuery) {
            var match, elem, doc;
            if (!selector) return this;
            if (selector.nodeType) return this.context = this[0] = selector, this.length = 1, this;
            if ("string" == typeof selector) {
                if (match = "<" === selector.charAt(0) && ">" === selector.charAt(selector.length - 1) && selector.length >= 3 ? [null, selector, null] : rquickExpr.exec(selector), !match || !match[1] && context) return !context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
                if (match[1]) return context = context instanceof jQuery ? context[0] : context, doc = context && context.nodeType ? context.ownerDocument || context : document, selector = jQuery.parseHTML(match[1], doc, !0), rsingleTag.test(match[1]) && jQuery.isPlainObject(context) && this.attr.call(selector, context, !0), jQuery.merge(this, selector);
                if (elem = document.getElementById(match[2]), elem && elem.parentNode) {
                    if (elem.id !== match[2]) return rootjQuery.find(selector);
                    this.length = 1, this[0] = elem
                }
                return this.context = document, this.selector = selector, this
            }
            return jQuery.isFunction(selector) ? rootjQuery.ready(selector) : (selector.selector !== undefined && (this.selector = selector.selector, this.context = selector.context), jQuery.makeArray(selector, this))
        }, selector: "", jquery: "1.8.3+1", length: 0, size: function () {
            return this.length
        }, toArray: function () {
            return core_slice.call(this)
        }, get: function (num) {
            return null == num ? this.toArray() : num < 0 ? this[this.length + num] : this[num]
        }, pushStack: function (elems, name, selector) {
            var ret = jQuery.merge(this.constructor(), elems);
            return ret.prevObject = this, ret.context = this.context, "find" === name ? ret.selector = this.selector + (this.selector ? " " : "") + selector : name && (ret.selector = this.selector + "." + name + "(" + selector + ")"), ret
        }, each: function (callback, args) {
            return jQuery.each(this, callback, args)
        }, ready: function (fn) {
            return jQuery.ready.promise().done(fn), this
        }, eq: function (i) {
            return i = +i, i === -1 ? this.slice(i) : this.slice(i, i + 1)
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, slice: function () {
            return this.pushStack(core_slice.apply(this, arguments), "slice", core_slice.call(arguments).join(","))
        }, map: function (callback) {
            return this.pushStack(jQuery.map(this, function (elem, i) {
                return callback.call(elem, i, elem)
            }))
        }, end: function () {
            return this.prevObject || this.constructor(null)
        }, push: core_push, sort: [].sort, splice: [].splice
    }, jQuery.fn.init.prototype = jQuery.fn, jQuery.extend = jQuery.fn.extend = function () {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length,
            deep = !1;
        for ("boolean" == typeof target && (deep = target, target = arguments[1] || {}, i = 2), "object" == typeof target || jQuery.isFunction(target) || (target = {}), length === i && (target = this, --i); i < length; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, target[name] = jQuery.extend(deep, clone, copy)) : copy !== undefined && (target[name] = copy));
        return target
    }, jQuery.extend({
        noConflict: function (deep) {
            return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), jQuery
        }, isReady: !1, readyWait: 1, holdReady: function (hold) {
            hold ? jQuery.readyWait++ : jQuery.ready(!0)
        }, ready: function (wait) {
            if (wait === !0 ? !--jQuery.readyWait : !jQuery.isReady) {
                if (!document.body) return setTimeout(jQuery.ready, 1);
                jQuery.isReady = !0, wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [jQuery]), jQuery.fn.trigger && jQuery(document).trigger("ready").off("ready"))
            }
        }, isFunction: function (obj) {
            return "function" === jQuery.type(obj)
        }, isArray: Array.isArray || function (obj) {
            return "array" === jQuery.type(obj)
        }, isWindow: function (obj) {
            return null != obj && obj == obj.window
        }, isNumeric: function (obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj)
        }, type: function (obj) {
            return null == obj ? String(obj) : class2type[core_toString.call(obj)] || "object"
        }, isPlainObject: function (obj) {
            if (!obj || "object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj)) return !1;
            try {
                if (obj.constructor && !core_hasOwn.call(obj, "constructor") && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) return !1
            } catch (e) {
                return !1
            }
            var key;
            for (key in obj) ;
            return key === undefined || core_hasOwn.call(obj, key)
        }, isEmptyObject: function (obj) {
            var name;
            for (name in obj) return !1;
            return !0
        }, error: function (msg) {
            throw new Error(msg)
        }, parseHTML: function (data, context, scripts) {
            var parsed;
            return data && "string" == typeof data ? ("boolean" == typeof context && (scripts = context, context = 0), context = context || document, (parsed = rsingleTag.exec(data)) ? [context.createElement(parsed[1])] : (parsed = jQuery.buildFragment([data], context, scripts ? null : []), jQuery.merge([], (parsed.cacheable ? jQuery.clone(parsed.fragment) : parsed.fragment).childNodes))) : null
        }, parseJSON: function (data) {
            return data && "string" == typeof data ? (data = jQuery.trim(data), window.JSON && window.JSON.parse ? window.JSON.parse(data) : rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, "")) ? new Function("return " + data)() : void jQuery.error("Invalid JSON: " + data)) : null
        }, parseXML: function (data) {
            var xml, tmp;
            if (!data || "string" != typeof data) return null;
            try {
                window.DOMParser ? (tmp = new DOMParser, xml = tmp.parseFromString(data, "text/xml")) : (xml = new ActiveXObject("Microsoft.XMLDOM"), xml.async = "false", xml.loadXML(data))
            } catch (e) {
                xml = undefined
            }
            return xml && xml.documentElement && !xml.getElementsByTagName("parsererror").length || jQuery.error("Invalid XML: " + data), xml
        }, noop: function () {
        }, globalEval: function (data) {
            data && core_rnotwhite.test(data) && (window.execScript || function (data) {
                window.eval.call(window, data)
            })(data)
        }, camelCase: function (string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
        }, nodeName: function (elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
        }, each: function (obj, callback, args) {
            var name, i = 0, length = obj.length, isObj = length === undefined || jQuery.isFunction(obj);
            if (args) if (isObj) {
                for (name in obj) if (callback.apply(obj[name], args) === !1) break
            } else for (; i < length && callback.apply(obj[i++], args) !== !1;) ; else if (isObj) {
                for (name in obj) if (callback.call(obj[name], name, obj[name]) === !1) break
            } else for (; i < length && callback.call(obj[i], i, obj[i++]) !== !1;) ;
            return obj
        }, trim: core_trim && !core_trim.call("\ufeff聽") ? function (text) {
            return null == text ? "" : core_trim.call(text)
        } : function (text) {
            return null == text ? "" : (text + "").replace(rtrim, "")
        }, makeArray: function (arr, results) {
            var type, ret = results || [];
            return null != arr && (type = jQuery.type(arr), null == arr.length || "string" === type || "function" === type || "regexp" === type || jQuery.isWindow(arr) ? core_push.call(ret, arr) : jQuery.merge(ret, arr)), ret
        }, inArray: function (elem, arr, i) {
            var len;
            if (arr) {
                if (core_indexOf) return core_indexOf.call(arr, elem, i);
                for (len = arr.length, i = i ? i < 0 ? Math.max(0, len + i) : i : 0; i < len; i++) if (i in arr && arr[i] === elem) return i
            }
            return -1
        }, merge: function (first, second) {
            var l = second.length, i = first.length, j = 0;
            if ("number" == typeof l) for (; j < l; j++) first[i++] = second[j]; else for (; second[j] !== undefined;) first[i++] = second[j++];
            return first.length = i, first
        }, grep: function (elems, callback, inv) {
            var retVal, ret = [], i = 0, length = elems.length;
            for (inv = !!inv; i < length; i++) retVal = !!callback(elems[i], i), inv !== retVal && ret.push(elems[i]);
            return ret
        }, map: function (elems, callback, arg) {
            var value, key, ret = [], i = 0, length = elems.length,
                isArray = elems instanceof jQuery || length !== undefined && "number" == typeof length && (length > 0 && elems[0] && elems[length - 1] || 0 === length || jQuery.isArray(elems));
            if (isArray) for (; i < length; i++) value = callback(elems[i], i, arg), null != value && (ret[ret.length] = value); else for (key in elems) value = callback(elems[key], key, arg), null != value && (ret[ret.length] = value);
            return ret.concat.apply([], ret)
        }, guid: 1, proxy: function (fn, context) {
            var tmp, args, proxy;
            return "string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), jQuery.isFunction(fn) ? (args = core_slice.call(arguments, 2), proxy = function () {
                return fn.apply(context, args.concat(core_slice.call(arguments)))
            }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy) : undefined
        }, access: function (elems, fn, key, value, chainable, emptyGet, pass) {
            var exec, bulk = null == key, i = 0, length = elems.length;
            if (key && "object" == typeof key) {
                for (i in key) jQuery.access(elems, fn, i, key[i], 1, emptyGet, value);
                chainable = 1
            } else if (value !== undefined) {
                if (exec = pass === undefined && jQuery.isFunction(value), bulk && (exec ? (exec = fn, fn = function (elem, key, value) {
                    return exec.call(jQuery(elem), value)
                }) : (fn.call(elems, value), fn = null)), fn) for (; i < length; i++) fn(elems[i], key, exec ? value.call(elems[i], i, fn(elems[i], key)) : value, pass);
                chainable = 1
            }
            return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet
        }, now: function () {
            return (new Date).getTime()
        }
    }), jQuery.ready.promise = function (obj) {
        if (!readyList) if (readyList = jQuery.Deferred(), "complete" === document.readyState) setTimeout(jQuery.ready, 1); else if (document.addEventListener) document.addEventListener("DOMContentLoaded", DOMContentLoaded, !1), window.addEventListener("load", jQuery.ready, !1); else {
            document.attachEvent("onreadystatechange", DOMContentLoaded), window.attachEvent("onload", jQuery.ready);
            var top = !1;
            try {
                top = null == window.frameElement && document.documentElement
            } catch (e) {
            }
            top && top.doScroll && !function doScrollCheck() {
                if (!jQuery.isReady) {
                    try {
                        top.doScroll("left")
                    } catch (e) {
                        return setTimeout(doScrollCheck, 50)
                    }
                    jQuery.ready()
                }
            }()
        }
        return readyList.promise(obj)
    }, jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase()
    }), rootjQuery = jQuery(document);
    var optionsCache = {};
    jQuery.Callbacks = function (options) {
        options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
        var memory, fired, firing, firingStart, firingLength, firingIndex, list = [], stack = !options.once && [],
            fire = function (data) {
                for (memory = options.memory && data, fired = !0, firingIndex = firingStart || 0, firingStart = 0, firingLength = list.length, firing = !0; list && firingIndex < firingLength; firingIndex++) if (list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
                    memory = !1;
                    break
                }
                firing = !1, list && (stack ? stack.length && fire(stack.shift()) : memory ? list = [] : self.disable())
            }, self = {
                add: function () {
                    if (list) {
                        var start = list.length;
                        !function add(args) {
                            jQuery.each(args, function (_, arg) {
                                var type = jQuery.type(arg);
                                "function" === type ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== type && add(arg)
                            })
                        }(arguments), firing ? firingLength = list.length : memory && (firingStart = start, fire(memory))
                    }
                    return this
                }, remove: function () {
                    return list && jQuery.each(arguments, function (_, arg) {
                        for (var index; (index = jQuery.inArray(arg, list, index)) > -1;) list.splice(index, 1), firing && (index <= firingLength && firingLength--, index <= firingIndex && firingIndex--)
                    }), this
                }, has: function (fn) {
                    return jQuery.inArray(fn, list) > -1
                }, empty: function () {
                    return list = [], this
                }, disable: function () {
                    return list = stack = memory = undefined, this
                }, disabled: function () {
                    return !list
                }, lock: function () {
                    return stack = undefined, memory || self.disable(), this
                }, locked: function () {
                    return !stack
                }, fireWith: function (context, args) {
                    return args = args || [], args = [context, args.slice ? args.slice() : args], !list || fired && !stack || (firing ? stack.push(args) : fire(args)), this
                }, fire: function () {
                    return self.fireWith(this, arguments), this
                }, fired: function () {
                    return !!fired
                }
            };
        return self
    }, jQuery.extend({
        Deferred: function (func) {
            var tuples = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]],
                state = "pending", promise = {
                    state: function () {
                        return state
                    }, always: function () {
                        return deferred.done(arguments).fail(arguments), this
                    }, then: function () {
                        var fns = arguments;
                        return jQuery.Deferred(function (newDefer) {
                            jQuery.each(tuples, function (i, tuple) {
                                var action = tuple[0], fn = fns[i];
                                deferred[tuple[1]](jQuery.isFunction(fn) ? function () {
                                    var returned = fn.apply(this, arguments);
                                    returned && jQuery.isFunction(returned.promise) ? returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify) : newDefer[action + "With"](this === deferred ? newDefer : this, [returned])
                                } : newDefer[action])
                            }), fns = null
                        }).promise()
                    }, promise: function (obj) {
                        return null != obj ? jQuery.extend(obj, promise) : promise
                    }
                }, deferred = {};
            return promise.pipe = promise.then, jQuery.each(tuples, function (i, tuple) {
                var list = tuple[2], stateString = tuple[3];
                promise[tuple[1]] = list.add, stateString && list.add(function () {
                    state = stateString
                }, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = list.fire, deferred[tuple[0] + "With"] = list.fireWith
            }), promise.promise(deferred), func && func.call(deferred, deferred), deferred
        }, when: function (subordinate) {
            var progressValues, progressContexts, resolveContexts, i = 0, resolveValues = core_slice.call(arguments),
                length = resolveValues.length,
                remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0,
                deferred = 1 === remaining ? subordinate : jQuery.Deferred(),
                updateFunc = function (i, contexts, values) {
                    return function (value) {
                        contexts[i] = this, values[i] = arguments.length > 1 ? core_slice.call(arguments) : value, values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values)
                    }
                };
            if (length > 1) for (progressValues = new Array(length), progressContexts = new Array(length), resolveContexts = new Array(length); i < length; i++) resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues)) : --remaining;
            return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise()
        }
    }), jQuery.support = function () {
        var support, all, a, select, opt, input, fragment, eventName, i, isSupported, clickFn,
            div = document.createElement("div");
        if (div.setAttribute("className", "t"), div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", all = div.getElementsByTagName("*"), a = div.getElementsByTagName("a")[0], !all || !a || !all.length) return {};
        select = document.createElement("select"), opt = select.appendChild(document.createElement("option")), input = div.getElementsByTagName("input")[0], a.style.cssText = "top:1px;float:left;opacity:.5", support = {
            leadingWhitespace: 3 === div.firstChild.nodeType,
            tbody: !div.getElementsByTagName("tbody").length,
            htmlSerialize: !!div.getElementsByTagName("link").length,
            style: /top/.test(a.getAttribute("style")),
            hrefNormalized: "/a" === a.getAttribute("href"),
            opacity: /^0.5/.test(a.style.opacity),
            cssFloat: !!a.style.cssFloat,
            checkOn: "on" === input.value,
            optSelected: opt.selected,
            getSetAttribute: "t" !== div.className,
            enctype: !!document.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== document.createElement("nav").cloneNode(!0).outerHTML,
            boxModel: "CSS1Compat" === document.compatMode,
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        }, input.checked = !0, support.noCloneChecked = input.cloneNode(!0).checked, select.disabled = !0, support.optDisabled = !opt.disabled;
        try {
            delete div.test
        } catch (e) {
            support.deleteExpando = !1
        }
        if (!div.addEventListener && div.attachEvent && div.fireEvent && (div.attachEvent("onclick", clickFn = function () {
            support.noCloneEvent = !1
        }), div.cloneNode(!0).fireEvent("onclick"), div.detachEvent("onclick", clickFn)), input = document.createElement("input"), input.value = "t", input.setAttribute("type", "radio"), support.radioValue = "t" === input.value, input.setAttribute("checked", "checked"), input.setAttribute("name", "t"), div.appendChild(input), fragment = document.createDocumentFragment(), fragment.appendChild(div.lastChild), support.checkClone = fragment.cloneNode(!0).cloneNode(!0).lastChild.checked, support.appendChecked = input.checked, fragment.removeChild(input), fragment.appendChild(div), div.attachEvent) for (i in{
            submit: !0,
            change: !0,
            focusin: !0
        }) eventName = "on" + i, isSupported = eventName in div, isSupported || (div.setAttribute(eventName, "return;"), isSupported = "function" == typeof div[eventName]), support[i + "Bubbles"] = isSupported;
        return jQuery(function () {
            var container, div, tds, marginDiv, divReset = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
                body = document.getElementsByTagName("body")[0];
            body && (container = document.createElement("div"), container.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", body.insertBefore(container, body.firstChild), div = document.createElement("div"), container.appendChild(div), div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", tds = div.getElementsByTagName("td"), tds[0].style.cssText = "padding:0;margin:0;border:0;display:none", isSupported = 0 === tds[0].offsetHeight, tds[0].style.display = "", tds[1].style.display = "none", support.reliableHiddenOffsets = isSupported && 0 === tds[0].offsetHeight, div.innerHTML = "", div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", support.boxSizing = 4 === div.offsetWidth, support.doesNotIncludeMarginInBodyOffset = 1 !== body.offsetTop, window.getComputedStyle && (support.pixelPosition = "1%" !== (window.getComputedStyle(div, null) || {}).top, support.boxSizingReliable = "4px" === (window.getComputedStyle(div, null) || {width: "4px"}).width, marginDiv = document.createElement("div"), marginDiv.style.cssText = div.style.cssText = divReset, marginDiv.style.marginRight = marginDiv.style.width = "0", div.style.width = "1px", div.appendChild(marginDiv), support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight)), "undefined" != typeof div.style.zoom && (div.innerHTML = "", div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1", support.inlineBlockNeedsLayout = 3 === div.offsetWidth, div.style.display = "block", div.style.overflow = "visible", div.innerHTML = "<div></div>", div.firstChild.style.width = "5px", support.shrinkWrapBlocks = 3 !== div.offsetWidth, container.style.zoom = 1), body.removeChild(container), container = div = tds = marginDiv = null)
        }), fragment.removeChild(div), all = a = select = opt = input = fragment = div = null, support
    }();
    var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, rmultiDash = /([A-Z])/g;
    jQuery.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (jQuery.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0},
        hasData: function (elem) {
            return elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando], !!elem && !isEmptyDataObject(elem)
        },
        data: function (elem, name, data, pvt) {
            if (jQuery.acceptData(elem)) {
                var thisCache, ret, internalKey = jQuery.expando, getByName = "string" == typeof name,
                    isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem,
                    id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
                if (id && cache[id] && (pvt || cache[id].data) || !getByName || data !== undefined) return id || (isNode ? elem[internalKey] = id = jQuery.deletedIds.pop() || jQuery.guid++ : id = internalKey), cache[id] || (cache[id] = {}, isNode || (cache[id].toJSON = jQuery.noop)), "object" != typeof name && "function" != typeof name || (pvt ? cache[id] = jQuery.extend(cache[id], name) : cache[id].data = jQuery.extend(cache[id].data, name)), thisCache = cache[id], pvt || (thisCache.data || (thisCache.data = {}), thisCache = thisCache.data), data !== undefined && (thisCache[jQuery.camelCase(name)] = data), getByName ? (ret = thisCache[name], null == ret && (ret = thisCache[jQuery.camelCase(name)])) : ret = thisCache, ret
            }
        },
        removeData: function (elem, name, pvt) {
            if (jQuery.acceptData(elem)) {
                var thisCache, i, l, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem,
                    id = isNode ? elem[jQuery.expando] : jQuery.expando;
                if (cache[id]) {
                    if (name && (thisCache = pvt ? cache[id] : cache[id].data)) {
                        jQuery.isArray(name) || (name in thisCache ? name = [name] : (name = jQuery.camelCase(name), name = name in thisCache ? [name] : name.split(" ")));
                        for (i = 0, l = name.length; i < l; i++) delete thisCache[name[i]];
                        if (!(pvt ? isEmptyDataObject : jQuery.isEmptyObject)(thisCache)) return
                    }
                    (pvt || (delete cache[id].data, isEmptyDataObject(cache[id]))) && (isNode ? jQuery.cleanData([elem], !0) : jQuery.support.deleteExpando || cache != cache.window ? delete cache[id] : cache[id] = null)
                }
            }
        },
        _data: function (elem, name, data) {
            return jQuery.data(elem, name, data, !0)
        },
        acceptData: function (elem) {
            var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];
            return !noData || noData !== !0 && elem.getAttribute("classid") === noData
        }
    }), jQuery.fn.extend({
        data: function (key, value) {
            var parts, part, attr, name, l, elem = this[0], i = 0, data = null;
            if (key === undefined) {
                if (this.length && (data = jQuery.data(elem), 1 === elem.nodeType && !jQuery._data(elem, "parsedAttrs"))) {
                    for (attr = elem.attributes, l = attr.length; i < l; i++) name = attr[i].name, name.indexOf("data-") || (name = jQuery.camelCase(name.substring(5)), dataAttr(elem, name, data[name]));
                    jQuery._data(elem, "parsedAttrs", !0)
                }
                return data
            }
            return "object" == typeof key ? this.each(function () {
                jQuery.data(this, key)
            }) : (parts = key.split(".", 2), parts[1] = parts[1] ? "." + parts[1] : "", part = parts[1] + "!", jQuery.access(this, function (value) {
                return value === undefined ? (data = this.triggerHandler("getData" + part, [parts[0]]), data === undefined && elem && (data = jQuery.data(elem, key), data = dataAttr(elem, key, data)), data === undefined && parts[1] ? this.data(parts[0]) : data) : (parts[1] = value, void this.each(function () {
                    var self = jQuery(this);
                    self.triggerHandler("setData" + part, parts), jQuery.data(this, key, value), self.triggerHandler("changeData" + part, parts)
                }))
            }, null, value, arguments.length > 1, null, !1))
        }, removeData: function (key) {
            return this.each(function () {
                jQuery.removeData(this, key)
            })
        }
    }), jQuery.extend({
        queue: function (elem, type, data) {
            var queue;
            if (elem) return type = (type || "fx") + "queue", queue = jQuery._data(elem, type), data && (!queue || jQuery.isArray(data) ? queue = jQuery._data(elem, type, jQuery.makeArray(data)) : queue.push(data)), queue || []
        }, dequeue: function (elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(),
                hooks = jQuery._queueHooks(elem, type), next = function () {
                    jQuery.dequeue(elem, type)
                };
            "inprogress" === fn && (fn = queue.shift(), startLength--), fn && ("fx" === type && queue.unshift("inprogress"), delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire()
        }, _queueHooks: function (elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function () {
                    jQuery.removeData(elem, type + "queue", !0), jQuery.removeData(elem, key, !0)
                })
            })
        }
    }), jQuery.fn.extend({
        queue: function (type, data) {
            var setter = 2;
            return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : data === undefined ? this : this.each(function () {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type)
            })
        }, dequeue: function (type) {
            return this.each(function () {
                jQuery.dequeue(this, type)
            })
        }, delay: function (time, type) {
            return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", this.queue(type, function (next, hooks) {
                var timeout = setTimeout(next, time);
                hooks.stop = function () {
                    clearTimeout(timeout)
                }
            })
        }, clearQueue: function (type) {
            return this.queue(type || "fx", [])
        }, promise: function (type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function () {
                --count || defer.resolveWith(elements, [elements])
            };
            for ("string" != typeof type && (obj = type, type = undefined), type = type || "fx"; i--;) tmp = jQuery._data(elements[i], type + "queueHooks"), tmp && tmp.empty && (count++, tmp.empty.add(resolve));
            return resolve(), defer.promise(obj)
        }
    });
    var nodeHook, boolHook, fixSpecified, rclass = /[\t\r\n]/g, rreturn = /\r/g, rtype = /^(?:button|input)$/i,
        rfocusable = /^(?:button|input|object|select|textarea)$/i, rclickable = /^a(?:rea|)$/i,
        rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        getSetAttribute = jQuery.support.getSetAttribute;
    jQuery.fn.extend({
        attr: function (name, value) {
            return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1)
        }, removeAttr: function (name) {
            return this.each(function () {
                jQuery.removeAttr(this, name)
            })
        }, prop: function (name, value) {
            return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1)
        }, removeProp: function (name) {
            return name = jQuery.propFix[name] || name, this.each(function () {
                try {
                    this[name] = undefined, delete this[name]
                } catch (e) {
                }
            })
        }, addClass: function (value) {
            var classNames, i, l, elem, setClass, c, cl;
            if (jQuery.isFunction(value)) return this.each(function (j) {
                jQuery(this).addClass(value.call(this, j, this.className))
            });
            if (value && "string" == typeof value) for (classNames = value.split(core_rspace), i = 0, l = this.length; i < l; i++) if (elem = this[i], 1 === elem.nodeType) if (elem.className || 1 !== classNames.length) {
                for (setClass = " " + elem.className + " ", c = 0, cl = classNames.length; c < cl; c++) setClass.indexOf(" " + classNames[c] + " ") < 0 && (setClass += classNames[c] + " ");
                elem.className = jQuery.trim(setClass)
            } else elem.className = value;
            return this
        }, removeClass: function (value) {
            var removes, className, elem, c, cl, i, l;
            if (jQuery.isFunction(value)) return this.each(function (j) {
                jQuery(this).removeClass(value.call(this, j, this.className))
            });
            if (value && "string" == typeof value || value === undefined) for (removes = (value || "").split(core_rspace), i = 0, l = this.length; i < l; i++) if (elem = this[i], 1 === elem.nodeType && elem.className) {
                for (className = (" " + elem.className + " ").replace(rclass, " "), c = 0, cl = removes.length; c < cl; c++) for (; className.indexOf(" " + removes[c] + " ") >= 0;) className = className.replace(" " + removes[c] + " ", " ");
                elem.className = value ? jQuery.trim(className) : ""
            }
            return this
        }, toggleClass: function (value, stateVal) {
            var type = typeof value, isBool = "boolean" == typeof stateVal;
            return jQuery.isFunction(value) ? this.each(function (i) {
                jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal)
            }) : this.each(function () {
                if ("string" === type) for (var className, i = 0, self = jQuery(this), state = stateVal, classNames = value.split(core_rspace); className = classNames[i++];) state = isBool ? state : !self.hasClass(className), self[state ? "addClass" : "removeClass"](className); else "undefined" !== type && "boolean" !== type || (this.className && jQuery._data(this, "__className__", this.className), this.className = this.className || value === !1 ? "" : jQuery._data(this, "__className__") || "")
            })
        }, hasClass: function (selector) {
            for (var className = " " + selector + " ", i = 0, l = this.length; i < l; i++) if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) return !0;
            return !1
        }, val: function (value) {
            var hooks, ret, isFunction, elem = this[0];
            {
                if (arguments.length) return isFunction = jQuery.isFunction(value), this.each(function (i) {
                    var val, self = jQuery(this);
                    1 === this.nodeType && (val = isFunction ? value.call(this, i, self.val()) : value, null == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function (value) {
                        return null == value ? "" : value + ""
                    })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], hooks && "set" in hooks && hooks.set(this, val, "value") !== undefined || (this.value = val))
                });
                if (elem) return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined ? ret : (ret = elem.value, "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret)
            }
        }
    }), jQuery.extend({
        valHooks: {
            option: {
                get: function (elem) {
                    var val = elem.attributes.value;
                    return !val || val.specified ? elem.value : elem.text
                }
            }, select: {
                get: function (elem) {
                    for (var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || index < 0, values = one ? null : [], max = one ? index + 1 : options.length, i = index < 0 ? max : one ? index : 0; i < max; i++) if (option = options[i], (option.selected || i === index) && (jQuery.support.optDisabled ? !option.disabled : null === option.getAttribute("disabled")) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                        if (value = jQuery(option).val(), one) return value;
                        values.push(value)
                    }
                    return values
                }, set: function (elem, value) {
                    var values = jQuery.makeArray(value);
                    return jQuery(elem).find("option").each(function () {
                        this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0
                    }), values.length || (elem.selectedIndex = -1), values
                }
            }
        },
        attrFn: {},
        attr: function (elem, name, value, pass) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return pass && jQuery.isFunction(jQuery.fn[name]) ? jQuery(elem)[name](value) : "undefined" == typeof elem.getAttribute ? jQuery.prop(elem, name, value) : (notxml = 1 !== nType || !jQuery.isXMLDoc(elem), notxml && (name = name.toLowerCase(), hooks = jQuery.attrHooks[name] || (rboolean.test(name) ? boolHook : nodeHook)), value !== undefined ? null === value ? void jQuery.removeAttr(elem, name) : hooks && "set" in hooks && notxml && (ret = hooks.set(elem, value, name)) !== undefined ? ret : (elem.setAttribute(name, value + ""), value) : hooks && "get" in hooks && notxml && null !== (ret = hooks.get(elem, name)) ? ret : (ret = elem.getAttribute(name), null === ret ? undefined : ret))
        },
        removeAttr: function (elem, value) {
            var propName, attrNames, name, isBool, i = 0;
            if (value && 1 === elem.nodeType) for (attrNames = value.split(core_rspace); i < attrNames.length; i++) name = attrNames[i], name && (propName = jQuery.propFix[name] || name, isBool = rboolean.test(name), isBool || jQuery.attr(elem, name, ""), elem.removeAttribute(getSetAttribute ? name : propName), isBool && propName in elem && (elem[propName] = !1))
        },
        attrHooks: {
            type: {
                set: function (elem, value) {
                    if (rtype.test(elem.nodeName) && elem.parentNode) jQuery.error("type property can't be changed"); else if (!jQuery.support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        return elem.setAttribute("type", value), val && (elem.value = val), value
                    }
                }
            }, value: {
                get: function (elem, name) {
                    return nodeHook && jQuery.nodeName(elem, "button") ? nodeHook.get(elem, name) : name in elem ? elem.value : null
                }, set: function (elem, value, name) {
                    return nodeHook && jQuery.nodeName(elem, "button") ? nodeHook.set(elem, value, name) : void (elem.value = value)
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function (elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return notxml = 1 !== nType || !jQuery.isXMLDoc(elem), notxml && (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), value !== undefined ? hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name]
        },
        propHooks: {
            tabIndex: {
                get: function (elem) {
                    var attributeNode = elem.getAttributeNode("tabindex");
                    return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined
                }
            }
        }
    }), boolHook = {
        get: function (elem, name) {
            var attrNode, property = jQuery.prop(elem, name);
            return property === !0 || "boolean" != typeof property && (attrNode = elem.getAttributeNode(name)) && attrNode.nodeValue !== !1 ? name.toLowerCase() : undefined
        }, set: function (elem, value, name) {
            var propName;
            return value === !1 ? jQuery.removeAttr(elem, name) : (propName = jQuery.propFix[name] || name, propName in elem && (elem[propName] = !0), elem.setAttribute(name, name.toLowerCase())), name
        }
    }, getSetAttribute || (fixSpecified = {
        name: !0,
        id: !0,
        coords: !0
    }, nodeHook = jQuery.valHooks.button = {
        get: function (elem, name) {
            var ret;
            return ret = elem.getAttributeNode(name), ret && (fixSpecified[name] ? "" !== ret.value : ret.specified) ? ret.value : undefined
        }, set: function (elem, value, name) {
            var ret = elem.getAttributeNode(name);
            return ret || (ret = document.createAttribute(name), elem.setAttributeNode(ret)), ret.value = value + ""
        }
    }, jQuery.each(["width", "height"], function (i, name) {
        jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
            set: function (elem, value) {
                if ("" === value) return elem.setAttribute(name, "auto"), value
            }
        })
    }), jQuery.attrHooks.contenteditable = {
        get: nodeHook.get, set: function (elem, value, name) {
            "" === value && (value = "false"), nodeHook.set(elem, value, name)
        }
    }), jQuery.support.hrefNormalized || jQuery.each(["href", "src", "width", "height"], function (i, name) {
        jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
            get: function (elem) {
                var ret = elem.getAttribute(name, 2);
                return null === ret ? undefined : ret
            }
        })
    }), jQuery.support.style || (jQuery.attrHooks.style = {
        get: function (elem) {
            return elem.style.cssText.toLowerCase() || undefined
        }, set: function (elem, value) {
            return elem.style.cssText = value + ""
        }
    }), jQuery.support.optSelected || (jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {
        get: function (elem) {
            var parent = elem.parentNode;
            return parent && (parent.selectedIndex, parent.parentNode && parent.parentNode.selectedIndex), null
        }
    })), jQuery.support.enctype || (jQuery.propFix.enctype = "encoding"), jQuery.support.checkOn || jQuery.each(["radio", "checkbox"], function () {
        jQuery.valHooks[this] = {
            get: function (elem) {
                return null === elem.getAttribute("value") ? "on" : elem.value
            }
        }
    }), jQuery.each(["radio", "checkbox"], function () {
        jQuery.valHooks[this] = jQuery.extend(jQuery.valHooks[this], {
            set: function (elem, value) {
                if (jQuery.isArray(value)) return elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0
            }
        })
    });
    var rformElems = /^(?:textarea|input|select)$/i, rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/,
        rhoverHack = /(?:^|\s)hover(\.\S+|)\b/, rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, hoverHack = function (events) {
            return jQuery.event.special.hover ? events : events.replace(rhoverHack, "mouseenter$1 mouseleave$1")
        };
    jQuery.event = {
        add: function (elem, types, handler, data, selector) {
            var elemData, eventHandle, events, t, tns, type, namespaces, handleObj, handleObjIn, handlers, special;
            if (3 !== elem.nodeType && 8 !== elem.nodeType && types && handler && (elemData = jQuery._data(elem))) {
                for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, selector = handleObjIn.selector), handler.guid || (handler.guid = jQuery.guid++), events = elemData.events, events || (elemData.events = events = {}), eventHandle = elemData.handle, eventHandle || (elemData.handle = eventHandle = function (e) {
                    return "undefined" == typeof jQuery || e && jQuery.event.triggered === e.type ? undefined : jQuery.event.dispatch.apply(eventHandle.elem, arguments)
                }, eventHandle.elem = elem), types = jQuery.trim(hoverHack(types)).split(" "), t = 0; t < types.length; t++) tns = rtypenamespace.exec(types[t]) || [], type = tns[1], namespaces = (tns[2] || "").split(".").sort(), special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, handleObj = jQuery.extend({
                    type: type,
                    origType: tns[1],
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn), handlers = events[type], handlers || (handlers = events[type] = [], handlers.delegateCount = 0, special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || (elem.addEventListener ? elem.addEventListener(type, eventHandle, !1) : elem.attachEvent && elem.attachEvent("on" + type, eventHandle))), special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), jQuery.event.global[type] = !0;
                elem = null
            }
        },
        global: {},
        remove: function (elem, types, handler, selector, mappedTypes) {
            var t, tns, type, origType, namespaces, origCount, j, events, special, eventType, handleObj,
                elemData = jQuery.hasData(elem) && jQuery._data(elem);
            if (elemData && (events = elemData.events)) {
                for (types = jQuery.trim(hoverHack(types || "")).split(" "), t = 0; t < types.length; t++) if (tns = rtypenamespace.exec(types[t]) || [], type = origType = tns[1], namespaces = tns[2], type) {
                    for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, eventType = events[type] || [], origCount = eventType.length, namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null, j = 0; j < eventType.length; j++) handleObj = eventType[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || namespaces && !namespaces.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (eventType.splice(j--, 1), handleObj.selector && eventType.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                    0 === eventType.length && origCount !== eventType.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), delete events[type])
                } else for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                jQuery.isEmptyObject(events) && (delete elemData.handle, jQuery.removeData(elem, "events", !0))
            }
        },
        customEvent: {getData: !0, setData: !0, changeData: !0},
        trigger: function (event, data, elem, onlyHandlers) {
            if (!elem || 3 !== elem.nodeType && 8 !== elem.nodeType) {
                var cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType,
                    type = event.type || event, namespaces = [];
                if (!rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf("!") >= 0 && (type = type.slice(0, -1), exclusive = !0), type.indexOf(".") >= 0 && (namespaces = type.split("."), type = namespaces.shift(), namespaces.sort()), elem && !jQuery.event.customEvent[type] || jQuery.event.global[type])) if (event = "object" == typeof event ? event[jQuery.expando] ? event : new jQuery.Event(type, event) : new jQuery.Event(type), event.type = type, event.isTrigger = !0, event.exclusive = exclusive, event.namespace = namespaces.join("."), event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, ontype = type.indexOf(":") < 0 ? "on" + type : "", elem) {
                    if (event.result = undefined, event.target || (event.target = elem), data = null != data ? jQuery.makeArray(data) : [], data.unshift(event), special = jQuery.event.special[type] || {}, !special.trigger || special.trigger.apply(elem, data) !== !1) {
                        if (eventPath = [[elem, special.bindType || type]], !onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                            for (bubbleType = special.delegateType || type, cur = rfocusMorph.test(bubbleType + type) ? elem : elem.parentNode, old = elem; cur; cur = cur.parentNode) eventPath.push([cur, bubbleType]), old = cur;
                            old === (elem.ownerDocument || document) && eventPath.push([old.defaultView || old.parentWindow || window, bubbleType])
                        }
                        for (i = 0; i < eventPath.length && !event.isPropagationStopped(); i++) cur = eventPath[i][0], event.type = eventPath[i][1], handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle"), handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === !1 && event.preventDefault();
                        return event.type = type, onlyHandlers || event.isDefaultPrevented() || special._default && special._default.apply(elem.ownerDocument, data) !== !1 || "click" === type && jQuery.nodeName(elem, "a") || !jQuery.acceptData(elem) || ontype && elem[type] && ("focus" !== type && "blur" !== type || 0 !== event.target.offsetWidth) && !jQuery.isWindow(elem) && (old = elem[ontype], old && (elem[ontype] = null), jQuery.event.triggered = type, elem[type](), jQuery.event.triggered = undefined, old && (elem[ontype] = old)), event.result
                    }
                } else {
                    cache = jQuery.cache;
                    for (i in cache) cache[i].events && cache[i].events[type] && jQuery.event.trigger(event, data, cache[i].handle.elem, !0)
                }
            }
        },
        dispatch: function (event) {
            event = jQuery.event.fix(event || window.event);
            var i, j, cur, ret, selMatch, matched, matches, handleObj, sel,
                handlers = (jQuery._data(this, "events") || {})[event.type] || [],
                delegateCount = handlers.delegateCount, args = core_slice.call(arguments),
                run_all = !event.exclusive && !event.namespace, special = jQuery.event.special[event.type] || {},
                handlerQueue = [];
            if (args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                if (delegateCount && (!event.button || "click" !== event.type)) for (cur = event.target; cur != this; cur = cur.parentNode || this) if (cur.disabled !== !0 || "click" !== event.type) {
                    for (selMatch = {}, matches = [], i = 0; i < delegateCount; i++) handleObj = handlers[i], sel = handleObj.selector, selMatch[sel] === undefined && (selMatch[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length), selMatch[sel] && matches.push(handleObj);
                    matches.length && handlerQueue.push({elem: cur, matches: matches})
                }
                for (handlers.length > delegateCount && handlerQueue.push({
                    elem: this,
                    matches: handlers.slice(delegateCount)
                }), i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++) for (matched = handlerQueue[i], event.currentTarget = matched.elem, j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++) handleObj = matched.matches[j], (run_all || !event.namespace && !handleObj.namespace || event.namespace_re && event.namespace_re.test(handleObj.namespace)) && (event.data = handleObj.data, event.handleObj = handleObj, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), ret !== undefined && (event.result = ret, ret === !1 && (event.preventDefault(), event.stopPropagation())));
                return special.postDispatch && special.postDispatch.call(this, event), event.result
            }
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (event, original) {
                return null == event.which && (event.which = null != original.charCode ? original.charCode : original.keyCode), event
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (event, original) {
                var eventDoc, doc, body, button = original.button, fromElement = original.fromElement;
                return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), !event.relatedTarget && fromElement && (event.relatedTarget = fromElement === event.target ? original.toElement : fromElement), event.which || button === undefined || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), event
            }
        },
        fix: function (event) {
            if (event[jQuery.expando]) return event;
            var i, prop, originalEvent = event, fixHook = jQuery.event.fixHooks[event.type] || {},
                copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
            for (event = jQuery.Event(originalEvent), i = copy.length; i;) prop = copy[--i], event[prop] = originalEvent[prop];
            return event.target || (event.target = originalEvent.srcElement || document), 3 === event.target.nodeType && (event.target = event.target.parentNode), event.metaKey = !!event.metaKey, fixHook.filter ? fixHook.filter(event, originalEvent) : event
        },
        special: {
            load: {noBubble: !0},
            focus: {delegateType: "focusin"},
            blur: {delegateType: "focusout"},
            beforeunload: {
                setup: function (data, namespaces, eventHandle) {
                    jQuery.isWindow(this) && (this.onbeforeunload = eventHandle)
                }, teardown: function (namespaces, eventHandle) {
                    this.onbeforeunload === eventHandle && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function (type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event, event, {type: type, isSimulated: !0, originalEvent: {}});
            bubble ? jQuery.event.trigger(e, null, elem) : jQuery.event.dispatch.call(elem, e), e.isDefaultPrevented() && event.preventDefault()
        }
    }, jQuery.event.handle = jQuery.event.dispatch, jQuery.removeEvent = document.removeEventListener ? function (elem, type, handle) {
        elem.removeEventListener && elem.removeEventListener(type, handle, !1)
    } : function (elem, type, handle) {
        var name = "on" + type;
        elem.detachEvent && ("undefined" == typeof elem[name] && (elem[name] = null), elem.detachEvent(name, handle))
    }, jQuery.Event = function (src, props) {
        return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || src.returnValue === !1 || src.getPreventDefault && src.getPreventDefault() ? returnTrue : returnFalse) : this.type = src, props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), void (this[jQuery.expando] = !0)) : new jQuery.Event(src, props)
    }, jQuery.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = returnTrue;
            var e = this.originalEvent;
            e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function () {
            this.isPropagationStopped = returnTrue;
            var e = this.originalEvent;
            e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = returnTrue, this.stopPropagation()
        },
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse
    }, jQuery.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix, bindType: fix, handle: function (event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                handleObj.selector;
                return related && (related === target || jQuery.contains(target, related)) || (event.type = handleObj.origType, ret = handleObj.handler.apply(this, arguments), event.type = fix), ret
            }
        }
    }), jQuery.support.submitBubbles || (jQuery.event.special.submit = {
        setup: function () {
            return !jQuery.nodeName(this, "form") && void jQuery.event.add(this, "click._submit keypress._submit", function (e) {
                var elem = e.target,
                    form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
                form && !jQuery._data(form, "_submit_attached") && (jQuery.event.add(form, "submit._submit", function (event) {
                    event._submit_bubble = !0
                }), jQuery._data(form, "_submit_attached", !0))
            })
        }, postDispatch: function (event) {
            event._submit_bubble && (delete event._submit_bubble,
            this.parentNode && !event.isTrigger && jQuery.event.simulate("submit", this.parentNode, event, !0))
        }, teardown: function () {
            return !jQuery.nodeName(this, "form") && void jQuery.event.remove(this, "._submit")
        }
    }), jQuery.support.changeBubbles || (jQuery.event.special.change = {
        setup: function () {
            return rformElems.test(this.nodeName) ? ("checkbox" !== this.type && "radio" !== this.type || (jQuery.event.add(this, "propertychange._change", function (event) {
                "checked" === event.originalEvent.propertyName && (this._just_changed = !0)
            }), jQuery.event.add(this, "click._change", function (event) {
                this._just_changed && !event.isTrigger && (this._just_changed = !1), jQuery.event.simulate("change", this, event, !0)
            })), !1) : void jQuery.event.add(this, "beforeactivate._change", function (e) {
                var elem = e.target;
                rformElems.test(elem.nodeName) && !jQuery._data(elem, "_change_attached") && (jQuery.event.add(elem, "change._change", function (event) {
                    !this.parentNode || event.isSimulated || event.isTrigger || jQuery.event.simulate("change", this.parentNode, event, !0)
                }), jQuery._data(elem, "_change_attached", !0))
            })
        }, handle: function (event) {
            var elem = event.target;
            if (this !== elem || event.isSimulated || event.isTrigger || "radio" !== elem.type && "checkbox" !== elem.type) return event.handleObj.handler.apply(this, arguments)
        }, teardown: function () {
            return jQuery.event.remove(this, "._change"), !rformElems.test(this.nodeName)
        }
    }), jQuery.support.focusinBubbles || jQuery.each({focus: "focusin", blur: "focusout"}, function (orig, fix) {
        var attaches = 0, handler = function (event) {
            jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), !0)
        };
        jQuery.event.special[fix] = {
            setup: function () {
                0 === attaches++ && document.addEventListener(orig, handler, !0)
            }, teardown: function () {
                0 === --attaches && document.removeEventListener(orig, handler, !0)
            }
        }
    }), jQuery.fn.extend({
        on: function (types, selector, data, fn, one) {
            var origFn, type;
            if ("object" == typeof types) {
                "string" != typeof selector && (data = data || selector, selector = undefined);
                for (type in types) this.on(type, selector, data, types[type], one);
                return this
            }
            if (null == data && null == fn ? (fn = selector, data = selector = undefined) : null == fn && ("string" == typeof selector ? (fn = data, data = undefined) : (fn = data, data = selector, selector = undefined)), fn === !1) fn = returnFalse; else if (!fn) return this;
            return 1 === one && (origFn = fn, fn = function (event) {
                return jQuery().off(event), origFn.apply(this, arguments)
            }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), this.each(function () {
                jQuery.event.add(this, types, fn, data, selector)
            })
        }, one: function (types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1)
        }, off: function (types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj, jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), this;
            if ("object" == typeof types) {
                for (type in types) this.off(type, selector, types[type]);
                return this
            }
            return selector !== !1 && "function" != typeof selector || (fn = selector, selector = undefined), fn === !1 && (fn = returnFalse), this.each(function () {
                jQuery.event.remove(this, types, fn, selector)
            })
        }, bind: function (types, data, fn) {
            return this.on(types, null, data, fn)
        }, unbind: function (types, fn) {
            return this.off(types, null, fn)
        }, live: function (types, data, fn) {
            return jQuery(this.context).on(types, this.selector, data, fn), this
        }, die: function (types, fn) {
            return jQuery(this.context).off(types, this.selector || "**", fn), this
        }, delegate: function (selector, types, data, fn) {
            return this.on(types, selector, data, fn)
        }, undelegate: function (selector, types, fn) {
            return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn)
        }, trigger: function (type, data) {
            return this.each(function () {
                jQuery.event.trigger(type, data, this)
            })
        }, triggerHandler: function (type, data) {
            if (this[0]) return jQuery.event.trigger(type, data, this[0], !0)
        }, toggle: function (fn) {
            var args = arguments, guid = fn.guid || jQuery.guid++, i = 0, toggler = function (event) {
                var lastToggle = (jQuery._data(this, "lastToggle" + fn.guid) || 0) % i;
                return jQuery._data(this, "lastToggle" + fn.guid, lastToggle + 1), event.preventDefault(), args[lastToggle].apply(this, arguments) || !1
            };
            for (toggler.guid = guid; i < args.length;) args[i++].guid = guid;
            return this.click(toggler)
        }, hover: function (fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
        }
    }), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (i, name) {
        jQuery.fn[name] = function (data, fn) {
            return null == fn && (fn = data, data = null), arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name)
        }, rkeyEvent.test(name) && (jQuery.event.fixHooks[name] = jQuery.event.keyHooks), rmouseEvent.test(name) && (jQuery.event.fixHooks[name] = jQuery.event.mouseHooks)
    }), function (window, undefined) {
        function Sizzle(selector, context, results, seed) {
            results = results || [], context = context || document;
            var match, elem, xml, m, nodeType = context.nodeType;
            if (!selector || "string" != typeof selector) return results;
            if (1 !== nodeType && 9 !== nodeType) return [];
            if (xml = isXML(context), !xml && !seed && (match = rquickExpr.exec(selector))) if (m = match[1]) {
                if (9 === nodeType) {
                    if (elem = context.getElementById(m), !elem || !elem.parentNode) return results;
                    if (elem.id === m) return results.push(elem), results
                } else if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), results
            } else {
                if (match[2]) return push.apply(results, slice.call(context.getElementsByTagName(selector), 0)), results;
                if ((m = match[3]) && assertUsableClassName && context.getElementsByClassName) return push.apply(results, slice.call(context.getElementsByClassName(m), 0)), results
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed, xml)
        }

        function createInputPseudo(type) {
            return function (elem) {
                var name = elem.nodeName.toLowerCase();
                return "input" === name && elem.type === type
            }
        }

        function createButtonPseudo(type) {
            return function (elem) {
                var name = elem.nodeName.toLowerCase();
                return ("input" === name || "button" === name) && elem.type === type
            }
        }

        function createPositionalPseudo(fn) {
            return markFunction(function (argument) {
                return argument = +argument, markFunction(function (seed, matches) {
                    for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--;) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]))
                })
            })
        }

        function siblingCheck(a, b, ret) {
            if (a === b) return ret;
            for (var cur = a.nextSibling; cur;) {
                if (cur === b) return -1;
                cur = cur.nextSibling
            }
            return 1
        }

        function tokenize(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[expando][selector + " "];
            if (cached) return parseOnly ? 0 : cached.slice(0);
            for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar;) {
                matched && !(match = rcomma.exec(soFar)) || (match && (soFar = soFar.slice(match[0].length) || soFar), groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (tokens.push(matched = new Token(match.shift())), soFar = soFar.slice(matched.length), matched.type = match[0].replace(rtrim, " "));
                for (type in Expr.filter) !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (tokens.push(matched = new Token(match.shift())), soFar = soFar.slice(matched.length), matched.type = type, matched.matches = match);
                if (!matched) break
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0)
        }

        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir, checkNonElements = base && "parentNode" === combinator.dir, doneName = done++;
            return combinator.first ? function (elem, context, xml) {
                for (; elem = elem[dir];) if (checkNonElements || 1 === elem.nodeType) return matcher(elem, context, xml)
            } : function (elem, context, xml) {
                if (xml) {
                    for (; elem = elem[dir];) if ((checkNonElements || 1 === elem.nodeType) && matcher(elem, context, xml)) return elem
                } else for (var cache, dirkey = dirruns + " " + doneName + " ", cachedkey = dirkey + cachedruns; elem = elem[dir];) if (checkNonElements || 1 === elem.nodeType) {
                    if ((cache = elem[expando]) === cachedkey) return elem.sizset;
                    if ("string" == typeof cache && 0 === cache.indexOf(dirkey)) {
                        if (elem.sizset) return elem
                    } else {
                        if (elem[expando] = cachedkey, matcher(elem, context, xml)) return elem.sizset = !0, elem;
                        elem.sizset = !1
                    }
                }
            }
        }

        function elementMatcher(matchers) {
            return matchers.length > 1 ? function (elem, context, xml) {
                for (var i = matchers.length; i--;) if (!matchers[i](elem, context, xml)) return !1;
                return !0
            } : matchers[0]
        }

        function condense(unmatched, map, filter, context, xml) {
            for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; i < len; i++) (elem = unmatched[i]) && (filter && !filter(elem, context, xml) || (newUnmatched.push(elem), mapped && map.push(i)));
            return newUnmatched
        }

        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), markFunction(function (seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length,
                    elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
                    matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml),
                    matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter) for (temp = condense(matcherOut, postMap), postFilter(temp, [], context, xml), i = temp.length; i--;) (elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            for (temp = [], i = matcherOut.length; i--;) (elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                            postFinder(null, matcherOut = [], temp, xml)
                        }
                        for (i = matcherOut.length; i--;) (elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem))
                    }
                } else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut)
            })
        }

        function matcherFromTokens(tokens) {
            for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function (elem) {
                return elem === checkContext
            }, implicitRelative, !0), matchAnyContext = addCombinator(function (elem) {
                return indexOf.call(checkContext, elem) > -1
            }, implicitRelative, !0), matchers = [function (elem, context, xml) {
                return !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml))
            }]; i < len; i++) if (matcher = Expr.relative[tokens[i].type]) matchers = [addCombinator(elementMatcher(matchers), matcher)]; else {
                if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
                    for (j = ++i; j < len && !Expr.relative[tokens[j].type]; j++) ;
                    return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && tokens.slice(0, i - 1).join("").replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && tokens.join(""))
                }
                matchers.push(matcher)
            }
            return elementMatcher(matchers)
        }

        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0,
                superMatcher = function (seed, context, xml, results, expandContext) {
                    var elem, j, matcher, setMatched = [], matchedCount = 0, i = "0", unmatched = seed && [],
                        outermost = null != expandContext, contextBackup = outermostContext,
                        elems = seed || byElement && Expr.find.TAG("*", expandContext && context.parentNode || context),
                        dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.E;
                    for (outermost && (outermostContext = context !== document && context, cachedruns = superMatcher.el); null != (elem = elems[i]); i++) {
                        if (byElement && elem) {
                            for (j = 0; matcher = elementMatchers[j]; j++) if (matcher(elem, context, xml)) {
                                results.push(elem);
                                break
                            }
                            outermost && (dirruns = dirrunsUnique, cachedruns = ++superMatcher.el)
                        }
                        bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem))
                    }
                    if (matchedCount += i, bySet && i !== matchedCount) {
                        for (j = 0; matcher = setMatchers[j]; j++) matcher(unmatched, setMatched, context, xml);
                        if (seed) {
                            if (matchedCount > 0) for (; i--;) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                            setMatched = condense(setMatched)
                        }
                        push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results)
                    }
                    return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), unmatched
                };
            return superMatcher.el = 0, bySet ? markFunction(superMatcher) : superMatcher
        }

        function multipleContexts(selector, contexts, results) {
            for (var i = 0, len = contexts.length; i < len; i++) Sizzle(selector, contexts[i], results);
            return results
        }

        function select(selector, context, results, seed, xml) {
            var i, tokens, token, type, find, match = tokenize(selector);
            match.length;
            if (!seed && 1 === match.length) {
                if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && 9 === context.nodeType && !xml && Expr.relative[tokens[1].type]) {
                    if (context = Expr.find.ID(token.matches[0].replace(rbackslash, ""), context, xml)[0], !context) return results;
                    selector = selector.slice(tokens.shift().length)
                }
                for (i = matchExpr.POS.test(selector) ? -1 : tokens.length - 1; i >= 0 && (token = tokens[i], !Expr.relative[type = token.type]); i--) if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(rbackslash, ""), rsibling.test(tokens[0].type) && context.parentNode || context, xml))) {
                    if (tokens.splice(i, 1), selector = seed.length && tokens.join(""), !selector) return push.apply(results, slice.call(seed, 0)), results;
                    break
                }
            }
            return compile(selector, match)(seed, context, xml, results, rsibling.test(selector)), results
        }

        function setFilters() {
        }

        var cachedruns, assertGetIdNotName, Expr, getText, isXML, contains, compile, sortOrder, hasDuplicate,
            outermostContext, baseHasDuplicate = !0, strundefined = "undefined",
            expando = ("sizcache" + Math.random()).replace(".", ""), Token = String, document = window.document,
            docElem = document.documentElement, dirruns = 0, done = 0, pop = [].pop, push = [].push, slice = [].slice,
            indexOf = [].indexOf || function (elem) {
                for (var i = 0, len = this.length; i < len; i++) if (this[i] === elem) return i;
                return -1
            }, markFunction = function (fn, value) {
                return fn[expando] = null == value || value, fn
            }, createCache = function () {
                var cache = {}, keys = [];
                return markFunction(function (key, value) {
                    return keys.push(key) > Expr.cacheLength && delete cache[keys.shift()], cache[key + " "] = value
                }, cache)
            }, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(),
            whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
            identifier = characterEncoding.replace("w", "w#"), operators = "([*^$|!~]?=)",
            attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",
            pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + attributes + ")|[^:]|\\\\.)*|.*))\\)|)",
            pos = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)",
            rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
            rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
            rcombinators = new RegExp("^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*"),
            rpseudo = new RegExp(pseudos), rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
            rsibling = /[\x20\t\r\n\f]*[+~]/, rheader = /h\d/i, rinputs = /input|select|textarea|button/i,
            rbackslash = /\\(?!\\)/g, matchExpr = {
                ID: new RegExp("^#(" + characterEncoding + ")"),
                CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
                NAME: new RegExp("^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]"),
                TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + attributes),
                PSEUDO: new RegExp("^" + pseudos),
                POS: new RegExp(pos, "i"),
                CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                needsContext: new RegExp("^" + whitespace + "*[>+~]|" + pos, "i")
            }, assert = function (fn) {
                var div = document.createElement("div");
                try {
                    return fn(div)
                } catch (e) {
                    return !1
                } finally {
                    div = null
                }
            }, assertTagNameNoComments = assert(function (div) {
                return div.appendChild(document.createComment("")), !div.getElementsByTagName("*").length
            }), assertHrefNotNormalized = assert(function (div) {
                return div.innerHTML = "<a href='#'></a>", div.firstChild && typeof div.firstChild.getAttribute !== strundefined && "#" === div.firstChild.getAttribute("href")
            }), assertAttributes = assert(function (div) {
                div.innerHTML = "<select></select>";
                var type = typeof div.lastChild.getAttribute("multiple");
                return "boolean" !== type && "string" !== type
            }), assertUsableClassName = assert(function (div) {
                return div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !(!div.getElementsByClassName || !div.getElementsByClassName("e").length) && (div.lastChild.className = "e", 2 === div.getElementsByClassName("e").length)
            }), assertUsableName = assert(function (div) {
                div.id = expando + 0, div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>", docElem.insertBefore(div, docElem.firstChild);
                var pass = document.getElementsByName && document.getElementsByName(expando).length === 2 + document.getElementsByName(expando + 0).length;
                return assertGetIdNotName = !document.getElementById(expando), docElem.removeChild(div), pass
            });
        try {
            slice.call(docElem.childNodes, 0)[0].nodeType
        } catch (e) {
            slice = function (i) {
                for (var elem, results = []; elem = this[i]; i++) results.push(elem);
                return results
            }
        }
        Sizzle.matches = function (expr, elements) {
            return Sizzle(expr, null, null, elements)
        }, Sizzle.matchesSelector = function (elem, expr) {
            return Sizzle(expr, null, null, [elem]).length > 0
        }, getText = Sizzle.getText = function (elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (nodeType) {
                if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                    if ("string" == typeof elem.textContent) return elem.textContent;
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem)
                } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue
            } else for (; node = elem[i]; i++) ret += getText(node);
            return ret
        }, isXML = Sizzle.isXML = function (elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return !!documentElement && "HTML" !== documentElement.nodeName
        }, contains = Sizzle.contains = docElem.contains ? function (a, b) {
            var adown = 9 === a.nodeType ? a.documentElement : a, bup = b && b.parentNode;
            return a === bup || !!(bup && 1 === bup.nodeType && adown.contains && adown.contains(bup))
        } : docElem.compareDocumentPosition ? function (a, b) {
            return b && !!(16 & a.compareDocumentPosition(b))
        } : function (a, b) {
            for (; b = b.parentNode;) if (b === a) return !0;
            return !1
        }, Sizzle.attr = function (elem, name) {
            var val, xml = isXML(elem);
            return xml || (name = name.toLowerCase()), (val = Expr.attrHandle[name]) ? val(elem) : xml || assertAttributes ? elem.getAttribute(name) : (val = elem.getAttributeNode(name), val ? "boolean" == typeof elem[name] ? elem[name] ? name : null : val.specified ? val.value : null : null)
        }, Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: assertHrefNotNormalized ? {} : {
                href: function (elem) {
                    return elem.getAttribute("href", 2)
                }, type: function (elem) {
                    return elem.getAttribute("type")
                }
            },
            find: {
                ID: assertGetIdNotName ? function (id, context, xml) {
                    if (typeof context.getElementById !== strundefined && !xml) {
                        var m = context.getElementById(id);
                        return m && m.parentNode ? [m] : []
                    }
                } : function (id, context, xml) {
                    if (typeof context.getElementById !== strundefined && !xml) {
                        var m = context.getElementById(id);
                        return m ? m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ? [m] : undefined : []
                    }
                }, TAG: assertTagNameNoComments ? function (tag, context) {
                    if (typeof context.getElementsByTagName !== strundefined) return context.getElementsByTagName(tag)
                } : function (tag, context) {
                    var results = context.getElementsByTagName(tag);
                    if ("*" === tag) {
                        for (var elem, tmp = [], i = 0; elem = results[i]; i++) 1 === elem.nodeType && tmp.push(elem);
                        return tmp
                    }
                    return results
                }, NAME: assertUsableName && function (tag, context) {
                    if (typeof context.getElementsByName !== strundefined) return context.getElementsByName(name)
                }, CLASS: assertUsableClassName && function (className, context, xml) {
                    if (typeof context.getElementsByClassName !== strundefined && !xml) return context.getElementsByClassName(className)
                }
            },
            relative: {
                ">": {dir: "parentNode", first: !0},
                " ": {dir: "parentNode"},
                "+": {dir: "previousSibling", first: !0},
                "~": {dir: "previousSibling"}
            },
            preFilter: {
                ATTR: function (match) {
                    return match[1] = match[1].replace(rbackslash, ""), match[3] = (match[4] || match[5] || "").replace(rbackslash, ""), "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4)
                }, CHILD: function (match) {
                    return match[1] = match[1].toLowerCase(), "nth" === match[1] ? (match[2] || Sizzle.error(match[0]), match[3] = +(match[3] ? match[4] + (match[5] || 1) : 2 * ("even" === match[2] || "odd" === match[2])), match[4] = +(match[6] + match[7] || "odd" === match[2])) : match[2] && Sizzle.error(match[0]), match
                }, PSEUDO: function (match) {
                    var unquoted, excess;
                    return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[3] : (unquoted = match[4]) && (rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (unquoted = unquoted.slice(0, excess), match[0] = match[0].slice(0, excess)), match[2] = unquoted), match.slice(0, 3))
                }
            },
            filter: {
                ID: assertGetIdNotName ? function (id) {
                    return id = id.replace(rbackslash, ""), function (elem) {
                        return elem.getAttribute("id") === id
                    }
                } : function (id) {
                    return id = id.replace(rbackslash, ""), function (elem) {
                        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                        return node && node.value === id
                    }
                }, TAG: function (nodeName) {
                    return "*" === nodeName ? function () {
                        return !0
                    } : (nodeName = nodeName.replace(rbackslash, "").toLowerCase(), function (elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
                    })
                }, CLASS: function (className) {
                    var pattern = classCache[expando][className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
                        return pattern.test(elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "")
                    })
                }, ATTR: function (name, operator, check) {
                    return function (elem, context) {
                        var result = Sizzle.attr(elem, name);
                        return null == result ? "!=" === operator : !operator || (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.substr(result.length - check.length) === check : "~=" === operator ? (" " + result + " ").indexOf(check) > -1 : "|=" === operator && (result === check || result.substr(0, check.length + 1) === check + "-"))
                    }
                }, CHILD: function (type, argument, first, last) {
                    return "nth" === type ? function (elem) {
                        var node, diff, parent = elem.parentNode;
                        if (1 === first && 0 === last) return !0;
                        if (parent) for (diff = 0, node = parent.firstChild; node && (1 !== node.nodeType || (diff++, elem !== node)); node = node.nextSibling) ;
                        return diff -= last, diff === first || diff % first === 0 && diff / first >= 0
                    } : function (elem) {
                        var node = elem;
                        switch (type) {
                            case"only":
                            case"first":
                                for (; node = node.previousSibling;) if (1 === node.nodeType) return !1;
                                if ("first" === type) return !0;
                                node = elem;
                            case"last":
                                for (; node = node.nextSibling;) if (1 === node.nodeType) return !1;
                                return !0
                        }
                    }
                }, PSEUDO: function (pseudo, argument) {
                    var args,
                        fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [pseudo, pseudo, "", argument], Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
                        for (var idx, matched = fn(seed, argument), i = matched.length; i--;) idx = indexOf.call(seed, matched[i]), seed[idx] = !(matches[idx] = matched[i])
                    }) : function (elem) {
                        return fn(elem, 0, args)
                    }) : fn
                }
            },
            pseudos: {
                not: markFunction(function (selector) {
                    var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
                        for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--;) (elem = unmatched[i]) && (seed[i] = !(matches[i] = elem))
                    }) : function (elem, context, xml) {
                        return input[0] = elem, matcher(input, null, xml, results), !results.pop()
                    }
                }),
                has: markFunction(function (selector) {
                    return function (elem) {
                        return Sizzle(selector, elem).length > 0
                    }
                }),
                contains: markFunction(function (text) {
                    return function (elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1
                    }
                }),
                enabled: function (elem) {
                    return elem.disabled === !1
                },
                disabled: function (elem) {
                    return elem.disabled === !0
                },
                checked: function (elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected
                },
                selected: function (elem) {
                    return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0
                },
                parent: function (elem) {
                    return !Expr.pseudos.empty(elem)
                },
                empty: function (elem) {
                    var nodeType;
                    for (elem = elem.firstChild; elem;) {
                        if (elem.nodeName > "@" || 3 === (nodeType = elem.nodeType) || 4 === nodeType) return !1;
                        elem = elem.nextSibling
                    }
                    return !0
                },
                header: function (elem) {
                    return rheader.test(elem.nodeName)
                },
                text: function (elem) {
                    var type, attr;
                    return "input" === elem.nodeName.toLowerCase() && "text" === (type = elem.type) && (null == (attr = elem.getAttribute("type")) || attr.toLowerCase() === type)
                },
                radio: createInputPseudo("radio"),
                checkbox: createInputPseudo("checkbox"),
                file: createInputPseudo("file"),
                password: createInputPseudo("password"),
                image: createInputPseudo("image"),
                submit: createButtonPseudo("submit"),
                reset: createButtonPseudo("reset"),
                button: function (elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && "button" === elem.type || "button" === name
                },
                input: function (elem) {
                    return rinputs.test(elem.nodeName)
                },
                focus: function (elem) {
                    var doc = elem.ownerDocument;
                    return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex)
                },
                active: function (elem) {
                    return elem === elem.ownerDocument.activeElement
                },
                first: createPositionalPseudo(function () {
                    return [0]
                }),
                last: createPositionalPseudo(function (matchIndexes, length) {
                    return [length - 1]
                }),
                eq: createPositionalPseudo(function (matchIndexes, length, argument) {
                    return [argument < 0 ? argument + length : argument]
                }),
                even: createPositionalPseudo(function (matchIndexes, length) {
                    for (var i = 0; i < length; i += 2) matchIndexes.push(i);
                    return matchIndexes
                }),
                odd: createPositionalPseudo(function (matchIndexes, length) {
                    for (var i = 1; i < length; i += 2) matchIndexes.push(i);
                    return matchIndexes
                }),
                lt: createPositionalPseudo(function (matchIndexes, length, argument) {
                    for (var i = argument < 0 ? argument + length : argument; --i >= 0;) matchIndexes.push(i);
                    return matchIndexes
                }),
                gt: createPositionalPseudo(function (matchIndexes, length, argument) {
                    for (var i = argument < 0 ? argument + length : argument; ++i < length;) matchIndexes.push(i);
                    return matchIndexes
                })
            }
        }, sortOrder = docElem.compareDocumentPosition ? function (a, b) {
            return a === b ? (hasDuplicate = !0, 0) : (a.compareDocumentPosition && b.compareDocumentPosition ? 4 & a.compareDocumentPosition(b) : a.compareDocumentPosition) ? -1 : 1
        } : function (a, b) {
            if (a === b) return hasDuplicate = !0, 0;
            if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
            var al, bl, ap = [], bp = [], aup = a.parentNode, bup = b.parentNode, cur = aup;
            if (aup === bup) return siblingCheck(a, b);
            if (!aup) return -1;
            if (!bup) return 1;
            for (; cur;) ap.unshift(cur), cur = cur.parentNode;
            for (cur = bup; cur;) bp.unshift(cur), cur = cur.parentNode;
            al = ap.length, bl = bp.length;
            for (var i = 0; i < al && i < bl; i++) if (ap[i] !== bp[i]) return siblingCheck(ap[i], bp[i]);
            return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1)
        }, [0, 0].sort(sortOrder), baseHasDuplicate = !hasDuplicate, Sizzle.uniqueSort = function (results) {
            var elem, duplicates = [], i = 1, j = 0;
            if (hasDuplicate = baseHasDuplicate, results.sort(sortOrder), hasDuplicate) {
                for (; elem = results[i]; i++) elem === results[i - 1] && (j = duplicates.push(i));
                for (; j--;) results.splice(duplicates[j], 1)
            }
            return results
        }, Sizzle.error = function (msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg)
        }, compile = Sizzle.compile = function (selector, group) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[expando][selector + " "];
            if (!cached) {
                for (group || (group = tokenize(selector)), i = group.length; i--;) cached = matcherFromTokens(group[i]), cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers))
            }
            return cached
        }, document.querySelectorAll && !function () {
            var disconnectedMatch, oldSelect = select, rescape = /'|\\/g,
                rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, rbuggyQSA = [":focus"],
                rbuggyMatches = [":active"],
                matches = docElem.matchesSelector || docElem.mozMatchesSelector || docElem.webkitMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector;
            assert(function (div) {
                div.innerHTML = "<select><option selected=''></option></select>", div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked")
            }), assert(function (div) {
                div.innerHTML = "<p test=''></p>", div.querySelectorAll("[test^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:\"\"|'')"), div.innerHTML = "<input type='hidden'/>", div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled")
            }), rbuggyQSA = new RegExp(rbuggyQSA.join("|")), select = function (selector, context, results, seed, xml) {
                if (!seed && !xml && !rbuggyQSA.test(selector)) {
                    var groups, i, old = !0, nid = expando, newContext = context,
                        newSelector = 9 === context.nodeType && selector;
                    if (1 === context.nodeType && "object" !== context.nodeName.toLowerCase()) {
                        for (groups = tokenize(selector), (old = context.getAttribute("id")) ? nid = old.replace(rescape, "\\$&") : context.setAttribute("id", nid), nid = "[id='" + nid + "'] ", i = groups.length; i--;) groups[i] = nid + groups[i].join("");
                        newContext = rsibling.test(selector) && context.parentNode || context, newSelector = groups.join(",")
                    }
                    if (newSelector) try {
                        return push.apply(results, slice.call(newContext.querySelectorAll(newSelector), 0)), results
                    } catch (qsaError) {
                    } finally {
                        old || context.removeAttribute("id")
                    }
                }
                return oldSelect(selector, context, results, seed, xml)
            }, matches && (assert(function (div) {
                disconnectedMatch = matches.call(div, "div");
                try {
                    matches.call(div, "[test!='']:sizzle"), rbuggyMatches.push("!=", pseudos)
                } catch (e) {
                }
            }), rbuggyMatches = new RegExp(rbuggyMatches.join("|")), Sizzle.matchesSelector = function (elem, expr) {
                if (expr = expr.replace(rattributeQuotes, "='$1']"), !isXML(elem) && !rbuggyMatches.test(expr) && !rbuggyQSA.test(expr)) try {
                    var ret = matches.call(elem, expr);
                    if (ret || disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret
                } catch (e) {
                }
                return Sizzle(expr, null, null, [elem]).length > 0
            })
        }(), Expr.pseudos.nth = Expr.pseudos.eq, Expr.filters = setFilters.prototype = Expr.pseudos, Expr.setFilters = new setFilters, Sizzle.attr = jQuery.attr, jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, jQuery.contains = Sizzle.contains
    }(window);
    var runtil = /Until$/, rparentsprev = /^(?:parents|prev(?:Until|All))/, isSimple = /^.[^:#\[\.,]*$/,
        rneedsContext = jQuery.expr.match.needsContext,
        guaranteedUnique = {children: !0, contents: !0, next: !0, prev: !0};
    jQuery.fn.extend({
        find: function (selector) {
            var i, l, length, n, r, ret, self = this;
            if ("string" != typeof selector) return jQuery(selector).filter(function () {
                for (i = 0, l = self.length; i < l; i++) if (jQuery.contains(self[i], this)) return !0
            });
            for (ret = this.pushStack("", "find", selector), i = 0, l = this.length; i < l; i++) if (length = ret.length, jQuery.find(selector, this[i], ret), i > 0) for (n = length; n < ret.length; n++) for (r = 0; r < length; r++) if (ret[r] === ret[n]) {
                ret.splice(n--, 1);
                break
            }
            return ret
        }, has: function (target) {
            var i, targets = jQuery(target, this), len = targets.length;
            return this.filter(function () {
                for (i = 0; i < len; i++) if (jQuery.contains(this, targets[i])) return !0
            })
        }, not: function (selector) {
            return this.pushStack(winnow(this, selector, !1), "not", selector)
        }, filter: function (selector) {
            return this.pushStack(winnow(this, selector, !0), "filter", selector)
        }, is: function (selector) {
            return !!selector && ("string" == typeof selector ? rneedsContext.test(selector) ? jQuery(selector, this.context).index(this[0]) >= 0 : jQuery.filter(selector, this).length > 0 : this.filter(selector).length > 0)
        }, closest: function (selectors, context) {
            for (var cur, i = 0, l = this.length, ret = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; i < l; i++) for (cur = this[i]; cur && cur.ownerDocument && cur !== context && 11 !== cur.nodeType;) {
                if (pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors)) {
                    ret.push(cur);
                    break
                }
                cur = cur.parentNode
            }
            return ret = ret.length > 1 ? jQuery.unique(ret) : ret, this.pushStack(ret, "closest", selectors)
        }, index: function (elem) {
            return elem ? "string" == typeof elem ? jQuery.inArray(this[0], jQuery(elem)) : jQuery.inArray(elem.jquery ? elem[0] : elem, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1;
        }, add: function (selector, context) {
            var set = "string" == typeof selector ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector),
                all = jQuery.merge(this.get(), set);
            return this.pushStack(isDisconnected(set[0]) || isDisconnected(all[0]) ? all : jQuery.unique(all))
        }, addBack: function (selector) {
            return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector))
        }
    }), jQuery.fn.andSelf = jQuery.fn.addBack, jQuery.each({
        parent: function (elem) {
            var parent = elem.parentNode;
            return parent && 11 !== parent.nodeType ? parent : null
        }, parents: function (elem) {
            return jQuery.dir(elem, "parentNode")
        }, parentsUntil: function (elem, i, until) {
            return jQuery.dir(elem, "parentNode", until)
        }, next: function (elem) {
            return sibling(elem, "nextSibling")
        }, prev: function (elem) {
            return sibling(elem, "previousSibling")
        }, nextAll: function (elem) {
            return jQuery.dir(elem, "nextSibling")
        }, prevAll: function (elem) {
            return jQuery.dir(elem, "previousSibling")
        }, nextUntil: function (elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until)
        }, prevUntil: function (elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until)
        }, siblings: function (elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem)
        }, children: function (elem) {
            return jQuery.sibling(elem.firstChild)
        }, contents: function (elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes)
        }
    }, function (name, fn) {
        jQuery.fn[name] = function (until, selector) {
            var ret = jQuery.map(this, fn, until);
            return runtil.test(name) || (selector = until), selector && "string" == typeof selector && (ret = jQuery.filter(selector, ret)), ret = this.length > 1 && !guaranteedUnique[name] ? jQuery.unique(ret) : ret, this.length > 1 && rparentsprev.test(name) && (ret = ret.reverse()), this.pushStack(ret, name, core_slice.call(arguments).join(","))
        }
    }), jQuery.extend({
        filter: function (expr, elems, not) {
            return not && (expr = ":not(" + expr + ")"), 1 === elems.length ? jQuery.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] : jQuery.find.matches(expr, elems)
        }, dir: function (elem, dir, until) {
            for (var matched = [], cur = elem[dir]; cur && 9 !== cur.nodeType && (until === undefined || 1 !== cur.nodeType || !jQuery(cur).is(until));) 1 === cur.nodeType && matched.push(cur), cur = cur[dir];
            return matched
        }, sibling: function (n, elem) {
            for (var r = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && r.push(n);
            return r
        }
    });
    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g, rleadingWhitespace = /^\s+/,
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/,
        rtbody = /<tbody/i, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i,
        rnocache = /<(?:script|object|embed|option|style)/i,
        rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"), rcheckableType = /^(?:checkbox|radio)$/,
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /\/(java|ecma)script/i,
        rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g, wrapMap = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        }, safeFragment = createSafeFragment(document),
        fragmentDiv = safeFragment.appendChild(document.createElement("div"));
    wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, wrapMap.th = wrapMap.td, jQuery.support.htmlSerialize || (wrapMap._default = [1, "X<div>", "</div>"]), jQuery.fn.extend({
        text: function (value) {
            return jQuery.access(this, function (value) {
                return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value))
            }, null, value, arguments.length)
        }, wrapAll: function (html) {
            if (jQuery.isFunction(html)) return this.each(function (i) {
                jQuery(this).wrapAll(html.call(this, i))
            });
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && wrap.insertBefore(this[0]), wrap.map(function () {
                    for (var elem = this; elem.firstChild && 1 === elem.firstChild.nodeType;) elem = elem.firstChild;
                    return elem
                }).append(this)
            }
            return this
        }, wrapInner: function (html) {
            return jQuery.isFunction(html) ? this.each(function (i) {
                jQuery(this).wrapInner(html.call(this, i))
            }) : this.each(function () {
                var self = jQuery(this), contents = self.contents();
                contents.length ? contents.wrapAll(html) : self.append(html)
            })
        }, wrap: function (html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function (i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes)
            }).end()
        }, append: function () {
            return this.domManip(arguments, !0, function (elem) {
                1 !== this.nodeType && 11 !== this.nodeType || this.appendChild(elem)
            })
        }, prepend: function () {
            return this.domManip(arguments, !0, function (elem) {
                1 !== this.nodeType && 11 !== this.nodeType || this.insertBefore(elem, this.firstChild)
            })
        }, before: function () {
            if (!isDisconnected(this[0])) return this.domManip(arguments, !1, function (elem) {
                this.parentNode.insertBefore(elem, this)
            });
            if (arguments.length) {
                var set = jQuery.clean(arguments);
                return this.pushStack(jQuery.merge(set, this), "before", this.selector)
            }
        }, after: function () {
            if (!isDisconnected(this[0])) return this.domManip(arguments, !1, function (elem) {
                this.parentNode.insertBefore(elem, this.nextSibling)
            });
            if (arguments.length) {
                var set = jQuery.clean(arguments);
                return this.pushStack(jQuery.merge(this, set), "after", this.selector)
            }
        }, remove: function (selector, keepData) {
            for (var elem, i = 0; null != (elem = this[i]); i++) selector && !jQuery.filter(selector, [elem]).length || (keepData || 1 !== elem.nodeType || (jQuery.cleanData(elem.getElementsByTagName("*")), jQuery.cleanData([elem])), elem.parentNode && elem.parentNode.removeChild(elem));
            return this
        }, empty: function () {
            for (var elem, i = 0; null != (elem = this[i]); i++) for (1 === elem.nodeType && jQuery.cleanData(elem.getElementsByTagName("*")); elem.firstChild;) elem.removeChild(elem.firstChild);
            return this
        }, clone: function (dataAndEvents, deepDataAndEvents) {
            return dataAndEvents = null != dataAndEvents && dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, this.map(function () {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
            })
        }, html: function (value) {
            return jQuery.access(this, function (value) {
                var elem = this[0] || {}, i = 0, l = this.length;
                if (value === undefined) return 1 === elem.nodeType ? elem.innerHTML.replace(rinlinejQuery, "") : undefined;
                if ("string" == typeof value && !rnoInnerhtml.test(value) && (jQuery.support.htmlSerialize || !rnoshimcache.test(value)) && (jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (; i < l; i++) elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(elem.getElementsByTagName("*")), elem.innerHTML = value);
                        elem = 0
                    } catch (e) {
                    }
                }
                elem && this.empty().append(value)
            }, null, value, arguments.length)
        }, replaceWith: function (value) {
            return isDisconnected(this[0]) ? this.length ? this.pushStack(jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value) : this : jQuery.isFunction(value) ? this.each(function (i) {
                var self = jQuery(this), old = self.html();
                self.replaceWith(value.call(this, i, old))
            }) : ("string" != typeof value && (value = jQuery(value).detach()), this.each(function () {
                var next = this.nextSibling, parent = this.parentNode;
                jQuery(this).remove(), next ? jQuery(next).before(value) : jQuery(parent).append(value)
            }))
        }, detach: function (selector) {
            return this.remove(selector, !0)
        }, domManip: function (args, table, callback) {
            args = [].concat.apply([], args);
            var results, first, fragment, iNoClone, i = 0, value = args[0], scripts = [], l = this.length;
            if (!jQuery.support.checkClone && l > 1 && "string" == typeof value && rchecked.test(value)) return this.each(function () {
                jQuery(this).domManip(args, table, callback)
            });
            if (jQuery.isFunction(value)) return this.each(function (i) {
                var self = jQuery(this);
                args[0] = value.call(this, i, table ? self.html() : undefined), self.domManip(args, table, callback)
            });
            if (this[0]) {
                if (results = jQuery.buildFragment(args, this, scripts), fragment = results.fragment, first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), first) for (table = table && jQuery.nodeName(first, "tr"), iNoClone = results.cacheable || l - 1; i < l; i++) callback.call(table && jQuery.nodeName(this[i], "table") ? findOrAppend(this[i], "tbody") : this[i], i === iNoClone ? fragment : jQuery.clone(fragment, !0, !0));
                fragment = first = null, scripts.length && jQuery.each(scripts, function (i, elem) {
                    elem.src ? jQuery.ajax ? jQuery.ajax({
                        url: elem.src,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        "throws": !0
                    }) : jQuery.error("no ajax") : jQuery.globalEval((elem.text || elem.textContent || elem.innerHTML || "").replace(rcleanScript, "")), elem.parentNode && elem.parentNode.removeChild(elem)
                })
            }
            return this
        }
    }), jQuery.buildFragment = function (args, context, scripts) {
        var fragment, cacheable, cachehit, first = args[0];
        return context = context || document, context = !context.nodeType && context[0] || context, context = context.ownerDocument || context, !(1 === args.length && "string" == typeof first && first.length < 512 && context === document && "<" === first.charAt(0)) || rnocache.test(first) || !jQuery.support.checkClone && rchecked.test(first) || !jQuery.support.html5Clone && rnoshimcache.test(first) || (cacheable = !0, fragment = jQuery.fragments[first], cachehit = fragment !== undefined), fragment || (fragment = context.createDocumentFragment(), jQuery.clean(args, context, fragment, scripts), cacheable && (jQuery.fragments[first] = cachehit && fragment)), {
            fragment: fragment,
            cacheable: cacheable
        }
    }, jQuery.fragments = {}, jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (name, original) {
        jQuery.fn[name] = function (selector) {
            var elems, i = 0, ret = [], insert = jQuery(selector), l = insert.length,
                parent = 1 === this.length && this[0].parentNode;
            if ((null == parent || parent && 11 === parent.nodeType && 1 === parent.childNodes.length) && 1 === l) return insert[original](this[0]), this;
            for (; i < l; i++) elems = (i > 0 ? this.clone(!0) : this).get(), jQuery(insert[i])[original](elems), ret = ret.concat(elems);
            return this.pushStack(ret, name, insert.selector)
        }
    }), jQuery.extend({
        clone: function (elem, dataAndEvents, deepDataAndEvents) {
            var srcElements, destElements, i, clone;
            if (jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">") ? clone = elem.cloneNode(!0) : (fragmentDiv.innerHTML = elem.outerHTML, fragmentDiv.removeChild(clone = fragmentDiv.firstChild)), !(jQuery.support.noCloneEvent && jQuery.support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem))) for (cloneFixAttributes(elem, clone), srcElements = getAll(elem), destElements = getAll(clone), i = 0; srcElements[i]; ++i) destElements[i] && cloneFixAttributes(srcElements[i], destElements[i]);
            if (dataAndEvents && (cloneCopyEvent(elem, clone), deepDataAndEvents)) for (srcElements = getAll(elem), destElements = getAll(clone), i = 0; srcElements[i]; ++i) cloneCopyEvent(srcElements[i], destElements[i]);
            return srcElements = destElements = null, clone
        }, clean: function (elems, context, fragment, scripts) {
            var i, j, elem, tag, wrap, depth, div, hasBody, tbody, handleScript, jsTags,
                safe = context === document && safeFragment, ret = [];
            for (context && "undefined" != typeof context.createDocumentFragment || (context = document), i = 0; null != (elem = elems[i]); i++) if ("number" == typeof elem && (elem += ""), elem) {
                if ("string" == typeof elem) if (rhtml.test(elem)) {
                    for (safe = safe || createSafeFragment(context), div = context.createElement("div"), safe.appendChild(div), elem = elem.replace(rxhtmlTag, "<$1></$2>"), tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(), wrap = wrapMap[tag] || wrapMap._default, depth = wrap[0], div.innerHTML = wrap[1] + elem + wrap[2]; depth--;) div = div.lastChild;
                    if (!jQuery.support.tbody) for (hasBody = rtbody.test(elem), tbody = "table" !== tag || hasBody ? "<table>" !== wrap[1] || hasBody ? [] : div.childNodes : div.firstChild && div.firstChild.childNodes, j = tbody.length - 1; j >= 0; --j) jQuery.nodeName(tbody[j], "tbody") && !tbody[j].childNodes.length && tbody[j].parentNode.removeChild(tbody[j]);
                    !jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem) && div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]), div.firstChild), elem = div.childNodes, div.parentNode.removeChild(div)
                } else elem = context.createTextNode(elem);
                elem.nodeType ? ret.push(elem) : jQuery.merge(ret, elem)
            }
            if (div && (elem = div = safe = null), !jQuery.support.appendChecked) for (i = 0; null != (elem = ret[i]); i++) jQuery.nodeName(elem, "input") ? fixDefaultChecked(elem) : "undefined" != typeof elem.getElementsByTagName && jQuery.grep(elem.getElementsByTagName("input"), fixDefaultChecked);
            if (fragment) for (handleScript = function (elem) {
                if (!elem.type || rscriptType.test(elem.type)) return scripts ? scripts.push(elem.parentNode ? elem.parentNode.removeChild(elem) : elem) : fragment.appendChild(elem)
            }, i = 0; null != (elem = ret[i]); i++) jQuery.nodeName(elem, "script") && handleScript(elem) || (fragment.appendChild(elem), "undefined" != typeof elem.getElementsByTagName && (jsTags = jQuery.grep(jQuery.merge([], elem.getElementsByTagName("script")), handleScript), ret.splice.apply(ret, [i + 1, 0].concat(jsTags)), i += jsTags.length));
            return ret
        }, cleanData: function (elems, acceptData) {
            for (var data, id, elem, type, i = 0, internalKey = jQuery.expando, cache = jQuery.cache, deleteExpando = jQuery.support.deleteExpando, special = jQuery.event.special; null != (elem = elems[i]); i++) if ((acceptData || jQuery.acceptData(elem)) && (id = elem[internalKey], data = id && cache[id])) {
                if (data.events) for (type in data.events) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                cache[id] && (delete cache[id], deleteExpando ? delete elem[internalKey] : elem.removeAttribute ? elem.removeAttribute(internalKey) : elem[internalKey] = null, jQuery.deletedIds.push(id))
            }
        }
    }), function () {
        var matched, browser;
        jQuery.uaMatch = function (ua) {
            ua = ua.toLowerCase();
            var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
            return {browser: match[1] || "", version: match[2] || "0"}
        }, matched = jQuery.uaMatch(navigator.userAgent), browser = {}, matched.browser && (browser[matched.browser] = !0, browser.version = matched.version), browser.chrome ? browser.webkit = !0 : browser.webkit && (browser.safari = !0), jQuery.browser = browser, jQuery.sub = function () {
            function jQuerySub(selector, context) {
                return new jQuerySub.fn.init(selector, context)
            }

            jQuery.extend(!0, jQuerySub, this), jQuerySub.superclass = this, jQuerySub.fn = jQuerySub.prototype = this(), jQuerySub.fn.constructor = jQuerySub, jQuerySub.sub = this.sub, jQuerySub.fn.init = function (selector, context) {
                return context && context instanceof jQuery && !(context instanceof jQuerySub) && (context = jQuerySub(context)), jQuery.fn.init.call(this, selector, context, rootjQuerySub)
            }, jQuerySub.fn.init.prototype = jQuerySub.fn;
            var rootjQuerySub = jQuerySub(document);
            return jQuerySub
        }
    }();
    var curCSS, iframe, iframeDoc, ralpha = /alpha\([^)]*\)/i, ropacity = /opacity=([^)]*)/,
        rposition = /^(top|right|bottom|left)$/, rdisplayswap = /^(none|table(?!-c[ea]).+)/, rmargin = /^margin/,
        rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"),
        rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"),
        rrelNum = new RegExp("^([-+])=(" + core_pnum + ")", "i"), elemdisplay = {BODY: "block"},
        cssShow = {position: "absolute", visibility: "hidden", display: "block"},
        cssNormalTransform = {letterSpacing: 0, fontWeight: 400}, cssExpand = ["Top", "Right", "Bottom", "Left"],
        cssPrefixes = ["Webkit", "O", "Moz", "ms"], eventsToggle = jQuery.fn.toggle;
    jQuery.fn.extend({
        css: function (name, value) {
            return jQuery.access(this, function (elem, name, value) {
                return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
            }, name, value, arguments.length > 1)
        }, show: function () {
            return showHide(this, !0)
        }, hide: function () {
            return showHide(this)
        }, toggle: function (state, fn2) {
            var bool = "boolean" == typeof state;
            return jQuery.isFunction(state) && jQuery.isFunction(fn2) ? eventsToggle.apply(this, arguments) : this.each(function () {
                (bool ? state : isHidden(this)) ? jQuery(this).show() : jQuery(this).hide()
            })
        }
    }), jQuery.extend({
        cssHooks: {
            opacity: {
                get: function (elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return "" === ret ? "1" : ret
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"},
        style: function (elem, name, value, extra) {
            if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
                if (name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], value === undefined) return hooks && "get" in hooks && (ret = hooks.get(elem, !1, extra)) !== undefined ? ret : style[name];
                if (type = typeof value, "string" === type && (ret = rrelNum.exec(value)) && (value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name)), type = "number"), !(null == value || "number" === type && isNaN(value) || ("number" !== type || jQuery.cssNumber[origName] || (value += "px"), hooks && "set" in hooks && (value = hooks.set(elem, value, extra)) === undefined))) try {
                    style[name] = value
                } catch (e) {
                }
            }
        },
        css: function (elem, name, numeric, extra) {
            var val, num, hooks, origName = jQuery.camelCase(name);
            return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), val === undefined && (val = curCSS(elem, name)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), numeric || extra !== undefined ? (num = parseFloat(val), numeric || jQuery.isNumeric(num) ? num || 0 : val) : val
        },
        swap: function (elem, options, callback) {
            var ret, name, old = {};
            for (name in options) old[name] = elem.style[name], elem.style[name] = options[name];
            ret = callback.call(elem);
            for (name in options) elem.style[name] = old[name];
            return ret
        }
    }), window.getComputedStyle ? curCSS = function (elem, name) {
        var ret, width, minWidth, maxWidth, computed = window.getComputedStyle(elem, null), style = elem.style;
        return computed && (ret = computed.getPropertyValue(name) || computed[name], "" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, minWidth = style.minWidth, maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)), ret
    } : document.documentElement.currentStyle && (curCSS = function (elem, name) {
        var left, rsLeft, ret = elem.currentStyle && elem.currentStyle[name], style = elem.style;
        return null == ret && style && style[name] && (ret = style[name]), rnumnonpx.test(ret) && !rposition.test(name) && (left = style.left, rsLeft = elem.runtimeStyle && elem.runtimeStyle.left, rsLeft && (elem.runtimeStyle.left = elem.currentStyle.left), style.left = "fontSize" === name ? "1em" : ret, ret = style.pixelLeft + "px", style.left = left, rsLeft && (elem.runtimeStyle.left = rsLeft)), "" === ret ? "auto" : ret
    }), jQuery.each(["height", "width"], function (i, name) {
        jQuery.cssHooks[name] = {
            get: function (elem, computed, extra) {
                if (computed) return 0 === elem.offsetWidth && rdisplayswap.test(curCSS(elem, "display")) ? jQuery.swap(elem, cssShow, function () {
                    return getWidthOrHeight(elem, name, extra)
                }) : getWidthOrHeight(elem, name, extra)
            }, set: function (elem, value, extra) {
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing")) : 0)
            }
        }
    }), jQuery.support.opacity || (jQuery.cssHooks.opacity = {
        get: function (elem, computed) {
            return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : computed ? "1" : ""
        }, set: function (elem, value) {
            var style = elem.style, currentStyle = elem.currentStyle,
                opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + 100 * value + ")" : "",
                filter = currentStyle && currentStyle.filter || style.filter || "";
            style.zoom = 1, value >= 1 && "" === jQuery.trim(filter.replace(ralpha, "")) && style.removeAttribute && (style.removeAttribute("filter"), currentStyle && !currentStyle.filter) || (style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity)
        }
    }), jQuery(function () {
        jQuery.support.reliableMarginRight || (jQuery.cssHooks.marginRight = {
            get: function (elem, computed) {
                return jQuery.swap(elem, {display: "inline-block"}, function () {
                    if (computed) return curCSS(elem, "marginRight")
                })
            }
        }), !jQuery.support.pixelPosition && jQuery.fn.position && jQuery.each(["top", "left"], function (i, prop) {
            jQuery.cssHooks[prop] = {
                get: function (elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, prop);
                        return rnumnonpx.test(ret) ? jQuery(elem).position()[prop] + "px" : ret
                    }
                }
            }
        })
    }), jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.hidden = function (elem) {
        return 0 === elem.offsetWidth && 0 === elem.offsetHeight || !jQuery.support.reliableHiddenOffsets && "none" === (elem.style && elem.style.display || curCSS(elem, "display"))
    }, jQuery.expr.filters.visible = function (elem) {
        return !jQuery.expr.filters.hidden(elem)
    }), jQuery.each({margin: "", padding: "", border: "Width"}, function (prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function (value) {
                var i, parts = "string" == typeof value ? value.split(" ") : [value], expanded = {};
                for (i = 0; i < 4; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                return expanded
            }
        }, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber)
    });
    var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g,
        rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        rselectTextarea = /^(?:select|textarea)/i;
    jQuery.fn.extend({
        serialize: function () {
            return jQuery.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                return this.elements ? jQuery.makeArray(this.elements) : this
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type))
            }).map(function (i, elem) {
                var val = jQuery(this).val();
                return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function (val, i) {
                    return {name: elem.name, value: val.replace(rCRLF, "\r\n")}
                }) : {name: elem.name, value: val.replace(rCRLF, "\r\n")}
            }).get()
        }
    }), jQuery.param = function (a, traditional) {
        var prefix, s = [], add = function (key, value) {
            value = jQuery.isFunction(value) ? value() : null == value ? "" : value, s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
        };
        if (traditional === undefined && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function () {
            add(this.name, this.value)
        }); else for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
        return s.join("&").replace(r20, "+")
    };
    var ajaxLocParts, ajaxLocation, rhash = /#.*$/, rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//, rquery = /\?/, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        rts = /([?&])_=[^&]*/, rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, _load = jQuery.fn.load,
        prefilters = {}, transports = {}, allTypes = ["*/"] + ["*"];
    try {
        ajaxLocation = location.href
    } catch (e) {
        ajaxLocation = document.createElement("a"), ajaxLocation.href = "", ajaxLocation = ajaxLocation.href
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [], jQuery.fn.load = function (url, params, callback) {
        if ("string" != typeof url && _load) return _load.apply(this, arguments);
        if (!this.length) return this;
        var selector, type, response, self = this, off = url.indexOf(" ");
        return off >= 0 && (selector = url.slice(off, url.length), url = url.slice(0, off)), jQuery.isFunction(params) ? (callback = params, params = undefined) : params && "object" == typeof params && (type = "POST"), jQuery.ajax({
            url: url,
            type: type,
            dataType: "html",
            data: params,
            complete: function (jqXHR, status) {
                callback && self.each(callback, response || [jqXHR.responseText, status, jqXHR])
            }
        }).done(function (responseText) {
            response = arguments, self.html(selector ? jQuery("<div>").append(responseText.replace(rscript, "")).find(selector) : responseText)
        }), this
    }, jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (i, o) {
        jQuery.fn[o] = function (f) {
            return this.on(o, f)
        }
    }), jQuery.each(["get", "post"], function (i, method) {
        jQuery[method] = function (url, data, callback, type) {
            return jQuery.isFunction(data) && (type = type || callback, callback = data, data = undefined), jQuery.ajax({
                type: method,
                url: url,
                data: data,
                success: callback,
                dataType: type
            })
        }
    }), jQuery.extend({
        getScript: function (url, callback) {
            return jQuery.get(url, undefined, callback, "script")
        },
        getJSON: function (url, data, callback) {
            return jQuery.get(url, data, callback, "json")
        },
        ajaxSetup: function (target, settings) {
            return settings ? ajaxExtend(target, jQuery.ajaxSettings) : (settings = target, target = jQuery.ajaxSettings), ajaxExtend(target, settings), target
        },
        ajaxSettings: {
            url: ajaxLocation,
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": allTypes
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText"},
            converters: {
                "* text": window.String,
                "text html": !0,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {context: !0, url: !0}
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function (url, options) {
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                2 !== state && (state = 2, timeoutTimer && clearTimeout(timeoutTimer), transport = undefined, responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, responses && (response = ajaxHandleResponses(s, jqXHR, responses)), status >= 200 && status < 300 || 304 === status ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), modified && (jQuery.lastModified[ifModifiedKey] = modified), modified = jqXHR.getResponseHeader("Etag"), modified && (jQuery.etag[ifModifiedKey] = modified)), 304 === status ? (statusText = "notmodified", isSuccess = !0) : (isSuccess = ajaxConvert(s, response), statusText = isSuccess.state, success = isSuccess.data, error = isSuccess.error, isSuccess = !error)) : (error = statusText, statusText && !status || (statusText = "error", status < 0 && (status = 0))), jqXHR.status = status, jqXHR.statusText = (nativeStatusText || statusText) + "", isSuccess ? deferred.resolveWith(callbackContext, [success, statusText, jqXHR]) : deferred.rejectWith(callbackContext, [jqXHR, statusText, error]), jqXHR.statusCode(statusCode), statusCode = undefined, fireGlobals && globalEventContext.trigger("ajax" + (isSuccess ? "Success" : "Error"), [jqXHR, s, isSuccess ? success : error]), completeDeferred.fireWith(callbackContext, [jqXHR, statusText]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [jqXHR, s]), --jQuery.active || jQuery.event.trigger("ajaxStop")))
            }

            "object" == typeof url && (options = url, url = undefined), options = options || {};
            var ifModifiedKey, responseHeadersString, responseHeaders, transport, timeoutTimer, parts, fireGlobals, i,
                s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s,
                globalEventContext = callbackContext !== s && (callbackContext.nodeType || callbackContext instanceof jQuery) ? jQuery(callbackContext) : jQuery.event,
                deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"),
                statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0,
                strAbort = "canceled", jqXHR = {
                    readyState: 0, setRequestHeader: function (name, value) {
                        if (!state) {
                            var lname = name.toLowerCase();
                            name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, requestHeaders[name] = value
                        }
                        return this
                    }, getAllResponseHeaders: function () {
                        return 2 === state ? responseHeadersString : null
                    }, getResponseHeader: function (key) {
                        var match;
                        if (2 === state) {
                            if (!responseHeaders) for (responseHeaders = {}; match = rheaders.exec(responseHeadersString);) responseHeaders[match[1].toLowerCase()] = match[2];
                            match = responseHeaders[key.toLowerCase()]
                        }
                        return match === undefined ? null : match
                    }, overrideMimeType: function (type) {
                        return state || (s.mimeType = type), this
                    }, abort: function (statusText) {
                        return statusText = statusText || strAbort, transport && transport.abort(statusText), done(0, statusText), this
                    }
                };
            if (deferred.promise(jqXHR), jqXHR.success = jqXHR.done, jqXHR.error = jqXHR.fail, jqXHR.complete = completeDeferred.add, jqXHR.statusCode = function (map) {
                if (map) {
                    var tmp;
                    if (state < 2) for (tmp in map) statusCode[tmp] = [statusCode[tmp], map[tmp]]; else tmp = map[jqXHR.status], jqXHR.always(tmp)
                }
                return this
            }, s.url = ((url || s.url) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().split(core_rspace), null == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()), s.crossDomain = !(!parts || parts[1] === ajaxLocParts[1] && parts[2] === ajaxLocParts[2] && (parts[3] || ("http:" === parts[1] ? 80 : 443)) == (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? 80 : 443)))), s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state) return jqXHR;
            if (fireGlobals = s.global, s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), !s.hasContent && (s.data && (s.url += (rquery.test(s.url) ? "&" : "?") + s.data, delete s.data), ifModifiedKey = s.url, s.cache === !1)) {
                var ts = jQuery.now(), ret = s.url.replace(rts, "$1_=" + ts);
                s.url = ret + (ret === s.url ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "")
            }
            (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), s.ifModified && (ifModifiedKey = ifModifiedKey || s.url, jQuery.lastModified[ifModifiedKey] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[ifModifiedKey]), jQuery.etag[ifModifiedKey] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[ifModifiedKey])), jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state)) return jqXHR.abort();
            strAbort = "abort";
            for (i in{success: 1, error: 1, complete: 1}) jqXHR[i](s[i]);
            if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [jqXHR, s]), s.async && s.timeout > 0 && (timeoutTimer = setTimeout(function () {
                    jqXHR.abort("timeout")
                }, s.timeout));
                try {
                    state = 1, transport.send(requestHeaders, done)
                } catch (e) {
                    if (!(state < 2)) throw e;
                    done(-1, e)
                }
            } else done(-1, "No Transport");
            return jqXHR
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var oldCallbacks = [], rquestion = /\?/, rjsonp = /(=)\?(?=&|$)|\?\?/, nonce = jQuery.now();
    jQuery.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            return this[callback] = !0, callback
        }
    }), jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, data = s.data, url = s.url, hasCallback = s.jsonp !== !1,
            replaceInUrl = hasCallback && rjsonp.test(url),
            replaceInData = hasCallback && !replaceInUrl && "string" == typeof data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(data);
        if ("jsonp" === s.dataTypes[0] || replaceInUrl || replaceInData) return callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, overwritten = window[callbackName], replaceInUrl ? s.url = url.replace(rjsonp, "$1" + callbackName) : replaceInData ? s.data = data.replace(rjsonp, "$1" + callbackName) : hasCallback && (s.url += (rquestion.test(url) ? "&" : "?") + s.jsonp + "=" + callbackName), s.converters["script json"] = function () {
            return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0]
        }, s.dataTypes[0] = "json", window[callbackName] = function () {
            responseContainer = arguments
        }, jqXHR.always(function () {
            window[callbackName] = overwritten, s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, oldCallbacks.push(callbackName)), responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), responseContainer = overwritten = undefined
        }), "script"
    }), jQuery.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /javascript|ecmascript/},
        converters: {
            "text script": function (text) {
                return jQuery.globalEval(text), text
            }
        }
    }), jQuery.ajaxPrefilter("script", function (s) {
        s.cache === undefined && (s.cache = !1), s.crossDomain && (s.type = "GET", s.global = !1)
    }), jQuery.ajaxTransport("script", function (s) {
        if (s.crossDomain) {
            var script, head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
            return {
                send: function (_, callback) {
                    script = document.createElement("script"), script.async = "async", s.scriptCharset && (script.charset = s.scriptCharset), script.src = s.url, script.onload = script.onreadystatechange = function (_, isAbort) {
                        (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) && (script.onload = script.onreadystatechange = null, head && script.parentNode && head.removeChild(script), script = undefined, isAbort || callback(200, "success"))
                    }, head.insertBefore(script, head.firstChild)
                }, abort: function () {
                    script && script.onload(0, 1)
                }
            }
        }
    });
    var xhrCallbacks, xhrOnUnloadAbort = !!window.ActiveXObject && function () {
        for (var key in xhrCallbacks) xhrCallbacks[key](0, 1)
    }, xhrId = 0;
    jQuery.ajaxSettings.xhr = window.ActiveXObject ? function () {
        return !this.isLocal && createStandardXHR() || createActiveXHR()
    } : createStandardXHR, function (xhr) {
        jQuery.extend(jQuery.support, {ajax: !!xhr, cors: !!xhr && "withCredentials" in xhr})
    }(jQuery.ajaxSettings.xhr()), jQuery.support.ajax && jQuery.ajaxTransport(function (s) {
        if (!s.crossDomain || jQuery.support.cors) {
            var callback;
            return {
                send: function (headers, complete) {
                    var handle, i, xhr = s.xhr();
                    if (s.username ? xhr.open(s.type, s.url, s.async, s.username, s.password) : xhr.open(s.type, s.url, s.async), s.xhrFields) for (i in s.xhrFields) xhr[i] = s.xhrFields[i];
                    s.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(s.mimeType), s.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (i in headers) xhr.setRequestHeader(i, headers[i])
                    } catch (_) {
                    }
                    xhr.send(s.hasContent && s.data || null), callback = function (_, isAbort) {
                        var status, statusText, responseHeaders, responses, xml;
                        try {
                            if (callback && (isAbort || 4 === xhr.readyState)) if (callback = undefined, handle && (xhr.onreadystatechange = jQuery.noop, xhrOnUnloadAbort && delete xhrCallbacks[handle]), isAbort) 4 !== xhr.readyState && xhr.abort(); else {
                                status = xhr.status, responseHeaders = xhr.getAllResponseHeaders(), responses = {}, xml = xhr.responseXML, xml && xml.documentElement && (responses.xml = xml);
                                try {
                                    responses.text = xhr.responseText
                                } catch (e) {
                                }
                                try {
                                    statusText = xhr.statusText
                                } catch (e) {
                                    statusText = ""
                                }
                                status || !s.isLocal || s.crossDomain ? 1223 === status && (status = 204) : status = responses.text ? 200 : 404
                            }
                        } catch (firefoxAccessException) {
                            isAbort || complete(-1, firefoxAccessException)
                        }
                        responses && complete(status, statusText, responses, responseHeaders)
                    }, s.async ? 4 === xhr.readyState ? setTimeout(callback, 0) : (handle = ++xhrId, xhrOnUnloadAbort && (xhrCallbacks || (xhrCallbacks = {}, jQuery(window).unload(xhrOnUnloadAbort)), xhrCallbacks[handle] = callback), xhr.onreadystatechange = callback) : callback()
                }, abort: function () {
                    callback && callback(0, 1)
                }
            }
        }
    });
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
        rfxnum = new RegExp("^(?:([-+])=|)(" + core_pnum + ")([a-z%]*)$", "i"), rrun = /queueHooks$/,
        animationPrefilters = [defaultPrefilter], tweeners = {
            "*": [function (prop, value) {
                var end, unit, tween = this.createTween(prop, value), parts = rfxnum.exec(value), target = tween.cur(),
                    start = +target || 0, scale = 1, maxIterations = 20;
                if (parts) {
                    if (end = +parts[2], unit = parts[3] || (jQuery.cssNumber[prop] ? "" : "px"), "px" !== unit && start) {
                        start = jQuery.css(tween.elem, prop, !0) || end || 1;
                        do scale = scale || ".5", start /= scale, jQuery.style(tween.elem, prop, start + unit); while (scale !== (scale = tween.cur() / target) && 1 !== scale && --maxIterations)
                    }
                    tween.unit = unit, tween.start = start, tween.end = parts[1] ? start + (parts[1] + 1) * end : end
                }
                return tween
            }]
        };
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function (props, callback) {
            jQuery.isFunction(props) ? (callback = props, props = ["*"]) : props = props.split(" ");
            for (var prop, index = 0, length = props.length; index < length; index++) prop = props[index], tweeners[prop] = tweeners[prop] || [], tweeners[prop].unshift(callback)
        }, prefilter: function (callback, prepend) {
            prepend ? animationPrefilters.unshift(callback) : animationPrefilters.push(callback)
        }
    }), jQuery.Tween = Tween, Tween.prototype = {
        constructor: Tween,
        init: function (elem, options, prop, end, easing, unit) {
            this.elem = elem, this.prop = prop, this.easing = easing || "swing", this.options = options, this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px")
        },
        cur: function () {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this)
        },
        run: function (percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            return this.options.duration ? this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : this.pos = eased = percent, this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this
        }
    }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
        _default: {
            get: function (tween) {
                var result;
                return null == tween.elem[tween.prop] || tween.elem.style && null != tween.elem.style[tween.prop] ? (result = jQuery.css(tween.elem, tween.prop, !1, ""), result && "auto" !== result ? result : 0) : tween.elem[tween.prop]
            }, set: function (tween) {
                jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop]) ? jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) : tween.elem[tween.prop] = tween.now
            }
        }
    }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function (tween) {
            tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now)
        }
    }, jQuery.each(["toggle", "show", "hide"], function (i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function (speed, easing, callback) {
            return null == speed || "boolean" == typeof speed || !i && jQuery.isFunction(speed) && jQuery.isFunction(easing) ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback)
        }
    }), jQuery.fn.extend({
        fadeTo: function (speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({opacity: to}, speed, easing, callback)
        }, animate: function (prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback),
                doAnimation = function () {
                    var anim = Animation(this, jQuery.extend({}, prop), optall);
                    empty && anim.stop(!0)
                };
            return empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
        }, stop: function (type, clearQueue, gotoEnd) {
            var stopQueue = function (hooks) {
                var stop = hooks.stop;
                delete hooks.stop, stop(gotoEnd)
            };
            return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = undefined), clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function () {
                var dequeue = !0, index = null != type && type + "queueHooks", timers = jQuery.timers,
                    data = jQuery._data(this);
                if (index) data[index] && data[index].stop && stopQueue(data[index]); else for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                for (index = timers.length; index--;) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), dequeue = !1, timers.splice(index, 1));
                !dequeue && gotoEnd || jQuery.dequeue(this, type)
            })
        }
    }), jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (name, props) {
        jQuery.fn[name] = function (speed, easing, callback) {
            return this.animate(props, speed, easing, callback)
        }
    }), jQuery.speed = function (speed, easing, fn) {
        var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, null != opt.queue && opt.queue !== !0 || (opt.queue = "fx"), opt.old = opt.complete, opt.complete = function () {
            jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue)
        }, opt
    }, jQuery.easing = {
        linear: function (p) {
            return p
        }, swing: function (p) {
            return .5 - Math.cos(p * Math.PI) / 2
        }
    }, jQuery.timers = [], jQuery.fx = Tween.prototype.init, jQuery.fx.tick = function () {
        var timer, timers = jQuery.timers, i = 0;
        for (fxNow = jQuery.now(); i < timers.length; i++) timer = timers[i], timer() || timers[i] !== timer || timers.splice(i--, 1);
        timers.length || jQuery.fx.stop(), fxNow = undefined
    }, jQuery.fx.timer = function (timer) {
        timer() && jQuery.timers.push(timer) && !timerId && (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval))
    }, jQuery.fx.interval = 13, jQuery.fx.stop = function () {
        clearInterval(timerId), timerId = null
    }, jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, jQuery.fx.step = {}, jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.animated = function (elem) {
        return jQuery.grep(jQuery.timers, function (fn) {
            return elem === fn.elem
        }).length
    });
    var rroot = /^(?:body|html)$/i;
    jQuery.fn.offset = function (options) {
        if (arguments.length) return options === undefined ? this : this.each(function (i) {
            jQuery.offset.setOffset(this, options, i)
        });
        var docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft, box = {top: 0, left: 0}, elem = this[0],
            doc = elem && elem.ownerDocument;
        if (doc) return (body = doc.body) === elem ? jQuery.offset.bodyOffset(elem) : (docElem = doc.documentElement, jQuery.contains(docElem, elem) ? ("undefined" != typeof elem.getBoundingClientRect && (box = elem.getBoundingClientRect()), win = getWindow(doc), clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0, scrollTop = win.pageYOffset || docElem.scrollTop, scrollLeft = win.pageXOffset || docElem.scrollLeft, {
            top: box.top + scrollTop - clientTop,
            left: box.left + scrollLeft - clientLeft
        }) : box)
    }, jQuery.offset = {
        bodyOffset: function (body) {
            var top = body.offsetTop, left = body.offsetLeft;
            return jQuery.support.doesNotIncludeMarginInBodyOffset && (top += parseFloat(jQuery.css(body, "marginTop")) || 0, left += parseFloat(jQuery.css(body, "marginLeft")) || 0), {
                top: top,
                left: left
            }
        }, setOffset: function (elem, options, i) {
            var position = jQuery.css(elem, "position");
            "static" === position && (elem.style.position = "relative");
            var curTop, curLeft, curElem = jQuery(elem), curOffset = curElem.offset(),
                curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"),
                calculatePosition = ("absolute" === position || "fixed" === position) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
                props = {}, curPosition = {};
            calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), jQuery.isFunction(options) && (options = options.call(elem, i, curOffset)), null != options.top && (props.top = options.top - curOffset.top + curTop), null != options.left && (props.left = options.left - curOffset.left + curLeft), "using" in options ? options.using.call(elem, props) : curElem.css(props)
        }
    }, jQuery.fn.extend({
        position: function () {
            if (this[0]) {
                var elem = this[0], offsetParent = this.offsetParent(), offset = this.offset(),
                    parentOffset = rroot.test(offsetParent[0].nodeName) ? {top: 0, left: 0} : offsetParent.offset();
                return offset.top -= parseFloat(jQuery.css(elem, "marginTop")) || 0, offset.left -= parseFloat(jQuery.css(elem, "marginLeft")) || 0, parentOffset.top += parseFloat(jQuery.css(offsetParent[0], "borderTopWidth")) || 0, parentOffset.left += parseFloat(jQuery.css(offsetParent[0], "borderLeftWidth")) || 0, {
                    top: offset.top - parentOffset.top,
                    left: offset.left - parentOffset.left
                }
            }
        }, offsetParent: function () {
            return this.map(function () {
                for (var offsetParent = this.offsetParent || document.body; offsetParent && !rroot.test(offsetParent.nodeName) && "static" === jQuery.css(offsetParent, "position");) offsetParent = offsetParent.offsetParent;
                return offsetParent || document.body
            })
        }
    }), jQuery.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (method, prop) {
        var top = /Y/.test(prop);
        jQuery.fn[method] = function (val) {
            return jQuery.access(this, function (elem, method, val) {
                var win = getWindow(elem);
                return val === undefined ? win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method] : void (win ? win.scrollTo(top ? jQuery(win).scrollLeft() : val, top ? val : jQuery(win).scrollTop()) : elem[method] = val)
            }, method, val, arguments.length, null)
        }
    }), jQuery.each({Height: "height", Width: "width"}, function (name, type) {
        jQuery.each({padding: "inner" + name, content: type, "": "outer" + name}, function (defaultExtra, funcName) {
            jQuery.fn[funcName] = function (margin, value) {
                var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin),
                    extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                return jQuery.access(this, function (elem, type, value) {
                    var doc;
                    return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : value === undefined ? jQuery.css(elem, type, value, extra) : jQuery.style(elem, type, value, extra)
                }, type, chainable ? margin : undefined, chainable, null)
            }
        })
    }), window.jQuery = window.$ = jQuery, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return jQuery
    })
}(window), window.matchMedia = window.matchMedia || function (doc, undefined) {
    var bool, docElem = doc.documentElement, refNode = docElem.firstElementChild || docElem.firstChild,
        fakeBody = doc.createElement("body"), div = doc.createElement("div");
    return div.id = "mq-test-1", div.style.cssText = "position:absolute;top:-100em", fakeBody.style.background = "none", fakeBody.appendChild(div), function (q) {
        return div.innerHTML = '&shy;<style media="' + q + '"> #mq-test-1 { width: 42px; }</style>', docElem.insertBefore(fakeBody, refNode), bool = 42 == div.offsetWidth, docElem.removeChild(fakeBody), {
            matches: bool,
            media: q
        }
    }
}(document), function (win) {
    function callMedia() {
        applyMedia(!0)
    }

    if (win.respond = {}, respond.update = function () {
    }, respond.mediaQueriesSupported = win.matchMedia && win.matchMedia("only all").matches, !respond.mediaQueriesSupported) {
        var lastCall, resizeDefer, eminpx, doc = win.document, docElem = doc.documentElement, mediastyles = [],
            rules = [], appendedEls = [], parsedSheets = {}, resizeThrottle = 30,
            head = doc.getElementsByTagName("head")[0] || docElem, base = doc.getElementsByTagName("base")[0],
            links = head.getElementsByTagName("link"), requestQueue = [], ripCSS = function () {
                for (var sheet, href, media, isCSS, sheets = links, sl = sheets.length, i = 0, ie_re = /^\/\//; i < sl; i++) sheet = sheets[i], href = sheet.href, media = sheet.media, isCSS = sheet.rel && "stylesheet" === sheet.rel.toLowerCase(), href = ie_re.test(href) ? win.location.protocol + href : href, href && isCSS && !parsedSheets[href] && (sheet.styleSheet && sheet.styleSheet.rawCssText ? (translate(sheet.styleSheet.rawCssText, href, media), parsedSheets[href] = !0) : (/^([a-zA-Z:]*\/\/)/.test(href) || base) && href.replace(RegExp.$1, "").split("/")[0] !== win.location.host || requestQueue.push({
                    href: href,
                    media: media
                }));
                makeRequests()
            }, makeRequests = function () {
                if (requestQueue.length) {
                    var thisRequest = requestQueue.shift();
                    ajax(thisRequest.href, function (styles) {
                        translate(styles, thisRequest.href, thisRequest.media), parsedSheets[thisRequest.href] = !0, makeRequests()
                    })
                }
            }, translate = function (styles, href, media) {
                var j, fullq, thisq, eachq, eql, qs = styles.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi),
                    ql = qs && qs.length || 0, href = href.substring(0, href.lastIndexOf("/")), repUrls = function (css) {
                        return css.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g, "$1" + href + "$2$3")
                    }, useMedia = !ql && media, i = 0;
                for (href.length && (href += "/"), useMedia && (ql = 1); i < ql; i++) for (j = 0, useMedia ? (fullq = media, rules.push(repUrls(styles))) : (fullq = qs[i].match(/@media *([^\{]+)\{([\S\s]+?)$/) && RegExp.$1, rules.push(RegExp.$2 && repUrls(RegExp.$2))), eachq = fullq.split(","), eql = eachq.length; j < eql; j++) thisq = eachq[j], mediastyles.push({
                    media: thisq.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/) && RegExp.$2 || "all",
                    rules: rules.length - 1,
                    hasquery: thisq.indexOf("(") > -1,
                    minw: thisq.match(/\(min\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
                    maxw: thisq.match(/\(max\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || "")
                });
                applyMedia()
            }, getEmValue = function () {
                var ret, div = doc.createElement("div"), body = doc.body, fakeUsed = !1;
                return div.style.cssText = "position:absolute;font-size:1em;width:1em", body || (body = fakeUsed = doc.createElement("body"), body.style.background = "none"), body.appendChild(div), docElem.insertBefore(body, docElem.firstChild), ret = div.offsetWidth, fakeUsed ? docElem.removeChild(body) : body.removeChild(div), ret = eminpx = parseFloat(ret)
            }, applyMedia = function (fromResize) {
                var name = "clientWidth", docElemProp = docElem[name],
                    currWidth = "CSS1Compat" === doc.compatMode && docElemProp || doc.body[name] || docElemProp,
                    styleBlocks = {}, lastLink = links[links.length - 1], now = (new Date).getTime();
                if (fromResize && lastCall && now - lastCall < resizeThrottle) return clearTimeout(resizeDefer), void (resizeDefer = setTimeout(applyMedia, resizeThrottle));
                lastCall = now;
                for (var i in mediastyles) {
                    var thisstyle = mediastyles[i], min = thisstyle.minw, max = thisstyle.maxw, minnull = null === min,
                        maxnull = null === max, em = "em";
                    min && (min = parseFloat(min) * (min.indexOf(em) > -1 ? eminpx || getEmValue() : 1)), max && (max = parseFloat(max) * (max.indexOf(em) > -1 ? eminpx || getEmValue() : 1)), thisstyle.hasquery && (minnull && maxnull || !(minnull || currWidth >= min) || !(maxnull || currWidth <= max)) || (styleBlocks[thisstyle.media] || (styleBlocks[thisstyle.media] = []), styleBlocks[thisstyle.media].push(rules[thisstyle.rules]))
                }
                for (var i in appendedEls) appendedEls[i] && appendedEls[i].parentNode === head && head.removeChild(appendedEls[i]);
                for (var i in styleBlocks) {
                    var ss = doc.createElement("style"), css = styleBlocks[i].join("\n");
                    ss.type = "text/css", ss.media = i, head.insertBefore(ss, lastLink.nextSibling), ss.styleSheet ? ss.styleSheet.cssText = css : ss.appendChild(doc.createTextNode(css)), appendedEls.push(ss)
                }
            }, ajax = function (url, callback) {
                var req = xmlHttp();
                req && (req.open("GET", url, !0), req.onreadystatechange = function () {
                    4 != req.readyState || 200 != req.status && 304 != req.status || callback(req.responseText)
                }, 4 != req.readyState && req.send(null))
            }, xmlHttp = function () {
                var xmlhttpmethod = !1;
                try {
                    xmlhttpmethod = new XMLHttpRequest
                } catch (e) {
                    xmlhttpmethod = new ActiveXObject("Microsoft.XMLHTTP")
                }
                return function () {
                    return xmlhttpmethod
                }
            }();
        ripCSS(), respond.update = ripCSS, win.addEventListener ? win.addEventListener("resize", callMedia, !1) : win.attachEvent && win.attachEvent("onresize", callMedia)
    }
}(this), function ($, r) {
    function G(I) {
        return "string" == typeof I
    }

    function D(J) {
        var I = n.call(arguments, 1);
        return function () {
            return J.apply(this, I.concat(n.call(arguments)))
        }
    }

    function o(I) {
        return I.replace(H, "$2")
    }

    function q(I) {
        return I.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1")
    }

    function f(K, P, I, L, J) {
        var R, O, N, Q, M;
        return L !== h ? (N = I.match(K ? H : /^([^#?]*)\??([^#]*)(#?.*)/), M = N[3] || "", 2 === J && G(L) ? O = L.replace(K ? u : p, "") : (Q = m(N[2]), L = G(L) ? m[K ? F : B](L) : L, O = 2 === J ? L : 1 === J ? $.extend({}, L, Q) : $.extend({}, Q, L), O = j(O), K && (O = O.replace(g, t))), R = N[1] + (K ? C : O || !N[1] ? "?" : "") + O + M) : R = P(I !== h ? I : location.href), R
    }

    function A(K, I, J) {
        return I === h || "boolean" == typeof I ? (J = I, I = a[K ? F : B]()) : I = G(I) ? I.replace(K ? u : p, "") : I, m(I, J)
    }

    function v(L, J, K, I) {
        return G(K) || "object" == typeof K || (I = K, K = J, J = h), this.each(function () {
            var O = $(this), M = J || k()[(this.nodeName || "").toLowerCase()] || "", N = M && O.attr(M) || "";
            O.attr(M, a[L](N, K, I))
        })
    }

    var h, j, c, m, y, s, x, k, u, H, g, i, C, n = Array.prototype.slice, t = decodeURIComponent, a = $.param,
        b = $.bbq = $.bbq || {}, e = $.event.special, d = "hashchange", B = "querystring", F = "fragment",
        z = "elemUrlAttr", l = "href", w = "src", p = /^.*\?|#.*$/g, E = {};
    a[B] = D(f, 0, q), a[F] = c = D(f, 1, o), a.sorted = j = function (J, K) {
        var I = [], L = {};
        return $.each(a(J, K).split("&"), function (P, M) {
            var O = M.replace(/(?:%5B|=).*$/, ""), N = L[O];
            N || (N = L[O] = [], I.push(O)), N.push(M)
        }), $.map(I.sort(), function (M) {
            return L[M]
        }).join("&")
    }, c.noEscape = function (J) {
        J = J || "";
        var I = $.map(J.split(""), encodeURIComponent);
        g = new RegExp(I.join("|"), "g")
    }, c.noEscape(",/"), c.ajaxCrawlable = function (I) {
        return I !== h && (I ? (u = /^.*(?:#!|#)/, H = /^([^#]*)(?:#!|#)?(.*)$/, C = "#!") : (u = /^.*#/, H = /^([^#]*)#?(.*)$/, C = "#"), i = !!I), i
    }, c.ajaxCrawlable(0), $.deparam = m = function (L, I) {
        var K = {}, J = {"true": !0, "false": !1, "null": null};
        return $.each(L.replace(/\+/g, " ").split("&"), function (O, T) {
            var M, N = T.split("="), S = t(N[0]), R = K, P = 0, U = S.split("]["), Q = U.length - 1;
            if (/\[/.test(U[0]) && /\]$/.test(U[Q]) ? (U[Q] = U[Q].replace(/\]$/, ""), U = U.shift().split("[").concat(U), Q = U.length - 1) : Q = 0, 2 === N.length) if (M = t(N[1]), I && (M = M && !isNaN(M) ? +M : "undefined" === M ? h : J[M] !== h ? J[M] : M), Q) for (; P <= Q; P++) S = "" === U[P] ? R.length : U[P], R = R[S] = P < Q ? R[S] || (U[P + 1] && isNaN(U[P + 1]) ? {} : []) : M; else $.isArray(K[S]) ? K[S].push(M) : K[S] !== h ? K[S] = [K[S], M] : K[S] = M; else S && (K[S] = I ? h : "")
        }), K
    }, m[B] = D(A, 0), m[F] = y = D(A, 1), $[z] || ($[z] = function (I) {
        return $.extend(E, I)
    })({
        a: l,
        base: l,
        iframe: w,
        img: w,
        input: w,
        form: "action",
        link: l,
        script: w
    }), k = $[z], $.fn[B] = D(v, B), $.fn[F] = D(v, F), b.pushState = s = function (L, I) {
        G(L) && /^#/.test(L) && I === h && (I = 2);
        var K = L !== h, J = c(location.href, K ? L : {}, K ? I : 2);
        location.href = J
    }, b.getState = x = function (I, J) {
        return I === h || "boolean" == typeof I ? y(I) : y(J)[I]
    }, b.removeState = function (I) {
        var J = {};
        I !== h && (J = x(), $.each($.isArray(I) ? I : arguments, function (L, K) {
            delete J[K]
        })), s(J, 2)
    }, e[d] = $.extend(e[d], {
        add: function (I) {
            function J(M) {
                var L = M[F] = c();
                M.getState = function (N, O) {
                    return N === h || "boolean" == typeof N ? m(L, N) : m(L, O)[N]
                }, K.apply(this, arguments)
            }

            var K;
            return $.isFunction(I) ? (K = I, J) : (K = I.handler, void (I.handler = J))
        }
    })
}(jQuery, this), function ($, e, b) {
    function a(j) {
        return j = j || location.href, "#" + j.replace(/^[^#]*#?(.*)$/, "$1")
    }

    var f, c = "hashchange", h = document, g = $.event.special, i = h.documentMode,
        d = "on" + c in e && (i === b || i > 7);
    $.fn[c] = function (j) {
        return j ? this.bind(c, j) : this.trigger(c)
    }, $.fn[c].delay = 50, g[c] = $.extend(g[c], {
        setup: function () {
            return !d && void $(f.start)
        }, teardown: function () {
            return !d && void $(f.stop)
        }
    }), f = function () {
        function n() {
            var r = a(), q = o(m);
            r !== m ? (l(m = r, q), $(e).trigger(c)) : q !== m && (location.href = location.href.replace(/#.*/, "") + q), p = setTimeout(n, $.fn[c].delay)
        }

        var p, j = {}, m = a(), k = function (q) {
            return q
        }, l = k, o = k;
        return j.start = function () {
            p || n()
        }, j.stop = function () {
            p && clearTimeout(p), p = b
        }, $.browser.msie && !d && function () {
            var q, r;
            j.start = function () {
                q || (r = $.fn[c].src, r = r && r + a(), q = $('<iframe tabindex="-1" title="empty"/>').hide().one("load", function () {
                    r || l(a()), n()
                }).attr("src", r || "javascript:0").insertAfter("body")[0].contentWindow, h.onpropertychange = function () {
                    try {
                        "title" === event.propertyName && (q.document.title = h.title)
                    } catch (s) {
                    }
                })
            }, j.stop = k, o = function () {
                return a(q.location.href)
            }, l = function (v, s) {
                var u = q.document, t = $.fn[c].domain;
                v !== s && (u.title = h.title, u.open(), t && u.write('<script>document.domain="' + t + '"</script>'), u.close(), q.location.hash = v)
            }
        }(), j
    }()
}(jQuery, this), !function ($) {
    "use strict";
    $(function () {
        $.support.transition = function () {
            var transitionEnd = function () {
                var name, el = document.createElement("bootstrap"), transEndEventNames = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
                for (name in transEndEventNames) if (void 0 !== el.style[name]) return transEndEventNames[name]
            }();
            return transitionEnd && {end: transitionEnd}
        }()
    })
}(window.jQuery), !function ($) {
    "use strict";
    var Tooltip = function (element, options) {
        this.init("tooltip", element, options)
    };
    Tooltip.prototype = {
        constructor: Tooltip, init: function (type, element, options) {
            var eventIn, eventOut;
            this.type = type, this.$element = $(element), this.options = this.getOptions(options), this.enabled = !0, "click" == this.options.trigger ? this.$element.on("click." + this.type, this.options.selector, $.proxy(this.toggle, this)) : "manual" != this.options.trigger && (eventIn = "hover" == this.options.trigger ? "mouseenter" : "focus", eventOut = "hover" == this.options.trigger ? "mouseleave" : "blur", this.$element.on(eventIn + "." + this.type, this.options.selector, $.proxy(this.enter, this)), this.$element.on(eventOut + "." + this.type, this.options.selector, $.proxy(this.leave, this))), this.options.selector ? this._options = $.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        }, getOptions: function (options) {
            return options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data()), options.delay && "number" == typeof options.delay && (options.delay = {
                show: options.delay,
                hide: options.delay
            }), options
        }, enter: function (e) {
            var self = $(e.currentTarget)[this.type](this._options).data(this.type);
            return self.options.delay && self.options.delay.show ? (clearTimeout(this.timeout), self.hoverState = "in", void (this.timeout = setTimeout(function () {
                "in" == self.hoverState && self.show()
            }, self.options.delay.show))) : self.show()
        }, leave: function (e) {
            var self = $(e.currentTarget)[this.type](this._options).data(this.type);
            return this.timeout && clearTimeout(this.timeout), self.options.delay && self.options.delay.hide ? (self.hoverState = "out", void (this.timeout = setTimeout(function () {
                "out" == self.hoverState && self.hide()
            }, self.options.delay.hide))) : self.hide()
        }, show: function () {
            var $tip, inside, pos, actualWidth, actualHeight, placement, tp;
            if (this.hasContent() && this.enabled) {
                switch ($tip = this.tip(), this.setContent(), this.options.animation && $tip.addClass("fade"), placement = "function" == typeof this.options.placement ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement, inside = /in/.test(placement), $tip.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).insertAfter(this.$element), pos = this.getPosition(inside), actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight, inside ? placement.split(" ")[1] : placement) {
                    case"bottom":
                        tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case"top":
                        tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case"left":
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth};
                        break;
                    case"right":
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
                }
                $tip.offset(tp).addClass(placement).addClass("in")
            }
        }, setContent: function () {
            var $tip = this.tip(), title = this.getTitle();
            $tip.find(".tooltip-inner")[this.options.html ? "html" : "text"](title), $tip.removeClass("fade in top bottom left right")
        }, hide: function () {
            function removeWithAnimation() {
                var timeout = setTimeout(function () {
                    $tip.off($.support.transition.end).detach()
                }, 500);
                $tip.one($.support.transition.end, function () {
                    clearTimeout(timeout), $tip.detach()
                })
            }

            var $tip = this.tip();
            return $tip.removeClass("in"), $.support.transition && this.$tip.hasClass("fade") ? removeWithAnimation() : $tip.detach(), this
        }, fixTitle: function () {
            var $e = this.$element;
            ($e.attr("title") || "string" != typeof $e.attr("data-original-title")) && $e.attr("data-original-title", $e.attr("title") || "").removeAttr("title")
        }, hasContent: function () {
            return this.getTitle()
        }, getPosition: function (inside) {
            return $.extend({}, inside ? {
                top: 0,
                left: 0
            } : this.$element.offset(), {width: this.$element[0].offsetWidth, height: this.$element[0].offsetHeight})
        }, getTitle: function () {
            var title, $e = this.$element, o = this.options;
            return title = $e.attr("data-original-title") || ("function" == typeof o.title ? o.title.call($e[0]) : o.title)
        }, tip: function () {
            return this.$tip = this.$tip || $(this.options.template)
        }, validate: function () {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        }, enable: function () {
            this.enabled = !0
        }, disable: function () {
            this.enabled = !1
        }, toggleEnabled: function () {
            this.enabled = !this.enabled
        }, toggle: function (e) {
            var self = $(e.currentTarget)[this.type](this._options).data(this.type);
            self[self.tip().hasClass("in") ? "hide" : "show"]()
        }, destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    };
    var old = $.fn.tooltip;
    $.fn.tooltip = function (option) {
        return this.each(function () {
            var $this = $(this), data = $this.data("tooltip"), options = "object" == typeof option && option;
            data || $this.data("tooltip", data = new Tooltip(this, options)), "string" == typeof option && data[option]()
        })
    }, $.fn.tooltip.Constructor = Tooltip, $.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover",
        title: "",
        delay: 0,
        html: !1
    }, $.fn.tooltip.noConflict = function () {
        return $.fn.tooltip = old, this
    }
}(window.jQuery), !function ($) {
    "use strict";
    var dismiss = '[data-dismiss="alert"]', Alert = function (el) {
        $(el).on("click", dismiss, this.close)
    };
    Alert.prototype.close = function (e) {
        function removeElement() {
            $parent.trigger("closed").remove()
        }

        var $parent, $this = $(this), selector = $this.attr("data-target");
        selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")), $parent = $(selector), e && e.preventDefault(), $parent.length || ($parent = $this.hasClass("alert") ? $this : $this.parent()), $parent.trigger(e = $.Event("close")), e.isDefaultPrevented() || ($parent.removeClass("in"), $.support.transition && $parent.hasClass("fade") ? $parent.on($.support.transition.end, removeElement) : removeElement())
    };
    var old = $.fn.alert;
    $.fn.alert = function (option) {
        return this.each(function () {
            var $this = $(this), data = $this.data("alert");
            data || $this.data("alert", data = new Alert(this)), "string" == typeof option && data[option].call($this)
        })
    }, $.fn.alert.Constructor = Alert, $.fn.alert.noConflict = function () {
        return $.fn.alert = old, this
    }, $(document).on("click.alert.data-api", dismiss, Alert.prototype.close)
}(window.jQuery), !function ($) {
    "use strict";
    var Button = function (element, options) {
        this.$element = $(element), this.options = $.extend({}, $.fn.button.defaults, options)
    };
    Button.prototype.setState = function (state) {
        var d = "disabled", $el = this.$element, data = $el.data(), val = $el.is("input") ? "val" : "html";
        state += "Text", data.resetText || $el.data("resetText", $el[val]()), $el[val](data[state] || this.options[state]), setTimeout(function () {
            "loadingText" == state ? $el.addClass(d).attr(d, d) : $el.removeClass(d).removeAttr(d)
        }, 0)
    }, Button.prototype.toggle = function () {
        var $parent = this.$element.closest('[data-toggle="buttons-radio"]');
        $parent && $parent.find(".active").removeClass("active"), this.$element.toggleClass("active")
    };
    var old = $.fn.button;
    $.fn.button = function (option) {
        return this.each(function () {
            var $this = $(this), data = $this.data("button"), options = "object" == typeof option && option;
            data || $this.data("button", data = new Button(this, options)), "toggle" == option ? data.toggle() : option && data.setState(option)
        })
    }, $.fn.button.defaults = {loadingText: "loading..."}, $.fn.button.Constructor = Button, $.fn.button.noConflict = function () {
        return $.fn.button = old, this
    }, $(document).on("click.button.data-api", "[data-toggle^=button]", function (e) {
        var $btn = $(e.target);
        $btn.hasClass("btn") || ($btn = $btn.closest(".btn")), $btn.button("toggle")
    })
}(window.jQuery), !function ($) {
    "use strict";
    var Carousel = function (element, options) {
        this.$element = $(element), this.options = options, "hover" == this.options.pause && this.$element.on("mouseenter", $.proxy(this.pause, this)).on("mouseleave", $.proxy(this.cycle, this))
    };
    Carousel.prototype = {
        cycle: function (e) {
            return e || (this.paused = !1), this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval)), this
        }, to: function (pos) {
            var $active = this.$element.find(".item.active"), children = $active.parent().children(),
                activePos = children.index($active), that = this;
            if (!(pos > children.length - 1 || pos < 0)) return this.sliding ? this.$element.one("slid", function () {
                that.to(pos)
            }) : activePos == pos ? this.pause().cycle() : this.slide(pos > activePos ? "next" : "prev", $(children[pos]))
        }, pause: function (e) {
            return e || (this.paused = !0), this.$element.find(".next, .prev").length && $.support.transition.end && (this.$element.trigger($.support.transition.end), this.cycle()), clearInterval(this.interval), this.interval = null, this
        }, next: function () {
            if (!this.sliding) return this.slide("next")
        }, prev: function () {
            if (!this.sliding) return this.slide("prev")
        }, slide: function (type, next) {
            var e, $active = this.$element.find(".item.active"), $next = next || $active[type](),
                isCycling = this.interval, direction = "next" == type ? "left" : "right",
                fallback = "next" == type ? "first" : "last", that = this;
            if (this.sliding = !0, isCycling && this.pause(), $next = $next.length ? $next : this.$element.find(".item")[fallback](), e = $.Event("slide", {relatedTarget: $next[0]}), !$next.hasClass("active")) {
                if ($.support.transition && this.$element.hasClass("slide")) {
                    if (this.$element.trigger(e), e.isDefaultPrevented()) return;
                    $next.addClass(type), $next[0].offsetWidth, $active.addClass(direction), $next.addClass(direction), this.$element.one($.support.transition.end, function () {
                        $next.removeClass([type, direction].join(" ")).addClass("active"), $active.removeClass(["active", direction].join(" ")), that.sliding = !1, setTimeout(function () {
                            that.$element.trigger("slid")
                        }, 0)
                    })
                } else {
                    if (this.$element.trigger(e), e.isDefaultPrevented()) return;
                    $active.removeClass("active"), $next.addClass("active"),
                        this.sliding = !1, this.$element.trigger("slid")
                }
                return isCycling && this.cycle(), this
            }
        }
    };
    var old = $.fn.carousel;
    $.fn.carousel = function (option) {
        return this.each(function () {
            var $this = $(this), data = $this.data("carousel"),
                options = $.extend({}, $.fn.carousel.defaults, "object" == typeof option && option),
                action = "string" == typeof option ? option : options.slide;
            data || $this.data("carousel", data = new Carousel(this, options)), "number" == typeof option ? data.to(option) : action ? data[action]() : options.interval && data.cycle()
        })
    }, $.fn.carousel.defaults = {
        interval: 5e3,
        pause: "hover"
    }, $.fn.carousel.Constructor = Carousel, $.fn.carousel.noConflict = function () {
        return $.fn.carousel = old, this
    }, $(document).on("click.carousel.data-api", "[data-slide]", function (e) {
        var href, $this = $(this),
            $target = $($this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "")),
            options = $.extend({}, $target.data(), $this.data());
        $target.carousel(options), e.preventDefault()
    })
}(window.jQuery), !function ($) {
    "use strict";
    var Collapse = function (element, options) {
        this.$element = $(element), this.options = $.extend({}, $.fn.collapse.defaults, options), this.options.parent && (this.$parent = $(this.options.parent)), this.options.toggle && this.toggle()
    };
    Collapse.prototype = {
        constructor: Collapse, dimension: function () {
            var hasWidth = this.$element.hasClass("width");
            return hasWidth ? "width" : "height"
        }, show: function () {
            var dimension, scroll, actives, hasData;
            if (!this.transitioning) {
                if (dimension = this.dimension(), scroll = $.camelCase(["scroll", dimension].join("-")), actives = this.$parent && this.$parent.find("> .accordion-group > .in"), actives && actives.length) {
                    if (hasData = actives.data("collapse"), hasData && hasData.transitioning) return;
                    actives.collapse("hide"), hasData || actives.data("collapse", null)
                }
                this.$element[dimension](0), this.transition("addClass", $.Event("show"), "shown"), $.support.transition && this.$element[dimension](this.$element[0][scroll])
            }
        }, hide: function () {
            var dimension;
            this.transitioning || (dimension = this.dimension(), this.reset(this.$element[dimension]()), this.transition("removeClass", $.Event("hide"), "hidden"), this.$element[dimension](0))
        }, reset: function (size) {
            var dimension = this.dimension();
            return this.$element.removeClass("collapse")[dimension](size || "auto")[0].offsetWidth, this.$element[null !== size ? "addClass" : "removeClass"]("collapse"), this
        }, transition: function (method, startEvent, completeEvent) {
            var that = this, complete = function () {
                "show" == startEvent.type && that.reset(), that.transitioning = 0, that.$element.trigger(completeEvent)
            };
            this.$element.trigger(startEvent), startEvent.isDefaultPrevented() || (this.transitioning = 1, this.$element[method]("in"), $.support.transition && this.$element.hasClass("collapse") ? this.$element.one($.support.transition.end, complete) : complete())
        }, toggle: function () {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }
    };
    var old = $.fn.collapse;
    $.fn.collapse = function (option) {
        return this.each(function () {
            var $this = $(this), data = $this.data("collapse"), options = "object" == typeof option && option;
            data || $this.data("collapse", data = new Collapse(this, options)), "string" == typeof option && data[option]()
        })
    }, $.fn.collapse.defaults = {toggle: !0}, $.fn.collapse.Constructor = Collapse, $.fn.collapse.noConflict = function () {
        return $.fn.collapse = old, this
    }, $(document).on("click.collapse.data-api", "[data-toggle=collapse]", function (e) {
        var href, $this = $(this),
            target = $this.attr("data-target") || e.preventDefault() || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""),
            option = $(target).data("collapse") ? "toggle" : $this.data();
        $this[$(target).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), $(target).collapse(option)
    })
}(window.jQuery), !function ($) {
    "use strict";

    function clearMenus() {
        $(toggle).each(function () {
            getParent($(this)).removeClass("open")
        })
    }

    function getParent($this) {
        var $parent, selector = $this.attr("data-target");
        return selector || (selector = $this.attr("href"), selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, "")), $parent = $(selector), $parent.length || ($parent = $this.parent()), $parent
    }

    var toggle = "[data-toggle=dropdown]", Dropdown = function (element) {
        var $el = $(element).on("click.dropdown.data-api", this.toggle);
        $("html").on("click.dropdown.data-api", function () {
            $el.parent().removeClass("open")
        })
    };
    Dropdown.prototype = {
        constructor: Dropdown, toggle: function (e) {
            var $parent, isActive, $this = $(this);
            if (!$this.is(".disabled, :disabled")) return $parent = getParent($this), isActive = $parent.hasClass("open"), clearMenus(), isActive || $parent.toggleClass("open"), $this.focus(), !1
        }, keydown: function (e) {
            var $this, $items, $parent, isActive, index;
            if (/(38|40|27)/.test(e.keyCode) && ($this = $(this), e.preventDefault(), e.stopPropagation(), !$this.is(".disabled, :disabled"))) {
                if ($parent = getParent($this), isActive = $parent.hasClass("open"), !isActive || isActive && 27 == e.keyCode) return $this.click();
                $items = $("[role=menu] li:not(.divider):visible a", $parent), $items.length && (index = $items.index($items.filter(":focus")), 38 == e.keyCode && index > 0 && index--, 40 == e.keyCode && index < $items.length - 1 && index++, ~index || (index = 0), $items.eq(index).focus())
            }
        }
    };
    var old = $.fn.dropdown;
    $.fn.dropdown = function (option) {
        return this.each(function () {
            var $this = $(this), data = $this.data("dropdown");
            data || $this.data("dropdown", data = new Dropdown(this)), "string" == typeof option && data[option].call($this)
        })
    }, $.fn.dropdown.Constructor = Dropdown, $.fn.dropdown.noConflict = function () {
        return $.fn.dropdown = old, this
    }, $(document).on("click.dropdown.data-api touchstart.dropdown.data-api", clearMenus).on("click.dropdown touchstart.dropdown.data-api", ".dropdown form", function (e) {
        e.stopPropagation()
    }).on("touchstart.dropdown.data-api", ".dropdown-menu", function (e) {
        e.stopPropagation()
    }).on("click.dropdown.data-api touchstart.dropdown.data-api", toggle, Dropdown.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api", toggle + ", [role=menu]", Dropdown.prototype.keydown)
}(window.jQuery), !function ($) {
    "use strict";
    var Modal = function (element, options) {
        this.options = options, this.$element = $(element).delegate('[data-dismiss="modal"]', "click.dismiss.modal", $.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
    };
    Modal.prototype = {
        constructor: Modal, toggle: function () {
            return this[this.isShown ? "hide" : "show"]()
        }, show: function () {
            var that = this, e = $.Event("show");
            this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.backdrop(function () {
                var transition = $.support.transition && that.$element.hasClass("fade");
                that.$element.parent().length || that.$element.appendTo(document.body), that.$element.show(), transition && that.$element[0].offsetWidth, that.$element.addClass("in").attr("aria-hidden", !1), that.enforceFocus(), transition ? that.$element.one($.support.transition.end, function () {
                    that.$element.focus().trigger("shown")
                }) : that.$element.focus().trigger("shown")
            }))
        }, hide: function (e) {
            e && e.preventDefault();
            e = $.Event("hide"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), $(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), $.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal())
        }, enforceFocus: function () {
            var that = this;
            $(document).on("focusin.modal", function (e) {
                that.$element[0] === e.target || that.$element.has(e.target).length || that.$element.focus()
            })
        }, escape: function () {
            var that = this;
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function (e) {
                27 == e.which && that.hide()
            }) : this.isShown || this.$element.off("keyup.dismiss.modal")
        }, hideWithTransition: function () {
            var that = this, timeout = setTimeout(function () {
                that.$element.off($.support.transition.end), that.hideModal()
            }, 500);
            this.$element.one($.support.transition.end, function () {
                clearTimeout(timeout), that.hideModal()
            })
        }, hideModal: function (that) {
            this.$element.hide().trigger("hidden"), this.backdrop()
        }, removeBackdrop: function () {
            this.$backdrop.remove(), this.$backdrop = null
        }, backdrop: function (callback) {
            var animate = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var doAnimate = $.support.transition && animate;
                this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(document.body), this.$backdrop.click("static" == this.options.backdrop ? $.proxy(this.$element[0].focus, this.$element[0]) : $.proxy(this.hide, this)), doAnimate && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), doAnimate ? this.$backdrop.one($.support.transition.end, callback) : callback()
            } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), $.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one($.support.transition.end, $.proxy(this.removeBackdrop, this)) : this.removeBackdrop()) : callback && callback()
        }
    };
    var old = $.fn.modal;
    $.fn.modal = function (option) {
        return this.each(function () {
            var $this = $(this), data = $this.data("modal"),
                options = $.extend({}, $.fn.modal.defaults, $this.data(), "object" == typeof option && option);
            data || $this.data("modal", data = new Modal(this, options)), "string" == typeof option ? data[option]() : options.show && data.show()
        })
    }, $.fn.modal.defaults = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, $.fn.modal.Constructor = Modal, $.fn.modal.noConflict = function () {
        return $.fn.modal = old, this
    }, $(document).on("click.modal.data-api", '[data-toggle="modal"]', function (e) {
        var $this = $(this), href = $this.attr("href"),
            $target = $($this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, "")),
            option = $target.data("modal") ? "toggle" : $.extend({remote: !/#/.test(href) && href}, $target.data(), $this.data());
        e.preventDefault(), $target.modal(option).one("hide", function () {
            $this.focus()
        })
    })
}(window.jQuery), !function ($) {
    "use strict";
    var Popover = function (element, options) {
        this.init("popover", element, options)
    };
    Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {
        constructor: Popover,
        setContent: function () {
            var $tip = this.tip(), title = this.getTitle(), content = this.getContent();
            $tip.find(".popover-title")[this.options.html ? "html" : "text"](title), $tip.find(".popover-content")[this.options.html ? "html" : "text"](content), $tip.removeClass("fade top bottom left right in")
        },
        hasContent: function () {
            return this.getTitle() || this.getContent()
        },
        getContent: function () {
            var content, $e = this.$element, o = this.options;
            return content = $e.attr("data-content") || ("function" == typeof o.content ? o.content.call($e[0]) : o.content)
        },
        tip: function () {
            return this.$tip || (this.$tip = $(this.options.template)), this.$tip
        },
        destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    });
    var old = $.fn.popover;
    $.fn.popover = function (option) {
        return this.each(function () {
            var $this = $(this), data = $this.data("popover"), options = "object" == typeof option && option;
            data || $this.data("popover", data = new Popover(this, options)), "string" == typeof option && data[option]()
        })
    }, $.fn.popover.Constructor = Popover, $.fn.popover.defaults = $.extend({}, $.fn.tooltip.defaults, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"></div></div></div>'
    }), $.fn.popover.noConflict = function () {
        return $.fn.popover = old, this
    }
}(window.jQuery), !function ($) {
    "use strict";

    function ScrollSpy(element, options) {
        var href, process = $.proxy(this.process, this), $element = $($(element).is("body") ? window : element);
        this.options = $.extend({}, $.fn.scrollspy.defaults, options), this.$scrollElement = $element.on("scroll.scroll-spy.data-api", process), this.selector = (this.options.target || (href = $(element).attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = $("body"), this.refresh(), this.process()
    }

    ScrollSpy.prototype = {
        constructor: ScrollSpy, refresh: function () {
            var $targets, self = this;
            this.offsets = $([]), this.targets = $([]), $targets = this.$body.find(this.selector).map(function () {
                var $el = $(this), href = $el.data("target") || $el.attr("href"), $href = /^#\w/.test(href) && $(href);
                return $href && $href.length && [[$href.position().top + self.$scrollElement.scrollTop(), href]] || null
            }).sort(function (a, b) {
                return a[0] - b[0]
            }).each(function () {
                self.offsets.push(this[0]), self.targets.push(this[1])
            })
        }, process: function () {
            var i, scrollTop = this.$scrollElement.scrollTop() + this.options.offset,
                scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
                maxScroll = scrollHeight - this.$scrollElement.height(), offsets = this.offsets, targets = this.targets,
                activeTarget = this.activeTarget;
            if (scrollTop >= maxScroll) return activeTarget != (i = targets.last()[0]) && this.activate(i);
            for (i = offsets.length; i--;) activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i])
        }, activate: function (target) {
            var active, selector;
            this.activeTarget = target, $(this.selector).parent(".active").removeClass("active"), selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]', active = $(selector).parent("li").addClass("active"), active.parent(".dropdown-menu").length && (active = active.closest("li.dropdown").addClass("active")), active.trigger("activate")
        }
    };
    var old = $.fn.scrollspy;
    $.fn.scrollspy = function (option) {
        return this.each(function () {
            var $this = $(this), data = $this.data("scrollspy"), options = "object" == typeof option && option;
            data || $this.data("scrollspy", data = new ScrollSpy(this, options)), "string" == typeof option && data[option]()
        })
    }, $.fn.scrollspy.Constructor = ScrollSpy, $.fn.scrollspy.defaults = {offset: 10}, $.fn.scrollspy.noConflict = function () {
        return $.fn.scrollspy = old, this
    }, $(window).on("load", function () {
        $('[data-spy="scroll"]').each(function () {
            var $spy = $(this);
            $spy.scrollspy($spy.data())
        })
    })
}(window.jQuery), !function ($) {
    "use strict";
    var Tab = function (element) {
        this.element = $(element)
    };
    Tab.prototype = {
        constructor: Tab, show: function () {
            var previous, $target, e, $this = this.element, $ul = $this.closest("ul:not(.dropdown-menu)"),
                selector = $this.attr("data-target");
            selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")), $this.parent("li").hasClass("active") || (previous = $ul.find(".active:last a")[0], e = $.Event("show", {relatedTarget: previous}), $this.trigger(e), e.isDefaultPrevented() || ($target = $(selector), this.activate($this.parent("li"), $ul), this.activate($target, $target.parent(), function () {
                $this.trigger({type: "shown", relatedTarget: previous})
            })))
        }, activate: function (element, container, callback) {
            function next() {
                $active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), element.addClass("active"), transition ? (element[0].offsetWidth, element.addClass("in")) : element.removeClass("fade"), element.parent(".dropdown-menu") && element.closest("li.dropdown").addClass("active"), callback && callback()
            }

            var $active = container.find("> .active"),
                transition = callback && $.support.transition && $active.hasClass("fade");
            transition ? $active.one($.support.transition.end, next) : next(), $active.removeClass("in")
        }
    };
    var old = $.fn.tab;
    $.fn.tab = function (option) {
        return this.each(function () {
            var $this = $(this), data = $this.data("tab");
            data || $this.data("tab", data = new Tab(this)), "string" == typeof option && data[option]()
        })
    }, $.fn.tab.Constructor = Tab, $.fn.tab.noConflict = function () {
        return $.fn.tab = old, this
    }, $(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
        e.preventDefault(), $(this).tab("show")
    })
}(window.jQuery), !function ($) {
    "use strict";
    var Typeahead = function (element, options) {
        this.$element = $(element), this.options = $.extend({}, $.fn.typeahead.defaults, options), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.source = this.options.source, this.$menu = $(this.options.menu), this.shown = !1, this.listen()
    };
    Typeahead.prototype = {
        constructor: Typeahead, select: function () {
            var val = this.$menu.find(".active").attr("data-value");
            return this.$element.val(this.updater(val)).change(), this.hide()
        }, updater: function (item) {
            return item
        }, show: function () {
            var pos = $.extend({}, this.$element.position(), {height: this.$element[0].offsetHeight});
            return this.$menu.insertAfter(this.$element).css({
                top: pos.top + pos.height,
                left: pos.left
            }).show(), this.shown = !0, this
        }, hide: function () {
            return this.$menu.hide(), this.shown = !1, this
        }, lookup: function (event) {
            var items;
            return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source, items ? this.process(items) : this)
        }, process: function (items) {
            var that = this;
            return items = $.grep(items, function (item) {
                return that.matcher(item)
            }), items = this.sorter(items), items.length ? this.render(items.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
        }, matcher: function (item) {
            return ~item.toLowerCase().indexOf(this.query.toLowerCase())
        }, sorter: function (items) {
            for (var item, beginswith = [], caseSensitive = [], caseInsensitive = []; item = items.shift();) item.toLowerCase().indexOf(this.query.toLowerCase()) ? ~item.indexOf(this.query) ? caseSensitive.push(item) : caseInsensitive.push(item) : beginswith.push(item);
            return beginswith.concat(caseSensitive, caseInsensitive)
        }, highlighter: function (item) {
            var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            return item.replace(new RegExp("(" + query + ")", "ig"), function ($1, match) {
                return "<strong>" + match + "</strong>"
            })
        }, render: function (items) {
            var that = this;
            return items = $(items).map(function (i, item) {
                return i = $(that.options.item).attr("data-value", item), i.find("a").html(that.highlighter(item)), i[0]
            }), items.first().addClass("active"), this.$menu.html(items), this
        }, next: function (event) {
            var active = this.$menu.find(".active").removeClass("active"), next = active.next();
            next.length || (next = $(this.$menu.find("li")[0])), next.addClass("active")
        }, prev: function (event) {
            var active = this.$menu.find(".active").removeClass("active"), prev = active.prev();
            prev.length || (prev = this.$menu.find("li").last()), prev.addClass("active")
        }, listen: function () {
            this.$element.on("blur", $.proxy(this.blur, this)).on("keypress", $.proxy(this.keypress, this)).on("keyup", $.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", $.proxy(this.keydown, this)), this.$menu.on("click", $.proxy(this.click, this)).on("mouseenter", "li", $.proxy(this.mouseenter, this))
        }, eventSupported: function (eventName) {
            var isSupported = eventName in this.$element;
            return isSupported || (this.$element.setAttribute(eventName, "return;"), isSupported = "function" == typeof this.$element[eventName]), isSupported
        }, move: function (e) {
            if (this.shown) {
                switch (e.keyCode) {
                    case 9:
                    case 13:
                    case 27:
                        e.preventDefault();
                        break;
                    case 38:
                        e.preventDefault(), this.prev();
                        break;
                    case 40:
                        e.preventDefault(), this.next()
                }
                e.stopPropagation()
            }
        }, keydown: function (e) {
            this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [40, 38, 9, 13, 27]), this.move(e)
        }, keypress: function (e) {
            this.suppressKeyPressRepeat || this.move(e)
        }, keyup: function (e) {
            switch (e.keyCode) {
                case 40:
                case 38:
                case 16:
                case 17:
                case 18:
                    break;
                case 9:
                case 13:
                    if (!this.shown) return;
                    this.select();
                    break;
                case 27:
                    if (!this.shown) return;
                    this.hide();
                    break;
                default:
                    this.lookup()
            }
            e.stopPropagation(), e.preventDefault()
        }, blur: function (e) {
            var that = this;
            setTimeout(function () {
                that.hide()
            }, 150)
        }, click: function (e) {
            e.stopPropagation(), e.preventDefault(), this.select()
        }, mouseenter: function (e) {
            this.$menu.find(".active").removeClass("active"), $(e.currentTarget).addClass("active")
        }
    };
    var old = $.fn.typeahead;
    $.fn.typeahead = function (option) {
        return this.each(function () {
            var $this = $(this), data = $this.data("typeahead"), options = "object" == typeof option && option;
            data || $this.data("typeahead", data = new Typeahead(this, options)), "string" == typeof option && data[option]()
        })
    }, $.fn.typeahead.defaults = {
        source: [],
        items: 8,
        menu: '<ul class="typeahead dropdown-menu"></ul>',
        item: '<li><a href="#"></a></li>',
        minLength: 1
    }, $.fn.typeahead.Constructor = Typeahead, $.fn.typeahead.noConflict = function () {
        return $.fn.typeahead = old, this
    }, $(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function (e) {
        var $this = $(this);
        $this.data("typeahead") || (e.preventDefault(), $this.typeahead($this.data()))
    })
}(window.jQuery), !function ($) {
    function UTCDate() {
        return new Date(Date.UTC.apply(Date, arguments))
    }

    var Datepicker = function (element, options) {
        var that = this;
        switch (this.element = $(element), this.language = options.language || this.element.data("date-language") || "en", this.language = this.language in dates ? this.language : this.language.split("-")[0], this.language = this.language in dates ? this.language : "en", this.isRTL = dates[this.language].rtl || !1, this.format = DPGlobal.parseFormat(options.format || this.element.data("date-format") || dates[this.language].format || "mm/dd/yyyy"), this.isInline = !1, this.isInput = this.element.is("input"), this.component = !!this.element.is(".date") && this.element.find(".add-on, .btn"), this.hasInput = this.component && this.element.find("input").length, this.component && 0 === this.component.length && (this.component = !1), this._attachEvents(), this.forceParse = !0, "forceParse" in options ? this.forceParse = options.forceParse : "dateForceParse" in this.element.data() && (this.forceParse = this.element.data("date-force-parse")), this.picker = $(DPGlobal.template).appendTo(this.isInline ? this.element : "body").on({
            click: $.proxy(this.click, this),
            mousedown: $.proxy(this.mousedown, this)
        }), this.isInline ? this.picker.addClass("datepicker-inline") : this.picker.addClass("datepicker-dropdown dropdown-menu"), this.isRTL && (this.picker.addClass("datepicker-rtl"), this.picker.find(".prev i, .next i").toggleClass("icon-arrow-left icon-arrow-right")), $(document).on("mousedown", function (e) {
            0 === $(e.target).closest(".datepicker.datepicker-inline, .datepicker.datepicker-dropdown").length && that.hide()
        }), this.autoclose = !1, "autoclose" in options ? this.autoclose = options.autoclose : "dateAutoclose" in this.element.data() && (this.autoclose = this.element.data("date-autoclose")), this.keyboardNavigation = !0, "keyboardNavigation" in options ? this.keyboardNavigation = options.keyboardNavigation : "dateKeyboardNavigation" in this.element.data() && (this.keyboardNavigation = this.element.data("date-keyboard-navigation")), this.viewMode = this.startViewMode = 0, options.startView || this.element.data("date-start-view")) {
            case 2:
            case"decade":
                this.viewMode = this.startViewMode = 2;
                break;
            case 1:
            case"year":
                this.viewMode = this.startViewMode = 1
        }
        if (this.minViewMode = options.minViewMode || this.element.data("date-min-view-mode") || 0, "string" == typeof this.minViewMode) switch (this.minViewMode) {
            case"months":
                this.minViewMode = 1;
                break;
            case"years":
                this.minViewMode = 2;
                break;
            default:
                this.minViewMode = 0
        }
        this.viewMode = this.startViewMode = Math.max(this.startViewMode, this.minViewMode), this.todayBtn = options.todayBtn || this.element.data("date-today-btn") || !1, this.todayHighlight = options.todayHighlight || this.element.data("date-today-highlight") || !1, this.calendarWeeks = !1, "calendarWeeks" in options ? this.calendarWeeks = options.calendarWeeks : "dateCalendarWeeks" in this.element.data() && (this.calendarWeeks = this.element.data("date-calendar-weeks")), this.calendarWeeks && this.picker.find("tfoot th.today").attr("colspan", function (i, val) {
            return parseInt(val) + 1
        }), this.weekStart = (options.weekStart || this.element.data("date-weekstart") || dates[this.language].weekStart || 0) % 7, this.weekEnd = (this.weekStart + 6) % 7, this.startDate = -(1 / 0), this.endDate = 1 / 0, this.daysOfWeekDisabled = [], this.setStartDate(options.startDate || this.element.data("date-startdate")), this.setEndDate(options.endDate || this.element.data("date-enddate")), this.setDaysOfWeekDisabled(options.daysOfWeekDisabled || this.element.data("date-days-of-week-disabled")), this.fillDow(), this.fillMonths(), this.update(), this.showMode(), this.isInline && this.show()
    };
    Datepicker.prototype = {
        constructor: Datepicker, _events: [], _attachEvents: function () {
            this._detachEvents(), this.isInput ? this._events = [[this.element, {
                focus: $.proxy(this.show, this),
                keyup: $.proxy(this.update, this),
                keydown: $.proxy(this.keydown, this)
            }]] : this.component && this.hasInput ? this._events = [[this.element.find("input"), {
                focus: $.proxy(this.show, this),
                keyup: $.proxy(this.update, this),
                keydown: $.proxy(this.keydown, this)
            }], [this.component, {click: $.proxy(this.show, this)}]] : this.element.is("div") ? this.isInline = !0 : this._events = [[this.element, {click: $.proxy(this.show, this)}]];
            for (var el, ev, i = 0; i < this._events.length; i++) el = this._events[i][0], ev = this._events[i][1], el.on(ev)
        }, _detachEvents: function () {
            for (var el, ev, i = 0; i < this._events.length; i++) el = this._events[i][0], ev = this._events[i][1], el.off(ev);
            this._events = []
        }, show: function (e) {
            this.picker.show(), this.height = this.component ? this.component.outerHeight() : this.element.outerHeight(), this.update(), this.place(), $(window).on("resize", $.proxy(this.place, this)), e && e.preventDefault(), this.element.trigger({
                type: "show",
                date: this.date
            })
        }, hide: function (e) {
            this.isInline || this.picker.is(":visible") && (this.picker.hide(), $(window).off("resize", this.place), this.viewMode = this.startViewMode, this.showMode(), this.isInput || $(document).off("mousedown", this.hide), this.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), this.element.trigger({
                type: "hide",
                date: this.date
            }))
        }, remove: function () {
            this._detachEvents(), this.picker.remove(), delete this.element.data().datepicker, this.isInput || delete this.element.data().date
        }, getDate: function () {
            var d = this.getUTCDate();
            return new Date(d.getTime() + 6e4 * d.getTimezoneOffset())
        }, getUTCDate: function () {
            return this.date
        }, setDate: function (d) {
            this.setUTCDate(new Date(d.getTime() - 6e4 * d.getTimezoneOffset()))
        }, setUTCDate: function (d) {
            this.date = d, this.setValue()
        }, setValue: function () {
            var formatted = this.getFormattedDate();
            this.isInput ? this.element.val(formatted) : (this.component && this.element.find("input").val(formatted), this.element.data("date", formatted))
        }, getFormattedDate: function (format) {
            return void 0 === format && (format = this.format), DPGlobal.formatDate(this.date, format, this.language)
        }, setStartDate: function (startDate) {
            this.startDate = startDate || -(1 / 0), this.startDate !== -(1 / 0) && (this.startDate = DPGlobal.parseDate(this.startDate, this.format, this.language)), this.update(), this.updateNavArrows()
        }, setEndDate: function (endDate) {
            this.endDate = endDate || 1 / 0, this.endDate !== 1 / 0 && (this.endDate = DPGlobal.parseDate(this.endDate, this.format, this.language)), this.update(), this.updateNavArrows()
        }, setDaysOfWeekDisabled: function (daysOfWeekDisabled) {
            this.daysOfWeekDisabled = daysOfWeekDisabled || [], $.isArray(this.daysOfWeekDisabled) || (this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/)), this.daysOfWeekDisabled = $.map(this.daysOfWeekDisabled, function (d) {
                return parseInt(d, 10)
            }), this.update(), this.updateNavArrows()
        }, place: function () {
            if (!this.isInline) {
                var zIndex = parseInt(this.element.parents().filter(function () {
                        return "auto" != $(this).css("z-index")
                    }).first().css("z-index")) + 10,
                    offset = this.component ? this.component.parent().offset() : this.element.offset(),
                    height = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!0);
                this.picker.css({top: offset.top + height, left: offset.left, zIndex: zIndex})
            }
        }, update: function () {
            var date, fromArgs = !1;
            arguments && arguments.length && ("string" == typeof arguments[0] || arguments[0] instanceof Date) ? (date = arguments[0], fromArgs = !0) : date = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val(), this.date = DPGlobal.parseDate(date, this.format, this.language), fromArgs && this.setValue(), this.date < this.startDate ? this.viewDate = new Date(this.startDate) : this.date > this.endDate ? this.viewDate = new Date(this.endDate) : this.viewDate = new Date(this.date), this.fill()
        }, fillDow: function () {
            var dowCnt = this.weekStart, html = "<tr>";
            if (this.calendarWeeks) {
                var cell = '<th class="cw">&nbsp;</th>';
                html += cell, this.picker.find(".datepicker-days thead tr:first-child").prepend(cell)
            }
            for (; dowCnt < this.weekStart + 7;) html += '<th class="dow">' + dates[this.language].daysMin[dowCnt++ % 7] + "</th>";
            html += "</tr>", this.picker.find(".datepicker-days thead").append(html)
        }, fillMonths: function () {
            for (var html = "", i = 0; i < 12;) html += '<span class="month">' + dates[this.language].monthsShort[i++] + "</span>";
            this.picker.find(".datepicker-months td").html(html)
        }, fill: function () {
            var d = new Date(this.viewDate), year = d.getUTCFullYear(), month = d.getUTCMonth(),
                startYear = this.startDate !== -(1 / 0) ? this.startDate.getUTCFullYear() : -(1 / 0),
                startMonth = this.startDate !== -(1 / 0) ? this.startDate.getUTCMonth() : -(1 / 0),
                endYear = this.endDate !== 1 / 0 ? this.endDate.getUTCFullYear() : 1 / 0,
                endMonth = this.endDate !== 1 / 0 ? this.endDate.getUTCMonth() : 1 / 0,
                currentDate = this.date && this.date.valueOf(), today = new Date;
            this.picker.find(".datepicker-days thead th.switch").text(dates[this.language].months[month] + " " + year), this.picker.find("tfoot th.today").text(dates[this.language].today).toggle(this.todayBtn !== !1), this.updateNavArrows(), this.fillMonths();
            var prevMonth = UTCDate(year, month - 1, 28, 0, 0, 0, 0),
                day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
            prevMonth.setUTCDate(day), prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.weekStart + 7) % 7);
            var nextMonth = new Date(prevMonth);
            nextMonth.setUTCDate(nextMonth.getUTCDate() + 42), nextMonth = nextMonth.valueOf();
            for (var clsName, html = []; prevMonth.valueOf() < nextMonth;) {
                if (prevMonth.getUTCDay() == this.weekStart && (html.push("<tr>"), this.calendarWeeks)) {
                    var ws = new Date(+prevMonth + (this.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),
                        th = new Date(+ws + (11 - ws.getUTCDay()) % 7 * 864e5),
                        yth = new Date(+(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (11 - yth.getUTCDay()) % 7 * 864e5),
                        calWeek = (th - yth) / 864e5 / 7 + 1;
                    html.push('<td class="cw">' + calWeek + "</td>")
                }
                clsName = "", prevMonth.getUTCFullYear() < year || prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() < month ? clsName += " old" : (prevMonth.getUTCFullYear() > year || prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() > month) && (clsName += " new"), this.todayHighlight && prevMonth.getUTCFullYear() == today.getFullYear() && prevMonth.getUTCMonth() == today.getMonth() && prevMonth.getUTCDate() == today.getDate() && (clsName += " today"), currentDate && prevMonth.valueOf() == currentDate && (clsName += " active"), (prevMonth.valueOf() < this.startDate || prevMonth.valueOf() > this.endDate || $.inArray(prevMonth.getUTCDay(), this.daysOfWeekDisabled) !== -1) && (clsName += " disabled"), html.push('<td class="day' + clsName + '">' + prevMonth.getUTCDate() + "</td>"), prevMonth.getUTCDay() == this.weekEnd && html.push("</tr>"), prevMonth.setUTCDate(prevMonth.getUTCDate() + 1)
            }
            this.picker.find(".datepicker-days tbody").empty().append(html.join(""));
            var currentYear = this.date && this.date.getUTCFullYear(),
                months = this.picker.find(".datepicker-months").find("th:eq(1)").text(year).end().find("span").removeClass("active");
            currentYear && currentYear == year && months.eq(this.date.getUTCMonth()).addClass("active"), (year < startYear || year > endYear) && months.addClass("disabled"), year == startYear && months.slice(0, startMonth).addClass("disabled"), year == endYear && months.slice(endMonth + 1).addClass("disabled"), html = "", year = 10 * parseInt(year / 10, 10);
            var yearCont = this.picker.find(".datepicker-years").find("th:eq(1)").text(year + "-" + (year + 9)).end().find("td");
            year -= 1;
            for (var i = -1; i < 11; i++) html += '<span class="year' + (i == -1 || 10 == i ? " old" : "") + (currentYear == year ? " active" : "") + (year < startYear || year > endYear ? " disabled" : "") + '">' + year + "</span>", year += 1;
            yearCont.html(html)
        }, updateNavArrows: function () {
            var d = new Date(this.viewDate), year = d.getUTCFullYear(), month = d.getUTCMonth();
            switch (this.viewMode) {
                case 0:
                    this.startDate !== -(1 / 0) && year <= this.startDate.getUTCFullYear() && month <= this.startDate.getUTCMonth() ? this.picker.find(".prev").css({visibility: "hidden"}) : this.picker.find(".prev").css({visibility: "visible"}), this.endDate !== 1 / 0 && year >= this.endDate.getUTCFullYear() && month >= this.endDate.getUTCMonth() ? this.picker.find(".next").css({visibility: "hidden"}) : this.picker.find(".next").css({visibility: "visible"});
                    break;
                case 1:
                case 2:
                    this.startDate !== -(1 / 0) && year <= this.startDate.getUTCFullYear() ? this.picker.find(".prev").css({visibility: "hidden"}) : this.picker.find(".prev").css({visibility: "visible"}), this.endDate !== 1 / 0 && year >= this.endDate.getUTCFullYear() ? this.picker.find(".next").css({visibility: "hidden"}) : this.picker.find(".next").css({visibility: "visible"})
            }
        }, click: function (e) {
            e.preventDefault();
            var target = $(e.target).closest("span, td, th");
            if (1 == target.length) switch (target[0].nodeName.toLowerCase()) {
                case"th":
                    switch (target[0].className) {
                        case"switch":
                            this.showMode(1);
                            break;
                        case"prev":
                        case"next":
                            var dir = DPGlobal.modes[this.viewMode].navStep * ("prev" == target[0].className ? -1 : 1);
                            switch (this.viewMode) {
                                case 0:
                                    this.viewDate = this.moveMonth(this.viewDate, dir);
                                    break;
                                case 1:
                                case 2:
                                    this.viewDate = this.moveYear(this.viewDate, dir)
                            }
                            this.fill();
                            break;
                        case"today":
                            var date = new Date;
                            date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0), this.showMode(-2);
                            var which = "linked" == this.todayBtn ? null : "view";
                            this._setDate(date, which)
                    }
                    break;
                case"span":
                    if (!target.is(".disabled")) {
                        if (this.viewDate.setUTCDate(1), target.is(".month")) {
                            var day = 1, month = target.parent().find("span").index(target),
                                year = this.viewDate.getUTCFullYear();
                            this.viewDate.setUTCMonth(month), this.element.trigger({
                                type: "changeMonth",
                                date: this.viewDate
                            }), 1 == this.minViewMode && this._setDate(UTCDate(year, month, day, 0, 0, 0, 0))
                        } else {
                            var year = parseInt(target.text(), 10) || 0, day = 1, month = 0;
                            this.viewDate.setUTCFullYear(year), this.element.trigger({
                                type: "changeYear",
                                date: this.viewDate
                            }), 2 == this.minViewMode && this._setDate(UTCDate(year, month, day, 0, 0, 0, 0))
                        }
                        this.showMode(-1), this.fill()
                    }
                    break;
                case"td":
                    if (target.is(".day") && !target.is(".disabled")) {
                        var day = parseInt(target.text(), 10) || 1, year = this.viewDate.getUTCFullYear(),
                            month = this.viewDate.getUTCMonth();
                        target.is(".old") ? 0 === month ? (month = 11, year -= 1) : month -= 1 : target.is(".new") && (11 == month ? (month = 0, year += 1) : month += 1), this._setDate(UTCDate(year, month, day, 0, 0, 0, 0))
                    }
            }
        }, _setDate: function (date, which) {
            which && "date" != which || (this.date = date), which && "view" != which || (this.viewDate = date), this.fill(), this.setValue(), this.element.trigger({
                type: "changeDate",
                date: this.date
            });
            var element;
            this.isInput ? element = this.element : this.component && (element = this.element.find("input")), element && (element.change(), !this.autoclose || which && "date" != which || this.hide())
        }, moveMonth: function (date, dir) {
            if (!dir) return date;
            var new_month, test, new_date = new Date(date.valueOf()), day = new_date.getUTCDate(),
                month = new_date.getUTCMonth(), mag = Math.abs(dir);
            if (dir = dir > 0 ? 1 : -1, 1 == mag) test = dir == -1 ? function () {
                return new_date.getUTCMonth() == month
            } : function () {
                return new_date.getUTCMonth() != new_month
            }, new_month = month + dir, new_date.setUTCMonth(new_month), (new_month < 0 || new_month > 11) && (new_month = (new_month + 12) % 12); else {
                for (var i = 0; i < mag; i++) new_date = this.moveMonth(new_date, dir);
                new_month = new_date.getUTCMonth(), new_date.setUTCDate(day), test = function () {
                    return new_month != new_date.getUTCMonth()
                }
            }
            for (; test();) new_date.setUTCDate(--day), new_date.setUTCMonth(new_month);
            return new_date
        }, moveYear: function (date, dir) {
            return this.moveMonth(date, 12 * dir)
        }, dateWithinRange: function (date) {
            return date >= this.startDate && date <= this.endDate
        }, keydown: function (e) {
            if (this.picker.is(":not(:visible)")) return void (27 == e.keyCode && this.show());
            var dir, newDate, newViewDate, dateChanged = !1;
            switch (e.keyCode) {
                case 27:
                    this.hide(), e.preventDefault();
                    break;
                case 37:
                case 39:
                    if (!this.keyboardNavigation) break;
                    dir = 37 == e.keyCode ? -1 : 1, e.ctrlKey ? (newDate = this.moveYear(this.date, dir), newViewDate = this.moveYear(this.viewDate, dir)) : e.shiftKey ? (newDate = this.moveMonth(this.date, dir), newViewDate = this.moveMonth(this.viewDate, dir)) : (newDate = new Date(this.date), newDate.setUTCDate(this.date.getUTCDate() + dir), newViewDate = new Date(this.viewDate), newViewDate.setUTCDate(this.viewDate.getUTCDate() + dir)), this.dateWithinRange(newDate) && (this.date = newDate, this.viewDate = newViewDate, this.setValue(), this.update(), e.preventDefault(), dateChanged = !0);
                    break;
                case 38:
                case 40:
                    if (!this.keyboardNavigation) break;
                    dir = 38 == e.keyCode ? -1 : 1, e.ctrlKey ? (newDate = this.moveYear(this.date, dir), newViewDate = this.moveYear(this.viewDate, dir)) : e.shiftKey ? (newDate = this.moveMonth(this.date, dir), newViewDate = this.moveMonth(this.viewDate, dir)) : (newDate = new Date(this.date), newDate.setUTCDate(this.date.getUTCDate() + 7 * dir), newViewDate = new Date(this.viewDate), newViewDate.setUTCDate(this.viewDate.getUTCDate() + 7 * dir)), this.dateWithinRange(newDate) && (this.date = newDate, this.viewDate = newViewDate, this.setValue(), this.update(), e.preventDefault(), dateChanged = !0);
                    break;
                case 13:
                    this.hide(), e.preventDefault();
                    break;
                case 9:
                    this.hide()
            }
            if (dateChanged) {
                this.element.trigger({type: "changeDate", date: this.date});
                var element;
                this.isInput ? element = this.element : this.component && (element = this.element.find("input")), element && element.change()
            }
        }, showMode: function (dir) {
            dir && (this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + dir))), this.picker.find(">div").hide().filter(".datepicker-" + DPGlobal.modes[this.viewMode].clsName).css("display", "block"), this.updateNavArrows()
        }
    }, $.fn.datepicker = function (option) {
        var args = Array.apply(null, arguments);
        return args.shift(), this.each(function () {
            var $this = $(this), data = $this.data("datepicker"), options = "object" == typeof option && option;
            data || $this.data("datepicker", data = new Datepicker(this, $.extend({}, $.fn.datepicker.defaults, options))), "string" == typeof option && "function" == typeof data[option] && data[option].apply(data, args)
        })
    }, $.fn.datepicker.defaults = {}, $.fn.datepicker.Constructor = Datepicker;
    var dates = $.fn.datepicker.dates = {
        en: {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            today: "Today"
        }
    }, DPGlobal = {
        modes: [{clsName: "days", navFnc: "Month", navStep: 1}, {
            clsName: "months",
            navFnc: "FullYear",
            navStep: 1
        }, {clsName: "years", navFnc: "FullYear", navStep: 10}],
        isLeapYear: function (year) {
            return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0
        },
        getDaysInMonth: function (year, month) {
            return [31, DPGlobal.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
        },
        validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
        nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
        parseFormat: function (format) {
            var separators = format.replace(this.validParts, "\0").split("\0"), parts = format.match(this.validParts);
            if (!separators || !separators.length || !parts || 0 === parts.length) throw new Error("Invalid date format.");
            return {separators: separators, parts: parts}
        },
        parseDate: function (date, format, language) {
            if (date instanceof Date) return date;
            if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)) {
                var part, dir, part_re = /([\-+]\d+)([dmwy])/, parts = date.match(/([\-+]\d+)([dmwy])/g);
                date = new Date;
                for (var i = 0; i < parts.length; i++) switch (part = part_re.exec(parts[i]), dir = parseInt(part[1]), part[2]) {
                    case"d":
                        date.setUTCDate(date.getUTCDate() + dir);
                        break;
                    case"m":
                        date = Datepicker.prototype.moveMonth.call(Datepicker.prototype, date, dir);
                        break;
                    case"w":
                        date.setUTCDate(date.getUTCDate() + 7 * dir);
                        break;
                    case"y":
                        date = Datepicker.prototype.moveYear.call(Datepicker.prototype, date, dir)
                }
                return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0)
            }
            var val, filtered, part, parts = date && date.match(this.nonpunctuation) || [], date = new Date,
                parsed = {}, setters_order = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"], setters_map = {
                    yyyy: function (d, v) {
                        return d.setUTCFullYear(v)
                    }, yy: function (d, v) {
                        return d.setUTCFullYear(2e3 + v)
                    }, m: function (d, v) {
                        for (v -= 1; v < 0;) v += 12;
                        for (v %= 12, d.setUTCMonth(v); d.getUTCMonth() != v;) d.setUTCDate(d.getUTCDate() - 1);
                        return d
                    }, d: function (d, v) {
                        return d.setUTCDate(v)
                    }
                };
            setters_map.M = setters_map.MM = setters_map.mm = setters_map.m, setters_map.dd = setters_map.d, date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
            var fparts = format.parts.slice();
            if (parts.length != fparts.length && (fparts = $(fparts).filter(function (i, p) {
                return $.inArray(p, setters_order) !== -1
            }).toArray()), parts.length == fparts.length) {
                for (var i = 0, cnt = fparts.length; i < cnt; i++) {
                    if (val = parseInt(parts[i], 10), part = fparts[i], isNaN(val)) switch (part) {
                        case"MM":
                            filtered = $(dates[language].months).filter(function () {
                                var m = this.slice(0, parts[i].length), p = parts[i].slice(0, m.length);
                                return m == p
                            }), val = $.inArray(filtered[0], dates[language].months) + 1;
                            break;
                        case"M":
                            filtered = $(dates[language].monthsShort).filter(function () {
                                var m = this.slice(0, parts[i].length), p = parts[i].slice(0, m.length);
                                return m == p
                            }), val = $.inArray(filtered[0], dates[language].monthsShort) + 1
                    }
                    parsed[part] = val
                }
                for (var s, i = 0; i < setters_order.length; i++) s = setters_order[i], s in parsed && !isNaN(parsed[s]) && setters_map[s](date, parsed[s])
            }
            return date
        },
        formatDate: function (date, format, language) {
            var val = {
                d: date.getUTCDate(),
                D: dates[language].daysShort[date.getUTCDay()],
                DD: dates[language].days[date.getUTCDay()],
                m: date.getUTCMonth() + 1,
                M: dates[language].monthsShort[date.getUTCMonth()],
                MM: dates[language].months[date.getUTCMonth()],
                yy: date.getUTCFullYear().toString().substring(2),
                yyyy: date.getUTCFullYear()
            };
            val.dd = (val.d < 10 ? "0" : "") + val.d, val.mm = (val.m < 10 ? "0" : "") + val.m;
            for (var date = [], seps = $.extend([], format.separators), i = 0, cnt = format.parts.length; i < cnt; i++) seps.length && date.push(seps.shift()), date.push(val[format.parts[i]]);
            return date.join("")
        },
        headTemplate: '<thead><tr><th class="prev"><i class="icon-arrow-left"/></th><th colspan="5" class="switch"></th><th class="next"><i class="icon-arrow-right"/></th></tr></thead>',
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr></tfoot>'
    };
    DPGlobal.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + DPGlobal.headTemplate + "<tbody></tbody>" + DPGlobal.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + "</table></div></div>", $.fn.datepicker.DPGlobal = DPGlobal
}(window.jQuery), function (factory) {
    "function" == typeof define && define.amd ? define(["jquery"], factory) : factory(jQuery)
}(function ($) {
    function args(elem) {
        var newAttrs = {}, rinlinejQuery = /^jQuery\d+$/;
        return $.each(elem.attributes, function (i, attr) {
            attr.specified && !rinlinejQuery.test(attr.name) && (newAttrs[attr.name] = attr.value)
        }), newAttrs
    }

    function clearPlaceholder(event, value) {
        var input = this, $input = $(input);
        if (input.value == $input.attr("placeholder") && $input.hasClass("placeholder")) if ($input.data("placeholder-password")) {
            if ($input = $input.hide().nextAll('input[type="password"]:first').show().attr("id", $input.removeAttr("id").data("placeholder-id")), event === !0) return $input[0].value = value;
            $input.focus()
        } else input.value = "", $input.removeClass("placeholder"), input == safeActiveElement() && input.select()
    }

    function setPlaceholder() {
        var $replacement, input = this, $input = $(input), id = this.id;
        if ("" === input.value) {
            if ("password" === input.type) {
                if (!$input.data("placeholder-textinput")) {
                    try {
                        $replacement = $input.clone().attr({type: "text"})
                    } catch (e) {
                        $replacement = $("<input>").attr($.extend(args(this), {type: "text"}))
                    }
                    $replacement.removeAttr("name").data({
                        "placeholder-password": $input,
                        "placeholder-id": id
                    }).bind("focus.placeholder", clearPlaceholder), $input.data({
                        "placeholder-textinput": $replacement,
                        "placeholder-id": id
                    }).before($replacement)
                }
                $input = $input.removeAttr("id").hide().prevAll('input[type="text"]:first').attr("id", id).show()
            }
            $input.addClass("placeholder"), $input[0].value = $input.attr("placeholder")
        } else $input.removeClass("placeholder")
    }

    function safeActiveElement() {
        try {
            return document.activeElement
        } catch (exception) {
        }
    }

    var hooks, placeholder, isOperaMini = "[object OperaMini]" == Object.prototype.toString.call(window.operamini),
        isInputSupported = "placeholder" in document.createElement("input") && !isOperaMini,
        isTextareaSupported = "placeholder" in document.createElement("textarea") && !isOperaMini,
        valHooks = $.valHooks, propHooks = $.propHooks;
    isInputSupported && isTextareaSupported ? (placeholder = $.fn.placeholder = function () {
        return this
    }, placeholder.input = placeholder.textarea = !0) : (placeholder = $.fn.placeholder = function () {
        var $this = this;
        return $this.filter((isInputSupported ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({
            "focus.placeholder": clearPlaceholder,
            "blur.placeholder": setPlaceholder
        }).data("placeholder-enabled", !0).trigger("blur.placeholder"), $this
    }, placeholder.input = isInputSupported, placeholder.textarea = isTextareaSupported, hooks = {
        get: function (element) {
            var $element = $(element), $passwordInput = $element.data("placeholder-password");
            return $passwordInput ? $passwordInput[0].value : $element.data("placeholder-enabled") && $element.hasClass("placeholder") ? "" : element.value
        }, set: function (element, value) {
            var $element = $(element), $passwordInput = $element.data("placeholder-password");
            return $passwordInput ? $passwordInput[0].value = value : $element.data("placeholder-enabled") ? ("" === value ? (element.value = value, element != safeActiveElement() && setPlaceholder.call(element)) : $element.hasClass("placeholder") ? clearPlaceholder.call(element, !0, value) || (element.value = value) : element.value = value, $element) : element.value = value
        }
    }, isInputSupported || (valHooks.input = hooks, propHooks.value = hooks), isTextareaSupported || (valHooks.textarea = hooks, propHooks.value = hooks), $(function () {
        $(document).delegate("form", "submit.placeholder", function () {
            var $inputs = $(".placeholder", this).each(clearPlaceholder);
            setTimeout(function () {
                $inputs.each(setPlaceholder)
            }, 10)
        })
    }), $(window).bind("beforeunload.placeholder", function () {
        $(".placeholder").each(function () {
            this.value = ""
        })
    }))
}), function () {
    var initializing = !1;
    window.JQClass = function () {
    }, JQClass.classes = {}, JQClass.extend = function extender(prop) {
        function JQClass() {
            !initializing && this._init && this._init.apply(this, arguments)
        }

        var base = this.prototype;
        initializing = !0;
        var prototype = new this;
        initializing = !1;
        for (var name in prop) prototype[name] = "function" == typeof prop[name] && "function" == typeof base[name] ? function (name, fn) {
            return function () {
                var __super = this._super;
                this._super = function (args) {
                    return base[name].apply(this, args || [])
                };
                var ret = fn.apply(this, arguments);
                return this._super = __super, ret
            }
        }(name, prop[name]) : prop[name];
        return JQClass.prototype = prototype, JQClass.prototype.constructor = JQClass, JQClass.extend = extender, JQClass
    }
}(), function ($) {
    function camelCase(name) {
        return name.replace(/-([a-z])/g, function (match, group) {
            return group.toUpperCase()
        })
    }

    JQClass.classes.JQPlugin = JQClass.extend({
        name: "plugin", defaultOptions: {}, regionalOptions: {}, _getters: [], _getMarker: function () {
            return "is-" + this.name
        }, _init: function () {
            $.extend(this.defaultOptions, this.regionalOptions && this.regionalOptions[""] || {});
            var jqName = camelCase(this.name);
            $[jqName] = this, $.fn[jqName] = function (options) {
                var otherArgs = Array.prototype.slice.call(arguments, 1);
                return $[jqName]._isNotChained(options, otherArgs) ? $[jqName][options].apply($[jqName], [this[0]].concat(otherArgs)) : this.each(function () {
                    if ("string" == typeof options) {
                        if ("_" === options[0] || !$[jqName][options]) throw"Unknown method: " + options;
                        $[jqName][options].apply($[jqName], [this].concat(otherArgs))
                    } else $[jqName]._attach(this, options)
                })
            }
        }, setDefaults: function (options) {
            $.extend(this.defaultOptions, options || {})
        }, _isNotChained: function (name, otherArgs) {
            return "option" === name && (0 === otherArgs.length || 1 === otherArgs.length && "string" == typeof otherArgs[0]) || $.inArray(name, this._getters) > -1
        }, _attach: function (elem, options) {
            if (elem = $(elem), !elem.hasClass(this._getMarker())) {
                elem.addClass(this._getMarker()), options = $.extend({}, this.defaultOptions, this._getMetadata(elem), options || {});
                var inst = $.extend({name: this.name, elem: elem, options: options}, this._instSettings(elem, options));
                elem.data(this.name, inst), this._postAttach(elem, inst), this.option(elem, options)
            }
        }, _instSettings: function (elem, options) {
            return {}
        }, _postAttach: function (elem, inst) {
        }, _getMetadata: function (elem) {
            try {
                var data = elem.data(this.name.toLowerCase()) || "";
                data = data.replace(/'/g, '"'), data = data.replace(/([a-zA-Z0-9]+):/g, function (match, group, i) {
                    var count = data.substring(0, i).match(/"/g);
                    return count && count.length % 2 !== 0 ? group + ":" : '"' + group + '":'
                }), data = $.parseJSON("{" + data + "}");
                for (var name in data) {
                    var value = data[name];
                    "string" == typeof value && value.match(/^new Date\((.*)\)$/) && (data[name] = eval(value))
                }
                return data
            } catch (e) {
                return {}
            }
        }, _getInst: function (elem) {
            return $(elem).data(this.name) || {}
        }, option: function (elem, name, value) {
            elem = $(elem);
            var inst = elem.data(this.name);
            if (!name || "string" == typeof name && null == value) {
                var options = (inst || {}).options;
                return options && name ? options[name] : options
            }
            if (elem.hasClass(this._getMarker())) {
                var options = name || {};
                "string" == typeof name && (options = {}, options[name] = value), this._optionsChanged(elem, inst, options), $.extend(inst.options, options)
            }
        }, _optionsChanged: function (elem, inst, options) {
        }, destroy: function (elem) {
            elem = $(elem), elem.hasClass(this._getMarker()) && (this._preDestroy(elem, this._getInst(elem)), elem.removeData(this.name).removeClass(this._getMarker()))
        }, _preDestroy: function (elem, inst) {
        }
    }), $.JQPlugin = {
        createPlugin: function (superClass, overrides) {
            "object" == typeof superClass && (overrides = superClass, superClass = "JQPlugin"), superClass = camelCase(superClass);
            var className = camelCase(overrides.name);
            JQClass.classes[className] = JQClass.classes[superClass].extend(overrides), new JQClass.classes[className]
        }
    }
}(jQuery), function ($) {
    var pluginName = "countdown", Y = 0, O = 1, W = 2, D = 3, H = 4, M = 5, S = 6;
    $.JQPlugin.createPlugin({
        name: pluginName,
        defaultOptions: {
            until: null,
            since: null,
            timezone: null,
            serverSync: null,
            format: "dHMS",
            layout: "",
            compact: !1,
            padZeroes: !1,
            significant: 0,
            description: "",
            expiryUrl: "",
            expiryText: "",
            alwaysExpire: !1,
            onExpiry: null,
            onTick: null,
            tickInterval: 1
        },
        regionalOptions: {
            "": {
                labels: ["Years", "Months", "Weeks", "Days", "Hours", "Minutes", "Seconds"],
                labels1: ["Year", "Month", "Week", "Day", "Hour", "Minute", "Second"],
                compactLabels: ["y", "m", "w", "d"],
                whichLabels: null,
                digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                timeSeparator: ":",
                isRTL: !1
            }
        },
        _getters: ["getTimes"],
        _rtlClass: pluginName + "-rtl",
        _sectionClass: pluginName + "-section",
        _amountClass: pluginName + "-amount",
        _periodClass: pluginName + "-period",
        _rowClass: pluginName + "-row",
        _holdingClass: pluginName + "-holding",
        _showClass: pluginName + "-show",
        _descrClass: pluginName + "-descr",
        _timerElems: [],
        _init: function () {
            function timerCallBack(timestamp) {
                var drawStart = timestamp < 1e12 ? perfAvail ? performance.now() + performance.timing.navigationStart : now() : timestamp || now();
                drawStart - animationStartTime >= 1e3 && (self._updateElems(), animationStartTime = drawStart), requestAnimationFrame(timerCallBack)
            }

            var self = this;
            this._super(), this._serverSyncs = [];
            var now = "function" == typeof Date.now ? Date.now : function () {
                    return (new Date).getTime()
                }, perfAvail = window.performance && "function" == typeof window.performance.now,
                requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || null,
                animationStartTime = 0;
            !requestAnimationFrame || $.noRequestAnimationFrame ? ($.noRequestAnimationFrame = null, setInterval(function () {
                self._updateElems()
            }, 980)) : (animationStartTime = window.animationStartTime || window.webkitAnimationStartTime || window.mozAnimationStartTime || window.oAnimationStartTime || window.msAnimationStartTime || now(), requestAnimationFrame(timerCallBack))
        },
        UTCDate: function (tz, year, month, day, hours, mins, secs, ms) {
            "object" == typeof year && year.constructor == Date && (ms = year.getMilliseconds(), secs = year.getSeconds(), mins = year.getMinutes(), hours = year.getHours(), day = year.getDate(), month = year.getMonth(), year = year.getFullYear());
            var d = new Date;
            return d.setUTCFullYear(year), d.setUTCDate(1), d.setUTCMonth(month || 0), d.setUTCDate(day || 1), d.setUTCHours(hours || 0), d.setUTCMinutes((mins || 0) - (Math.abs(tz) < 30 ? 60 * tz : tz)), d.setUTCSeconds(secs || 0), d.setUTCMilliseconds(ms || 0), d
        },
        periodsToSeconds: function (periods) {
            return 31557600 * periods[0] + 2629800 * periods[1] + 604800 * periods[2] + 86400 * periods[3] + 3600 * periods[4] + 60 * periods[5] + periods[6]
        },
        _instSettings: function (elem, options) {
            return {_periods: [0, 0, 0, 0, 0, 0, 0]}
        },
        _addElem: function (elem) {
            this._hasElem(elem) || this._timerElems.push(elem)
        },
        _hasElem: function (elem) {
            return $.inArray(elem, this._timerElems) > -1
        },
        _removeElem: function (elem) {
            this._timerElems = $.map(this._timerElems, function (value) {
                return value == elem ? null : value
            })
        },
        _updateElems: function () {
            for (var i = this._timerElems.length - 1; i >= 0; i--) this._updateCountdown(this._timerElems[i])
        },
        _optionsChanged: function (elem, inst, options) {
            options.layout && (options.layout = options.layout.replace(/&lt;/g, "<").replace(/&gt;/g, ">")), this._resetExtraLabels(inst.options, options);
            var timezoneChanged = inst.options.timezone != options.timezone;
            $.extend(inst.options, options), this._adjustSettings(elem, inst, null != options.until || null != options.since || timezoneChanged);
            var now = new Date;
            (inst._since && inst._since < now || inst._until && inst._until > now) && this._addElem(elem[0]), this._updateCountdown(elem, inst)
        },
        _updateCountdown: function (elem, inst) {
            if (elem = elem.jquery ? elem : $(elem), inst = inst || this._getInst(elem)) {
                if (elem.html(this._generateHTML(inst)).toggleClass(this._rtlClass, inst.options.isRTL), $.isFunction(inst.options.onTick)) {
                    var periods = "lap" != inst._hold ? inst._periods : this._calculatePeriods(inst, inst._show, inst.options.significant, new Date);
                    1 != inst.options.tickInterval && this.periodsToSeconds(periods) % inst.options.tickInterval != 0 || inst.options.onTick.apply(elem[0], [periods])
                }
                var expired = "pause" != inst._hold && (inst._since ? inst._now.getTime() < inst._since.getTime() : inst._now.getTime() >= inst._until.getTime());
                if (expired && !inst._expiring) {
                    if (inst._expiring = !0, this._hasElem(elem[0]) || inst.options.alwaysExpire) {
                        if (this._removeElem(elem[0]), $.isFunction(inst.options.onExpiry) && inst.options.onExpiry.apply(elem[0], []), inst.options.expiryText) {
                            var layout = inst.options.layout;
                            inst.options.layout = inst.options.expiryText, this._updateCountdown(elem[0], inst), inst.options.layout = layout
                        }
                        inst.options.expiryUrl && (window.location = inst.options.expiryUrl)
                    }
                    inst._expiring = !1
                } else "pause" == inst._hold && this._removeElem(elem[0])
            }
        },
        _resetExtraLabels: function (base, options) {
            for (var n in options) n.match(/[Ll]abels[02-9]|compactLabels1/) && (base[n] = options[n]);
            for (var n in base) n.match(/[Ll]abels[02-9]|compactLabels1/) && "undefined" == typeof options[n] && (base[n] = null)
        },
        _adjustSettings: function (elem, inst, recalc) {
            for (var now, serverOffset = 0, serverEntry = null, i = 0; i < this._serverSyncs.length; i++) if (this._serverSyncs[i][0] == inst.options.serverSync) {
                serverEntry = this._serverSyncs[i][1];
                break
            }
            if (null != serverEntry) serverOffset = inst.options.serverSync ? serverEntry : 0, now = new Date; else {
                var serverResult = $.isFunction(inst.options.serverSync) ? inst.options.serverSync.apply(elem[0], []) : null;
                now = new Date, serverOffset = serverResult ? now.getTime() - serverResult.getTime() : 0, this._serverSyncs.push([inst.options.serverSync, serverOffset])
            }
            var timezone = inst.options.timezone;
            timezone = null == timezone ? -now.getTimezoneOffset() : timezone, (recalc || !recalc && null == inst._until && null == inst._since) && (inst._since = inst.options.since, null != inst._since && (inst._since = this.UTCDate(timezone, this._determineTime(inst._since, null)), inst._since && serverOffset && inst._since.setMilliseconds(inst._since.getMilliseconds() + serverOffset)), inst._until = this.UTCDate(timezone, this._determineTime(inst.options.until, now)), serverOffset && inst._until.setMilliseconds(inst._until.getMilliseconds() + serverOffset)), inst._show = this._determineShow(inst)
        },
        _preDestroy: function (elem, inst) {
            this._removeElem(elem[0]), elem.empty()
        },
        pause: function (elem) {
            this._hold(elem, "pause")
        },
        lap: function (elem) {
            this._hold(elem, "lap")
        },
        resume: function (elem) {
            this._hold(elem, null)
        },
        toggle: function (elem) {
            var inst = $.data(elem, this.name) || {};
            this[inst._hold ? "resume" : "pause"](elem)
        },
        toggleLap: function (elem) {
            var inst = $.data(elem, this.name) || {};
            this[inst._hold ? "resume" : "lap"](elem)
        },
        _hold: function (elem, hold) {
            var inst = $.data(elem, this.name);
            if (inst) {
                if ("pause" == inst._hold && !hold) {
                    inst._periods = inst._savePeriods;
                    var sign = inst._since ? "-" : "+";
                    inst[inst._since ? "_since" : "_until"] = this._determineTime(sign + inst._periods[0] + "y" + sign + inst._periods[1] + "o" + sign + inst._periods[2] + "w" + sign + inst._periods[3] + "d" + sign + inst._periods[4] + "h" + sign + inst._periods[5] + "m" + sign + inst._periods[6] + "s"), this._addElem(elem)
                }
                inst._hold = hold, inst._savePeriods = "pause" == hold ? inst._periods : null, $.data(elem, this.name, inst), this._updateCountdown(elem, inst)
            }
        },
        getTimes: function (elem) {
            var inst = $.data(elem, this.name);
            return inst ? "pause" == inst._hold ? inst._savePeriods : inst._hold ? this._calculatePeriods(inst, inst._show, inst.options.significant, new Date) : inst._periods : null
        },
        _determineTime: function (setting, defaultTime) {
            var self = this, offsetNumeric = function (offset) {
                    var time = new Date;
                    return time.setTime(time.getTime() + 1e3 * offset), time
                }, offsetString = function (offset) {
                    offset = offset.toLowerCase();
                    for (var time = new Date, year = time.getFullYear(), month = time.getMonth(), day = time.getDate(), hour = time.getHours(), minute = time.getMinutes(), second = time.getSeconds(), pattern = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g, matches = pattern.exec(offset); matches;) {
                        switch (matches[2] || "s") {
                            case"s":
                                second += parseInt(matches[1], 10);
                                break;
                            case"m":
                                minute += parseInt(matches[1], 10);
                                break;
                            case"h":
                                hour += parseInt(matches[1], 10);
                                break;
                            case"d":
                                day += parseInt(matches[1], 10);
                                break;
                            case"w":
                                day += 7 * parseInt(matches[1], 10);
                                break;
                            case"o":
                                month += parseInt(matches[1], 10), day = Math.min(day, self._getDaysInMonth(year, month));
                                break;
                            case"y":
                                year += parseInt(matches[1], 10), day = Math.min(day, self._getDaysInMonth(year, month))
                        }
                        matches = pattern.exec(offset)
                    }
                    return new Date(year, month, day, hour, minute, second, 0)
                },
                time = null == setting ? defaultTime : "string" == typeof setting ? offsetString(setting) : "number" == typeof setting ? offsetNumeric(setting) : setting;
            return time && time.setMilliseconds(0), time
        },
        _getDaysInMonth: function (year, month) {
            return 32 - new Date(year, month, 32).getDate()
        },
        _normalLabels: function (num) {
            return num
        },
        _generateHTML: function (inst) {
            var self = this;
            inst._periods = inst._hold ? inst._periods : this._calculatePeriods(inst, inst._show, inst.options.significant, new Date);
            for (var shownNonZero = !1, showCount = 0, sigCount = inst.options.significant, show = $.extend({}, inst._show), period = Y; period <= S; period++) shownNonZero |= "?" == inst._show[period] && inst._periods[period] > 0, show[period] = "?" != inst._show[period] || shownNonZero ? inst._show[period] : null, showCount += show[period] ? 1 : 0, sigCount -= inst._periods[period] > 0 ? 1 : 0;
            for (var showSignificant = [!1, !1, !1, !1, !1, !1, !1], period = S; period >= Y; period--) inst._show[period] && (inst._periods[period] ? showSignificant[period] = !0 : (showSignificant[period] = sigCount > 0, sigCount--));
            var labels = inst.options.compact ? inst.options.compactLabels : inst.options.labels,
                whichLabels = inst.options.whichLabels || this._normalLabels, showCompact = function (period) {
                    var labelsNum = inst.options["compactLabels" + whichLabels(inst._periods[period])];
                    return show[period] ? self._translateDigits(inst, inst._periods[period]) + (labelsNum ? labelsNum[period] : labels[period]) + " " : ""
                }, minDigits = inst.options.padZeroes ? 2 : 1, showFull = function (period) {
                    var labelsNum = inst.options["labels" + whichLabels(inst._periods[period])];
                    return !inst.options.significant && show[period] || inst.options.significant && showSignificant[period] ? '<span class="' + self._sectionClass + '"><span class="' + self._amountClass + '">' + self._minDigits(inst, inst._periods[period], minDigits) + '</span><span class="' + self._periodClass + '">' + (labelsNum ? labelsNum[period] : labels[period]) + "</span></span>" : ""
                };
            return inst.options.layout ? this._buildLayout(inst, show, inst.options.layout, inst.options.compact, inst.options.significant, showSignificant) : (inst.options.compact ? '<span class="' + this._rowClass + " " + this._amountClass + (inst._hold ? " " + this._holdingClass : "") + '">' + showCompact(Y) + showCompact(O) + showCompact(W) + showCompact(D) + (show[H] ? this._minDigits(inst, inst._periods[H], 2) : "") + (show[M] ? (show[H] ? inst.options.timeSeparator : "") + this._minDigits(inst, inst._periods[M], 2) : "") + (show[S] ? (show[H] || show[M] ? inst.options.timeSeparator : "") + this._minDigits(inst, inst._periods[S], 2) : "") : '<span class="' + this._rowClass + " " + this._showClass + (inst.options.significant || showCount) + (inst._hold ? " " + this._holdingClass : "") + '">' + showFull(Y) + showFull(O) + showFull(W) + showFull(D) + showFull(H) + showFull(M) + showFull(S)) + "</span>" + (inst.options.description ? '<span class="' + this._rowClass + " " + this._descrClass + '">' + inst.options.description + "</span>" : "")
        },
        _buildLayout: function (inst, show, layout, compact, significant, showSignificant) {
            for (var labels = inst.options[compact ? "compactLabels" : "labels"], whichLabels = inst.options.whichLabels || this._normalLabels, labelFor = function (index) {
                return (inst.options[(compact ? "compactLabels" : "labels") + whichLabels(inst._periods[index])] || labels)[index]
            }, digit = function (value, position) {
                return inst.options.digits[Math.floor(value / position) % 10]
            }, subs = {
                desc: inst.options.description,
                sep: inst.options.timeSeparator,
                yl: labelFor(Y),
                yn: this._minDigits(inst, inst._periods[Y], 1),
                ynn: this._minDigits(inst, inst._periods[Y], 2),
                ynnn: this._minDigits(inst, inst._periods[Y], 3),
                y1: digit(inst._periods[Y], 1),
                y10: digit(inst._periods[Y], 10),
                y100: digit(inst._periods[Y], 100),
                y1000: digit(inst._periods[Y], 1e3),
                ol: labelFor(O),
                on: this._minDigits(inst, inst._periods[O], 1),
                onn: this._minDigits(inst, inst._periods[O], 2),
                onnn: this._minDigits(inst, inst._periods[O], 3),
                o1: digit(inst._periods[O], 1),
                o10: digit(inst._periods[O], 10),
                o100: digit(inst._periods[O], 100),
                o1000: digit(inst._periods[O], 1e3),
                wl: labelFor(W),
                wn: this._minDigits(inst, inst._periods[W], 1),
                wnn: this._minDigits(inst, inst._periods[W], 2),
                wnnn: this._minDigits(inst, inst._periods[W], 3),
                w1: digit(inst._periods[W], 1),
                w10: digit(inst._periods[W], 10),
                w100: digit(inst._periods[W], 100),
                w1000: digit(inst._periods[W], 1e3),
                dl: labelFor(D),
                dn: this._minDigits(inst, inst._periods[D], 1),
                dnn: this._minDigits(inst, inst._periods[D], 2),
                dnnn: this._minDigits(inst, inst._periods[D], 3),
                d1: digit(inst._periods[D], 1),
                d10: digit(inst._periods[D], 10),
                d100: digit(inst._periods[D], 100),
                d1000: digit(inst._periods[D], 1e3),
                hl: labelFor(H),
                hn: this._minDigits(inst, inst._periods[H], 1),
                hnn: this._minDigits(inst, inst._periods[H], 2),
                hnnn: this._minDigits(inst, inst._periods[H], 3),
                h1: digit(inst._periods[H], 1),
                h10: digit(inst._periods[H], 10),
                h100: digit(inst._periods[H], 100),
                h1000: digit(inst._periods[H], 1e3),
                ml: labelFor(M),
                mn: this._minDigits(inst, inst._periods[M], 1),
                mnn: this._minDigits(inst, inst._periods[M], 2),
                mnnn: this._minDigits(inst, inst._periods[M], 3),
                m1: digit(inst._periods[M], 1),
                m10: digit(inst._periods[M], 10),
                m100: digit(inst._periods[M], 100),
                m1000: digit(inst._periods[M], 1e3),
                sl: labelFor(S),
                sn: this._minDigits(inst, inst._periods[S], 1),
                snn: this._minDigits(inst, inst._periods[S], 2),
                snnn: this._minDigits(inst, inst._periods[S], 3),
                s1: digit(inst._periods[S], 1),
                s10: digit(inst._periods[S], 10),
                s100: digit(inst._periods[S], 100),
                s1000: digit(inst._periods[S], 1e3)
            }, html = layout, i = Y; i <= S; i++) {
                var period = "yowdhms".charAt(i),
                    re = new RegExp("\\{" + period + "<\\}([\\s\\S]*)\\{" + period + ">\\}", "g");
                html = html.replace(re, !significant && show[i] || significant && showSignificant[i] ? "$1" : "")
            }
            return $.each(subs, function (n, v) {
                var re = new RegExp("\\{" + n + "\\}", "g");
                html = html.replace(re, v)
            }), html
        },
        _minDigits: function (inst, value, len) {
            return value = "" + value, value.length >= len ? this._translateDigits(inst, value) : (value = "0000000000" + value, this._translateDigits(inst, value.substr(value.length - len)))
        },
        _translateDigits: function (inst, value) {
            return ("" + value).replace(/[0-9]/g, function (digit) {
                return inst.options.digits[digit]
            })
        },
        _determineShow: function (inst) {
            var format = inst.options.format, show = [];
            return show[Y] = format.match("y") ? "?" : format.match("Y") ? "!" : null, show[O] = format.match("o") ? "?" : format.match("O") ? "!" : null, show[W] = format.match("w") ? "?" : format.match("W") ? "!" : null, show[D] = format.match("d") ? "?" : format.match("D") ? "!" : null, show[H] = format.match("h") ? "?" : format.match("H") ? "!" : null, show[M] = format.match("m") ? "?" : format.match("M") ? "!" : null, show[S] = format.match("s") ? "?" : format.match("S") ? "!" : null, show
        },
        _calculatePeriods: function (inst, show, significant, now) {
            inst._now = now, inst._now.setMilliseconds(0);
            var until = new Date(inst._now.getTime());
            inst._since ? now.getTime() < inst._since.getTime() ? inst._now = now = until : now = inst._since : (until.setTime(inst._until.getTime()), now.getTime() > inst._until.getTime() && (inst._now = now = until));
            var periods = [0, 0, 0, 0, 0, 0, 0];
            if (show[Y] || show[O]) {
                var lastNow = this._getDaysInMonth(now.getFullYear(), now.getMonth()),
                    lastUntil = this._getDaysInMonth(until.getFullYear(), until.getMonth()),
                    sameDay = until.getDate() == now.getDate() || until.getDate() >= Math.min(lastNow, lastUntil) && now.getDate() >= Math.min(lastNow, lastUntil),
                    getSecs = function (date) {
                        return 60 * (60 * date.getHours() + date.getMinutes()) + date.getSeconds()
                    },
                    months = Math.max(0, 12 * (until.getFullYear() - now.getFullYear()) + until.getMonth() - now.getMonth() + (until.getDate() < now.getDate() && !sameDay || sameDay && getSecs(until) < getSecs(now) ? -1 : 0));
                periods[Y] = show[Y] ? Math.floor(months / 12) : 0, periods[O] = show[O] ? months - 12 * periods[Y] : 0, now = new Date(now.getTime());
                var wasLastDay = now.getDate() == lastNow,
                    lastDay = this._getDaysInMonth(now.getFullYear() + periods[Y], now.getMonth() + periods[O]);
                now.getDate() > lastDay && now.setDate(lastDay), now.setFullYear(now.getFullYear() + periods[Y]), now.setMonth(now.getMonth() + periods[O]), wasLastDay && now.setDate(lastDay)
            }
            var diff = Math.floor((until.getTime() - now.getTime()) / 1e3), extractPeriod = function (period, numSecs) {
                periods[period] = show[period] ? Math.floor(diff / numSecs) : 0, diff -= periods[period] * numSecs
            };
            if (extractPeriod(W, 604800), extractPeriod(D, 86400), extractPeriod(H, 3600), extractPeriod(M, 60), extractPeriod(S, 1), diff > 0 && !inst._since) for (var multiplier = [1, 12, 4.3482, 7, 24, 60, 60], lastShown = S, max = 1, period = S; period >= Y; period--) show[period] && (periods[lastShown] >= max && (periods[lastShown] = 0, diff = 1), diff > 0 && (periods[period]++, diff = 0, lastShown = period, max = 1)), max *= multiplier[period];
            if (significant) for (var period = Y; period <= S; period++) significant && periods[period] ? significant-- : significant || (periods[period] = 0);
            return periods
        }
    })
}(jQuery), function ($) {
    $.fn.appendix = function (options) {
        if (0 !== this.length) {
            var defaults = {headerTag: 3, headerText: "Appendicies:", appendTo: "body"};
            options = $.extend({}, defaults, options);
            var appendixDiv = $("<div/>", {id: "appendices"});
            appendixDiv.append("<h" + options.headerTag + ">" + options.headerText + "</h" + options.headerTag + ">"), appendixDiv.append("<hr />");
            var appendixList = $("<ol/>");
            this.each(function (index) {
                index += 1;
                var span = $(this), listItem = $("<li/>");
                listItem.html(span.html()), listItem.prepend('<a name="appendix_' + index + '" />'), listItem.appendTo(appendixList);
                var link = $("<a/>", {href: "#appendix_" + index}).text(index);
                span.text("").addClass("active").append(link)
            }), appendixList.appendTo(appendixDiv), appendixDiv.appendTo(options.appendTo)
        }
    }
}(jQuery), $(".appendix").appendix({appendTo: "#content"}), jQuery.cookie = function (key, value, options) {
    if (arguments.length > 1 && "[object Object]" !== String(value)) {
        if (options = jQuery.extend({}, options), null !== value && void 0 !== value || (options.expires = -1), "number" == typeof options.expires) {
            var days = options.expires, t = options.expires = new Date;
            t.setDate(t.getDate() + days)
        }
        return value = String(value), document.cookie = [encodeURIComponent(key), "=", options.raw ? value : encodeURIComponent(value), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : ""].join("")
    }
    options = value || {};
    var result, decode = options.raw ? function (s) {
        return s
    } : decodeURIComponent;
    return (result = new RegExp("(?:^|; )" + encodeURIComponent(key) + "=([^;]*)").exec(document.cookie)) ? decode(result[1]) : null
}, function ($) {
    $.fn.photobanner = function (options) {
        if (this.length > 1) return this.each(function () {
            $(this).photobanner(options)
        }), this;
        var currentDesc, defaultOptions = {
            autoTransition: !1,
            autoTransitionInterval: 5,
            transitionAction: "focus click",
            transitionMethod: "fade",
            transitionDuration: 1e3,
            minHeight: 250,
            truncateTitles: !0,
            useTabAnchors: !1,
            tabAnchorPrefix: "panel_",
            startIndex: 0
        }, $this = $(this), self = this, thisOptions = null, transitionInterval = null, linkTexts = [];
        this.init = function (options) {
            thisOptions = defaultOptions, options && (options.usetabanchors && !options.useTabAnchors ? options.useTabAnchors = options.usetabanchors : $this.attr("data-useTabAnchors") && !options.useTabAnchors && (options.useTabAnchors = $this.attr("data-useTabAnchors")), thisOptions = $.extend({}, defaultOptions, $this.data(), options)), $this.addClass("js");
            var startIndex = thisOptions.startIndex;
            thisOptions.useTabAnchors && 0 === window.location.hash.indexOf("#" + thisOptions.tabAnchorPrefix) && (startIndex = parseInt(window.location.hash.slice(thisOptions.tabAnchorPrefix.length + 1), 10));
            var smallestImageHeight = null, backgroundImages = $this.find(".section img");
            $.each(backgroundImages, function (index, value) {
                var _this = $(this);
                $("<img/>").load(function () {
                    if ((null === smallestImageHeight || this.height < smallestImageHeight && this.height > thisOptions.minHeight) && (smallestImageHeight = this.height), index === backgroundImages.length - 1) {
                        smallestImageHeight < thisOptions.minHeight && (smallestImageHeight = thisOptions.minHeight);
                        var titleH1 = $this.children("h1");
                        titleH1.length > 0 && (smallestImageHeight += titleH1.height()), $this.css("height", smallestImageHeight + "px")
                    }
                }).attr("src", _this.attr("src"))
            });
            var $sections = $this.find(".section");
            startIndex > $sections.length - 1 && (startIndex = 0), $sections.wrapInner('<div class="info" />').not(function (index) {
                return index === startIndex
            }).hide(), $this.find(".section.no-display .info").hide(), $.each($this.find(".section img"), function (index, value) {
                var _this = $(this), parentSections = _this.parents(".sections .section");
                parentSections.each(function () {
                    var section = $(this);
                    section.css("background", "url(" + encodeURI(_this.attr("src")) + ") no-repeat");
                    var position = "right";
                    section.hasClass("right") && (position = "left"), position += " top", section.css("background-position", position)
                }), _this.hide()
            }), $this.find("div .shortdesc").each(function (index, element) {
                var $element = $(element);
                $element.parent("li").children("h3").clone().prependTo($element)
            }).hide(), $this.find(".links .link > h3 > a").each(function (index, element) {
                linkTexts.push($(element).text())
            }), thisOptions.truncateTitles && this.truncateTitles(), $this.find(".links .link > h3 > a").mouseover(function () {
                currentDesc && (currentDesc.hide(), currentDesc = null), currentDesc = $(this).closest("li").children(".shortdesc").show();
                var tabs = $this.find(".tabs"), hasTabs = 0 !== tabs.length, title = $this.find("h1"),
                    hasTitle = 0 !== title.length, sidebarOnLeft = 0 === $(this).parents(".right").length,
                    descWidth = $this.width() - currentDesc.closest(".info").outerWidth(!0) - (currentDesc.outerWidth(!0) - currentDesc.width());
                currentDesc.width(descWidth);
                var descBottom = 0;
                hasTabs && (descBottom = tabs.height(), sidebarOnLeft && (descBottom += 1)), hasTitle && (descBottom += title.outerHeight(!0), $.browser.msie && 8 === parseInt($.browser.version.slice(0, 1), 10) && (descBottom -= 1)), currentDesc.css("bottom", descBottom)
            }), $this.mouseleave(function () {
                currentDesc && (currentDesc.hide(), currentDesc = null)
            });
            var sectionCount = $this.find(".section .title").length;
            if (sectionCount > 1) {
                $this.append('<ul class="tabs"></ul>'), $this.find(".section .title").clone().appendTo($this.find(".tabs")).wrap("<li/>"), $.each($this.find(".tabs li"), function (i) {
                    $(this).attr("tabIndex", 10 + i)
                });
                var tabCount = $this.find(".tabs li").length, tabWidth = 100 / tabCount;
                tabWidth * tabCount > 100 && (tabWidth = 99.99 / tabCount), $this.find(".tabs li").css("width", tabWidth + "%"), $this.find(".tabs li").eq(startIndex).addClass("active"), $this.find(".tabs li").bind(thisOptions.transitionAction, function () {
                    var nextIndex = $(this).index();
                    nextIndex !== $this.find(".tabs li.active").index() && self.transition(nextIndex)
                }), self.setTabHeight(), $(document).keyup(function () {
                    $(".tabs li:focus").length > 0 && $(".tabs li:focus").triggerHandler(thisOptions.transitionAction)
                }), thisOptions.autoTransition && ($this.mouseenter(function () {
                    self.pauseAutoTransitions()
                }), $this.mouseleave(function () {
                    self.startAutoTransitions()
                }), this.startAutoTransitions())
            }
            return this
        }, this.transition = function (nextTabIndex) {
            var activeTab = $this.find(".tabs li.active"), activeTabIndex = activeTab.index();
            "undefined" == typeof nextTabIndex && (nextTabIndex = activeTabIndex + 1 < $this.find(".tabs li").length ? activeTabIndex + 1 : 0);
            var nextTab = $this.find(".tabs li").eq(nextTabIndex);
            thisOptions.useTabAnchors && (window.location.hash = "#" + thisOptions.tabAnchorPrefix + nextTabIndex);
            var activeSection = $this.find(".section").eq(activeTabIndex),
                nextSection = $this.find(".section").eq(nextTabIndex);
            "fade" === thisOptions.transitionMethod ? activeSection.fadeOut(thisOptions.transitionDuration) : activeSection.hide(), currentDesc && currentDesc.hide(), activeTab.removeClass("active"), nextTab.addClass("active"), "fade" === thisOptions.transitionMethod ? nextSection.fadeTo(1, .01, function () {
                thisOptions.truncateTitles && self.truncateTitles(), nextSection.fadeTo(thisOptions.transitionDuration, 1, function () {
                    $.browser.msie && this.style.removeAttribute("filter")
                })
            }) : (nextSection.show(), thisOptions.truncateTitles && this.truncateTitles())
        }, this.startAutoTransitions = function () {
            transitionInterval = setInterval(function () {
                self.transition()
            }, 1e3 * thisOptions.autoTransitionInterval)
        }, this.pauseAutoTransitions = function () {
            clearInterval(transitionInterval)
        }, this.truncateTitles = function () {
            var infoWidth = $this.find(".info").not(":hidden").width();
            $this.find(".links .link > h3 > a").each(function (index, element) {
                for (var $element = $(element), text = linkTexts[index]; text.length > 0 && $element.outerWidth(!0) >= infoWidth;) text = text.substr(0, text.length - 1), $element.text(text + "...")
            })
        }, this.setTabHeight = function () {
            var tabBar = $this.children(".tabs");
            tabBar.find("li").height("auto"), tabBar.find("li").height(tabBar.height())
        };
        var resizeTimer;
        return $(window).resize(function () {
            clearTimeout(resizeTimer), resizeTimer = setTimeout(function () {
                thisOptions.truncateTitles && self.truncateTitles(), self.setTabHeight()
            }, 30)
        }), this.init(options)
    }
}(jQuery), function ($) {
    var methods = {
        init: function (options) {
            return options = $.extend({
                width: 640,
                height: 390,
                movie: "",
                type: "application/x-shockwave-flash",
                allowFullScreen: "true",
                allowScriptAccess: "always"
            }, options), this.each(function () {
                var $this = $(this), data = $(window).data("videoplayer");
                if (!data) {
                    var container = $("<div></div>").hide().attr("id", "mask").bind("click", methods.hide),
                        overlay = $("<div></div>").attr("class", "overlay"),
                        player = $("<div></div>").attr("id", "videoplayer").attr("role", "video-player"),
                        toolbox = $("<div></div>").attr("class", "toolbox").appendTo(player);
                    $('<a href="#">Close</a>').attr("class", "close").bind("click", methods.hide).appendTo(toolbox), $("<h3></h3>").attr("class", "title").attr("style", "width: " + (options.width - 40) + "px").appendTo(toolbox), player.append(toolbox);
                    var obj = ($("<div><span>Play</span><span>Pause</span></div>").attr("class", "controls"), '<iframe type="text/html" src="" width="' + options.width + '" height="' + options.height + '" frameborder="0"></iframe>');
                    player.append(obj), container.append(overlay), container.append(player), container.appendTo(document.body), $(window).data("videoplayer", {
                        target: $this,
                        player: container,
                        options: options
                    })
                }
                $this.bind("click", methods.show), $(document).keyup(function (e) {
                    13 === e.keyCode && $(".video:focus").length > 0 && $(".video:focus").triggerHandler("click"), 27 === e.keyCode && $("#videoplayer .close").triggerHandler("click")
                })
            })
        }, show: function (e) {
            e.preventDefault();
            var $this = $(this), data = $(window).data("videoplayer"),
                id = ($this.find("a.video-url").attr("href"), $this.find("a.video-url").attr("data-video")),
                title = $this.find('h3[title!=""]').html(), iframe = "//www.youtube.com/embed/" + id;
            id.indexOf("?") === -1 ? iframe += "?rel=0" : id.indexOf("rel=") === -1 && (iframe += "&rel=0"), data.player.find("iframe").attr("src", iframe), data.player.find("h3.title").html(title), $(data.player).find("div.overlay").css({height: $(document).height()}), $(data.player).find("div#videoplayer").css({
                position: "absolute",
                left: ($(document).width() - data.options.width) / 2,
                width: $(data.player.find("iframe")).attr("width")
            }), "fixed" === $("div#mask").css("position") ? $(data.player).find("div#videoplayer").css({top: (screen.height - data.options.height) / 2 - 150}) : $(data.player).find("div#videoplayer").css({top: $(document).scrollTop() + (screen.height - data.options.height) / 2 - 50}), $(data.player).find("div#videoplayer").fadeIn("slow"), $(data.player).fadeIn("slow"), e.preventDefault()
        }, hide: function (e) {
            $($(window).data("videoplayer").player).fadeOut(function () {
                $(window).data("videoplayer").player.find("iframe").attr("src", "")
            }), e.preventDefault()
        }, destroy: function () {
            return this.each(function () {
                var $this = $(this), data = $this.data("videoplayer");
                $(window).unbind(".videoplayer"), data.videoplayer.remove(), $this.removeData("videoplayer")
            })
        }
    };
    $.fn.videoplayer = function (method, opts) {
        return methods[method] ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof method && method ? void 0 : methods.init.apply(this, arguments)
    }, $(function () {
        $("div.video").videoplayer()
    })
}(jQuery), function ($) {
    $("table.expand").each(function (index, element) {
        var rows = $(element).find("tbody tr"), cols = $(element).find("tbody tr td").length;
        rows.length > 5 && (rows.slice(5).hide(), $('<tr><td class="more" colspan="' + cols + '"><a>show more...</a></td><tr>').insertAfter($(element).find("tbody tr:last")), $(element).find("tbody td.more").live("click", function () {
            $(element).find("tbody tr").show("fast"), $(this).hide()
        }))
    })
}(jQuery), function ($) {
    $.fn.googlemap = function (options) {
        if (this.length > 1) return this.each(function () {
            $(this).googlemap(options)
        }), this;
        var defaults = {};
        $(this);
        return options = $.extend(!0, defaults, options, $(this).data()), this.init = function (options) {
            if ("undefined" != typeof google) {
                var osmMapType = new google.maps.ImageMapType({
                    getTileUrl: function (coord, zoom) {
                        return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png"
                    },
                    tileSize: new google.maps.Size(256, 256),
                    isPng: !0,
                    alt: "OpenStreetMap layer",
                    name: "OpenStreetMap",
                    maxZoom: 18
                }), ocmMapType = new google.maps.ImageMapType({
                    getTileUrl: function (coord, zoom) {
                        return "http://a.tile.opencyclemap.org/cycle/" + zoom + "/" + coord.x + "/" + coord.y + ".png"
                    },
                    tileSize: new google.maps.Size(256, 256),
                    isPng: !0,
                    alt: "OpenCycleMap layer",
                    name: "OpenCycleMap",
                    maxZoom: 18
                });
                options.center = new google.maps.LatLng(options.latitude, options.longitude), "OCM" !== options.mapTypeId && "OSM" !== options.mapTypeId && (options.mapTypeId = google.maps.MapTypeId[options.mapTypeId]);
                var settings = {
                    zoom: options.zoom,
                    center: options.center,
                    mapTypeId: options.mapTypeId,
                    mapTypeControlOptions: {
                        mapTypeIds: ["OSM", "OCM", google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.ROADMAP],
                        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
                    },
                    navigationControlOptions: {style: google.maps.NavigationControlStyle.ZOOM_PAN}
                }, map = new google.maps.Map(document.getElementById("map" + options.id), settings);
                void 0 !== typeof window.maps && window.maps || (window.maps = {}), window.maps["map" + options.id] = {}, window.maps["map" + options.id].map = map, window.maps["map" + options.id].markers = {}, window.maps["map" + options.id].info = {}, map.mapTypes.set("OSM", osmMapType), map.mapTypes.set("OCM", ocmMapType), $.each($("#map" + options.id + "_markers").find("li.marker"), function (index, value) {
                    var data = $(this).data(), title = $(this).find("span.title").html(),
                        cleanname = title.toLowerCase().replace(/[^a-z]/g, "-"),
                        latlng = ($(".sitebox-" + cleanname).css("background-color"), new google.maps.LatLng(data.latitude, data.longitude)),
                        marker = new google.maps.Marker({position: latlng, map: map, title: title}),
                        content = "<h4>" + $(this).find("span.title").html() + "</h4>" + (data.image ? '<img src="' + data.image + '" height="100px">' : "") + ($(this).find("span.info").html() || ""),
                        info = new google.maps.InfoWindow({content: content});
                    google.maps.event.addListener(marker, "click", function () {
                        info.open(map, marker)
                    }), window.maps["map" + options.id].markers[title] = marker, window.maps["map" + options.id].info[title] = info
                })
            }
        }, this.init(options)
    }
}(jQuery), function ($) {
    $.extend({
        tablesorter: new function () {
            function benchmark(s, d) {
                log(s + "," + ((new Date).getTime() - d.getTime()) + "ms")
            }

            function log(s) {
                "undefined" != typeof console && "undefined" != typeof console.debug ? console.log(s) : alert(s)
            }

            function buildParserCache(table, $headers) {
                if (table.config.debug) var parsersDebug = "";
                if (0 != table.tBodies.length) {
                    var rows = table.tBodies[0].rows;
                    if (rows[0]) for (var list = [], cells = rows[0].cells, l = cells.length, i = 0; i < l; i++) {
                        var p = !1;
                        $.metadata && $($headers[i]).metadata() && $($headers[i]).metadata().sorter ? p = getParserById($($headers[i]).metadata().sorter) : table.config.headers[i] && table.config.headers[i].sorter && (p = getParserById(table.config.headers[i].sorter)), p || (p = detectParserForColumn(table, rows, -1, i)), table.config.debug && (parsersDebug += "column:" + i + " parser:" + p.id + "\n"), list.push(p)
                    }
                    return table.config.debug && log(parsersDebug), list
                }
            }

            function detectParserForColumn(table, rows, rowIndex, cellIndex) {
                for (var l = parsers.length, node = !1, nodeValue = !1, keepLooking = !0; "" == nodeValue && keepLooking;) rowIndex++, rows[rowIndex] ? (node = getNodeFromRowAndCellIndex(rows, rowIndex, cellIndex), nodeValue = trimAndGetNodeText(table.config, node), table.config.debug && log("Checking if value was empty on row:" + rowIndex)) : keepLooking = !1;
                for (var i = 1; i < l; i++) if (parsers[i].is(nodeValue, table, node)) return parsers[i];
                return parsers[0]
            }

            function getNodeFromRowAndCellIndex(rows, rowIndex, cellIndex) {
                return rows[rowIndex].cells[cellIndex]
            }

            function trimAndGetNodeText(config, node) {
                return $.trim(getElementText(config, node))
            }

            function getParserById(name) {
                for (var l = parsers.length, i = 0; i < l; i++) if (parsers[i].id.toLowerCase() == name.toLowerCase()) return parsers[i];
                return !1
            }

            function buildCache(table) {
                if (table.config.debug) var cacheTime = new Date;
                for (var totalRows = table.tBodies[0] && table.tBodies[0].rows.length || 0, totalCells = table.tBodies[0].rows[0] && table.tBodies[0].rows[0].cells.length || 0, parsers = table.config.parsers, cache = {
                    row: [],
                    normalized: []
                }, i = 0; i < totalRows; ++i) {
                    var c = $(table.tBodies[0].rows[i]), cols = [];
                    if (c.hasClass(table.config.cssChildRow)) cache.row[cache.row.length - 1] = cache.row[cache.row.length - 1].add(c); else {
                        cache.row.push(c);
                        for (var j = 0; j < totalCells; ++j) cols.push(parsers[j].format(getElementText(table.config, c[0].cells[j]), table, c[0].cells[j]));
                        cols.push(cache.normalized.length), cache.normalized.push(cols), cols = null
                    }
                }
                return table.config.debug && benchmark("Building cache for " + totalRows + " rows:", cacheTime), cache
            }

            function getElementText(config, node) {
                var text = "";
                return node ? (config.supportsTextContent || (config.supportsTextContent = node.textContent || !1), text = "simple" == config.textExtraction ? config.supportsTextContent ? node.textContent : node.childNodes[0] && node.childNodes[0].hasChildNodes() ? node.childNodes[0].innerHTML : node.innerHTML : "function" == typeof config.textExtraction ? config.textExtraction(node) : $(node).text()) : ""
            }

            function appendToTable(table, cache) {
                if (table.config.debug) var appendTime = new Date;
                for (var c = cache, r = c.row, n = c.normalized, totalRows = n.length, checkCell = n[0].length - 1, tableBody = $(table.tBodies[0]), rows = [], i = 0; i < totalRows; i++) {
                    var pos = n[i][checkCell];
                    if (rows.push(r[pos]), !table.config.appender) for (var l = r[pos].length, j = 0; j < l; j++) tableBody[0].appendChild(r[pos][j])
                }
                table.config.appender && table.config.appender(table, rows), rows = null, table.config.debug && benchmark("Rebuilt table:", appendTime), applyWidget(table), setTimeout(function () {
                    $(table).trigger("sortEnd")
                }, 0)
            }

            function buildHeaders(table) {
                if (table.config.debug) var time = new Date;
                var header_index = (!!$.metadata, computeTableHeaderCellIndexes(table));
                return $tableHeaders = $(table.config.selectorHeaders, table).each(function (index) {
                    if (this.column = header_index[this.parentNode.rowIndex + "-" + this.cellIndex], this.order = formatSortingOrder(table.config.sortInitialOrder), this.count = this.order, (checkHeaderMetadata(this) || checkHeaderOptions(table, index)) && (this.sortDisabled = !0), checkHeaderOptionsSortingLocked(table, index) && (this.order = this.lockedOrder = checkHeaderOptionsSortingLocked(table, index)), !this.sortDisabled) {
                        var $th = $(this).addClass(table.config.cssHeader);
                        table.config.onRenderHeader && table.config.onRenderHeader.apply($th)
                    }
                    table.config.headerList[index] = this
                }), table.config.debug && (benchmark("Built headers:", time), log($tableHeaders)), $tableHeaders
            }

            function computeTableHeaderCellIndexes(t) {
                for (var matrix = [], lookup = {}, thead = t.getElementsByTagName("THEAD")[0], trs = thead.getElementsByTagName("TR"), i = 0; i < trs.length; i++) for (var cells = trs[i].cells, j = 0; j < cells.length; j++) {
                    var firstAvailCol, c = cells[j], rowIndex = c.parentNode.rowIndex,
                        cellId = rowIndex + "-" + c.cellIndex, rowSpan = c.rowSpan || 1, colSpan = c.colSpan || 1;
                    "undefined" == typeof matrix[rowIndex] && (matrix[rowIndex] = []);
                    for (var k = 0; k < matrix[rowIndex].length + 1; k++) if ("undefined" == typeof matrix[rowIndex][k]) {
                        firstAvailCol = k;
                        break
                    }
                    lookup[cellId] = firstAvailCol;
                    for (var k = rowIndex; k < rowIndex + rowSpan; k++) {
                        "undefined" == typeof matrix[k] && (matrix[k] = []);
                        for (var matrixrow = matrix[k], l = firstAvailCol; l < firstAvailCol + colSpan; l++) matrixrow[l] = "x"
                    }
                }
                return lookup
            }

            function checkCellColSpan(table, rows, row) {
                for (var arr = [], r = table.tHead.rows, c = r[row].cells, i = 0; i < c.length; i++) {
                    var cell = c[i];
                    cell.colSpan > 1 ? arr = arr.concat(checkCellColSpan(table, headerArr, row++)) : (1 == table.tHead.length || cell.rowSpan > 1 || !r[row + 1]) && arr.push(cell)
                }
                return arr
            }

            function checkHeaderMetadata(cell) {
                return !(!$.metadata || $(cell).metadata().sorter !== !1)
            }

            function checkHeaderOptions(table, i) {
                return !(!table.config.headers[i] || table.config.headers[i].sorter !== !1)
            }

            function checkHeaderOptionsSortingLocked(table, i) {
                return !(!table.config.headers[i] || !table.config.headers[i].lockedOrder) && table.config.headers[i].lockedOrder
            }

            function applyWidget(table) {
                for (var c = table.config.widgets, l = c.length, i = 0; i < l; i++) getWidgetById(c[i]).format(table)
            }

            function getWidgetById(name) {
                for (var l = widgets.length, i = 0; i < l; i++) if (widgets[i].id.toLowerCase() == name.toLowerCase()) return widgets[i]
            }

            function formatSortingOrder(v) {
                return "Number" != typeof v ? "desc" == v.toLowerCase() ? 1 : 0 : 1 == v ? 1 : 0
            }

            function isValueInArray(v, a) {
                for (var l = a.length, i = 0; i < l; i++) if (a[i][0] == v) return !0;
                return !1
            }

            function setHeadersCss(table, $headers, list, css) {
                $headers.removeClass(css[0]).removeClass(css[1]);
                var h = [];
                $headers.each(function (offset) {
                    this.sortDisabled || (h[this.column] = $(this))
                });
                for (var l = list.length, i = 0; i < l; i++) h[list[i][0]].addClass(css[list[i][1]])
            }

            function fixColumnWidth(table, $headers) {
                var c = table.config;
                if (c.widthFixed) {
                    var colgroup = $("<colgroup>");
                    $("tr:first td", table.tBodies[0]).each(function () {
                        colgroup.append($("<col>").css("width", $(this).width()))
                    }), $(table).prepend(colgroup)
                }
            }

            function updateHeaderSortCount(table, sortList) {
                for (var c = table.config, l = sortList.length, i = 0; i < l; i++) {
                    var s = sortList[i], o = c.headerList[s[0]];
                    o.count = s[1], o.count++
                }
            }

            function multisort(table, sortList, cache) {
                if (table.config.debug) var sortTime = new Date;
                for (var dynamicExp = "var sortWrapper = function(a,b) {", l = sortList.length, i = 0; i < l; i++) {
                    var c = sortList[i][0], order = sortList[i][1],
                        s = "text" == table.config.parsers[c].type ? 0 == order ? makeSortFunction("text", "asc", c) : makeSortFunction("text", "desc", c) : 0 == order ? makeSortFunction("numeric", "asc", c) : makeSortFunction("numeric", "desc", c),
                        e = "e" + i;
                    dynamicExp += "var " + e + " = " + s, dynamicExp += "if(" + e + ") { return " + e + "; } ", dynamicExp += "else { "
                }
                var orgOrderCol = cache.normalized[0].length - 1;
                dynamicExp += "return a[" + orgOrderCol + "]-b[" + orgOrderCol + "];";
                for (var i = 0; i < l; i++) dynamicExp += "}; ";
                return dynamicExp += "return 0; ", dynamicExp += "}; ", table.config.debug && benchmark("Evaling expression:" + dynamicExp, new Date), eval(dynamicExp), cache.normalized.sort(sortWrapper), table.config.debug && benchmark("Sorting on " + sortList.toString() + " and dir " + order + " time:", sortTime), cache
            }

            function makeSortFunction(type, direction, index) {
                var a = "a[" + index + "]", b = "b[" + index + "]";
                return "text" == type && "asc" == direction ? "(" + a + " == " + b + " ? 0 : (" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : (" + a + " < " + b + ") ? -1 : 1 )));" : "text" == type && "desc" == direction ? "(" + a + " == " + b + " ? 0 : (" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : (" + b + " < " + a + ") ? -1 : 1 )));" : "numeric" == type && "asc" == direction ? "(" + a + " === null && " + b + " === null) ? 0 :(" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : " + a + " - " + b + "));" : "numeric" == type && "desc" == direction ? "(" + a + " === null && " + b + " === null) ? 0 :(" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : " + b + " - " + a + "));" : void 0
            }

            function makeSortText(i) {
                return "((a[" + i + "] < b[" + i + "]) ? -1 : ((a[" + i + "] > b[" + i + "]) ? 1 : 0));"
            }

            function makeSortTextDesc(i) {
                return "((b[" + i + "] < a[" + i + "]) ? -1 : ((b[" + i + "] > a[" + i + "]) ? 1 : 0));"
            }

            function makeSortNumeric(i) {
                return "a[" + i + "]-b[" + i + "];"
            }

            function makeSortNumericDesc(i) {
                return "b[" + i + "]-a[" + i + "];"
            }

            function sortText(a, b) {
                return table.config.sortLocaleCompare ? a.localeCompare(b) : a < b ? -1 : a > b ? 1 : 0
            }

            function sortTextDesc(a, b) {
                return table.config.sortLocaleCompare ? b.localeCompare(a) : b < a ? -1 : b > a ? 1 : 0
            }

            function sortNumeric(a, b) {
                return a - b
            }

            function sortNumericDesc(a, b) {
                return b - a
            }

            function getCachedSortType(parsers, i) {
                return parsers[i].type
            }

            var parsers = [], widgets = [];
            this.defaults = {
                cssHeader: "header",
                cssAsc: "headerSortUp",
                cssDesc: "headerSortDown",
                cssChildRow: "expand-child",
                sortInitialOrder: "asc",
                sortMultiSortKey: "shiftKey",
                sortForce: null,
                sortAppend: null,
                sortLocaleCompare: !0,
                textExtraction: "simple",
                parsers: {},
                widgets: [],
                widgetZebra: {css: ["even", "odd"]},
                headers: {},
                widthFixed: !1,
                cancelSelection: !0,
                sortList: [],
                headerList: [],
                dateFormat: "us",
                decimal: "/.|,/g",
                onRenderHeader: null,
                selectorHeaders: "thead th",
                debug: !1
            }, this.benchmark = benchmark, this.construct = function (settings) {
                return this.each(function () {
                    if (this.tHead && this.tBodies) {
                        var $this, $headers, cache, config;
                        this.config = {}, config = $.extend(this.config, $.tablesorter.defaults, settings), $this = $(this), $.data(this, "tablesorter", config), $headers = buildHeaders(this), this.config.parsers = buildParserCache(this, $headers), cache = buildCache(this);
                        var sortCSS = [config.cssDesc, config.cssAsc];
                        fixColumnWidth(this), $headers.click(function (e) {
                            var totalRows = $this[0].tBodies[0] && $this[0].tBodies[0].rows.length || 0;
                            if (!this.sortDisabled && totalRows > 0) {
                                $this.trigger("sortStart");
                                var i = ($(this), this.column);
                                if (this.order = this.count++ % 2, this.lockedOrder && (this.order = this.lockedOrder), e[config.sortMultiSortKey]) if (isValueInArray(i, config.sortList)) for (var j = 0; j < config.sortList.length; j++) {
                                    var s = config.sortList[j], o = config.headerList[s[0]];
                                    s[0] == i && (o.count = s[1], o.count++, s[1] = o.count % 2)
                                } else config.sortList.push([i, this.order]); else {
                                    if (config.sortList = [], null != config.sortForce) for (var a = config.sortForce, j = 0; j < a.length; j++) a[j][0] != i && config.sortList.push(a[j]);
                                    config.sortList.push([i, this.order])
                                }
                                return setTimeout(function () {
                                    setHeadersCss($this[0], $headers, config.sortList, sortCSS), appendToTable($this[0], multisort($this[0], config.sortList, cache))
                                }, 1), !1
                            }
                        }).mousedown(function () {
                            if (config.cancelSelection) return this.onselectstart = function () {
                                return !1
                            }, !1
                        }), $this.bind("update", function () {
                            var me = this;
                            setTimeout(function () {
                                me.config.parsers = buildParserCache(me, $headers), cache = buildCache(me)
                            }, 1)
                        }).bind("updateCell", function (e, cell) {
                            var config = this.config, pos = [cell.parentNode.rowIndex - 1, cell.cellIndex];
                            cache.normalized[pos[0]][pos[1]] = config.parsers[pos[1]].format(getElementText(config, cell), cell)
                        }).bind("sorton", function (e, list) {
                            $(this).trigger("sortStart"), config.sortList = list;
                            var sortList = config.sortList;
                            updateHeaderSortCount(this, sortList), setHeadersCss(this, $headers, sortList, sortCSS), appendToTable(this, multisort(this, sortList, cache))
                        }).bind("appendCache", function () {
                            appendToTable(this, cache)
                        }).bind("applyWidgetId", function (e, id) {
                            getWidgetById(id).format(this)
                        }).bind("applyWidgets", function () {
                            applyWidget(this)
                        }), $.metadata && $(this).metadata() && $(this).metadata().sortlist && (config.sortList = $(this).metadata().sortlist), config.sortList.length > 0 && $this.trigger("sorton", [config.sortList]), applyWidget(this)
                    }
                })
            }, this.addParser = function (parser) {
                for (var l = parsers.length, a = !0, i = 0; i < l; i++) parsers[i].id.toLowerCase() == parser.id.toLowerCase() && (a = !1);
                a && parsers.push(parser)
            }, this.addWidget = function (widget) {
                widgets.push(widget)
            }, this.formatFloat = function (s) {
                var i = parseFloat(s);
                return isNaN(i) ? 0 : i
            }, this.formatInt = function (s) {
                var i = parseInt(s);
                return isNaN(i) ? 0 : i
            }, this.isDigit = function (s, config) {
                return /^[-+]?\d*$/.test($.trim(s.replace(/[,.']/g, "")))
            }, this.clearTableBody = function (table) {
                function empty() {
                    for (; this.firstChild;) this.removeChild(this.firstChild)
                }

                $.browser.msie ? empty.apply(table.tBodies[0]) : table.tBodies[0].innerHTML = ""
            }
        }
    }), $.fn.extend({tablesorter: $.tablesorter.construct});
    var ts = $.tablesorter;
    ts.addParser({
        id: "text", is: function (s) {
            return !0
        }, format: function (s) {
            return $.trim(s.toLocaleLowerCase())
        }, type: "text"
    }), ts.addParser({
        id: "digit", is: function (s, table) {
            var c = table.config;
            return $.tablesorter.isDigit(s, c)
        }, format: function (s) {
            return $.tablesorter.formatFloat(s)
        }, type: "numeric"
    }), ts.addParser({
        id: "currency", is: function (s) {
            return /^[拢$鈧�?.]/.test(s)
        }, format: function (s) {
            return $.tablesorter.formatFloat(s.replace(new RegExp(/[拢$鈧琞/g),""))},type:"numeric"}),ts.addParser({id:"ipAddress",is:function(s){return/^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test(s))))
        }, format: function (s) {
            for (var a = s.split("."), r = "", l = a.length, i = 0; i < l; i++) {
                var item = a[i];
                r += 2 == item.length ? "0" + item : item
            }
            return $.tablesorter.formatFloat(r)
        }, type: "numeric"
    }), ts.addParser({
        id: "url", is: function (s) {
            return /^(https?|ftp|file):\/\/$/.test(s)
        }, format: function (s) {
            return jQuery.trim(s.replace(new RegExp(/(https?|ftp|file):\/\//), ""))
        }, type: "text"
    }), ts.addParser({
        id: "isoDate", is: function (s) {
            return /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(s)
        }, format: function (s) {
            return $.tablesorter.formatFloat("" != s ? new Date(s.replace(new RegExp(/-/g), "/")).getTime() : "0")
        }, type: "numeric"
    }), ts.addParser({
        id: "percent", is: function (s) {
            return /\%$/.test($.trim(s))
        }, format: function (s) {
            return $.tablesorter.formatFloat(s.replace(new RegExp(/%/g), ""))
        }, type: "numeric"
    }), ts.addParser({
        id: "usLongDate", is: function (s) {
            return s.match(new RegExp(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/))
        }, format: function (s) {
            return $.tablesorter.formatFloat(new Date(s).getTime())
        }, type: "numeric"
    }), ts.addParser({
        id: "shortDate", is: function (s) {
            return /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(s)
        }, format: function (s, table) {
            var c = table.config;
            return s = s.replace(/\-/g, "/"), "us" == c.dateFormat ? s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$1/$2") : "uk" == c.dateFormat ? s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$2/$1") : "dd/mm/yy" != c.dateFormat && "dd-mm-yy" != c.dateFormat || (s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/, "$1/$2/$3")), $.tablesorter.formatFloat(new Date(s).getTime())
        }, type: "numeric"
    }), ts.addParser({
        id: "time", is: function (s) {
            return /^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test(s)
        }, format: function (s) {
            return $.tablesorter.formatFloat(new Date("2000/01/01 " + s).getTime())
        }, type: "numeric"
    }), ts.addParser({
        id: "metadata", is: function (s) {
            return !1
        }, format: function (s, table, cell) {
            var c = table.config, p = c.parserMetadataName ? c.parserMetadataName : "sortValue";
            return $(cell).metadata()[p]
        }, type: "numeric"
    }), ts.addWidget({
        id: "zebra", format: function (table) {
            if (table.config.debug) var time = new Date;
            var $tr, odd, row = -1;
            $("tr:visible", table.tBodies[0]).each(function (i) {
                $tr = $(this), $tr.hasClass(table.config.cssChildRow) || row++, odd = row % 2 == 0, $tr.removeClass(table.config.widgetZebra.css[odd ? 0 : 1]).addClass(table.config.widgetZebra.css[odd ? 1 : 0])
            }), table.config.debug && $.tablesorter.benchmark("Applying Zebra widget", time)
        }
    })
}(jQuery), function ($) {
    $.fn.rotator = function (options) {
        if (this.length > 1) return this.each(function () {
            $(this).rotator(options)
        }), this;
        var $this = $(this), self = this, thisOptions = null, transitionTimeout = null, banners = null, controls = null,
            defaultOptions = {speed: 6e3, transitionSpeed: 1e3};
        return this.init = function (options) {
            thisOptions = defaultOptions, options && (thisOptions = $.extend({}, defaultOptions, options)), banners = $this.children("div"), controls = $this.find("#controls li"), controls.attr("unselectable", "on").css({
                "-ms-user-select": "none",
                "-moz-user-select": "none",
                "-webkit-user-select": "none",
                "user-select": "none"
            }).each(function () {
                this.onselectstart = function () {
                    return !1
                }
            }), $this.mouseenter(function () {
                self.stopTransitions()
            }), $this.mouseleave(function () {
                self.startTransitions()
            }), controls.click(function () {
                var item = $(this);
                item.hasClass("next") ? self.transition("next") : item.hasClass("previous") ? self.transition("previous") : self.transition(item.index() - 1)
            }), this.startTransitions()
        }, this.transition = function (nextIndex) {
            var current = banners.not(".hidden"), currentIndex = current.index();
            controls.eq(currentIndex + 1).removeClass("active"), "undefined" == typeof nextIndex || "next" === nextIndex ? nextIndex = currentIndex + 1 < banners.length ? currentIndex + 1 : 0 : "previous" === nextIndex && (nextIndex = currentIndex - 1 < 0 ? banners.length - 1 : currentIndex - 1);
            var next = banners.eq(nextIndex);
            $.browser.msie ? (current.addClass("hidden"), next.removeClass("hidden")) : (current.fadeOut(thisOptions.transitionSpeed, function () {
                $(this).addClass("hidden")
            }), next.fadeIn(thisOptions.transitionSpeed, function () {
                $(this).removeClass("hidden");
            })), controls.eq(nextIndex + 1).addClass("active")
        }, this.startTransitions = function () {
            transitionTimeout = setTimeout(function () {
                self.stopTransitions(), self.transition(), self.startTransitions()
            }, thisOptions.speed)
        }, this.stopTransitions = function () {
            clearTimeout(transitionTimeout)
        }, this.init(options)
    }
}(jQuery), $(document).ready(function () {
    $("#shelf").rotator()
}), function ($) {
    $(".usp-carousel .usp .carousel-nav li:first").addClass("active"), $(".usp-carousel .usp .carousel-nav li").click(function (event) {
        event.preventDefault();
        var index = $(this).parent("ul").find("li").index(this);
        $(".usp-carousel > .usp:eq(" + index + ")").show().siblings().hide(), $(".usp-carousel > .usp .carousel-nav li").each(function (i, item) {
            var active = $(item).parent("ul").find("li").index(item);
            active === index && $(item).addClass("active").siblings().removeClass("active")
        })
    })
}(jQuery), function ($) {
    "use strict";

    function doAjaxSubmit(e) {
        var options = e.data;
        e.isDefaultPrevented() || (e.preventDefault(), $(this).ajaxSubmit(options))
    }

    function captureSubmittingElement(e) {
        var target = e.target, $el = $(target);
        if (!$el.is(":submit,input:image")) {
            var t = $el.closest(":submit");
            if (0 === t.length) return;
            target = t[0]
        }
        var form = this;
        if (form.clk = target, "image" == target.type) if (void 0 !== e.offsetX) form.clk_x = e.offsetX, form.clk_y = e.offsetY; else if ("function" == typeof $.fn.offset) {
            var offset = $el.offset();
            form.clk_x = e.pageX - offset.left, form.clk_y = e.pageY - offset.top
        } else form.clk_x = e.pageX - target.offsetLeft, form.clk_y = e.pageY - target.offsetTop;
        setTimeout(function () {
            form.clk = form.clk_x = form.clk_y = null
        }, 100)
    }

    function log() {
        if ($.fn.ajaxSubmit.debug) {
            var msg = "[jquery.form] " + Array.prototype.join.call(arguments, "");
            window.console && window.console.log ? window.console.log(msg) : window.opera && window.opera.postError && window.opera.postError(msg)
        }
    }

    var feature = {};
    feature.fileapi = void 0 !== $("<input type='file'/>").get(0).files, feature.formdata = void 0 !== window.FormData, $.fn.ajaxSubmit = function (options) {
        function fileUploadXhr(a) {
            for (var formdata = new FormData, i = 0; i < a.length; i++) formdata.append(a[i].name, a[i].value);
            if (options.extraData) for (var p in options.extraData) options.extraData.hasOwnProperty(p) && formdata.append(p, options.extraData[p]);
            options.data = null;
            var s = $.extend(!0, {}, $.ajaxSettings, options, {
                contentType: !1,
                processData: !1,
                cache: !1,
                type: "POST"
            });
            options.uploadProgress && (s.xhr = function () {
                var xhr = jQuery.ajaxSettings.xhr();
                return xhr.upload && (xhr.upload.onprogress = function (event) {
                    var percent = 0, position = event.loaded || event.position, total = event.total;
                    event.lengthComputable && (percent = Math.ceil(position / total * 100)), options.uploadProgress(event, position, total, percent)
                }), xhr
            }), s.data = null;
            var beforeSend = s.beforeSend;
            s.beforeSend = function (xhr, o) {
                o.data = formdata, beforeSend && beforeSend.call(o, xhr, options)
            }, $.ajax(s)
        }

        function fileUploadIframe(a) {
            function getDoc(frame) {
                var doc = frame.contentWindow ? frame.contentWindow.document : frame.contentDocument ? frame.contentDocument : frame.document;
                return doc
            }

            function doSubmit() {
                function checkState() {
                    try {
                        var state = getDoc(io).readyState;
                        log("state = " + state), state && "uninitialized" == state.toLowerCase() && setTimeout(checkState, 50)
                    } catch (e) {
                        log("Server abort: ", e, " (", e.name, ")"), cb(SERVER_ABORT), timeoutHandle && clearTimeout(timeoutHandle), timeoutHandle = void 0
                    }
                }

                var t = $form.attr("target"), a = $form.attr("action");
                form.setAttribute("target", id), method || form.setAttribute("method", "POST"), a != s.url && form.setAttribute("action", s.url), s.skipEncodingOverride || method && !/post/i.test(method) || $form.attr({
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data"
                }), s.timeout && (timeoutHandle = setTimeout(function () {
                    timedOut = !0, cb(CLIENT_TIMEOUT_ABORT)
                }, s.timeout));
                var extraInputs = [];
                try {
                    if (s.extraData) for (var n in s.extraData) s.extraData.hasOwnProperty(n) && extraInputs.push($('<input type="hidden" name="' + n + '">').attr("value", s.extraData[n]).appendTo(form)[0]);
                    s.iframeTarget || ($io.appendTo("body"), io.attachEvent ? io.attachEvent("onload", cb) : io.addEventListener("load", cb, !1)), setTimeout(checkState, 15), form.submit()
                } finally {
                    form.setAttribute("action", a), t ? form.setAttribute("target", t) : $form.removeAttr("target"), $(extraInputs).remove()
                }
            }

            function cb(e) {
                if (!xhr.aborted && !callbackProcessed) {
                    try {
                        doc = getDoc(io)
                    } catch (ex) {
                        log("cannot access response document: ", ex), e = SERVER_ABORT
                    }
                    if (e === CLIENT_TIMEOUT_ABORT && xhr) return void xhr.abort("timeout");
                    if (e == SERVER_ABORT && xhr) return void xhr.abort("server abort");
                    if (doc && doc.location.href != s.iframeSrc || timedOut) {
                        io.detachEvent ? io.detachEvent("onload", cb) : io.removeEventListener("load", cb, !1);
                        var errMsg, status = "success";
                        try {
                            if (timedOut) throw"timeout";
                            var isXml = "xml" == s.dataType || doc.XMLDocument || $.isXMLDoc(doc);
                            if (log("isXml=" + isXml), !isXml && window.opera && (null === doc.body || !doc.body.innerHTML) && --domCheckCount) return log("requeing onLoad callback, DOM not available"), void setTimeout(cb, 250);
                            var docRoot = doc.body ? doc.body : doc.documentElement;
                            xhr.responseText = docRoot ? docRoot.innerHTML : null, xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc, isXml && (s.dataType = "xml"), xhr.getResponseHeader = function (header) {
                                var headers = {"content-type": s.dataType};
                                return headers[header]
                            }, docRoot && (xhr.status = Number(docRoot.getAttribute("status")) || xhr.status, xhr.statusText = docRoot.getAttribute("statusText") || xhr.statusText);
                            var dt = (s.dataType || "").toLowerCase(), scr = /(json|script|text)/.test(dt);
                            if (scr || s.textarea) {
                                var ta = doc.getElementsByTagName("textarea")[0];
                                if (ta) xhr.responseText = ta.value, xhr.status = Number(ta.getAttribute("status")) || xhr.status, xhr.statusText = ta.getAttribute("statusText") || xhr.statusText; else if (scr) {
                                    var pre = doc.getElementsByTagName("pre")[0],
                                        b = doc.getElementsByTagName("body")[0];
                                    pre ? xhr.responseText = pre.textContent ? pre.textContent : pre.innerText : b && (xhr.responseText = b.textContent ? b.textContent : b.innerText)
                                }
                            } else "xml" == dt && !xhr.responseXML && xhr.responseText && (xhr.responseXML = toXml(xhr.responseText));
                            try {
                                data = httpData(xhr, dt, s)
                            } catch (e) {
                                status = "parsererror", xhr.error = errMsg = e || status
                            }
                        } catch (e) {
                            log("error caught: ", e), status = "error", xhr.error = errMsg = e || status
                        }
                        xhr.aborted && (log("upload aborted"), status = null), xhr.status && (status = xhr.status >= 200 && xhr.status < 300 || 304 === xhr.status ? "success" : "error"), "success" === status ? (s.success && s.success.call(s.context, data, "success", xhr), g && $.event.trigger("ajaxSuccess", [xhr, s])) : status && (void 0 === errMsg && (errMsg = xhr.statusText), s.error && s.error.call(s.context, xhr, status, errMsg), g && $.event.trigger("ajaxError", [xhr, s, errMsg])), g && $.event.trigger("ajaxComplete", [xhr, s]), g && !--$.active && $.event.trigger("ajaxStop"), s.complete && s.complete.call(s.context, xhr, status), callbackProcessed = !0, s.timeout && clearTimeout(timeoutHandle), setTimeout(function () {
                            s.iframeTarget || $io.remove(), xhr.responseXML = null
                        }, 100)
                    }
                }
            }

            var el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle, form = $form[0], useProp = !!$.fn.prop;
            if ($(":input[name=submit],:input[id=submit]", form).length) return void alert('Error: Form elements must not have name or id of "submit".');
            if (a) for (i = 0; i < elements.length; i++) el = $(elements[i]), useProp ? el.prop("disabled", !1) : el.removeAttr("disabled");
            if (s = $.extend(!0, {}, $.ajaxSettings, options), s.context = s.context || s, id = "jqFormIO" + (new Date).getTime(), s.iframeTarget ? ($io = $(s.iframeTarget), n = $io.attr("name"), n ? id = n : $io.attr("name", id)) : ($io = $('<iframe name="' + id + '" src="' + s.iframeSrc + '" />'), $io.css({
                position: "absolute",
                top: "-1000px",
                left: "-1000px"
            })), io = $io[0], xhr = {
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: "n/a",
                getAllResponseHeaders: function () {
                },
                getResponseHeader: function () {
                },
                setRequestHeader: function () {
                },
                abort: function (status) {
                    var e = "timeout" === status ? "timeout" : "aborted";
                    log("aborting upload... " + e), this.aborted = 1, $io.attr("src", s.iframeSrc), xhr.error = e, s.error && s.error.call(s.context, xhr, e, status), g && $.event.trigger("ajaxError", [xhr, s, e]), s.complete && s.complete.call(s.context, xhr, e)
                }
            }, g = s.global, g && 0 === $.active++ && $.event.trigger("ajaxStart"), g && $.event.trigger("ajaxSend", [xhr, s]), s.beforeSend && s.beforeSend.call(s.context, xhr, s) === !1) return void (s.global && $.active--);
            if (!xhr.aborted) {
                sub = form.clk, sub && (n = sub.name, n && !sub.disabled && (s.extraData = s.extraData || {}, s.extraData[n] = sub.value, "image" == sub.type && (s.extraData[n + ".x"] = form.clk_x, s.extraData[n + ".y"] = form.clk_y)));
                var CLIENT_TIMEOUT_ABORT = 1, SERVER_ABORT = 2, csrf_token = $("meta[name=csrf-token]").attr("content"),
                    csrf_param = $("meta[name=csrf-param]").attr("content");
                csrf_param && csrf_token && (s.extraData = s.extraData || {}, s.extraData[csrf_param] = csrf_token), s.forceSync ? doSubmit() : setTimeout(doSubmit, 10);
                var data, doc, callbackProcessed, domCheckCount = 50, toXml = $.parseXML || function (s, doc) {
                    return window.ActiveXObject ? (doc = new ActiveXObject("Microsoft.XMLDOM"), doc.async = "false", doc.loadXML(s)) : doc = (new DOMParser).parseFromString(s, "text/xml"), doc && doc.documentElement && "parsererror" != doc.documentElement.nodeName ? doc : null
                }, parseJSON = $.parseJSON || function (s) {
                    return window.eval("(" + s + ")")
                }, httpData = function (xhr, type, s) {
                    var ct = xhr.getResponseHeader("content-type") || "",
                        xml = "xml" === type || !type && ct.indexOf("xml") >= 0,
                        data = xml ? xhr.responseXML : xhr.responseText;
                    return xml && "parsererror" === data.documentElement.nodeName && $.error && $.error("parsererror"), s && s.dataFilter && (data = s.dataFilter(data, type)), "string" == typeof data && ("json" === type || !type && ct.indexOf("json") >= 0 ? data = parseJSON(data) : ("script" === type || !type && ct.indexOf("javascript") >= 0) && $.globalEval(data)), data
                }
            }
        }

        if (!this.length) return log("ajaxSubmit: skipping submit process - no element selected"), this;
        var method, action, url, $form = this;
        "function" == typeof options && (options = {success: options}), method = this.attr("method"), action = this.attr("action"), url = "string" == typeof action ? $.trim(action) : "", url = url || window.location.href || "", url && (url = (url.match(/^([^#]+)/) || [])[1]), options = $.extend(!0, {
            url: url,
            success: $.ajaxSettings.success,
            type: method || "GET",
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
        }, options);
        var veto = {};
        if (this.trigger("form-pre-serialize", [this, options, veto]), veto.veto) return log("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
        if (options.beforeSerialize && options.beforeSerialize(this, options) === !1) return log("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
        var traditional = options.traditional;
        void 0 === traditional && (traditional = $.ajaxSettings.traditional);
        var qx, elements = [], a = this.formToArray(options.semantic, elements);
        if (options.data && (options.extraData = options.data, qx = $.param(options.data, traditional)), options.beforeSubmit && options.beforeSubmit(a, this, options) === !1) return log("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
        if (this.trigger("form-submit-validate", [a, this, options, veto]), veto.veto) return log("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
        var q = $.param(a, traditional);
        qx && (q = q ? q + "&" + qx : qx), "GET" == options.type.toUpperCase() ? (options.url += (options.url.indexOf("?") >= 0 ? "&" : "?") + q, options.data = null) : options.data = q;
        var callbacks = [];
        if (options.resetForm && callbacks.push(function () {
            $form.resetForm()
        }), options.clearForm && callbacks.push(function () {
            $form.clearForm(options.includeHidden)
        }), !options.dataType && options.target) {
            var oldSuccess = options.success || function () {
            };
            callbacks.push(function (data) {
                var fn = options.replaceTarget ? "replaceWith" : "html";
                $(options.target)[fn](data).each(oldSuccess, arguments)
            })
        } else options.success && callbacks.push(options.success);
        options.success = function (data, status, xhr) {
            for (var context = options.context || options, i = 0, max = callbacks.length; i < max; i++) callbacks[i].apply(context, [data, status, xhr || $form, $form])
        };
        var fileInputs = $("input:file:enabled[value]", this), hasFileInputs = fileInputs.length > 0,
            mp = "multipart/form-data", multipart = $form.attr("enctype") == mp || $form.attr("encoding") == mp,
            fileAPI = feature.fileapi && feature.formdata;
        log("fileAPI :" + fileAPI);
        var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;
        options.iframe !== !1 && (options.iframe || shouldUseFrame) ? options.closeKeepAlive ? $.get(options.closeKeepAlive, function () {
            fileUploadIframe(a)
        }) : fileUploadIframe(a) : (hasFileInputs || multipart) && fileAPI ? fileUploadXhr(a) : $.ajax(options);
        for (var k = 0; k < elements.length; k++) elements[k] = null;
        return this.trigger("form-submit-notify", [this, options]), this
    }, $.fn.ajaxForm = function (options) {
        if (options = options || {}, options.delegation = options.delegation && $.isFunction($.fn.on), !options.delegation && 0 === this.length) {
            var o = {s: this.selector, c: this.context};
            return !$.isReady && o.s ? (log("DOM not ready, queuing ajaxForm"), $(function () {
                $(o.s, o.c).ajaxForm(options)
            }), this) : (log("terminating; zero elements found by selector" + ($.isReady ? "" : " (DOM not ready)")), this)
        }
        return options.delegation ? ($(document).off("submit.form-plugin", this.selector, doAjaxSubmit).off("click.form-plugin", this.selector, captureSubmittingElement).on("submit.form-plugin", this.selector, options, doAjaxSubmit).on("click.form-plugin", this.selector, options, captureSubmittingElement), this) : this.ajaxFormUnbind().bind("submit.form-plugin", options, doAjaxSubmit).bind("click.form-plugin", options, captureSubmittingElement)
    }, $.fn.ajaxFormUnbind = function () {
        return this.unbind("submit.form-plugin click.form-plugin")
    }, $.fn.formToArray = function (semantic, elements) {
        var a = [];
        if (0 === this.length) return a;
        var form = this[0], els = semantic ? form.getElementsByTagName("*") : form.elements;
        if (!els) return a;
        var i, j, n, v, el, max, jmax;
        for (i = 0, max = els.length; i < max; i++) if (el = els[i], n = el.name) if (semantic && form.clk && "image" == el.type) el.disabled || form.clk != el || (a.push({
            name: n,
            value: $(el).val(),
            type: el.type
        }), a.push({name: n + ".x", value: form.clk_x}, {
            name: n + ".y",
            value: form.clk_y
        })); else if (v = $.fieldValue(el, !0), v && v.constructor == Array) for (elements && elements.push(el), j = 0, jmax = v.length; j < jmax; j++) a.push({
            name: n,
            value: v[j]
        }); else if (feature.fileapi && "file" == el.type && !el.disabled) {
            elements && elements.push(el);
            var files = el.files;
            if (files.length) for (j = 0; j < files.length; j++) a.push({
                name: n,
                value: files[j],
                type: el.type
            }); else a.push({name: n, value: "", type: el.type})
        } else null !== v && "undefined" != typeof v && (elements && elements.push(el), a.push({
            name: n,
            value: v,
            type: el.type,
            required: el.required
        }));
        if (!semantic && form.clk) {
            var $input = $(form.clk), input = $input[0];
            n = input.name, n && !input.disabled && "image" == input.type && (a.push({
                name: n,
                value: $input.val()
            }), a.push({name: n + ".x", value: form.clk_x}, {name: n + ".y", value: form.clk_y}))
        }
        return a
    }, $.fn.formSerialize = function (semantic) {
        return $.param(this.formToArray(semantic))
    }, $.fn.fieldSerialize = function (successful) {
        var a = [];
        return this.each(function () {
            var n = this.name;
            if (n) {
                var v = $.fieldValue(this, successful);
                if (v && v.constructor == Array) for (var i = 0, max = v.length; i < max; i++) a.push({
                    name: n,
                    value: v[i]
                }); else null !== v && "undefined" != typeof v && a.push({name: this.name, value: v})
            }
        }), $.param(a)
    }, $.fn.fieldValue = function (successful) {
        for (var val = [], i = 0, max = this.length; i < max; i++) {
            var el = this[i], v = $.fieldValue(el, successful);
            null === v || "undefined" == typeof v || v.constructor == Array && !v.length || (v.constructor == Array ? $.merge(val, v) : val.push(v))
        }
        return val
    }, $.fieldValue = function (el, successful) {
        var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
        if (void 0 === successful && (successful = !0), successful && (!n || el.disabled || "reset" == t || "button" == t || ("checkbox" == t || "radio" == t) && !el.checked || ("submit" == t || "image" == t) && el.form && el.form.clk != el || "select" == tag && el.selectedIndex == -1)) return null;
        if ("select" == tag) {
            var index = el.selectedIndex;
            if (index < 0) return null;
            for (var a = [], ops = el.options, one = "select-one" == t, max = one ? index + 1 : ops.length, i = one ? index : 0; i < max; i++) {
                var op = ops[i];
                if (op.selected) {
                    var v = op.value;
                    if (v || (v = op.attributes && op.attributes.value && !op.attributes.value.specified ? op.text : op.value), one) return v;
                    a.push(v)
                }
            }
            return a
        }
        return $(el).val()
    }, $.fn.clearForm = function (includeHidden) {
        return this.each(function () {
            $("input,select,textarea", this).clearFields(includeHidden)
        })
    }, $.fn.clearFields = $.fn.clearInputs = function (includeHidden) {
        var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function () {
            var t = this.type, tag = this.tagName.toLowerCase();
            re.test(t) || "textarea" == tag ? this.value = "" : "checkbox" == t || "radio" == t ? this.checked = !1 : "select" == tag ? this.selectedIndex = -1 : includeHidden && (includeHidden === !0 && /hidden/.test(t) || "string" == typeof includeHidden && $(this).is(includeHidden)) && (this.value = "")
        })
    }, $.fn.resetForm = function () {
        return this.each(function () {
            ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset()
        })
    }, $.fn.enable = function (b) {
        return void 0 === b && (b = !0), this.each(function () {
            this.disabled = !b
        })
    }, $.fn.selected = function (select) {
        return void 0 === select && (select = !0), this.each(function () {
            var t = this.type;
            if ("checkbox" == t || "radio" == t) this.checked = select; else if ("option" == this.tagName.toLowerCase()) {
                var $sel = $(this).parent("select");
                select && $sel[0] && "select-one" == $sel[0].type && $sel.find("option").selected(!1), this.selected = select
            }
        })
    }, $.fn.ajaxSubmit.debug = !1
}(jQuery), function ($) {
    var defaultOptions = {
        ignoreFields: [], beforeSubmit: function () {
            return !0
        }, onProgress: function (progress) {
        }, onUploaded: function (response) {
        }, onAbort: function (response) {
        }, onError: function () {
        }
    };
    $.fn.ajaxUpload = function (customOptions) {
        return this.each(function () {
            var uploadOptions = $.extend({}, defaultOptions, customOptions), form = $(this), token = form.data("token"),
                hash = form.data("hash"), app = form.data("app");
            if (!token) return void $.error("Missing upload token");
            if (!hash) return void $.error("Missing upload hash");
            if (!app) return void $.error("Missing upload application name");
            var baseHref = "https://upload.dur.ac.uk:443/",
                actionUrl = baseHref + "upload?app=" + app + "&token=" + token + "&hash=" + hash, requestXHR = null,
                aborted = !1, socket = io.connect(baseHref);
            if (socket.on("progress", function (progress) {
                uploadOptions.onProgress(progress)
            }).on("aborted", function (response) {
                requestXHR && requestXHR.abort(), $.browser.msie && $.each(uploadOptions.ignoreFields, function (index, name) {
                    form.find('input[name="' + name + '"]').removeAttr("disabled")
                }), aborted = !0, uploadOptions.onAbort(response)
            }), $(window).on("beforeunload", function () {
                socket.disconnect()
            }), $.browser.msie) {
                form.attr("action", actionUrl + "&xdm=1"), form.attr("target", "upload_target");
                new easyXDM.Rpc({remote: baseHref + "xdmrpc.html"}, {
                    local: {
                        returnUploadResponse: function (response) {
                            $.each(uploadOptions.ignoreFields, function (index, name) {
                                form.find('input[name="' + name + '"]').removeAttr("disabled")
                            }), 200 === response.status && $.each(uploadOptions.ignoreFields, function (index, name) {
                                response.fields[name] = form.find('input[name="' + name + '"]').val()
                            }), uploadOptions.onUploaded(response)
                        }
                    }
                });
                form.submit(function () {
                    var shouldSubmit = uploadOptions.beforeSubmit();
                    return shouldSubmit && (socket.emit("register", token), $.each(uploadOptions.ignoreFields, function (index, name) {
                        form.find('input[name="' + name + '"]').attr("disabled", "disabled")
                    })), shouldSubmit
                })
            } else form.ajaxForm({
                dataType: "json", beforeSubmit: function (data, form, pluginOptions) {
                    pluginOptions.url = actionUrl;
                    var shouldSubmit = uploadOptions.beforeSubmit();
                    if (shouldSubmit) {
                        socket.emit("register", token);
                        var remove = [];
                        $.each(data, function (index, value) {
                            uploadOptions.ignoreFields.indexOf(value.name) !== -1 && remove.push(index)
                        }), remove.reverse(), $.each(remove, function (index, value) {
                            data.splice(value, 1)
                        })
                    }
                    return shouldSubmit
                }, beforeSend: function (xhr, settings) {
                    requestXHR = xhr
                }, success: function (response, status, xhr, form) {
                    uploadOptions.onUploaded(response)
                }, error: function () {
                    aborted ? aborted = !1 : uploadOptions.onError()
                }
            })
        })
    }
}(jQuery), function ($) {
    var controlsCSS = {"margin-right": "0.5em"}, buttonCSS = {cursor: "pointer"},
        defaultOptions = {autoTransition: !1, transitionTime: 1e4};
    $.fn.sidebarRSS = function (options) {
        if (0 === this.length) return this;
        if (this.length > 1) return this.each(function () {
            $(this).sidebarRSS(options)
        }), this;
        var $this = $(this), self = this;
        return this.pluginName = "sidebar-rss", this.options = {}, this.transitionTimeout = null, this.init = function (options) {
            return this.options = $.extend({}, defaultOptions, $this.data(), options), this.items = $this.find(".sidebar-rss-item"), this.items.first().addClass("active"), this.items.not(".active").hide(), this.controls = $('<div><img class="sidebar-rss-back" src="/images/template/moveback.png" alt="Previous" title="Previous" /><img class="sidebar-rss-stop" src="/images/template/movestop.png" alt="Stop" title="Stop" /><img class="sidebar-rss-play" src="/images/template/moveplay.png" alt="Play" title="Play" /><span class="sidebar-rss-current-index">1</span> of <span class="sidebar-rss-total-items">0</span><img class="sidebar-rss-next" src="/images/template/movefwd.png" alt="Next" title="Next" /></div>'), this.controls.find(".sidebar-rss-total-items").css(controlsCSS).text(this.items.length).end().find(".sidebar-rss-back").css(controlsCSS).css(buttonCSS).click(function () {
                self.changeItem(-1)
            }).end().find(".sidebar-rss-stop").hide().css(controlsCSS).css(buttonCSS).click(function () {
                self.stop()
            }).end().find(".sidebar-rss-play").css(controlsCSS).css(buttonCSS).click(function () {
                self.play()
            }).end().find(".sidebar-rss-next").css(controlsCSS).css(buttonCSS).click(function () {
                self.changeItem(1)
            }).end().insertAfter($this.find("h2")), this.options.autoplay && this.play(), this
        }, this.stop = function () {
            this.transitionTimeout && (clearTimeout(this.transitionTimeout), this.controls.find(".sidebar-rss-stop").hide(), this.controls.find(".sidebar-rss-play").show())
        }, this.play = function () {
            this.stop(), this.controls.find(".sidebar-rss-play").hide(), this.controls.find(".sidebar-rss-stop").show(), this.transitionTimeout = setTimeout(function () {
                self.changeItem(1), self.play()
            }, this.options.transitionTime)
        }, this.changeItem = function (modifier) {
            this.stop();
            var currentItem = this.items.filter(".active"), currentIndex = this.items.index(currentItem),
                nextIndex = currentIndex + modifier;
            nextIndex === -1 && (nextIndex = this.items.length - 1), nextIndex === this.items.length && (nextIndex = 0);
            var nextItem = this.items.eq(nextIndex);
            currentItem.removeClass("active").hide(), nextItem.addClass("active").show(), this.updateCurrentIndex(nextIndex)
        }, this.updateCurrentIndex = function (index) {
            this.controls.find(".sidebar-rss-current-index").text(index + 1)
        }, this.init(options)
    }
}(jQuery), $(".carousel").each(function () {
    var data = $(this).data(), options = {interval: data.interval};
    $(this).carousel(options)
}), $('.carousel a[data-slide="pause"]').on("click", function () {
    $(this).hasClass("paused") ? ($(this).parent(".carousel").carousel("cycle"), $(this).removeClass("paused")) : ($(this).parent(".carousel").carousel("pause"), $(this).addClass("paused"))
}), $(".carousel-inner").each(function () {
    1 === $(this).children("div").length && $(this).siblings(".carousel-control, .carousel-indicators").hide()
}), $(document).ready(function () {
    $(".jsfaq .quicklinks").hide(), $(".jsfaq .panel").hide().css({"padding-left": "20px"}), $(".jsfaq .expander").show(), $(".jsfaq .section").css({
        cursor: "pointer",
        "border-bottom": "1px solid #e0e0e0",
        "line-height": "1.4em",
        outline: "0"
    }), $(".jsfaq .section").live("click", function () {
        var expander = $(this);
        $(this).is("span") || (expander = $(this).children("span.expander")), expander.toggleClass("open"), expander.hasClass("open") ? $(expander).children("img").attr("src", "/images/resourceicons/arrow_down.gif") : $(expander).children("img").attr("src", "/images/resourceicons/arrow_right.gif"), $(".jsfaq.accordian .expander").not(expander).removeClass("open"), $(".jsfaq.accordian .expander").not(expander).children("img").attr("src", "/images/resourceicons/arrow_right.gif"), $(".jsfaq.accordian .panel").not($(this).next(".panel")).slideUp(), $(this).next(".panel").slideToggle()
    })
}), $(document).ready(function () {
    $(".grantlist").each(function (idx, el) {
        var id = $(this).data("id");
        id && ($("#grants" + id).append("<a href='#grantsctrl" + id + "' data-parent='#grantblock" + id + "' data-toggle='collapse'>Show fewer grants</a>"), $("#grantsctrl" + id).prepend("<a href='#grants" + id + "' data-toggle='collapse' data-parent='#grantblock" + id + "'>Show more grants</a>"))
    })
}), $("div.photo-banner").each(function () {
    var $this = $(this);
    $this.photobanner($this.data())
}), $(document).ready(function () {
    "undefined" != typeof TABLE_SORTER_ENABLED && TABLE_SORTER_ENABLED && ($.browser.msie && $.browser.version.slice(0, 1) < 8 || ($("table").each(function () {
        var $this = $(this);
        if ($this.find("tr").length > 2) {
            if ($this.addClass("sortable"), 0 === $this.children("thead").length) {
                var head = $("<thead />");
                $this.find("tr").each(function (rowIndex) {
                    var $row = $(this), wideColumnCount = $row.children("td").filter(function (index) {
                        return $(this).attr("colspan") > 1
                    }).length;
                    if ($row.detach().appendTo(head), 0 === wideColumnCount) return !1
                }), $this.prepend(head)
            }
            if (0 === $this.find("tbody").length) {
                var body = $("<tbody />"), rows = $this.children("tr").detach();
                body.append(rows), body.appendTo($this)
            }
        }
    }), $("table.sortable thead tr").each(function () {
        $(this).children("td").each(function (index) {
            var thisTD = this, newTH = $("<th />").html($(thisTD).html());
            $.each(this.attributes, function (index) {
                $(newTH).attr(thisTD.attributes[index].name, thisTD.attributes[index].value)
            }), $(this).replaceWith(newTH)
        })
    }), $("table.sortable").tablesorter({
        textExtraction: "complex",
        selectorHeaders: "thead tr:last-child th"
    }), $("table.sortable thead tr th a").click(function (event) {
        event.stopPropagation()
    })))
}), $(".googlemap").googlemap(), $(document).ready(function () {
    $(".strength").on("keyup", function () {
        var password = $(this).val(), result = zxcvbn(password), html = "";
        switch (result.score) {
            case 4:
                html = "Excellent";
                break;
            case 3:
                html = "Strong";
                break;
            case 2:
                html = "Fair";
                break;
            case 1:
                html = "Weak";
                break;
            case 0:
                html = "Very Weak";
                break;
            default:
                html = "Unknown"
        }
        password && 0 === password.length && (html = ""), $(".strength-result").removeClass("strength-level0 strength-level1 strength-level2 strength-level3 strength-level4").addClass("strength-level" + result.score).html("Password Strength: " + html)
    })
}), $(document).ready(function () {
    $.fn.placeholder && $("input, textarea").placeholder()
}), function () {
    function loadScripts() {
        if (0 === paths.length) return void setUp();
        var path = paths.shift();
        $.getScript(path, function () {
            loadScripts()
        })
    }

    function setUp() {
        $("form.protected-file-upload-form").each(function () {
            function showError(message) {
                errorAlert.text(message).show()
            }

            function hideError() {
                errorAlert.hide()
            }

            function toggleActions(showActions) {
                void 0 !== showActions && (actionsShowing = !showActions), actionsShowing ? (formActions.hide(), progressContainer.show()) : (progressContainer.hide(), formActions.show()), actionsShowing = !actionsShowing
            }

            var form = $(this);
            form.find('input[name="action"]').val("ajax-upload");
            var errorAlert = $('<div class="alert alert-error">').hide();
            form.prepend(errorAlert);
            var formActions = form.find(".form-actions"), progressContainer = $("<div>"),
                progressBarContainer = $('<div class="progress progress-striped">'),
                progressBar = $('<div class="bar">'), progressText = $("<p>");
            progressBarContainer.append(progressBar), progressContainer.hide().append(progressText).append(progressBarContainer).insertAfter(formActions);
            var actionsShowing = !0;
            form.ajaxUpload({
                beforeSubmit: function () {
                    return hideError(), 0 === form.find('input[type="file"]').val().length ? (showError("No file selected"), !1) : (progressBar.css("width", "0%"), toggleActions(!1), !0)
                }, onUploaded: function (response) {
                    if (0 === response.files.length) return void showError("No file selected");
                    var post = response.fields;
                    post.username = form.find('input[name="username"]').val(), post.password = form.find('input[name="password"]').val(), post.file = response.files[0], $.post("/scripts/files/", post, function (data) {
                        if (200 === data.status) {
                            var url = window.location.pathname;
                            url += "?uploaded", url += "&h=" + post.file.hash, window.location = url
                        } else showError(data.error_message), toggleActions(!0)
                    })
                }, onProgress: function (progress) {
                    progressBar.css("width", progress.percentage + "%"), progressText.text("Progress: " + progress.percentage + "%")
                }, onAbort: function (response) {
                    var maxMB = parseInt(response.maxBytes, 10) / 1024 / 1024;
                    showError("The file you are trying to upload is too large. The limit is " + maxMB + "MB."), toggleActions(!0)
                }, onError: function () {
                    showError("There was a problem uploading the file, please try again"), toggleActions(!0)
                }
            })
        })
    }

    if (0 !== $("form.protected-file-upload-form").length && !($.browser.msie && parseInt($.browser.version, 10) <= 7)) {
        var uploadPath = "https://upload.dur.ac.uk:443", paths = [uploadPath + "/socket.io/socket.io.js"];
        $.browser.msie && (paths.push(uploadPath + "/easyXDM.min.js"), window.JSON && window.JSON.parse || paths.push(uploadPath + "/json2.js")), loadScripts()
    }
}(), $("div.sidebar-rss").sidebarRSS(), $(function () {
    var groups = [{
        selector: "body:not(.editing) .content-grouped-display",
        stopMatch: ".content-grouped-display",
        matchElements: ".content-item"
    }, {
        selector: "body:not(.editing) .contentblock:has(.group)",
        stopMatch: ".contentblock:has(.group)",
        matchElements: ".contentblock"
    }];
    if (groups.forEach(function (group) {
        $(group.selector).each(function () {
            var $content = $(this), $siblings = $content.nextUntil(group.stopMatch, group.matchElements),
                $groups = $content.find(".group");
            $groups.each(function () {
                var $group = $(this), $target = $($group.find("a[data-toggle]").attr("href")).find(".group-content"),
                    items = $group.data("group-items");
                if (items > 0) for (var i = 0; i < items; i++) $([].shift.call($siblings)).detach().appendTo($target)
            })
        })
    }), window.location.hash) {
        var selectors = [{closest: ".tab-pane", aClass: "tab"}, {
            closest: ".panel-collapse",
            aClass: "accordion-toggle"
        }];
        selectors.forEach(function (selector) {
            var paneId = $(window.location.hash).closest(selector.closest).first().attr("id");
            if (paneId) {
                var handle = $("a." + selector.aClass + "[href=#" + paneId + "]");
                handle.length > 0 && handle.click().get(0).scrollIntoView()
            }
        })
    }
}), $(document).ready(function () {
    $("link").each(function (idx, el) {
        $(this).attr("href").match(/high-dark/) && $("img#durham_logo").attr("src", "/images/template/logounidurham-inverse.png")
    })
});
var uuid = function () {
    function s4() {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
    }

    return function () {
        return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4()
    }
}();
$(document).ready(function () {
    showBookmarkCounts(), openPopup()
});
var i = document.createElement("input");
i.setAttribute("type", "date"), "date" !== i.type && $(".bs-datepicker").datepicker({format: "yyyy-mm-dd"}), $("div.date-countdown").each(function () {
    var timestamp = $(this).data("countdown-date"), date = new Date(1e3 * timestamp);
    $(this).countdown({until: date})
}), $(".course-accordion").each(function () {
    var accordion = $(this), id = $(this).attr("id"), element = $(this).attr("data-element"),
        accordions = $(".course-accordion[data-element=" + element + "]");
    $(this).find(".toggle").click(function (event) {
        var target = $(this).attr("data-target"), targets = $(".course-accordion[data-element=" + target + "]");
        $(".course-accordion.selected").each(function () {
            hideCourseContent($(this))
        }), targets.each(function () {
            showCourseContent($(this))
        })
    }), accordion.find(".heading").each(function () {
        $(this).click(function () {
            accordion.hasClass("selected") ? accordions.each(function () {
                hideCourseContent($(this))
            }) : ($(".course-accordion.selected").each(function () {
                $(this).attr("id") !== id && hideCourseContent($(this))
            }), accordions.each(function () {
                showCourseContent($(this))
            }))
        })
    })
}), $(document).ready(function () {
    $(".jobslistdepartmentsubmit").hide(), window.location.hash && updatejobslist(window.location.hash), $(".jobslistdepartmentselector").each(function (index) {
        window.location.hash && $(this).children("option").each(function (index) {
            jobslistcleantext($(this).text()) === jobslistcleantext(window.location.hash) && $(this).attr("selected", "selected")
        }), $(this).change(function () {
            var selecteddept = $(this).find(":selected").text();
            window.location.hash = jobslistcleantext(selecteddept), updatejobslist(selecteddept)
        })
    })
}), $(document).ready(function ($) {
    var actions = [{
        filter: function () {
            return !0
        }, handler: function () {
            var action = $(this).attr("action");
            return "./" === action && (action = window.location.pathname), _gaq.push(["_trackEvent", "form", $(this).attr("method").toLowerCase(), action])
        }
    }], forms = $("form");
    $.each(actions, function (index, action) {
        forms.filter(action.filter).on("submit", action.handler)
    })
}), $(document).ready(function ($) {
    var domains = ["www.dur.ac.uk", "www.durham.ac.uk", "www.teamdurham.com"],
        resources = "(" + $.map(domains, function (domain) {
            return domain.replace(/\./g, "\\.", "g") + "/"
        }).join("|") + "|^/)(resources/(.*))", external = "(^\\w+://|^//)(?!(" + $.map(domains, function (domain) {
            return domain.replace(/\./g, "\\.")
        }).join("|") + "))(.*)", actions = [{
            filter: function () {
                var regexp = new RegExp("^mailto:", "i"), $this = $(this);
                return $this.attr("href") && $this.attr("href").match(regexp)
            }, handler: function () {
                return _gaq.push(["_trackEvent", "email", "click", $(this).attr("href").replace(/^mailto\:/i, "")])
            }
        }, {
            filter: function () {
                var regexp = new RegExp("^tel:", "i"), $this = $(this);
                return $this.attr("href") && $this.attr("href").match(regexp)
            }, handler: function () {
                return _gaq.push(["_trackEvent", "telephone", "click", $(this).attr("href").replace(/^tel\:/i, "")])
            }
        }, {
            filter: function () {
                var regexp = new RegExp(resources, "i"), $this = $(this);
                return $this.attr("href") && $this.attr("href").match(regexp)
            }, handler: function () {
                return _gaq.push(["_trackEvent", $(this).attr("href").split(".").pop(), "download", $(this).attr("href")])
            }
        }, {
            filter: function () {
                var regexp = new RegExp(external, "i"), $this = $(this);
                return $this.attr("href") && $this.attr("href").match(regexp)
            }, handler: function () {
                return _gaq.push(["_trackEvent", "external", "click", $(this).attr("href")])
            }
        }], links = $("a");
    $.each(actions, function (index, action) {
        links.filter(action.filter).on("click", action.handler)
    })
}), navshown = !1, $(function () {
    function handleSlide(carousel, next) {
        clearTimeout(timer), video && (video.pause(), video.currentTime = 0), video = next.find("video")[0], video ? (video.play(), video.addEventListener("ended", function () {
            carousel.carousel("next")
        })) : timer = setTimeout(function () {
            carousel.carousel("next")
        }, 7e3)
    }

    var videos = $(".video a.video-url");
    videos.click(function () {
        var $this = $(this), id = ($this.attr("href"), $this.data("video")), title = $this.data("title") || "",
            src = ($this.data("target"), "//www.youtube.com/embed/" + id);
        id.indexOf("?") === -1 ? src += "?rel=0" : id.indexOf("rel=") === -1 && (src += "&rel=0"), $("#videoModal iframe").attr("src", src), $("#videoModal videoModalLabel").text(title), $("#videoModal button.close").click(function () {
            $("#videoModal iframe").attr("src", src)
        })
    }), $(".navbutton").click(navtoggle), $("#navigation .haschildren").click(subnavtoggle);
    var timer, video;
    $(".du-carousel").each(function (index, element) {
        var carousel = $(element);
        carousel.on("slide.bs.carousel", function (data) {
            handleSlide(carousel, $(data.relatedTarget))
        }), handleSlide(carousel, carousel.find(".carousel-item.active"))
    }), $("ul#navigation ul").hover(function () {
        $("#navigation > li").removeClass("hovered"), $(this).parent().addClass("hovered")
    }, function () {
        $(this).parent().removeClass("hovered")
    }), $("#navigation > li > a").on("touchstart", function (event) {
        detectTap = !0
    }), $("#navigation > li > a").on("touchmove", function (event) {
        detectTap = !1
    }), $("#navigation > li > a").on("click", function (event) {
        $("#navigation > li").not($(this).parent()).removeClass("hovered"), !ismobile() && detectTap && $(this).prev().hasClass("haschildren") && ($(this).parent().hasClass("hovered") || event.preventDefault())
    }), $("#navigation > li > a").on("touchend", function (event) {
        !ismobile() && detectTap && $(this).prev().hasClass("haschildren") && ($(this).parent().hasClass("hovered") ? $("#navigation > li").not($(this).parent()).removeClass("hovered") : (event.preventDefault(), $("#navigation > li").not($(this).parent()).removeClass("hovered"), $(this).parent().addClass("hovered")))
    }), $("#navigation > li > a, #navigation > li > ul").on("click", function (event) {
        ismobile() || event.stopPropagation()
    }), $(window).on("click", function (event) {
        ismobile() || $("#navigation > li").removeClass("hovered")
    })
});