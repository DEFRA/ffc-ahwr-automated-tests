import { expect, browser, $, $$ } from "@wdio/globals";
import {
  getDevSignInUrl,
  fillAndSubmitSBI,
  clickSubmitButton,
  clickOnElementAndContinue,
  enterVisitDateAndContinue,
  enterWhenTestingWasCarriedOutAndContinue,
  fillInputAndContinue,
  fillInput,
  verifySubmission,
  clickStartNewClaimButton,
} from "../utils/common.js";
import {
  AGREEMENT_NUMBER_SELECTOR,
  TERMS_AND_CONDITIONS_CHECKBOX,
  NUMBER_OF_ANIMALS_TESTED,
  VETS_NAME,
  VET_RCVS_NUMBER,
  LABORATORY_URN,
  SUBMIT_CLAIM_BUTTON,
  REFERENCE,
  getTypeOfLivestockSelector,
  getTypeOfReviewSelector,
  getSpeciesNumbersSelector,
  getConfirmCheckDetailsSelector,
} from "../utils/selectors.js";
import {
  BO_AGREEMENTS_TAB,
  BO_FLAGS_TAB,
  BO_VIEW_CLAIMS_LINK_SELECTOR,
  BO_RECOMMEND_TO_PAY_BUTTON,
  BO_CHECKED_AGAINST_CHECKLIST_SELECTOR,
  BO_SENT_CHECKLIST_SELECTOR,
  BO_CONFIRM_AND_CONTINUE_BUTTON,
  BO_CLAIM_STATUS_TEXT_SELECTOR,
  BO_BACK_TO_ALL_CLAIMS_SELECTOR,
  BO_CLAIMS_MAIN_HEADING_SELECTOR,
  BO_CREATE_AGREEMENT_FLAG_CTA,
  BO_AGREEMENT_REFERENCE,
  BO_FLAG_CREATION_NOTE,
  BO_CREATE_FLAG_BUTTON,
  BO_DELETE_FLAG_BUTTON,
  BO_FLAG_DELETION_NOTE,
  BO_SUBMIT_DELETE_FLAG_BUTTON,
  getAgreementNumberSelector,
  getViewClaimLinkSelector,
  getAgreeToMultipleHerdTermsSelector,
  getFlaggedAgreementRowSelector,
} from "../utils/backoffice-selectors.js";
import { BACK_OFFICE_SBI, BACK_OFFICE_FLAG_SBI } from "../utils/constants.js";

describe("Backoffice journeys", () => {
  // Enable this test when the issue AHWR-692 is resolved.
  it.skip("To view agreement and its claim and move the claim from In check to Recommend to pay", async () => {
    // Create an agreement
    await browser.url(getDevSignInUrl("apply"));
    await fillAndSubmitSBI(BACK_OFFICE_SBI);
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
    await fillAndSubmitSBI(BACK_OFFICE_SBI);
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

    // Backoffice verifications
    await browser.url(getDevSignInUrl("backoffice"));
    await $(BO_AGREEMENTS_TAB).click();
    const agreementRow = $(
      getAgreementNumberSelector(agreementNumber),
    ).parentElement();
    await agreementRow.$(BO_VIEW_CLAIMS_LINK_SELECTOR).click();
    await $(getViewClaimLinkSelector(claimNumber)).click();
    await $(BO_RECOMMEND_TO_PAY_BUTTON).click();
    await $(BO_CHECKED_AGAINST_CHECKLIST_SELECTOR).click();
    await $(BO_SENT_CHECKLIST_SELECTOR).click();
    await $(BO_CONFIRM_AND_CONTINUE_BUTTON).click();
    await expect($(BO_CLAIM_STATUS_TEXT_SELECTOR)).toHaveText(
      expect.stringContaining("Recommended to pay"),
    );
    await $(BO_BACK_TO_ALL_CLAIMS_SELECTOR).click();
    await expect($(BO_CLAIMS_MAIN_HEADING_SELECTOR)).toHaveText(
      expect.stringContaining("Claims and agreements"),
    );
  });

  // Enable this test when the issue AHWR-768 is resolved.
  it.skip("create and delete a flag for an agreement", async () => {
    // Create an agreement
    await browser.url(getDevSignInUrl("apply"));
    await fillAndSubmitSBI(BACK_OFFICE_FLAG_SBI);
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
    await fillAndSubmitSBI(BACK_OFFICE_FLAG_SBI);
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

    // Agreement flag creation
    await browser.url(getDevSignInUrl("backoffice"));
    await $(BO_FLAGS_TAB).click();
    await $(BO_CREATE_AGREEMENT_FLAG_CTA).click();
    await fillInput(BO_AGREEMENT_REFERENCE, agreementNumber);
    await fillInput(BO_FLAG_CREATION_NOTE, "Flag creation notes");
    await $(getAgreeToMultipleHerdTermsSelector("yes")).click();
    await $(BO_CREATE_FLAG_BUTTON).click();

    // Agreement flag deletion
    const flaggedAgreementRow = $(
      getFlaggedAgreementRowSelector(agreementNumber, "Yes"),
    );
    await flaggedAgreementRow.$(BO_DELETE_FLAG_BUTTON).click();
    await fillInput(BO_FLAG_DELETION_NOTE, "Flag deletion notes");
    await $(BO_SUBMIT_DELETE_FLAG_BUTTON).click();
    const flaggedAgreementRows = $$(
      getFlaggedAgreementRowSelector(agreementNumber, "Yes"),
    );
    await expect(flaggedAgreementRows.length).toBe(0);
  });
});
