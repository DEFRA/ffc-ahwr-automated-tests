import { $ } from "@wdio/globals";
import {
  clickStartNewClaimButton,
  clickOnElementAndContinue,
  enterPreMHReleaseDateAndContinue,
  enterWhenTestingWasCarriedOutAndContinue,
  fillInputAndContinue,
  selectSheepTestsAndContinue,
  verifySubmission,
  clickContinueButton,
  enterVisitDateAndContinue,
  chooseRandomHerdReasonsAndContinue,
  selectHerdAndContinue,
} from "./common.js";
import { JOHNES_DISEASE } from "./constants.js";
import {
  getTypeOfLivestockSelector,
  getTypeOfReviewSelector,
  getSpeciesNumbersSelector,
  NUMBER_OF_ANIMALS_TESTED,
  VETS_NAME,
  VET_RCVS_NUMBER,
  getSheepEndemicsPackageSelector,
  getTestResultSelector,
  SUBMIT_CLAIM_BUTTON,
  ASSESSMENT_PERCENTAGE,
  getBiosecuritySelector,
  getDiseaseStatusSelector,
  getHerdVaccinationStatus,
  LABORATORY_URN,
  NUMBER_OF_SAMPLES_TESTED,
  getPiHuntForBvdDoneSelector,
  getPiHuntRecommendedByVetSelector,
  getPiHuntDoneForAllCattleSelector,
  getTestResultsSelector,
} from "./selectors.js";
import {
  PREVIOUSLY_CLAIMED_YES_ON_SELECT_THE_HERD_PAGE,
  PREVIOUSLY_CLAIMED_YES_ON_SAME_HERD_PAGE,
  HERD_NAME,
  HERD_CPH,
  OTHER_HERDS_ON_SBI_NO,
} from "./multiple-herd-selectors.js";

export async function createPreMultipleHerdSheepFollowUp() {
  await clickStartNewClaimButton();
  await clickOnElementAndContinue(getTypeOfLivestockSelector("sheep"));
  await clickOnElementAndContinue(getTypeOfReviewSelector("endemics"));
  await enterPreMHReleaseDateAndContinue();
  await enterWhenTestingWasCarriedOutAndContinue("whenTheVetVisitedTheFarmToCarryOutTheReview");
  await clickOnElementAndContinue(getSpeciesNumbersSelector("yes"));
  await fillInputAndContinue(NUMBER_OF_ANIMALS_TESTED, "10");
  await fillInputAndContinue(VETS_NAME, "Mr Auto Test");
  await fillInputAndContinue(VET_RCVS_NUMBER, "1234567");
  await clickOnElementAndContinue(getSheepEndemicsPackageSelector("improvedEwePerformance"));
  await selectSheepTestsAndContinue([JOHNES_DISEASE]);
  await clickOnElementAndContinue(getTestResultSelector("positive"));
  await $(SUBMIT_CLAIM_BUTTON).click();
  await verifySubmission("Claim complete");
}

export async function createPreMultipleHerdPigsFollowUp(urn = "pg-fc-5343462") {
  await clickStartNewClaimButton();
  await clickOnElementAndContinue(getTypeOfLivestockSelector("pigs"));
  await clickOnElementAndContinue(getTypeOfReviewSelector("endemics"));
  await enterPreMHReleaseDateAndContinue();
  await enterWhenTestingWasCarriedOutAndContinue("whenTheVetVisitedTheFarmToCarryOutTheReview");
  await clickOnElementAndContinue(getSpeciesNumbersSelector("yes"));
  await fillInputAndContinue(NUMBER_OF_ANIMALS_TESTED, "30");
  await fillInputAndContinue(VETS_NAME, "Mr Auto Test");
  await fillInputAndContinue(VET_RCVS_NUMBER, "1234567");
  await clickOnElementAndContinue(getHerdVaccinationStatus("vaccinated"));
  await fillInputAndContinue(LABORATORY_URN, urn);
  await fillInputAndContinue(NUMBER_OF_SAMPLES_TESTED, "6");
  await clickOnElementAndContinue(getDiseaseStatusSelector("1"));
  await clickOnElementAndContinue(getBiosecuritySelector("yes"));
  await fillInputAndContinue(ASSESSMENT_PERCENTAGE, "50");
  await $(SUBMIT_CLAIM_BUTTON).click();
  await verifySubmission("Claim complete");
}

