function employeeDirective() {
    return {
        templateUrl: "./app/employee.view.html",
        controller: 'ctrl',
        controllerAs: 'vm',
        scope: {}
    };
}

app.directive('employee', [employeeDirective]);

