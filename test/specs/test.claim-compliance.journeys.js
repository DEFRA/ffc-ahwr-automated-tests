import { browser } from "@wdio/globals";
import { createSheepReviewClaim, getDevSignInUrl } from "../utils/common.js";
import { assertClaimToBeInCheck, assertClaimToBeOnHold } from "../utils/common-assertions.js";

const fillerSbis = ["106416234", "107361798", "107645299", "106258541", "107346082"];

describe("Test claim compliance checks", async function () {
  beforeEach(async () => {
    for (const sbi of fillerSbis) {
      await createSheepReviewClaim(sbi, { multipleHerdFlag: true });
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
