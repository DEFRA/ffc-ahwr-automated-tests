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

export const START_NEW_CLIAM_BUTTON = "a=Start a new claim";

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
