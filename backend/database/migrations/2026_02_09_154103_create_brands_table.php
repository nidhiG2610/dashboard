<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *    brand_id        SERIAL PRIMARY KEY,
     *    name            VARCHAR(150) NOT NULL,
     *    slug            VARCHAR(170) UNIQUE NOT NULL,
     *    logo_url        VARCHAR(500),
     *    description     TEXT,
     *    is_active       BOOLEAN DEFAULT TRUE,
     *    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     */
    public function up(): void
    {
        Schema::create('brands', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->string('slug', 170)->unique();
            $table->string('logo_url', 500)->nullable();
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('brands');
    }
};
