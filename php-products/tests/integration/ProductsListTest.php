<?php

use Tests\TestCase;

class ProductsListTest extends TestCase
{
    protected const ENDPOINT = 'products';

    public function testResponseJsonStructure()
    {
        $this->json('GET', static::ENDPOINT)
            ->seeJsonStructure([
                'status',
                'data' => [
                   [
                    'id',
                    'title',
                    'description',
                    'price_in_cents'
                    ]
                ]
            ]);
    }
}
