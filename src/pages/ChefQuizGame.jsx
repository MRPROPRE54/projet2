import React, { useState } from 'react';
import { X, ChefHat, Award, RotateCw } from 'lucide-react';

const ChefQuizGame = ({ currentUser, onClose, onWinPoints }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);

  // Coût pour jouer
  const PLAY_COST = 10;

  // Questions du quiz
  const questions = [
    {
      question: "Quelle est l'origine du plat 'Ndolé' ?",
      answers: ["Bamenda", "Duala", "Bandjoun", "Yaounde"],
      correct: 1
    },
    {
      question: "Quel ingrédient principal compose l'Eru ?",
      answers: ["Feuilles de manioc", "Feuilles d'eru", "Épinards", "Chou vert"],
      correct: 1
    },
    {
      question: "Le 'Koki' est fait à base de :",
      answers: ["Maïs", "Haricots blancs", "Haricots cornilles", "Macabo"],
      correct: 2
    },
    {
      question: "Quel est accompagnement typique du Ndolé ?",
      answers: ["Riz", "Miondo", "Couscous", "Plantain"],
      correct: 1
    },
    {
      question: "Le 'Kontchap' est une combinaison de :",
      answers: ["Maïs et haricots", "Riz et poisson", "Manioc et arachides", "Plantain et viande"],
      correct: 0
    },
    {
      question: "Quel est l'obstacle le plus populaire dans le eru ?",
      answers: ["Poison fumée", "Poulet", "Peau de boeuf", "Porc"],
      correct: 2
    },
    {
      question: "Le 'Poulet DG' signifie :",
      answers: ["Poulet Délicieux Grillé", "Poulet Directeur Général", "Poulet Double Garniture", "Poulet de Garde"],
      correct: 1
    },
    {
      question: "Quelle est la base de la sauce jaune ?",
      answers: ["Huile de Palme", "Huile de tournesol", "Huile d'arachide", "Huile d'olive"],
      correct: 0
    },
    {
      question: "Quelle boisson est souvent préparée à partir de vin de palme fermenté ?",
      answers: ["Matango", "Bil-Bil", "Nkam-ngong", "Sodabi"],
      correct: 0
    },
    {
      question: "Combien de temps faut-il généralement pour préparer un bon Ndolé ?",
      answers: ["1 heure", "8 heures", "2-3 heures", "5 heures"],
      correct: 2
    }
  ];

  const handleAnswer = (answerIndex) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setGameFinished(true);
        calculateReward();
      }
    }, 1500);
  };

  const calculateReward = () => {
    const finalScore = selectedAnswer === questions[currentQuestion].correct ? score + 1 : score;
    const percentage = (finalScore / questions.length) * 100;
    
    let points = 0;
    if (percentage >= 90) points = 20;
    else if (percentage >= 70) points = 15;
    else if (percentage >= 50) points = 10;
    else if (percentage >= 30) points = 5;
    
    // Déduire le coût et ajouter les points gagnés
    const netPoints = points - PLAY_COST;
    onWinPoints(netPoints);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setGameFinished(false);
  };

  const getRewardByScore = (finalScore) => {
    const percentage = (finalScore / questions.length) * 100;
    if (percentage >= 90) return 20;
    if (percentage >= 70) return 15;
    if (percentage >= 50) return 10;
    if (percentage >= 30) return 5;
    return 0;
  };

  const hasEnoughPoints = currentUser.loyaltyPoints >= PLAY_COST;

  if (!hasEnoughPoints) {
    return (
      <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center fade-in" style={{ backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999 }}>
        <div className="bg-white rounded-4 shadow-lg p-4 text-center position-relative" style={{ maxWidth: '500px', width: '90%' }}>
          <button 
            className="btn btn-sm btn-outline-secondary position-absolute top-0 end-0 m-3"
            onClick={onClose}
          >
            <X size={24} />
          </button>
          
          <ChefHat size={64} className="mb-3" style={{ color: 'var(--primary)' }} />
          <h3 className="mb-3" style={{ color: 'var(--primary)' }}>Points insuffisants</h3>
          <p className="text-muted mb-4">
            Vous avez besoin de <strong style={{ color: 'var(--primary)' }}>{PLAY_COST} points</strong> pour jouer au Quiz du Chef.
            <br />
            Vos points actuels: <strong style={{ color: 'var(--primary)' }}>{currentUser.loyaltyPoints}</strong>
          </p>
          <button className="btn btn-secondary" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    );
  }

  if (gameFinished) {
    const finalScore = score;
    const percentage = (finalScore / questions.length) * 100;
    const reward = getRewardByScore(finalScore);
    const netReward = reward - PLAY_COST;

    return (
      <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center fade-in" style={{ backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999 }}>
        <div className="bg-white rounded-4 shadow-lg p-5 text-center position-relative" style={{ maxWidth: '500px', width: '90%', maxHeight: '95vh', overflowY: 'auto' }}>
          <button 
            className="btn btn-sm btn-outline-secondary position-absolute top-0 end-0 m-3"
            onClick={onClose}
          >
            <X size={24} />
          </button>

          <Award size={80} className="mb-3" style={{ color: percentage >= 50 ? 'var(--primary)' : 'var(--text-secondary)' }} />
          
          <h2 className="mb-3" style={{ color: 'var(--primary)' }}>
            {percentage >= 90 ? '🏆 Excellent !' : 
             percentage >= 70 ? '🎉 Très bien !' :
             percentage >= 50 ? '👍 Bien joué !' :
             percentage >= 30 ? '💪 Pas mal !' :
             '😔 Continuez à essayer !'}
          </h2>

          <div className="mb-4">
            <h3 className="display-4 mb-2" style={{ color: 'var(--primary)' }}>
              {finalScore}/{questions.length}
            </h3>
            <p className="text-muted">Score: {percentage.toFixed(0)}%</p>
          </div>

          <div className="p-4 rounded-3 mb-4" style={{ 
            backgroundColor: reward > 0 ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)',
            border: `2px solid ${reward > 0 ? 'var(--primary)' : 'var(--danger)'}`
          }}>
            {reward > 0 ? (
              <>
                <h4 className="mb-2" style={{ color: 'var(--primary)' }}>🎁 Récompense</h4>
                <p className="mb-1">Vous avez gagné <strong style={{ color: 'var(--primary)' }}>{reward} points</strong> !</p>
                <small className="text-muted">
                  (Coût déduit: {netReward >= 0 ? '+' : ''}{netReward} points nets)
                </small>
              </>
            ) : (
              <>
                <h4 className="mb-2" style={{ color: 'var(--danger)' }}>Aucune récompense</h4>
                <p className="mb-0">Score minimum requis: 30%</p>
                <small className="text-muted">(-{PLAY_COST} points)</small>
              </>
            )}
          </div>

          <div className="d-flex gap-2 justify-content-center flex-wrap">
            <button className="btn btn-outline-primary" onClick={resetGame}>
              <RotateCw size={18} className="me-2" />
              Rejouer ({PLAY_COST} pts)
            </button>
            <button className="btn btn-primary" onClick={onClose}>
              Terminer
            </button>
          </div>

          <div className="mt-4 p-3 rounded" style={{ backgroundColor: 'var(--surface)' }}>
            <h6 className="mb-2" style={{ color: 'var(--primary)' }}>🏅 Barème des récompenses</h6>
            <div className="small text-muted">
              <div className="d-flex justify-content-between mb-1">
                <span>90-100%:</span>
                <strong style={{ color: 'var(--primary)' }}>20 points</strong>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span>70-89%:</span>
                <strong style={{ color: 'var(--primary)' }}>15 points</strong>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span>50-69%:</span>
                <strong style={{ color: 'var(--primary)' }}>10 points</strong>
              </div>
              <div className="d-flex justify-content-between">
                <span>30-49%:</span>
                <strong style={{ color: 'var(--primary)' }}>5 points</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center fade-in" style={{ backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999 }}>
      <div className="bg-white rounded-4 shadow-lg p-4 position-relative" style={{ maxWidth: '600px', width: '90%', maxHeight: '95vh', overflowY: 'auto' }}>
        <button 
          className="btn btn-sm btn-outline-secondary position-absolute top-0 end-0 m-3"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            <h3 className="mb-0 d-flex align-items-center">
              <ChefHat size={28} className="me-2" style={{ color: 'var(--primary)' }} />
              Quiz du Chef
            </h3>
            <span className="badge badge-gold mt-2 mt-md-0" style={{ fontSize: '0.9rem' }}>
              Score: {score}/{questions.length}
            </span>
          </div>
          
          <div className="progress mb-2" style={{ height: '8px' }}>
            <div 
              className="progress-bar"
              style={{ 
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                backgroundColor: 'var(--primary)'
              }}
            />
          </div>
          <small className="text-muted">
            Question {currentQuestion + 1} sur {questions.length}
          </small>
        </div>

        <div className="mb-4">
          <h5 className="mb-4" style={{ color: 'var(--text-primary)' }}>
            {questions[currentQuestion].question}
          </h5>
          
          <div className="d-grid gap-3">
            {questions[currentQuestion].answers.map((answer, index) => {
              const isCorrect = index === questions[currentQuestion].correct;
              const isSelected = selectedAnswer === index;
              
              let buttonStyle = {
                border: '2px solid #dee2e6',
                backgroundColor: 'white',
                color: 'var(--text-primary)',
                transition: 'all 0.3s'
              };
              
              if (selectedAnswer !== null) {
                if (isSelected && isCorrect) {
                  buttonStyle = {
                    border: '2px solid var(--primary)',
                    backgroundColor: 'rgba(207, 189, 151, 0.2)',
                    color: 'var(--primary)'
                  };
                } else if (isSelected && !isCorrect) {
                  buttonStyle = {
                    border: '2px solid var(--danger)',
                    backgroundColor: 'rgba(220, 53, 69, 0.1)',
                    color: 'var(--danger)'
                  };
                } else if (isCorrect) {
                  buttonStyle = {
                    border: '2px solid var(--primary)',
                    backgroundColor: 'rgba(207, 189, 151, 0.2)',
                    color: 'var(--primary)'
                  };
                }
              }
              
              return (
                <button
                  key={index}
                  className="btn text-start p-3"
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  style={buttonStyle}
                >
                  <strong>{String.fromCharCode(65 + index)}.</strong> {answer}
                  {selectedAnswer !== null && isCorrect && (
                    <span className="float-end" style={{ color: 'var(--primary)' }}>✓</span>
                  )}
                  {selectedAnswer === index && !isCorrect && (
                    <span className="float-end" style={{ color: 'var(--danger)' }}>✗</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-3 rounded" style={{ backgroundColor: 'var(--surface)' }}>
          <h6 className="mb-2" style={{ color: 'var(--primary)' }}>🎯 Objectif</h6>
          <p className="small mb-0 text-muted">
            Répondez correctement aux questions pour gagner des points !
            <br />
            <span style={{ color: 'var(--primary)' }}>30% = 5pts | 50% = 10pts | 70% = 15pts | 90% = 20pts</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChefQuizGame;