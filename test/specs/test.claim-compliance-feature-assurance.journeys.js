import { browser, $, expect } from "@wdio/globals";
import {
  createSheepReviewClaim,
  createSheepReviewForAdditionalHerd,
  getDevSignInUrl,
  enterPreMHReleaseDateAndContinue,
} from "../utils/common.js";
import { getClaimSelectorFromTable } from "../utils/backoffice-selectors.js";

const assertAllClaimsAreInCheck = async (claimNumbers) => {
  claimNumbers.forEach((claimNum) => expect(isClaimStatusInCheck(claimNum)).toBe(true));
};

const assertSomeClaimsAreOnHold = async (claimNumbers) => {
  expect(claimNumbers.some((claimNum) => isClaimStatusOnHold(claimNum)).toBe(true));
};

const isClaimStatusInCheck = async (claimNumber) => {
  const claimRow = $(getClaimSelectorFromTable(claimNumber)).parentElement();
  return await claimRow.$('td[data-sort-value="IN CHECK"]').isDisplayed();
};

const isClaimStatusOnHold = async (claimNumber) => {
  const claimRow = $(getClaimSelectorFromTable(claimNumber)).parentElement();
  return await claimRow.$('td[data-sort-value="ON HOLD"]').isDisplayed();
};

describe("Test claim MH feature assurance compliance checks", async function () {
  it("all claims go to in-check once a user has claimed for more than one herd of a given species", async () => {
    // GIVEN a post-MH review claim for sheep
    const sbi = "106416234";
    await createSheepReviewClaim(sbi, true);

    // WHEN additional review claims are made for additional herds
    const claimForHerd2 = await createSheepReviewForAdditionalHerd(
      sbi,
      "sh-rr-534351",
      "Additional herd 1",
    );
    const claimForHerd3 = await createSheepReviewForAdditionalHerd(
      sbi,
      "sh-rr-534352",
      "Additional herd 2",
    );

    // THEN all additional review claims go to 'In check'
    await browser.url(getDevSignInUrl("backoffice"));
    assertAllClaimsAreInCheck([claimForHerd2, claimForHerd3]);
  });

  it("first herd claimed for will use ratio (1-in-5)", async () => {
    // GIVEN two businesses without any claims
    const sbi1 = "107361798";
    const sbi2 = "107645299";

    // WHEN each makes a claim for their first herd
    const claimForFirstHerdSBI1 = await createSheepReviewClaim(sbi1, true);
    const claimForFirstHerdSBI2 = await createSheepReviewClaim(sbi2, true);

    // THEN max one should go to InCheck due to MH feature assurance rule delegating to ratio (1-in-5) rule
    await browser.url(getDevSignInUrl("backoffice"));
    assertSomeClaimsAreOnHold([claimForFirstHerdSBI1, claimForFirstHerdSBI2]);
  });

  it("claims before the MH feature assurance start date use ratio (1-in-5), even when user has claimed for more than one herd", async () => {
    // GIVEN two post-MH review claims for sheep
    const sbi1 = "106258541";
    await createSheepReviewClaim(sbi1, true);
    await createSheepReviewForAdditionalHerd(sbi1, "sh-rr-534351", "Additional herd 1");
    const sbi2 = "107346082";
    await createSheepReviewClaim(sbi2, true);
    await createSheepReviewForAdditionalHerd(sbi2, "sh-rr-534351", "Additional herd 1");

    // WHEN a claim is made with visit date before the MH feature assurance start date
    const preMhClaim1 = await createSheepReviewClaim(
      sbi1,
      false,
      "sh-rr-534347",
      enterPreMHReleaseDateAndContinue,
    );
    const preMhClaim2 = await createSheepReviewClaim(
      sbi2,
      false,
      "sh-rr-534347",
      enterPreMHReleaseDateAndContinue,
    );

    // THEN ratio (1-in-5) rule is used, at least one claim must go to OnHold
    await browser.url(getDevSignInUrl("backoffice"));
    assertSomeClaimsAreOnHold([preMhClaim1, preMhClaim2]);
  });
});
