'use strict';

// ---------------------------------------------------------------------------
// SITEWIDE SETTINGS — the single source of truth for brand, contact details
// and feature switches. Nothing else in the templates hardcodes a phone
// number, email address or domain.
//
// Before launch: set the phone, WhatsApp and email values below. The build
// prints a warning for every value that is still a placeholder.
// ---------------------------------------------------------------------------

const phoneDisplay = '+351 000 000 000';
const phoneTel = '+351000000000';

// WhatsApp number in international format, digits only. Set `whatsappEnabled`
// to false to remove every WhatsApp button (the mobile sticky bar then shows
// "Call" and "Quote" instead).
const whatsappNumber = '351000000000';
const whatsappEnabled = true;

const brand = 'Algarve Painter';

module.exports = {
  brand,
  // Shown after the brand in the header wordmark and footer.
  brandDescriptor: 'Interior & Exterior Painting',
  legalName: 'Algarve Painter',
  domainDisplay: 'algarvepainter.com',
  baseUrl: 'https://www.algarvepainter.com',
  locale: 'en_GB',
  lang: 'en-GB',

  phoneDisplay,
  phoneTel,
  telHref: `tel:${phoneTel}`,
  email: 'hello@algarvepainter.com',
  whatsappEnabled,
  whatsappHref: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello, I'd like to ask about painting my property in the Algarve."
  )}`,

  // Hours shown on the contact page and in LocalBusiness schema. Keep them
  // true — leave the array empty rather than guess.
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:30', closes: '18:30', label: 'Monday – Friday, 8:30 – 18:30' },
    { days: ['Saturday'], opens: '09:00', closes: '13:00', label: 'Saturday, 9:00 – 13:00' },
  ],

  // Postal region for schema. No street address is published: this is a
  // service-area business that works at the customer's property.
  address: { locality: 'Algarve', region: 'Faro District', country: 'PT' },
  geo: { latitude: 37.1, longitude: -8.2 },

  // Google Business Profile. When set, the review section links to it and
  // the LocalBusiness schema adds it to `sameAs`.
  googleReviewsUrl: '',
  googleWriteReviewUrl: '',

  // Netlify Forms. `photoUpload` adds an optional file field to the quote
  // form (Netlify Forms accepts attachments — check your plan's limits).
  form: {
    name: 'quote',
    photoUpload: false,
    successPath: '/thank-you/',
  },

  // Optional plain-language note on how the business operates, shown on the
  // About page and in the footer. Leave empty ('') to hide it.
  disclosure: '',

  nav: {
    services: [
      { label: 'Interior Painting', href: '/interior-painting/' },
      { label: 'Exterior House Painting', href: '/exterior-house-painting/' },
      { label: 'Villa Painting', href: '/villa-painting/' },
      { label: 'Apartment Painting', href: '/apartment-painting/' },
      { label: 'Walls & Ceilings', href: '/walls-ceilings/' },
      { label: 'Doors, Shutters & Woodwork', href: '/doors-shutters-woodwork/' },
      { label: 'Rental & Pre-Sale Painting', href: '/rental-property-painting/' },
    ],
    primary: [
      { label: 'Services', href: '/painting-services/', menu: 'services' },
      { label: 'Areas', href: '/areas-we-cover/', menu: 'areas' },
      { label: 'Projects', href: '/projects/' },
      { label: 'How It Works', href: '/how-it-works/' },
      { label: 'About', href: '/about/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },

  PLACEHOLDERS: {
    phone: phoneTel === '+351000000000',
    whatsapp: whatsappEnabled && whatsappNumber === '351000000000',
  },
};
