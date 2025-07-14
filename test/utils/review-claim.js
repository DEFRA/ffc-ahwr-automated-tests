import { browser, $, expect } from "@wdio/globals";
import {
  enterVisitDateAndContinue,
  getDevSignInUrl,
  fillAndSubmitSBI,
  clickSubmitButton,
  clickStartNewClaimButton,
  clickOnElementAndContinue,
  fillInputAndContinue,
  chooseRandomHerdReasonsAndContinue,
  clickContinueButton,
  enterWhenTestingWasCarriedOutAndContinue,
  verifySubmission,
} from "./common";
import {
  HERD_NAME,
  HERD_CPH,
  OTHER_HERDS_ON_SBI_NO,
  getSelectHerdSelector,
} from "./multiple-herd-selectors";
import {
  getConfirmCheckDetailsSelector,
  getTypeOfLivestockSelector,
  getTypeOfReviewSelector,
  getSpeciesNumbersSelector,
  NUMBER_OF_ANIMALS_TESTED,
  VETS_NAME,
  VET_RCVS_NUMBER,
  LABORATORY_URN,
  SUBMIT_CLAIM_BUTTON,
  REFERENCE,
  getTestResultsSelector,
  NUMBER_OF_ORAL_FLUID_SAMPLES,
} from "./selectors";

export async function createSheepReviewClaim(
  sbi,
  {
    multipleHerdFlag = false,
    urn = "sh-rr-534346",
    enterVisitDateAndContinueFunc = enterVisitDateAndContinue,
    isUnnamedHerdClaimPresent = false,
  } = {},
) {
  await browser.url(getDevSignInUrl("claim"));
  await fillAndSubmitSBI(sbi);
  await $(getConfirmCheckDetailsSelector("yes")).click();
  await clickSubmitButton();
  await clickStartNewClaimButton();
  await clickOnElementAndContinue(getTypeOfLivestockSelector("sheep"));
  await clickOnElementAndContinue(getTypeOfReviewSelector("review"));

  await enterVisitDateAndContinueFunc();

  if (multipleHerdFlag) {
    await fillInputAndContinue(HERD_NAME, "Breeding flock");
    await fillInputAndContinue(HERD_CPH, "22/333/4444");
    await clickOnElementAndContinue(OTHER_HERDS_ON_SBI_NO);
    await chooseRandomHerdReasonsAndContinue();
    await clickContinueButton();
  }

  if (isUnnamedHerdClaimPresent) {
    await clickOnElementAndContinue(getSelectHerdSelector("a different flock"));
  }

  await enterWhenTestingWasCarriedOutAndContinue("whenTheVetVisitedTheFarmToCarryOutTheReview");

  await clickOnElementAndContinue(getSpeciesNumbersSelector("yes"));
  await fillInputAndContinue(NUMBER_OF_ANIMALS_TESTED, "10");
  await fillInputAndContinue(VETS_NAME, "Mr Auto Test");
  await fillInputAndContinue(VET_RCVS_NUMBER, "1234567");
  await fillInputAndContinue(LABORATORY_URN, urn);
  await $(SUBMIT_CLAIM_BUTTON).click();
  await verifySubmission("Claim complete");
  await expect($(REFERENCE)).toHaveText(expect.stringContaining("RESH"));
  const claimNumber = await $(REFERENCE).getText();

  return claimNumber;
}

export async function createSheepReviewForAdditionalHerd(
  sbi,
  urn = "sh-rr-534351",
  herd = "Additional herd 1",
) {
  await browser.url(getDevSignInUrl("claim"));
  await fillAndSubmitSBI(sbi);
  await $(getConfirmCheckDetailsSelector("yes")).click();
  await clickSubmitButton();
  await clickStartNewClaimButton();
  await clickOnElementAndContinue(getTypeOfLivestockSelector("sheep"));
  await clickOnElementAndContinue(getTypeOfReviewSelector("review"));
  await enterVisitDateAndContinue();

  await clickOnElementAndContinue(getSelectHerdSelector("a different "));
  await fillInputAndContinue(HERD_NAME, herd);
  await fillInputAndContinue(HERD_CPH, "22/333/4444");
  await chooseRandomHerdReasonsAndContinue();
  await clickContinueButton();

  await enterWhenTestingWasCarriedOutAndContinue("whenTheVetVisitedTheFarmToCarryOutTheReview");

  await clickOnElementAndContinue(getSpeciesNumbersSelector("yes"));
  await fillInputAndContinue(NUMBER_OF_ANIMALS_TESTED, "10");
  await fillInputAndContinue(VETS_NAME, "Mr Auto Test");
  await fillInputAndContinue(VET_RCVS_NUMBER, "1234567");
  await fillInputAndContinue(LABORATORY_URN, urn);

  await $(SUBMIT_CLAIM_BUTTON).click();
  await verifySubmission("Claim complete");
  await expect($(REFERENCE)).toHaveText(expect.stringContaining("RESH"));
  const claimNumber = await $(REFERENCE).getText();

  return claimNumber;
}

export async function createPigsReviewClaim(
  sbi,
  {
    multipleHerdFlag = false,
    urn = "pg-rr-5343461",
    enterVisitDateAndContinueFunc = enterVisitDateAndContinue,
    isUnnamedHerdClaimPresent = false,
  } = {},
) {
  await browser.url(getDevSignInUrl("claim"));
  await fillAndSubmitSBI(sbi);
  await $(getConfirmCheckDetailsSelector("yes")).click();
  await clickSubmitButton();
  await clickStartNewClaimButton();
  await clickOnElementAndContinue(getTypeOfLivestockSelector("pigs"));
  await clickOnElementAndContinue(getTypeOfReviewSelector("review"));

  await enterVisitDateAndContinueFunc();

  if (multipleHerdFlag) {
    await fillInputAndContinue(HERD_NAME, "Puddle of Piglets");
    await fillInputAndContinue(HERD_CPH, "22/333/1234");
    await clickOnElementAndContinue(OTHER_HERDS_ON_SBI_NO);
    await chooseRandomHerdReasonsAndContinue();
    await clickContinueButton();
  }

  if (isUnnamedHerdClaimPresent) {
    await clickOnElementAndContinue(getSelectHerdSelector("a different herd"));
  }

  await enterWhenTestingWasCarriedOutAndContinue("whenTheVetVisitedTheFarmToCarryOutTheReview");
  await clickOnElementAndContinue(getSpeciesNumbersSelector("yes"));
  await fillInputAndContinue(NUMBER_OF_ANIMALS_TESTED, "30");
  await fillInputAndContinue(VETS_NAME, "Mr Auto Test");
  await fillInputAndContinue(VET_RCVS_NUMBER, "1234567");
  await fillInputAndContinue(LABORATORY_URN, urn);
  await fillInputAndContinue(NUMBER_OF_ORAL_FLUID_SAMPLES, "6");
  await clickOnElementAndContinue(getTestResultsSelector("positive"));
  await $(SUBMIT_CLAIM_BUTTON).click();
  await verifySubmission("Claim complete");
  await expect($(REFERENCE)).toHaveText(expect.stringContaining("REPI"));
  const claimNumber = await $(REFERENCE).getText();

  return claimNumber;
}
