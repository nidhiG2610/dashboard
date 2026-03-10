<?php

namespace Database\Seeders;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\ProductVariant;
use App\Contracts\HasTable;
use Illuminate\Database\Seeder;

class CartSeeder extends Seeder implements HasTable
{
        public function getTableName(): string
        {
            return 'shopping_cart';
        }
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Cart::factory()->count(5)->create()->each(function ($cart) {
            $variants = ProductVariant::inRandomOrder()->limit(3)->pluck('id');
            foreach ($variants as $variantId) {
            CartItem::factory()->create([
                'cart_id' => $cart->id,
                'variant_id' => $variantId,
            ]);
            }
        });
    }
}
