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
        currency: 'Eur'
      });
      counter += 1;
    });


    it("A new entry can be created", function() {
      expect(newFinEntry.get('id') === counter-1).toBeTruthy();
      expect(newFinEntry.get('description') === 'test description' + (counter-1)).toBeTruthy();
      expect(newFinEntry.get('amount') === 150).toBeTruthy();
      expect(newFinEntry.get('currency') === 'Eur').toBeTruthy();
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
        id: 'test0'
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
      expect(returnedModel.get('id') === 'test0').toBeTruthy();
      expect(returnedModel.get('description') === 'test description 0').toBeTruthy();
      expect(returnedModel.get('amount') === 100).toBeTruthy();
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
      _.each(lstFinEntry.models, function (item, index) {
        if (index) {
          //1
          expect(item.get('id') === 'test1').toBeTruthy();
          expect(item.get('description') === 'test description 1').toBeTruthy();
          expect(item.get('amount') === 200).toBeTruthy();
        } else {
          //0
          expect(item.get('id') === 'test0').toBeTruthy();
          expect(item.get('description') === 'test description 0').toBeTruthy();
          expect(item.get('amount') === 100).toBeTruthy();
        }
      });
    });
  });

  describe("Communicate with server - POST/PUT/DELETE", function() {
    var createdCollection = null;
    var updatedCollection = null;
    var deletedCollection = null;
    var postDone = false;
    var putDone = false;

    beforeEach(function (done) {
      var newFinEntry;
      newFinEntry = new financialEntryModel({
        description: 'test description',
        amount: 150,
        date: new Date(),
        currency: 'EUR'
      });

      if (postDone && putDone === false) {
        createdCollection.at(2).set('description', 'CHANGED ' + createdCollection.at(2).get('description'));
        createdCollection.at(2).set('amount', 999);
        createdCollection.at(2).save(null, {
          success: function(model, response, options) {
             lstFinEntry.fetch({
              success: function(collection, response, options) {
                updatedCollection = collection;
                done();
              },
              error: function () {
                updatedCollection = null;
                done();
              }
            });
          },
          error: function () {
            done();
          }
        });
      } else if (postDone && putDone) {
        updatedCollection.at(2).destroy({
          success: function(model, response, options) {
            lstFinEntry.fetch({
              success: function(collection, response, options) {
                deletedCollection = collection;
                done();
              },
              error: function () {
                deletedCollection = null;
                done();
              }
            });
          }, 
          error: function () {

          }
        });
      } else {
        newFinEntry.save(null, {
          success: function(model, response, options) {
             lstFinEntry.fetch({
              success: function(collection, response, options) {
                createdCollection = collection;
                done();
              },
              error: function () {
                createdCollection = null;
                done();
              }
            });
          },
          error: function () {
            done();
          }
        });
      }
    });

    it("POST new entity to server", function() {
      expect(lstFinEntry.length).toEqual(3);
      expect(createdCollection.at(2).get('description') === 'test description').toBeTruthy();
      expect(createdCollection.at(2).get('amount') === 150).toBeTruthy();
      postDone = true;
    });

    it("PUT entity to server", function() {
      expect(lstFinEntry.length).toEqual(3);
      expect(createdCollection.at(2).get('description') === 'CHANGED test description').toBeTruthy();
      expect(createdCollection.at(2).get('amount') === 999).toBeTruthy();
      putDone = true;
    });

    it("DELETE new entity from server", function() {
      expect(lstFinEntry.length).toEqual(2);
    });

  });
});
