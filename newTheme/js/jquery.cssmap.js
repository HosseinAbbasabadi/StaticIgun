/*
 * CSSMap plugin
 * version: 4.4.16
 * web: http://cssmapsplugin.com
 * email: support@cssmapsplugin.com
 * author: Łukasz Popardowski { Winston_Wolf }
 * license: http://cssmapsplugin.com/license
 */
(function (a) {
    a.fn.cssMap = function (h) {
        var g = {
            size: "850",
            tooltips: true,
            tooltipArrowHeight: 5,
            cities: false,
            visibleList: false,
            loadingText: "Loading ...",
            multipleClick: false,
            searchUrl: "search.php",
            searchLink: "Search",
            searchLinkVar: "region",
            searchLinkSeparator: "|",
            clicksLimit: 0,
            clicksLimitAlert: "You can select only %d region! || regions!",
            agentsListId: "",
            agentsListSpeed: 0,
            agentsListOnHover: false,
            pins: {
                enable: false,
                pinsId: "",
                markerClass: "cssmap-marker",
                pinTooltipClass: "cssmap-tooltip-content",
                markerPosition: "middle",
                tooltipPosition: "top",
                tooltipOnClick: false,
                tooltipFadeSpeed: 0,
                clickableRegions: true
            },
            onClick: function (d) {},
            onSecondClick: function (d) {},
            onHover: function (d) {},
            unHover: function (d) {},
            onLoad: function (d) {}
        };
        if (h) {
            var c = a.extend(true, g, h || {}),
                f = a(window).width(),
                b = a(window).height();
            a(window).resize(function () {
                f = a(window).width();
                b = a(window).height()
            });
            return this.each(function (o) {
                if (!a(this).attr("id")) {
                    a(this).attr("id", "css-map" + (o + 1))
                }
                if (c.pins.pinsId != "" && c.pins.pinsId != "#") {
                    var m = c.pins.pinsId
                } else {
                    var m = ".cssmap-pins"
                }
                var s = "#" + a(this).attr("id"),
                    k = a(s),
                    i = k.find("ul").eq(0),
                    j = a(i).attr("class").split(" ")[0],
                    t = a(i).find("li"),
                    d = a(m).find("li"),
                    n = 0,
                    r = false,
                    l = "",
                    v = "",
                    q = c.tooltips.toString(),
                    u = c.pins.clickableRegions.toString(),
                    p = {
                        init: function () {
                            p.clearMap();
                            k.addClass("css-map-container m" + c.size);
                            var w = i.css("background-image").replace(/^url\("?([^\"\))]+)"?\)$/i, "$1");
                            this.loader(w)
                        },
                        loader: function (z) {
                            var y = new Image(),
                                w = a("<span />", {
                                    "class": "map-loader",
                                    text: c.loadingText
                                }).appendTo(k),
                                x = {
                                    left: k.outerWidth() / 2,
                                    marginLeft: w.outerWidth() / -2,
                                    marginTop: w.outerHeight() / -2,
                                    top: k.outerHeight() / 2
                                };
                            w.css(x);
                            a(i).addClass("css-map");
                            a(c.agentsListId).find("li").hide();
                            a(y).load(function () {
                                if (navigator.appVersion.indexOf("MSIE 7.") != -1) {
                                    var A = true
                                }
                                if (c.cities && !A) {
                                    k.append('<span class="cities ' + j + '-cities" />')
                                }
                                if (A) {
                                    k.addClass("ie")
                                }
                                if (u != "false") {
                                    p.regions.init()
                                }
                                if (a(c.agentsListId).length) {
                                    p.agentslist.init()
                                }
                                if (c.multipleClick) {
                                    p.searchButton()
                                }
                                if (c.pins.enable) {
                                    p.pins.init()
                                }
                                w.fadeOut("slow");
                                c.onLoad(k)
                            }).error(function () {
                                w.fadeOut();
                                a(i).removeClass()
                            }).attr("src", z)
                        },
                        regions: {
                            init: function () {
                                var w = p.regions;
                                w.hideTooltips();
                                t.each(function () {
                                    var y = a(this),
                                        z = y.attr("class").split(" ")[0],
                                        A = y.children("a").eq(0),
                                        x = a(A).attr("href");
                                    if (typeof x == "undefined" || x.length < 2) {
                                        a(y).remove()
                                    }
                                    w.copyList(a(y), z, A, x);
                                    w.createSpans(a(y), z);
                                    p.selectRegion.init(a(y), z, A)
                                });
                                if (c.visibleList) {
                                    w.createList(l);
                                    p.selectRegion.initVisibleList()
                                }
                                w.autoSelectRegion()
                            },
                            createSpans: function (x, z) {
                                var w = '<span class="m">',
                                    A = [],
                                    E = "",
                                    B = x.children("a").eq(0);
                                if (q != "visible" && q.split("-")[0] != "floating") {
                                    var C = a('<span class="tooltip-arrow" />').appendTo(B)
                                }
                                switch (j) {
                                case "argentina":
                                    E = "ar";
                                    A = [3, 18, 18, 17, 12, 17, 15, 14, 21, 13, 12, 17, 18, 8, 19, 22, 22, 17, 11, 20, 20, 12, 10, 9, 2];
                                    break;
                                case "australia":
                                    E = "au";
                                    A = [3, 21, 5, 15, 8, 6, 15, 13];
                                    break;
                                case "austria":
                                case "osterreich":
                                    E = "at";
                                    A = [15, 18, 30, 25, 24, 28, 22, 8, 4];
                                    break;
                                case "belgium":
                                    E = "be";
                                    A = [13, 6, 19, 28, 25, 29, 22, 29, 24, 16, 23];
                                    break;
                                case "brazil":
                                case "brasil":
                                    E = "br";
                                    A = [12, 8, 11, 34, 28, 13, 3, 5, 22, 19, 23, 18, 30, 34, 9, 11, 19, 17, 9, 10, 15, 13, 14, 12, 21, 6, 23];
                                    break;
                                case "canada":
                                    E = "ca";
                                    A = [8, 11, 10, 3, 19, 20, 6, 31, 17, 2, 21, 3, 12];
                                    break;
                                case "chile":
                                    E = "cl";
                                    A = [11, 4, 10, 13, 9, 8, 12, 7, 9, 7, 20, 7, 11, 7, 9];
                                    break;
                                case "colombia":
                                    E = "co";
                                    A = [22, 30, 8, 5, 6, 21, 21, 11, 30, 18, 23, 13, 23, 12, 17, 18, 16, 18, 11, 14, 23, 15, 12, 15, 5, 6, 2, 16, 11, 13, 14, 21, 14];
                                    break;
                                case "continents":
                                case "world-continents":
                                    E = "c";
                                    A = [20, 35, 19, 23, 35, 15, 3];
                                    break;
                                case "croatia":
                                    E = "hr";
                                    A = [24, 27, 36, 10, 15, 24, 20, 11, 26, 8, 21, 18, 21, 30, 28, 29, 13, 18, 21, 33, 35];
                                    break;
                                case "cuba":
                                    E = "cu";
                                    A = [8, 20, 18, 7, 12, 10, 4, 16, 9, 12, 11, 5, 14, 15, 11, 15];
                                    break;
                                case "czech-republic":
                                case "cesko":
                                    E = "cs";
                                    A = [5, 15, 21, 10, 18, 16, 12, 16, 25, 19, 14, 28, 14, 15];
                                    break;
                                case "denmark":
                                case "danmark":
                                    E = "dk";
                                    A = [15, 40, 37, 24, 30, 2];
                                    break;
                                case "danmarks-kommuner":
                                    E = "dkk";
                                    A = [9, 5, 14, 14, 10, 9, 7, 7, 6, 14, 16, 9, 8, 7, 9, 8, 8, 7, 7, 8, 6, 12, 11, 23, 11, 13, 7, 16, 6, 16, 16, 18, 25, 18, 17, 21, 11, 23, 5, 15, 24, 10, 19, 13, 18, 12, 24, 23, 24, 14, 26, 16, 18, 8, 16, 11, 18, 19, 17, 13, 5, 17, 14, 21, 6, 11, 18, 14, 12, 8, 11, 14, 5, 10, 9, 19, 11, 17, 12, 13, 22, 6, 9, 17, 22, 15, 18, 13, 10, 14, 13, 12, 11, 16, 16, 27, 20, 25];
                                    break;
                                case "europe":
                                    E = "eu";
                                    A = [5, 2, 9, 10, 5, 6, 7, 10, 4, 9, 9, 5, 15, 22, 7, 14, 12, 8, 7, 7, 2, 24, 2, 7, 2, 7, 2, 4, 3, 7, 2, 4, 8, 30, 12, 4, 11, 42, 6, 5, 5, 11, 26, 6, 10, 20, 17, 10, 2, 6, 9, 3];
                                    break;
                                case "europe-russia":
                                    E = "euru";
                                    A = [4, 2, 8, 14, 8, 7, 8, 13, 3, 10, 8, 6, 21, 20, 9, 14, 10, 10, 4, 6, 21, 5, 8, 2, 7, 2, 4, 2, 9, 2, 5, 5, 27, 14, 7, 12, 82, 2, 9, 8, 4, 18, 21, 8, 14, 25, 14, 6, 10, 45, 16, 32, 14, 18, 28];
                                    break;
                                case "finland":
                                    E = "fi";
                                    A = [8, 22, 28, 22, 26, 14, 15, 29, 15, 43, 21, 23, 28, 48, 24, 18, 15, 19, 18];
                                    break;
                                case "france":
                                    E = "fr";
                                    A = [13, 25, 25, 14, 27, 14, 25, 21, 8, 19, 12, 13, 28, 15, 18, 27, 11, 26, 17, 25, 24, 34, 2, 2, 2, 2, 2];
                                    break;
                                case "france-departments":
                                case "departements-francais":
                                    E = "frd";
                                    A = [10, 8, 9, 11, 9, 8, 11, 8, 9, 8, 11, 9, 7, 7, 7, 9, 15, 10, 9, 7, 7, 8, 7, 7, 10, 11, 8, 9, 10, 5, 13, 16, 11, 15, 10, 8, 9, 10, 12, 9, 10, 12, 10, 9, 11, 10, 10, 8, 7, 9, 8, 9, 10, 9, 11, 7, 7, 8, 9, 10, 5, 10, 8, 9, 6, 10, 5, 8, 6, 7, 8, 12, 9, 12, 7, 9, 9, 7, 5, 8, 7, 7, 8, 8, 7, 10, 10, 9, 10, 12, 3, 4, 9, 10, 10, 4, 2, 2, 2, 2, 2];
                                    break;
                                case "germany":
                                case "deutschland":
                                    E = "de";
                                    A = [31, 41, 7, 38, 6, 8, 38, 25, 64, 37, 24, 9, 25, 31, 20, 33];
                                    break;
                                case "baden-wurttemberg":
                                    E = "dea";
                                    A = [26, 8, 25, 16, 17, 29, 17, 14, 18, 13, 7, 15, 12, 6, 11, 25, 5, 18, 21, 6, 14, 11, 18, 13, 5, 16, 19, 15, 6, 21, 19, 14, 19, 20, 15, 16, 18, 22, 9, 14, 16, 7, 13, 15];
                                    break;
                                case "bayern":
                                    E = "deb";
                                    A = [8, 8, 16, 3, 17, 5, 10, 3, 9, 6, 10, 11, 17, 3, 17, 4, 9, 11, 12, 3, 9, 11, 7, 13, 14, 8, 14, 7, 2, 14, 8, 10, 9, 7, 6, 3, 8, 8, 13, 13, 4, 5, 2, 4, 12, 10, 6, 9, 10, 15, 4, 7, 4, 12, 4, 10, 7, 12, 13, 6, 6, 8, 14, 11, 15, 6, 12, 11, 19, 14, 3, 10, 11, 15, 3, 8, 16, 2, 14, 12, 3, 13, 14, 4, 6, 4, 14, 9, 14, 14, 4, 14, 11, 6, 14, 4];
                                    break;
                                case "berlin":
                                    E = "dec";
                                    A = [18, 15, 21, 15, 17, 18, 19, 17, 22, 16, 17, 25];
                                    break;
                                case "brandenburg":
                                    E = "ded";
                                    A = [16, 11, 8, 31, 16, 3, 16, 18, 20, 18, 25, 22, 4, 28, 15, 20, 23, 18];
                                    break;
                                case "bremen":
                                    E = "dee";
                                    A = [14, 11, 12, 8, 8, 17, 7, 12, 18, 14, 7, 31, 11, 11, 11, 8, 6, 12, 9, 10, 9, 8, 12, 8];
                                    break;
                                case "hamburg":
                                    E = "def";
                                    A = [14, 21, 17, 24, 23, 36, 23];
                                    break;
                                case "hessen":
                                    E = "deg";
                                    A = [13, 6, 14, 13, 14, 16, 12, 19, 13, 19, 4, 17, 12, 19, 10, 18, 8, 4, 9, 11, 21, 22, 15, 14, 21, 6];
                                    break;
                                case "mecklenburg-vorpommern":
                                    E = "deh";
                                    A = [28, 26, 15, 29, 8, 5, 19, 16];
                                    break;
                                case "niedersachsen":
                                    E = "dei";
                                    A = [10, 11, 4, 13, 14, 13, 3, 17, 4, 18, 11, 12, 11, 7, 9, 10, 9, 17, 10, 10, 13, 12, 11, 14, 13, 13, 12, 2, 15, 3, 9, 7, 9, 21, 17, 6, 8, 15, 11, 10, 9, 8, 3, 10, 12, 4];
                                    break;
                                case "nordrhein-westfalen":
                                    E = "dej";
                                    A = [12, 6, 5, 4, 15, 5, 16, 7, 6, 13, 6, 10, 7, 11, 4, 15, 7, 6, 10, 9, 4, 15, 12, 15, 9, 4, 5, 14, 12, 14, 8, 7, 4, 9, 12, 3, 12, 15, 16, 3, 13, 12, 18, 13, 11, 12, 6, 14, 11, 14, 14, 19, 7];
                                    break;
                                case "rheinland-pfalz":
                                    E = "dek";
                                    A = [16, 17, 20, 16, 19, 21, 16, 16, 16, 16, 4, 11, 19, 8, 5, 13, 7, 6, 7, 21, 27, 5, 14, 4, 19, 16, 15, 4, 23, 20, 9, 26, 17, 19, 6, 4];
                                    break;
                                case "saarland":
                                    E = "del";
                                    A = [21, 22, 26, 28, 29, 19];
                                    break;
                                case "sachsen":
                                    E = "dem";
                                    A = [24, 8, 9, 23, 19, 17, 8, 17, 27, 14, 18, 15, 17];
                                    break;
                                case "sachsen-anhalt":
                                    E = "den";
                                    A = [20, 25, 26, 14, 11, 6, 17, 19, 7, 21, 23, 23, 28, 12];
                                    break;
                                case "schleswig-holstein":
                                    E = "deo";
                                    A = [14, 4, 20, 8, 9, 5, 15, 18, 12, 14, 24, 26, 22, 12, 15];
                                    break;
                                case "thuringen":
                                    E = "dep";
                                    A = [8, 10, 5, 10, 6, 20, 21, 18, 15, 5, 19, 8, 16, 14, 21, 17, 10, 17, 8, 17, 21, 5, 17];
                                    break;
                                case "greece":
                                    E = "gr";
                                    A = [13, 24, 17, 13, 15, 16, 14, 5, 8, 16, 27, 21, 18, 13];
                                    break;
                                case "haiti":
                                    E = "ht";
                                    A = [31, 22, 14, 14, 23, 13, 15, 37, 16, 22];
                                    break;
                                case "hungary":
                                    E = "hu";
                                    A = [26, 12, 18, 19, 5, 11, 15, 15, 16, 18, 21, 9, 11, 27, 15, 19, 16, 13, 15, 12];
                                    break;
                                case "ireland":
                                    E = "ie";
                                    A = [44, 12, 44, 43, 49, 43, 29, 41];
                                    break;
                                case "ireland-counties":
                                    E = "iec";
                                    A = [19, 16, 18, 32, 25, 45, 4, 35, 21, 6, 6, 23, 12, 42, 4, 34, 21, 25, 20, 26, 26, 3, 21, 17, 15, 31, 33, 23, 25, 31, 30, 24, 8, 24, 33, 19, 2, 20, 21, 23];
                                    break;
                                case "italy":
                                case "italia":
                                    E = "it";
                                    A = [16, 12, 13, 18, 29, 10, 24, 16, 27, 15, 12, 22, 23, 9, 27, 28, 15, 14, 6, 24];
                                    break;
                                case "mexico":
                                    E = "mx";
                                    A = [3, 9, 10, 10, 12, 16, 13, 5, 3, 13, 7, 10, 7, 16, 7, 7, 4, 8, 12, 11, 8, 5, 7, 11, 13, 11, 11, 12, 3, 15, 8, 14];
                                    break;
                                case "netherlands":
                                case "nederland":
                                    E = "nl";
                                    A = [23, 18, 23, 34, 20, 16, 23, 22, 25, 23, 15, 24];
                                    break;
                                case "norway":
                                case "norge":
                                    E = "no";
                                    A = [10, 10, 14, 14, 13, 10, 13, 12, 19, 17, 3, 7, 10, 13, 16, 16, 9, 18, 7, 4];
                                    break;
                                case "norway-divided":
                                case "norge-delt":
                                    E = "nod";
                                    A = [15, 19, 21, 14, 23, 16, 17, 17, 21, 25, 3, 9, 15, 18, 26, 13, 15, 19, 12, 4];
                                    break;
                                case "poland":
                                case "polska":
                                    E = "pl";
                                    A = [31, 31, 28, 25, 36, 22, 47, 22, 28, 30, 30, 27, 24, 29, 46, 26];
                                    break;
                                case "portugal":
                                    E = "pt";
                                    A = [17, 28, 16, 15, 23, 26, 28, 15, 27, 23, 13, 24, 14, 32, 23, 8, 17, 22, 5, 3];
                                    break;
                                case "romania":
                                    E = "ro";
                                    A = [20, 22, 17, 16, 23, 13, 16, 16, 13, 6, 21, 23, 17, 21, 22, 16, 18, 19, 13, 16, 16, 23, 17, 15, 27, 14, 21, 25, 20, 23, 26, 12, 19, 18, 14, 18, 12, 31, 14, 20, 11, 14];
                                    break;
                                case "russia":
                                    E = "ru";
                                    A = [17, 36, 9, 39, 44, 16, 36, 23];
                                    break;
                                case "russia-central":
                                    E = "rua";
                                    A = [16, 17, 17, 24, 15, 16, 22, 16, 15, 7, 27, 12, 16, 20, 15, 26, 14, 17];
                                    break;
                                case "russia-far-eastern":
                                    E = "rub";
                                    A = [18, 5, 24, 16, 8, 33, 19, 27, 20];
                                    break;
                                case "russia-north-caucasian":
                                    E = "ruc";
                                    A = [32, 9, 13, 17, 12, 33, 18];
                                    break;
                                case "russia-northwestern":
                                    E = "rud";
                                    A = [48, 19, 6, 18, 34, 11, 16, 25, 9, 13, 3];
                                    break;
                                case "russia-siberian":
                                    E = "rue";
                                    A = [10, 10, 20, 16, 30, 10, 44, 12, 8, 12, 11, 7];
                                    break;
                                case "russia-southern":
                                    E = "ruf";
                                    A = [18, 27, 41, 46, 45, 43];
                                    break;
                                case "russia-ural":
                                    E = "rug";
                                    A = [12, 22, 20, 40, 15, 33];
                                    break;
                                case "russia-volga":
                                    E = "ruh";
                                    A = [30, 31, 13, 14, 20, 28, 13, 26, 18, 24, 21, 15, 16, 8];
                                    break;
                                case "slovakia":
                                case "slovensko":
                                    E = "sk";
                                    A = [33, 16, 29, 32, 27, 29, 32, 25];
                                    break;
                                case "south-africa":
                                    E = "za";
                                    A = [20, 19, 11, 14, 14, 21, 34, 24, 24];
                                    break;
                                case "south-america":
                                    E = "sam";
                                    A = [80, 30, 100, 52, 36, 21, 18, 6, 18, 44, 10, 13, 36, 6];
                                    break;
                                case "spain":
                                case "espana":
                                    E = "es";
                                    A = [18, 11, 12, 16, 14, 16, 23, 9, 12, 24, 12, 16, 2, 21, 19, 21, 15, 17, 11, 16, 17, 7, 12, 18, 14, 10, 13, 8, 19, 14, 14, 20, 2, 13, 12, 17, 11, 15, 8, 15, 7, 13, 18, 15, 11, 21, 25, 15, 14, 8, 12, 28];
                                    break;
                                case "spain-autonomies":
                                case "espana-autonomias":
                                    E = "esa";
                                    A = [24, 30, 12, 7, 12, 11, 48, 57, 17, 2, 24, 27, 14, 11, 16, 2, 18, 16, 12];
                                    break;
                                case "sweden":
                                case "sverige":
                                    E = "se";
                                    A = [7, 30, 20, 6, 13, 39, 14, 17, 13, 30, 11, 15, 7, 9, 11, 10, 19, 34, 28, 10, 18];
                                    break;
                                case "switzerland":
                                    E = "ch";
                                    A = [27, 12, 7, 22, 4, 61, 34, 11, 14, 35, 17, 24, 17, 12, 12, 10, 15, 31, 28, 22, 19, 16, 31, 47, 6, 20];
                                    break;
                                case "turkey":
                                case "turkiye":
                                    E = "tr";
                                    A = [16, 8, 12, 12, 7, 11, 19, 17, 7, 7, 9, 12, 5, 10, 6, 6, 8, 10, 8, 10, 10, 8, 9, 13, 13, 13, 6, 7, 10, 10, 18, 8, 11, 9, 10, 6, 6, 4, 11, 9, 13, 10, 8, 14, 8, 10, 13, 4, 6, 8, 9, 7, 23, 10, 12, 11, 9, 12, 13, 10, 7, 10, 8, 6, 8, 6, 10, 12, 8, 7, 16, 7, 8, 10, 6, 8, 6, 8, 3, 10, 5];
                                    break;
                                case "united-kingdom":
                                    E = "uk";
                                    A = [31, 23, 10, 18, 24, 28, 30, 31, 24, 9, 8, 9, 10, 12, 12, 14, 17, 8, 16, 23, 11, 6, 14, 17, 7, 28, 19, 14, 19, 20, 4];
                                    break;
                                case "uruguay":
                                    E = "uy";
                                    A = [17, 13, 25, 12, 28, 15, 21, 23, 17, 5, 22, 21, 22, 23, 20, 17, 21, 30, 20];
                                    break;
                                case "usa":
                                    E = "usa";
                                    A = [5, 6, 8, 6, 18, 2, 4, 5, 10, 9, 5, 11, 11, 4, 5, 5, 12, 6, 7, 9, 6, 9, 14, 7, 10, 10, 5, 14, 6, 7, 3, 10, 10, 3, 7, 6, 4, 5, 4, 8, 3, 6, 15, 3, 5, 10, 5, 3, 11, 8, 2, 2];
                                    break;
                                case "venezuela":
                                    E = "ve";
                                    A = [20, 17, 19, 8, 19, 29, 2, 4, 9, 18, 11, 5, 18, 15, 11, 6, 12, 3, 11, 8, 7, 6, 4, 8, 23];
                                    break;
                                case "zimbabwe":
                                    E = "zw";
                                    A = [8, 8, 47, 38, 47, 49, 49, 62, 54, 54];
                                    break
                                }
                                for (var y = 0; y < A.length; y++) {
                                    var D = y + 1;
                                    if (z == E + D) {
                                        for (var F = 1; F < A[y]; F++) {
                                            w += '<span class="s' + F + '" />'
                                        }
                                        break
                                    }
                                }
                                w += "</span>";
                                x.prepend(w).append('<span class="bg" />')
                            },
                            showTooltip: function (y) {
                                var B = i.find(y).children("a")[0];
                                if (q == "true" || q == "sticky" || q == "visible") {
                                    var x = i.outerWidth(),
                                        C = parseInt(a(B).outerHeight() * -1) - c.tooltipArrowHeight,
                                        z = parseInt(a(B).outerHeight() / -2),
                                        F = parseInt(a(B).outerWidth() / -2),
                                        E = a(B).position().left,
                                        A = a(B).position().top;
                                    if ((F * -1) > E) {
                                        a(B).addClass("tooltip-left").css("left", 0);
                                        F = 0
                                    }
                                    if ((F * -1) + E > x) {
                                        a(B).addClass("tooltip-right");
                                        F = 0
                                    }
                                    if ((C * -1) > A) {
                                        a(B).addClass("tooltip-top");
                                        C = c.tooltipArrowHeight
                                    }
                                    if (a(B).hasClass("tooltip-middle")) {
                                        C = z
                                    }
                                    B.style.marginLeft = F + "px";
                                    if (q == "visible") {
                                        B.style.marginTop = z + "px"
                                    } else {
                                        B.style.marginTop = C + "px"
                                    }
                                } else {
                                    if (q.split("-")[0] == "floating") {
                                        var w = a(B).html(),
                                            D = a("<div />", {
                                                id: "map-tooltip",
                                                html: w
                                            }).appendTo("body")
                                    }
                                }
                            },
                            hideTooltips: function () {
                                var z = i.find("a");
                                a("#map-tooltip").remove();
                                for (var x = 0; x < z.length; x++) {
                                    var w = z[x],
                                        y = parseInt(a(w).outerWidth() / -2),
                                        A = parseInt(a(w).outerHeight() / -2);
                                    if (q == "visible") {
                                        w.style.marginTop = A + "px";
                                        w.style.marginLeft = y + "px"
                                    } else {
                                        w.style.marginTop = "-9999px"
                                    }
                                }
                            },
                            copyList: function (x, y, z, w) {
                                var A = z.html();
                                if (typeof w != "undefined" && w.length >= 2) {
                                    l += '<li class="' + y + '"><a href="' + w + '">' + A + "</a></li>"
                                }
                            },
                            createList: function (w) {
                                a(i).after('<ul class="map-visible-list">' + w + "</ul>")
                            },
                            autoSelectRegion: function () {
                                var w = k.find(".active-region"),
                                    x = s + " ." + w.parent("li").attr("class");
                                if (w.length) {
                                    p.selectRegion.activated(a(x))
                                }
                            }
                        },
                        selectRegion: {
                            init: function (w, x, B) {
                                var z = p.selectRegion,
                                    x = s + " ." + x,
                                    A = a(x).children("span").eq(0),
                                    y = null;
                                z.autoSelect(B);
                                A.hover(function () {
                                    z.onHover(a(x))
                                }, function () {
                                    z.unHover(a(x))
                                }).mousemove(function (C) {
                                    if (q.split("-")[0] == "floating") {
                                        z.onMouseMove(a(x), C)
                                    }
                                }).click(function (C) {
                                    z.clicked(a(x));
                                    C.preventDefault()
                                });
                                a(B).focus(function () {
                                    z.onHover(a(x))
                                }).blur(function () {
                                    z.unHover(a(x))
                                }).keypress(function (C) {
                                    y = (C.keyCode ? C.keyCode : C.which);
                                    if (y === 13) {
                                        z.clicked(a(x))
                                    }
                                }).click(function (C) {
                                    z.clicked(a(x));
                                    C.preventDefault()
                                })
                            },
                            initVisibleList: function () {
                                var x = p.selectRegion,
                                    w = a(s + " .map-visible-list").find("li");
                                w.each(function () {
                                    var z = a(this).children("a"),
                                        y = s + " ." + a(this).attr("class");
                                    z.hover(function () {
                                        x.onHover(a(y))
                                    }, function () {
                                        x.unHover(a(y))
                                    }).focus(function () {
                                        x.onHover(a(y))
                                    }).blur(function () {
                                        x.unHover(a(y))
                                    }).click(function () {
                                        x.clicked(a(y));
                                        return false
                                    }).keypress(function () {
                                        code = (e.keyCode ? e.keyCode : e.which);
                                        if (code === 13) {
                                            x.clicked(a(y));
                                            return false
                                        }
                                    })
                                })
                            },
                            onHover: function (x) {
                                var w = x.children("a").eq(0).attr("href");
                                p.regions.hideTooltips();
                                p.regions.showTooltip(x);
                                x.addClass("focus");
                                c.onHover(x);
                                if (c.agentsListOnHover) {
                                    p.agentslist.showAgent(w)
                                }
                            },
                            onMouseMove: function (B, C) {
                                var F = a("#map-tooltip").eq(0),
                                    z = c.tooltipArrowHeight,
                                    w = 10,
                                    E = 15 + z,
                                    A = a(F).outerHeight(),
                                    G = a(F).outerWidth(),
                                    x = a(window).scrollTop(),
                                    y = C.pageY - A - z,
                                    D = C.pageX - (G / 2);
                                if (z < 3) {
                                    z = 3
                                }
                                switch (q) {
                                case "floating-left":
                                case "floating-left-top":
                                case "floating-top-left":
                                    if (C.clientX - G <= w) {
                                        D = C.pageX + w
                                    } else {
                                        D = C.pageX - G - w
                                    }
                                    break;
                                case "floating-right":
                                case "floating-right-top":
                                case "floating-top-right":
                                    if (f <= C.clientX + G + w) {
                                        D = C.pageX - G - w
                                    } else {
                                        D = C.pageX + w
                                    }
                                    break;
                                case "floating-middle":
                                case "floating-middle-right":
                                case "floating-right-middle":
                                    if (f <= C.clientX + G + w) {
                                        D = C.pageX - G - w
                                    } else {
                                        D = C.pageX + w
                                    } if (x >= C.pageY - (A / 2) - z) {
                                        y = C.pageY + E - z
                                    } else {
                                        if (C.clientY + (A / 2) >= b) {
                                            y = C.pageY - A - z
                                        } else {
                                            y = C.pageY - (A / 2)
                                        }
                                    }
                                    break;
                                case "floating-middle-left":
                                case "floating-left-middle":
                                    if (C.clientX - G <= w) {
                                        D = C.pageX + w
                                    } else {
                                        D = C.pageX - G - w
                                    } if (x >= C.pageY - (A / 2) - z) {
                                        y = C.pageY + E - z
                                    } else {
                                        if (C.clientY + (A / 2) >= b) {
                                            y = C.pageY - A - z
                                        } else {
                                            y = C.pageY - (A / 2)
                                        }
                                    }
                                    break;
                                case "floating-bottom-left":
                                case "floating-left-bottom":
                                    if (C.clientX - G < w) {
                                        D = C.pageX + w
                                    } else {
                                        D = C.pageX - G - w
                                    }
                                    y = C.pageY + E;
                                    break;
                                case "floating-bottom":
                                case "floating-bottom-center":
                                case "floating-center-bottom":
                                    if (C.clientX - (G / 2) + w <= w) {
                                        D = C.pageX + w
                                    } else {
                                        if (f <= C.clientX + (G / 2)) {
                                            D = C.pageX - G - w
                                        } else {
                                            D = C.pageX - (G / 2)
                                        }
                                    }
                                    y = C.pageY + E;
                                    break;
                                case "floating-bottom-right":
                                case "floating-right-bottom":
                                    if (f <= C.clientX + G + w) {
                                        D = C.pageX - G - w
                                    } else {
                                        D = C.pageX + w
                                    }
                                    y = C.pageY + E;
                                    break;
                                default:
                                    if (C.clientX - (G / 2) + w <= w) {
                                        D = C.pageX + w
                                    } else {
                                        if (f <= C.clientX + (G / 2)) {
                                            D = C.pageX - G - w
                                        } else {
                                            D = C.pageX - (G / 2)
                                        }
                                    }
                                }
                                if (x >= C.pageY - A - z) {
                                    y = C.pageY + E
                                }
                                if (C.clientY + A + E >= b) {
                                    y = C.pageY - A - z
                                }
                                F.css({
                                    left: D + "px",
                                    top: y + "px"
                                })
                            },
                            unHover: function (x) {
                                var w = x.children("a").eq(0).attr("href");
                                p.regions.hideTooltips();
                                x.removeClass("focus");
                                if (c.agentsListOnHover) {
                                    p.agentslist.hideAgents(w);
                                    a(i).find(".active-region").each(function () {
                                        var y = a(this).children("a").eq(0).attr("href");
                                        p.agentslist.showAgent(y)
                                    })
                                }
                                c.unHover(x)
                            },
                            activated: function (B) {
                                var A = c.clicksLimitAlert.split(" %d ")[0],
                                    y = c.clicksLimitAlert.split(" %d ")[1],
                                    z = B.children("a").eq(0),
                                    w = z.attr("href"),
                                    x = "";
                                if (c.clicksLimit == 0 || !c.multipleClick) {
                                    c.clicksLimit = Infinity
                                }
                                if (c.clicksLimit == 1) {
                                    x = y.split(" || ")[0]
                                } else {
                                    x = y.split(" || ")[1]
                                } if (B.hasClass("active-region")) {
                                    p.agentslist.hideAgents(w);
                                    B.removeClass("active-region");
                                    n--;
                                    r = false
                                } else {
                                    if (!c.multipleClick) {
                                        k.find(".active-region").removeClass("active-region")
                                    }
                                    if (n < c.clicksLimit) {
                                        if (a(c.agentsListId).length && w.charAt(0) == "#") {
                                            p.agentslist.showAgent(w)
                                        }
                                        B.addClass("active-region");
                                        n++
                                    } else {
                                        alert(A + " " + c.clicksLimit + " " + x);
                                        r = true
                                    }
                                }
                            },
                            clicked: function (A) {
                                var y = A.children("a").eq(0),
                                    x = y.attr("href"),
                                    z = y.attr("target"),
                                    w = y.attr("rel");
                                p.selectRegion.activated(A);
                                if (r == false) {
                                    if (A.hasClass("active-region")) {
                                        c.onClick(A)
                                    } else {
                                        c.onSecondClick(A)
                                    } if (typeof z !== "undefined" && z !== false) {
                                        window.open(x, z)
                                    } else {
                                        if (x !== undefined && x.charAt(0) === "#") {
                                            if (a(c.agentsListId).length || c.multipleClick) {
                                                return false
                                            } else {
                                                if (w != "nofollow") {
                                                    window.location.hash = x
                                                }
                                                else {
                                                    showTarget(y);
                                                }
                                            }
                                        } else {
                                            if (w != "nofollow") {
                                                window.location.href = x
                                            } else {
                                                showTarget(y);
                                                return false
                                            }
                                        }
                                    }
                                }
                            },
                            multiple: function () {
                                var w = [],
                                    x = k.find(".map-search-link");
                                t.each(function () {
                                    var A = a(this).children("a"),
                                        z = A.attr("href"),
                                        y;
                                    if (z !== undefined && z.charAt(0) == "#") {
                                        y = z.slice(1)
                                    } else {
                                        if (/&/i.test(z)) {
                                            y = z.slice(z.indexOf("?") + (c.searchLinkVar.length) + 2, z.indexOf("&"))
                                        } else {
                                            y = z.slice(z.indexOf("?") + (c.searchLinkVar.length) + 2)
                                        }
                                    } if (a(this).hasClass("active-region")) {
                                        w.push(y)
                                    }
                                });
                                if (w.length) {
                                    x.attr("href", c.searchUrl + "?" + c.searchLinkVar + "=" + w.join(c.searchLinkSeparator))
                                } else {
                                    x.attr("href", c.searchUrl)
                                }
                            },
                            autoSelect: function (y) {
                                var x = y.attr("href"),
                                    w = window.location.hash;
                                if (x !== undefined && x.charAt(0) == "#" && x == w) {
                                    y.addClass("active-region");
                                    return false
                                }
                            }
                        },
                        searchButton: function () {
                            var w = p.selectRegion,
                                x = a("<a />", {
                                    href: c.searchUrl,
                                    "class": "map-search-link",
                                    text: c.searchLink
                                });
                            a(i).after(x);
                            x.hover(function () {
                                w.multiple()
                            }).focus(function () {
                                w.multiple()
                            }).click(function () {
                                w.multiple()
                            }).keypress(function () {
                                code = (e.keyCode ? e.keyCode : e.which);
                                if (code == 13) {
                                    w.multiple()
                                }
                            })
                        },
                        agentslist: {
                            init: function () {
                                a(i).find(".active-region").each(function () {
                                    var w = a(this).children("a").eq(0).attr("href");
                                    p.agentslist.showAgent(w)
                                })
                            },
                            showAgent: function (w) {
                                if (!c.multipleClick) {
                                    a(c.agentsListId).find("li").hide()
                                }
                                if (!c.agentsListOnHover) {
                                    a(w + "," + w + " li").fadeIn(c.agentsListSpeed)
                                } else {
                                    a(w + "," + w + " li").show()
                                }
                            },
                            hideAgents: function (w) {
                                if (!c.agentsListOnHover) {
                                    a(w + "," + w + " li").fadeOut(c.agentsListSpeed)
                                } else {
                                    a(w + "," + w + " li").hide()
                                }
                            }
                        },
                        pins: {
                            init: function () {
                                var y = k.position().top,
                                    w = a(i).position().left,
                                    z = a(i).outerWidth(),
                                    x = parseInt(z / -2),
                                    A = a(i).outerHeight(),
                                    B = {
                                        height: A,
                                        left: "50%",
                                        marginLeft: x,
                                        position: "absolute",
                                        top: y,
                                        width: z
                                    };
                                a(m).css(B);
                                d.each(function () {
                                    var R = a(this);
                                    p.pins.pinContent(R);
                                    var E = R.find("." + c.pins.markerClass).eq(0),
                                        C = R.find("." + c.pins.pinTooltipClass).eq(0),
                                        S = E.attr("href"),
                                        N = R.attr("data-cssmap-coords").split(","),
                                        O = parseInt(N[0]),
                                        L = parseInt(N[1]),
                                        G = E.outerWidth(),
                                        M = parseInt(G / -2),
                                        Q = parseInt(E.outerHeight()),
                                        P = C.outerHeight(),
                                        D = C.outerWidth(),
                                        K = parseInt(D / -2),
                                        H = function () {
                                            switch (c.pins.markerPosition) {
                                            case "middle":
                                                var T = L - (Q / 2);
                                                break;
                                            case "bottom":
                                                var T = L;
                                                break;
                                            default:
                                                var T = L - Q;
                                                break
                                            }
                                            return T
                                        },
                                        J = function () {
                                            switch (c.pins.tooltipPosition) {
                                            case "hidden":
                                                var T = "-9999em";
                                                break;
                                            case "bottom":
                                                var T = H() + Q;
                                                break;
                                            default:
                                                var T = H() - P;
                                                break
                                            }
                                            return T
                                        },
                                        F = {
                                            left: O,
                                            marginLeft: M,
                                            position: "absolute",
                                            textAlign: "center",
                                            top: H(),
                                            zIndex: 200
                                        },
                                        I = {
                                            display: "block",
                                            left: O,
                                            marginLeft: K,
                                            marginTop: "-9999em",
                                            opacity: 0,
                                            position: "absolute",
                                            top: J(),
                                            zIndex: 201
                                        };
                                    E.css(F);
                                    C.css(I);
                                    if (c.pins.tooltipOnClick) {
                                        E.click(function () {
                                            if (R.hasClass("hide-tooltip")) {
                                                p.pins.pinClose(R, E, C)
                                            } else {
                                                p.pins.pinOpen(R, E, C)
                                            }
                                        })
                                    } else {
                                        E.hover(function () {
                                            p.pins.pinOpen(R, E, C)
                                        }, function () {
                                            p.pins.pinClose(R, E, C)
                                        })
                                    }
                                    E.click(function () {
                                        if (S !== undefined && S.charAt(0) == "#") {
                                            return false
                                        }
                                    })
                                })
                            },
                            pinContent: function (z) {
                                var w = z.find("." + c.pins.pinTooltipClass),
                                    y = z.find("." + c.pins.markerClass);
                                if (!w.length) {
                                    z.wrapInner(a("<div />").addClass(c.pins.pinTooltipClass).hide())
                                } else {
                                    w.hide()
                                } if (!y.length) {
                                    var x = a("<a />", {
                                        "class": c.pins.markerClass,
                                        href: "#",
                                        text: "pin"
                                    }).appendTo(z)
                                }
                            },
                            pinOpen: function (y, w, x) {
                                a(m).find(".hide-tooltip").each(function () {
                                    var B = a(this),
                                        z = B.find("." + c.pins.markerClass),
                                        A = B.find("." + c.pins.pinTooltipClass),
                                        C = z.outerWidth();
                                    p.pins.pinClose(B, z, A)
                                });
                                y.addClass("hide-tooltip");
                                x.css("margin-top", 0).animate({
                                    opacity: 1
                                }, c.pins.tooltipFadeSpeed)
                            },
                            pinClose: function (y, w, x) {
                                y.removeClass("hide-tooltip");
                                x.animate({
                                    opacity: 0
                                }, c.pins.tooltipFadeSpeed, function () {
                                    a(this).css("margin-top", "-9999em")
                                })
                            }
                        },
                        clearMap: function () {
                            for (var w = 100; w < 2050; w += 5) {
                                v += " m" + w
                            }
                            k.removeClass(v).removeClass("css-map-container");
                            a(i).removeClass("css-map");
                            k.find(".map-loader, .cities, .m, .bg, .map-visible-list, .map-search-link").remove();
                            k.find("li").removeClass("focus").removeClass("active-region")
                        }
                    };
                p.init()
            })
        } else {
            return this.html("<b>Error:</b> map size must be set!")
        }
    }
})(jQuery);