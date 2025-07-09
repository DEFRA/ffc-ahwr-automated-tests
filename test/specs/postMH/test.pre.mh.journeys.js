import { expect, browser, $ } from "@wdio/globals";
import {
  getDevSignInUrl,
  fillAndSubmitSBI,
  clickSubmitButton,
  clickOnElementAndContinue,
  fillInputAndContinue,
  verifySubmission,
  clickStartNewClaimButton,
  enterPreMHReleaseDateAndContinue,
  enterWhenTestingWasCarriedOutAndContinue,
  selectSheepTestsAndContinue,
  createSheepReviewClaim,
} from "../../utils/common.js";
import {
  NUMBER_OF_ANIMALS_TESTED,
  VETS_NAME,
  VET_RCVS_NUMBER,
  SUBMIT_CLAIM_BUTTON,
  REFERENCE,
  CLAIMS_MAIN_HEADING_SELECTOR,
  EXTERNAL_GOV_LINK,
  getTypeOfLivestockSelector,
  getTypeOfReviewSelector,
  getSpeciesNumbersSelector,
  getConfirmCheckDetailsSelector,
  getSheepEndemicsPackageSelector,
  getTestResultSelector,
} from "../../utils/selectors.js";
import {
  PRE_MULTIPLE_HERDS_SBI,
  PRE_MULTIPLE_HERDS_SHEEP_AGREEMENT_REF,
  JOHNES_DISEASE,
} from "../../utils/constants.js";
import { approveClaim } from "../../utils/backoffice-common.js";

describe("Pre-MH journeys for sheep when MH is switched on", () => {
  it("cannot create a second review claim for sheep species when visit date is before mh release date and within 10 months of its pre-MH review claim", async () => {
    // Using an SBI that already has a pre-mh review claim
    await browser.url(getDevSignInUrl("claim"));
    await fillAndSubmitSBI(PRE_MULTIPLE_HERDS_SBI);
    await $(getConfirmCheckDetailsSelector("yes")).click();
    await clickSubmitButton();
    await clickStartNewClaimButton();
    await clickOnElementAndContinue(getTypeOfLivestockSelector("sheep"));
    await clickOnElementAndContinue(getTypeOfReviewSelector("review"));
    await enterPreMHReleaseDateAndContinue();

    await expect($(CLAIMS_MAIN_HEADING_SELECTOR)).toHaveText(
      expect.stringContaining("You cannot continue with your claim"),
    );
    await expect($(EXTERNAL_GOV_LINK)).toHaveText(
      expect.stringContaining("There must be at least 10 months between your reviews."),
    );
  });

  it("can create a follow-up claim for a pre-MH sheep review claim if the follow-up visit date is before the MH release date", async () => {
    const claimNumber = await createSheepReviewClaim(PRE_MULTIPLE_HERDS_SBI, {
      multipleHerdFlag: true,
      isUnnamedHerdClaimPresent: true,
    });

    // Approve the mh review claim
    await approveClaim(PRE_MULTIPLE_HERDS_SHEEP_AGREEMENT_REF, claimNumber);

    // now doing a follow-up for the pre-mh claim by using a visit date before the mh release date
    await browser.url(getDevSignInUrl("claim"));
    await fillAndSubmitSBI(PRE_MULTIPLE_HERDS_SBI);
    await $(getConfirmCheckDetailsSelector("yes")).click();
    await clickSubmitButton();
    await clickStartNewClaimButton();
    await clickOnElementAndContinue(getTypeOfLivestockSelector("sheep"));
    await clickOnElementAndContinue(getTypeOfReviewSelector("endemics"));

    await enterPreMHReleaseDateAndContinue();

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
});
