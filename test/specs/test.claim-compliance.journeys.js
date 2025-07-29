import { browser, expect } from "@wdio/globals";
import { getDevSignInUrl, performDevLogin } from "../utils/common.js";
import { assertClaimToBeInCheck, assertClaimToBeOnHold } from "../utils/common-assertions.js";
import { createSheepReviewClaim } from "../utils/review-claim.js";

const fillerSbis = ["106416234", "107361798", "107645299", "106258541", "107346082"];

describe("Test claim compliance checks", async function () {
  beforeEach(async () => {
    for (const sbi of fillerSbis) {
      await performDevLogin(sbi, "claim");
      const claimNumber = await createSheepReviewClaim({ multipleHerdFlag: true });
      expect(claimNumber).toEqual(expect.stringContaining("RESH"));
    }
  });

  it("sets 5th claim to in check status and others to on hold", async () => {
    await browser.url(getDevSignInUrl("backoffice"));
    assertClaimToBeInCheck(fillerSbis[4]);

    for (const sbi of fillerSbis.slice(0, 4)) {
      assertClaimToBeOnHold(sbi);
    }
  });
});
