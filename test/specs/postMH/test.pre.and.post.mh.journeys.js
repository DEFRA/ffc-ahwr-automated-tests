import { expect, browser, $ } from "@wdio/globals";
import {
  clickOnElementAndContinue,
  clickStartNewClaimButton,
  clickSubmitButton,
  enterPreMHReleaseDateAndContinue,
  enterVisitDateAndContinue,
  fillAndSubmitSBI,
  getDevSignInUrl,
} from "../../utils/common.js";
import {
  CLAIMS_MAIN_HEADING_SELECTOR,
  EXTERNAL_GOV_LINK,
  getTypeOfLivestockSelector,
  getTypeOfReviewSelector,
  getConfirmCheckDetailsSelector,
} from "../../utils/selectors.js";
import { PREVIOUSLY_CLAIMED_YES_ON_SELECT_THE_HERD_PAGE } from "../../utils/multiple-herd-selectors.js";
import {
  createMultipleHerdSheepFollowUp,
  createMultipleHerdPigsFollowUp,
} from "../../utils/follow-up-claim.js";
import { createPigsReviewClaim } from "../../utils/review-claim.js";
import {
  PRE_POST_MULTIPLE_HERD_SBI,
  PRE__POST_MULTIPLE_HERD_AGREEMENT_REF,
} from "../../utils/constants.js";
import { approveClaim } from "../../utils/backoffice-common.js";

describe("Pre-MH journeys when MH is switched on", () => {
  it("can create a follow-up claim for a pre-MH sheep review claim if the follow-up visit date is after the MH release date - associating the pre-MH unnamed flock with a real flock", async () => {
    /* Prerequisites – This test requires an application and a pre-MH sheep review claim, both added using the script
    located at changelog/insert_pre_post_mh_application_review.sql */
    // Do a follow-up for the pre-MH sheep review claim by using a visit date after the MH release date
    // This associates the pre-MH sheep review with the flock created as part of the follow-up claim
    await createMultipleHerdSheepFollowUp(PRE_POST_MULTIPLE_HERD_SBI, {
      isUnnamedHerdClaimPresent: true,
    });
  });

  it("A second follow-up claim, with visit date after MH release date, cannot be created within 10 months of the first follow-up claim for pre-MH sheep review", async () => {
    /* Prerequisites – This test requires an application and a pre-MH sheep review claim, both added using the script 
    located at changelog/insert_pre_post_mh_application_review.sql */
    // Do a follow-up for the pre-MH sheep review claim by using a visit date after the MH release date

    await browser.url(getDevSignInUrl("claim"));
    await fillAndSubmitSBI(PRE_POST_MULTIPLE_HERD_SBI);
    await $(getConfirmCheckDetailsSelector("yes")).click();
    await clickSubmitButton();
    await clickStartNewClaimButton();
    await clickOnElementAndContinue(getTypeOfLivestockSelector("sheep"));
    await clickOnElementAndContinue(getTypeOfReviewSelector("endemics"));
    await enterVisitDateAndContinue();
    await clickOnElementAndContinue(PREVIOUSLY_CLAIMED_YES_ON_SELECT_THE_HERD_PAGE);

    await expect($(CLAIMS_MAIN_HEADING_SELECTOR)).toHaveText(
      expect.stringContaining("You cannot continue with your claim"),
    );
    await expect($(EXTERNAL_GOV_LINK)).toHaveText(
      expect.stringContaining("There must be at least 10 months between your follow-ups."),
    );
  });

  it("can create follow-up claim with a visit date after the MH release date for a pre-MH pigs review - associating the pre-MH unnamed herd with a real herd", async () => {
    // Create a pre-MH review claim for pigs
    const claimNumber = await createPigsReviewClaim(PRE_POST_MULTIPLE_HERD_SBI, {
      enterVisitDateAndContinueFunc: enterPreMHReleaseDateAndContinue,
    });

    // Approve the pre-MH review claim
    await approveClaim(PRE__POST_MULTIPLE_HERD_AGREEMENT_REF, claimNumber);

    // Now do a follow-up for the pre-MH pigs review claim by using a visit date after the MH release date
    // This associates the pre-MH pigs review with the herd created as part of the follow-up claim
    await createMultipleHerdPigsFollowUp(PRE_POST_MULTIPLE_HERD_SBI, {
      isUnnamedHerdClaimPresent: true,
    });
  });

  it("cannot create a second review claim for pigs unnamed herd when visit date is after MH release date and second review claim date is within 10 months of its pre-MH review claim", async () => {
    await browser.url(getDevSignInUrl("claim"));
    await fillAndSubmitSBI(PRE_POST_MULTIPLE_HERD_SBI);
    await $(getConfirmCheckDetailsSelector("yes")).click();
    await clickSubmitButton();
    await clickStartNewClaimButton();
    await clickOnElementAndContinue(getTypeOfLivestockSelector("pigs"));
    await clickOnElementAndContinue(getTypeOfReviewSelector("review"));
    await enterVisitDateAndContinue();
    await clickOnElementAndContinue(PREVIOUSLY_CLAIMED_YES_ON_SELECT_THE_HERD_PAGE);

    await expect($(CLAIMS_MAIN_HEADING_SELECTOR)).toHaveText(
      expect.stringContaining("You cannot continue with your claim"),
    );
    await expect($(EXTERNAL_GOV_LINK)).toHaveText(
      expect.stringContaining("There must be at least 10 months between your reviews."),
    );
  });
});
