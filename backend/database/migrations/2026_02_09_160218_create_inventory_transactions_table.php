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
        Schema::create('inventory_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('inventory_id')->constrained('inventory')->onDelete('cascade');
            $table->string('type', 30)->notNullable()->check('type IN (
                        \'purchase\', \'sale\', \'return\', \'adjustment\',
                        \'transfer_in\', \'transfer_out\', \'damaged\', \'reserved\', \'released\'
                    )');
            $table->integer('quantity')->notNullable();               // positive for in, negative for out
            $table->string('reference_type', 50);
            $table->integer('reference_id');
            $table->text('notes')->nullable();
            $table->foreignId('created_by')->constrained('users', 'user_id')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory_transactions');
    }
};
