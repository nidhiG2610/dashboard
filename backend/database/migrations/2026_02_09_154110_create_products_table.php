<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     *     product_id      SERIAL PRIMARY KEY,
     *    brand_id        INT REFERENCES brands(brand_id) ON DELETE SET NULL,
     *    name            VARCHAR(300) NOT NULL,
     *    slug            VARCHAR(320) UNIQUE NOT NULL,
     *    sku             VARCHAR(100) UNIQUE NOT NULL,
     *    description     TEXT,
     *    short_description VARCHAR(500),
     *    base_price      DECIMAL(12,2) NOT NULL CHECK (base_price >= 0),
     *    sale_price      DECIMAL(12,2) CHECK (sale_price >= 0),
     *    cost_price      DECIMAL(12,2) CHECK (cost_price >= 0),
     *    currency        VARCHAR(3) DEFAULT 'USD',
     *    is_active       BOOLEAN DEFAULT TRUE,
     *    is_featured     BOOLEAN DEFAULT FALSE,
     *    is_digital      BOOLEAN DEFAULT FALSE,
     *    weight          DECIMAL(10,3),          -- in kg
     *    length          DECIMAL(10,2),          -- in cm
     *    width           DECIMAL(10,2),
     *    height          DECIMAL(10,2),
     *    meta_title      VARCHAR(300),
     *    meta_description VARCHAR(500),
     *    avg_rating      DECIMAL(3,2) DEFAULT 0,
     *    total_reviews   INT DEFAULT 0,
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('brand_id')->nullable()->constrained('brands')->nullOnDelete();
            $table->string('name', 300);
            $table->string('slug', 320)->unique();
            $table->string('sku', 100)->unique();
            $table->text('description')->nullable();
            $table->string('short_description', 500)->nullable();
            $table->decimal('base_price', 12, 2)->nullable();
            $table->decimal('sale_price', 12, 2)->nullable();
            $table->decimal('cost_price', 12, 2)->nullable();
            $table->string('currency', 3)->default('USD');
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_digital')->default(false);
            $table->decimal('weight', 10, 3)->nullable();
            $table->decimal('length', 10, 2)->nullable();
            $table->decimal('width', 10, 2)->nullable();
            $table->decimal('height', 10, 2)->nullable();
            $table->string('meta_title', 300)->nullable();
            $table->string('meta_description', 500)->nullable();
            $table->decimal('avg_rating', 3, 2)->default(0);
            $table->integer('total_reviews')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
