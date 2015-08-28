(function () {

    'use strict';

    $(document).ready(function () {
        var input = $('.search-input');
        var button = $('.search-button');
        var result = $('.result');

        function getCompanySymbol(companyName, cb) {
            $.getJSON('Api/v2/Lookup/json', {input: companyName}, function (data) {
                cb(data[0].Symbol);
            });
        }

        function getQuote(symbol, cb) {
            $.getJSON('Api/v2/Quote/json', {symbol: symbol}, function (data) {
                cb(data);
            });
        }

        button.on('click', function () {
            var companyName = input.val();

            getCompanySymbol(companyName, function (symbol) {
                getQuote(symbol, function (quoteData) {
                    result.empty();
                    result.text(JSON.stringify(quoteData, null, 4));
                })
            });
        });
    });

}());
