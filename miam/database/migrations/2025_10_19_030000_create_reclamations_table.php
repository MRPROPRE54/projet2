<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reclamations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('commande_id')->nullable()->constrained()->onDelete('set null');
            $table->string('sujet');
            $table->text('description');
            $table->enum('statut', ['ouverte', 'en_cours', 'resolue', 'fermee'])->default('ouverte');
            $table->text('reponse')->nullable();
            $table->foreignId('traite_par')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('date_traitement')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reclamations');
    }
};

