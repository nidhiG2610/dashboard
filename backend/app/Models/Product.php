<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $fillable = [
        'name',
        'description',
        'price',
        'category_id',
        'brand_id'
    ];

    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }
    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function tags()
    {
        return $this->belongsToMany(ProductTag::class, 'product_tag_map', 'product_id', 'tag_id');
    }
}
