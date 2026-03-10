<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductVariant>
 */
class ProductVariantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => Product::factory(),
            'sku' => $this->faker->unique()->bothify('SKU-####-??'),
            'name' => $this->faker->words(3, true),
            'price' => $this->faker->randomFloat(2, 10, 500),
            'sale_price' => $this->faker->optional()->randomFloat(2, 5, 400),
            'cost_price' => $this->faker->optional()->randomFloat(2, 3, 300),
            'weight' => $this->faker->optional()->randomFloat(3, 0.1, 10),
            'image_url' => $this->faker->optional()->imageUrl(500, 500, 'products'),
            'is_active' => true,
        ];
    }
}
