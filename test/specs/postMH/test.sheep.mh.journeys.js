import { expect, browser, $ } from "@wdio/globals";
import {
  getDevSignInUrl,
  fillAndSubmitSBI,
  clickSubmitButton,
  clickOnElementAndContinue,
  enterVisitDateAndContinue,
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
  EXTERNAL_GOV_LINK,
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
    claimNumber = await createSheepReviewClaim(MULTIPLE_HERDS_SBI, {
      multipleHerdFlag: true,
    });
  });

  it("cannot create a follow-up claim for a flock of sheep when its review claim is not approved", async () => {
    await browser.url(getDevSignInUrl("claim"));
    await fillAndSubmitSBI(MULTIPLE_HERDS_SBI);
    await $(getConfirmCheckDetailsSelector("yes")).click();
    await clickSubmitButton();
    await clickStartNewClaimButton();
    await clickOnElementAndContinue(getTypeOfLivestockSelector("sheep"));
    await clickOnElementAndContinue(getTypeOfReviewSelector("endemics"));
    await enterVisitDateAndContinue();
    await clickOnElementAndContinue(SAME_HERD_PREVIOUSLY_CLAIMED_YES);

    await expect($(CLAIMS_MAIN_HEADING_SELECTOR)).toHaveText(
      expect.stringContaining("You cannot continue with your claim"),
    );
    await expect($(EXTERNAL_GOV_LINK)).toHaveText(
      expect.stringContaining(
        "Your review claim must have been approved before you claim for the follow-up that happened after it.",
      ),
    );
  });

  it("cannot create follow-up claim for a different flock of sheep when a review claim hasn't been created and approved for it", async () => {
    await browser.url(getDevSignInUrl("claim"));
    await fillAndSubmitSBI(MULTIPLE_HERDS_SBI);
    await $(getConfirmCheckDetailsSelector("yes")).click();
    await clickSubmitButton();
    await clickStartNewClaimButton();
    await clickOnElementAndContinue(getTypeOfLivestockSelector("sheep"));
    await clickOnElementAndContinue(getTypeOfReviewSelector("endemics"));
    await enterVisitDateAndContinue();
    await clickOnElementAndContinue(SAME_HERD_PREVIOUSLY_CLAIMED_NO);

    await expect($(CLAIMS_MAIN_HEADING_SELECTOR)).toHaveText(
      expect.stringContaining("You cannot continue with your claim"),
    );
    await expect($(EXTERNAL_GOV_LINK)).toHaveText(
      expect.stringContaining(
        "You must have an approved review claim for the different herd or flock, before you can claim for a follow-up.",
      ),
    );
  });

  it("can create a follow-up claim when a review claim is approved for a flock of sheep", async () => {
    await approveClaim(MULTIPLE_HERDS_SHEEP_AGREEMENT_REF, claimNumber);

    await browser.url(getDevSignInUrl("claim"));
    await fillAndSubmitSBI(MULTIPLE_HERDS_SBI);
    await $(getConfirmCheckDetailsSelector("yes")).click();
    await clickSubmitButton();
    await clickStartNewClaimButton();
    await clickOnElementAndContinue(getTypeOfLivestockSelector("sheep"));
    await clickOnElementAndContinue(getTypeOfReviewSelector("endemics"));
    await enterVisitDateAndContinue();
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

  it("can create a second review claim for a different flock of sheep for the same business", async () => {
    await browser.url(getDevSignInUrl("claim"));
    await fillAndSubmitSBI(MULTIPLE_HERDS_SBI);
    await $(getConfirmCheckDetailsSelector("yes")).click();
    await clickSubmitButton();
    await clickStartNewClaimButton();
    await clickOnElementAndContinue(getTypeOfLivestockSelector("sheep"));
    await clickOnElementAndContinue(getTypeOfReviewSelector("review"));

    await enterVisitDateAndContinue();
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
    await fillInputAndContinue(LABORATORY_URN, "sh-rr-534344");
    await $(SUBMIT_CLAIM_BUTTON).click();
    await verifySubmission("Claim complete");
    await expect($(REFERENCE)).toHaveText(expect.stringContaining("RESH"));
  });
});
