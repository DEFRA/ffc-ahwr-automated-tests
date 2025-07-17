import { expect, browser, $ } from "@wdio/globals";
import {
  getDevSignInUrl,
  fillAndSubmitSBI,
  clickSubmitButton,
  verifySubmission,
  verifyElementsExist,
} from "../../utils/common.js";
import {
  TERMS_AND_CONDITIONS_CHECKBOX,
  AGREEMENT_SUMMARY_LINK,
  START_A_NEW_CLAIM_BUTTON,
  CLAIM_TABLE_ROW,
  LIVESTOCK_BEEF_RADIO,
  LIVESTOCK_DIARY_RADIO,
  LIVESTOCK_PIGS_RADIO,
  LIVESTOCK_SHEEP_RADIO,
  MANAGE_YOUR_CLAIMS_LINK,
  AGREEMENT_NUMBER_SELECTOR,
  getConfirmCheckDetailsSelector,
} from "../../utils/selectors.js";
import { DASHBOARD_SBI } from "../../utils/constants.js";
import { createSheepReviewClaim } from "../../utils/review-claim.js";

describe("Vet-visits Dashboard journeys", () => {
  it("can Verify agreement summary exists and a claim journey can be started from the dashboard", async () => {
    // Create an agreement
    await browser.url(getDevSignInUrl("apply"));
    await fillAndSubmitSBI(DASHBOARD_SBI);
    await $(getConfirmCheckDetailsSelector("yes")).click();
    await clickSubmitButton();
    await clickSubmitButton();
    await clickSubmitButton();
    await clickSubmitButton();
    await $(TERMS_AND_CONDITIONS_CHECKBOX).click();
    await clickSubmitButton();
    await verifySubmission("Application complete");
    const agreementNumber = (await $(AGREEMENT_NUMBER_SELECTOR).getText()).trim();

    // // create a claim
    const claimNumber = await createSheepReviewClaim(DASHBOARD_SBI, {
      multipleHerdFlag: true,
    });

    // Dashboard verifications
    await $(MANAGE_YOUR_CLAIMS_LINK).click();
    expect(await $(AGREEMENT_SUMMARY_LINK).getAttribute("href")).toContain(
      `download-application/${DASHBOARD_SBI}/${agreementNumber}`,
    );
    await $(AGREEMENT_SUMMARY_LINK).click();
    await expect($(CLAIM_TABLE_ROW)).toHaveText(expect.stringContaining(claimNumber));
    await $(START_A_NEW_CLAIM_BUTTON).click();

    const liveStockSelectors = [
      LIVESTOCK_BEEF_RADIO,
      LIVESTOCK_DIARY_RADIO,
      LIVESTOCK_PIGS_RADIO,
      LIVESTOCK_SHEEP_RADIO,
    ];
    await verifyElementsExist(liveStockSelectors);
  });
});
