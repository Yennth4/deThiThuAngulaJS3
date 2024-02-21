window.ListController = function($scope , $http) {

    $scope.title = "Danh sách nhân viên";

    let linkApi = "http://localhost:3000/nhanvien";

    $http.get(linkApi).then(function(response) {
        $scope.listNhanVien = response.data;
    })

    $scope.delete = function(id) {
        let confirm = window.confirm('Are you sure you want to delete ' + id + ' ?');
        if (confirm) {
            $http.delete(
                `${linkApi}/${id}`
                ).then(function(response){
                    alert('Xóa thành công ' + id);
            });
        }
    }
}
