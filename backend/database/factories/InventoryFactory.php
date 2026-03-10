<?php

namespace Database\Factories;

use App\Models\ProductVariant;
use App\Models\Warehouse;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inventory>
 */
class InventoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'variant_id' => ProductVariant::factory(),
            'warehouse_id' => Warehouse::factory(),
            'quantity' => $this->faker->numberBetween(0, 100),
            'reserved_qty' => $this->faker->numberBetween(0, 20),
            'reorder_level' => 10,
            'reorder_qty' => 50,
        ];
    }
}
