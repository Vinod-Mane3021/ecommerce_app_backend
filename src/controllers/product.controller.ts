import { filterProducts } from "../services/product.service";
import { ProductModel } from "../models/product.model";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response, NextFunction } from 'express'

const getProduct = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        
        // Access query parameters from req.query
        const categories = req.query.categories ? Array(req.query.categories) : [];
        const brand = req.query.brand ? String(req.query.brand) : "";
        const name = req.query.name ? String(req.query.name) : "";
        const minPrice = Number(req.query.minPrice) || 0;
        const maxPrice = Number(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 20;

        console.log("name :", name)
    
        const categoriesRegex = {
            product_category_tree: {
                $in: categories.map((category: string) => new RegExp(category, 'i'))
            }
        }
        const brandRegex = {
            brand: {
                $regex: new RegExp(brand, 'i')
            }
        }
        // regular expressions for name
        const nameRegex = {
            product_name: {
                $regex: new RegExp(name, 'i'),
            }
        };
        const priceRange = {
            discounted_price: {
                $gte: minPrice,
                $lte: maxPrice
            }
        }
        const conditions = [];

        if(categories.length > 0) {
            console.log("categories check")
            conditions.push(categoriesRegex);
        }
        if(brand) {
            console.log("brand check")
            conditions.push(brandRegex);
        }
        if(name) {
            console.log("name check")
            conditions.push(nameRegex)
        }
        if(minPrice > 0 || maxPrice < Number.MAX_SAFE_INTEGER) {
            console.log("price range check")
            conditions.push(priceRange)
        }


        // Combine the regular expressions and price range based on the provided parameters
        const combineRegex = conditions.length > 0 ? { $and: conditions } : null;

        console.log("combineRegex : ", combineRegex)

        // Find products matching the specified criteria

        const matchingProducts = await filterProducts(combineRegex, page, pageSize)
        
        const outputSize = matchingProducts.length

        res.status(200).json({
            size: outputSize,
            data: matchingProducts
        })
    }
)





export { getProduct }