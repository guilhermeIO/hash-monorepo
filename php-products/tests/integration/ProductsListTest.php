<?php

use Tests\TestCase;

class ProductsListTest extends TestCase
{
    protected const ENDPOINT = 'products';

    public function testResponseStructureOnSuccess(): void {
        $this->json('GET', static::ENDPOINT)
            ->seeJsonStructure([
                'status',
                'data'
            ]);
    }

    public function testRespondsWithEmptyList(): void {
        $this->json('GET', static::ENDPOINT)
            ->seeJson([
                'status' => 200,
                'data' => []
            ]);
    }
}
