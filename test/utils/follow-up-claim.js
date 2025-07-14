import { browser, $, expect } from "@wdio/globals";
import {
  getDevSignInUrl,
  fillAndSubmitSBI,
  clickSubmitButton,
  clickStartNewClaimButton,
  clickOnElementAndContinue,
  enterPreMHReleaseDateAndContinue,
  enterWhenTestingWasCarriedOutAndContinue,
  fillInputAndContinue,
  selectSheepTestsAndContinue,
  verifySubmission,
} from "./common";
import { JOHNES_DISEASE } from "./constants";
import {
  getConfirmCheckDetailsSelector,
  getTypeOfLivestockSelector,
  getTypeOfReviewSelector,
  getSpeciesNumbersSelector,
  NUMBER_OF_ANIMALS_TESTED,
  VETS_NAME,
  VET_RCVS_NUMBER,
  getSheepEndemicsPackageSelector,
  getTestResultSelector,
  SUBMIT_CLAIM_BUTTON,
  REFERENCE,
  ASSESSMENT_PERCENTAGE,
  getBiosecuritySelector,
  getDiseaseStatusSelector,
  getHerdVaccinationStatus,
  LABORATORY_URN,
  NUMBER_OF_SAMPLES_TESTED,
} from "./selectors";

export async function createPreMultipleHerdSheepFollowUp(sbi) {
  await browser.url(getDevSignInUrl("claim"));
  await fillAndSubmitSBI(sbi);
  await $(getConfirmCheckDetailsSelector("yes")).click();
  await clickSubmitButton();
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

  await expect($(REFERENCE)).toHaveText(expect.stringContaining("FUSH"));
}

export async function createPreMultipleHerdPigsFollowUp(sbi, { urn = "pg-fc-5343462" } = {}) {
  await browser.url(getDevSignInUrl("claim"));
  await fillAndSubmitSBI(sbi);
  await $(getConfirmCheckDetailsSelector("yes")).click();
  await clickSubmitButton();
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

  await expect($(REFERENCE)).toHaveText(expect.stringContaining("FUPI"));
}
