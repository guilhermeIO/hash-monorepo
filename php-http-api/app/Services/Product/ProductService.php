<?php

namespace App\Services\Product;


use App\Entities\Product;
use App\Exceptions\GRPCException;
use App\Services\User\UserServiceInterface;
use Productsdiscount\{ ApplyRequest, ProductsDiscountClient };

class ProductService implements ProductServiceInterface
{
    const GRPC_FAILURE_CODES = [3, 13, 14];

    protected $userService;
    protected $productModel;
    protected $productsDiscountClient;

    public function __construct(
        Product $productModel,
        ProductsDiscountClient $productsDiscountClient,
        UserServiceInterface $userService
    )
    {
        $this->productModel = $productModel;
        $this->productsDiscountClient = $productsDiscountClient;
        $this->userService = $userService;
    }

    public function list(): Array
    {
        $products = $this->productModel->all()->toArray();

        return array_map(function ($item)
        {
            $id = $item['_id'];

            $product = [
                'id' => $id,
                'title' => $item['title'],
                'description' => $item['description'],
                'price_in_cents' => $item['price_in_cents'],
            ];

            if ($this->userService->getId()) {
                $product = array_merge($product, $this->applyDiscount($id));
            }
            return $product;
        }, $products);
    }

    protected function applyDiscount($productId)
    {
        $request = (new ApplyRequest())
            ->setProductId($productId)
            ->setUserId($this->userService->getId());

        list($response, $status) = $this->productsDiscountClient
            ->Apply($request)
            ->wait();

        if (in_array($status->code, self::GRPC_FAILURE_CODES)) {
            return [];
        }

        $discount = $response->getDiscount();

        return [
            'discount' => [
                'percent' => $discount->getPercent(),
                'value_in_cents' => $discount->getValueInCents()
            ]
        ];
    }
}
