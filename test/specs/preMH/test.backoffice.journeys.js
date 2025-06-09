import { expect, browser, $, $$ } from "@wdio/globals";
import {
  getDevSignInUrl,
  fillInput,
  createAgreement,
  createClaim,
  swapBackOfficeUser,
} from "../../utils/common.js";
import {
  BO_AGREEMENTS_TAB,
  BO_FLAGS_TAB,
  BO_VIEW_CLAIMS_LINK,
  BO_RECOMMEND_TO_PAY_BUTTON,
  BO_RECOMMEND_TO_REJECT_BUTTON,
  BO_CHECKED_CHECKLIST_CHECKBOX,
  BO_SENT_CHECK_LIST_CHECKBOX,
  BO_CONFIRM_AND_CONTINUE_BUTTON,
  BO_CLAIM_STATUS_TEXT,
  BO_PAY_CHECKBOX_ONE,
  BO_PAY_CHECKBOX_TWO,
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
  BO_PAY_BUTTON,
  BO_REJECT_BUTTON,
  BO_MOVE_TO_IN_CHECK_BUTTON,
  BO_ON_HOLD_TO_IN_CHECK_CHECKBOX,
  BO_UPDATE_ISSUES_LOG_CHECKBOX,
  BO_CLAIM_SEARCH,
  BO_SEARCH_BUTTON,
  getClaimSelectorFromTable,
  BO_HISTORY_TAB,
} from "../../utils/backoffice-selectors.js";
import {
  BACK_OFFICE_APPROVE_SBI,
  BACK_OFFICE_REJECT_SBI,
  ON_HOLD_AGREEMENT_REF,
  ON_HOLD_CLAIM_REF,
} from "../../utils/constants.js";

