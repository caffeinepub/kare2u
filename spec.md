# Ready Up Party Planning — Major Feature Upgrade

## Current State
Single-page React app with: sticky header, hero section, 3 preset packages (Silver/Gold/Platinum) with item lists, rental service cards grid (static, no interactivity), why-choose section, booking form, footer. Based in Atlanta (needs to be corrected to Florida). No cart, no food customization, no decor color picker, no social proof beyond 2 testimonials, no gallery, no brand story section.

## Requested Changes (Diff)

### Add
- **Custom Party Builder / Cart system**: Floating cart button showing item count + total. Add-to-cart buttons on every service. Cart drawer (slide-in) showing selected items, quantities, subtotal. "Book My Party" CTA from cart.
- **Food Truck section**: Horizontal scrollable carousel of food items (tacos, sliders, nachos, wings, fries, drinks) each with photo, name, price. Each item has an "Add" button. Section explains it's a full food truck at your event.
- **Catering section**: Grid of catering cuisine types (BBQ, Soul Food, Mexican, Italian, Vegan, Seafood) each with photo, name, price per person. Click to select type, then add to cart. Separate from food truck.
- **Decor Color Picker section**: Color palette swatches (Pink & Gold, Blue & Silver, Black & Gold, Tropical, Princess, Red/White/Blue). Clicking a swatch shows the matching decor photo. Add to cart. Section header: "Choose Your Color Scheme"
- **Party Gallery section**: Masonry/grid photo gallery showing real parties we've done (4+ photos with captions like event type)
- **Our Story section**: Photo of team + paragraph about the company origin, values, Florida-based, traveling to nearby states (GA, SC, NC, AL, TN)
- **Why Choose Us section**: Upgrade existing section to include the team story photo and stronger copy
- **Social Proof section**: TikTok video thumbnails (3 cards with play button overlay linking to TikTok), Instagram preview cards (2 posts), plus 4-5 star reviews from happy customers
- **Booking notice banner**: Prominent alert/banner stating "Book at least 2 months in advance" visible on booking form
- **Location/Travel notice**: In footer and about section — "Based in Florida. We travel to GA, SC, NC, AL, TN and other nearby states."
- **More reviews**: Expand to 5 customer reviews with star ratings

### Modify
- **Header**: Update nav to include: Home, Custom Builder, Food & Catering, Decor, Gallery, About, Packages, Contact
- **Hero**: Change "Atlanta's #1" to "Florida's #1"
- **Footer**: Update location to Florida, add Instagram/TikTok links
- **Packages section**: Keep as-is but add visual anchor link from each package to cart/booking
- **Services grid**: Each card now has "Add to Cart" button, remove just plain link to contact

### Remove
- Nothing removed — additive changes only

## Implementation Plan
1. Add cart state management (useCart hook) with items array, addItem, removeItem, total calculation
2. Add floating cart button (fixed bottom-right) with badge showing item count
3. Add CartDrawer component (Sheet from shadcn) showing cart contents
4. Build FoodTruckSection with horizontal scroll carousel and add-to-cart per item
5. Build CateringSection with cuisine type grid cards and add-to-cart
6. Build DecorSection with color swatch picker + reactive photo display + add-to-cart
7. Build GallerySection with grid of party photos with overlays
8. Build OurStory section with team photo + narrative copy about Florida origin
9. Build SocialProof section with TikTok thumbnails + Instagram grid + reviews
10. Update Hero copy (Florida's #1)
11. Update Header nav links
12. Add booking notice banner to BookingForm
13. Update Footer location to Florida + add social links
14. Wire all add-to-cart buttons to the shared cart state
