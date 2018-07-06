function handleTemplate($templateCache) {
    $templateCache.put("./app/employee.view.html", "<div><h1>Employee Detail</h1>Hello {{name}}</div>");
}
angular.module('app').run(['$templateCache', handleTemplate]);