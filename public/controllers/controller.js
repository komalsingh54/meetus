/**
 * Created by Komal on 26/04/15.
 */
var myApp=angular.module('myapp',[]);
myApp.controller('AppCtrl',['$scope','$http', function($scope,$http){
    console.log("Hello World");
    var refresh= function () {
        $http.get('/contactlist').success(function (response) {
            console.log('i recieved the Data');
            $scope.contactlist = response;
            $scope.contact="";
        });
    }
    refresh();
    $scope.addContact=function()
    {
        console.log($scope.contact);
        $http.post('/contactlist',$scope.contact).success(function(response)
        {
            console.log(response);
            refresh();
        });
    }
    $scope.remove=function(id)
    {
        console.log(id);
        $http.delete('/contactlist/'+id).success(function (response) {
            refresh();
        });
    }
    $scope.edit=function(id)
    {
        console.log(id);
        $http.get('/contactlist/'+id).success(function (response) {
            $scope.contact=response;
        });
    }
    $scope.update=function(){
        console.log($scope.contact._id);
        $http.put('/contactlist/'+$scope.contact._id,$scope.contact).success(function (response) {
            refresh();
        });
    }
    $scope.clear= function () {
        $scope.contact="";
    }
}]);