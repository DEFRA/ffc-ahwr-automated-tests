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

describe("Apply and claim journeys", () => {
  it("should be able to create a new application", async () => {
    await browser.url(getDevSignInUrl("apply"));

    browser.on("Network.responseReceived", (params) => {
      if (params.response.status >= 300 && params.response.status < 400) {
        console.log("🔁 Redirect found:", params.response.headers["location"]);
      }
    });

    await fillAndSubmitSBI(APPLY_REVIEW_CLAIM_SBI);

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
