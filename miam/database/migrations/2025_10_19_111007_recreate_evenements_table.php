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
        // Supprimer l'ancienne table
        Schema::dropIfExists('evenements');
        
        // Créer la nouvelle table avec tous les champs
        Schema::create('evenements', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->text('description')->nullable();
            $table->date('date_debut');
            $table->date('date_fin');
            $table->time('heure_debut')->nullable();
            $table->time('heure_fin')->nullable();
            $table->string('lieu')->nullable();
            $table->decimal('prix', 8, 2)->nullable();
            $table->integer('places_limitees')->nullable();
            $table->integer('places_reservees')->default(0);
            $table->boolean('actif')->default(true);
            $table->string('image')->nullable();
            $table->json('details_supplementaires')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evenements');
    }
};