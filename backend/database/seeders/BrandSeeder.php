<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Contracts\HasTable;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder implements HasTable
{
    public function getTableName(): string
    {
        return 'brands';
    }

    public function run(): void
    {
        Brand::factory()->count(3)->create();
    }
}
