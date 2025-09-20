import React, { useState } from 'react';

import '../styles/OurStory.css';
import img1 from '../resources/1.jpg';
import img2 from '../resources/2.jpg';
import img3 from '../resources/3.jpg';
import img4 from '../resources/4.jpg';
import img5 from '../resources/5.jpg';
import img6 from '../resources/6.jpg';
import img7 from '../resources/7.jpg';
import img8 from '../resources/8.jpg';
import img9 from '../resources/9.jpg';
import img10 from '../resources/10.jpg';
import img11 from '../resources/11.jpg';
import img12 from '../resources/12.jpg';
import img13 from '../resources/13.jpg';

const OurStory: React.FC = () => {
  const galleryItems = [
    { src: img1, caption: 'First picture together, courtesy of Jacob\'s dad' },
    { src: img2, caption: 'First winter together' },
    { src: img3, caption: 'Senior prom' },
    { src: img4, caption: 'High school graduation' },
    { src: img5, caption: 'MSU football game - front row!' },
    { src: img6, caption: '2 year anniversary trip' },
    { src: img7, caption: 'Hot air balloon ride in Arizona' },
    { src: img8, caption: 'Caribbean cruise with the Hakalas' },
    { src: img9, caption: '4 year anniversary' },
    { src: img10, caption: 'Jacob\'s graduation' },
    { src: img11, caption: 'Juliette\'s graduation' },
    { src: img12, caption: 'Moving in together' },
    { src: img13, caption: 'Engagement day!' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const showPrev = () => setCurrentIndex(i => (i - 1 + galleryItems.length) % galleryItems.length);
  const showNext = () => setCurrentIndex(i => (i + 1) % galleryItems.length);

  return (
    <div className="Page our-story">
      <div className="content">
        <p className='title'>Our Story...</p>
        <p>It all started back in the summer of 2020 when Jacob and Juliette began talking more frequently during cross country practice. They quickly became close friends, and Juliette invited Jacob over for a bonfire with some of their cross country buddies on her 18th birthday. That night marked the beginning of something extraordinary because Jacob was the last one to stay at the bonfire, and Juliette and Jacob talked until Jacob had to go home.</p>
        <br />
        <p>The next day, Juliette left for Colorado for a week, and they continued to talk all day every day until Juliette eventually asked Jacob to hang out when she returned to Michigan. Their first outing involved hours of conversation in the car in the parking lot of Chick-fil-A, where they both realized this was something special. They spent a few more times together before Jacob officially made Juliette his girlfriend on October 28th, 2020.</p>
        <br />
        <p>During the initial months of dating, they made every effort to spend as much time together as possible, and their feelings for each other grew rapidly. After a few months, they couldn’t keep their emotions hidden any longer and confessed their love for one another. The rest of their senior year was filled with attending prom, graduation, and grad parties together!</p>
        <br />
        <p>That fall, they both embarked on their college journey at Michigan State University (Go Green!). Their time at MSU was primarily spent playing card games, waiting in line at football games, spending time with friends, and attending basketball games. They always made sure to spend as much time together as possible. During these years, they were also incredibly fortunate to travel together to various places, including Georgia, Florida, Arizona, California, Traverse City, South Carolina, Maryland, Wisconsin, and the Caribbean.</p>
        <br />
        <p>Jacob graduated in December 2024 and started his software engineering career at Ford the following January. While Juliette was still in school, they spent a couple of months doing “medium” distance while seeing each other every weekend because they detested going more than a couple of days without seeing one another.</p>
        <br />
        <p>Juliette graduated from college in Spring 2025 and immediately moved in with Jacob on the east side of the state. They spent their summer golfing, playing pickleball with friends, attending races and weddings, spending time with their families, and visiting Juliette’s siblings on the west coast.</p>
        <br />
        <p>Their trip to California in July to visit Caleb and Julie would unexpectedly turn into their engagement trip. On the day of their engagement, they were out in Napa doing wine tastings. Their second winery they visited was a castle, and they decided to tour the venue first. Little did Juliette know that Jacob would pop the question on one of the towers. Juliette instantly said yes!</p>
        <br />
        <p>Since the engagement, they have been enjoying their time together as an engaged couple, planning their wedding. Juliette has also begun grad school at Wayne State for speech therapy, and Jacob has been a fantastic support to her through all her stress.</p>
        <br />
        <p>Now, they are beyond excited to tie the knot on December 27th, 2025!</p>

        {/* Photo gallery section */}
        <section className="photo-gallery">
          <h3>Photos Of Us</h3>

          <div className="carousel">
            <button className="arrow prev" onClick={showPrev} aria-label="Previous">‹</button>

            <div className="carousel-slide">
              <img src={galleryItems[currentIndex].src} alt={galleryItems[currentIndex].caption} />
              <div className="caption">{galleryItems[currentIndex].caption}</div>
            </div>

            <button className="arrow next" onClick={showNext} aria-label="Next">›</button>
          </div>

          <div className="indicators">
            {galleryItems.map((_, idx) => (
              <button
                key={idx}
                className={`dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Show photo ${idx + 1}`}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default OurStory;
