/**
 * game controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::game.game", () => ({
  async populate(ctx) {
    return strapi.service("api::game.populate");
  },
}));
