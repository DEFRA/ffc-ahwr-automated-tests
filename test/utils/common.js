import { expect, $ } from "@wdio/globals";
import * as selectors from "./selectors";

export function getSignInUrl(type) {
  const baseUrls = {
    apply: "http://localhost:3000/apply/endemics/dev-sign-in",
    claim: "http://localhost:3004/claim/endemics/dev-sign-in",
  };

  const dockerUrls = {
    apply: "http://ffc-ahwr-farmer-apply:3000/apply/endemics/dev-sign-in",
    claim: "http://ffc-ahwr-farmer-claim:3000/claim/endemics/dev-sign-in",
  };

  return process.env.DOCKER_MODE === "true" ? dockerUrls[type] : baseUrls[type];
}

export async function fillAndSubmitSBI(sbi) {
  await $("#sbi").setValue(sbi);
  await clickSubmitButton();
}

export async function submitApplicationSteps() {
  for (let i = 0; i < 3; i++) {
    await clickSubmitButton();
  }
}

export async function enterVisitDateAndContinue() {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const year = today.getFullYear().toString();

  await $(selectors.visitDateDay).setValue(day);
  await $(selectors.visitDateMonth).setValue(month);
  await $(selectors.visitDateYear).setValue(year);
  await clickContinue();
}

export async function whenTestingWasCarriedOutAndContinue(value) {
  await $(selectors.whenTestingWasCarriedOut(value)).click();
  await clickContinue();
}

export async function answerAndContinue(selector) {
  await $(selector).click();
  await clickContinue();
}

export async function selectSheepTestsAndContinue(testTypes) {
  if (!Array.isArray(testTypes)) {
    testTypes = [testTypes];
  }

  for (const testType of testTypes) {
    const checkbox = $(selectors.sheepTestsDiseaseCondition(testType));

    if (!(await checkbox.isSelected())) {
      await checkbox.click();
    }
    await clickContinue();
  }
}

export async function fillInputAndContinue(selector, value) {
  await $(selector).setValue(value);
  await clickContinue();
}

export async function verifySubmission(expectedText) {
  const title = $(".govuk-panel__title");
  await expect(title).toHaveText(expect.stringContaining(expectedText));
}

export async function clickContinue() {
  await $("button=Continue").click();
}

export async function clickSubmitButton() {
  await $('button[type="submit"]').click();
}
