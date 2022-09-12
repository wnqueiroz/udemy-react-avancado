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

async function create(
  strapi: Strapi,
  name: string,
  relation: "publisher" | "developer" | "category" | "platform"
) {
  const {
    pagination: { total: exists },
  } = (await strapi
    .service(`api::${relation}.${relation}`)
    .find({ filters: { name } })) as { pagination: { total: number } };

  if (!exists)
    return strapi.service(`api::${relation}.${relation}`).create({
      data: {
        name,
        slug: slugify(name).toLowerCase(),
        publishedAt: new Date(),
      },
    });
}

async function createManyToManyData(strapi: Strapi, products) {
  const developers = {};
  const publishers = {};
  const categories = {};
  const platforms = {};

  products.forEach((product) => {
    const { developer, publisher, genres, supportedOperatingSystems } = product;

    genres &&
      genres.forEach((item) => {
        categories[item] = true;
      });
    supportedOperatingSystems &&
      supportedOperatingSystems.forEach((item) => {
        platforms[item] = true;
      });
    developers[developer] = true;
    publishers[publisher] = true;
  });

  return Promise.all([
    ...Object.keys(developers).map((name) => create(strapi, name, "developer")),
    ...Object.keys(publishers).map((name) => create(strapi, name, "publisher")),
    ...Object.keys(categories).map((name) => create(strapi, name, "category")),
    ...Object.keys(platforms).map((name) => create(strapi, name, "platform")),
  ]);
}

export default async ({ strapi }: { strapi: Strapi }) => {
  const gogApiUrl = `https://www.gog.com/games/ajax/filtered?mediaType=game&page=1&sort=popularity`;

  const {
    data: { products },
  } = await axios.get(gogApiUrl);

  await createManyToManyData(strapi, products);

  return {
    john: "doe",
  };
};
