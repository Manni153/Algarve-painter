'use strict';

// Structured data builders. The business entity is defined once (with an
// @id) on the homepage and referenced by @id everywhere else.

const site = require('../data/site');

const BUSINESS_ID = `${site.baseUrl}/#business`;

function city(l) {
  return { '@type': 'City', name: l.name, containedInPlace: { '@type': 'AdministrativeArea', name: 'Algarve' } };
}

function businessSchema({ locations, services }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HousePainter',
    '@id': BUSINESS_ID,
    name: site.brand,
    description:
      'English-speaking interior and exterior painters for villas, houses and apartments across the Algarve, Portugal.',
    url: `${site.baseUrl}/`,
    telephone: site.phoneTel,
    email: site.email,
    image: `${site.baseUrl}/assets/img/og-algarve-villa-exterior-freshly-painted.jpg`,
    logo: `${site.baseUrl}/icon-512.png`,
    knowsLanguage: ['en'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.latitude, longitude: site.geo.longitude },
    areaServed: [{ '@type': 'AdministrativeArea', name: 'Algarve' }, ...locations.map(city)],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Painting services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, url: `${site.baseUrl}/${s.slug}/` },
      })),
    },
  };
  if (site.openingHours.length) {
    data.openingHoursSpecification = site.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    }));
  }
  if (site.googleReviewsUrl) data.sameAs = [site.googleReviewsUrl];
  return data;
}

function serviceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    serviceType: service.schemaServiceType || service.name,
    description: service.metaDescription,
    url: `${site.baseUrl}/${service.slug}/`,
    provider: { '@type': 'HousePainter', '@id': BUSINESS_ID, name: site.brand, url: `${site.baseUrl}/` },
    areaServed: { '@type': 'AdministrativeArea', name: 'Algarve' },
    availableLanguage: 'en',
  };
}

function locationSchema(location) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Painters in ${location.name}`,
    serviceType: 'House painting',
    description: location.metaDescription,
    url: `${site.baseUrl}/painters-${location.slug}/`,
    provider: { '@type': 'HousePainter', '@id': BUSINESS_ID, name: site.brand, url: `${site.baseUrl}/` },
    areaServed: city(location),
    availableLanguage: 'en',
  };
}

module.exports = { businessSchema, serviceSchema, locationSchema, BUSINESS_ID };
