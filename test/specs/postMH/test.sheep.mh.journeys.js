import { expect, browser, $ } from "@wdio/globals";
import {
  getDevSignInUrl,
  fillAndSubmitSBI,
  clickSubmitButton,
  clickOnElementAndContinue,
  enterPostMHReleaseDateAndContinue,
  fillInputAndContinue,
  verifySubmission,
  clickStartNewClaimButton,
  clickContinueButton,
  enterWhenTestingWasCarriedOutAndContinue,
  selectSheepTestsAndContinue,
  createSheepReviewClaim,
  chooseRandomHerdReasonsAndContinue,
} from "../../utils/common.js";
import {
  NUMBER_OF_ANIMALS_TESTED,
  VETS_NAME,
  VET_RCVS_NUMBER,
  SUBMIT_CLAIM_BUTTON,
  REFERENCE,
  getTypeOfLivestockSelector,
  getTypeOfReviewSelector,
  getSpeciesNumbersSelector,
  getConfirmCheckDetailsSelector,
  getSheepEndemicsPackageSelector,
  getTestResultSelector,
  CLAIMS_MAIN_HEADING_SELECTOR,
  LABORATORY_URN,
} from "../../utils/selectors.js";
import {
  HERD_NAME,
  HERD_CPH,
  SAME_HERD_PREVIOUSLY_CLAIMED_NO,
  SAME_HERD_PREVIOUSLY_CLAIMED_YES,
} from "../../utils/multiple-herd-selectors.js";
import {
  MULTIPLE_HERDS_SBI,
  MULTIPLE_HERDS_SHEEP_AGREEMENT_REF,
  JOHNES_DISEASE,
} from "../../utils/constants.js";
import { approveClaim } from "../../utils/backoffice-common.js";

let claimNumber;

describe("Multiple herds - Review claim journeys for a flock of sheep", () => {
  it("can create the first review claim for a flock of sheep", async () => {
    claimNumber = await createSheepReviewClaim(MULTIPLE_HERDS_SBI, true);
  });

  it("cannot create a sheep follow-up claim when its review claim is not approved", async () => {
    await browser.url(getDevSignInUrl("claim"));
    await fillAndSubmitSBI(MULTIPLE_HERDS_SBI);
    await $(getConfirmCheckDetailsSelector("yes")).click();
    await clickSubmitButton();
    await clickStartNewClaimButton();
    await clickOnElementAndContinue(getTypeOfLivestockSelector("sheep"));
    await clickOnElementAndContinue(getTypeOfReviewSelector("endemics"));
    await enterPostMHReleaseDateAndContinue();
    await clickOnElementAndContinue(SAME_HERD_PREVIOUSLY_CLAIMED_YES);

    await expect($(CLAIMS_MAIN_HEADING_SELECTOR)).toHaveText(
      expect.stringContaining("You cannot continue with your claim"),
    );
  });

  it("cannot create a sheep follow-up claim when a review claim hasn't been created", async () => {
    await browser.url(getDevSignInUrl("claim"));
    await fillAndSubmitSBI(MULTIPLE_HERDS_SBI);
    await $(getConfirmCheckDetailsSelector("yes")).click();
    await clickSubmitButton();
    await clickStartNewClaimButton();
    await clickOnElementAndContinue(getTypeOfLivestockSelector("sheep"));
    await clickOnElementAndContinue(getTypeOfReviewSelector("endemics"));
    await enterPostMHReleaseDateAndContinue();
    await clickOnElementAndContinue(SAME_HERD_PREVIOUSLY_CLAIMED_NO);

    await expect($(CLAIMS_MAIN_HEADING_SELECTOR)).toHaveText(
      expect.stringContaining("You cannot continue with your claim"),
    );
  });

  it("can create a sheep follow-up claim when its review claim is approved", async () => {
    await approveClaim(MULTIPLE_HERDS_SHEEP_AGREEMENT_REF, claimNumber);

    await browser.url(getDevSignInUrl("claim"));
    await fillAndSubmitSBI(MULTIPLE_HERDS_SBI);
    await $(getConfirmCheckDetailsSelector("yes")).click();
    await clickSubmitButton();
    await clickStartNewClaimButton();
    await clickOnElementAndContinue(getTypeOfLivestockSelector("sheep"));
    await clickOnElementAndContinue(getTypeOfReviewSelector("endemics"));
    await enterPostMHReleaseDateAndContinue();
    await clickOnElementAndContinue(SAME_HERD_PREVIOUSLY_CLAIMED_YES);
    await clickContinueButton();
    await enterWhenTestingWasCarriedOutAndContinue("whenTheVetVisitedTheFarmToCarryOutTheReview");
    await clickOnElementAndContinue(getSpeciesNumbersSelector("yes"));
    await fillInputAndContinue(NUMBER_OF_ANIMALS_TESTED, "10");
    await fillInputAndContinue(VETS_NAME, "Mr Auto Test");
    await fillInputAndContinue(VET_RCVS_NUMBER, "1234567");
    await clickOnElementAndContinue(getSheepEndemicsPackageSelector("improvedEwePerformance"));
    await selectSheepTestsAndContinue([JOHNES_DISEASE]);
    await clickOnElementAndContinue(getTestResultSelector("positive"));
    await $(SUBMIT_CLAIM_BUTTON).click();
    await verifySubmission("Claim complete");

    await expect($(REFERENCE)).toHaveText(expect.stringContaining("FUSH"));
  });

  it("can create a second review claim for a flock of sheep for the same business", async () => {
    await browser.url(getDevSignInUrl("claim"));
    await fillAndSubmitSBI(MULTIPLE_HERDS_SBI);
    await $(getConfirmCheckDetailsSelector("yes")).click();
    await clickSubmitButton();
    await clickStartNewClaimButton();
    await clickOnElementAndContinue(getTypeOfLivestockSelector("sheep"));
    await clickOnElementAndContinue(getTypeOfReviewSelector("review"));

    await enterPostMHReleaseDateAndContinue();
    await clickOnElementAndContinue(SAME_HERD_PREVIOUSLY_CLAIMED_NO);
    await fillInputAndContinue(HERD_NAME, "Commercial flocks");
    await fillInputAndContinue(HERD_CPH, "22/333/4444");
    await chooseRandomHerdReasonsAndContinue();
    await clickContinueButton();

    await enterWhenTestingWasCarriedOutAndContinue("whenTheVetVisitedTheFarmToCarryOutTheReview");

    await clickOnElementAndContinue(getSpeciesNumbersSelector("yes"));
    await fillInputAndContinue(NUMBER_OF_ANIMALS_TESTED, "10");
    await fillInputAndContinue(VETS_NAME, "Mr Auto Test");
    await fillInputAndContinue(VET_RCVS_NUMBER, "1234567");
    await fillInputAndContinue(LABORATORY_URN, "sh-rr-534347");
    await $(SUBMIT_CLAIM_BUTTON).click();
    await verifySubmission("Claim complete");
    await expect($(REFERENCE)).toHaveText(expect.stringContaining("RESH"));
  });
});
