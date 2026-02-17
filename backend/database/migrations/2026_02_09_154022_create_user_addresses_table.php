<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * address_id      SERIAL PRIMARY KEY,
     * user_id         INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
     * address_type    VARCHAR(20) DEFAULT 'shipping' CHECK (address_type IN ('shipping', 'billing')),
     * full_name       VARCHAR(200) NOT NULL,
     * address_line1   VARCHAR(255) NOT NULL,
     * address_line2   VARCHAR(255),
     * city            VARCHAR(100) NOT NULL,
     * state           VARCHAR(100),
     * postal_code     VARCHAR(20) NOT NULL,
     * country         VARCHAR(100) NOT NULL,
     * is_default      BOOLEAN DEFAULT FALSE,
     * created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     */
    public function up(): void
    {
        Schema::create('user_addresses', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('address_type', 20)->default('shipping')->check("address_type IN ('shipping', 'billing')");
            $table->string('full_name', 200);
            $table->string('address_line1', 255);
            $table->string('address_line2', 255)->nullable();
            $table->string('city', 100);
            $table->string('state', 100)->nullable();
            $table->string('postal_code', 20);
            $table->string('country', 100);
            $table->boolean('is_default')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_addresses');
    }
};
