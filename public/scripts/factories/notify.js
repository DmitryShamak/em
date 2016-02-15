angular.module("app")
    .factory("notify", function($document, $timeout) {
        var notify = {};
        notify.show = function(attrs) {
            var elem = $("<div class='text-center animated fadeInDown notify'></div>");
            elem.text(attrs.text);
            elem.addClass("alert alert-" + (attrs.type || "info") );

            $('body').append(elem);

            $timeout(function() {
                notify.hide(elem);
            }, 3000);
        };
        notify.hide = function(elem) {
            elem.hide().delay(200).remove();
        };

        return notify;
    });