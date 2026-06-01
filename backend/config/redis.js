const redisClient = require("../config/redis");

router.get("/products", async (req, res) => {
  try {
    const cacheData = await redisClient.get("products");

    if (cacheData) {
      console.log("Data from Redis");
      return res.json(JSON.parse(cacheData));
    }

    const products = await Product.find();

    await redisClient.set(
      "products",
      JSON.stringify(products),
      { EX: 3600 } // 1 hour
    );

    console.log("Data from MongoDB");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});