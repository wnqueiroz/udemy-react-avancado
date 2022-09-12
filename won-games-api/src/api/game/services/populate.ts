/**
 * populate service
 */

import { Strapi } from "@strapi/strapi";
import axios from "axios";
import { JSDOM } from "jsdom";
import slugify from "slugify";

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

async function createGameRelation(
  strapi: Strapi,
  name: string,
  relation: "publisher" | "developer" | "category" | "platform"
) {
  return strapi.service(`api::${relation}.${relation}`).create({
    data: {
      name,
      slug: slugify(name).toLowerCase(),
      publishedAt: new Date(),
    },
  });
}

export default async ({ strapi }: { strapi: Strapi }) => {
  const gogApiUrl = `https://www.gog.com/games/ajax/filtered?mediaType=game&page=1&sort=popularity`;

  const {
    data: { products },
  } = await axios.get(gogApiUrl);

  // const gameInfo = await getGameInfo(products[0].slug);

  await createGameRelation(strapi, products[0].publisher, "publisher");

  await createGameRelation(strapi, products[0].developer, "developer");

  return {
    john: "doe",
  };
};
