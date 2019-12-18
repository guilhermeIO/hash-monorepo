<?php

namespace App\Services\Product;


use App\Entities\Product;
use App\Exceptions\GRPCException;
use App\Services\User\UserServiceInterface;
use Productsdiscount\{ ApplyRequest, ProductsDiscountClient };

class ProductService implements ProductServiceInterface
{
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

        $canCheckForDiscount = $this->canCheckForDiscount();

        return array_map(function ($item) use ($canCheckForDiscount)
        {
            $id = $item['_id'];

            $product = [
                'id' => $item['_id'],
                'title' => $item['title'],
                'description' => $item['description'],
                'price_in_cents' => $item['price_in_cents'],
            ];

            if ($canCheckForDiscount) {
                $discount = $this->applyDiscount($id);
                $product = array_merge($product, [
                    'discount' => [
                        'percent' => $discount->getPercent(),
                        'value_in_cents' => $discount->getValueInCents()
                    ]
                ]);
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

        if ($status->code != 0) {
            throw new GRPCException($status);
        }
        return $response->getDiscount();
    }

    protected function canCheckForDiscount()
    {
        return $this->productsDiscountClient && $this->userService->getId();
    }
}
