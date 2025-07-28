import { expect, browser, $ } from "@wdio/globals";
import {
  clickOnElementAndContinue,
  clickStartNewClaimButton,
  clickSubmitButton,
  enterPreMHReleaseDateAndContinue,
  fillAndSubmitSBI,
  getDevSignInUrl,
} from "../../utils/common.js";
import {
  createPreMultipleHerdPigsFollowUp,
  createPreMultipleHerdSheepFollowUp,
} from "../../utils/follow-up-claim.js";
import { createPigsReviewClaim } from "../../utils/review-claim.js";
import {
  CLAIMS_MAIN_HEADING_SELECTOR,
  EXTERNAL_GOV_LINK,
  getTypeOfLivestockSelector,
  getTypeOfReviewSelector,
  getConfirmCheckDetailsSelector,
} from "../../utils/selectors.js";
import { PRE_MULTIPLE_HERD_SBI, PRE_MULTIPLE_HERD_AGREEMENT_REF } from "../../utils/constants.js";
import { approveClaim } from "../../utils/backoffice-common.js";

describe("Pre-MH journeys when MH is switched on", () => {
  it("cannot create a second review claim for sheep species when visit date is before MH release date and within 10 months of its pre-MH review claim", async () => {
    /* Pre-requisites - this test uses an application and pre-mh sheep review claim added using the script
    in changelog/insert_pre_mh_application_review.sql */
    await browser.url(getDevSignInUrl("claim"));
    await fillAndSubmitSBI(PRE_MULTIPLE_HERD_SBI);
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
    /* Prerequisites: This test requires an application and a pre-MH sheep review claim, which are inserted using the script
    // located at changelog/insert_pre_mh_application_review.sql script */
    // Do a follow-up for the pre-MH sheep review claim by using a visit date before the MH release date
    // The follow-up claim will label the flock name as 'Unnamed flock' for both the pre-MH sheep review and the follow-up claim
    await createPreMultipleHerdSheepFollowUp(PRE_MULTIPLE_HERD_SBI);
  });

  it("A second follow-up claim, with visit date before MH release date, cannot be created within 10 months of the first follow-up claim for pre-MH sheep review", async () => {
    // Prerequisites: This test requires an application and a pre-MH sheep review claim, which are inserted using the changelog/insert_pre_mh_application_review.sql script
    // Do a follow-up for the pre-MH sheep review claim by using a visit date before the MH release date
    await browser.url(getDevSignInUrl("claim"));
    await fillAndSubmitSBI(PRE_MULTIPLE_HERD_SBI);
    await $(getConfirmCheckDetailsSelector("yes")).click();
    await clickSubmitButton();
    await clickStartNewClaimButton();
    await clickOnElementAndContinue(getTypeOfLivestockSelector("sheep"));
    await clickOnElementAndContinue(getTypeOfReviewSelector("endemics"));
    await enterPreMHReleaseDateAndContinue();

    await expect($(CLAIMS_MAIN_HEADING_SELECTOR)).toHaveText(
      expect.stringContaining("You cannot continue with your claim"),
    );
    await expect($(EXTERNAL_GOV_LINK)).toHaveText(
      expect.stringContaining("There must be at least 10 months between your follow-ups."),
    );
  });

  it("can create a review and its follow-up claim for pigs if the visit date is before the MH release date", async () => {
    // Create a pigs pre-MH review claim
    const claimNumber = await createPigsReviewClaim(PRE_MULTIPLE_HERD_SBI, {
      enterVisitDateAndContinueFunc: enterPreMHReleaseDateAndContinue,
    });

    // Approve the pigs pre-MH review claim
    await approveClaim(PRE_MULTIPLE_HERD_AGREEMENT_REF, claimNumber);

    // Now do a follow-up for the pre-MH pigs review claim by using a visit date before the MH release date
    await createPreMultipleHerdPigsFollowUp(PRE_MULTIPLE_HERD_SBI);
  });
});
