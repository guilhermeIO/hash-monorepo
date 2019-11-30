<?php

namespace App\Providers;


use Illuminate\Support\ServiceProvider;
use App\Services\Product\{
    ProductService, ProductServiceInterface
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
    }
}
