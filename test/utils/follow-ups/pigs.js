import { $ } from "@wdio/globals";
import {
  clickStartNewClaimButton,
  clickOnElementAndContinue,
  enterPreMHReleaseDateAndContinue,
  enterWhenTestingWasCarriedOutAndContinue,
  fillInputAndContinue,
  verifySubmission,
  clickContinueButton,
  enterVisitDateAndContinue,
  chooseRandomHerdReasonsAndContinue,
} from "../common.js";
import {
  getTypeOfLivestockSelector,
  getTypeOfReviewSelector,
  getSpeciesNumbersSelector,
  NUMBER_OF_ANIMALS_TESTED,
  VETS_NAME,
  VET_RCVS_NUMBER,
  getHerdVaccinationStatus,
  LABORATORY_URN,
  NUMBER_OF_SAMPLES_TESTED,
  getPcrTestResultSelector,
  getGeneticSequencingSelector,
  getBiosecuritySelector,
  ASSESSMENT_PERCENTAGE,
  SUBMIT_CLAIM_BUTTON,
} from "../selectors.js";
import {
  PREVIOUSLY_CLAIMED_YES_ON_SELECT_THE_HERD_PAGE,
  PREVIOUSLY_CLAIMED_YES_ON_SAME_HERD_PAGE,
  HERD_NAME,
  HERD_CPH,
  OTHER_HERDS_ON_SBI_NO,
} from "../multiple-herd-selectors.js";

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
  await clickOnElementAndContinue(getPcrTestResultSelector("positive"));
  await clickOnElementAndContinue(getGeneticSequencingSelector("prrs1"));
  await clickOnElementAndContinue(getBiosecuritySelector("yes"));
  await fillInputAndContinue(ASSESSMENT_PERCENTAGE, "50");
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
  await clickOnElementAndContinue(getPcrTestResultSelector("positive"));
  await clickOnElementAndContinue(getGeneticSequencingSelector("prrs1"));
  await clickOnElementAndContinue(getBiosecuritySelector("yes"));
  await fillInputAndContinue(ASSESSMENT_PERCENTAGE, "50");
  await $(SUBMIT_CLAIM_BUTTON).click();
  await verifySubmission("Claim complete");
}
