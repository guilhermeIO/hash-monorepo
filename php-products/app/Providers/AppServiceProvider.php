<?php

namespace App\Providers;

use Grpc\ChannelCredentials;
use Illuminate\Support\ServiceProvider;
use Productsdiscount\ProductsDiscountClient;
use App\Services\Product\{
    ProductService, ProductServiceInterface
};
use App\Services\User\{
    UserService, UserServiceInterface
};

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            ProductServiceInterface::class,
            ProductService::class
        );
        $this->app->bind(
            UserServiceInterface::class,
            UserService::class
        );

        $this->app->singleton(ProductsDiscountClient::class, function () {
            return new ProductsDiscountClient('node-products-discount:50051', [
                'credentials' => ChannelCredentials::createInsecure()
            ]);
        });
    }
}
