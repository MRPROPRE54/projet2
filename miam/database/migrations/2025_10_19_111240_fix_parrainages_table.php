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
        Schema::table('parrainages', function (Blueprint $table) {
            // Supprimer la contrainte de clé étrangère existante
            $table->dropForeign(['id_filleul']);
            
            // Modifier la colonne pour permettre NULL
            $table->unsignedBigInteger('id_filleul')->nullable()->change();
            
            // Recréer la contrainte de clé étrangère avec nullable
            $table->foreign('id_filleul')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('parrainages', function (Blueprint $table) {
            // Supprimer la contrainte de clé étrangère
            $table->dropForeign(['id_filleul']);
            
            // Remettre la colonne en NOT NULL
            $table->unsignedBigInteger('id_filleul')->nullable(false)->change();
            
            // Recréer la contrainte de clé étrangère
            $table->foreign('id_filleul')->references('id')->on('users')->onDelete('cascade');
        });
    }
};