describe("Backoffice journeys", () => {
  it("can move a claim from 'In check' to 'Recommend to pay' and then to 'Ready to pay'", async () => {
    const agreementNumber = await createAgreement(BACK_OFFICE_APPROVE_SBI, browser);
    const claimNumber = await createClaim(BACK_OFFICE_APPROVE_SBI, browser);

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
    await swapBackOfficeUser("Approver", browser);
    await $(BO_AGREEMENTS_TAB).click();
    const agreementRowTwo = $(getAgreementNumberSelector(agreementNumber)).parentElement();
    await agreementRowTwo.$(BO_VIEW_CLAIMS_LINK).click();
    await $(getViewClaimLinkSelector(claimNumber)).click();
    await $(BO_PAY_BUTTON).click();
    await $(BO_PAY_CHECKBOX_ONE).click();
    await $(BO_PAY_CHECKBOX_TWO).click();
    await $(BO_CONFIRM_AND_CONTINUE_BUTTON).click();
    await expect($(BO_CLAIM_STATUS_TEXT)).toHaveText(expect.stringContaining("Ready to pay"));
  });

  it("can move a claim from 'In check' to 'Recommend to reject' and then to 'Rejected'", async () => {
    const agreementNumber = await createAgreement(BACK_OFFICE_REJECT_SBI, browser);
    const claimNumber = await createClaim(BACK_OFFICE_REJECT_SBI, browser);

    await browser.url(getDevSignInUrl("backoffice"));
    await $(BO_AGREEMENTS_TAB).click();
    const agreementRow = $(getAgreementNumberSelector(agreementNumber)).parentElement();
    await agreementRow.$(BO_VIEW_CLAIMS_LINK).click();
    await $(getViewClaimLinkSelector(claimNumber)).click();
    await $(BO_RECOMMEND_TO_REJECT_BUTTON).click();
    await $(BO_CHECKED_CHECKLIST_CHECKBOX).click();
    await $(BO_SENT_CHECK_LIST_CHECKBOX).click();
    await $(BO_CONFIRM_AND_CONTINUE_BUTTON).click();
    await expect($(BO_CLAIM_STATUS_TEXT)).toHaveText(
      expect.stringContaining("Recommended to reject"),
    );

    // Swapping to another user to reject the claim
    await swapBackOfficeUser("Rejector", browser);
    await $(BO_AGREEMENTS_TAB).click();
    const agreementRowTwo = $(getAgreementNumberSelector(agreementNumber)).parentElement();
    await agreementRowTwo.$(BO_VIEW_CLAIMS_LINK).click();
    await $(getViewClaimLinkSelector(claimNumber)).click();
    await $(BO_REJECT_BUTTON).click();
    await $(BO_PAY_CHECKBOX_ONE).click();
    await $(BO_PAY_CHECKBOX_TWO).click();
    await $(BO_CONFIRM_AND_CONTINUE_BUTTON).click();
    await expect($(BO_CLAIM_STATUS_TEXT)).toHaveText(expect.stringContaining("Rejected"));
  });

  it("creates and deletes a flag for an agreement", async () => {
    // Agreement flag creation
    await browser.url(getDevSignInUrl("backoffice"));
    await $(BO_FLAGS_TAB).click();
    await $(BO_CREATE_AGREEMENT_FLAG_CTA).click();
    await fillInput(BO_AGREEMENT_REFERENCE, ON_HOLD_AGREEMENT_REF);
    await fillInput(BO_FLAG_CREATION_NOTE, "Flag creation notes");
    await $(getAgreeToMultipleHerdTermsSelector("yes")).click();
    await $(BO_CREATE_FLAG_BUTTON).click();

    // Agreement flag deletion
    const flaggedAgreementRow = $(getFlaggedAgreementRowSelector(ON_HOLD_AGREEMENT_REF, "Yes"));
    await flaggedAgreementRow.$(BO_DELETE_FLAG_BUTTON).click();
    await fillInput(BO_FLAG_DELETION_NOTE, "Flag deletion notes");
    await $(BO_SUBMIT_DELETE_FLAG_BUTTON).click();
    const flaggedAgreementRows = await $$(
      getFlaggedAgreementRowSelector(ON_HOLD_AGREEMENT_REF, "Yes"),
    );
    expect(flaggedAgreementRows.length).toBe(0);
  });

  it("can move an on hold claim from 'On hold' to 'In check' and then to 'Recommend to reject', and finally 'Rejected'", async () => {
    await swapBackOfficeUser("Initial-user", browser);
    await $(BO_AGREEMENTS_TAB).click();
    const agreementRow = $(getAgreementNumberSelector(ON_HOLD_AGREEMENT_REF)).parentElement();
    await agreementRow.$(BO_VIEW_CLAIMS_LINK).click();
    await $(getViewClaimLinkSelector(ON_HOLD_CLAIM_REF)).click();

    await $(BO_MOVE_TO_IN_CHECK_BUTTON).click();
    await $(BO_ON_HOLD_TO_IN_CHECK_CHECKBOX).click();
    await $(BO_UPDATE_ISSUES_LOG_CHECKBOX).click();
    await $(BO_CONFIRM_AND_CONTINUE_BUTTON).click();

    await $(BO_RECOMMEND_TO_REJECT_BUTTON).click();
    await $(BO_CHECKED_CHECKLIST_CHECKBOX).click();
    await $(BO_SENT_CHECK_LIST_CHECKBOX).click();
    await $(BO_CONFIRM_AND_CONTINUE_BUTTON).click();

    await expect($(BO_CLAIM_STATUS_TEXT)).toHaveText(
      expect.stringContaining("Recommended to reject"),
    );

    // Swapping to another user to reject the claim
    await swapBackOfficeUser("Rejector", browser);
    await $(BO_AGREEMENTS_TAB).click();
    const agreementRowTwo = $(getAgreementNumberSelector(ON_HOLD_AGREEMENT_REF)).parentElement();
    await agreementRowTwo.$(BO_VIEW_CLAIMS_LINK).click();
    await $(getViewClaimLinkSelector(ON_HOLD_CLAIM_REF)).click();

    await $(BO_REJECT_BUTTON).click();
    await $(BO_PAY_CHECKBOX_ONE).click();
    await $(BO_PAY_CHECKBOX_TWO).click();
    await $(BO_CONFIRM_AND_CONTINUE_BUTTON).click();

    await expect($(BO_CLAIM_STATUS_TEXT)).toHaveText(expect.stringContaining("Rejected"));
  });

  it("can search for a claim and view its information", async () => {
    await browser.url(getDevSignInUrl("backoffice"));
    await $(BO_CLAIM_SEARCH).setValue(ON_HOLD_CLAIM_REF);
    await $(BO_SEARCH_BUTTON).click();
    await $(getClaimSelectorFromTable(ON_HOLD_CLAIM_REF)).click();
    const agreementSummary = await $$("dl.govuk-summary-list")[0];
    const agreementReference = await agreementSummary.$(
      ".govuk-summary-list__row .govuk-summary-list__value",
    );

    expect(agreementReference).toHaveText(ON_HOLD_AGREEMENT_REF);

    await $(BO_HISTORY_TAB).click();

    const rows = await $$("table.govuk-table tbody tr");
    await expect(rows.length).toBeGreaterThan(0);
  });
});
