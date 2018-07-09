function employeeDirective() {
    return {
        templateUrl: "app/employees/employee.view.html",
        controller: 'ctrl',
        controllerAs: 'vm',
        scope: {}
    };
}

app.directive('employee', [employeeDirective]);

