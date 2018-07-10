function employeeDirective() {
    return {
        templateUrl: "app/employees/employee.view.html",
        controller: 'employeeController',
        controllerAs: 'vm',
        scope: {}
    };
}

app.directive('employee', [employeeDirective]);

