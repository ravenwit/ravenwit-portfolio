import React, { useRef, useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Layout } from '@components';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledCertificateContainer = styled.div`
  margin: 6rem 0.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.7rem;
  scroll-snap-type: y proximity;
  scroll-padding-top: var(--nav-scroll-height);
 
`;

const StyledCertificateDrawer = styled.div`

  cursor: pointer;
  margin: 2px;
  background: var(--another-navy);
  color: var(--light-slate);
  width: 100%;
  display: flex;
  max-height: 200px;
  flex-direction: row;
  border-radius: 10px;
  justify-content: space-between;
  scroll-snap-align: center none;
  -webkit-transition: max-height 2s cubic-bezier(0.11, 0, 0.5, 0),
                      border-radius 0.2s cubic-bezier(0.6, -0.28, 0.74, 0.05),
                      box-shadow 0.2s cubic-bezier(0.6, -0.28, 0.74, 0.05),
                      transform 0.2s cubic-bezier(0.6, -0.28, 0.74, 0.05),
                      perspective 0.5s ease-in-out;
  transition: max-height 2s cubic-bezier(0.11, 0, 0.5, 0),
              border-radius 0.2s cubic-bezier(0.6, -0.28, 0.74, 0.05),
              box-shadow 0.2s cubic-bezier(0.6, -0.28, 0.74, 0.05),
              transform 0.2s cubic-bezier(0.6, -0.28, 0.74, 0.05),
              perspective 0.5s ease-in-out;


  &:hover {
    border-radius: 20px;
    -webkit-box-shadow: 0 0.5em 1em -0.4em rgba(0,0,0,1);
    box-shadow: 0 0.5em 1em -0.4em rgba(0,0,0,1);
    transform: translateY(-0.25em);
    transition: all 0.2s cubic-bezier(0.6, -0.28, 0.74, 0.05);

    .cert-title {
      color: var(--highlight);
      transition: color 0.2s ease-in-out;
    }

    .cert-org {
      color: var(--highlight-second);
      transition: color 0.2s ease-in-out;
    }
  }

  .org-image {
    align-self: center;
    padding-left: 1.7rem;
    padding-top: 0;
    // padding-right: 1rem;
    transition: transform 1s ease-in-out;

    img {
      width: 100px;
      min-width: 70px;
      max-width: 100%;
      // -webkit-box-shadow: 0px 48px 50px -30px #42AB8B;
      // box-shadow: 0px 48px 50px -30px #42AB8B;
    }
  }

  .cert-content {
    padding: 1.5rem 0px;

    .hidden-content {
      display: none;
      transition: display 1s cubic-bezier(0.6, -0.28, 0.74, 0.05) 2s;
    }

    .titles {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      padding-left: 1.5rem;
      margin-right: 1.5rem;
      text-align: center;

    }

    ul.cert-topic-list {
      font-family: var(--font-sans);
      font-size: var(--fz-md);
      list-style: none;

      li {

        display: grid;
        grid-template-columns: 0 1fr;
        gap: 1em;
        align-items: start;
        // font-size: 1.5rem;
        line-height: 1.25;

        &+li {
          margin-top: 1rem;
        }

        &:before {
          content: '▹';
          margin-right: 0.7rem;
          color: var(--highlight);
          font-size: var(--fz-sm);
        }

      }
    }

  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 7rem;
    padding: 0.5rem 0;

    .cert_date {
      text-align: center;
      background: var(--navy);
      color: var(--highlight);
      font-weight: 700;
      padding: 0.8rem;
      border-radius: 15%;
      margin-right: 1rem;
      margin-top: 0.5rem;
      -webkit-box-shadow: inset 0px 0px 6px -6px rgba(0,0,0,0.8); 
      box-shadow: inset 0px 0px 6px -6px rgba(0,0,0,0.8);

      span {
        color: var(--light-slate);
        font-weight: normal;
      }

      .cert-date-month.mobile {
        display: none;
      }

      .cert-date-month.desktop {
        display: block;
      }

    }

    .link {
      text-align: center;
      margin-top: 1rem;

      svg {
        width: 20px;
      }
    }
  }

  &.expanded {
    
    perspective: 1000px;
    overflow: hidden;
    border-radius: 20px;
    -webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.8); 
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.8);
    max-height: 1000px;
    -webkit-transition: max-height 2s cubic-bezier(0.5, 1, 0.89, 1),
                        perspective 1s ease-in-out 0.4s;
    transition: max-height 2s cubic-bezier(0.5, 1, 0.89, 1),
                perspective 1s ease-in-out 0.4s;



    &:hover {
      transform: translateY(0em);

    }

    .org-image {
      transform: rotateY(16deg);
      transition: transform 1s ease-in-out 0.5s;

      img {
        width: 80%;
        // max-width: 300px;
        transition: width 0.5s ease-in-out;
      }
    }

    .cert-content {

      .hidden-content {
        display: block;
        transition: display 1s cubic-bezier(0.6, -0.28, 0.74, 0.05) 2s;
      }
      
      .details {
        display: grid;
        justify-content: center;
        margin-right: 1.4rem;
      }

      .titles {
        margin-bottom: 1.5rem;
      }

      .cert-title {
        color: var(--highlight);
      }

      .cert-org {
        color: var(--highlight-second);
      }

      .cert-skills {
        display: flex;
        opacity: 1;
        flex-wrap: wrap;
        justify-content: center;
        // padding-left: 2.5rem;
        padding-top: 1.5rem;
        font-size: 1rem;
        transition: opacity 1s ease-in-out 2s;

        .cert-skill-list {
          background: var(--expedition-orange);
          padding: 0.27rem 0.8rem 0 0.8rem;
          // margin: 0.25rem;
          color: var(--navy);
          border-radius: 100px 100px 100px 100px; 
          border: 1px solid var(--navy);
          box-shadow: inset 0.5px 0.5px 2px 1px rgba(108, 93, 48, 0.64);
        }
      }
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    max-height: none;
    width: auto;

    &.expanded {
      max-height: none;
    }

    .info {

      .cert_date {
        max-width: 200px;
        align-self: center;

        .cert-date-month.mobile {
          display: block;
        }

        .cert-date-month.desktop {
          display: none;
        }
      }
    }

    .org-image {
      padding-top: 1.7rem;
      padding-left: 0;
      align-self: center;
    }
  }

  @media (max-width: 305px) {
    width: 90vw;
    .cert-content {
      .titles {
        margin: 0;
        padding: 0;
      }
    }
  }



  


`;

