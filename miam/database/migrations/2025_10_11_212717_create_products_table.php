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
        Schema::create('produits', function (Blueprint $table) {
            $table->id();
            $table->string('nom'); // ← Corriger le nom de colonne
            $table->text('description')->nullable();
            $table->decimal('prix', 8, 2);
            $table->unsignedBigInteger('menu_id')->nullable(); // ← Corriger le nom
            $table->unsignedBigInteger('categorie_id')->nullable(); // ← Corriger le nom
            $table->boolean('disponible')->default(true);
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produits');
    }
};
