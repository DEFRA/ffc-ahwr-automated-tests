import { expect, browser, $ } from "@wdio/globals";
import {
  getDevSignInUrl,
  fillAndSubmitSBI,
  clickOnElementAndContinue,
  enterVisitDateAndContinue,
  enterWhenTestingWasCarriedOutAndContinue,
  fillInputAndContinue,
  selectSheepTestsAndContinue,
  verifySubmission,
  clickSubmitButton,
  clickStartNewClaimButton,
} from "../utils/common.js";
import {
  NUMBER_OF_ANIMALS_TESTED,
  VETS_NAME,
  VET_RCVS_NUMBER,
  LABORATORY_URN,
  SUBMIT_CLAIM_BUTTON,
  REFERENCE,
  getTypeOfLivestockSelector,
  getTypeOfReviewSelector,
  getSpeciesNumbersSelector,
  getSheepEndemicsPackageSelector,
  getTestResultSelector,
  getPiHuntForBvdDoneSelector,
  getPiHuntDoneForAllCattleSelector,
  getTestResultsSelector,
  getBiosecuritySelector,
  getConfirmCheckDetailsSelector,
} from "../utils/selectors.js";
import {
  SHEEP_ENDEMIC_CLAIM_SBI,
  BEEF_ENDEMIC_CLAIM_SBI,
  JOHNES_DISEASE,
} from "../utils/constants.js";

describe("Follow-up claim journeys for various species", () => {
  it("can create a follow-up claim for sheep", async () => {
    await browser.url(getDevSignInUrl("claim"));

    await fillAndSubmitSBI(SHEEP_ENDEMIC_CLAIM_SBI);
    await $(getConfirmCheckDetailsSelector("yes")).click();
    await clickSubmitButton();

    await clickStartNewClaimButton();

    await clickOnElementAndContinue(getTypeOfLivestockSelector("sheep"));

    await clickOnElementAndContinue(getTypeOfReviewSelector("endemics"));

    await enterVisitDateAndContinue();

    await enterWhenTestingWasCarriedOutAndContinue(
      "whenTheVetVisitedTheFarmToCarryOutTheReview",
    );

    await clickOnElementAndContinue(getSpeciesNumbersSelector("yes"));

    await fillInputAndContinue(NUMBER_OF_ANIMALS_TESTED, "10");

    await fillInputAndContinue(VETS_NAME, "Mr Auto Test");

    await fillInputAndContinue(VET_RCVS_NUMBER, "7654321");

    await clickOnElementAndContinue(
      getSheepEndemicsPackageSelector("improvedEwePerformance"),
    );

    await selectSheepTestsAndContinue([JOHNES_DISEASE]);

    await clickOnElementAndContinue(getTestResultSelector("positive"));

    await $(SUBMIT_CLAIM_BUTTON).click();

    await verifySubmission("Claim complete");

    await expect($(REFERENCE)).toHaveText(expect.stringContaining("FUSH"));
  });

  it("can create a follow-up claim for beef", async () => {
    await browser.url(getDevSignInUrl("claim"));

    await fillAndSubmitSBI(BEEF_ENDEMIC_CLAIM_SBI);
    await $(getConfirmCheckDetailsSelector("yes")).click();
    await clickSubmitButton();

    await clickStartNewClaimButton();

    await clickOnElementAndContinue(getTypeOfLivestockSelector("beef"));

    await clickOnElementAndContinue(getTypeOfReviewSelector("endemics"));

    await enterVisitDateAndContinue();

    await clickOnElementAndContinue(getSpeciesNumbersSelector("yes"));

    await fillInputAndContinue(VETS_NAME, "Mr Auto Test");

    await fillInputAndContinue(VET_RCVS_NUMBER, "1234567");

    await clickOnElementAndContinue(getPiHuntForBvdDoneSelector("yes"));

    await clickOnElementAndContinue(getPiHuntDoneForAllCattleSelector("yes"));

    await enterWhenTestingWasCarriedOutAndContinue(
      "whenTheVetVisitedTheFarmToCarryOutTheReview",
    );

    await fillInputAndContinue(LABORATORY_URN, "521346");

    await clickOnElementAndContinue(getTestResultsSelector("positive"));

    await clickOnElementAndContinue(getBiosecuritySelector("yes"));

    await $(SUBMIT_CLAIM_BUTTON).click();

    await verifySubmission("Claim complete");

    await expect($(REFERENCE)).toHaveText(expect.stringContaining("FUBC"));
  });
});
