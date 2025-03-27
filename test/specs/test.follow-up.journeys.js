import { expect, browser, $ } from "@wdio/globals";
import * as common from "../utils/common.js";
import * as selectors from "../utils/selectors.js";
import {
  SHEEP_ENDEMIC_CLAIM_SBI,
  BEEF_ENDEMIC_CLAIM_SBI,
} from "../utils/constants.js";

describe("Follow-up claim journeys for various species", () => {
  it("should be able to create a follow-up claim for sheep", async () => {
    await browser.url(common.getSignInUrl("claim"));

    await common.fillAndSubmitSBI(SHEEP_ENDEMIC_CLAIM_SBI);

    await common.answerAndContinue(selectors.typeOfLivestock("sheep"));

    await common.answerAndContinue(selectors.typeOfReview("endemics"));

    await common.enterVisitDateAndContinue();

    await common.whenTestingWasCarriedOutAndContinue(
      "whenTheVetVisitedTheFarmToCarryOutTheReview",
    );

    await common.answerAndContinue(selectors.speciesNumbers("yes"));

    await common.fillInputAndContinue(selectors.numberOfAnimalsTested, "10");

    await common.fillInputAndContinue(selectors.vetsName, "Mr Auto Test");

    await common.fillInputAndContinue(selectors.vetRcvsNumber, "7654321");

    await common.answerAndContinue(
      selectors.sheepEndemicsPackage("improvedEwePerformance"),
    );

    await common.selectSheepTestsAndContinue("johnes");

    await common.answerAndContinue(selectors.testResult("positive"));

    await $(selectors.submitClaim).click();
    await common.verifySubmission("Claim complete");
    await expect($(selectors.reference)).toHaveText(
      expect.stringContaining("FUSH"),
    );
  });

  it("should be able to create a follow-up claim for beef", async () => {
    await browser.url(common.getSignInUrl("claim"));

    await common.fillAndSubmitSBI(BEEF_ENDEMIC_CLAIM_SBI);

    await common.answerAndContinue(selectors.typeOfLivestock("beef"));

    await common.answerAndContinue(selectors.typeOfReview("endemics"));

    await common.enterVisitDateAndContinue();

    await common.answerAndContinue(selectors.speciesNumbers("yes"));

    await common.fillInputAndContinue(selectors.vetsName, "Mr Auto Test");

    await common.fillInputAndContinue(selectors.vetRcvsNumber, "1234567");

    await common.answerAndContinue(selectors.piHuntForBVDDone("yes"));

    await common.answerAndContinue(selectors.piHuntDoneForAllCattle("yes"));

    await common.whenTestingWasCarriedOutAndContinue(
      "whenTheVetVisitedTheFarmToCarryOutTheReview",
    );

    await common.fillInputAndContinue(selectors.laboratoryURN, "521346");

    await common.answerAndContinue(selectors.followUpTestResults("positive"));

    await common.answerAndContinue(selectors.biosecurity("yes"));

    await $(selectors.submitClaim).click();

    await common.verifySubmission("Claim complete");
    await expect($(selectors.reference)).toHaveText(
      expect.stringContaining("FUBC"),
    );
  });
});
