<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('commandes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('montant_total', 10, 2)->default(0);
            $table->enum('statut', ['en_attente', 'confirmee', 'en_preparation', 'prete', 'livree', 'annulee'])->default('en_attente');
            $table->enum('type', ['sur_place', 'livraison'])->default('sur_place');
            $table->text('commentaire')->nullable();
            $table->string('adresse_livraison')->nullable();
            $table->timestamp('heure_souhaitee')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};