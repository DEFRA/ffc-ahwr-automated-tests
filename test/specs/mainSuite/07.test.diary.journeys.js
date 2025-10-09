import { addDescription, TYPE } from "@wdio/allure-reporter";

// TODO: Create a Jira ticket to implement the first four pending tests in this file

describe("AHW multiple herds diary cattle claim journeys", async function () {
  it("can create the first review claim with a positive test result for a diary herd for a farmer business", async function () {
    addDescription("Test not implemented yet, Jira ticket: TBC", TYPE.MARKDOWN);
    this.skip();
  });

  it("can create a PI hunt follow-up claim for an approved diary review claim with positive test result", async function () {
    // Answer yes to all PI hunt questions
    addDescription("Test not implemented yet, Jira ticket: TBC", TYPE.MARKDOWN);
    this.skip();
  });

  it("can create a review claim with negative test result for a different group (herd) of diary species for the same farmer business", async function () {
    addDescription("Test not implemented yet, Jira ticket: TBC", TYPE.MARKDOWN);
    this.skip();
  });

  it("can create a PI hunt follow-up claim for the approved diary review claim with negative test result", async function () {
    // Answer yes to all PI hunt questions
    addDescription("Test not implemented yet, Jira ticket: TBC", TYPE.MARKDOWN);
    this.skip();
  });

  it("can create a diary herd follow-up claim journey when PI hunt for bovine viral diarrhoea has not been done", async function () {
    // This test is only applicable for review claim with negative test result
    addDescription("Test not implemented yet, Jira ticket: AHWR-1200", TYPE.MARKDOWN);
    this.skip();
  });

  it("can create a diary herd follow-up claim journey when PI hunt was not recommended by the vet", async function () {
    // This test is only applicable for review claim with negative test result
    addDescription("Test not implemented yet, Jira ticket: AHWR-1200", TYPE.MARKDOWN);
    this.skip();
  });

  it("can create a diary herd follow-up claim journey when PI hunt wasn't done on all diary cattle in the herd", async function () {
    // This test is only applicable for review claim with negative test result
    addDescription("Test not implemented yet, Jira ticket: AHWR-1200", TYPE.MARKDOWN);
    this.skip();
  });
});
