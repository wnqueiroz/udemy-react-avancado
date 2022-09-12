/**
 * populate service
 */

import axios from "axios";
import { JSDOM } from "jsdom";

async function getGameInfo(slug: string) {
  const body = await axios.get(`https://www.gog.com/game/${slug}`);

  const dom = new JSDOM(body.data);

  const description = dom.window.document.querySelector(".description");

  return {
    rating: "BR0",
    short_description: description.textContent.slice(0, 160),
    description: description.innerHTML,
  };
}

export default async (ctx) => {
  const gogApiUrl = `https://www.gog.com/games/ajax/filtered?mediaType=game&page=1&sort=popularity`;

  const {
    data: { products },
  } = await axios.get(gogApiUrl);

  const gameInfo = await getGameInfo(products[0].slug);

  console.log(gameInfo);

  return {
    john: "doe",
  };
};
