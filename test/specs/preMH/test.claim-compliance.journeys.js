import { browser, $, expect } from "@wdio/globals";
import { getDevSignInUrl } from "../../utils/common.js";
import { getAgreementNumberSelector } from "../../utils/backoffice-selectors.js";
import { SHEEP_ENDEMIC_CLAIM_SBI } from "../../utils/constants.js";

describe("Compliance claim check journeys", () => {
  it("check correct claim has been set to in check status", async () => {
    await browser.url(getDevSignInUrl("backoffice"));

    const claimRow = $(getAgreementNumberSelector(SHEEP_ENDEMIC_CLAIM_SBI)).parentElement();
    expect(await claimRow.$('td[data-sort-value="IN CHECK"]').isDisplayed()).toBe(true);
  });
});
