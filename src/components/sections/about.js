import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.interest-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--highlight);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 400px;

  @media (max-width: 768px) {
    margin: 50px auto 0 0;
    width: 70%;
  }

  .container_me {
    position: relative;
    border-radius: 50%;
    height: 312px;
    -webkit-tap-highlight-color: transparent;
    transform: scale(0.65);
    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
    width: 400px;
    top:4.3rem;
  }

  // .container:after {
  //   background-color: #f2f2f2;
  //   content: "";
  //   height: 10px;
  //   position: absolute;
  //   top: 390px;
  //   width: 100%;
  // }

  .container_me:hover {
    transform: scale(0.85);
  }

  .container-inner_me {
    clip-path: path(
      "M 390,400 C 390,504.9341 304.9341,590 200,590 95.065898,590 10,504.9341 10,400 V 10 H 200 390 Z"
    );
    position: relative;
    transform-origin: 50%;
    top: -200px;
  }

  .circle_me {
    // background-color: #fee7d3;
    border-radius: 50%;
    cursor: pointer;
    height: 380px;
    width: 380px;
    left: 10px;
    pointer-events: none;
    position: absolute;
    top: 210px;
  }
  
  .img_me {
    pointer-events: none;
    position: relative;
    transform: translateY(20px) scale(0.9);
    transform-origin: 50% bottom;
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .container_me:hover .img_me {
    transform: translateY(0) scale(1.1);
  }

  .img1_me {
    left: 8px;
    top: 164px;
    width: 380px;
  }



  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    

    &:hover,
    &:focus {
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--highlight);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const interests = ['AdS/CFT Correspondence', 'Gravitational Wave', 'Elliptic Curve', 'Cryptography',
                  'Adversarial Generative Networks', 'Earlier History of Civilizations'];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
            Meet Shakir Ahmed aka ravenwit, a passionate physics student driven by a boundless sense of wonder 
            and curiosity about the world, from music and movies to category theory and holographic principle. 
            I am a versatile and enthusiastic learner, always eager to explore new topics and expand my horizons, 
            which motivates me to challenge presumptions and approach problems from several perspectives.
            </p>
            
            <p>
            I have been coding since I was 13 years old, when I discovered that computers could be used for much more than just 
            running pre-existing programs. My cyber expedition has started out just for fun to develop custom softwares for personal use with 
            Microsoft Visual Basic 6.0 and further extended to networking, Linux server administration, web development and 
            penetration testing.
            </p>

            <p>
            {/* Shakir has a demonstrated history of building simulations for research purposes in the fields of 
            electromagnetism and quantum mechanics.  */}
            I am currently establishing expertise in data science and neural networks 
            to complement my love of programming and passion for physics and mathematics.

            </p>

            <p>Here are a few things that I find very fascinating-</p>
          </div>

          <ul className="interest-list">
            {interests && interests.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div class="container_me">
            <div class="container-inner_me">
              {/* <img src="../../images/background3.jpg" class="circle_me" /> */}
            <StaticImage
              className="circle_me"
              src="../../images/LW008.jpg"
              width={640}
              height={640}
              quality={95}
              alt="Background"
            />
            <StaticImage
              className="img_me img1_me"
              src="../../images/me.png"
              alt="Headshot"
            />
            </div>
          </div>

          {/* <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.png"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div> */}
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
