import { remote } from "webdriverio";
import assert from "node:assert";

async function runTest() {
  const browser = await remote({
    capabilities: {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: ["headless", "disable-gpu", "no-sandbox"],
      },
    },
  });

  try {
    let url = "http://localhost:3000/apply/endemics/dev-sign-in";

    if (process.env.DOCKER_MODE && process.env.DOCKER_MODE === "true") {
      url = "http://ffc-ahwr-farmer-apply:3000/apply/endemics/dev-sign-in";
    }

    await browser.url(url);

    await browser.$("#sbi").setValue("107167406");
    await browser.$('button[type="submit"]').click();
    await browser.$("#confirmCheckDetails").click();
    await browser.$('button[type="submit"]').click();
    await browser.$('button[type="submit"]').click();
    await browser.$('button[type="submit"]').click();
    await browser.$('button[type="submit"]').click();
    await browser.$("#terms").click();
    await browser.$('button[type="submit"]').click();

    const title = await browser.getTitle();
    assert(title.includes("Application complete"));

    console.log("✅ Test passed!");
  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  } finally {
    await browser.deleteSession();
    process.exit(0);
  }
}

runTest();
