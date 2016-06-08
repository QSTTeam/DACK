var laptopref = new Firebase("https://dack-app.firebaseio.com/data/laptop");
var chuotref = new Firebase("https://dack-app.firebaseio.com/data/chuot");
var usbref = new Firebase("https://dack-app.firebaseio.com/data/usb");
var ramref = new Firebase("https://dack-app.firebaseio.com/data/ram");
var ocungref = new Firebase("https://dack-app.firebaseio.com/data/ocung");
//angular.module('MoreProducts',["firebase"])
// .controller('ProductController', ['$scope', function($scope,$firebaseArray) {

app.controller("ProductController", function($scope,$firebaseArray, $firebaseObject,$firebaseAuth,$window) {
    $scope.laptopRef = $firebaseArray(laptopref);
    $scope.chuotRef = $firebaseArray(chuotref);
    $scope.usbRef = $firebaseArray(usbref);
    $scope.ramRef = $firebaseArray(ramref);
    $scope.ocungRef = $firebaseArray(ocungref);
   $scope.plushlaptop = false;
   $scope.plushchuot = false; 
   $scope.plushusb = false; 
   $scope.plushocung = false; 
   $scope.plushram = false;
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
    $scope.DataSelecteds = [{id:1,name:"Laptop"},{id:2,name:"Chuột"},{id:3,name:"Usb"},{id:4,name:"Ổ cứng"},{id:5,name:"Ram"}];
  $scope.clears = function(){
            $scope.ten = "";
            $scope.hang = "";
            $scope.manhinh = "";
            $scope.cpu = "";
            $scope.ram = "";
            $scope.hdh = "";
            $scope.vga = "";
            $scope.gia = "";
            $scope.img = "";
            $scope.nsx = "";
            $scope.dpi = "";
            $scope.loai = "";
            $scope.size = "";
            $scope.model = "";
            $scope.dungluong = "";
            $scope.tocdodoc = "";
            $scope.cong = "";
            $scope.tocdoghi = "";
            $scope.bus = "";
            $scope.tocdo = "";
        };
    $scope.changedValue = function(item) {
      if(item.id == 1){
        $scope.plushlaptop = true;
        $scope.plushchuot = false; 
        $scope.plushusb = false; 
        $scope.plushocung = false; 
        $scope.plushram = false; 
        $scope.clears();
      }
      if(item.id == 2){
        $scope.plushlaptop = false;
        $scope.plushchuot = true; 
        $scope.plushusb = false; 
        $scope.plushocung = false; 
        $scope.plushram = false;
        $scope.clears();
      }
      if(item.id == 3){
        $scope.plushlaptop = false;
        $scope.plushchuot = false; 
        $scope.plushusb = true; 
        $scope.plushocung = false; 
        $scope.plushram = false;
        $scope.clears();
      }
      if(item.id == 4){
        $scope.plushlaptop = false;
        $scope.plushchuot = false; 
        $scope.plushusb = false; 
        $scope.plushocung = true; 
        $scope.plushram = false; 
        $scope.clears();
      }
      if(item.id == 5){
        $scope.plushlaptop = false;
        $scope.plushchuot = false; 
        $scope.plushusb = false; 
        $scope.plushocung = false; 
        $scope.plushram = true; 
        $scope.clears();
      }        
        $scope.dangkilaptop = function () {           
       $scope.laptopRef.$add({
                  ten: $scope.ten,
                  hang: $scope.hang,
                  manhinh: $scope.manhinh,
                  cpu: $scope.cpu,
                  ram: $scope.ram,
                  hdh: $scope.hdh,
                  vag: $scope.vga,
                  gia: $scope.gia,
                  img: $scope.img
       });  
            alert("Thêm thành công");
            $scope.clears();
	}; 
        $scope.dangkichuot = function(){
            $scope.chuotRef.$add({
            ten: $scope.ten,
            nsx : $scope.nsx,
            dpi : $scope.dpi,
            loai : $scope.loai,
            size : $scope.size,
            model :$scope.model,
            cong : $scope.cong,
            gia : $scope.gia,
            img : $scope.img
            });
            alert("Thêm thành công");
            $scope.clears();
        };
        $scope.dangkiusb = function(){
            $scope.usbRef.$add({
            ten: $scope.ten,
            nsx : $scope.nsx,
            dungluong : $scope.dungluong,
            tocdodoc : $scope.tocdodoc,
            size : $scope.size,
            model :$scope.model,
            cong : $scope.cong,
            tocdoghi : $scope.tocdoghi,
            gia : $scope.gia,
            img : $scope.img
            });
            alert("Thêm thành công");
            $scope.clears();
        };
        $scope.dangkiram = function(){
            $scope.ramRef.$add({
            ten: $scope.ten,
            bus: $scope.bus,
            dungluong : $scope.dungluong,
            loai: $scope.loai,
            gia : $scope.gia,
            img : $scope.img
            });
            alert("Thêm thành công");
            $scope.clears();
        };
        $scope.dangkiocung = function(){
            $scope.ocungRef.$add({
            ten: $scope.ten,
            dungluong : $scope.dungluong,
            tocdo: $scope.tocdo,
            gia : $scope.gia,
            img : $scope.img
            });
            alert("Thêm thành công");
            $scope.clears();
        };
  }; 
});


