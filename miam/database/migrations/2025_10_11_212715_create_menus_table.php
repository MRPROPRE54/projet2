<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('menu', function (Blueprint $table) {
            $table->id('id_menu');
            $table->string('nom_plat'); // ← Corriger le nom de colonne
            $table->text('description')->nullable();
            $table->decimal('prix', 8, 2);
            $table->string('categorie'); // ← Changer de enum à string pour plus de flexibilité
            $table->string('image')->nullable();
            $table->unsignedBigInteger('id_gerant')->nullable();
            $table->boolean('disponible')->default(true); // ← Ajouter colonne disponibilité
            $table->timestamp('date_ajout')->useCurrent(); // ← Ajouter date d'ajout

            $table->foreign('id_gerant')
                ->references('id')
                ->on('users')
                ->onDelete('set null'); // ← Changer cascade en set null

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('menu');
    }
};
