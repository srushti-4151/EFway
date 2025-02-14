import React from "react";
import axios from "axios";
import ProductDetailsClient from "./ProductDetailsClient";

async function getData(name, activeTag = "") {
  const decodedName = decodeURIComponent(name)
    .replace(/~/g, " ")
    .replace(/-/g, " ");

  try {
    const [productRes, tagsRes, MoreRec] = await Promise.all([
      axios.get(`https://dummyjson.com/recipes/search?q=${decodedName}`),
      axios.get("https://dummyjson.com/recipes/tags"),
      axios.get("https://dummyjson.com/recipes?limit=0"),
    ]);

    let recipesRes;
    if (activeTag) {
      recipesRes = await axios.get(
        `https://dummyjson.com/recipes/tag/${activeTag}`
      );
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
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      product: null,
      tags: [],
      MoreRec: [],
      recipes: [],
    };
  }
}

export async function generateMetadata({ params, searchParams }) {
  const { name } = params;
  const activeTag = searchParams?.tag || "";

  try {
    const data = await getData(name, activeTag);

    if (!data.product) {
      return {
        title: "Recipe Not Found",
        description: "The recipe you are looking for does not exist.",
      };
    }

    const recipeUrl = `https://yourwebsite.com/recipes/${encodeURIComponent(name)}`;
    const imageUrl =
      data.product.image || "https://cdn.dummyjson.com/recipe-images/1.webp";

    return {
      title: data.product.name,
      description: `Learn more about ${data.product.name}, a delicious ${data.product.cuisine} cuisine recipe.`,
      openGraph: {
        title: data.product.name,
        description: `Learn more about ${data.product.name}, a delicious ${data.product.cuisine} cuisine recipe.`,
        url: recipeUrl,
        type: "website",
        siteName: "Your Recipe Site",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: data.product.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: data.product.name,
        description: `Learn more about ${data.product.name}, a delicious ${data.product.cuisine} cuisine recipe.`,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Error Loading Recipe",
      description: "An error occurred while fetching recipe details.",
    };
  }
}

export default async function ProductDetails({ params, searchParams }) {
  const { name } = params;
  const activeTag = searchParams?.tag || "";

  const data = await getData(name, activeTag);

  if (!data.product) {
    return <div>Recipe not found.</div>;
  }

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