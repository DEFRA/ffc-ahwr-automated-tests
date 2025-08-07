import { expect, browser, $ } from "@wdio/globals";
import {
  clickOnElementAndContinue,
  clickStartNewClaimButton,
  clickSubmitButton,
  enterPreMHReleaseDateAndContinue,
  fillAndSubmitSBI,
  getDevSignInUrl,
  performDevLogin,
} from "../../utils/common.js";
import {
  createPreMultipleHerdPigsFollowUp,
  createPreMultipleHerdSheepFollowUp,
} from "../../utils/follow-up-claim.js";
import { createPigsReviewClaim } from "../../utils/review-claim.js";
import {
  CLAIMS_MAIN_HEADING_SELECTOR,
  EXTERNAL_GOV_LINK,
  CLAIM_REFERENCE,
  getTypeOfLivestockSelector,
  getTypeOfReviewSelector,
  getConfirmCheckDetailsSelector,
} from "../../utils/selectors.js";
import { PRE_MULTIPLE_HERD_SBI, PRE_MULTIPLE_HERD_AGREEMENT_REF } from "../../utils/constants.js";
import { approveClaim } from "../../utils/backoffice-common.js";

// This test suite covers various claim journeys with a visit date before the MH release date

describe("Journeys involving Pre-MH launch claims", () => {
  it("cannot create a second review claim for sheep species when visit date is before MH release date and within 10 months of its pre-MH review claim", async () => {
    // This test uses data from the script in changelog/insert_pre_mh_application_review.sql
    await performDevLogin(PRE_MULTIPLE_HERD_SBI, "claim");

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
    // This test uses data from the script in changelog/insert_pre_mh_application_review.sql
    await performDevLogin(PRE_MULTIPLE_HERD_SBI, "claim");

    await createPreMultipleHerdSheepFollowUp();

    await expect($(CLAIM_REFERENCE)).toHaveText(expect.stringContaining("FUSH"));
  });

  it("cannot create a second follow-up claim, with visit date before MH release date, within 10 months of the first follow-up claim for pre-MH sheep review", async () => {
    // This test uses data from the script in changelog/insert_pre_mh_application_review.sql
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
    await performDevLogin(PRE_MULTIPLE_HERD_SBI, "claim");

    const claimNumber = await createPigsReviewClaim({
      enterVisitDateAndContinueFunc: enterPreMHReleaseDateAndContinue,
    });

    await approveClaim(PRE_MULTIPLE_HERD_AGREEMENT_REF, claimNumber);

    await performDevLogin(PRE_MULTIPLE_HERD_SBI, "claim");

    await createPreMultipleHerdPigsFollowUp();

    await expect($(CLAIM_REFERENCE)).toHaveText(expect.stringContaining("FUPI"));
  });
});
