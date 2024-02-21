window.DetailController = function($scope , $http , $routeParams) {

    $scope.title = "Chi tiết thông tin nhân viên";

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
}