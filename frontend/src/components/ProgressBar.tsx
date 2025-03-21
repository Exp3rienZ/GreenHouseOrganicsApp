// frontend/src/components/ProgressBar.tsx
import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
    percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
    // Sicherstellen, dass der Prozentsatz zwischen 0 und 100 liegt
    const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);

    return (
        <div className="progress-bar-container">
            <div
                className="progress-bar-fill"
                style={{ width: `${normalizedPercentage}%` }}
            />
            <div className="progress-markers">
                <div className="marker" style={{ left: '0%' }}><span>0</span></div>
                <div className="marker" style={{ left: '25%' }}><span>25</span></div>
                <div className="marker" style={{ left: '50%' }}><span>50</span></div>
                <div className="marker" style={{ left: '75%' }}><span>75</span></div>
                <div className="marker" style={{ left: '100%' }}><span>100</span></div>
            </div>
        </div>
    );
};

export default ProgressBar;