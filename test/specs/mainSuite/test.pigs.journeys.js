import { addDescription, TYPE } from "@wdio/allure-reporter";

describe("Multiple herds pigs claim journeys", async function () {
  it("can create the first review claim for a pigs herd for a farmer business with a positive test result", async function () {
    addDescription("Test not implemented yet, Jira ticket: AHWR-1202", TYPE.MARKDOWN);
    this.skip();
  });

  it("can create a vaccinated follow-up claim incorporating both PCR positive and genetic sequencing outcomes for a pigs review with a positive test result", async function () {
    // Use the review claim above for this follow-up claim
    addDescription("Test not implemented yet, Jira ticket: AHWR-1202", TYPE.MARKDOWN);
    this.skip();
  });

  it("can create a vaccinated follow-up claim incorporating PCR negative but no genetic sequencing outcomes for a pigs review with a positive test result", async function () {
    // Need to create a review claim with a positive test result for this first
    addDescription("Test not implemented yet, Jira ticket: AHWR-1202", TYPE.MARKDOWN);
    this.skip();
  });

  it("can create an un-vaccinated follow-up claim incorporating both PCR positive and genetic sequencing outcomes for a pigs review with a positive test result", async function () {
    // Need to create a review claim with a positive test result for this first
    addDescription("Test not implemented yet, Jira ticket: AHWR-1202", TYPE.MARKDOWN);
    this.skip();
  });

  it("can create an un-vaccinated follow-up claim incorporating PCR negative but no genetic sequencing outcomes for a pigs review with a positive test result", async function () {
    // Need to create a review claim with a positive test result for this first
    addDescription("Test not implemented yet, Jira ticket: AHWR-1202", TYPE.MARKDOWN);
    this.skip();
  });

  it("can create a vaccinated follow-up claim incorporating both PCR positive and genetic sequencing outcomes for a pigs review with a negative test result", async function () {
    // Use the review claim above for this follow-up claim
    addDescription("Test not implemented yet, Jira ticket: AHWR-1202", TYPE.MARKDOWN);
    this.skip();
  });

  it("can create a vaccinated follow-up claim incorporating PCR negative but no genetic sequencing outcomes for a pigs review with a negative test result", async function () {
    // Need to create a review claim with a positive test result for this first
    addDescription("Test not implemented yet, Jira ticket: AHWR-1202", TYPE.MARKDOWN);
    this.skip();
  });

  it("can create an un-vaccinated follow-up claim incorporating only positive ELISA test result for a pigs review with a negative test result", async function () {
    // Need to create a review claim with a positive test result for this first
    addDescription("Test not implemented yet, Jira ticket: AHWR-1202", TYPE.MARKDOWN);
    this.skip();
  });

  it("can create an un-vaccinated follow-up claim incorporating only negative ELISA test result for a pigs review with a negative test result", async function () {
    // Need to create a review claim with a positive test result for this first
    addDescription("Test not implemented yet, Jira ticket: AHWR-1202", TYPE.MARKDOWN);
    this.skip();
  });
});
