import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Arrow from '@mui/icons-material/PlayCircleOutlineRounded'

import { Card as PortalCard, CardViewStyle } from '../layout/Layout'
import CodeWindow from './CodeWindow'
import BlogPreview from './BlogPreview'
import TypeWriter from './TypeWriter'
import Footer from '../Footer'

import config from '../../config'
const {docs, portal, waggleOrg} = config



const clientSnippet =
`
import sage_data_client

df = sage_data_client.query(
    start="2023-02-24T01:15:30.550Z",
    end="2023-02-24T02:15:30.550Z",
    filter={
        "plugin": ".*plugin-iio.*"
    }
)
`

const httpSnippet = `
curl -H 'Content-Type: application/json' \\
https://data.sagecontinuum.org/api/v1/query -d '
{
    "start": "-10s",
    "filter": {
        "sensor": "bme680"
    }
}
'
`

const edURL = 'https://sagecontinuum.org/wp-content/uploads/2019/11/LofT-Wrigley-Jose-Osorio-Chicago-Tribune-.jpg'

const scienceTexts = [
  'Climate Research',
  'Wildfire Detection',
  'Health & Saftey',
  'Weather Prediction',
  'Scientific Research',
  'Discovery'
]



export default function Home() {
  const [devHover, setDevHover] = useState('client')

  return (
    <Root>
      <Banner className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-[#f9f9f9] text-6xl ml-10">
          AI @ the Edge<br/>
          for <TypeWriter texts={scienceTexts}>{' '}</TypeWriter>
        </div>

        <div className="flex flex-col mr-40">
          <h3 className="text-slate-300">Getting Started</h3>
          <a href="docs/about/overview" className="focused-link gap-1">Documentation <Arrow className="shadow" /></a>
          <a href={`${portal}/data`} className="focused-link gap-1">Browse Data <Arrow/></a>
        </div>
      </Banner>

      <div className="bg-white">
        <div className="section">
          <Subtext>
            A new kind of national-scale cyberinfrastructure
            to enable AI at the Edge for science.
          </Subtext>

          <div className="flex flex-col md:flex-row gap-10">
            <Link to="science" className="card">
              <img src={edURL} />
              <h3>Learn</h3>
              <p>Explore some of the <Link to="science">science</Link> made possible with Sage</p>
            </Link>
            <a href={`${portal}/apps`} className="card">
              <img src={require('@site/static/img/home/create-app.png').default} />
              <h3>Contribute</h3>
              <p>Upload, build, and share <a href={`${portal}/apps`}>apps</a> for AI at the edge</p>
            </a>
            <a className="card" href={`${portal}/jobs`}>
              <img src="https://sagecontinuum.org/wp-content/uploads/2019/11/Wagman-v4.jpg" />
              <h3>Run jobs</h3>
              <p>Create <a href={`${portal}/create-job?tab=editor&start_with_sample=true`}>science goals</a> to run apps on nodes.<br/></p>
            </a>
            <a href={`${portal}/data`} className="card">
              <img src={require('@site/static/img/home/browse.png').default} />
              <h3>Browse</h3>
              <p>Browse <a href={`${portal}/data`}>data</a> from sensors and edge apps</p>
            </a>
            <Link to="docs/tutorials/accessing-data" className="card">
              <img src="https://sagecontinuum.org/wp-content/uploads/2019/11/1820-1024-tweak.jpg" />
              <h3>Analyze</h3>
              <p>Use Sage APIs to fetch, analyze, or integrate data.</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="section flex flex-col md:flex-row gap-2">
        <CardViewStyle />
        <PortalCard className="match-twitter-card md:w-3/4">
          <h2>News</h2>
          <hr className="mt-8"/>
          <div className="news-list">
            <BlogPreview />
          </div>
        </PortalCard>
        <a
          className="twitter-timeline"
          href="https://twitter.com/sagecontinuum?ref_src=twsrc%5Etfw"
          data-width="400"
          data-height="600"
        >
          Tweets from @sagecontinuum
        </a>
      </div>

      <div className="bg-emerald-50 border-solid border-t-2 border-b-4 border-slate-200">
        <div className="section gap-2">
          <h2 className="text-purple font-bold mb-10">Developer Friendly Tools for Research and Analysis</h2>

          <div className="flex flex-col md:flex-row text-slate-200 gap-10">
            <div className="sci-items flex flex-col gap-4 md:w-7/12">
              <div className="sci-item" onMouseOver={() => setDevHover('client')}>
                <h3 className="text-slate-200 font-bold">Python Data Client</h3>
                Easily analyze data in Pandas with the Sage Data Client
              </div>
              <div className="sci-item" onMouseOver={() => setDevHover('api')}>
                <h3 className="text-slate-200 font-bold">HTTP APIs</h3>
                Access and update data via web APIs
              </div>
              <div className="sci-item" onMouseOver={() => setDevHover('ui')}>
                <h3 className="text-slate-200 font-bold">Web UI tools</h3>
                Navigating job results and data is as easily as a few clicks
              </div>
              <div className="sci-item">
                <h3 className="text-slate-200 font-bold">Open Source</h3>
                All code related to Sage Project is publicly accessible available via
                on Github: <br/>
                <a href={waggleOrg} target="_blank" className="font-bold">
                  Waggle GitHub
                </a> | <a href="https://github.com/sagecontinuum" target="_blank" className="font-bold">
                  Sage GitHub
                </a>
              </div>

              <div className="hidden md:flex justify-between mx-5 text-slate-200">
                <a className="focused-link purple gap-1" href={docs} >Documentation <Arrow /></a>
                <a className="focused-link purple gap-1" href={docs} >Examples <Arrow /></a>
                <a className="focused-link purple gap-1" href={`${portal}/query-browser`}>Query Browser <Arrow /></a>
              </div>
            </div>

            <div className="md:w-5/12">

              {devHover == 'client' &&
                <CodeWindow title="Python Data Client" code={clientSnippet} />
              }
              {devHover == 'api' &&
                <CodeWindow title="Web API" code={httpSnippet} />
              }
              {devHover == 'ui' &&
                <CodeWindow title="portal.sagecontinuum.org" code={''} showUrlBar={true} />
              }
            </div>
          </div>
        </div>
      </div>


      <div className="bg-purple">
        <div className="section items-center gap-2">

          <h2 className="text-slate-200 font-bold">Featured Science</h2>

          <div className="flex flex-col md:flex-row text-slate-200">
            <div className="md:w-1/3 hidden md:block" >
            <img src="https://ecr.sagecontinuum.org/api/meta-files/dariodematties1/avian-diversity-monitoring/0.2.4/ecr-icon.jpg"/>
            </div>
            <div className="flex flex-col gap-4 mx-5 md:w-2/3 sci-items">
              <div className="sci-item">
                <h3 className="text-slate-200 font-bold">Optimizing cloud motion estimation on the edge with phase correlation and optical flow</h3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </div>
              <div className="sci-item">
                <h3 className="text-slate-200 font-bold">A Self-Supervised Approach for Cloud Image Analysis</h3>
                Tellus cras adipiscing enim eu turpis egestas pretium aenean pharetra.
                Posuere ac ut consequat semper viverra nam.
              </div>
              <div className="sci-item">
                <h3 className="text-slate-200 font-bold">Designing Edge Computing-Capable ML Algorithms to Target ARM Dopler Lidar Processing</h3>
                Sed risus ultricies tristique nulla aliquet enim tortor at auctor.
                Pretium nibh ipsum consequat nisl vel pretium lectus quam id.
              </div>
              <div className="sci-item">
                <h3 className="text-slate-200 font-bold">Prediction of Solar Irradiance and Photovoltaic Solar Energy Based on Cloud Coverage...</h3>
                dipiscing diam donec adipiscing tristique ac turpis egestas integer eget aliquet.
                Morbi tristique senectus et netus et malesuada fames
              </div>
              <div className="hidden md:flex justify-between mx-5">
                <Link to="publications" className="focused-link gap-1">Publications <Arrow className="shadow" /></Link>
                <a href={`${portal}/apps`} className="focused-link gap-1">Apps <Arrow className="shadow" /></a>
                <Link to="science" className="focused-link gap-1">Sage Science<Arrow className="shadow" /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="user-stories section justify-center gap-2">
        <CardViewStyle />

        <div>
          <h2>User Stories</h2>
          {/*
          <div className="flex">
            <img src="https://avatars.githubusercontent.com/u/104843704?s=200&v=4" />
            CROCUS
          </div>
          */}
        </div>
        <br/>
        [logos with links go here?]
      </div>


      <Footer />
    </Root>
  )
}

const purple = 'rgb(78, 42, 132)'
const lightPurple = 'rgb(112, 97, 159)'

const sage = 'rgb(135, 186, 166)'


const Root = styled.div`
  /**
  * Resets; back to MUI Global and Sage Portals CSS
  */

  a {
    color: #0080c7;
    cursor: pointer;
    text-decoration: none;
  }

  a:hover { text-decoration: underline; }

  /**
  * home page
  */

  .card {
    color: initial;
    padding: 0;
    background: #fff;
    border: 1px solid #ddd;

    img {
      border-radius: 5px 5px 0 0;
    }

    p, h3 {
      padding: 15px;
    }

    border-bottom: 3px solid #7a6bac;
    :hover {
      text-decoration: none;
      border: 1px solid #7a6bac;
      border-bottom: 3px solid ${purple};
    }
  }

  a.focused-link {
    color: #f2f2f2;
    font-size: 2em;
    display: flex;
    align-items: center;
  }

  a.focused-link.purple {
    color: ${purple};
  }

  .sci-items .focused-link {
    font-size: 1.5em;
  }

  .shadow {
    filter: drop-shadow( 0px 0px 2px #414141);
  }

  .bg-purple { background: ${purple}; }
  .text-purple { color: ${purple}; }

  .bg-sage { background: ${sage}; }

  .section {
    margin: 0 auto;
    padding: 4em 0;
    height: 100%;
    width: 90%;
  }

  .match-twitter-card {
    border-radius: 12px;
    .MuiCardContent-root {
      h2 {
        padding: 0 16px;
      }

      padding-left: 0px;
      padding-right: 0px;
      .news-list {
        padding: 0 16px;
      }
    }
  }

  .sci-items {
    .sci-item {
      background: #63509c;
      padding: 10px;
      border-radius: 10px;
    }

    .sci-item:hover {
      background: #70619f;
    }

    .sci-item a {
      color: #f2f2f2;
    }
  }

  .code-window {
    .prism-code {
      border-radius: 0px 0px 10px 10px;
    }
  }
`


const Banner = styled.div`
  padding: 40px;
  height: 400px;
  background: radial-gradient(farthest-side ellipse at 0% 0,#87baa6 20%,#382d64);
  text-shadow: 0px 0px 6px #666;
`


const Subtext = styled.div`
  font-size: 2em;
  margin: auto;
  width: 50%;
  padding-bottom: 2em;
  text-align: center;
  color: ${purple};
`

