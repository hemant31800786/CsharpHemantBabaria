const addContext = require('mochawesome/addContext');
const { describe, after, before, it } = require('mocha');



require('chai');
require('chai-as-promised');
let App;
const totalRowDelete =  5;//number of row delete form list
let numberofEntrysmsg;
async function resetData(value) 
{
 //   var elem =  App.client.element('input.form-control.search-input').Keys(value);

 var elem = App.client.element('input.form-control.search-input');
 
     await  elem
     .setValue(elem.value, value);
     await App.sleep(1000);
}


describe('TEST THE WINDOW', function() {
    const ApplicationController = require('../bootstrap');

    after(async () => {
        try {
            await App.sleep(2000);
            await App.stop();
        } catch (e) {}
    });
    before(async () => {
        App = new ApplicationController();
        await App.start();
        await App.sleep(3000);
    });

    it("A window with the 'User Management' title is visible and focused", async function() {
        await App.sleep(2000);
            App.client
                     .waitUntilWindowLoaded()
                     .getTitle()
                     .should.eventually.equal('User Management');
           
    });

    it("Check the color of the 'Like' button on the first entry", async function() {
        await App.sleep(1000);
        let elem = await App.client.element('#table > tbody > tr:nth-child(1) > td:nth-child(6) > a.like');
        
             App.client
                     .elementIdCssProperty(elem.value.ELEMENT, 'color')
                     .should.eventually.equal('rgba(0, 123, 255, 1)');
       
    });

    it("Click the 'Like' button on the second entry", async function() {
        await App.sleep(1000);
              App.client
                      .element('#table > tbody > tr:nth-child(2) > td:nth-child(6) > a.like')
                      .click();
    });

    it("Check the color of the 'Like' button on the first entry", async function() {
        await App.sleep(1000);
        let elem = await App.client.element('#table > tbody > tr:nth-child(1) > td:nth-child(6) > a.like');
                App.client
                        .elementIdCssProperty(elem.value.ELEMENT, 'color')
                        .should.eventually.equal('rgba(0, 123, 255, 1)');
       
    });

    it("Check if the 'Like' button on the second entry has the class 'liked'", async function() {
        await App.sleep(1000);
                 App.client
                          .element('#table > tbody > tr:nth-child(2) > td:nth-child(6) > a.like')
                          .getAttribute('class')
                          .should.eventually.match('liked');

        addContext(this, {
            title: 'Classes on the button',
            value: {
                classes: await App.client.element('#table > tbody > tr:nth-child(2) > td:nth-child(6) > a.like').getAttribute('class'),
            },
        });
    });

//     // TODO: Fill in the missing steps down below :)
    it("Search for any entry which contains value '160'", async function() {
        await resetData(160);
       });

    it("Delete the entry from the search result & remove the search input text", async function() {
        await App.sleep(1000);
         await App.client.element('input[name=btSelectAll]').click();
         await App.sleep(1000);
         await App.client.element('#remove').click();
         await App.sleep(1000);

   
     });

    it("Search for any entry which contains value '160'", async function() {
        await resetData(160);
           });

    it("Check if any items are present after the search", async function() {

       await  App.client
                    .element('#table > tbody > tr:nth-child(1)')
                    .waitUntilWindowLoaded()
                    .waitForVisible('td')
                    .getText('td')
                    .should.eventually.equal('No matching records found');
    });

    it("Check if there are 10 rows per page", async function() {
        await resetData(' ');// reset all data i table
        await  App.client
                        .element('button.btn btn-secondary dropdown-toggle')
                        .waitUntilWindowLoaded()
                        .waitForVisible('span.page-size')
                        .getText('span.page-size')
                        .should.eventually.equal('10');
     
     
  });

    it("Delete the first 5 rows", async function() {
       
         await App.client
                        .element('#table > tbody ')
                        .waitUntilWindowLoaded()
                        .waitForVisible('th:nth-child(4) > div.th-inner')
                        .getText('th:nth-child(4) > div.th-inner')
                         .then((text) =>  {
                                             if (text[2] > totalRowDelete)
                                                {
                                                    for (let index = 1; index <= totalRowDelete; index++) 
                                                     {
                                                        App.client
                                                                 .element('#table > tbody > tr:nth-child('+index+') > td.bs-checkbox > label > input[type=checkbox]')
                                                                 .click();
                                                    }
                                                                
                                                    App.client.element('#remove').click();
                                                    
                                                }

       
                                  });
      
    });

    it("Check if there are 5 rows left", async function() {
          await App.sleep(2000);
          await App.client
                        .element('#table > tbody ')
                        .waitUntilWindowLoaded()
                        .getText('th:nth-child(4) > div.th-inner')
                        .should.eventually.to.be.include('5');
                        
    });

    it("Hide the ID field", async function() {
        await App.sleep(1000);
         await App.client.element('button.btn.btn-secondary.dropdown-toggle').click();
         await App.client.element('input[data-field=id]').click();
     
    });

     it("Show the ID field", async function() {
          await App.sleep(2000);
           await App.client.element('input[data-field=id]').click();
    });

    it("Sort the table by 'Username'", async function() {
        await App.client.element('th[data-field=name]').click();
        await App.sleep(2000);

      

    });
//    // TODO: Continue here with the other steps
    

// //     1. Extend the test-case to include the following checks:
// // a. Check how many Electron windows are open
it(" Number of Electron windows are open", async function() {
    App.client
    .waitUntilWindowLoaded()
    .getWindowCount()
    .should.eventually.equal('1');
  
});


// b. Check if the localisation drop-down works if any other locale is selected

it(" localisation drop-down works", async function() {
  
       App.client.selectByValue('#locale', 'de-DE');         
       await App.sleep(1000);
});
// // c. Check if the pagination works

it("pagination works", async function() {

    var nagigationPage = 5;
    await App.client
                    .elements('div.fixed-table-pagination > div.float-right.pagination > ul > li')
                    .then(async function (elems) {
                            if (elems.value.length > 2)
                            {
                                await   App.client.element('div.fixed-table-pagination > div.float-right.pagination > ul >  li:nth-child('+nagigationPage+') >a')
                                                  .click();

                            };
     });
    await App.sleep(2000);
     await   App.client
                    .element('div.fixed-table-pagination > div.float-right.pagination > ul')
                    .waitUntilWindowLoaded()
                    .getText('li.page-item.active')
                    .should.eventually.equal(String(nagigationPage-1));

    
});
// d. Check if the total amount of entries to be displayed works


it("total amount of entries to be displayed works", async function() {
    
    await App.client
                     .element('div.float-left pagination-detail')
                     .waitUntilWindowLoaded()
                     .getText('span.pagination-info')
                     .should.not.be.empty;
  
   
});


});
