describe('app.employee', function () {
    var scope, controller;
    
    beforeEach(function () {
        angular.mock.module('app');
    });

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        controller = $controller('employeeController', { $scope: scope });
    }));

    describe('Employee controller', function () {
        it('should be created successfully', function () {
            expect(controller).toBeDefined();
        });
        it('should have correct name', function () {
            expect(controller.greet()).toBe('Hello Rupesh');
        });
    });
});