import React from 'react';
import '../styles/Wedding.css';

const Wedding: React.FC = () => (
  <div className="Page wedding">
    <div className="content">
      <p className='title'>Wedding Details</p>

      <section className="overview">
        <p>Our wedding will be taking place on December 27, 2025 at the Lincoln Event Center in Allegan, Michigan. The address is 1141 Lincoln Rd, Allegan, MI 49010.</p>
        <div className="map-wrapper">
          <iframe
            title="Lincoln Event Center map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2941.4346032117123!2d-85.7962333!3d42.5035714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8819d9dc76b94615%3A0xe9e9740e3b0dfd8b!2sThe%20Lincoln%20Event%20Center!5e0!3m2!1sen!2sus!4v1758420176190!5m2!1sen!2sus"
            width="400"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <p>Leaving from Kalamazoo, the event center is approximately a 30-minute drive. We recommend carpooling whenever possible. We look forward to celebrating with you!</p>
      </section>

      <section className="schedule">
        <h3>Ceremony & Reception Schedule</h3>
          <ul className="key-schedule">
            <li><strong>Ceremony:</strong> 3:30 PM</li>
            <li><strong>Cocktail Hour:</strong> 4:00–5:00 PM</li>
            <li><strong>Reception:</strong> 5:00 PM</li>
            <li><strong>Dinner:</strong> 5:30 PM</li>
          </ul>
          <p className="note">Please arrive on time — the ceremony begins promptly at 3:30 PM.</p>
      </section>

      <section className="practical-info">
        <h3>Dress Code</h3>
        <p>Semi-formal attire. We recommend warm layers for outdoor photos — Michigan evenings in December can be chilly. The colors we have chosen for our wedding are pink and green, so feel free to include these colors in your outfit. (Please no velvet materials)</p>

        <h3>Parking & Transportation</h3>
        <p>On-site parking is available at the Lincoln Event Center.</p>

        <h3>Recommended Accommodations</h3>
        <p>We have no specific hotel block, but there are several hotels in the area. We recommend checking options in Allegan or nearby Kalamazoo.</p>
      </section>

      <section className="directions">
        <h3>Directions</h3>
        <p><strong>From Kalamazoo:</strong> Take I-94 W to US-131 S, then follow MI-89 W to Allegan. The drive is roughly 30 minutes depending on traffic.</p>
        <p><strong>From Grand Rapids:</strong> Take US-131 S to M-40 West and follow signs toward Allegan; the trip typically takes about 35–45 minutes.</p>
      </section>

      <section className="accessibility">
        <h3>Accessibility & Special Needs</h3>
        <p>The Lincoln Event Center is wheelchair accessible. If you require any accommodations (accessible seating, dietary needs, or assistance), please let us know in advance so we can ensure a comfortable experience.</p>
      </section>

      <section className="family-policy">
        <h3>Family & Friends</h3>
        <p>Our wedding will be a small, intimate gathering. We kindly ask that you respect our wishes for a limited guest list. Thank you for understanding!</p>
      </section>

      <section className="contact">
        <h3>Questions & Contact</h3>
        <p>If you have any questions about logistics, parking, accommodations, or accessibility, please reach out to Juliette or Jacob directly.</p>
      </section>

      <section className="timeline-note">
        <p><em>Timings are approximate and subject to minor changes. We will post any updates on the wedding site.</em></p>
      </section>
    </div>
  </div>
);

export default Wedding;
