const puppeteer = require("puppeteer");

const BASE_URL = "https://www.youtube.com/results?search_query=";

const init = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  return page;
};

const search = async (page, search) => {
  const URL = BASE_URL + search;
  await page.goto(URL);

  const data = await page.evaluate(async () => {
    const results = [...document.querySelectorAll("ytd-video-renderer")];
    await new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
    const data = results.map((el) => {
      const [visits, timeAgo] = el.querySelector("#metadata-line").children;

      const data = {
        title: el.querySelector("#title-wrapper")?.innerText?.trim(),
        timeAgo: timeAgo?.innerText?.trim(),
        visits: visits?.innerText?.trim(),
        channel: el
          .querySelector("#channel-name #text-container")
          ?.innerText?.trim(),
        description: el.querySelector("yt-formatted-string")?.innerText?.trim(),
        duration: el.querySelector("#thumbnail #text")?.innerText?.trim(),
      };
      return data;
    });
    return data;
  });

  return data;
};

module.exports = { init, search };
