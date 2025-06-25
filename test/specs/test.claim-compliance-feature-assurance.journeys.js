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

const assertNotAllClaimsAreInCheck = async (claimNumbers) => {
  expect(claimNumbers.some((claimNum) => !isClaimStatusInCheck(claimNum)).toBe(true));
};

const isClaimStatusInCheck = async (claimNumber) => {
  const claimRow = $(getClaimSelectorFromTable(claimNumber)).parentElement();
  return await claimRow.$('td[data-sort-value="IN CHECK"]').isDisplayed();
};

describe("Test claim MH feature assurance compliance checks", async function () {
  it("all claims go to in-check for additional herds beyond their first herd", async () => {
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
    assertNotAllClaimsAreInCheck([claimForFirstHerdSBI1, claimForFirstHerdSBI2]);
  });

  it.skip("claims before the MH feature assurance start date use ratio (1-in-5), even when for additional herds", async () => {
    // GIVEN two post-MH review claims for sheep
    const sbi = "106258541";
    await createClaim(sbi, true);
    await createClaimForAdditionalHerd(sbi, "sh-rr-534351", "Additional herd 1");

    // WHEN a claim is made with visit date before the MH feature assurance start date
    const preMhClaim = await createClaim(sbi, false, enterPreMHReleaseDateAndContinue);

    // THEN ratio (1-in-5) rule is used and claim so go to OnHold
    await browser.url(getDevSignInUrl("backoffice"));
    expect(isClaimStatusInCheck(preMhClaim)).toBe(false);
  });
});