export async function createMultipleHerdSheepFollowUp({ isUnnamedHerdClaimPresent = false } = {}) {
  await clickStartNewClaimButton();
  await clickOnElementAndContinue(getTypeOfLivestockSelector("sheep"));
  await clickOnElementAndContinue(getTypeOfReviewSelector("endemics"));
  await enterVisitDateAndContinue();

  if (isUnnamedHerdClaimPresent) {
    await fillInputAndContinue(HERD_NAME, "Breeding flock");
    await fillInputAndContinue(HERD_CPH, "22/333/4444");
    await clickOnElementAndContinue(OTHER_HERDS_ON_SBI_NO);
    await chooseRandomHerdReasonsAndContinue();
    await clickContinueButton();
    await clickOnElementAndContinue(PREVIOUSLY_CLAIMED_YES_ON_SAME_HERD_PAGE);
  } else {
    await clickOnElementAndContinue(PREVIOUSLY_CLAIMED_YES_ON_SELECT_THE_HERD_PAGE);
  }

  await clickContinueButton();
  await enterWhenTestingWasCarriedOutAndContinue("whenTheVetVisitedTheFarmToCarryOutTheReview");
  await clickOnElementAndContinue(getSpeciesNumbersSelector("yes"));
  await fillInputAndContinue(NUMBER_OF_ANIMALS_TESTED, "10");
  await fillInputAndContinue(VETS_NAME, "Mr Auto Test");
  await fillInputAndContinue(VET_RCVS_NUMBER, "1234567");
  await clickOnElementAndContinue(getSheepEndemicsPackageSelector("improvedEwePerformance"));
  await selectSheepTestsAndContinue([JOHNES_DISEASE]);
  await clickOnElementAndContinue(getTestResultSelector("positive"));
  await $(SUBMIT_CLAIM_BUTTON).click();
  await verifySubmission("Claim complete");
}

export async function createMultipleHerdPigsFollowUp({
  isUnnamedHerdClaimPresent = false,
  urn = "pg-fc-5343461",
} = {}) {
  await clickStartNewClaimButton();
  await clickOnElementAndContinue(getTypeOfLivestockSelector("pigs"));
  await clickOnElementAndContinue(getTypeOfReviewSelector("endemics"));
  await enterVisitDateAndContinue();

  if (isUnnamedHerdClaimPresent) {
    await fillInputAndContinue(HERD_NAME, "Puddle of Piglets Herd");
    await fillInputAndContinue(HERD_CPH, "11/333/4444");
    await clickOnElementAndContinue(OTHER_HERDS_ON_SBI_NO);
    await chooseRandomHerdReasonsAndContinue();
    await clickContinueButton();
    await clickOnElementAndContinue(PREVIOUSLY_CLAIMED_YES_ON_SAME_HERD_PAGE);
  } else {
    await clickOnElementAndContinue(PREVIOUSLY_CLAIMED_YES_ON_SELECT_THE_HERD_PAGE);
  }

  await enterWhenTestingWasCarriedOutAndContinue("whenTheVetVisitedTheFarmToCarryOutTheReview");
  await clickOnElementAndContinue(getSpeciesNumbersSelector("yes"));
  await fillInputAndContinue(NUMBER_OF_ANIMALS_TESTED, "30");
  await fillInputAndContinue(VETS_NAME, "Mr Auto Test");
  await fillInputAndContinue(VET_RCVS_NUMBER, "1234567");
  await clickOnElementAndContinue(getHerdVaccinationStatus("vaccinated"));
  await fillInputAndContinue(LABORATORY_URN, urn);
  await fillInputAndContinue(NUMBER_OF_SAMPLES_TESTED, "6");
  await clickOnElementAndContinue(getDiseaseStatusSelector("1"));
  await clickOnElementAndContinue(getBiosecuritySelector("yes"));
  await fillInputAndContinue(ASSESSMENT_PERCENTAGE, "50");
  await $(SUBMIT_CLAIM_BUTTON).click();
  await verifySubmission("Claim complete");
}

