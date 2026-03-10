<?php

namespace Database\Seeders;

use App\Contracts\HasTable;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Warehouse;
use App\Models\ProductVariant;
use App\Models\Inventory;

class InventorySeeder extends Seeder implements HasTable
{
        public function getTableName(): string
        {
            return 'inventory';
        }
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $warehouses = Warehouse::pluck('id');
        ProductVariant::all()->each(function ($variant) use ($warehouses) {
            foreach ($warehouses->random(min(3, $warehouses->count())) as $warehouseId) {
                Inventory::factory()->create([
                    'variant_id' => $variant->id,
                    'warehouse_id' => $warehouseId,
                ]);
            }
        });
    }
}
