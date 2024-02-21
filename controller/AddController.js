window.AddController = function($scope , $http , $location) {

    $scope.title = "Thêm nhân viên";
    
    $scope.addNhanVien = function(){
        let linkApi = "http://localhost:3000/nhanvien";
        
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

            $http.post(
                linkApi,
                newNhanVien
            ).then(function(response){
                if (response.status == 201){
                    alert("Thêm dữ liệu thành công");
                    $location.path('/list-employee');
                }
            });
        } else {
            alert('Vui lòng nhập đầy đủ thông tin')
        }
    }
}