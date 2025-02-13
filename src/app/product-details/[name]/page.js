import React from "react";
import axios from "axios";
import ProductDetailsClient from "./ProductDetailsClient";

async function getData(name, activeTag = "") {
  const decodedName = decodeURIComponent(name)
    .replace(/~/g, " ")
    .replace(/-/g, " ");

  const [productRes, tagsRes, MoreRec] = await Promise.all([
    axios.get(`https://dummyjson.com/recipes/search?q=${decodedName}`),
    axios.get("https://dummyjson.com/recipes/tags"),
    axios.get("https://dummyjson.com/recipes?limit=0"),
  ]);

  let recipesRes;
  if (activeTag) {
    recipesRes = await axios.get(`https://dummyjson.com/recipes/tag/${activeTag}`);
  } else {
    recipesRes = await axios.get("https://dummyjson.com/recipes?limit=0");
  }

  return {
    product:
      productRes.data.recipes.length > 0 ? productRes.data.recipes[0] : null,
    tags: tagsRes.data,
    MoreRec: MoreRec.data.recipes,
    recipes: recipesRes.data.recipes,
  };
}

export async function generateMetadata({ params, searchParams }) {
  const { name } = params;
  const activeTag = searchParams?.tag || "";

  // Fetch the product data
  const data = await getData(name, activeTag);

  // If no product is found, return a default metadata
  if (!data.product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }

  // Generate metadata based on the product data
  return {
    title: data.product.name,
    description: `Learn more about ${data.product.name}, a delicious ${data.product.cuisine} cuisine recipe.`,
    openGraph: {
      title: data.product.name,
      description: `Learn more about ${data.product.name}, a delicious ${data.product.cuisine} cuisine recipe.`,
      images: [
        {
          url: data.product.image,
          width: 800,
          height: 600,
          alt: data.product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.product.name,
      description: `Learn more about ${data.product.name}, a delicious ${data.product.cuisine} cuisine recipe.`,
      images: [data.product.image],
    },
  };
}

export default async function ProductDetails({ params, searchParams }) {
  const { name } = params;
  const activeTag = searchParams?.tag || ""; 

  const data = await getData(name, activeTag);

  return (
    <>
      <ProductDetailsClient
        productData={data.product}
        tagsData={data.tags}
        moreRecData={data.MoreRec}
        recipesData={data.recipes}
        activeTag={activeTag}
      />
    </>
  );
}
