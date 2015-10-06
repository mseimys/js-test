(function () {

    'use strict';

    function Company(data){
        var self = this;
        var duration = 3650;

        self.name = data.Name;
        self.symbol = data.Symbol;
        self.quote = null;
        self.element = $('<tr><td>' + self.symbol + '</td><td>' + self.name + '</td></tr>');
        // We will display change information in changeElement
        var changeElement = $('<td><img src="./imgs/loader.gif"></td>');
        self.element.append(changeElement);

        self.element.on('click', function(){
            $('td').removeClass('selected');
            self.element.addClass('selected');
            $('#quote-info').text(JSON.stringify(self.quote, null, 4));
            new Markit.InteractiveChartApi(self.symbol, duration);
        })

        function showChart(selector, symbol){
            console.log(selector, symbol);
            $(selector).text(symbol);
        }

        function processQuoteData(data){
            var changeAmount = data.ChangePercentYTD.toFixed(2);
            if (changeAmount >= 0) {
                changeElement.addClass('plus');
            } else {
                changeElement.addClass('minus');
            }
            changeElement.text(changeAmount);
        }

        $.getJSON('Api/v2/Quote/json', {symbol: self.symbol}).then(function(data){
            self.quote = data;
            processQuoteData(data);
        }).fail(function(jqXHR, textStatus, errorThrown){
            // When too many requests, sometimes we exceed the limit
            changeElement.text('N/A');
        });
    }

    var companylist = (function(){
        var companies = [];
        var table, rows;

        return {
            init: function(dest) {
                table = $(dest);
                rows = table.find('tbody');
            },
            addCompany: function(name) {
                var new_company = new Company(name);
                companies.push(new_company);
                rows.append(new_company.element);
            },
            clear: function(){
                rows.empty();
                companies = [];
            }
        }
    })();

    $(document).ready(function () {
        var $loading = $('#spinner').hide();
        $(document)
            .ajaxStart(function () {
                $loading.show();
            })
            .ajaxStop(function () {
                $loading.hide();
            });

        companylist.init('#results-table');

        function getCompanySymbol(input) {
            return $.getJSON('Api/v2/Lookup/json', {input: input});
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
                companylist.clear()
                for (var i in data) {
                    companylist.addCompany(data[i]);
                }
            });
        });

    });

}());
