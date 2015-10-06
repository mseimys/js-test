(function () {

    'use strict';

    function Company(name){
        this.name = name;
        this.element = $('<div>' + name + '</div>');
    }

    function CompanyList(dest){
        var companies = [];
        var destination = $(dest);

        this.addCompany = function(name) {
            companies.push(new Company(name));
        }
        this.generateList = function() {
            destination.empty();
            for (var i=0; i<companies.length; i++) {
                destination.append(companies[i].element);
            }
        }
        this.clear = function(){
            destination.empty();
            companies = [];
        }
    };

    // var cl = new CompanyList('#results');
    // console.log(cl);
    // cl.addCompany('company1');
    // cl.addCompany('company2');
    // cl.generateList();

    function initializeUI(){
        var $loading = $('#spinner').hide();
        $(document)
            .ajaxStart(function () {
                $loading.show();
            })
            .ajaxStop(function () {
                $loading.hide();
            });
    }

    $(document).ready(function () {
        function showResult(data) {
            var result = $('.result');
            result.empty();

            if (data.Status === "SUCCESS") {
                result.text(JSON.stringify(data, null, 4));
            } else {
                result.text("Not found!");
            }
        }

        function getCompanySymbol(input) {
            return $.getJSON('Api/v2/Lookup/json', {input: input});
        }

        function getQuote(symbol) {
            return $.getJSON('Api/v2/Quote/json', {symbol: symbol});
        }


        $('#search-form').on('submit', function(event){
            event.preventDefault();

            var form = $('#search-form');
            var nameElement = form.find('.company-name');
            var nameValue = nameElement.val();

            // Mini validation
            if (nameValue.length < 2) {
                nameElement.parent('div').addClass('has-error');
                form.find('.help-block').text("Length of a company name should be greater than 2");
                return false;
            } else {
                nameElement.parent('div').removeClass('has-error');
                form.find('.help-block').text("");
            }

            getCompanySymbol(nameValue).then(function(data){
                return getQuote(data[0].Symbol)
            }).then(function(data){
                showResult(data);
            });
        });

        initializeUI();
    });

}());
