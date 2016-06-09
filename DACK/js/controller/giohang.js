/**
 * Created by Hoang Son on 6/7/2016.
 */

app.controller('giohangctrl',function($scope,$firebaseArray,$firebaseObject,$window){

    var ref=new Firebase("https://dack-app.firebaseio.com/giohang");
    $scope.arrr=$firebaseArray(ref);
    //var tentaikhoan = "tamle12345";

    $scope.arr=[];

    $scope.islogin=false;
    $scope.isadmin=false;
    $scope.idhang = "";
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
                $scope.idhang=value.$id.toString();
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

    $scope.Xoahang=function(maid){
        var strid="https://dack-app.firebaseio.com/giohang/"+$scope.idhang+"/hang/"+maid.toString();

        var temp=new Firebase(strid);
        //console.log(strid);
        temp.remove();
    };

});
