var API = (function(){
  // Here we can cache results or do something behind the scenes

  return {
    lookupCompany: function(input){
      return $.getJSON('Api/v2/Lookup/json', {input: input});
    },
    getQuote: function(symbol){
      return $.getJSON('Api/v2/Quote/json', {symbol: symbol});
    }
  }
})();
