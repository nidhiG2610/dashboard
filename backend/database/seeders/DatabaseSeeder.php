<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public static $seeders = [
        // RoleSeeder::class,
        // UserTableSeeder::class,
        BrandSeeder::class,
        WarehouseSeeder::class,
        ProductTagSeeder::class,
        ProductSeeder::class,
        ProductVariantSeeder::class,
        ProductImageSeeder::class,
        InventorySeeder::class,
        CartSeeder::class,
        CartItemSeeder::class,
    ];

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        foreach (self::$seeders as $seeder) {
            $this->call($seeder);
        }
    }
}
