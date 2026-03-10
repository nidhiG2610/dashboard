<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class WarehouseFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->company . ' Warehouse',
            'code' => $this->faker->unique()->bothify('WH-###'),
            'address_line1' => $this->faker->streetAddress(),
            'address_line2' => $this->faker->optional()->secondaryAddress(),
            'city' => $this->faker->city(),
            'state' => $this->faker->state(),
            'postal_code' => $this->faker->postcode(),
            'country' => $this->faker->country(),
            'is_active' => true,
        ];
    }
}
