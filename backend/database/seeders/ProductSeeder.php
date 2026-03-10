<?php

namespace Database\Seeders;

use App\Contracts\HasTable;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\ProductTag;
use App\Models\ProductImage;

class ProductSeeder extends Seeder implements HasTable
{
        public function getTableName(): string
        {
            return 'products';
        }
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::factory()
            ->count(3)
            ->create()
            ->each(function ($product) {
                // Create 3 variants for each product
                ProductVariant::factory()->count(3)->create(['product_id' => $product->id]);

                // Create 3 tags and attach to product
                $tags = ProductTag::factory()->count(3)->create();
                $product->tags()->attach($tags->pluck('id')->toArray());

                // Create 3 images for each product
                ProductImage::factory()->count(3)->create(['product_id' => $product->id]);
            });
    }
}
