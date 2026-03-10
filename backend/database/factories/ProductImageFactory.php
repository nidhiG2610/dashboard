<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductImage>
 */
class ProductImageFactory extends Factory
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
            'image_url' => $this->faker->imageUrl(500, 500, 'products'),
            'alt_text' => $this->faker->optional()->words(3, true),
            'is_primary' => $this->faker->boolean(20),
            'sort_order' => $this->faker->numberBetween(0, 10),
        ];
    }
}
