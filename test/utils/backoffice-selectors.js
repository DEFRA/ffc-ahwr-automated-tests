export const BO_AGREEMENTS_TAB = 'a.govuk-tabs__list-item[href="/agreements"]';

export const BO_FLAGS_TAB = '[href="/flags"]';

export const BO_VIEW_CLAIMS_LINK_SELECTOR = "=View claims";

export const BO_CHECKED_AGAINST_CHECKLIST_SELECTOR =
  'input[type="checkbox"][value="checkedAgainstChecklist"]';

export const BO_SENT_CHECKLIST_SELECTOR = 'input[type="checkbox"][value="sentChecklist"]';

export const BO_CONFIRM_AND_CONTINUE_BUTTON = "button=Confirm and continue";

export const BO_CLAIM_STATUS_TEXT_SELECTOR = ".govuk-tag--orange";

export const BO_BACK_TO_ALL_CLAIMS_SELECTOR = 'a[href="/claims"]';

export const BO_RECOMMEND_TO_PAY_BUTTON = 'a[href*="recommendToPay"]';

export const BO_CLAIMS_MAIN_HEADING_SELECTOR = "#main-content h1.govuk-heading-xl";

export const BO_CREATE_AGREEMENT_FLAG_CTA = 'a[href*="createFlag"]';

export const BO_AGREEMENT_REFERENCE = "#agreement-reference";

export const BO_FLAG_CREATION_NOTE = "#note";

export const BO_CREATE_FLAG_BUTTON = "button=Create flag";

export const BO_DELETE_FLAG_BUTTON = 'a[href*="deleteFlag"]';

export const BO_FLAG_DELETION_NOTE = "#deletedNote";

export const BO_SUBMIT_DELETE_FLAG_BUTTON = "button.govuk-button--warning=Delete flag";

export function getAgreementNumberSelector(agreementNumber) {
  return `td[data-sort-value="${agreementNumber}"]`;
}

export function getViewClaimLinkSelector(claimNumber) {
  return `a[href*="${claimNumber}"]`;
}

export function getAgreeToMultipleHerdTermsSelector(value) {
  return `input[name="appliesToMh"][value="${value}"]`;
}

export function getFlaggedAgreementRowSelector(agreementNumber, multipleHerdTermsValue) {
  return `//tr[td[contains(text(), "${agreementNumber}")] and td[text()="${multipleHerdTermsValue}"]]`;
}
