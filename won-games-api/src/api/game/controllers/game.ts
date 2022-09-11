/**
 * game controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::game.game", () => ({
  async populate(ctx) {
    console.log(ctx);

    return {
      john: "doe",
    };
  },
}));
