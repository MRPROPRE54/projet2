import React, { useState, useRef } from 'react';
import { X, RotateCw, Award, Trophy } from 'lucide-react';

const SpinWheelGame = ({ currentUser, onClose, onWinPoints }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef(null);

  // Coût pour jouer
  const PLAY_COST = 5;

  // Configuration des segments de la roue avec le thème du site
  const segments = [
    { label: '15 pts', value: 15, color: '#FFD700', probability: 0.1 },
    { label: 'Échec', value: 0, color: '#dc3545', probability: 0.25 },
    { label: '1 pt', value: 1, color: '#cfbd97', probability: 0.25 },
    { label: 'Nouvel essai', value: 'retry', color: '#17a2b8', probability: 0.15 },
    { label: '5 pts', value: 5, color: '#28a745', probability: 0.15 },
    { label: 'Échec', value: 0, color: '#dc3545', probability: 0.1 }
  ];

  const spinWheel = () => {
    if (isSpinning || currentUser.loyaltyPoints < PLAY_COST) return;

    setIsSpinning(true);
    setResult(null);

    // Sélectionner un segment basé sur les probabilités
    const random = Math.random();
    let cumulative = 0;
    let selectedSegment = segments[0];

    for (const segment of segments) {
      cumulative += segment.probability;
      if (random <= cumulative) {
        selectedSegment = segment;
        break;
      }
    }

    // Calculer la rotation (plusieurs tours + angle du segment)
    const segmentAngle = 360 / segments.length;
    const segmentIndex = segments.findIndex(s => s === selectedSegment);
    const targetAngle = segmentIndex * segmentAngle;
    const spins = 5; // Nombre de tours complets
    const finalRotation = rotation + (360 * spins) + (360 - targetAngle);

    setRotation(finalRotation);

    // Afficher le résultat après l'animation
    setTimeout(() => {
      setIsSpinning(false);
      setResult(selectedSegment);
      
      // Gérer les gains
      if (selectedSegment.value === 'retry') {
        // Pas de déduction de points pour un nouvel essai
      } else if (selectedSegment.value > 0) {
        onWinPoints(selectedSegment.value - PLAY_COST);
      } else {
        onWinPoints(-PLAY_COST);
      }
    }, 4000);
  };

  const hasEnoughPoints = currentUser.loyaltyPoints >= PLAY_COST;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center fade-in" style={{ backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999 }}>
      <div className="bg-white rounded-4 shadow-lg p-4 position-relative" style={{ maxWidth: '600px', width: '90%', maxHeight: '95vh', overflowY: 'auto' }}>
        <button 
          className="btn btn-sm btn-outline-secondary position-absolute top-0 end-0 m-3"
          onClick={onClose}
          style={{ zIndex: 1 }}
        >
          <X size={24} />
        </button>

        <div className="text-center mb-4">
          <h3 className="mb-2" style={{ color: 'var(--primary)' }}>🎰 Roue de la Chance</h3>
          <p className="text-muted mb-0">
            Coût: <strong style={{ color: 'var(--primary)' }}>{PLAY_COST} points</strong> | 
            Vos points: <strong style={{ color: 'var(--primary)' }}>{currentUser.loyaltyPoints}</strong>
          </p>
        </div>

        {/* La roue */}
        <div className="position-relative d-flex justify-content-center mb-4">
          {/* Indicateur */}
          <div 
            className="position-absolute"
            style={{ 
              top: '-10px', 
              left: '50%', 
              transform: 'translateX(-50%)',
              zIndex: 2,
              width: 0,
              height: 0,
              borderLeft: '15px solid transparent',
              borderRight: '15px solid transparent',
              borderTop: '25px solid var(--primary)'
            }}
          />

          {/* Roue */}
          <div 
            ref={wheelRef}
            className="rounded-circle position-relative overflow-hidden"
            style={{
              width: '350px',
              height: '350px',
              border: '8px solid var(--primary)',
              boxShadow: '0 10px 30px rgba(207, 189, 151, 0.3)',
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'
            }}
          >
            {segments.map((segment, index) => {
              const segmentAngle = 360 / segments.length;
              const startAngle = index * segmentAngle;
              
              return (
                <div
                  key={index}
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                  style={{
                    background: `conic-gradient(from ${startAngle}deg, ${segment.color} 0deg, ${segment.color} ${segmentAngle}deg, transparent ${segmentAngle}deg)`,
                    clipPath: `polygon(50% 50%, 
                      ${50 + 50 * Math.cos((startAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((startAngle - 90) * Math.PI / 180)}%, 
                      ${50 + 50 * Math.cos((startAngle + segmentAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((startAngle + segmentAngle - 90) * Math.PI / 180)}%)`
                  }}
                >
                  <div 
                    className="position-absolute fw-bold text-white"
                    style={{
                      transform: `rotate(${startAngle + segmentAngle / 2}deg) translateY(-120px)`,
                      fontSize: '14px',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                    }}
                  >
                    {segment.label}
                  </div>
                </div>
              );
            })}

            {/* Centre de la roue */}
            <div 
              className="position-absolute top-50 start-50 translate-middle rounded-circle bg-white d-flex align-items-center justify-content-center shadow"
              style={{ width: '60px', height: '60px', border: '4px solid var(--primary)' }}
            >
              <RotateCw size={24} style={{ color: 'var(--primary)' }} />
            </div>
          </div>
        </div>

        {/* Bouton tourner */}
        <div className="text-center">
          <button 
            className="btn btn-primary btn-lg px-5"
            onClick={spinWheel}
            disabled={isSpinning || !hasEnoughPoints}
          >
            {isSpinning ? (
              <>
                <div className="spinner-border spinner-border-sm me-2" />
                La roue tourne...
              </>
            ) : (
              <>
                <RotateCw size={20} className="me-2" />
                Tourner la roue
              </>
            )}
          </button>
          
          {!hasEnoughPoints && (
            <p className="text-danger mt-2 mb-0">
              <small>Vous n'avez pas assez de points pour jouer</small>
            </p>
          )}
        </div>

        {/* Résultat */}
        {result && !isSpinning && (
          <div className="mt-4 p-4 rounded-3 text-center" style={{ 
            backgroundColor: result.value === 0 ? 'rgba(220, 53, 69, 0.1)' : 'rgba(40, 167, 69, 0.1)',
            border: `2px solid ${result.value === 0 ? 'var(--danger)' : 'var(--primary)'}`
          }}>
            {result.value === 'retry' ? (
              <>
                <Trophy size={48} className="mb-2" style={{ color: 'var(--info)' }} />
                <h4 className="mb-2" style={{ color: 'var(--primary)' }}>🎉 Nouvel essai !</h4>
                <p className="mb-0">Vous pouvez rejouer gratuitement !</p>
              </>
            ) : result.value > 0 ? (
              <>
                <Award size={48} className="mb-2" style={{ color: 'var(--primary)' }} />
                <h4 className="mb-2" style={{ color: 'var(--primary)' }}>🎉 Félicitations !</h4>
                <p className="mb-0">Vous avez gagné <strong style={{ color: 'var(--primary)' }}>{result.value} points</strong> !</p>
                <small className="text-muted">(Coût déduit: +{result.value - PLAY_COST} points nets)</small>
              </>
            ) : (
              <>
                <h4 className="mb-2" style={{ color: 'var(--danger)' }}>😔 Dommage !</h4>
                <p className="mb-0">Vous n'avez rien gagné cette fois</p>
                <small className="text-muted">(-{PLAY_COST} points)</small>
              </>
            )}
          </div>
        )}

        {/* Règles */}
        <div className="mt-4 p-3 rounded" style={{ backgroundColor: 'var(--surface)' }}>
          <h6 className="mb-2" style={{ color: 'var(--primary)' }}>📋 Règles du jeu</h6>
          <ul className="small mb-0 ps-3 text-muted">
            <li>Coût par partie : {PLAY_COST} points</li>
            <li>Gains possibles : 1, 5 ou 15 points</li>
            <li>Vous pouvez aussi obtenir un nouvel essai gratuit</li>
            <li>Les points gagnés sont ajoutés après déduction du coût</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SpinWheelGame;