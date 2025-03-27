import { expect, browser, $ } from "@wdio/globals";
import * as common from "../utils/common.js";
import * as selectors from "../utils/selectors.js";
import { APPLY_REVIEW_CLAIM_SBI } from "../utils/constants.js";

describe("Apply and claim journeys", () => {
  it("should be able to create a new application", async () => {
    await browser.url(common.getSignInUrl("apply"));

    await common.fillAndSubmitSBI(APPLY_REVIEW_CLAIM_SBI);

    await $(selectors.confirmCheckDetails("yes")).click();
    await common.clickSubmitButton();

    await common.submitApplicationSteps();

    await $(selectors.terms).click();
    await common.clickSubmitButton();

    await common.verifySubmission("Application complete");
  });

  it("should be able to create a new review claim for Sheep", async () => {
    await browser.url(common.getSignInUrl("claim"));

    await common.fillAndSubmitSBI(APPLY_REVIEW_CLAIM_SBI);

    await common.answerAndContinue(selectors.typeOfLivestock("sheep"));

    await common.answerAndContinue(selectors.typeOfReview("review"));

    await common.enterVisitDateAndContinue();

    await common.whenTestingWasCarriedOutAndContinue(
      "whenTheVetVisitedTheFarmToCarryOutTheReview",
    );

    await common.answerAndContinue(selectors.speciesNumbers("yes"));

    await common.fillInputAndContinue(selectors.numberOfAnimalsTested, "10");
    await common.fillInputAndContinue(selectors.vetsName, "Mr Auto Test");
    await common.fillInputAndContinue(selectors.vetRcvsNumber, "1234567");
    await common.fillInputAndContinue(selectors.laboratoryURN, "sh-rr-534346");

    await $(selectors.submitClaim).click();

    await common.verifySubmission("Claim complete");

    await expect($(selectors.reference)).toHaveText(
      expect.stringContaining("RESH"),
    );
  });

  it("should be able to create a new review claim for Pigs", async () => {
    await browser.url(common.getSignInUrl("claim"));

    await common.fillAndSubmitSBI(APPLY_REVIEW_CLAIM_SBI);

    await common.answerAndContinue(selectors.typeOfLivestock("pigs"));

    await common.answerAndContinue(selectors.typeOfReview("review"));

    await common.enterVisitDateAndContinue();

    await common.whenTestingWasCarriedOutAndContinue(
      "whenTheVetVisitedTheFarmToCarryOutTheReview",
    );

    await common.answerAndContinue(selectors.speciesNumbers("yes"));

    await common.fillInputAndContinue(selectors.numberOfAnimalsTested, "30");

    await common.fillInputAndContinue(selectors.vetsName, "Mr Auto Test");

    await common.fillInputAndContinue(selectors.vetRcvsNumber, "1234567");

    await common.fillInputAndContinue(selectors.laboratoryURN, "pg-rr-534346");

    await common.fillInputAndContinue(selectors.numberOfOralFluidSamples, "10");

    await common.answerAndContinue(selectors.testResults("positive"));

    await $(selectors.submitClaim).click();

    await common.verifySubmission("Claim complete");

    await expect($(selectors.reference)).toHaveText(
      expect.stringContaining("REPI"),
    );
  });

  it("should be able to create a new review claim for Diary cattle", async () => {
    await browser.url(common.getSignInUrl("claim"));

    await common.fillAndSubmitSBI(APPLY_REVIEW_CLAIM_SBI);

    await common.answerAndContinue(selectors.typeOfLivestock("dairy"));

    await common.answerAndContinue(selectors.typeOfReview("review"));

    await common.enterVisitDateAndContinue();

    await common.whenTestingWasCarriedOutAndContinue(
      "whenTheVetVisitedTheFarmToCarryOutTheReview",
    );

    await common.answerAndContinue(selectors.speciesNumbers("yes"));

    await common.fillInputAndContinue(selectors.vetsName, "Mr Auto Test");
    await common.fillInputAndContinue(selectors.vetRcvsNumber, "1234567");
    await common.fillInputAndContinue(selectors.laboratoryURN, "dc-rr-534346");
    await common.answerAndContinue(selectors.testResults("positive"));

    await $(selectors.submitClaim).click();

    await common.verifySubmission("Claim complete");

    await expect($(selectors.reference)).toHaveText(
      expect.stringContaining("REDC"),
    );
  });

  it("should be able to create a new review claim for Beef cattle", async () => {
    await browser.url(common.getSignInUrl("claim"));

    await common.fillAndSubmitSBI(APPLY_REVIEW_CLAIM_SBI);

    await common.answerAndContinue(selectors.typeOfLivestock("beef"));

    await common.answerAndContinue(selectors.typeOfReview("review"));

    await common.enterVisitDateAndContinue();

    await common.whenTestingWasCarriedOutAndContinue(
      "whenTheVetVisitedTheFarmToCarryOutTheReview",
    );

    await common.answerAndContinue(selectors.speciesNumbers("yes"));

    await common.fillInputAndContinue(selectors.numberOfAnimalsTested, "10");

    await common.fillInputAndContinue(selectors.vetsName, "Mr Auto Test");

    await common.fillInputAndContinue(selectors.vetRcvsNumber, "1234567");

    await common.fillInputAndContinue(selectors.laboratoryURN, "bc-rr-534346");

    await common.answerAndContinue(selectors.testResults("positive"));

    await $(selectors.submitClaim).click();

    await common.verifySubmission("Claim complete");

    await expect($(selectors.reference)).toHaveText(
      expect.stringContaining("REBC"),
    );
  });
});
