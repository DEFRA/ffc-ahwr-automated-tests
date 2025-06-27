import { browser, $, expect } from "@wdio/globals";
import {
  createClaim,
  createClaimForAdditionalHerd,
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
    await createClaim(sbi, true);

    // WHEN additional review claims are made for additional herds
    const claimForHerd2 = await createClaimForAdditionalHerd(
      sbi,
      "sh-rr-534351",
      "Additional herd 1",
    );
    const claimForHerd3 = await createClaimForAdditionalHerd(
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
    const claimForFirstHerdSBI1 = await createClaim(sbi1, true);
    const claimForFirstHerdSBI2 = await createClaim(sbi2, true);

    // THEN max one should go to InCheck due to MH feature assurance rule delegating to ratio (1-in-5) rule
    await browser.url(getDevSignInUrl("backoffice"));
    assertSomeClaimsAreOnHold([claimForFirstHerdSBI1, claimForFirstHerdSBI2]);
  });

  it("claims before the MH feature assurance start date use ratio (1-in-5), even when user has claimed for more than one herd", async () => {
    // GIVEN two post-MH review claims for sheep
    const sbi1 = "106258541";
    await createClaim(sbi1, true);
    await createClaimForAdditionalHerd(sbi1, "sh-rr-534351", "Additional herd 1");
    const sbi2 = "107346082";
    await createClaim(sbi2, true);
    await createClaimForAdditionalHerd(sbi2, "sh-rr-534351", "Additional herd 1");

    // WHEN a claim is made with visit date before the MH feature assurance start date
    const preMhClaim1 = await createClaim(
      sbi1,
      false,
      enterPreMHReleaseDateAndContinue,
      "sh-rr-534347",
    );
    const preMhClaim2 = await createClaim(
      sbi2,
      false,
      enterPreMHReleaseDateAndContinue,
      "sh-rr-534347",
    );

    // THEN ratio (1-in-5) rule is used, at least one claim must go to OnHold
    await browser.url(getDevSignInUrl("backoffice"));
    assertSomeClaimsAreOnHold([preMhClaim1, preMhClaim2]);
  });
});
