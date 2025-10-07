import { $ } from "@wdio/globals";
import { addDescription, TYPE } from "@wdio/allure-reporter";

import { clickSubmitButton, verifySubmission, performDevLogin } from "../utils/common.js";
import { TERMS_AND_CONDITIONS_CHECKBOX } from "../utils/selectors.js";
import { APPLY_REVIEW_CLAIM_SBI } from "../utils/constants.js";

describe("Vet-visits apply journey", () => {
  it("can create a new application", async () => {
    addDescription("Attempt to create a new application", TYPE.MARKDOWN);

    await performDevLogin(APPLY_REVIEW_CLAIM_SBI);
    await clickSubmitButton();
    await clickSubmitButton();
    await clickSubmitButton();

    await $(TERMS_AND_CONDITIONS_CHECKBOX).click();
    await clickSubmitButton();

    await verifySubmission("Application complete");
  });

  it("can successfully reject an agreement", function () {
    addDescription("Test not implemented yet", TYPE.MARKDOWN);
    this.skip();
  });

  it("can reject first and then create an agreement successfully", function () {
    addDescription("Test not implemented yet", TYPE.MARKDOWN);
    this.skip();
  });
});
