/**
 * populate service
 */

import axios from "axios";

export default async (ctx) => {
  const gogApiUrl = `https://www.gog.com/games/ajax/filtered?mediaType=game&page=1&sort=popularity`;

  const {
    data: { products },
  } = await axios.get(gogApiUrl);

  console.log(products);

  return {
    john: "doe",
  };
};
