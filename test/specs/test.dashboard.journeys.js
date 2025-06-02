import { expect, browser, $ } from "@wdio/globals";
import {
  getDevSignInUrl,
  fillAndSubmitSBI,
  clickSubmitButton,
  clickOnElementAndContinue,
  enterVisitDateAndContinue,
  enterWhenTestingWasCarriedOutAndContinue,
  fillInputAndContinue,
  verifySubmission,
  clickStartNewClaimButton,
} from "../utils/common.js";
import {
  TERMS_AND_CONDITIONS_CHECKBOX,
  AGREEMENT_SUMMARY_LINK,
  START_A_NEW_CLAIM_BUTTON,
  CLAIM_TABLE_ROW,
  CLAIMS_MAIN_HEADING_SELECTOR,
  NUMBER_OF_ANIMALS_TESTED,
  VETS_NAME,
  VET_RCVS_NUMBER,
  LABORATORY_URN,
  SUBMIT_CLAIM_BUTTON,
  REFERENCE,
  MANAGE_YOUR_CLAIMS_LINK,
  AGREEMENT_NUMBER_SELECTOR,
  getTypeOfLivestockSelector,
  getTypeOfReviewSelector,
  getSpeciesNumbersSelector,
  getConfirmCheckDetailsSelector,
} from "../utils/selectors.js";
import { DASHBOARD_SBI } from "../utils/constants.js";

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
    const agreementNumber = (
      await $(AGREEMENT_NUMBER_SELECTOR).getText()
    ).trim();

    // create a claim
    await browser.url(getDevSignInUrl("claim"));
    await fillAndSubmitSBI(DASHBOARD_SBI);
    await $(getConfirmCheckDetailsSelector("yes")).click();
    await clickSubmitButton();
    await clickStartNewClaimButton();
    await clickOnElementAndContinue(getTypeOfLivestockSelector("sheep"));
    await clickOnElementAndContinue(getTypeOfReviewSelector("review"));
    await enterVisitDateAndContinue();
    await enterWhenTestingWasCarriedOutAndContinue(
      "whenTheVetVisitedTheFarmToCarryOutTheReview",
    );
    await clickOnElementAndContinue(getSpeciesNumbersSelector("yes"));
    await fillInputAndContinue(NUMBER_OF_ANIMALS_TESTED, "10");
    await fillInputAndContinue(VETS_NAME, "Mr Auto Test");
    await fillInputAndContinue(VET_RCVS_NUMBER, "1234567");
    await fillInputAndContinue(LABORATORY_URN, "sh-rr-534346");
    await $(SUBMIT_CLAIM_BUTTON).click();
    await verifySubmission("Claim complete");
    await expect($(REFERENCE)).toHaveText(expect.stringContaining("RESH"));
    const claimNumber = await $(REFERENCE).getText();

    // Dashboard verifications
    await $(MANAGE_YOUR_CLAIMS_LINK).click();
    expect(await $(AGREEMENT_SUMMARY_LINK).getAttribute("href")).toContain(
      `download-application/${DASHBOARD_SBI}/${agreementNumber}`,
    );
    await $(AGREEMENT_SUMMARY_LINK).click();
    await expect($(CLAIM_TABLE_ROW)).toHaveText(
      expect.stringContaining(claimNumber),
    );
    await $(START_A_NEW_CLAIM_BUTTON).click();
    await expect($(CLAIMS_MAIN_HEADING_SELECTOR)).toHaveText(
      expect.stringContaining("Which species are you claiming for?"),
    );
  });
});
