/**
 * Created by Tam Le on 05/06/2016.
 */
app.controller("myNhapthongtinCtrl", function($scope,$firebaseArray, $firebaseObject,$firebaseAuth,$window) {
    $scope.loginindex=function(){
        $window.location.href = "login.html";
    };

});