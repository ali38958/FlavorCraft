import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="recipe-card" style={{ pointerEvents: 'none' }}>
      <div className="skeleton" style={{ aspectRatio: '16/10', width: '100%', borderRadius: '18px 18px 0 0' }}></div>
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="skeleton" style={{ width: '30%', height: '18px' }}></div>
          <div className="skeleton" style={{ width: '20%', height: '18px' }}></div>
        </div>
        <div className="skeleton" style={{ width: '85%', height: '26px' }}></div>
        <div className="skeleton" style={{ width: '100%', height: '16px' }}></div>
        <div className="skeleton" style={{ width: '60%', height: '16px' }}></div>
      </div>
    </div>
  );
}
