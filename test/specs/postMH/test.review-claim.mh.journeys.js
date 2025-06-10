import { expect, browser, $ } from "@wdio/globals";
import {
  getDevSignInUrl,
  fillAndSubmitSBI,
  clickSubmitButton,
  clickOnElementAndContinue,
  enterPostMHReleaseDateAndContinue,
  fillInputAndContinue,
  verifySubmission,
  clickStartNewClaimButton,
  chooseRandomHerdReasonsAndContinue,
  clickContinueButton,
  enterWhenTestingWasCarriedOutAndContinue,
} from "../../utils/common.js";
import {
  NUMBER_OF_ANIMALS_TESTED,
  VETS_NAME,
  VET_RCVS_NUMBER,
  LABORATORY_URN,
  SUBMIT_CLAIM_BUTTON,
  REFERENCE,
  HERD_NAME,
  HERD_CPH,
  OTHER_HERDS_ON_SBI_NO,
  getTypeOfLivestockSelector,
  getTypeOfReviewSelector,
  getSpeciesNumbersSelector,
  getConfirmCheckDetailsSelector,
} from "../../utils/selectors.js";
import { MULTIPLE_HERDS_SBI } from "../../utils/constants.js";

describe("Multiple herds - Review claim journeys for various species", () => {
  it("can create a new review claim for the breeding herd of sheep", async () => {
    await browser.url(getDevSignInUrl("claim"));

    await fillAndSubmitSBI(MULTIPLE_HERDS_SBI);
    await $(getConfirmCheckDetailsSelector("yes")).click();
    await clickSubmitButton();

    await clickStartNewClaimButton();

    await clickOnElementAndContinue(getTypeOfLivestockSelector("sheep"));

    await clickOnElementAndContinue(getTypeOfReviewSelector("review"));

    await enterPostMHReleaseDateAndContinue();

    await fillInputAndContinue(HERD_NAME, "Breeding herd");

    await fillInputAndContinue(HERD_CPH, "22/333/4444");

    await clickOnElementAndContinue(OTHER_HERDS_ON_SBI_NO);

    await chooseRandomHerdReasonsAndContinue();

    await clickContinueButton();

    await enterWhenTestingWasCarriedOutAndContinue("whenTheVetVisitedTheFarmToCarryOutTheReview");

    await clickOnElementAndContinue(getSpeciesNumbersSelector("yes"));

    await fillInputAndContinue(NUMBER_OF_ANIMALS_TESTED, "10");
    await fillInputAndContinue(VETS_NAME, "Mr Auto Test");
    await fillInputAndContinue(VET_RCVS_NUMBER, "1234567");
    await fillInputAndContinue(LABORATORY_URN, "sh-rr-534346");

    await $(SUBMIT_CLAIM_BUTTON).click();

    await verifySubmission("Claim complete");

    await expect($(REFERENCE)).toHaveText(expect.stringContaining("RESH"));
  });
});
