

index.controller("customersCtrl", function($scope,$firebaseArray, $firebaseObject,$firebaseAuth,$window) {
   var ref = new Firebase("https://dack-app.firebaseio.com/")
   $scope.datalaptop = $firebaseObject(ref.child("data").child("laptop"));
});

