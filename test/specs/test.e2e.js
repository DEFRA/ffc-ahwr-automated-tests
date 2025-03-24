import { expect, browser, $ } from "@wdio/globals";

describe("apply and claim journey for Sheep", () => {
  const sbi = "107167406";

  it("should be able to create a new application", async () => {
    let url = "http://localhost:3000/apply/endemics/dev-sign-in";

    if (process.env.DOCKER_MODE && process.env.DOCKER_MODE === "true") {
      url = "http://ffc-ahwr-farmer-apply:3000/apply/endemics/dev-sign-in";
    }

    // Go to dev sign in
    await browser.url(url);

    // Enter SBI and submit
    await $("#sbi").setValue(sbi);
    await $('button[type="submit"]').click();

    // Select radio button Yes and submit
    await $("#confirmCheckDetails").click();
    await $('button[type="submit"]').click();

    // Click I agree
    await $('button[type="submit"]').click();

    // Click I agree
    await $('button[type="submit"]').click();

    // Click I agree
    await $('button[type="submit"]').click();

    // Select radio button to accept terms and conditions and submit
    await $("#terms").click();
    await $('button[type="submit"]').click();

    // Wait for application submission to complete and page to load
    const title = await $(".govuk-panel__title");
    await title.waitForDisplayed({ timeout: 5000 });

    // Verify application successful
    await expect(title).toHaveText(
      expect.stringContaining("Application complete")
    );
  });

  it("should be able to create a new review claim for sheep", async () => {
    let url = "http://localhost:3004/claim/endemics/dev-sign-in";

    if (process.env.DOCKER_MODE && process.env.DOCKER_MODE === "true") {
      url = "http://ffc-ahwr-farmer-claim:3004/claim/endemics/dev-sign-in";
    }

    await browser.url(url);

    await $("#sbi").setValue(sbi);
    await $('button[type="submit"]').click();

    await $('input[name="typeOfLivestock"][value="sheep"]').click();

    await $("button=Continue").click();

    await $('input[name="typeOfReview"][value="review"]').click();

    await $("button=Continue").click();

    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const year = today.getFullYear().toString();

    await $("#visit-date-day").setValue(day);
    await $("#visit-date-month").setValue(month);
    await $("#visit-date-year").setValue(year);
    await $("button=Continue").click();

    await $(
      'input[name="whenTestingWasCarriedOut"][value="whenTheVetVisitedTheFarmToCarryOutTheReview"]'
    ).click();
    await $("button=Continue").click();

    await $('input[name="speciesNumbers"][value="yes"]').click();
    await $("button=Continue").click();

    await $("#numberAnimalsTested").setValue("10");
    await $("button=Continue").click();

    await $("#vetsName").setValue("Mr Auto Test");
    await $("button=Continue").click();

    await $("#vetRCVSNumber").setValue("1234567");
    await $("button=Continue").click();

    await $("#laboratoryURN").setValue("534346");
    await $("button=Continue").click();

    await $("#submit-claim").click();

    const title = await $(".govuk-panel__title");
    await title.waitForDisplayed({ timeout: 5000 });

    await expect(title).toHaveText(expect.stringContaining("Claim complete"));
  });
});
