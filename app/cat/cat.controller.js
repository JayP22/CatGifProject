// creating controller to handle cat related functions
(function() {
    'use strict';
    angular
        .module('catApp')
        .controller('CatController', CatController);
    CatController.$inject = ['CatFactory'];
    /* @ngInject */
    function CatController(CatFactory) {
        var vm = this;
        vm.title = 'CatController';
        vm.getCatGif = getCatGif;
        vm.getCatFact = getCatFact;
        activate();
        ////////////////
        // initializing hide and show values for display
        function activate() {
            vm.loading = true;
            vm.init = false;
        }
        // calling catGif function from factory
        function getCatGif() {
            vm.loading = true;
            CatFactory.getCatGif()
                .then(function(response) {
                        vm.loading = false;
                        vm.init = true;

                        vm.catGif = response.data;


                        toastr.success('Cat Gif Loaded!');

                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.error(error);
                        }
                    })
        }
        // calling catFact function from factory
        function getCatFact() {
            var random = Math.floor(Math.random() * 66);
            CatFactory.getCatFact()
                .then(function(response) {

                        vm.catFacts = response.data;
                        vm.randomCatFact = vm.catFacts[random];


                        toastr.success('Cat Fact Loaded!');

                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.error(error);
                        }
                    })
        }
    }
})();
