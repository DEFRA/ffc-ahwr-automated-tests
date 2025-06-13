import { browser, $, expect } from "@wdio/globals";
import {
  getDevSignInUrl,
  fillAndSubmitSBI,
  clickSubmitButton,
  fillInputAndContinue,
  clickStartNewClaimButton,
} from "../utils/common.js";
import {
  HERD_CPH,
  getTypeOfLivestockSelector,
  getTypeOfReviewSelector,
  getConfirmCheckDetailsSelector,
} from "../utils/selectors.js";

// Constants for magic strings
const VISIT_DATE_DAY = "30";
const VISIT_DATE_MONTH = "5";
const VISIT_DATE_YEAR = "2025";
const VETS_NAME = "bob";
const VET_RCVS_NUMBER = "1234567";

// Element selectors
const VISIT_DATE_DAY_SELECTOR = "#visit-date-day";
const VISIT_DATE_MONTH_SELECTOR = "#visit-date-month";
const VISIT_DATE_YEAR_SELECTOR = "#visit-date-year";
const HERD_NAME_SELECTOR = "#herdName";
const HERD_ID_2_SELECTOR = "#herdId-2";
const HERD_REASONS_SELECTOR = "#herdReasons";
const HERD_OTHERS_ON_SBI_SELECTOR = "#herdOthersOnSbi";
const WHEN_TESTING_WAS_CARRIED_OUT_SELECTOR = "#whenTestingWasCarriedOut";
const SPECIES_NUMBERS_SELECTOR = "#speciesNumbers";
const NUMBER_ANIMALS_TESTED_SELECTOR = "#numberAnimalsTested";
const VETS_NAME_SELECTOR = "#vetsName";
const VET_RCVS_NUMBER_SELECTOR = "#vetRCVSNumber";
const LABORATORY_URN_SELECTOR = "#laboratoryURN";
const NUMBER_ORAL_FLUID_SAMPLES_SELECTOR = "#numberOfOralFluidSamples";
const TEST_RESULTS_SELECTOR = "#testResults";
const SUBMIT_CLAIM_SELECTOR = "#submit-claim";
const CONFIRM_YES_ANSWER = "yes";

const sheepCases = [
  {
    typeOfLiveStock: 'sheep',
    typeOfReview: 'review',
    herdName: 'sheeps',
    cph: '22/333/4444',
    speciesNumber: "22",
    urn: 'urn-111',
    sbi: '123456789',
  }
];
const beefCases = [
  {
    typeOfLiveStock: 'beef',
    typeOfReview: 'review',
    herdName: 'beefs',
    cph: '11/333/4444',
    speciesNumber: "22",
    urn: 'urn-222',
    sbi: '123456788',
  },
  // {
  //   typeOfLiveStock: 'beef',
  //   typeOfReview: 'review',
  //   herdName: 'beefs2',
  //   cph: '11/333/4566',
  //   speciesNumber: "22",
  //   urn: 'urn-456',
  // },
];
const dairyCases = [
  // {
  //   typeOfLiveStock: 'dairy',
  //   typeOfReview: 'review',
  //   herdName: 'dairies',
  //   cph: '22/333/4444',
  //   speciesNumber: "22",
  //   urn: 'urn-333',
  // },
];
const pigCases = [
  // {
  //   typeOfLiveStock: 'pigs',
  //   typeOfReview: 'review',
  //   herdName: 'pigs',
  //   cph: '22/333/5555',
  //   speciesNumber: "55",
  //   urn: 'urn-444',
  // },
];

async function clickContinueButton() {
  const continueBtn = await $('button=Continue')
  if (continueBtn.isExisting()) {
    await continueBtn.click();
  } else {
    await $('button[type="submit"]').click();
  }
}

export async function clickOnElementAndContinue(selector) {
  await $(selector).click();
  await clickContinueButton();
}

