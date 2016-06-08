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
    
    $scope.dathang = function(){
      $scope.today = $filter('date')(new Date(), 'dd/MM/yyyy');
         var refgiohang=new Firebase("https://dack-app.firebaseio.com/giohang");
         var dathangref=new Firebase("https://dack-app.firebaseio.com/dathang");
         $scope.mangdathang= $firebaseArray(dathangref);
        $scope.giohang=$firebaseArray(refgiohang);
         $scope.hang =[];
      angular.forEach($scope.giohang,function(value) {

               if (value.tenuser == $scope.tentaikhoan)
               {
                  var strid="https://dack-app.firebaseio.com/giohang/"+value.$id.toString()+"/hang";

                   $scope.hang=new Firebase(strid);
                  
              }
          });
          //$scope.tongtien = 0;
          var tongtien = 0;
          angular.forEach($scope.hang,function(value){
                var gia = value.gia;
                var a = gia.subsubstring(0,gia.length-1);
                a = a.replace('.','');
                a = a.replace('.','');
                a = a.replace('.','');
                tongtien =tongtien + parseInt(a);
                //$scope.tongtien = $scope.tongtien + a;
          });
          $scope.mangdathang.$add({
            tentk:$scope.tentaikhoan,
            tenkh:$scope.ten,
            diachi:$scope.diachinha,
            sdt:$scope.sdt,
            ngaydat:$scope.today,
            hang : $scope.hang,
            tongtien: tongtien
          });
    };
});