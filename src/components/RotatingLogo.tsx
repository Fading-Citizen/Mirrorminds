import React from 'react';
import styled from 'styled-components';
import mirrormindsLogo from '../assets/mirrorminds-logo.png';

const RotatingLogo = () => {
  return (
    <StyledWrapper>
      <div className="wrapper">
        <div className="inner" style={{'--quantity': 7} as React.CSSProperties}>
          <div className="card" style={{'--index': 0, '--colorCard': '0, 212, 255'} as React.CSSProperties}>
            <div className="img" />
          </div>
          <div className="card" style={{'--index': 1, '--colorCard': '147, 51, 234'} as React.CSSProperties}>
            <div className="img" />
          </div>
          <div className="card" style={{'--index': 2, '--colorCard': '79, 70, 229'} as React.CSSProperties}>
            <div className="img" />
          </div>
          <div className="card" style={{'--index': 3, '--colorCard': '16, 185, 129'} as React.CSSProperties}>
            <div className="img" />
          </div>
          <div className="card" style={{'--index': 4, '--colorCard': '139, 92, 246'} as React.CSSProperties}>
            <div className="img" />
          </div>
          <div className="card" style={{'--index': 5, '--colorCard': '6, 182, 212'} as React.CSSProperties}>
            <div className="img" />
          </div>
          <div className="card" style={{'--index': 6, '--colorCard': '168, 85, 247'} as React.CSSProperties}>
            <div className="img" />
          </div>
        </div>
        {/* Logo in the center */}
        <div className="center-logo">
          <img src={mirrormindsLogo} alt="MirrorMinds Logo" className="logo-image" />
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .wrapper {
    width: 100px;
    height: 100px;
    position: center;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
    margin: 1rem auto;
  }

  .inner {
    --w: 50px;
    --h: 80px;
    --translateZ: 100px;
    --rotateX: -13deg;
    --perspective: 1000px;
    position: absolute;
    width: var(--w);
    height: var(--h);
    z-index: 2;
    transform-style: preserve-3d;
    transform: perspective(var(--perspective));
    animation: rotating 15s linear infinite;
  }

  @keyframes rotating {
    from {
      transform: perspective(var(--perspective)) rotateX(var(--rotateX))
        rotateY(0);
    }
    to {
      transform: perspective(var(--perspective)) rotateX(var(--rotateX))
        rotateY(1turn);
    }
  }

  .card {
    position: absolute;
    border: 2px solid rgba(var(--colorCard), 0.9);
    border-radius: 12px;
    overflow: hidden;
    inset: 0;
    transform: rotateY(calc((360deg / var(--quantity)) * var(--index)))
      translateZ(var(--translateZ));
    box-shadow: 
      0 4px 15px rgba(var(--colorCard), 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(2px);
  }

  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: radial-gradient(
      circle,
      rgba(var(--colorCard), 0.15) 0%,
      rgba(var(--colorCard), 0.35) 60%,
      rgba(var(--colorCard), 0.6) 100%
    );
    position: relative;
  }

  .img::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(var(--colorCard), 0.2) 50%,
      transparent 70%
    );
    animation: shimmer 3s ease-in-out infinite;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }

  /* Center logo styling */
  .center-logo {
    position: absolute;
    z-index: 10;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 70%, transparent 100%);
    border-radius: 50%;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .logo-image {
    width: 60px;
    height: 60px;
    object-fit: contain;
    filter: drop-shadow(0 2px 6px rgba(0, 212, 255, 0.3));
    animation: logoGlow 3s ease-in-out infinite alternate;
  }

  @keyframes logoGlow {
    0% {
      filter: drop-shadow(0 4px 12px rgba(0, 212, 255, 0.3));
    }
    100% {
      filter: drop-shadow(0 4px 20px rgba(147, 51, 234, 0.5));
    }
  }

  /* Responsive adjustments - Enhanced for better mobile experience */
  
  /* Large Tablets */
  @media (min-width: 769px) and (max-width: 1024px) {
    .wrapper {
      width: 180px;
      height: 180px;
    }
    
    .inner {
      --w: 70px;
      --h: 105px;
    }
    
    .center-logo {
      width: 90px;
      height: 90px;
    }
    
    .logo-image {
      width: 70px;
      height: 70px;
    }
  }
  
  /* Tablets Portrait */
  @media (min-width: 481px) and (max-width: 768px) {
    .wrapper {
      width: 160px;
      height: 160px;
    }
    
    .inner {
      --w: 65px;
      --h: 95px;
    }
    
    .center-logo {
      width: 80px;
      height: 80px;
    }
    
    .logo-image {
      width: 60px;
      height: 60px;
    }
  }

  /* Mobile Large */
  @media (max-width: 480px) {
    .wrapper {
      width: 140px;
      height: 140px;
    }
    
    .inner {
      --w: 55px;
      --h: 80px;
      --translateZ: calc((var(--w) + var(--h)) - 10px);
    }
    
    .center-logo {
      width: 65px;
      height: 65px;
    }
    
    .logo-image {
      width: 50px;
      height: 50px;
    }
    
    .card {
      border-width: 1.5px;
    }
  }
  
  /* Mobile Small */
  @media (max-width: 360px) {
    .wrapper {
      width: 120px;
      height: 120px;
    }
    
    .inner {
      --w: 50px;
      --h: 70px;
      --translateZ: calc((var(--w) + var(--h)) - 15px);
    }
    
    .center-logo {
      width: 55px;
      height: 55px;
    }
    
    .logo-image {
      width: 42px;
      height: 42px;
    }
    
    .card {
      border-width: 1px;
      border-radius: 8px;
    }
  }
`;

export default RotatingLogo;
