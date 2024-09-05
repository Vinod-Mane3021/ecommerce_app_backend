import { filterProducts, findProductById } from "../services/product.service";
import { ProductModel } from "../models/product.model";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response, NextFunction, response } from "express";
import z from "zod";
import ApiResponse from "../utils/ApiResponse";
import HttpStatusCode from "../constants/HttpStatusCodes";

export const getProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Access query parameters from req.query
    const categories = Array.isArray(req.query.categories)
      ? req.query.categories
      : [req.query.categories];
    // const brand = req.query.brand ? String(req.query.brand) : "";
    const brands = Array.isArray(req.query.brands)
      ? req.query.brands
      : [req.query.brands];
    const name = req.query.name ? String(req.query.name) : "";
    const minPrice = Number(req.query.minPrice) || 0;
    const maxPrice = Number(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 50;

    console.log("categries", categories);

    console.log("brands :", brands);
    console.log("name :", name);
    console.log("minPrice :", minPrice);
    console.log("maxPrice :", maxPrice);
    console.log("page :", page);
    console.log("pageSize :", pageSize);

    const categoriesRegex = {
      product_category_tree: {
        $in: categories.map((category: string) => {
          if (category) {
            return new RegExp(category, "i");
          }
        }),
      },
    };

    console.log("categoriesRegex : ", categoriesRegex);
    // console.log("categoriesRegex : ", categoriesRegex)
    // const brandRegex = {
    //     brand: {
    //         $regex: new RegExp(brand, 'i')
    //     }
    // }
    const brandsRegex = {
      brand: {
        $in: brands.map((brand: string) => new RegExp(brand, "i")),
      },
    };
    // console.log("brandRegex : ", brandsRegex)
    // regular expressions for name
    const nameRegex = {
      product_name: {
        $regex: new RegExp(name, "i"),
      },
    };
    const priceRange = {
      discounted_price: {
        $gte: minPrice,
        $lte: maxPrice,
      },
    };
    const conditions = [];

    if (categories.length > 0) {
      // console.log("categories check")
      conditions.push(categoriesRegex);
    }
    if (brands) {
      // console.log("brand check")
      conditions.push(brandsRegex);
    }
    if (name) {
      // console.log("name check")
      conditions.push(nameRegex);
    }
    if (minPrice > 0 || maxPrice < Number.MAX_SAFE_INTEGER) {
      // console.log("price range check")
      conditions.push(priceRange);
    }

    // Combine the regular expressions based on the provided parameters
    const combineRegex = conditions.length > 0 ? { $and: conditions } : null;

    console.log("combineRegex : ", combineRegex)
    // Find products matching the specified criteria

    const matchingProducts = await filterProducts(combineRegex, page, pageSize);

    const outputSize = matchingProducts.length;

    console.log("outputSize : ", outputSize, " | " + page);

    const trimmedProducts = matchingProducts.map((product) => {
      const discount = Math.floor(
        (product.discounted_price / product.retail_price) * 100
      );
      return {
        id: product._id,
        image: product.image[0],
        name: product.product_name,
        brand: product.brand,
        retail_price: product.retail_price,
        discounted_price: product.discounted_price,
        discount: discount,
      };
    });

    

    res.status(200).json({
      size: outputSize,
      data: trimmedProducts,
    });
  }
);

const productSchema = z.string();

export const getProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const result = productSchema.safeParse(id);

    if (!result.success) {
      return new ApiResponse(
        HttpStatusCode.BAD_REQUEST,
        "INVALID_INPUTS",
        "Invalid id provided"
      ).sendResponse(res);
    }

    const product = await findProductById(id);

    if (!product) {
      return new ApiResponse(
        HttpStatusCode.NOT_FOUND,
        "PRODUCT_NOT_FOUND",
        "Product not found with this id"
      );
    }

    return new ApiResponse(
      HttpStatusCode.OK,
      "SUCCESS",
      "product got successfully",
      product
    ).sendResponse(res);
  }
);
