var app = angular.module("appSaleb", ["firebase"]);
var ref = new Firebase("https://dack-app.firebaseio.com/")
app.controller("customersCtrl", function($scope,$firebaseArray, $firebaseObject,$firebaseAuth,$window) {
   $scope.datalaptop = $firebaseObject(ref.child("data").child("laptop"));
});

