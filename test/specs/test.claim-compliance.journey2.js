import { browser, $, expect } from "@wdio/globals";

import {
  getDevSignInUrl,
  fillAndSubmitSBI,
  createClaim,
  clickOnElementAndContinue,
  clickContinueButton,
  clickSubmitButton,
  clickStartNewClaimButton,
  fillInputAndContinue,
  createAgreement
} from "../utils/common.js";
import {
  getConfirmCheckDetailsSelector,
  getTypeOfLivestockSelector,
  getTypeOfReviewSelector,
  HERD_CPH,
} from "../utils/selectors.js";

const fillerSbis = [
  "106705779",
  "107167406",
  "107097991",
  "106354662",
];
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

describe("Test claim compliance checks", async function(){

    it("can create a new review claim for the breeding herd of sheep", async () => {
      for (const sbi of fillerSbis) {
        // await createAgreement(sbi);
        await createClaim(sbi);
        // await createBeefClaim(sbi);
      }
    })
      
});

// Constants for magic strings
const VISIT_DATE_DAY = "30";
const VISIT_DATE_MONTH = "5";
const VISIT_DATE_YEAR = "2025";
const VETS_NAME = "bob";
const VET_RCVS_NUMBER = "1234567";
const BEEF_CLAIM = {
  typeOfLiveStock: 'beef',
  typeOfReview: 'review',
  herdName: 'beefs',
  cph: '11/333/4444',
  speciesNumber: "22",
  urn: 'urn-222',
  sbi: '123456788',
};

async function createBeefClaim(sbi) {
  await browser.url(getDevSignInUrl("claim"));
  await fillAndSubmitSBI(sbi);
  await $(getConfirmCheckDetailsSelector(CONFIRM_YES_ANSWER)).click();
  await clickSubmitButton();

  await clickStartNewClaimButton();

  await clickOnElementAndContinue(getTypeOfLivestockSelector(BEEF_CLAIM.typeOfLiveStock));

  await clickOnElementAndContinue(getTypeOfReviewSelector(BEEF_CLAIM.typeOfReview));

  await $(VISIT_DATE_DAY_SELECTOR).setValue(VISIT_DATE_DAY);
  await $(VISIT_DATE_MONTH_SELECTOR).setValue(VISIT_DATE_MONTH);
  await $(VISIT_DATE_YEAR_SELECTOR).setValue(VISIT_DATE_YEAR);
  await clickContinueButton();

  await fillInputAndContinue(HERD_NAME_SELECTOR, BEEF_CLAIM.herdName);

  await fillInputAndContinue(HERD_CPH, BEEF_CLAIM.cph);

  await clickOnElementAndContinue(HERD_OTHERS_ON_SBI_SELECTOR);

  await clickContinueButton();

  await clickOnElementAndContinue(WHEN_TESTING_WAS_CARRIED_OUT_SELECTOR);

  await clickOnElementAndContinue(SPECIES_NUMBERS_SELECTOR);

  await fillInputAndContinue(VETS_NAME_SELECTOR, VETS_NAME);
  await fillInputAndContinue(VET_RCVS_NUMBER_SELECTOR, VET_RCVS_NUMBER);
  await fillInputAndContinue(LABORATORY_URN_SELECTOR, BEEF_CLAIM.urn);

  await clickOnElementAndContinue(TEST_RESULTS_SELECTOR);

  await $(SUBMIT_CLAIM_SELECTOR).click();
}