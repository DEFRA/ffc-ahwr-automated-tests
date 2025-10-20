import { $ } from "@wdio/globals";
import {
  clickStartNewClaimButton,
  clickOnElementAndContinue,
  enterWhenTestingWasCarriedOutAndContinue,
  fillInputAndContinue,
  verifySubmission,
  enterVisitDateAndContinue,
  chooseRandomHerdReasonsAndContinue,
  clickContinueButton,
  selectHerdAndContinue,
} from "../common.js";
import {
  getTypeOfLivestockSelector,
  getTypeOfReviewSelector,
  getSpeciesNumbersSelector,
  VETS_NAME,
  VET_RCVS_NUMBER,
  getPiHuntForBvdDoneSelector,
  getPiHuntRecommendedByVetSelector,
  getPiHuntDoneForAllCattleSelector,
  LABORATORY_URN,
  getTestResultsSelector,
  getBiosecuritySelector,
  SUBMIT_CLAIM_BUTTON,
} from "../selectors.js";
import {
  PREVIOUSLY_CLAIMED_YES_ON_SELECT_THE_HERD_PAGE,
  PREVIOUSLY_CLAIMED_YES_ON_SAME_HERD_PAGE,
  HERD_NAME,
  HERD_CPH,
  OTHER_HERDS_ON_SBI_NO,
} from "../multiple-herd-selectors.js";

export async function createMultipleHerdDairyFollowUpForFirstHerd({
  isUnnamedHerdClaimPresent = false,
} = {}) {
  await clickStartNewClaimButton();
  await clickOnElementAndContinue(getTypeOfLivestockSelector("dairy"));
  await clickOnElementAndContinue(getTypeOfReviewSelector("endemics"));
  await enterVisitDateAndContinue();

  if (isUnnamedHerdClaimPresent) {
    await fillInputAndContinue(HERD_NAME, "Black Label Diary");
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
  await fillInputAndContinue(LABORATORY_URN, "dc-fu-521346");
  await clickOnElementAndContinue(getTestResultsSelector("positive"));
  await clickOnElementAndContinue(getBiosecuritySelector("yes"));
  await $(SUBMIT_CLAIM_BUTTON).click();
  await verifySubmission("Claim complete");
}

export async function createMultipleHerdDairyFollowUpForAdditionalHerd({
  herdName,
  testResult = "negative",
  isUnnamedHerdClaimPresent = false,
  urn = "bc-fu-521347",
} = {}) {
  await clickStartNewClaimButton();
  await clickOnElementAndContinue(getTypeOfLivestockSelector("dairy"));
  await clickOnElementAndContinue(getTypeOfReviewSelector("endemics"));
  await enterVisitDateAndContinue();

  await selectHerdAndContinue(herdName);

  if (isUnnamedHerdClaimPresent) {
    await fillInputAndContinue(HERD_NAME, "Black Label Dairy");
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
