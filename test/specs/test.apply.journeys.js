import { browser, $ } from "@wdio/globals";
import {
  getDevSignInUrl,
  fillAndSubmitSBI,
  clickSubmitButton,
  verifySubmission,
} from "../utils/common.js";
import {
  TERMS_AND_CONDITIONS_CHECKBOX,
  getConfirmCheckDetailsSelector,
} from "../utils/selectors.js";
import { APPLY_REVIEW_CLAIM_SBI } from "../utils/constants.js";

describe("Apply journey", () => {
  it("should be able to create a new application", async () => {
    await browser.url(getDevSignInUrl("apply"));

    await fillAndSubmitSBI(APPLY_REVIEW_CLAIM_SBI);

    // const allCookies = await browser.getCookies()
    // console.log(allCookies);
    console.log("URLURLURLURL", await browser.getUrl());
    console.log(await browser.getPageSource());

    await $(getConfirmCheckDetailsSelector("yes")).click();
    await clickSubmitButton();

    await clickSubmitButton();
    await clickSubmitButton();
    await clickSubmitButton();

    await $(TERMS_AND_CONDITIONS_CHECKBOX).click();
    await clickSubmitButton();

    await verifySubmission("Application complete");
  });
});
