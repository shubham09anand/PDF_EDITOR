const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const quillHtmlContent = `

    <style>

      .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
        line-height: 1;
      } 
      h1  {
        font-weight: 100;
          font-size: 2em;
      }
      h2  {
        font-weight: 100;
          font-size: 1.5em;
      }
      h3  {
        font-weight: 100;
          font-size: 1.17em;
      }
      h4  {
        font-weight: 100;
          font-size: 1em;
      }
      h5  {
        font-weight: 100;
          font-size: 0.83em;
      }
      h6  {
        font-weight: 100;
          font-size: 0.67em;
      }

      .ql-font-serif {
        font-family: Georgia, Times New Roman, serif;
      }
      .ql-font-monospace {
        font-family: Monaco, Courier New, monospace;
      }
      .ql-size-small {
        font-size: 0.75em;
      }
      .ql-size-large {
        font-size: 1.5em;
      }
      .ql-size-huge {
        font-size: 2.5em;
      }
      .ql-direction-rtl {
        direction: rtl;
        text-align: inherit;
      }
      .ql-align-center {
        text-align: center;
      }
      .ql-align-justify {
        text-align: justify;
      }
      .ql-align-right {
        text-align: right;
      }
      

    </style>

      <h1><span class="ql-size-huge">The nuclear reactors that could power bases on the Moon</span></h1><p><br></p><p><strong>21 / Apr / '24</strong></p><p><br></p><h3><strong class="ql-size-large">Astronauts living on the Moon will need lots of power – but they can't take fuel supplies with them. A new generation of miniature nuclear reactors could be the answer.</strong></h3><p><br></p><p><img src="https://ichef.bbci.co.uk/images/ic/480xn/p0hrkg4h.jpg.webp" alt="Getty Images Nasa artist's impression of Moon reactor (Credit: Getty Images)" style="display: block; margin: auto;" width="887"></p><p><br></p><p><br></p><p><span class="ql-size-large">The 1970s TV series </span><a href="https://www.space1999.net/" rel="noopener noreferrer" target="_blank" class="ql-size-large">Space: 1999</a><span class="ql-size-large"> began – like many a sci-fi drama – with a bang. A nuclear explosion tears the Moon out of Earth's orbit and sends Moonbase Alpha and its inhabitants on an exciting adventure through deep space.</span></p><p><span class="ql-size-large">It obviously left an impression on a young Elon Musk. In 2017, when envisioning </span><a href="https://www.space.com/37549-elon-musk-moon-base-mars.html" rel="noopener noreferrer" target="_blank" class="ql-size-large">SpaceX's plans for a future Moon base</a><span class="ql-size-large">, he named it Alpha. Today, SpaceX is working with Nasa to return humankind to the Moon's surface as part of the US space agency's </span><a href="https://www.nasa.gov/feature/artemis/" rel="noopener noreferrer" target="_blank" class="ql-size-large">Artemis programme</a><span class="ql-size-large">. The planned lunar outpost, however, has a more pragmatic working title: </span><a href="https://blogs.nasa.gov/artemis/2020/10/28/lunar-living-nasas-artemis-base-camp-concept/" rel="noopener noreferrer" target="_blank" class="ql-size-large">Artemis Base Camp</a><span class="ql-size-large">.</span></p><p><span class="ql-size-large">Nasa and the US Department of State have issued combined guidelines for peaceful lunar exploration in the form of the Artemis Accords. So far 36 nations – including India, Japan, the UK, Canada, Australia, the United Arab Emirates and South Korea – have signed up.</span></p><p><span class="ql-size-large">China is also spearheading a base on the Moon with an equally practical title. The </span><a href="https://www.unoosa.org/documents/pdf/copuos/2023/TPs/ILRS_presentation20230529_.pdf" rel="noopener noreferrer" target="_blank" class="ql-size-large">International Lunar Research Station</a><span class="ql-size-large">, announced in 2021, currently has Russia, Belarus, Pakistan, Azerbaijan, Venezuela, Egypt and South Africa as signatories.&nbsp;</span></p><p><span class="ql-size-large">But whichever coalition builds the first base on the Moon, they will all need a reliable power source. Across the world many companies and space agencies have all come to the same conclusion.</span></p><p><span class="ql-size-large">"The truth is that nuclear is the only option to power a moonbase," says Simon Middleburgh from the </span><a href="https://www.bangor.ac.uk/energy/nuclear-futures-institute" rel="noopener noreferrer" target="_blank" class="ql-size-large">Nuclear Futures Institute</a><span class="ql-size-large"> at Bangor University in Wales.</span></p><p><br></p><p><br></p><p><img src="https://ichef.bbci.co.uk/images/ic/480xn/p0hrdt14.jpg.webp" alt="Nasa The Apollo astronauts who made it to the Moon could only stay for a few days (Credit: Nasa)" style="display: block; margin: auto;" width="629"></p><p><br></p><p><br></p><p><span class="ql-size-large">A day on the Moon is not 24 hours, as on Earth, but a month. Or 29.5 days to be precise. There are effectively two weeks of daylight followed by two weeks of darkness, with temperatures reaching -130C (-202F). This is why the </span><a href="https://www.nasa.gov/the-apollo-program/" rel="noopener noreferrer" target="_blank" class="ql-size-large">Apollo missions</a><span class="ql-size-large"> from 1969 to1972 all took place during a lunar day and close to the Moon's equator, when temperatures were manageable and prolonged sunlight could power scientific instruments and landers.</span></p><p><span class="ql-size-large">At the Moon's South Pole, where any base is most likely to be located, certain locations are illuminated by sunlight more than 80% of the time. But temperatures can drop even further in permanently shadowed craters where frozen water is likely to be found. This water will be needed not just to help keep astronauts alive, but also to produce fuel since there is no gas or oil on the Moon.</span></p><p><span class="ql-size-large">"Nuclear is the only game in town," says Middleburgh. "We can't take fuel up there. Solar panels won't work. Diesel generators won't work and the old-style radio-thermal generators just aren't big enough to pack a punch."</span></p><p><br></p><p><span class="ql-size-large">A radioisotope thermal generator was first used on the Moon in 1969, on Apollo 11, using heat generated by the decay of radioactive plutonium-238 to keep scientific instruments at a working temperature. On </span><a href="https://www.nasa.gov/mission/apollo-12/" rel="noopener noreferrer" target="_blank" class="ql-size-large">Apollo 12</a><span class="ql-size-large"> this heat was converted into electricity to power an instrument package, marking the first use of a nuclear reactor on the Moon, albeit not on the scale we have on Earth. The cylindrical generator measured just 45.7 by 40.6cm (18.2 by 16.2in).</span></p><p><span class="ql-size-large">It's a challenging brief. A micro nuclear reactor will have to be light and robust enough to travel 384,400km (238,000 miles) and then be installed for use under extremely difficult conditions, including the intrusive fine dust or regolith that covers the lunar surface.</span></p><p><span class="ql-size-large">In 2022, Nasa </span><a href="https://www.nasa.gov/news-release/nasa-announces-artemis-concept-awards-for-nuclear-power-on-moon/" rel="noopener noreferrer" target="_blank" class="ql-size-large">awarded contracts</a><span class="ql-size-large"> to Lockheed Martin, Westinghouse and IX, a collaboration between Intuitive Machines and X-Energy. Intuitive Machines recently became the first commercial company to perform the first </span><a href="https://www.bbc.com/news/science-environment-68377730" rel="noopener noreferrer" target="_blank" class="ql-size-large">US soft landing on the Moon</a><span class="ql-size-large"> in over 50 years.</span></p><p><br></p><p><br></p><p><img src="https://ichef.bbci.co.uk/images/ic/480xn/p0hrdt4y.jpg.webp" alt="Nasa At the Moon's South Pole, where bases will be likely located, some locations get sunlight 80% of the time (Credit: Nasa)" style="display: block; margin: auto;" width="601"></p><p><br></p><p><br></p><p><span class="ql-size-large">The first phase was completed in February 2024 with the submission of designs for a reactor that could sustain a habitable moonbase for at least a decade.</span></p><p><span class="ql-size-large">"We have confidence because we have used nuclear technology on prior space missions like Pioneer, Voyager and Cassini, where the systems far exceeded their original design life," says Shatel Bhakta, lunar architecture team lead at Nasa's </span><a href="https://www.nasa.gov/johnson/" rel="noopener noreferrer" target="_blank" class="ql-size-large">Johnson Space Center</a><span class="ql-size-large">.</span></p><p><span class="ql-size-large">"The harsh environments, the desire to minimise mass and volume, provide high reliability, and assure uninterrupted power to keep the crew safe, are some of the things factored into a reactor design for the lunar surface," says Bhakta.</span></p><p><span class="ql-size-large">"Additionally, because of the long distance from Earth and associated communication delays, the system must be designed to perform autonomously, on its own, with minimum human intervention."</span></p><p><span class="ql-size-large">Last month the Russian space agency, Roscosmos, announced that it will build a </span><a href="https://www.space.com/russia-china-shared-nuclear-reactor-2035-moon" rel="noopener noreferrer" target="_blank" class="ql-size-large">lunar nuclear reactor with the China National Space Administration</a><span class="ql-size-large"> by 2035 to power a joint moonbase. Yury Borisov, Roscosmos' director general, told Russia's state media that it would be constructed "without the presence of humans".</span></p><p><span class="ql-size-large">In March, the UK Space Agency also announced </span><a href="https://www.bbc.com/news/uk-england-derbyshire-64982477" rel="noopener noreferrer" target="_blank" class="ql-size-large">new funding of £2.9m</a><span class="ql-size-large"> ($3.6m) for the demonstration of a lunar modular nuclear reactor. After an initial study in 2022, the collaboration between UK industry and academics is being led by </span><a href="https://www.rolls-royce.com/" rel="noopener noreferrer" target="_blank" class="ql-size-large">Rolls-Royce</a><span class="ql-size-large">, a name more commonly associated, perhaps, with jet engines or luxury cars.</span></p><p><span class="ql-size-large">"For more than 60 years, Rolls-Royce has quietly been designing, manufacturing and supporting all of the nuclear reactors for the Royal Navy submarines," says Jake Thompson, Rolls Royce's chief engineer of the company's Novel Nuclear programme. "We have a vast heritage of providing very small, very compact nuclear reactors. So we're bringing that capability into these really exciting new domains like space exploration."</span></p><p><br></p><p><br></p><p><img src="https://ichef.bbci.co.uk/images/ic/480xn/p0hrdt7x.jpg.webp" alt="Rolls-Royce Roll-Royce has taken its expertise with submarine reactors to a new project developing miniature reactors for space (Credit: Rolls-Royce)" style="display: block; margin: auto;" width="649"></p><p><br></p><p><br></p><p><span class="ql-size-large">The Rolls Royce micro-reactor programme is currently in the concept development phase. Testing is being done on prototype components and the aim is to have a demonstration model ready for lunar delivery by 2029.</span></p><p><span class="ql-size-large">"These are fission-based reactor systems so they will use a form of low-enriched uranium," says Thompson. "We've got a pretty good idea of what these systems are going to look like and – crucially for space – how much they're going to weigh."</span></p><p><span class="ql-size-large">Each Rolls Royce micro-reactor will produce 50-100 kW and last for at least a decade. "It's entirely scalable. It depends on the needs of the architecture and the infrastructure that's on the lunar surface, but we envisage a microgrid with a few of these reactors supplemented with solar power at the South Pole."</span></p><p><span class="ql-size-large">We're designing the most robust nuclear fuel possible – Simon Middleburgh</span></p><p><br></p><p><img src="https://ichef.bbci.co.uk/images/ic/480xn/p0hrdtdt.jpg.webp" alt="Nasa A micro nuclear reactor will have to be light and robust enough to travel 384,400km (238,000 miles) and then be ready for use (Credit: Nasa)" style="display: block; margin: auto;" width="524" height="500"></p><p><br></p><p><span class="ql-size-large">The micro-reactor will be "roughly about the size of a small family car and a few tonnes in weight. For a nuclear reactor it's absolutely tiny," says Thompson. "For a space system they're still relatively large."</span></p><p><span class="ql-size-large">Miniaturisation is something many organisations see as key for a successful design, including the Nuclear Futures Institute, which is collaborating on the Rolls-Royce project.</span></p><p><span class="ql-size-large">"We're designing the most robust nuclear fuel possible and it's based on something that we've been looking at for a few years in the UK called the </span><a href="https://www.energy.gov/ne/articles/triso-particles-most-robust-nuclear-fuel-earth" rel="noopener noreferrer" target="_blank" class="ql-size-large">Triso</a><span class="ql-size-large"> (TRi-structural ISOtropic) particle," says Middleburgh.</span></p><p><span class="ql-size-large">"It's a gobstopper," he says, referring to the spherical, long-lasting, hard-boiled sweet or candy made from multiple layers.</span></p><p><span class="ql-size-large">"It's a sort of fuel where you wrap your uranium in safety barriers and it's extremely robust. It lasts, it could survive thousands of degrees and it's the </span><a href="https://www.bbc.co.uk/news/uk-wales-66687056" rel="noopener noreferrer" target="_blank" class="ql-size-large">size of a poppy seed</a><span class="ql-size-large">."</span></p><p><span class="ql-size-large">These safety layers include carbon graphite and silicon carbide. Middleburgh says graphite is "radiation tolerant at high temperatures and it's the sort of thing we use for leading edges on spacecraft but we're putting this inside a reactor. It's a lovely material but it's not the final material. I think we can do better. That's what we're working on with people around the world."</span></p><p><span class="ql-size-large">There's no doubting the excitement that these lunar micro-reactors are producing within the space industry. But nuclear power on Earth – despite offering an alternative to limited and polluting fossil fuels – is often associated with the atomic bombs, risks from radiation leaks or accidents such as at Chernobyl in Ukraine or Fukushima in Japan.</span></p><p><span class="ql-size-large">"There are challenges in developing the systems, testing them here on Earth and operating them at the Moon," says Nasa's Bhakta.&nbsp;"The environments both natural and induced – such as launch vibrations, landing loads, extreme temperatures, lighting, and dust – are a few major ones that are considered. We need lunar power systems that have low mass, high reliability, and fault tolerance that can cope with these environments while providing a service life of many years."</span></p><p><span class="ql-size-large">Thompson is also prepared to address what could be the worst-case scenario. What would happen if there's radioactive material on board a spacecraft and there's an explosion in the Earth's atmosphere shortly after launch?</span></p><p><span class="ql-size-large">"These are the engineering challenges that we work through every day," he says. "We would only deploy a system when that system is safe in every aspect of its life cycle, including launch, and the reactor is only designed to be turned on when it actually gets to the lunar surface. Before the reactor is turned on, the nuclear fuel inside is inert. It's perfectly safe to handle and touch and it's not radioactive until that reactor has been turned on."</span></p><p><span class="ql-size-large">As part of the design process, engineers are also considering end-of-life procedures for these micro-reactors.</span></p><p><span class="ql-size-large">"When our lunar reactor mission is complete, we will shut it down and the radiation levels will gradually diminish so it can be safely approached and moved to a long-term storage location if desired," says Bhakta.</span></p><p><span class="ql-size-large">Funding and time to mature these technologies are essential but the benefits of lunar micro-reactor designs could extend to Earth, ranging from flexible, scalable power modules much smaller than existing power plants, to nuclear medicine.</span></p><p><span class="ql-size-large">"We've had lots of nuclear renaissances but it takes opportunities for us to show that nuclear is safe and zero-carbon at the point of delivery," says Middleburgh, who is highly optimistic about the technology in space and on Earth.</span></p><p><span class="ql-size-large">"The knock-on applications are incredible if we can show the public that nuclear can be delivered on time, on budget, and do exciting useful things – things that are going to save the world."</span></p>    
    

    `;

  let cleanedContent = quillHtmlContent.replace(/<br\s*\/?>/g, '');

  // Set the content of the page to the HTML generated by Quill.js
  await page.setContent(cleanedContent);

  // Generate PDF
  await page.pdf({
    path: 'output.pdf',
    format: 'A4',
    margin: {
      top: '1.9cm',
      left: '1.9cm',
      right: '1.32cm',
      bottom: '1.67cm'
    }
  });

  await browser.close();
})();
