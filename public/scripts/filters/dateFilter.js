angular.module("app")
    .filter("date", function() {
        return function(input) {
            return moment(input).format("DD/MM/YY");
        }
    });