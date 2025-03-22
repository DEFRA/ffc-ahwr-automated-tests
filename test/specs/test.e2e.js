import { expect, browser, $ } from "@wdio/globals";

describe("apply", () => {
  it("should be able to create a new application", async () => {
    console.log(`BH TEST: 3 - Just test changed!}`);

    let url = "http://localhost:3000/apply/endemics/dev-sign-in";

    if (process.env.DOCKER_MODE && process.env.DOCKER_MODE === "true") {
      url = "http://ffc-ahwr-farmer-apply:3000/apply/endemics/dev-sign-in";
    }

    // Go to dev sign in
    await browser.url(url);

    // Enter SBI and submit
    await $("#sbi").setValue("107167406");
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
      expect.stringContaining("Application complete"),
    );
  });
});
