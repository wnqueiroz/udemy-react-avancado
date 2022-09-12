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

async function createGames(strapi: Strapi, products) {
  await Promise.all(
    products.map(async (product) => {
      if (!(await exists(product.title, "game"))) {
        console.info(`Creating: ${product.title}...`);

        const categories = (
          await Promise.all(
            product.genres.map((name) =>
              getByName(name, "category").then((result) =>
                result.map(({ id }) => id).flat()
              )
            )
          )
        ).flat();

        const platforms = (
          await Promise.all(
            product.supportedOperatingSystems.map((name) =>
              getByName(name, "platform").then((result) =>
                result.map(({ id }) => id).flat()
              )
            )
          )
        ).flat();

        const data = {
          data: {
            name: product.title,
            slug: product.slug.replace(/_/g, "-"),
            price: product.price.amount,
            release_date: new Date(
              Number(product.globalReleaseDate) * 1000
            ).toISOString(),
            categories,
            platforms,
            developers: (await getByName(product.developer, "developer")).map(
              ({ id }) => id
            ),
            publisher: (await getByName(product.publisher, "publisher")).map(
              ({ id }) => id
            ),
            ...(await getGameInfo(product.slug)),
          },
        };

        return strapi.service(`api::game.game`).create(data);
      }
    })
  );
}

async function create(
  strapi: Strapi,
  name: string,
  relation: "publisher" | "developer" | "category" | "platform"
) {
  if (!(await exists(name, relation)))
    return strapi.service(`api::${relation}.${relation}`).create({
      data: {
        name,
        slug: slugify(name).toLowerCase(),
        publishedAt: new Date(),
      },
    });
}

async function exists(
  name: string,
  type: "publisher" | "developer" | "category" | "platform" | "game"
) {
  const {
    pagination: { total: exists },
  } = (await strapi
    .service(`api::${type}.${type}`)
    .find({ filters: { name } })) as { pagination: { total: number } };

  return !!exists;
}

async function getByName(
  name: string,
  type: "publisher" | "developer" | "category" | "platform" | "game"
) {
  const { results } = (await strapi
    .service(`api::${type}.${type}`)
    .find({ filters: { name } })) as {
    results: [];
    pagination: { total: number };
  };

  return results;
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

  // await createManyToManyData(strapi, products);
  await createGames(strapi, [products[0]]);

  return {
    john: "doe",
  };
};
