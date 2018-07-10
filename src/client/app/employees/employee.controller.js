app.controller('employeeController', function ($scope) {
    $scope.name = "Rupesh";
    this.greet = function () {
        return 'Hello ' + $scope.name;
    }
});
