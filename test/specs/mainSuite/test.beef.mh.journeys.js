import { expect, $ } from "@wdio/globals";
import { performDevLogin } from "../../utils/common.js";
import { CLAIM_REFERENCE } from "../../utils/selectors.js";
import { MULTIPLE_HERDS_SBI, MULTIPLE_HERD_SHEEP_AGREEMENT_REF } from "../../utils/constants.js";
import { approveClaim } from "../../utils/backoffice-common.js";
import {
  createBeefReviewClaim,
  createBeefReviewForAdditionalHerd,
} from "../../utils/review-claim.js";
import {
  createMultipleHerdBeefFollowUpForFirstHerd,
  createMultipleHerdBeefFollowUpForAdditionalHerd,
} from "../../utils/follow-up-claim.js";

let claimNumber;
const additionalHerd = "Beef additional herd 1";

describe("Multiple herds - review and follow-up claim journeys for beef", () => {
  it("can create the first review claim with a positive test result for a beef herd for a farmer business", async () => {
    await performDevLogin(MULTIPLE_HERDS_SBI, "claim");

    claimNumber = await createBeefReviewClaim({
      testResult: "positive",
    });

    expect(claimNumber).toEqual(expect.stringContaining("REBC"));
  });

  it("can create a follow-up claim for an approved review claim with positive test result", async () => {
    await approveClaim(MULTIPLE_HERD_SHEEP_AGREEMENT_REF, claimNumber);

    await performDevLogin(MULTIPLE_HERDS_SBI, "claim");

    await createMultipleHerdBeefFollowUpForFirstHerd();

    await expect($(CLAIM_REFERENCE)).toHaveText(expect.stringContaining("FUBC"));
  });

  it("can create a review claim with negative test result for a different group (herd) of beef species for the same farmer business", async () => {
    await performDevLogin(MULTIPLE_HERDS_SBI, "claim");

    claimNumber = await createBeefReviewForAdditionalHerd({
      herd: additionalHerd,
      testResult: "negative",
    });

    await expect($(CLAIM_REFERENCE)).toHaveText(expect.stringContaining("REBC"));
  });

  it("can create a follow-up claim for the approved beef review claim with negative test result", async () => {
    await approveClaim(MULTIPLE_HERD_SHEEP_AGREEMENT_REF, claimNumber);

    await performDevLogin(MULTIPLE_HERDS_SBI, "claim");

    await createMultipleHerdBeefFollowUpForAdditionalHerd({
      herdName: additionalHerd,
      testResult: "negative",
      urn: "bc-fu-521348",
    });

    await expect($(CLAIM_REFERENCE)).toHaveText(expect.stringContaining("FUBC"));
  });
});
