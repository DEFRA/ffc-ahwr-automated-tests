import { browser, $, expect } from "@wdio/globals";
import {
  BO_AGREEMENTS_TAB,
  getAgreementNumberSelector,
  BO_VIEW_CLAIMS_LINK,
  getViewClaimLinkSelector,
  BO_RECOMMEND_TO_PAY_BUTTON,
  BO_CHECKED_CHECKLIST_CHECKBOX,
  BO_SENT_CHECK_LIST_CHECKBOX,
  BO_CONFIRM_AND_CONTINUE_BUTTON,
  BO_CLAIM_STATUS_TEXT,
  BO_PAY_BUTTON,
  BO_PAY_CHECKBOX_ONE,
  BO_PAY_CHECKBOX_TWO,
} from "./backoffice-selectors";
import { getDevSignInUrl, swapBackOfficeUser } from "./common";

export async function approveClaim(agreementNumber, claimNumber) {
  await browser.url(getDevSignInUrl("backoffice"));
  await $(BO_AGREEMENTS_TAB).click();
  const agreementRow = $(getAgreementNumberSelector(agreementNumber)).parentElement();
  await agreementRow.$(BO_VIEW_CLAIMS_LINK).click();
  await $(getViewClaimLinkSelector(claimNumber)).click();
  await $(BO_RECOMMEND_TO_PAY_BUTTON).click();
  await $(BO_CHECKED_CHECKLIST_CHECKBOX).click();
  await $(BO_SENT_CHECK_LIST_CHECKBOX).click();
  await $(BO_CONFIRM_AND_CONTINUE_BUTTON).click();
  await expect($(BO_CLAIM_STATUS_TEXT)).toHaveText(expect.stringContaining("Recommended to pay"));

  // Swapping to another user to approve the claim
  await swapBackOfficeUser("Admin");
  await $(BO_AGREEMENTS_TAB).click();
  const agreementRowTwo = $(getAgreementNumberSelector(agreementNumber)).parentElement();
  await agreementRowTwo.$(BO_VIEW_CLAIMS_LINK).click();
  await $(getViewClaimLinkSelector(claimNumber)).click();
  await $(BO_PAY_BUTTON).click();
  await $(BO_PAY_CHECKBOX_ONE).click();
  await $(BO_PAY_CHECKBOX_TWO).click();
  await $(BO_CONFIRM_AND_CONTINUE_BUTTON).click();
  await expect($(BO_CLAIM_STATUS_TEXT)).toHaveText(expect.stringContaining("Ready to pay"));

  // Swapping to a different user to the approver to continue with other journeys
  await swapBackOfficeUser("Admin2");
}
