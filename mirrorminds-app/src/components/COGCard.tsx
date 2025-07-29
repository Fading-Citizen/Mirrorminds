import styled from 'styled-components';

interface COGCardProps {
  id: number;
  title: string;
  description: string;
  manifestation: string;
}

const COGCard = ({ title, description, manifestation }: COGCardProps) => {
  return (
    <StyledWrapper>
      <div className="cog-card">
        <div className="cog-content">
          <h3 className="cog-title">{title}</h3>
          <p className="cog-description">{description}</p>
          <div className="cog-manifestation">
            <span className="manifestation-label">Manifestation:</span>
            <span className="manifestation-text">{manifestation}</span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* CARD CONTAINER - Optimized for hexagonal layout */
  .cog-card {
    position: relative;
    width: 100%;
    max-width: 250px; /* HEXAGON: Smaller cards for hexagon formation */
    min-height: 180px; /* HEXAGON: Compact height for hexagon layout */
    background-color: #0a0a0a;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px; /* HEXAGON: Compact padding */
    gap: 8px; /* HEXAGON: Tight spacing */
    border-radius: 16px;
    cursor: pointer;
    color: white;
    transition: all 0.3s ease;
  }

  .cog-card::before {
    content: '';
    position: absolute;
    inset: 0;
    left: -2px;
    top: -2px;
    margin: auto;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    border-radius: 18px;
    background: linear-gradient(-45deg, #00d4ff 0%, #9333ea 50%, #4f46e5 100%);
    z-index: -10;
    pointer-events: none;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .cog-card::after {
    content: "";
    z-index: -1;
    position: absolute;
    inset: 0;
    background: linear-gradient(-45deg, #00d4ff 0%, #9333ea 50%, #4f46e5 100%);
    transform: translate3d(0, 0, 0) scale(0.95);
    filter: blur(20px);
    border-radius: 16px;
  }

  /* CONTENT CONTAINER - Adjust spacing between title, description, and manifestation */
  .cog-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px; /* REDUCE: Lower this to reduce space between title and description */
    padding-top: 12px; /* REDUCE: Lower this to reduce space from top */
  }

  /* TITLE STYLING - Adjust title size and spacing */
  .cog-title {
    font-size: 1.2rem; /* ADJUST: Change this to modify title size */
    text-transform: capitalize;
    font-weight: 700;
    margin: 0 0 4px 0; /* REDUCE: Small bottom margin to reduce space below title */
    color: #ffffff;
    line-height: 1.1; /* REDUCE: Tighter line height */
  }

  /* DESCRIPTION STYLING - Adjust description size and spacing */
  .cog-description {
    font-size: 0.85rem; /* ADJUST: Change this to modify description text size */
    color: #a1a1aa;
    margin: 0 0 8px 0; /* REDUCE: Small bottom margin to control space before manifestation */
    font-style: italic;
    line-height: 1.2; /* REDUCE: Tighter line height */
  }

  /* MANIFESTATION BOX - Adjust the bottom section padding and spacing */
  .cog-manifestation {
    background: rgba(26, 26, 26, 0.8);
    padding: 10px; /* REDUCE: Lower this to make manifestation box more compact */
    border-radius: 8px; /* REDUCE: Smaller border radius */
    border: 1px solid #333;
    margin-top: auto; /* KEEP: This pushes manifestation to bottom */
  }

  /* MANIFESTATION LABEL - Adjust label spacing */
  .manifestation-label {
    display: block;
    color: #00d4ff;
    font-weight: 600;
    font-size: 0.75rem; /* REDUCE: Smaller label text */
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px; /* REDUCE: Less space between label and text */
  }

  /* MANIFESTATION TEXT - Adjust manifestation text styling */
  .manifestation-text {
    color: #e5e5e5;
    font-size: 0.8rem; /* ADJUST: Change this to modify manifestation text size */
    line-height: 1.2; /* REDUCE: Tighter line spacing */
  }

  .cog-card:hover::after {
    filter: blur(30px);
    transform: translate3d(0, 0, 0) scale(1.1);
  }

  .cog-card:hover::before {
    transform: rotate(-2deg) scale(1.02);
  }

  .cog-card:hover {
    transform: translateY(-5px);
  }

  /* MOBILE RESPONSIVE - Simplified layout for mobile devices */
  @media (max-width: 768px) {
    .cog-card {
      min-height: 160px;
      padding: 16px;
    }
    
    .cog-title {
      font-size: 1.1rem;
    }
    
    .cog-description {
      font-size: 0.8rem;
    }
    
    .manifestation-text {
      font-size: 0.75rem;
    }
  }
`;

export default COGCard;
