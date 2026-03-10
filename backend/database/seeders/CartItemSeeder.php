<?php

namespace Database\Seeders;

use App\Models\CartItem;
use App\Contracts\HasTable;
use Illuminate\Database\Seeder;

class CartItemSeeder extends Seeder implements HasTable
{
    public function getTableName(): string
    {
        return 'cart_items';
    }

    public function run(): void
    {
        CartItem::factory()->count(5)->create();
    }
}
