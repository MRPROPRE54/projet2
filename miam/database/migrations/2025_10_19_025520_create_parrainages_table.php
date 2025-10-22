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
        Schema::create('parrainages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_parrain')->constrained('users')->onDelete('cascade');
            $table->foreignId('id_filleul')->constrained('users')->onDelete('cascade');
            $table->string('code_utilise')->nullable();
            $table->boolean('recompense_attribuee')->default(false);
            $table->integer('points_parrainage')->default(0);
            $table->timestamps();
            
            $table->unique(['id_parrain', 'id_filleul']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parrainages');
    }
};
