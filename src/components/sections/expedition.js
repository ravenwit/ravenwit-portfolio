import React, { useState, useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledExpeditionSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;

  @import 'https://fonts.googleapis.com/css?family=Montserrat:400,700|Raleway:300,400';

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

`;

const StyledExpeditionTabPanels = styled.div`

  position: relative;
  background: var(--navy);
  padding: 1.5rem;
  padding-bottom: 1.5rem;
  width: 70%;
  // height: 250px;
  // box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  border-radius: 5px;
  min-width: 240px;


  .st0{stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}

  input[name=tab-control] {
    display: none;
  }

  section{
    padding: 1.7rem 2rem 2rem 1.5rem;
  }

  ul {
    list-style-type: none;
    padding-left: 0;
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
  }

  ul li {
    box-sizing: border-box;
    flex: 1;
    width: 25%;
    padding: 0 10px;
    text-align: center;
  }

  ul li label {
    font-family: var(--font-mono);
    font-weight: bold;
    font-size: 1.2rem;
    color: var(--dark-slate);
    transition: all 0.3s ease-in-out;
    padding: 5px auto;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    white-space: nowrap;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  ul li label span {
    display: block;
    font-size: var(--fz-xs);
  }

  ul li label br {
    display: none;
  }

  ul li label svg {
    // min-width: 15px;
    // min-height: 15px;
    fill: var(--dark-slate);
    height: 1.2em;
    vertical-align: bottom;
    margin-right: 0.2em;
    transition: all 0.2s ease-in-out;
  }

  ul li label:hover, ul li label:focus, ul li label:active {
    outline: 0;
    color: var(--highlight);
  }

  ul li label:hover svg, ul li label:focus svg, ul li label:active svg {
    fill: var(--highlight);
  }

  .slider {
    position: relative;
    width: 25%;
    transition: all 0.33s cubic-bezier(0.38, 0.8, 0.32, 1.07);
  }

  .slider .indicator {
    position: relative;
    width: 50px;
    max-width: 100%;
    margin: 0 auto;
    height: 4px;
    background: var(--highlight);
    border-radius: 1px;
  }

  input[name=tab-control]:nth-of-type(1):checked ~ ul > li:nth-child(1) > label {
    cursor: default;
    color: var(--highlight);
  }

  input[name=tab-control]:nth-of-type(1):checked ~ ul > li:nth-child(1) > label svg {
    fill: var(--highlight);
  }

  @media (max-width: 600px) {
    input[name=tab-control]:nth-of-type(1):checked ~ ul > li:nth-child(1) > label {
      background: rgba(0, 0, 0, 0.08);
    }
  }

  input[name=tab-control]:nth-of-type(1):checked ~ .slider {
    transform: translateX(0%);
  }

  input[name=tab-control]:nth-of-type(1):checked ~ .exp-content > section:nth-child(1) {
    display: block;
  }

  input[name=tab-control]:nth-of-type(2):checked ~ ul > li:nth-child(2) > label {
    cursor: default;
    color: var(--highlight);
  }

  input[name=tab-control]:nth-of-type(2):checked ~ ul > li:nth-child(2) > label svg {
    fill: var(--highlight);
  }

  @media (max-width: 600px) {
    input[name=tab-control]:nth-of-type(2):checked ~ ul > li:nth-child(2) > label {
      background: rgba(0, 0, 0, 0.08);
    }
  }

  input[name=tab-control]:nth-of-type(2):checked ~ .slider {
    transform: translateX(100%);
  }

  input[name=tab-control]:nth-of-type(2):checked ~ .exp-content > section:nth-child(2) {
    display: block;
  }

  input[name=tab-control]:nth-of-type(3):checked ~ ul > li:nth-child(3) > label {
    cursor: default;
    color: var(--highlight);
  }

  input[name=tab-control]:nth-of-type(3):checked ~ ul > li:nth-child(3) > label svg {
    fill: var(--highlight);
  }

  @media (max-width: 600px) {
    input[name=tab-control]:nth-of-type(3):checked ~ ul > li:nth-child(3) > label {
      background: rgba(0, 0, 0, 0.08);
    }
  }

  input[name=tab-control]:nth-of-type(3):checked ~ .slider {
    transform: translateX(200%);
  }

  input[name=tab-control]:nth-of-type(3):checked ~ .exp-content > section:nth-child(3) {
    display: block;
  }

  input[name=tab-control]:nth-of-type(4):checked ~ ul > li:nth-child(4) > label {
    cursor: default;
    color: var(--highlight);
  }

  input[name=tab-control]:nth-of-type(4):checked ~ ul > li:nth-child(4) > label svg {
    fill: var(--highlight);
  }

  @media (max-width: 600px) {
    input[name=tab-control]:nth-of-type(4):checked ~ ul > li:nth-child(4) > label {
      background: rgba(0, 0, 0, 0.08);
    }
  }

  input[name=tab-control]:nth-of-type(4):checked ~ .slider {
    transform: translateX(300%);
  }

  input[name=tab-control]:nth-of-type(4):checked ~ .exp-content > section:nth-child(4) {
    display: block;
  }


  // input[name=tab-control]:nth-of-type(5):checked ~ ul > li:nth-child(5) > label {
  //   cursor: default;
  //   color: var(--highlight);
  // }

  // input[name=tab-control]:nth-of-type(5):checked ~ ul > li:nth-child(5) > label svg {
  //   fill: var(--highlight);
  // }

  // @media (max-width: 600px) {
  //   input[name=tab-control]:nth-of-type(5):checked ~ ul > li:nth-child(5) > label {
  //     background: rgba(0, 0, 0, 0.08);
  //   }
  // }

  // input[name=tab-control]:nth-of-type(5):checked ~ .slider {
  //   transform: translateX(310%);
  // }

  // input[name=tab-control]:nth-of-type(5):checked ~ .exp-content > section:nth-child(5) {
  //   display: block;
  // }


  @media (max-width: 1000px) {
    ul li label {
      white-space: initial;
    }
    ul li label br {
      display: initial;
    }
    ul li label svg {
      height: 1.5em;
    }
  }

  @media (max-width: 500px) {
    ul li label {
      padding: 5px;
      border-radius: 5px;
    }
    ul li label span {
      display: none;
    }
    .slider {
      display: none;
    }
  }

  @media (max-width: 650px) {
    ul li label span {
      font-size: 0.6rem;
    }
  }



`;

const StyledExpeditionContent = styled.div`

  margin-top: 0.5rem;

  section {
    display: none;
    -webkit-animation-name: expContentAnim;
            animation-name: expContentAnim;
    -webkit-animation-direction: normal;
            animation-direction: normal;
    -webkit-animation-duration: 0.3s;
            animation-duration: 0.3s;
    -webkit-animation-timing-function: ease-in-out;
            animation-timing-function: ease-in-out;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    line-height: 1.4;
  }

  section h2 {
    font-family: var(--font-mono);
    font-weight: bold;
    font-size: 1.2rem;
    color: var(--light-slate);
    padding-bottom: 1rem;
    display: none;
  }

  section h2::after {
    content: "";
    position: relative;
    display: block;
    width: 70px;
    height: 3px;
    background: #428BFF;
    margin-top: 5px;
    left: 1px;
  }

  @-webkit-keyframes expContentAnim {
    from {
      opacity: 0;
      transform: translateY(5%);
    }
    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }

  @keyframes expContentAnim {
    from {
      opacity: 0;
      transform: translateY(5%);
    }
    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }

  @media (max-width: 500px) {
    margin-top: 20px;
    
    section h2 {
      display: block;
    }
  }

`;

const StyledExpeditiionText = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: center;

  span {
    background: var(--expedition-orange);
    padding: 0.27rem 0.8rem 0 0.8rem;
    margin: 0.25rem;
    color: var(--navy);
    border-radius: 100px 100px 100px 100px; 
    border: 1px solid var(--navy);
    box-shadow: inset 0.5px 0.5px 2px 1px rgba(108, 93, 48, 0.64);
    text-align: center;
  }
`;


const Expedition = () => {
  
  const revealContainer = useRef(null);
  const revealTitle = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const languages = ['C', 'LaTeX', 'HTML', 'Javascript', 'PHP', 'Visual Basic'];

  const apps = ['Git', 'PyCharm', 'Visual Studio Code', 'MATLAB', 'Adobe Photoshop', 'Adobe Lightroom', 'MS Office Suite', 
  'MS Visual Studio', 'Qt Creator', 'gdb', 'hexdump', 'metasploit', 'aircrack-ng', 'wireshark', 'beff', 'ettercap', 'dnsspoof', 'arpspoof', 
  'Figma', 'Arduino IDE', 'and so forth...'];

  const libraries = ['scipy', 'numpy', 'scikit-learn', 'keras', 'tensorflow', 'opencv', 'sympy', 'sagemath', 'matplotlib', 'Qt Framework',
  '.NET Framework', 'Laravel', 'jQuery', 'node.js'];

  const oss = ['Red Hat Linux', 'CentOS', 'Arch Linux', 'Ubuntu', 'Debian', 'MacOS', 'Windows', 'Manjaro'];

  return (
    <StyledExpeditionSection>
      <h2 ref={revealTitle}>Cyber Expedition</h2>

      <StyledExpeditionTabPanels>
        <input type="radio" id="tab1" name="tab-control" />
        <input type="radio" id="tab2" name="tab-control" />
        <input type="radio" id="tab3" name="tab-control" />  
        <input type="radio" id="tab4" name="tab-control" />
        {/* <input type="radio" id="tab5" name="tab-control" /> */}
        <ul>
            <li title="Language">
              <label for="tab1" role="button">
              <svg viewBox="0 0 492.308 492.308">
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M0,0.764v490.779h492.308V0.764H0z M472.615,471.851H19.692V20.457h452.923V471.851z"></path> </g> </g> <g> <g> <polygon points="92.019,246.534 78.096,260.457 152.769,335.13 78.096,409.803 92.019,423.726 180.615,335.13 "></polygon> </g> </g> <g> <g> <rect x="166.695" y="406.942" width="120.044" height="19.692"></rect> </g> </g> </g>
              </svg>
                  <br />
                  <span>Language</span>
              </label>
            </li>
            <li title="Application">
              <label for="tab2" role="button">
              <svg viewBox="0 0 36 36">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>application-line</title> <rect x="5" y="7" width="2" height="2" class="clr-i-outline clr-i-outline-path-1"></rect><rect x="9" y="7" width="2" height="2" class="clr-i-outline clr-i-outline-path-2"></rect><rect x="13" y="7" width="2" height="2" class="clr-i-outline clr-i-outline-path-3"></rect><path d="M32,4H4A2,2,0,0,0,2,6V30a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V6A2,2,0,0,0,32,4ZM4,6H32v4.2H4ZM4,30V11.8H32V30Z" class="clr-i-outline clr-i-outline-path-4"></path> <rect x="0" y="0" width="36" height="36" fill-opacity="0"></rect> </g>
              </svg>
                  <br />
                  <span>App</span>
              </label>
            </li>
            <li title="Library">
              <label for="tab3" role="button">
              <svg viewBox="0 0 512 512">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M190.208,367.403l-38.72-58.091l38.72-58.091c3.264-4.907,1.92-11.52-2.965-14.784 c-4.864-3.264-11.499-1.963-14.784,2.965l-42.667,64c-2.389,3.584-2.389,8.256,0,11.84l42.667,64 c2.069,3.093,5.44,4.757,8.875,4.757c2.048,0,4.096-0.576,5.909-1.813C192.149,378.923,193.472,372.309,190.208,367.403z"></path> </g> </g> <g> <g> <path d="M291.755,214.016c-5.461-2.069-11.669,0.704-13.739,6.229l-64,170.667c-2.091,5.525,0.704,11.669,6.229,13.739 c1.237,0.469,2.496,0.683,3.755,0.683c4.309,0,8.384-2.645,9.984-6.912l64-170.667 C300.075,222.229,297.28,216.085,291.755,214.016z"></path> </g> </g> <g> <g> <path d="M382.208,303.424l-42.667-64c-3.285-4.928-9.92-6.229-14.784-2.965c-4.907,3.264-6.229,9.877-2.965,14.784l38.72,58.091 l-38.72,58.091c-3.264,4.907-1.92,11.52,2.965,14.784c1.813,1.216,3.861,1.792,5.909,1.792c3.435,0,6.805-1.664,8.875-4.736 l42.667-64C384.597,311.68,384.597,307.008,382.208,303.424z"></path> </g> </g> <g> <g> <path d="M437.333,0H202.667c-1.429,0-2.837,0.299-4.139,0.832c-0.405,0.171-0.704,0.491-1.067,0.725 c-0.811,0.469-1.664,0.896-2.347,1.557l-128,128c-0.491,0.491-0.768,1.152-1.152,1.728c-0.384,0.576-0.875,1.067-1.131,1.707 c-0.533,1.301-0.832,2.688-0.832,4.117v362.667C64,507.221,68.779,512,74.667,512h362.667c5.888,0,10.667-4.779,10.667-10.667 V10.667C448,4.779,443.221,0,437.333,0z M192,36.416V128h-91.584L192,36.416z M426.667,490.667H85.333V149.333h117.333 c5.888,0,10.667-4.779,10.667-10.667V21.333h213.333V490.667z"></path> </g> </g> </g>
              </svg>
                  <br />
                  <span>Library</span>
              </label>
            </li>
            <li title="OS">
              <label for="tab4" role="button">
              <svg viewBox="0 0 512 512">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M403.217,383.405v-77.396h68.894V0H39.888v306.009h68.894v77.396H0V512h512V383.405H403.217z M93.47,252.428V53.582 h325.061v198.846H93.47z M78.215,473.988H44.823v-52.391h33.391V473.988z M125.843,473.988H92.452v-52.391h33.391V473.988z M173.471,473.988H140.08v-52.391h33.391V473.988z M461.594,461.532H344.905v-33.391h116.688V461.532z"></path> </g> </g> </g>
              </svg>
                  <br />
                  <span>OS</span>
              </label>
            </li>
            {/* <li title="OS">
              <label for="tab5" role="button">
              <svg viewBox="0 0 512 512">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M403.217,383.405v-77.396h68.894V0H39.888v306.009h68.894v77.396H0V512h512V383.405H403.217z M93.47,252.428V53.582 h325.061v198.846H93.47z M78.215,473.988H44.823v-52.391h33.391V473.988z M125.843,473.988H92.452v-52.391h33.391V473.988z M173.471,473.988H140.08v-52.391h33.391V473.988z M461.594,461.532H344.905v-33.391h116.688V461.532z"></path> </g> </g> </g>
              </svg>
                  <br />
                  <span>OS</span>
              </label>
            </li> */}
        </ul>
        <div class="slider">
            <div class="indicator"></div>
        </div>
        <StyledExpeditionContent className='exp-content'>
            <section>
              <h2>Languages</h2>
              <StyledExpeditiionText>
                {languages && languages.map((lang, i) => <span key={lang}>{lang}</span>)}
              </StyledExpeditiionText>
            </section>
            <section>
              <h2>Applications</h2>
              <StyledExpeditiionText>
                {apps && apps.map((app, i) => <span key={app}>{app}</span>)}
              </StyledExpeditiionText>
            </section>
            <section>
              <h2>Libraries</h2>
              <StyledExpeditiionText>
                {libraries && libraries.map((lib, i) => <span key={lib}>{lib}</span>)}
              </StyledExpeditiionText>
            </section>
            <section>
              <h2>Operating Systems</h2>
              <StyledExpeditiionText>
                {oss && oss.map((os, i) => <span key={os}>{os}</span>)}
              </StyledExpeditiionText>
            </section>
            {/* <section>
              <h2>Operating Systems</h2>
              <StyledExpeditiionText>
                {oss && oss.map((os, i) => <span key={os}>{os}</span>)}
              </StyledExpeditiionText>
            </section> */}
        </StyledExpeditionContent>
      </StyledExpeditionTabPanels>
      
    </StyledExpeditionSection>
  );
};

export default Expedition;
