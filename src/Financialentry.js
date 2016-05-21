(function () {
  var FinancialEntry, FinancialEntryCollection;

  window.GAL = window.GAL || {};
  GAL.FinancialApp = GAL.FinancialApp || {};
  GAL.FinancialApp.Model = GAL.FinancialApp.Model || {};
  GAL.FinancialApp.Collection = GAL.FinancialApp.Collection || {};

  FinancialEntry = Backbone.Model.extend({
  	initialize: function () {
      this.set('strDate', GAL.FinancialApp.Utils.formatDateISO(this.get('date')));
  	}
  }, {
    getWho: function () {
      return 'FinancialEntryModel';
    }	
  });
  GAL.FinancialApp.Model.FinancialEntry = FinancialEntry;
 
  FinancialEntryCollection = Backbone.Collection.extend({
  	model: GAL.FinancialApp.Model.FinancialEntry
  },{
  	getWho: function () {
      return 'FinancialEntryCollection';
    }
  });
  GAL.FinancialApp.Collection.FinancialEntryCollection = FinancialEntryCollection; 
}());