function CertificateDrawer(props) {

  const prefersReducedMotion = usePrefersReducedMotion();
  // const [activeCert, setActiveCert] = useState(null);

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  // const toggleClass = (index) => {
  //   setActiveCert(index);
  // };

  return (
    <StyledCertificateDrawer 
      className={`${props.className}`}
      onClick={props.onClick}
      id={props.certID}
      >
      
      <div class='org-image'>
      <GatsbyImage image={props.certCover} alt={props.title} className="cert-badge" />
      </div>
      <div class='cert-content'>
        <div class='titles'>
          {props.title && (
            <h2 class='cert-title'>{props.title}</h2>
          )}
          {props.organizer && (
            <span class='cert-org'>{props.organizer}</span>
          )}
        </div>
        <div class='hidden-content'>
          <div class='details'>
            {props.topics?.length > 0 && (
                        <ul className="cert-topic-list">
                          {props.topics.map((topic, i) => (
                            <li key={i}>{topic}</li>
                          ))}
                        </ul>
                      )}
          </div>
          <div class='cert-skills'>
            { props.skills && props.skills.map((skill, i) => <span key={i} class='cert-skill-list'>{skill}</span>)}
          </div>
        </div>
      </div>
      <div class='info'>
        <div class='cert_date'>
          {props.date && (
            <span class='cert-date-month desktop'> {`${new Date(props.date).getMonth()}`}  </span>
          )}                   
          {props.date && (
            <span class='cert-date-month mobile'> {monthNames[`${new Date(props.date).getMonth()}`]}   </span>
          )}  /  
          {props.date && (
            <span class='cert-date-year'>  {`${new Date(props.date).getFullYear()}`}</span>
            
          )}
        </div>
        <div class='link'>
          {props.external && (
            <a href={props.external} aria-label="External Link" target="_blank">
              <Icon name="External" />
            </a>
          )}
        </div>
        
      </div>

    </StyledCertificateDrawer>

  );
}


const CertPage = ({ location }) => {

  const data = useStaticQuery(graphql`
  query {
    certs: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/certificates/" }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            date
            title
            organizer
            cover {
              childImageSharp {
                gatsbyImageData(width: 230, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
              }
            }
            external
            topics
            skills
          }
          html
        }
      }
    }
  }
`);

  const certificateData = data.certs.edges;

  const revealTitle = useRef(null);
  const revealCertContainer = useRef(null);
  const revealCerts = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [activeCert, setActiveCert] = useState(null);

  const toggleClass = (index) => {
    if (activeCert === index) {
      setActiveCert(null)
    } else {
    setActiveCert(index);
    }
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealCertContainer.current, srConfig(200, 0));
    revealCerts.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 10)));
  }, []);

  return (
    <Layout location={location}>
      <Helmet title="Certificates" />

      <main>
        <header ref={revealTitle}>
          <h1 className="big-heading">Certificates</h1>
          <p className="subtitle">Workshops and online courses</p>
        </header>

        <StyledCertificateContainer ref={revealCertContainer}>
          {certificateData &&
              certificateData.map(({ node }, index) => {
                const { frontmatter, html } = node;
                const { date, title, organizer, cover, external, topics, skills } = frontmatter;
                const image = getImage(cover);

                return (
                  <CertificateDrawer 
                  key={index}
                  ref={el => (revealCerts.current[index] = el)}
                  className={`cert-drawer ${activeCert === index ? 'expanded' : ''}`}
                  title={title}
                  certCover={image}
                  topics={topics}
                  skills={skills}
                  organizer={organizer}
                  external={external}
                  date={date}
                  certID={`cert-${index}`}
                  onClick={() => toggleClass(index)}
                  >
                  </CertificateDrawer>
                );
              })}
        </StyledCertificateContainer>

        

        
      </main>
    </Layout>
  );
};

export default CertPage;

