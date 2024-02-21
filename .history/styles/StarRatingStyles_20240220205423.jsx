import styled from 'styled-components';
import star from '../assets/star.svg';

const StarRatingDiv = styled.div`
  .starWrapper {
    filter: drop-shadow(0px 0px 1px gray);
    justify-content: center;
    text-align: center;
  }

  .star,
  .activeStar {
    cursor: pointer;
    float: left;
    height: 100px;
    width: 100px;
    background: url(${star});
    background-repeat: no-repeat;
    background-size: 100%;
    filter: invert(100%) sepia(3%) saturate(123%) hue-rotate(60deg)
      brightness(115%) contrast(84%);
  }

  .activeStar {
    filter: invert(80%) sepia(59%) saturate(2087%) hue-rotate(352deg)
      brightness(107%) contrast(109%);
  }

  input[type="radio"] {
    display: none;
  }
`;
export default StarRatingDiv;
