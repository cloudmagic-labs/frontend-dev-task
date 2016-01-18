app.factory('services', function($http){
    var factory = {};
    factory.getAll = function(){
        return $http.get('/api/message');
    };
    factory.getOne = function(id){
        return $http.get('/api/message/'+id);
    };
    factory.delete = function(id){
        return $http.delete('/api/message/'+id);
    };
    return factory;
});