<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductVariant;
use App\Contracts\HasTable;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductVariantSeeder extends Seeder implements HasTable
{
        public function getTableName(): string
        {
            return 'product_variants';
        }
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::all()->each(function ($product) {
            ProductVariant::factory()->count(3)->create(['product_id' => $product->id]);
        });
    }
}
