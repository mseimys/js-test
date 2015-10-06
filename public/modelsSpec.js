describe("Stock Finder", function() {
  describe("Company", function() {
    beforeEach(function() {
      company = new Company({
        Name: 'Something',
        Symbol: 'SMTH'
      });
    });

    it("should properly initialize element", function() {
      expect(company.name).toEqual('Something');
      expect(company.element).toBeTruthy();
      expect(company.quote).toBeNull();
    });

    it("should fetch quote data", function() {
      expect(company.quote).toBeNull();
      spyOn(API, "getQuote").and.callFake(function() {
        var deferred = new $.Deferred();
        deferred.resolve({
          'ChangePercentYTD': 1.23456
        });
        return deferred;
      });
      company.fetchQuoteData();
      expect(company.quote).not.toBeNull();
      expect(company.quote.ChangePercentYTD).toEqual(1.23456);
    });
  });

  describe("Company List", function() {
    it("should start empty", function() {
      CompanyList.init('#destination');
      expect(CompanyList.getCompanies()).toEqual([]);
    });

    it("should be able to add and remove all companies", function() {
      var new_company = CompanyList.addCompany({
        Name: 'Something',
        Symbol: 'SMTH'
      });
      expect(new_company.name).toEqual('Something');
      expect(CompanyList.getCompanies()).toEqual([new_company]);
      CompanyList.clear();
      expect(CompanyList.getCompanies()).toEqual([]);
    });

  });
});
