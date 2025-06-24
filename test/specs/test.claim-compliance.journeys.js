import { browser, $, expect } from "@wdio/globals";

import { createSheepReviewClaim, getDevSignInUrl } from "../utils/common.js";

import { getAgreementNumberSelector } from "../utils/backoffice-selectors.js";

const fillerSbis = ["106416234", "107361798", "107645299", "106258541", "107346082"];

describe("Test claim compliance checks", async function () {
  beforeEach(async () => {
    for (const sbi of fillerSbis) {
      await createSheepReviewClaim(sbi, true);
    }
  });

  it("sets 5th claim to in check status and others to on hold", async () => {
    await browser.url(getDevSignInUrl("backoffice"));
    const claimRow = $(getAgreementNumberSelector(fillerSbis[4])).parentElement();
    const statusCol = await claimRow.$('td[data-sort-value="IN CHECK"]').isDisplayed();
    expect(statusCol).toBe(true);

    for (const sbi of fillerSbis.slice(0, 4)) {
      const claimRow = $(getAgreementNumberSelector(sbi)).parentElement();
      const statusCol = await claimRow.$('td[data-sort-value="ON HOLD"]').isDisplayed();
      expect(statusCol).toBe(true);
    }
  });
});
