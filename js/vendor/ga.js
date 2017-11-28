(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', '', 'auto');

var finder = '/baby2017';
// var finder = '';

function gapage(page) {
    ga('send', 'pageview', page);
}
function gaclick(evt) {
    ga('send', 'event', 'click', evt);
}
function trackWaitJump(event, url) {
    setTimeout(function () {
        location.href = url;
    }, 100);
    gaclick(event);
}
function routeJump(event, name) {
    setTimeout(function () {
        location.pathname = finder + '/' + name;
    }, 100);
    if(event) gaclick(event);
}