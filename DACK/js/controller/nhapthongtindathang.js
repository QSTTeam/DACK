/**
 * Created by Tam Le on 05/06/2016.
 */
app.controller("myNhapthongtinCtrl", function($scope,$firebaseArray, $firebaseObject,$firebaseAuth,$window) {
    $scope.loginindex=function(){
        $window.location.href = "login.html";
    };
    $scope.islogin=false;
    $scope.isadmin=false;
    $window.onload=function()

    {

        var x=sessionStorage.getItem("LOGIN");
        var y=JSON.parse(x);
        $scope.islogin=y.login;
        $scope.isadmin=y.loginadmin;
        $scope.tentaikhoan = y.user;

    }

    $scope.logout=function(){
        if($scope.isloginfbgg){
            $scope.authObj.$unauth();
            $scope.islogin=false;
            $scope.isloginfbgg=false;

        }
        else{
            //xữ lý code


        }
        var ob={
            user:"",
            login:false,
            loginadmin:false
        }
        sessionStorage.setItem("LOGIN", JSON.stringify(ob));
        $window.location.href="index.html";
    };
});