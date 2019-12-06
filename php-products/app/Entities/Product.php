<?php

namespace App\Entities;


use Jenssegers\Mongodb\Eloquent\Model;

class Product extends Model
{
    protected $collection = 'products';

    protected $fillable = [
        'title',
        'description',
        'price_in_cents'
    ];
}
