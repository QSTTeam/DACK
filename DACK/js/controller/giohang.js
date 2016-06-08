/**
 * Created by Hoang Son on 6/7/2016.
 */

app.controller('giohangctrl',function($scope,$firebaseArray,$firebaseObject,$window){

    var ref=new Firebase("https://dack-app.firebaseio.com/giohang");
    $scope.arrr=$firebaseArray(ref);
    //var tentaikhoan = "tamlegay";

    $scope.arr=[];

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
    $scope.update=function()
    {
        angular.forEach($scope.arrr,function(value) {

            if (value.tenuser == $scope.tentaikhoan)
            {
                var strid="https://dack-app.firebaseio.com/giohang/"+value.$id.toString()+"/hang";

                var temp=new Firebase(strid);
                $scope.arr=$firebaseArray(temp);

                console.log($scope.arr);
            }
        });
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

    $scope.thanhtoan=function(){
        $window.location.href="nhapthongtindathang.html";
    }

});