describe("Test claim compliance checks", async function(){

  for (const testCase of sheepCases) {
    it("can create a new review claim for the breeding herd of sheep", async () => {
      await browser.url(getDevSignInUrl("claim"));
      await fillAndSubmitSBI(testCase.sbi);
      await $(getConfirmCheckDetailsSelector(CONFIRM_YES_ANSWER)).click();
      await clickSubmitButton();

      await clickStartNewClaimButton();

      await clickOnElementAndContinue(getTypeOfLivestockSelector(testCase.typeOfLiveStock));

      await clickOnElementAndContinue(getTypeOfReviewSelector(testCase.typeOfReview));

      await $(VISIT_DATE_DAY_SELECTOR).setValue(VISIT_DATE_DAY);
      await $(VISIT_DATE_MONTH_SELECTOR).setValue(VISIT_DATE_MONTH);
      await $(VISIT_DATE_YEAR_SELECTOR).setValue(VISIT_DATE_YEAR);
      await clickContinueButton();

      await fillInputAndContinue(HERD_NAME_SELECTOR, testCase.herdName);

      await fillInputAndContinue(HERD_CPH, testCase.cph);

      await clickOnElementAndContinue(HERD_OTHERS_ON_SBI_SELECTOR);

      await clickContinueButton();

      await clickOnElementAndContinue(WHEN_TESTING_WAS_CARRIED_OUT_SELECTOR);

      await clickOnElementAndContinue(SPECIES_NUMBERS_SELECTOR);
      await fillInputAndContinue(NUMBER_ANIMALS_TESTED_SELECTOR, testCase.speciesNumber);

      await fillInputAndContinue(VETS_NAME_SELECTOR, VETS_NAME);
      await fillInputAndContinue(VET_RCVS_NUMBER_SELECTOR, VET_RCVS_NUMBER);
      await fillInputAndContinue(LABORATORY_URN_SELECTOR, testCase.urn);

      await $(SUBMIT_CLAIM_SELECTOR).click();
    });
  }

  for (const testCase of beefCases) {
    it("can create a new review claim for the breeding herd of beef", async () => {
      await browser.url(getDevSignInUrl("claim"));
      await fillAndSubmitSBI(testCase.sbi);
      await $(getConfirmCheckDetailsSelector(CONFIRM_YES_ANSWER)).click();
      await clickSubmitButton();

      await clickStartNewClaimButton();

      await clickOnElementAndContinue(getTypeOfLivestockSelector(testCase.typeOfLiveStock));

      await clickOnElementAndContinue(getTypeOfReviewSelector(testCase.typeOfReview));

      await $(VISIT_DATE_DAY_SELECTOR).setValue(VISIT_DATE_DAY);
      await $(VISIT_DATE_MONTH_SELECTOR).setValue(VISIT_DATE_MONTH);
      await $(VISIT_DATE_YEAR_SELECTOR).setValue(VISIT_DATE_YEAR);
      await clickContinueButton();

      // const isNewHerdCheck = await $(HERD_ID_2_SELECTOR).isExisting()
      // if (isNewHerdCheck) {
      //   await clickOnElementAndContinue(HERD_ID_2_SELECTOR);
      // }
      // await clickContinueButton();

      await fillInputAndContinue(HERD_NAME_SELECTOR, testCase.herdName);

      await fillInputAndContinue(HERD_CPH, testCase.cph);

      // const herdReasons = await $(HERD_REASONS_SELECTOR).isExisting()
      // if (herdReasons) {
        // await clickOnElementAndContinue(HERD_REASONS_SELECTOR);
      // } else {
        await clickOnElementAndContinue(HERD_OTHERS_ON_SBI_SELECTOR);
      // }

      await expect($('#main-content > div > div > h1').getText()).toEqual('Check herd details');

      await clickContinueButton();

      await clickOnElementAndContinue(WHEN_TESTING_WAS_CARRIED_OUT_SELECTOR);

      await clickOnElementAndContinue(SPECIES_NUMBERS_SELECTOR);
      await fillInputAndContinue(NUMBER_ANIMALS_TESTED_SELECTOR, testCase.speciesNumber);

      await fillInputAndContinue(VETS_NAME_SELECTOR, VETS_NAME);
      await fillInputAndContinue(VET_RCVS_NUMBER_SELECTOR, VET_RCVS_NUMBER);
      await fillInputAndContinue(LABORATORY_URN_SELECTOR, testCase.urn);

      await clickOnElementAndContinue(TEST_RESULTS_SELECTOR);
      await $(SUBMIT_CLAIM_SELECTOR).click();
    });
  }

  for (const testCase of dairyCases) {
    it("can create a new review claim for the breeding herd of dairy", async () => {
      await browser.url(getDevSignInUrl("claim"));
      await fillAndSubmitSBI(testCase.sbi);
      await $(getConfirmCheckDetailsSelector(CONFIRM_YES_ANSWER)).click();
      await clickSubmitButton();

      await clickStartNewClaimButton();

      await clickOnElementAndContinue(getTypeOfLivestockSelector(testCase.typeOfLiveStock));

      await clickOnElementAndContinue(getTypeOfReviewSelector(testCase.typeOfReview));

      await $(VISIT_DATE_DAY_SELECTOR).setValue(VISIT_DATE_DAY);
      await $(VISIT_DATE_MONTH_SELECTOR).setValue(VISIT_DATE_MONTH);
      await $(VISIT_DATE_YEAR_SELECTOR).setValue(VISIT_DATE_YEAR);
      await clickContinueButton();

      await fillInputAndContinue(HERD_NAME_SELECTOR, testCase.herdName);

      await fillInputAndContinue(HERD_CPH, testCase.cph);

      await clickOnElementAndContinue(HERD_OTHERS_ON_SBI_SELECTOR);

      await clickContinueButton();

      await clickOnElementAndContinue(WHEN_TESTING_WAS_CARRIED_OUT_SELECTOR);

      await clickOnElementAndContinue(SPECIES_NUMBERS_SELECTOR);

      await fillInputAndContinue(VETS_NAME_SELECTOR, VETS_NAME);
      await fillInputAndContinue(VET_RCVS_NUMBER_SELECTOR, VET_RCVS_NUMBER);
      await fillInputAndContinue(LABORATORY_URN_SELECTOR, testCase.urn);

      await clickOnElementAndContinue(TEST_RESULTS_SELECTOR);

      await $(SUBMIT_CLAIM_SELECTOR).click();
    });
  }

  for (const testCase of pigCases) {
    it("can create a new review claim for the breeding herd of pigs", async () => {
      await browser.url(getDevSignInUrl("claim"));
      await fillAndSubmitSBI(testCase.sbi);
      await $(getConfirmCheckDetailsSelector(CONFIRM_YES_ANSWER)).click();
      await clickSubmitButton();

      await clickStartNewClaimButton();

      await clickOnElementAndContinue(getTypeOfLivestockSelector(testCase.typeOfLiveStock));

      await clickOnElementAndContinue(getTypeOfReviewSelector(testCase.typeOfReview));

      await $(VISIT_DATE_DAY_SELECTOR).setValue(VISIT_DATE_DAY);
      await $(VISIT_DATE_MONTH_SELECTOR).setValue(VISIT_DATE_MONTH);
      await $(VISIT_DATE_YEAR_SELECTOR).setValue(VISIT_DATE_YEAR);
      await clickContinueButton();

      await fillInputAndContinue(HERD_NAME_SELECTOR, testCase.herdName);

      await fillInputAndContinue(HERD_CPH, testCase.cph);

      await clickOnElementAndContinue(HERD_OTHERS_ON_SBI_SELECTOR);

      await clickContinueButton();

      await clickOnElementAndContinue(WHEN_TESTING_WAS_CARRIED_OUT_SELECTOR);

      await clickOnElementAndContinue(SPECIES_NUMBERS_SELECTOR);
      await fillInputAndContinue(NUMBER_ANIMALS_TESTED_SELECTOR, testCase.speciesNumber);

      await fillInputAndContinue(VETS_NAME_SELECTOR, VETS_NAME);
      await fillInputAndContinue(VET_RCVS_NUMBER_SELECTOR, VET_RCVS_NUMBER);
      await fillInputAndContinue(LABORATORY_URN_SELECTOR, testCase.urn);

      await fillInputAndContinue(NUMBER_ORAL_FLUID_SAMPLES_SELECTOR, testCase.speciesNumber);

      await clickOnElementAndContinue(TEST_RESULTS_SELECTOR);

      await $(SUBMIT_CLAIM_SELECTOR).click();
    });
  }
});
