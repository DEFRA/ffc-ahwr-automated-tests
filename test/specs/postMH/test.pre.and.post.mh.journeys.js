import { expect, $ } from "@wdio/globals";
import {
  clickOnElementAndContinue,
  clickStartNewClaimButton,
  enterPreMHReleaseDateAndContinue,
  enterVisitDateAndContinue,
  performDevLogin,
} from "../../utils/common.js";
import {
  CLAIM_REFERENCE,
  CLAIMS_MAIN_HEADING_SELECTOR,
  EXTERNAL_GOV_LINK,
  getTypeOfLivestockSelector,
  getTypeOfReviewSelector,
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

// This test suite covers various claim journeys with a visit date after the MH release date for the pre-MH claims

describe("MH journeys when Pre-MH claims present", () => {
  it("can create a follow-up claim for a pre-MH sheep review claim if the follow-up visit date is after the MH release date - associating the pre-MH unnamed flock with a real flock", async () => {
    // This test uses data from the script located at changelog/insert_pre_post_mh_application_review.sql
    await performDevLogin(PRE_POST_MULTIPLE_HERD_SBI, "claim");

    await createMultipleHerdSheepFollowUp({
      isUnnamedHerdClaimPresent: true,
    });

    await expect($(CLAIM_REFERENCE)).toHaveText(expect.stringContaining("FUSH"));
  });

  it("cannot create a second follow-up claim, with visit date after MH release date and within 10 months of the first follow-up claim for pre-MH sheep review", async () => {
    // This test uses data from the script located at changelog/insert_pre_post_mh_application_review.sql
    await performDevLogin(PRE_POST_MULTIPLE_HERD_SBI, "claim");

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
    await performDevLogin(PRE_POST_MULTIPLE_HERD_SBI, "claim");

    const claimNumber = await createPigsReviewClaim({
      enterVisitDateAndContinueFunc: enterPreMHReleaseDateAndContinue,
    });
    await expect($(CLAIM_REFERENCE)).toHaveText(expect.stringContaining("REPI"));

    await approveClaim(PRE__POST_MULTIPLE_HERD_AGREEMENT_REF, claimNumber);

    await performDevLogin(PRE_POST_MULTIPLE_HERD_SBI, "claim");

    await createMultipleHerdPigsFollowUp({
      isUnnamedHerdClaimPresent: true,
    });

    await expect($(CLAIM_REFERENCE)).toHaveText(expect.stringContaining("FUPI"));
  });

  it("cannot create a second review claim for pigs unnamed herd when visit date is after MH release date and second review claim date is within 10 months of its pre-MH review claim", async () => {
    await performDevLogin(PRE_POST_MULTIPLE_HERD_SBI, "claim");

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
