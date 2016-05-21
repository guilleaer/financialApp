describe("FinancialApp", function() {
  var financialEntryModel = GAL.FinancialApp.Model.FinancialEntry;
  var financialEntryCollection = GAL.FinancialApp.Collection.FinancialEntryCollection;
  var lstFinEntry;

  beforeEach(function() {
    lstFinEntry = new financialEntryCollection();
  });

  it("models are ready", function() {
    expect(financialEntryModel.getWho()).toEqual('FinancialEntryModel');
    expect(financialEntryCollection.getWho()).toEqual('FinancialEntryCollection');
  });

  it("Financial entries collection should be empty", function() {
      expect(lstFinEntry.length).toEqual(0);
  });


  describe("when models are ready and app is up", function() {
    var newFinEntry;
    beforeEach(function() {
      newFinEntry = new financialEntryModel({
        date: new Date(),
        description: 'test description',
        amount: 150,
        currency: '€'
      });
    });


    it("A new entry can be created", function() {
      expect(newFinEntry.get('description') === 'test description').toBeTruthy();
      expect(newFinEntry.get('amount') === 150).toBeTruthy();
      expect(newFinEntry.get('currency') === '€').toBeTruthy();
    });

    it("Current financial entry data can be added to the list of financial entries", function() {
      lstFinEntry.add(newFinEntry);
      expect(lstFinEntry.length).toEqual(1);
    });
  });
});
