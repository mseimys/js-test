'use strict';

function Company(data) {
  //
  // Company class to manage one found company
  //
  var self = this;
  var duration = 365; // chart duration in days

  self.name = data.Name;
  self.symbol = data.Symbol;
  self.quote = null;
  self.element = $('<tr><td>' + self.symbol + '</td><td>' + self.name +
    '</td></tr>');
  // We shall display stock change information in changeElement
  var changeElement = $('<td><img src="./imgs/loader.gif"></td>');
  self.element.append(changeElement);

  self.element.on('click', function() {
    // Highlighting table row that was clicked
    $('tr').removeClass('selected');
    self.element.addClass('selected');
    // Display chart and additional quote info
    new Markit.InteractiveChartApi(self.symbol, duration);
    $('#quote-info').text(JSON.stringify(self.quote, null, 4));
  })

  self.fetchQuoteData = function() {
    return API.getQuote(self.symbol).then(function(data) {
      self.quote = data;
      var changeAmount = data.ChangePercentYTD.toFixed(2);
      if (changeAmount >= 0) {
        changeElement.addClass('plus');
      } else {
        changeElement.addClass('minus');
      }
      changeElement.text(changeAmount);
    }).fail(function(jqXHR, textStatus, errorThrown) {
      // When too many requests, sometimes we exceed the free limit
      changeElement.text('N/A');
    });
  }
}

var CompanyList = (function() {
  //
  // Stores information about all found companies
  //
  var companies = [];
  var table, rows;

  return {
    init: function(dest) {
      table = $(dest);
      rows = table.find('tbody');
    },
    addCompany: function(name) {
      var new_company = new Company(name);
      new_company.fetchQuoteData();
      companies.push(new_company);
      rows.append(new_company.element);
      return new_company;
    },
    clear: function() {
      rows.empty();
      companies = [];
    },
    getCompanies: function() {
      return companies;
    }
  }
})();
