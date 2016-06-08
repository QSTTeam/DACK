/**
 * Created by Tam Le on 05/06/2016.
 */
app.controller("myNhapthongtinCtrl", function($scope,$firebaseArray, $firebaseObject,$firebaseAuth,$window,$filter) {
   $scope.hang = [];
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
    var ref=new Firebase("https://dack-app.firebaseio.com/giohang");
    $scope.arrr=$firebaseArray(ref);
    $scope.datshow = false;
    $scope.tongshow = false;
    
    $scope.dathang = function(){  
      $scope.datshow = true;
      $scope.today = $filter('date')(new Date(), 'dd/MM/yyyy');
         var refgiohang=new Firebase("https://dack-app.firebaseio.com/giohang");
         var dathangref=new Firebase("https://dack-app.firebaseio.com/dathang");
         $scope.mangdathang= $firebaseArray(dathangref);
        $scope.giohang=$firebaseArray(refgiohang);
        
         angular.forEach($scope.arrr,function(value) {

            if (value.tenuser == $scope.tentaikhoan)
            {
                //alert(value.tenuser);
                var strid="https://dack-app.firebaseio.com/giohang/"+value.$id.toString()+"/hang";      
                var temp=new Firebase(strid);
                $scope.hang=$firebaseArray(temp);
                $scope.tongshow = true;
            }
        });
//            angular.forEach($scope.giohang,function(value) {
//                
//               if (value.tenuser == $scope.tentaikhoan)
//               {
//                  var strid="https://dack-app.firebaseio.com/giohang/"+value.$id.toString()+"/hang";
//
//                   var temp=new Firebase(strid);
//                  $scope.hang = $firebaseArray(temp);
//                  
//              }
//          });
          
          //$scope.tongtien = 0;
          //var tongtien = 0;
          angular.forEach($scope.hang,function(value) {
              alert(value.price);
          });
//          angular.forEach($scope.hang,function(value){
//              alert("sfsa");
//                var gia = value.price;
//                
//                var a = gia.subsubstring(0,gia.length-1);
//                a = a.replace('.','');
//                a = a.replace('.','');
//                a = a.replace('.','');
//                tongtien =tongtien + parseInt(a);
//                //$scope.tongtien = $scope.tongtien + a;
//          });
//          $scope.mangdathang.$add({
//            tentk:$scope.tentaikhoan,
//            tenkh:$scope.ten,
//            diachi:$scope.diachinha,
//            sdt:$scope.sdt,
//            ngaydat:$scope.today,
//            hang : $scope.hang,
//            tongtien: tongtien
//          });
    };
    
    $scope.dat = function(){
        var tongtien = 0;
        angular.forEach($scope.hang,function(value) {
                var gia = value.price;
                
                var a = gia.substring(0,gia.length-1);
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
            tongtien: tongtien,
            thanhtoan: "Chưa thanh toán"        
          });
          alert("Đặt hàng thành công !");
    };
});