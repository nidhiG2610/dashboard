<?php

namespace Database\Seeders;

use App\Models\ProductTag;
use App\Contracts\HasTable;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductTagSeeder extends Seeder implements HasTable
{
        public function getTableName(): string
        {
            return 'product_tags';
        }
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductTag::factory()->count(3)->create();
    }
}
