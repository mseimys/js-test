(function() {
  'use strict';

  $(document).ready(function() {
    var $loading = $('#spinner').hide();
    $(document)
      .ajaxStart(function() {
        $loading.show();
      })
      .ajaxStop(function() {
        $loading.hide();
      });

    CompanyList.init('#results-table');

    $('#search-form').on('submit', function(event) {
      event.preventDefault();

      var form = $('#search-form');
      var nameElement = form.find('.company-name');
      var nameValue = nameElement.val();

      // Mini validation
      if (nameValue.length < 2) {
        nameElement.parent('div').addClass('has-error');
        form.find('.help-block').text(
          "Length of a company name should be greater than 2");
        return false;
      } else {
        nameElement.parent('div').removeClass('has-error');
        form.find('.help-block').text("");
      }

      API.lookupCompany(nameValue).then(function(data) {
        CompanyList.clear()
        for (var i in data) {
          CompanyList.addCompany(data[i]);
        }
      });
    });

  });

}());
