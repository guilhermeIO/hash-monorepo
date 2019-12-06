<?php

namespace App\Services\Product;


use App\Entities\Product;

class ProductService implements ProductServiceInterface
{
    protected $productModel;

    public function __construct(Product $productModel)
    {
        $this->productModel = $productModel;
    }

    public function list(): Array
    {
        $products = $this->productModel->all()->toArray();

        return array_map(function ($item) {
            return [
                'id' => $item['_id'],
                'title' => $item['title'],
                'description' => $item['description'],
                'price_in_cents' => $item['price_in_cents'],
            ];
        }, $products);
    }
}
