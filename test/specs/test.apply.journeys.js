import { $ } from "@wdio/globals";
import { clickSubmitButton, verifySubmission, performDevLogin } from "../utils/common.js";
import { TERMS_AND_CONDITIONS_CHECKBOX } from "../utils/selectors.js";
import { APPLY_REVIEW_CLAIM_SBI } from "../utils/constants.js";

describe("Apply journey", () => {
  it("can create a new application", async () => {
    await performDevLogin(APPLY_REVIEW_CLAIM_SBI);
    await clickSubmitButton();
    await clickSubmitButton();
    await clickSubmitButton();

    await $(TERMS_AND_CONDITIONS_CHECKBOX).click();
    await clickSubmitButton();

    await verifySubmission("Application complete");
  });
});
