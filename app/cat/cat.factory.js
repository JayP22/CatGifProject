// creating catFactory to perform cat related functions
(function() {
    'use strict';
    angular
        .module('catApp')
        .factory('CatFactory', CatFactory);
    CatFactory.$inject = ['$http', '$q'];
    /* @ngInject */
    function CatFactory($http, $q) {
        var service = {
            getCatGif: getCatGif,
            getCatFact: getCatFact
        };
        return service;
        ////////////////
        // using $http to call cat overflow api
        function getCatGif() {
            var defer = $q.defer();
            var offset = Math.floor(Math.random() * 320);

            $http({
                method: 'GET',
                url: 'https://montanaflynn-cat-overflow.p.mashape.com/',
                params: {
                    limit: 1,
                    offset: offset
                },
                headers: {
                    'X-Mashape-Key': 'vMkvLPMGSlmshtvobWVMJotBm1HDp1yeYFgjsnoioRAV57qZg8',
                    'Accept': 'text/plain',
                }
            }).then(function(response) {
                    if (response.status === 200) {
                        defer.resolve(response);
                    } else {
                        defer.reject("Cat Gif not found");
                    }
                },
                function(error) {
                    defer.reject(error);
                });

            return defer.promise;
        }
        // using $http to get catFact.json
        function getCatFact() {
            var defer = $q.defer();



            $http({
                method: 'GET',
                url: 'app/cat/catFacts.json',



            }).then(function(response) {
                    {
                        defer.resolve(response);

                    }
                },
                function(error) {
                    defer.reject(error);
                });

            return defer.promise;
        }
    }
})();
