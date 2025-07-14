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
import { createPigsReviewClaim, createSheepReviewClaim } from "../../utils/review-claim.js";
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
  it("cannot create a second review claim for sheep species when visit date is before mh release date and within 10 months of its pre-MH review claim", async () => {
    // Using an SBI that already has a pre-mh review claim
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
    const claimNumber = await createSheepReviewClaim(PRE_MULTIPLE_HERD_SBI, {
      multipleHerdFlag: true,
      isUnnamedHerdClaimPresent: true,
    });

    // Approve the mh review claim
    await approveClaim(PRE_MULTIPLE_HERD_AGREEMENT_REF, claimNumber);

    // now doing a follow-up for the pre-mh sheep review claim by using a visit date before the mh release date
    await createPreMultipleHerdSheepFollowUp(PRE_MULTIPLE_HERD_SBI);
  });

  it("can create a review and its follow-up claim for pigs if the visit date is before the MH release date", async () => {
    const claimNumber = await createPigsReviewClaim(PRE_MULTIPLE_HERD_SBI, {
      enterVisitDateAndContinueFunc: enterPreMHReleaseDateAndContinue,
    });

    // Approve the mh review claim
    await approveClaim(PRE_MULTIPLE_HERD_AGREEMENT_REF, claimNumber);

    // now doing a follow-up for the pre-mh pigs review claim by using a visit date before the mh release date
    await createPreMultipleHerdPigsFollowUp(PRE_MULTIPLE_HERD_SBI);
  });
});
