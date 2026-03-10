<?php

namespace Database\Factories;

use App\Models\Brand;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'brand_id' => Brand::factory(),
            'name' => $this->faker->words(3, true),
            'slug' => $this->faker->unique()->slug,
            'sku' => $this->faker->unique()->bothify('SKU-####-??'),
            'description' => $this->faker->optional()->paragraph,
            'short_description' => $this->faker->optional()->sentence,
            'base_price' => $this->faker->randomFloat(2, 10, 500),
            'sale_price' => $this->faker->optional()->randomFloat(2, 5, 400),
            'cost_price' => $this->faker->optional()->randomFloat(2, 3, 300),
            'currency' => 'USD',
            'is_active' => true,
            'is_featured' => $this->faker->boolean(20),
            'is_digital' => $this->faker->boolean(10),
            'weight' => $this->faker->optional()->randomFloat(3, 0.1, 10),
            'length' => $this->faker->optional()->randomFloat(2, 1, 100),
            'width' => $this->faker->optional()->randomFloat(2, 1, 100),
            'height' => $this->faker->optional()->randomFloat(2, 1, 100),
            'meta_title' => $this->faker->optional()->sentence,
            'meta_description' => $this->faker->optional()->text(100),
            'avg_rating' => 0,
            'total_reviews' => 0,
        ];
    }
}
