/**
 * Created by Tam Le on 06/06/2016.
 */
app.controller('giohangctrl',function($scope,$firebaseArray,$firebaseObject,$window){
    var ref = new Firebase("https://test-hosting-app.firebaseio.com/giohang");
    $scope.arrr= $firebaseArray(ref);

    $scope.Update=function() {

        //console.log($scope.arrr);
        angular.forEach($scope.arrr, function (value) {
            //alert("abc");
            console.log(value.tenuser);
        });
    }
});