# Specification

## Summary
**Goal:** Update the product catalog with exact product names, descriptions, and prices for 9 products (4 baby, 5 adult), including a new serum product type.

**Planned changes:**
- Extend backend `ProductType` variant to include a `Serum` type
- Replace all seeded products with 9 exact products: CloudSoft Baby Shampoo ($12), CloudSoft Baby Conditioner ($12), PureCuddle Baby Body Wash ($10), PureCuddle Baby Lotion ($14), CalmCare Shampoo ($15), CalmCare Conditioner ($15), SootheSilk Body Wash ($14), SootheSilk Lotion ($18), RenewGlow Serum ($22)
- Ensure `getProducts` returns all 9 products and `getProductsByCategory` filters correctly (4 baby, 5 adult)
- Update frontend `ProductCatalog` and `ProductCard` components to display exact product names, full descriptions, and single prices fetched from the backend
- Update emoji fallback icons per product type (🫧 shampoo, 🧴 conditioner/lotion/body wash, ✨ serum)
- Ensure the 5-card adult grid layout renders gracefully (e.g., last card centered on final row)

**User-visible outcome:** The "For Babies" tab shows 4 product cards and the "For Adults" tab shows 5 product cards (including the new RenewGlow Serum), each displaying the correct name, full description, exact price, and an appropriate emoji icon.
