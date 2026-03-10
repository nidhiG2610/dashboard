<?php

namespace Database\Seeders;

use App\Models\Warehouse;
use App\Contracts\HasTable;
use Illuminate\Database\Seeder;

class WarehouseSeeder extends Seeder implements HasTable
{
        public function getTableName(): string
        {
            return 'warehouses';
        }
    public function run(): void
    {
        Warehouse::factory()->count(5)->create();
    }
}
