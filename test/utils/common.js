import { expect, $ } from "@wdio/globals";
import {
  SBI,
  CONTINUE_BUTTON,
  VISIT_DATE_DAY,
  VISIT_DATE_MONTH,
  VISIT_DATE_YEAR,
  SUBMIT_BUTTON,
  SUBMISSION_PANEL_TITLE,
  getWhenTestingWasCarriedOutSelector,
  getSheepTestsDiseaseConditionSelector,
  START_NEW_CLAIM_BUTTON,
} from "./selectors.js";

export function getDevSignInUrl(type) {
  const baseUrls = {
    apply: "http://localhost:3000/apply/endemics/dev-sign-in",
    claim: "http://localhost:3004/claim/endemics/dev-sign-in",
    backoffice: "http://localhost:3002/claims",
  };

  const dockerUrls = {
    apply: "http://ffc-ahwr-farmer-apply:3000/apply/endemics/dev-sign-in",
    claim: "http://ffc-ahwr-farmer-claim:3000/claim/endemics/dev-sign-in",
    backoffice: "http://ffc-ahwr-backoffice:3000/claims",
  };

  return process.env.DOCKER_MODE === "true" ? dockerUrls[type] : baseUrls[type];
}

export async function fillAndSubmitSBI(sbi) {
  await $(SBI).setValue(sbi);
  await clickSubmitButton();
}

export async function enterVisitDateAndContinue() {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const year = today.getFullYear().toString();

  await $(VISIT_DATE_DAY).setValue(day);
  await $(VISIT_DATE_MONTH).setValue(month);
  await $(VISIT_DATE_YEAR).setValue(year);
  await clickContinueButton();
}

export async function enterWhenTestingWasCarriedOutAndContinue(value) {
  await $(getWhenTestingWasCarriedOutSelector(value)).click();
  await clickContinueButton();
}

export async function clickOnElementAndContinue(selector) {
  await $(selector).click();
  await clickContinueButton();
}

export async function selectSheepTestsAndContinue(testTypes) {
  for (const testType of testTypes) {
    const checkbox = $(getSheepTestsDiseaseConditionSelector(testType));
    await checkbox.click();
    await clickContinueButton();
  }
}

export async function fillInputAndContinue(selector, value) {
  await $(selector).setValue(value);
  await clickContinueButton();
}

export async function verifySubmission(expectedText) {
  const title = $(SUBMISSION_PANEL_TITLE);
  await expect(title).toHaveText(expect.stringContaining(expectedText));
}

export async function clickContinueButton() {
  await $(CONTINUE_BUTTON).click();
}

export async function clickSubmitButton() {
  await $(SUBMIT_BUTTON).click();
}

export async function clickStartNewClaimButton() {
  await $(START_NEW_CLAIM_BUTTON).click();
}
