<?php

namespace App\Http\Controllers;


use Illuminate\Http\Response;
use App\Services\Product\ProductServiceInterface;

class ProductsController extends Controller
{
    protected $productService;

    public function __construct(ProductServiceInterface $productService)
    {
        $this->productService = $productService;
    }

    public function list(): Array
    {
        return [
            'status' => Response::HTTP_OK,
            'data' => $this->productService->list()
        ];
    }
}
