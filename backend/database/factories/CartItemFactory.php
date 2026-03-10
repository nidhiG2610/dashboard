<?php

namespace Database\Factories;

use App\Models\Cart;
use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\Factories\Factory;

class CartItemFactory extends Factory
{
    public function definition(): array
    {
        return [
            'cart_id' => Cart::factory(),
            'variant_id' => ProductVariant::factory(),
            'quantity' => $this->faker->numberBetween(1, 5),
            'unit_price' => $this->faker->randomFloat(2, 10, 500),
        ];
    }
}
