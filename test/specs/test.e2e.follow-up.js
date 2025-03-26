import { expect, browser, $ } from "@wdio/globals";

describe("Follow-up claim journeys for various species", () => {
  it("should be able to create a new follow-up claim for sheep", async () => {
    let url = "http://localhost:3004/claim/endemics/dev-sign-in";

    if (process.env.DOCKER_MODE && process.env.DOCKER_MODE === "true") {
      url = "http://ffc-ahwr-farmer-claim:3000/claim/endemics/dev-sign-in";
    }

    await browser.url(url);

    await $("#sbi").setValue("106208072");
    await $('button[type="submit"]').click();

    const sheepRadio = $('input[name="typeOfLivestock"][value="sheep"]');
    await sheepRadio.waitForExist({ timeout: 5000 });
    await sheepRadio.waitForDisplayed({ timeout: 5000 });
    await sheepRadio.click();
    await $("button=Continue").click();

    await $('input[name="typeOfReview"][value="endemics"]').click();
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

    await $(
      'input[name="sheepEndemicsPackage"][value="improvedEwePerformance"]'
    ).click();
    await $("button=Continue").click();

    await $('input[name="sheepTests"][value="johnes"]').click();
    await $("button=Continue").click();

    await $('input[name="testResult"][value="positive"]').click();
    await $("button=Continue").click();

    await $("#submit-claim").click();

    const title = await $(".govuk-panel__title");
    await title.waitForDisplayed({ timeout: 5000 });

    await expect(title).toHaveText(expect.stringContaining("Claim complete"));
    await expect($("#reference")).toHaveText(expect.stringContaining("FUSH"));
  });

  it("should be able to create a new follow-up claim for beef", async () => {
    let url = "http://localhost:3004/claim/endemics/dev-sign-in";

    if (process.env.DOCKER_MODE && process.env.DOCKER_MODE === "true") {
      url = "http://ffc-ahwr-farmer-claim:3000/claim/endemics/dev-sign-in";
    }

    await browser.url(url);

    await $("#sbi").setValue("107085418");
    await $('button[type="submit"]').click();

    await $('input[name="typeOfLivestock"][value="beef"]').click();
    await $("button=Continue").click();

    await $('input[name="typeOfReview"][value="endemics"]').click();
    await $("button=Continue").click();

    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const year = today.getFullYear().toString();

    await $("#visit-date-day").setValue(day);
    await $("#visit-date-month").setValue(month);
    await $("#visit-date-year").setValue(year);
    await $("button=Continue").click();

    await $('input[name="speciesNumbers"][value="yes"]').click();
    await $("button=Continue").click();

    await $("#vetsName").setValue("Mr Auto Test");
    await $("button=Continue").click();

    await $("#vetRCVSNumber").setValue("1234567");
    await $("button=Continue").click();

    await $('input[name="piHunt"][value="yes"]').click();
    await $("button=Continue").click();

    await $('input[name="piHuntAllAnimals"][value="yes"]').click();
    await $("button=Continue").click();

    await $(
      'input[name="whenTestingWasCarriedOut"][value="whenTheVetVisitedTheFarmToCarryOutTheReview"]'
    ).click();
    await $("button=Continue").click();

    await $("#laboratoryURN").setValue("521346");
    await $("button=Continue").click();

    await $('input[name="testResults"][value="positive"]').click();
    await $("button=Continue").click();

    await $('input[name="biosecurity"][value="yes"]').click();
    await $("button=Continue").click();

    await $("#submit-claim").click();

    const title = await $(".govuk-panel__title");
    await title.waitForDisplayed({ timeout: 5000 });

    await expect(title).toHaveText(expect.stringContaining("Claim complete"));
    await expect($("#reference")).toHaveText(expect.stringContaining("FUBC"));
  });
});
