window.EditController = function($scope , $http , $routeParams , $location) {

    $scope.title = "Chỉnh sửa thông tin nhân viên";

    let linkApi = "http://localhost:3000/nhanvien";

    var nhanvienID = $routeParams.id;

    $http.get(linkApi + '/' + nhanvienID).then(function (response) {
        if(response.status == 200){
            $scope.nhanvien = {
                id: response.data.id,
                ho_ten: response.data.ho_ten,
                sdt: response.data.sdt,
                email: response.data.email,
                chuc_vu: response.data.chuc_vu,
                ngay_sinh: new Date(response.data.ngay_sinh)
            }
        }
    })

    $scope.editNhanVien = function(){
        
        let check = true;

        $scope.kiemTra = {
            ho_ten: false,
            sdt: false,
            email: false,
            chuc_vu: false,
            ngay_sinh: false,
            sdtIsNan: false,
            validateEmail: false,
        }

        if (!$scope.nhanvien || !$scope.nhanvien.ho_ten) {
            check = false;
            $scope.kiemTra.ho_ten = true;
        }

        if (!$scope.nhanvien || !$scope.nhanvien.sdt) {
            check = false;
            $scope.kiemTra.sdt = true;
        }

        if (!$scope.nhanvien || !$scope.nhanvien.email) {
            check = false;
            $scope.kiemTra.email = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($scope.nhanvien.email)){
            check = false;
            $scope.kiemTra.validateEmail = true;
        }

        if (!$scope.nhanvien || !$scope.nhanvien.chuc_vu) {
            check = false;
            $scope.kiemTra.chuc_vu = true;
        }

        if (!$scope.nhanvien || !$scope.nhanvien.ngay_sinh) {
            check = false;
            $scope.kiemTra.ngay_sinh = true;
        }

        if (isNaN($scope.nhanvien.sdt)){
            check = false;
            $scope.kiemTra.sdtIsNan = true;
        }

        if (check) {
            let newNhanVien = {
                ho_ten: $scope.nhanvien.ho_ten,
                sdt: $scope.nhanvien.sdt,
                email: $scope.nhanvien.email,
                chuc_vu: $scope.nhanvien.chuc_vu,
                ngay_sinh: $scope.nhanvien.ngay_sinh
            }

            $http.put(
                linkApi + '/' + nhanvienID,
                newNhanVien
            ).then(function(response){
                if (response.status == 200){
                    alert("Chỉnh sửa dữ liệu thành công");
                    $location.path('/list-employee');
                }
            });
        } else {
            alert('Vui lòng nhập đầy đủ thông tin')
        }
    }
}