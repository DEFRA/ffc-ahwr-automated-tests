import { browser } from "@wdio/globals";
import {
  getDevSignInUrl,
  enterPreMHReleaseDateAndContinue,
  performDevLogin,
} from "../utils/common.js";
import {
  assertAllClaimsAreInCheck,
  assertSomeClaimsAreOnHold,
} from "../utils/common-assertions.js";
import {
  createSheepReviewClaim,
  createSheepReviewForAdditionalHerd,
} from "../utils/review-claim.js";

describe("Test claim MH feature assurance compliance checks", async function () {
  it("moves all claims to in-check once a user has claimed for more than one herd of a given species", async () => {
    const sbi = "106416234";

    // GIVEN a post-MH review claim for sheep
    await performDevLogin(sbi, "claim");
    await createSheepReviewClaim({ multipleHerdFlag: true });

    // WHEN additional review claims are made for additional herds
    await performDevLogin(sbi, "claim");
    const claimForHerd2 = await createSheepReviewForAdditionalHerd(
      "sh-rr-534351",
      "Additional herd 1",
    );

    await performDevLogin(sbi, "claim");
    const claimForHerd3 = await createSheepReviewForAdditionalHerd(
      "sh-rr-534352",
      "Additional herd 2",
    );

    // THEN all additional review claims go to 'In check'
    await browser.url(getDevSignInUrl("backoffice"));
    assertAllClaimsAreInCheck([claimForHerd2, claimForHerd3]);
  });

  it("uses the ratio (1-in-5) check when user claiming for their first herd", async () => {
    // GIVEN two businesses without any claims
    const sbi1 = "107361798";
    const sbi2 = "107645299";

    // WHEN each makes a claim for their first herd
    await performDevLogin(sbi1, "claim");
    const claimForFirstHerdSBI1 = await createSheepReviewClaim({
      multipleHerdFlag: true,
    });
    await performDevLogin(sbi2, "claim");
    const claimForFirstHerdSBI2 = await createSheepReviewClaim({
      multipleHerdFlag: true,
    });

    // THEN max one should go to InCheck due to MH feature assurance rule delegating to ratio (1-in-5) rule
    await browser.url(getDevSignInUrl("backoffice"));
    assertSomeClaimsAreOnHold([claimForFirstHerdSBI1, claimForFirstHerdSBI2]);
  });

  it("uses ratio (1-in-5) check when claim is before the MH feature assurance start date, even if user has claimed for more than one herd", async () => {
    // GIVEN two post-MH review claims for sheep
    const sbi1 = "106258541";
    await performDevLogin(sbi1, "claim");
    await createSheepReviewClaim({ multipleHerdFlag: true });
    await performDevLogin(sbi1, "claim");
    await createSheepReviewForAdditionalHerd("sh-rr-534351", "Additional herd 1");
    const sbi2 = "107346082";
    await performDevLogin(sbi2, "claim");
    await createSheepReviewClaim({ multipleHerdFlag: true });
    await performDevLogin(sbi2, "claim");
    await createSheepReviewForAdditionalHerd("sh-rr-534351", "Additional herd 1");

    // WHEN a claim is made with visit date before the MH feature assurance start date
    await performDevLogin(sbi1, "claim");
    const preMhClaim1 = await createSheepReviewClaim({
      urn: "sh-rr-534347",
      enterVisitDateAndContinueFunc: enterPreMHReleaseDateAndContinue,
    });
    await performDevLogin(sbi2, "claim");
    const preMhClaim2 = await createSheepReviewClaim({
      urn: "sh-rr-534348",
      enterVisitDateAndContinueFunc: enterPreMHReleaseDateAndContinue,
    });

    // THEN ratio (1-in-5) rule is used, at least one claim must go to OnHold
    await browser.url(getDevSignInUrl("backoffice"));
    assertSomeClaimsAreOnHold([preMhClaim1, preMhClaim2]);
  });
});
