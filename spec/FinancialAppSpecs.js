describe("FinancialApp", function() {
  var financialEntryModel = GAL.FinancialApp.Model.FinancialEntry;
  var financialEntryCollection = GAL.FinancialApp.Collection.FinancialEntryCollection;
  var lstFinEntry;
  var counter = 0;

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
        id: counter,
        date: new Date(),
        description: 'test description' + counter,
        amount: 150,
        currency: '€'
      });
      counter += 1;
    });


    it("A new entry can be created", function() {
      expect(newFinEntry.get('id') === counter-1).toBeTruthy();
      expect(newFinEntry.get('description') === 'test description' + (counter-1)).toBeTruthy();
      expect(newFinEntry.get('amount') === 150).toBeTruthy();
      expect(newFinEntry.get('currency') === '€').toBeTruthy();
    });

    it("Current financial entry data can be added to the list of financial entries", function() {
      lstFinEntry.add(newFinEntry);
      expect(lstFinEntry.length).toEqual(1);
    });
  });

  describe("Communicate with server - GET id", function() {
    var returnedModel = null;

    beforeEach(function (done) {
      var newFinEntry = new financialEntryModel({
        id: 'test'
      });
      newFinEntry.fetch({
        success: function(model, response, options) {
          returnedModel = model;
          done();
        },
        error: function () {
          returnedModel = null;
          done();
        }
      });
    });

    it("Get test entity from server", function() {
      expect(returnedModel.get('id') === 'test').toBeTruthy();
      expect(returnedModel.get('description') === 'Description_test').toBeTruthy();
      expect(returnedModel.get('amount') === 999).toBeTruthy();
      lstFinEntry.add(returnedModel);
      expect(lstFinEntry.length).toEqual(1);
    });
  });

  describe("Communicate with server - GET all", function() {
    var returnedCollection = null;

    beforeEach(function (done) {
    lstFinEntry.fetch({
        success: function(collection, response, options) {
          returnedCollection = collection;
          done();
        },
        error: function () {
          returnedCollection = null;
          done();
        }
      });
    });

    it("Get all entities from server", function() {
      expect(lstFinEntry.length).toEqual(2);

    });
  });
});
