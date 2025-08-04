import styled from 'styled-components';
import mirrormindsLogo from '../assets/mirrorminds-logo.png';

const HeaderLogo = () => {
  return (
    <StyledWrapper>
      <div className="header-logo">
        <img src={mirrormindsLogo} alt="MirrorMinds Logo" className="logo-image" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .header-logo {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .logo-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 2px 4px rgba(0, 212, 255, 0.3));
    transition: all 0.3s ease;
  }

  .logo-image:hover {
    filter: drop-shadow(0 2px 8px rgba(147, 51, 234, 0.5));
    transform: scale(1.05);
  }
`;

export default HeaderLogo;
