<?php

namespace Database\Seeders;

use App\Contracts\HasTable;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductImage;

class ProductImageSeeder extends Seeder implements HasTable
{
        public function getTableName(): string
        {
            return 'product_images';
        }
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::all()->each(function ($product) {
            ProductImage::factory()->count(3)->create(['product_id' => $product->id]);
        });
    }
}
