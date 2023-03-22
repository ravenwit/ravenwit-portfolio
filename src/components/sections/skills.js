import React, { useState, useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import { KEY_CODES } from '@utils';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import $ from 'jquery';

const StyledSkillSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 700px;

  @import 'https://fonts.googleapis.com/css?family=Montserrat:400,700|Raleway:300,400';

  .archive-link{
    padding-top: 4rem;
  }

`;

const StyledSkillCards = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  // .card {
  //   transition: all 0.6s ease-out;
  // }

  @media (max-width: 610px) {
    flex-direction: column;
  }

`;

const StyledSkillCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 15rem;
  background-color: var(--another-navy);
  -webkit-box-shadow: -6px -5px 30px 5px rgba(0,0,0,0.95); 
  box-shadow: -6px -5px 30px 5px rgba(0,0,0,0.95);
  border-radius: 10px;
  gap: 1rem;
  left: 0px;
  transition: all 0.6s ease-out;
  


  h3 {
    margin: 23px 27px 15px;
    font-size: var(--fz-lg);
  }

  .skill-logo {
    width: 50%;
    // height: 70%;
    align-self: center;
    left: -0.4rem;
    position: relative;
  }

  .bar {
    position: relative;
    height: 5px;
    width: calc(100% - 25px);
    left: 5%;
  }
  
  .emptybar {
    background-color: rgb(26 99 209);
    width: 100%;
    height: 100%;
    -webkit-box-shadow: inset -1px 0px 0px 0.2px rgb(0 0 0 / 95%);
    box-shadow: inset -1px 0px 0px 0.2px rgb(0 0 0 / 95%);
    z-index: -1;
  }
  
  .filledbar {
    position: absolute;
    top: 0px;
    z-index: 3;
    width: 0px;
    height: 100%;
    background: rgb(0,154,217);
    background: linear-gradient(90deg, rgba(0,154,217,1) 0%, rgba(217,147,0,1) 65%, rgba(255,186,0,1) 100%);
    transition: all 0.6s ease-out;
  }

  &:hover, &:active {
    transform: translateY(-20px);
    transition: all 0.4s ease-out;
  }

  &:hover ~ &, &:active ~ & {
    position: relative;
    left: 55px;
    transition: all 0.4s ease-out;
  }


  &:hover .filledbar.skill1, &:active .filledbar.skill1 {
    width: 90%;
    transition: all 0.4s ease-out;
  }
  
  &:hover .filledbar.skill2, &:active .filledbar.skill2 {
    width: 75%;
    transition: all 0.4s ease-out;
  }

  &:hover .filledbar.skill3, &:active .filledbar.skill3 {
    width: 85%;
    transition: all 0.4s ease-out;
  }

  &:hover .filledbar.skill4, &:active .filledbar.skill4 {
    width: 65%;
    transition: all 0.4s ease-out;
  }

  &:not(:first-child) {
    margin-left: -50px;
  }

  &:hover .water-fill.skill1 {
    -webkit-animation: wave 2.5s infinite linear, fill-up-skill1 1s ease-out;
            animation: wave 2.5s infinite linear, fill-up-skill1 1s ease-out;
    animation-fill-mode: none, forwards;
  }

  &:hover .water-fill.skill2 {
    -webkit-animation: wave 2.5s infinite linear, fill-up-skill2 1s ease-out;
            animation: wave 2.5s infinite linear, fill-up-skill2 1s ease-out;
    animation-fill-mode: none, forwards;
  }

  &:hover .water-fill.skill3 {
    -webkit-animation: wave 2.5s infinite linear, fill-up-skill3 1s ease-out;
            animation: wave 2.5s infinite linear, fill-up-skill3 1s ease-out;
    animation-fill-mode: none, forwards;
  }

  &:hover .water-fill.skill4 {
    -webkit-animation: wave 2.5s infinite linear, fill-up-skill4 1s ease-out;
            animation: wave 2.5s infinite linear, fill-up-skill4 1s ease-out;
    animation-fill-mode: none, forwards;
  }

  @-webkit-keyframes wave {
    0% {
      x: -100px;
    }
    100% {
      x: 0;
    }
  }

  @keyframes wave {
    0% {
      x: -100px;
    }
    100% {
      x: 0;
    }
  }

  @-webkit-keyframes fill-up-skill1 {
    0% {
      height: 0px;
      y: 30px;
    }
    100% {
      height: 50px;
      y: -2px;
    }
  }

  @keyframes fill-up-skill1 {
    0% {
      height: 0px;
      y: 30px;
    }
    100% {
      height: 50px;
      y: -2px;
    }
  }

  @-webkit-keyframes fill-up-skill2 {
    0% {
      height: 0px;
      y: 30px;
    }
    100% {
      height: 50px;
      y: 4px;
    }
  }

  @keyframes fill-up-skill2 {
    0% {
      height: 0px;
      y: 30px;
    }
    100% {
      height: 50px;
      y: 4px;
    }
  }

  @-webkit-keyframes fill-up-skill3 {
    0% {
      height: 0px;
      y: 30px;
    }
    100% {
      height: 50px;
      y: 6px;
    }
  }

  @keyframes fill-up-skill3 {
    0% {
      height: 0px;
      y: 30px;
    }
    100% {
      height: 50px;
      y: 0px;
    }
  }

  @-webkit-keyframes fill-up-skill4 {
    0% {
      height: 0px;
      y: 30px;
    }
    100% {
      height: 50px;
      y: 6px;
    }
  }

  @keyframes fill-up-skill4 {
    0% {
      height: 0px;
      y: 30px;
    }
    100% {
      height: 50px;
      y: 6px;
    }
  }
  

  @media (max-width: 700px) and (min-width: 610px){
    height: 13.5rem;
    width: 50%;

    h3 {
      font-size: var(--fz-md);
    }
  }

  @media (max-width: 650px) and (min-width: 610px) {
    h3 {
      font-size: var(--fz-sm);
    }
  }

  @media (max-width: 610px) {

    width: 50%;
    height: 12rem;
    top:0px;
    left:0px;
    align-self: center;

    .skill-logo {
      width: 30%;
      align-self: center;
      margin-top:0.4rem;
    }
    
    &:not(:first-child) {
      margin-top: -70px;
      margin-left:0px;
    }

    &:hover ~ &, &:active ~ & {
      position: relative;
      top: 55px;
      left: 0px;
      transition: all 0.4s ease-out;
    }

    h3 {
      font-size: var(--fz-md);
    }
  }

  @media (max-width: 350px) {
    height: 10.5rem;
  }



`;


const Skills = () => {

  const revealContainer = useRef(null);
  const revealCertLink = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealCertLink.current, srConfig());
    sr.reveal(revealContainer.current, srConfig());
  }, []);


  return (
    <StyledSkillSection id="skills" ref={revealContainer}>
      <h2 className="numbered-heading">Skills</h2>
      <StyledSkillCards>
        <StyledSkillCard>
          <h3 class="title">Python</h3>

          <div class="bar">
            <div class="emptybar"></div>
            <div class="filledbar skill1"></div>
          </div>
          <div class="skill-logo">
        
          <svg id="Skill_1" data-name="Skill 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  enable-background="new 0 0 574.558 120" space="preserve"><defs></defs>
            <defs>
              <linearGradient id="grad" x1="0.47" y1="0" x2="0.53" y2="1">
                <stop offset="0%" stop-color="#428bff"/>
                <stop offset="9.67%" stop-color="#2ab2d8"/>
                <stop offset="29%" stop-color="#5becc0"/>
                <stop offset="40.17%" stop-color="#5ddd9d"/>
                <stop offset="62.5%" stop-color="#7dba5c"/>
                <stop offset="75%" stop-color="#a4be55"/>
                <stop offset="100%" stop-color="#edc239"/>
              </linearGradient>
              <linearGradient id="1" x1="0.06" y1="0.74" x2="0.94" y2="0.26">
                <stop offset="0%" stop-color="#ff0000"/>
                <stop offset="19%" stop-color="rgba(255, 0, 0, 0.75)"/>
                <stop offset="38%" stop-color="rgba(255, 0, 0, 0.5)"/>
                <stop offset="76%" stop-color="rgba(255, 0, 0, 0)"/>
              </linearGradient>
            </defs>
            <pattern id="water" width=".25" height="1.1" patternContentUnits="objectBoundingBox">
            <path fill="url(#grad)" class="water" d="M0.25,1H0c0,0,0-0.659,0-0.916c0.083-0.303,0.158,0.334,0.25,0C0.25,0.327,0.25,1,0.25,1z"/>
            </pattern>

            <path id='logoPython' d="M14.31.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.83l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.23l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05L0 11.97l.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.24l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05 1.07.13zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09-.33.22zM21.1 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01.21.03zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08-.33.23z">

            </path>
	
	          <path id='logoPython_bg' fill='#030324' stroke='#060B3F' d="M14.31.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.83l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.23l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05L0 11.97l.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.24l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05 1.07.13zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09-.33.22zM21.1 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01.21.03zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08-.33.23z">

            </path>

            <mask id="masklogoPython">
              <use x="0" y="0" href="#logoPython" opacity="1" fill="#ffffff"/>
            </mask> 
            
            <rect class="water-fill skill1" mask="url(#masklogoPython)" fill="url(#water)" x="-170" y="-10" width="200" height="80"/>
  
          </svg>


          </div> 
          

        </StyledSkillCard>

        <StyledSkillCard> 
          <h3 class="title">C++</h3>

          <div class="bar">
            <div class="emptybar"></div>
            <div class="filledbar skill2"></div>
          </div>
          <div class="skill-logo">
        
          <svg id="Skill_2" data-name="Skill 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  enable-background="new 0 0 574.558 120" space="preserve"><defs></defs>
            <defs>
              <linearGradient id="grad" x1="0.47" y1="0" x2="0.53" y2="1">
                <stop offset="0%" stop-color="#428bff"/>
                <stop offset="9.67%" stop-color="#2ab2d8"/>
                <stop offset="29%" stop-color="#5becc0"/>
                <stop offset="40.17%" stop-color="#5ddd9d"/>
                <stop offset="62.5%" stop-color="#7dba5c"/>
                <stop offset="75%" stop-color="#a4be55"/>
                <stop offset="100%" stop-color="#edc239"/>
              </linearGradient>
              <linearGradient id="1" x1="0.06" y1="0.74" x2="0.94" y2="0.26">
                <stop offset="0%" stop-color="#ff0000"/>
                <stop offset="19%" stop-color="rgba(255, 0, 0, 0.75)"/>
                <stop offset="38%" stop-color="rgba(255, 0, 0, 0.5)"/>
                <stop offset="76%" stop-color="rgba(255, 0, 0, 0)"/>
              </linearGradient>
            </defs>
            <pattern id="water" width=".25" height="1.1" patternContentUnits="objectBoundingBox">
            <path fill="url(#grad)" class="water" d="M0.25,1H0c0,0,0-0.659,0-0.916c0.083-0.303,0.158,0.334,0.25,0C0.25,0.327,0.25,1,0.25,1z"/>
            </pattern>


            <g id='logoCPP'>
              <path d="M12.207 16.278C11.1241 17.343 9.63879 18 8 18C4.68629 18 2 15.3137 2 12C2 8.68629 4.68629 6 8 6C9.67492 6 11.1896 6.6863 12.278 7.79303L13.6923 6.37878C12.2418 4.91014 10.2272 4 8 4C3.58172 4 0 7.58172 0 12C0 16.4183 3.58172 20 8 20C10.1911 20 12.1764 19.1192 13.6212 17.6923L12.207 16.278Z"></path> 
              <path d="M15 9H13V11H11V13H13V15H15V13H17V11H15V9Z"></path> 
              <path d="M20 9H22V11H24V13H22V15H20V13H18V11H20V9Z"></path> 
            </g>
	
	          <g id='logoCPP_bg'>
              <path d="M12.207 16.278C11.1241 17.343 9.63879 18 8 18C4.68629 18 2 15.3137 2 12C2 8.68629 4.68629 6 8 6C9.67492 6 11.1896 6.6863 12.278 7.79303L13.6923 6.37878C12.2418 4.91014 10.2272 4 8 4C3.58172 4 0 7.58172 0 12C0 16.4183 3.58172 20 8 20C10.1911 20 12.1764 19.1192 13.6212 17.6923L12.207 16.278Z" stroke="#060B3F" fill="#030324"></path> 
              <path d="M15 9H13V11H11V13H13V15H15V13H17V11H15V9Z" stroke="#060B3F" fill="#030324"></path> 
              <path d="M20 9H22V11H24V13H22V15H20V13H18V11H20V9Z" stroke="#060B3F" fill="#030324"></path> 
            </g>

            <mask id="masklogoCPP">
              <use x="0" y="0" href="#logoCPP" opacity="1" fill="#ffffff"/>
            </mask> 
            
            <rect class="water-fill skill2" mask="url(#masklogoCPP)" fill="url(#water)" x="-170" y="0" width="200" height="50"/>
  
          </svg>


          </div> 
          
        </StyledSkillCard>

        <StyledSkillCard> 
          <h3 class="title">Linux</h3>

          <div class="bar">
            <div class="emptybar"></div>
            <div class="filledbar skill3"></div>
          </div>
          <div class="skill-logo">
        
          <svg id="Skill_3" data-name="Skill 3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  enable-background="new 0 0 574.558 120" space="preserve"><defs></defs>
            <defs>
              <linearGradient id="grad" x1="0.47" y1="0" x2="0.53" y2="1">
                <stop offset="0%" stop-color="#428bff"/>
                <stop offset="9.67%" stop-color="#2ab2d8"/>
                <stop offset="29%" stop-color="#5becc0"/>
                <stop offset="40.17%" stop-color="#5ddd9d"/>
                <stop offset="62.5%" stop-color="#7dba5c"/>
                <stop offset="75%" stop-color="#a4be55"/>
                <stop offset="100%" stop-color="#edc239"/>
              </linearGradient>
              <linearGradient id="1" x1="0.06" y1="0.74" x2="0.94" y2="0.26">
                <stop offset="0%" stop-color="#ff0000"/>
                <stop offset="19%" stop-color="rgba(255, 0, 0, 0.75)"/>
                <stop offset="38%" stop-color="rgba(255, 0, 0, 0.5)"/>
                <stop offset="76%" stop-color="rgba(255, 0, 0, 0)"/>
              </linearGradient>
            </defs>
            <pattern id="water" width=".25" height="1.1" patternContentUnits="objectBoundingBox">
            <path fill="url(#grad)" class="water" d="M0.25,1H0c0,0,0-0.659,0-0.916c0.083-0.303,0.158,0.334,0.25,0C0.25,0.327,0.25,1,0.25,1z"/>
            </pattern>


            <g id="logoLinux" >
              <path d="M12.6 6.5c.1.1.2.1.4.2c.1 0 .3.1.5.2h.1c.2-.3.3-.6.3-.9c.1-.6-.4-1.2-1-1.2c-.6.1-1 .7-1 1.3v.1c.2 0 .5.1.7.3zm4.5 8c-.3-.2-.6-.2-1-.3c-.2-.9-.5-1.7-.9-2.5c-.6-1.2-1.1-2.4-1.4-3.7c-.2.3-.5.5-.9.6c-.1.1-.3.1-.4.2c-.3.2-.7.4-1.1.4h-.1c-.4 0-.7-.2-.9-.4c-.1-.1-.2-.2-.3-.2c-.1 0-.1-.1-.2-.1c-.1 1.5-1 3.2-1.5 4.3c-.3.8-.5 1.6-.5 2.4c-.8-1.2-.2-2.7.1-3.3c.4-.8.4-.9.3-.8c-.7 1.1-2.1 3.5-.1 4.8c2.1 1.3 2.2 2.6 1 2.5c.1.2.3.4.4.5c1.2 1 2.9 1.1 4.2.3c0-.1.1-.3.1-.4c.1-.3.2-.7.2-1c.1-1.1.1-2.2.9-2.6c.5-.2 1.2-.1 1.6.2c.1.1.2.1.3.2c.2.1.4.1.5.1h.6c.3-.4-.1-.8-.9-1.2zm-6.9-7.7l.1-.1c.2-.3.5-.4.8-.5V6c0-.6-.4-1.1-.8-1.1c-.3.1-.6.6-.6 1.2c0 .3.1.6.3.8c.1 0 .2-.1.2-.1z" opacity="1"/>
              <path  d="M8.5 17.4s0 .1 0 0c-.1-.1-.1-.3-.2-.4c.1.2.1.3.2.4z" opacity="1"/>
              <path id="lin_right_leg"  stroke-width=".5px" d="M15.4 22h-.2c-.6-.1-1.1-.4-1.3-1c-.2-.7-.2-1.5.2-2.2c.1-.3.2-.7.2-1c.1-1.1.1-2.2.9-2.6c.5-.2 1.2-.1 1.6.2c.1.1.2.1.3.2c.2.1.4.1.5.1c.4-.1.8 0 1.1.3c.3.3.4.6.5 1c0 .2.1.5.2.6c.5.5.7 1 .6 1.3c-.1.5-.6.7-1.1 1c-.5.2-1 .5-1.4.9c-.5.7-1.3 1.1-2.1 1.2z" opacity="1"/>
              <path fill="#030324" d="M17.9 15.9c-.4.5-1 .8-1.6.8c-.6-.1-.8-.9-.7-1.5c.1-.7.7-.7 1.5-.4c.8.3 1.1.7.8 1.1zm-5.3-9.3c.1.1.3.1.4.2c.2-.2.2-.4.2-.6c0-.4-.2-.7-.4-.7s-.5.3-.5.7v.3c.1.1.2.1.3.1zm-2.2.2l.3-.3v-.3c0-.3-.2-.6-.4-.5c-.2 0-.3.3-.3.6c.1.3.3.5.4.5z"/>
              <path fill="#030324" d="M17.3 10.8c-.8-1.3-2-2.1-2-3.7c0-1.9.2-5.4-3.3-5.1c-3.5.3-2.5 4-2.6 5.3c0 1.1-.5 2.2-1.3 3.1c-.1.1-.2.3-.3.4c-.9 1.3-1.9 3-1.8 4.6c.2-.1.4-.1.5-.1c.8.1 1.2.9 1.7 1.8c.1.1.1.3.2.4l.6.9l.1.1c1.2.1 1.2-1.2-1-2.5c-2-1.3-.6-3.7.1-4.8c.1-.1.1 0-.3.8c-.3.6-.9 2.1-.1 3.2c0-.8.2-1.6.5-2.4c.5-1 1.4-2.8 1.5-4.3c-.1-.2-.3-.5-.3-.8c0-.2.1-.4.3-.6c.1 0 .2-.1.3-.2c-.2-.2-.4-.5-.4-.8c0-.6.3-1.1.7-1.1c.4 0 .7.4.8 1.1v.2c.2-.1.5-.1.7 0v-.1c-.1-.6.3-1.2 1-1.3c.6.1 1.1.6 1 1.2c0 .3-.1.6-.3.9c.3.1.5.4.5.7c0 .2-.1.3-.2.5c.4 1.3.8 2.5 1.4 3.7c.4.8.7 1.6.9 2.5c.3 0 .7.1 1 .3c.3.2.6.3.8.5c.1.1.1.2.2.2c0 0 0 .1.1.1v.3c.1 0 .3.1.4.2c.5-2-.5-3.9-1.4-5.2z"/>
              <path id="lin_mouth" fill="#030324" d="M11.4 8.5c-.5 0-1-.3-1.4-.7l-.1-.1c-.1 0-.1 0-.1-.1s.1-.1.1-.1c.1 0 .1.1.3.2c.3.4.7.6 1.2.6c.5-.1 1-.2 1.4-.5c.2-.1.4-.2.7-.3c.1 0 .1 0 .1.1s0 .1-.1.1c-.2.1-.4.1-.6.3c-.5.3-1 .5-1.5.5z" opacity="1"/>
		          <path id="lin_lips" stroke="#030324" stroke-width=".5px" opacity=".25" d="M 13.5 6.9 c -0.2 -0.1 -0.3 -0.1 -0.5 -0.2 C 12.9 6.7 12.7 6.6 12.6 6.5 C 12 5.9 10.9 6 10.3 6.7 L 10.2 6.8 S 10 7 9.8 7.1 C 9.6 7.3 9.5 7.5 9.5 7.7 C 9.6 8.1 9.8 8.4 10.2 8.6 c 0.1 0.1 0.2 0.2 0.3 0.2 c 0.2 0.3 0.6 0.4 0.9 0.4 H 11.5 c 0.4 0 0.8 -0.1 1.1 -0.4 C 12.7 8.7 12.8 8.6 13 8.6 c 0.5 -0.1 1 -0.5 1.1 -1.1 C 14.1 7.3 13.8 7 13.5 6.9 Z M 13.4 7.7 C 13.2 7.8 13 7.8 12.8 8 C 12.4 8.3 11.9 8.5 11.3 8.6 C 10.8 8.6 10.3 8.3 9.9 7.9 l -0.1 -0.1 c -0.1 0 -0.1 0 -0.1 -0.1 s 0.1 -0.1 0.1 -0.1 c 0.1 0 0.1 0.1 0.3 0.2 c 0.3 0.4 0.7 0.6 1.2 0.6 c 0.5 -0.1 1 -0.2 1.4 -0.5 c 0.2 -0.1 0.4 -0.2 0.7 -0.3 c 0.1 -0.1 0.1 -0.1 0 0.1 C 13.5 7.6 13.5 7.7 13.4 7.7 Z Z" />
              <path id="lin_left_leg" stroke-width=".5px" opacity="1" d="M 13.5 6.9 z z m -5 14.1 c -0.6 0 -1.2 -0.2 -1.7 -0.5 c -0.5 -0.2 -1 -0.4 -1.6 -0.4 c -0.7 -0.1 -1.2 -0.1 -1.5 -0.6 c -0.2 -0.4 -0.2 -1 0 -1.4 v -0.7 c -0.1 -0.4 -0.1 -0.7 0.1 -1.1 c 0.2 -0.3 0.5 -0.6 0.9 -0.7 c 0.2 0 0.4 -0.1 0.5 -0.3 c 0.1 -0.1 0.2 -0.2 0.2 -0.3 c 0.2 -0.5 0.8 -0.8 1.3 -0.8 c 0.9 0.1 1.4 1.1 1.9 2.2 l 0.6 0.9 c 0.5 0.7 1.1 1.3 1 2 c 0 0.5 -0.3 1 -0.8 1.2 c -0.2 0.4 -0.6 0.5 -0.9 0.5 z"/>
              <path fill="#030324" d="M13.8 19.4c-1.3.7-3 .6-4.2-.4c.1.2.2.3.3.5v.1c.1.3.2.5.2.8c0 .2-.1.3-.1.5c.5 0 1.1-.2 2-.3c.5 0 1.1.1 1.8.2c-.1-.5-.1-1 0-1.4z"/>
	          </g>

            <g id="logoLinux_bg" >
              <path fill="#030324" d="M12.6 6.5c.1.1.2.1.4.2c.1 0 .3.1.5.2h.1c.2-.3.3-.6.3-.9c.1-.6-.4-1.2-1-1.2c-.6.1-1 .7-1 1.3v.1c.2 0 .5.1.7.3zm4.5 8c-.3-.2-.6-.2-1-.3c-.2-.9-.5-1.7-.9-2.5c-.6-1.2-1.1-2.4-1.4-3.7c-.2.3-.5.5-.9.6c-.1.1-.3.1-.4.2c-.3.2-.7.4-1.1.4h-.1c-.4 0-.7-.2-.9-.4c-.1-.1-.2-.2-.3-.2c-.1 0-.1-.1-.2-.1c-.1 1.5-1 3.2-1.5 4.3c-.3.8-.5 1.6-.5 2.4c-.8-1.2-.2-2.7.1-3.3c.4-.8.4-.9.3-.8c-.7 1.1-2.1 3.5-.1 4.8c2.1 1.3 2.2 2.6 1 2.5c.1.2.3.4.4.5c1.2 1 2.9 1.1 4.2.3c0-.1.1-.3.1-.4c.1-.3.2-.7.2-1c.1-1.1.1-2.2.9-2.6c.5-.2 1.2-.1 1.6.2c.1.1.2.1.3.2c.2.1.4.1.5.1h.6c.3-.4-.1-.8-.9-1.2zm-6.9-7.7l.1-.1c.2-.3.5-.4.8-.5V6c0-.6-.4-1.1-.8-1.1c-.3.1-.6.6-.6 1.2c0 .3.1.6.3.8c.1 0 .2-.1.2-.1z" opacity="1"/>
              <path fill="#030324" d="M8.5 17.4s0 .1 0 0c-.1-.1-.1-.3-.2-.4c.1.2.1.3.2.4z" opacity=".25"/>
              <path id="lin_right_leg" fill="#030324" stroke-width=".5px" d="M15.4 22h-.2c-.6-.1-1.1-.4-1.3-1c-.2-.7-.2-1.5.2-2.2c.1-.3.2-.7.2-1c.1-1.1.1-2.2.9-2.6c.5-.2 1.2-.1 1.6.2c.1.1.2.1.3.2c.2.1.4.1.5.1c.4-.1.8 0 1.1.3c.3.3.4.6.5 1c0 .2.1.5.2.6c.5.5.7 1 .6 1.3c-.1.5-.6.7-1.1 1c-.5.2-1 .5-1.4.9c-.5.7-1.3 1.1-2.1 1.2z" opacity="1"/>
              <path fill="#030324" d="M17.9 15.9c-.4.5-1 .8-1.6.8c-.6-.1-.8-.9-.7-1.5c.1-.7.7-.7 1.5-.4c.8.3 1.1.7.8 1.1zm-5.3-9.3c.1.1.3.1.4.2c.2-.2.2-.4.2-.6c0-.4-.2-.7-.4-.7s-.5.3-.5.7v.3c.1.1.2.1.3.1zm-2.2.2l.3-.3v-.3c0-.3-.2-.6-.4-.5c-.2 0-.3.3-.3.6c.1.3.3.5.4.5z"/>
              <path fill="#030324" d="M17.3 10.8c-.8-1.3-2-2.1-2-3.7c0-1.9.2-5.4-3.3-5.1c-3.5.3-2.5 4-2.6 5.3c0 1.1-.5 2.2-1.3 3.1c-.1.1-.2.3-.3.4c-.9 1.3-1.9 3-1.8 4.6c.2-.1.4-.1.5-.1c.8.1 1.2.9 1.7 1.8c.1.1.1.3.2.4l.6.9l.1.1c1.2.1 1.2-1.2-1-2.5c-2-1.3-.6-3.7.1-4.8c.1-.1.1 0-.3.8c-.3.6-.9 2.1-.1 3.2c0-.8.2-1.6.5-2.4c.5-1 1.4-2.8 1.5-4.3c-.1-.2-.3-.5-.3-.8c0-.2.1-.4.3-.6c.1 0 .2-.1.3-.2c-.2-.2-.4-.5-.4-.8c0-.6.3-1.1.7-1.1c.4 0 .7.4.8 1.1v.2c.2-.1.5-.1.7 0v-.1c-.1-.6.3-1.2 1-1.3c.6.1 1.1.6 1 1.2c0 .3-.1.6-.3.9c.3.1.5.4.5.7c0 .2-.1.3-.2.5c.4 1.3.8 2.5 1.4 3.7c.4.8.7 1.6.9 2.5c.3 0 .7.1 1 .3c.3.2.6.3.8.5c.1.1.1.2.2.2c0 0 0 .1.1.1v.3c.1 0 .3.1.4.2c.5-2-.5-3.9-1.4-5.2z"/>
              <path id="lin_mouth" fill="#030324" d="M11.4 8.5c-.5 0-1-.3-1.4-.7l-.1-.1c-.1 0-.1 0-.1-.1s.1-.1.1-.1c.1 0 .1.1.3.2c.3.4.7.6 1.2.6c.5-.1 1-.2 1.4-.5c.2-.1.4-.2.7-.3c.1 0 .1 0 .1.1s0 .1-.1.1c-.2.1-.4.1-.6.3c-.5.3-1 .5-1.5.5z" opacity="1"/>
		          <path id="lin_lips" stroke="#030324" stroke-width=".5px" opacity=".25" fill="#030324" d="M 13.5 6.9 c -0.2 -0.1 -0.3 -0.1 -0.5 -0.2 C 12.9 6.7 12.7 6.6 12.6 6.5 C 12 5.9 10.9 6 10.3 6.7 L 10.2 6.8 S 10 7 9.8 7.1 C 9.6 7.3 9.5 7.5 9.5 7.7 C 9.6 8.1 9.8 8.4 10.2 8.6 c 0.1 0.1 0.2 0.2 0.3 0.2 c 0.2 0.3 0.6 0.4 0.9 0.4 H 11.5 c 0.4 0 0.8 -0.1 1.1 -0.4 C 12.7 8.7 12.8 8.6 13 8.6 c 0.5 -0.1 1 -0.5 1.1 -1.1 C 14.1 7.3 13.8 7 13.5 6.9 Z M 13.4 7.7 C 13.2 7.8 13 7.8 12.8 8 C 12.4 8.3 11.9 8.5 11.3 8.6 C 10.8 8.6 10.3 8.3 9.9 7.9 l -0.1 -0.1 c -0.1 0 -0.1 0 -0.1 -0.1 s 0.1 -0.1 0.1 -0.1 c 0.1 0 0.1 0.1 0.3 0.2 c 0.3 0.4 0.7 0.6 1.2 0.6 c 0.5 -0.1 1 -0.2 1.4 -0.5 c 0.2 -0.1 0.4 -0.2 0.7 -0.3 c 0.1 -0.1 0.1 -0.1 0 0.1 C 13.5 7.6 13.5 7.7 13.4 7.7 Z Z" />
              <path id="lin_left_leg" fill="#030324" stroke="#030324" stroke-width=".5px" opacity="1" d="M 13.5 6.9 z z m -5 14.1 c -0.6 0 -1.2 -0.2 -1.7 -0.5 c -0.5 -0.2 -1 -0.4 -1.6 -0.4 c -0.7 -0.1 -1.2 -0.1 -1.5 -0.6 c -0.2 -0.4 -0.2 -1 0 -1.4 v -0.7 c -0.1 -0.4 -0.1 -0.7 0.1 -1.1 c 0.2 -0.3 0.5 -0.6 0.9 -0.7 c 0.2 0 0.4 -0.1 0.5 -0.3 c 0.1 -0.1 0.2 -0.2 0.2 -0.3 c 0.2 -0.5 0.8 -0.8 1.3 -0.8 c 0.9 0.1 1.4 1.1 1.9 2.2 l 0.6 0.9 c 0.5 0.7 1.1 1.3 1 2 c 0 0.5 -0.3 1 -0.8 1.2 c -0.2 0.4 -0.6 0.5 -0.9 0.5 z"/>
              <path fill="#030324" d="M13.8 19.4c-1.3.7-3 .6-4.2-.4c.1.2.2.3.3.5v.1c.1.3.2.5.2.8c0 .2-.1.3-.1.5c.5 0 1.1-.2 2-.3c.5 0 1.1.1 1.8.2c-.1-.5-.1-1 0-1.4z"/>
	          </g>

            <mask id="masklogoLinux">
              <use x="0" y="0" href="#logoLinux" opacity="1" fill="#ffffff"/>
            </mask> 
            
            <rect class="water-fill skill3" mask="url(#masklogoLinux)" fill="url(#water)" x="-180" y="3" width="200" height="50"/>
  
          </svg>


          </div> 
          
        </StyledSkillCard>

        <StyledSkillCard> 
          <h3 class="title">Premiere Pro</h3>
          <div class="bar">
            <div class="emptybar"></div>
            <div class="filledbar skill4"></div>
          </div>
          <div class="skill-logo">
        
          <svg id="Skill_4" data-name="Skill 4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"  enable-background="new 0 0 574.558 120" space="preserve"><defs></defs>
            <defs>
              <linearGradient id="grad" x1="0.47" y1="0" x2="0.53" y2="1">
                <stop offset="0%" stop-color="#428bff"/>
                <stop offset="9.67%" stop-color="#2ab2d8"/>
                <stop offset="29%" stop-color="#5becc0"/>
                <stop offset="40.17%" stop-color="#5ddd9d"/>
                <stop offset="62.5%" stop-color="#7dba5c"/>
                <stop offset="75%" stop-color="#a4be55"/>
                <stop offset="100%" stop-color="#edc239"/>
              </linearGradient>
              <linearGradient id="1" x1="0.06" y1="0.74" x2="0.94" y2="0.26">
                <stop offset="0%" stop-color="#ff0000"/>
                <stop offset="19%" stop-color="rgba(255, 0, 0, 0.75)"/>
                <stop offset="38%" stop-color="rgba(255, 0, 0, 0.5)"/>
                <stop offset="76%" stop-color="rgba(255, 0, 0, 0)"/>
              </linearGradient>
            </defs>
            <pattern id="water" width=".25" height="1.1" patternContentUnits="objectBoundingBox">
            <path fill="url(#grad)" class="water" d="M0.25,1H0c0,0,0-0.659,0-0.916c0.083-0.303,0.158,0.334,0.25,0C0.25,0.327,0.25,1,0.25,1z"/>
            </pattern>


            <g id="SVGRepo_iconCarrier"> 

              <path d="M19,5V19H5V5H19m0-2H5A2,2,0,0,0,3,5V19a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V5a2,2,0,0,0-2-2Z"></path> 
              {/* <rect width="24" height="24" fill="none"></rect>  */}

              <g>
              <path d="M12.47,10.52a2.42,2.42,0,0,1-.79,1.94,3.39,3.39,0,0,1-2.26.67H8.71v2.8H7V8.07H9.55a3.32,3.32,0,0,1,2.17.62A2.23,2.23,0,0,1,12.47,10.52ZM8.71,11.77h.55a1.86,1.86,0,0,0,1.15-.3,1.09,1.09,0,0,0,.38-.89,1.08,1.08,0,0,0-.32-.86,1.49,1.49,0,0,0-1-.28H8.71Z">
              </path>
              <path d="M16.4,9.81a2.23,2.23,0,0,1,.56,0l-.13,1.53a2.14,2.14,0,0,0-.48-.05,1.73,1.73,0,0,0-1.22.4,1.48,1.48,0,0,0-.44,1.13v3.06H13.05v-6h1.24l.24,1h.08a2.19,2.19,0,0,1,.76-.81A1.83,1.83,0,0,1,16.4,9.81Z">
              </path> 
              </g> 
            </g>

            <g id="SVGRepo_iconCarrier_bg" fill='#030424'> 

              <path stroke="#030424" d="M19,5V19H5V5H19m0-2H5A2,2,0,0,0,3,5V19a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V5a2,2,0,0,0-2-2Z"></path> 
              {/* <rect width="24" height="24" fill="none"></rect>  */}

              <g fill='#030424'>
              <path stroke="#030424" d="M12.47,10.52a2.42,2.42,0,0,1-.79,1.94,3.39,3.39,0,0,1-2.26.67H8.71v2.8H7V8.07H9.55a3.32,3.32,0,0,1,2.17.62A2.23,2.23,0,0,1,12.47,10.52ZM8.71,11.77h.55a1.86,1.86,0,0,0,1.15-.3,1.09,1.09,0,0,0,.38-.89,1.08,1.08,0,0,0-.32-.86,1.49,1.49,0,0,0-1-.28H8.71Z">
              </path>
              <path stroke="#030424" d="M16.4,9.81a2.23,2.23,0,0,1,.56,0l-.13,1.53a2.14,2.14,0,0,0-.48-.05,1.73,1.73,0,0,0-1.22.4,1.48,1.48,0,0,0-.44,1.13v3.06H13.05v-6h1.24l.24,1h.08a2.19,2.19,0,0,1,.76-.81A1.83,1.83,0,0,1,16.4,9.81Z">
              </path> 
              </g> 
            </g>

            <mask id="maskSVGRepo_iconCarrier">
              <use x="0" y="0" href="#SVGRepo_iconCarrier" opacity="1" fill="#ffffff"/>
            </mask> 
            
            <rect class="water-fill skill4" mask="url(#maskSVGRepo_iconCarrier)" fill="url(#water)" x="-180" y="3" width="200" height="50"/>
  
          </svg>


          </div> 
          
        </StyledSkillCard>

      </StyledSkillCards>

      <Link className="inline-link archive-link" to="/cert" ref={revealCertLink}>
        view certificates
      </Link>  

    </StyledSkillSection>
  );
};

export default Skills;
