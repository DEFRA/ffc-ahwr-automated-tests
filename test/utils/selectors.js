export const SBI = "#sbi";

export const TERMS_AND_CONDITIONS_CHECKBOX = "#terms";

export const CONTINUE_BUTTON = "button=Continue";

export const VISIT_DATE_DAY = "#visit-date-day";

export const VISIT_DATE_MONTH = "#visit-date-month";

export const VISIT_DATE_YEAR = "#visit-date-year";

export const NUMBER_OF_ANIMALS_TESTED = "#numberAnimalsTested";

export const VETS_NAME = "#vetsName";

export const VET_RCVS_NUMBER = "#vetRCVSNumber";

export const LABORATORY_URN = "#laboratoryURN";

export const NUMBER_OF_ORAL_FLUID_SAMPLES = "#numberOfOralFluidSamples";

export const SUBMIT_CLAIM_BUTTON = "#submit-claim";

export const SUBMIT_BUTTON = 'button[type="submit"]';

export const REFERENCE = "#reference";

export const SUBMISSION_PANEL_TITLE = ".govuk-panel__title";

export const START_NEW_CLAIM_BUTTON = "#start";

export const BO_AGREEMENTS_TAB = 'a.govuk-tabs__list-item[href="/agreements"]';

export const BO_AGREEMENT_NUMBER_SELECTOR = ".govuk-panel__body strong";

export const BO_VIEW_CLAIMS_LINK_SELECTOR = "=View claims";

export const BO_CHECKED_AGAINST_CHECKLIST_SELECTOR =
  'input[type="checkbox"][value="checkedAgainstChecklist"]';

export const BO_SENT_CHECKLIST_SELECTOR =
  'input[type="checkbox"][value="sentChecklist"]';

export const BO_CONFIRM_AND_CONTINUE_BUTTON = "button=Confirm and continue";

export const BO_CLAIM_STATUS_TEXT_SELECTOR = ".govuk-tag--orange";

export const BO_BACK_TO_ALL_CLAIMS_SELECTOR = 'a[href="/claims"]';

export const BO_RECOMMEND_TO_PAY_BUTTON = 'a[href*="recommendToPay"]';

export const BO_CLAIMS_MAIN_HEADING_SELECTOR =
  "#main-content h1.govuk-heading-xl";

export function getConfirmCheckDetailsSelector(value) {
  return `input[name="confirmCheckDetails"][value="${value}"]`;
}

export function getTypeOfLivestockSelector(liveStock) {
  return `input[name="typeOfLivestock"][value="${liveStock}"]`;
}

export function getTypeOfReviewSelector(reviewType) {
  return `input[name="typeOfReview"][value="${reviewType}"]`;
}

export function getWhenTestingWasCarriedOutSelector(value) {
  return `input[name="whenTestingWasCarriedOut"][value="${value}"]`;
}

export function getSpeciesNumbersSelector(value) {
  return `input[name="speciesNumbers"][value="${value}"]`;
}

export function getSheepEndemicsPackageSelector(endemicsPackage) {
  return `input[name="sheepEndemicsPackage"][value="${endemicsPackage}"]`;
}

export function getSheepTestsDiseaseConditionSelector(diseaseCondition) {
  return `input[name="sheepTests"][value="${diseaseCondition}"]`;
}

export function getTestResultSelector(value) {
  return `input[name="testResult"][value="${value}"]`;
}

export function getPiHuntForBvdDoneSelector(value) {
  return `input[name="piHunt"][value="${value}"]`;
}

export function getPiHuntDoneForAllCattleSelector(value) {
  return `input[name="piHuntAllAnimals"][value="${value}"]`;
}

export function getTestResultsSelector(value) {
  return `input[name="testResults"][value="${value}"]`;
}

export function getBiosecuritySelector(value) {
  return `input[name="biosecurity"][value="${value}"]`;
}

export function getAgreementNumberSelector(agreementNumber) {
  return `td[data-sort-value="${agreementNumber}"]`;
}

export function getViewClaimLinkSelector(claimNumber) {
  return `a[href*="${claimNumber}"]`;
}
