<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->string('sku', 100)->unique()->notNullable();
            $table->string('name', 300)->nullable();
            $table->decimal('price', 12, 2)->notNullable()->check('price >= 0');
            $table->decimal('sale_price', 12, 2)->check('sale_price >= 0')->nullable();
            $table->decimal('cost_price', 12, 2)->check('cost_price >= 0')->nullable();
            $table->decimal('weight', 10, 3)->nullable();
            $table->string('image_url', 500)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_variants');
    }
};
