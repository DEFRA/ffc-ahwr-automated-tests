import { addDescription, TYPE } from "@wdio/allure-reporter";

describe("Multiple herds dairy cattle claim journeys", async function () {
  it("can create the first review claim with a positive test result for a dairy herd for a farmer business", async function () {
    addDescription("Test not implemented yet, Jira ticket: AHWR-1317", TYPE.MARKDOWN);
    this.skip();
  });

  it("can create a PI hunt follow-up claim for an approved dairy review claim with positive test result", async function () {
    // Answer yes to all PI hunt questions
    addDescription("Test not implemented yet, Jira ticket: AHWR-1317", TYPE.MARKDOWN);
    this.skip();
  });

  it("can create a review claim with negative test result for a different group (herd) of dairy species for the same farmer business", async function () {
    addDescription("Test not implemented yet, Jira ticket: AHWR-1317", TYPE.MARKDOWN);
    this.skip();
  });

  it("can create a PI hunt follow-up claim for the approved dairy review claim with negative test result", async function () {
    // Answer yes to all PI hunt questions
    addDescription("Test not implemented yet, Jira ticket: AHWR-1317", TYPE.MARKDOWN);
    this.skip();
  });

  it("can create a dairy herd follow-up claim journey when PI hunt for bovine viral diarrhoea has not been done", async function () {
    // This test is only applicable for review claim with negative test result
    addDescription("Test not implemented yet, Jira ticket: AHWR-1200", TYPE.MARKDOWN);
    this.skip();
  });

  it("can create a dairy herd follow-up claim journey when PI hunt was not recommended by the vet", async function () {
    // This test is only applicable for review claim with negative test result
    addDescription("Test not implemented yet, Jira ticket: AHWR-1200", TYPE.MARKDOWN);
    this.skip();
  });

  it("can create a dairy herd follow-up claim journey when PI hunt wasn't done on all dairy cattle in the herd", async function () {
    // This test is only applicable for review claim with negative test result
    addDescription("Test not implemented yet, Jira ticket: AHWR-1200", TYPE.MARKDOWN);
    this.skip();
  });
});
