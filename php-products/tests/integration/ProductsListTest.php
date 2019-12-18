<?php

use Tests\TestCase;
use Illuminate\Http\Response;

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

    public function testIncludesDiscountIfUserIsSpecified()
    {
        $headers = [
            'X-USER-ID' => '5dec20fc84a64441061fdefd'
        ];

        $this->json('GET', static::ENDPOINT, [], $headers)
            ->seeJsonStructure([
                'status',
                'data' => [
                    [
                        'id',
                        'title',
                        'description',
                        'price_in_cents',
                        'discount' => [
                            'percent',
                            'value_in_cents'
                        ]
                    ]
                ]
            ]);
    }

    public function testFailsWhenUserIsNotFound()
    {
        $headers = [
            'X-USER-ID' => '5dec20fc84a64441061fdefc'
        ];

        $response = json_decode(
            $this->json(
                'GET', static::ENDPOINT, [], $headers
            )->response->getContent()
        );

        $this->assertTrue($response->status === Response::HTTP_BAD_REQUEST);
        $this->assertStringContainsString('not found', $response->message);
        $this->assertStringContainsString('user_id', $response->message);
    }
}
