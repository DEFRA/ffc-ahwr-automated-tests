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

    await fillAndSubmitSBI(APPLY_REVIEW_CLAIM_SBI);

    console.log(await browser.getUrl())

    // const dashboardUrl = await browser.getUrl();
    // const fixedDashboardUrl = dashboardUrl.replace(
    //   "host.docker.internal:3003",
    //   "ffc-ahwr-dashboard:3000",
    // );
    // await browser.url(fixedDashboardUrl);

    // const applyUrl = await browser.getUrl();
    // console.log(applyUrl);
    // http://host.docker.internal:3003/dev-sign-in?sbi=107167406&cameFrom=apply

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
