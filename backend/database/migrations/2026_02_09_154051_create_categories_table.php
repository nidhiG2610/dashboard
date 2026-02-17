<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     *    category_id     SERIAL PRIMARY KEY,
     *    parent_id       INT REFERENCES categories(category_id) ON DELETE SET NULL,
     *    name            VARCHAR(150) NOT NULL,
     *    slug            VARCHAR(170) UNIQUE NOT NULL,
     *    description     TEXT,
     *    image_url       VARCHAR(500),
     *    is_active       BOOLEAN DEFAULT TRUE,
     *    sort_order      INT DEFAULT 0,
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('parent_id')->nullable()->constrained('categories')->onDelete('set null');
            $table->string('name', 150);
            $table->string('slug', 170)->unique();
            $table->text('description')->nullable();
            $table->string('image_url', 500)->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
