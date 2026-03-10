<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BrandFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            'slug' => $this->faker->unique()->slug(),
            'logo_url' => $this->faker->optional()->imageUrl(500, 200, 'brands'),
            'description' => $this->faker->optional()->sentence(),
            'is_active' => true,
        ];
    }
}
