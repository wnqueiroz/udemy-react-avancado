/**
 * @see https://docs.strapi.io/developer-docs/latest/development/backend-customization/routes.html#creating-custom-routers
 *
 * 💡 Routes files are loaded in alphabetical order. To load custom routes before core routes, make sure to name custom routes
 * appropriately (e.g. 01-custom-routes.js and 02-core-routes.js).
 */
module.exports = {
  routes: [
    {
      method: "POST",
      path: "/games/populate",
      handler: "game.populate",
    },
  ],
};