export async function createMultipleHerdBeefFollowUpForFirstHerd({
  isUnnamedHerdClaimPresent = false,
} = {}) {
  await clickStartNewClaimButton();
  await clickOnElementAndContinue(getTypeOfLivestockSelector("beef"));
  await clickOnElementAndContinue(getTypeOfReviewSelector("endemics"));
  await enterVisitDateAndContinue();

  if (isUnnamedHerdClaimPresent) {
    await fillInputAndContinue(HERD_NAME, "Black Label Beef");
    await fillInputAndContinue(HERD_CPH, "33/123/1234");
    await clickOnElementAndContinue(OTHER_HERDS_ON_SBI_NO);
    await chooseRandomHerdReasonsAndContinue();
    await clickContinueButton();
    await clickOnElementAndContinue(PREVIOUSLY_CLAIMED_YES_ON_SAME_HERD_PAGE);
  } else {
    await clickOnElementAndContinue(PREVIOUSLY_CLAIMED_YES_ON_SELECT_THE_HERD_PAGE);
  }

  await clickContinueButton();
  await clickOnElementAndContinue(getSpeciesNumbersSelector("yes"));
  await fillInputAndContinue(VETS_NAME, "Mr Auto Test");

  await fillInputAndContinue(VET_RCVS_NUMBER, "1234567");

  await clickOnElementAndContinue(getPiHuntForBvdDoneSelector("yes"));

  await clickOnElementAndContinue(getPiHuntDoneForAllCattleSelector("yes"));

  await enterWhenTestingWasCarriedOutAndContinue("whenTheVetVisitedTheFarmToCarryOutTheReview");

  await fillInputAndContinue(LABORATORY_URN, "bc-fu-521346");

  await clickOnElementAndContinue(getTestResultsSelector("positive"));

  await clickOnElementAndContinue(getBiosecuritySelector("yes"));
  await $(SUBMIT_CLAIM_BUTTON).click();
  await verifySubmission("Claim complete");
}

export async function createMultipleHerdBeefFollowUpForAdditionalHerd({
  herdName,
  testResult = "negative",
  isUnnamedHerdClaimPresent = false,
  urn = "bc-fu-521347",
} = {}) {
  await clickStartNewClaimButton();
  await clickOnElementAndContinue(getTypeOfLivestockSelector("beef"));
  await clickOnElementAndContinue(getTypeOfReviewSelector("endemics"));
  await enterVisitDateAndContinue();

  await selectHerdAndContinue(herdName);

  if (isUnnamedHerdClaimPresent) {
    await fillInputAndContinue(HERD_NAME, "Black Label Beef");
    await fillInputAndContinue(HERD_CPH, "33/123/1234");
    await chooseRandomHerdReasonsAndContinue();
  }

  await clickContinueButton();
  await clickOnElementAndContinue(getSpeciesNumbersSelector("yes"));
  await fillInputAndContinue(VETS_NAME, "Mr Auto Test");
  await fillInputAndContinue(VET_RCVS_NUMBER, "1234567");
  await clickOnElementAndContinue(getPiHuntForBvdDoneSelector("yes"));

  if (testResult === "negative") {
    await clickOnElementAndContinue(getPiHuntRecommendedByVetSelector("yes"));
  }

  await clickOnElementAndContinue(getPiHuntDoneForAllCattleSelector("yes"));
  await enterWhenTestingWasCarriedOutAndContinue("whenTheVetVisitedTheFarmToCarryOutTheReview");
  await fillInputAndContinue(LABORATORY_URN, urn);
  await clickOnElementAndContinue(getTestResultsSelector("positive"));
  await clickOnElementAndContinue(getBiosecuritySelector("yes"));
  await $(SUBMIT_CLAIM_BUTTON).click();

  await verifySubmission("Claim complete");
}
