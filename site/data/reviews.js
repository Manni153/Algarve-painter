'use strict';

// ---------------------------------------------------------------------------
// GOOGLE REVIEWS
//
// Only genuine reviews, copied word for word from the Google Business
// Profile. Never edit a review's wording and never add one that is not
// published on Google. Newest first. Up to six show on the homepage; all of
// them show on /about/.
//
// Shape:
//   {
//     author: 'Sarah M.',          // as shown on Google (first name + initial is fine)
//     location: 'Vilamoura',       // optional, only if the reviewer said so
//     rating: 5,                   // 1–5, as given
//     date: '2026-05',             // YYYY-MM
//     text: '…',                   // exact wording
//     url: 'https://…',            // optional link to the review itself
//   }
//
// While the list is empty the section explains that reviews are being
// collected and links to the Google profile (site.googleReviewsUrl) if set.
// No review or rating schema is emitted: Google does not show review stars
// for reviews a business publishes about itself.
// ---------------------------------------------------------------------------

module.exports = [];
