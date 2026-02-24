import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  // Old (legacy) types and actor state.
  type OldCategory = { #baby; #adult };
  type OldProductType = { #shampoo; #conditioner; #bodyWash; #lotion };
  type OldPriceRange = { #low; #medium; #high };

  type OldProduct = {
    id : Nat;
    name : Text;
    category : OldCategory;
    productType : OldProductType;
    description : Text;
    priceRange : OldPriceRange;
  };

  type OldActor = {
    products : Map.Map<Nat, OldProduct>;
    productIdCounter : Nat;
  };

  // New types and actor state.
  type NewCategory = { #baby; #adult };
  type NewProductType = { #shampoo; #conditioner; #bodyWash; #lotion; #serum };

  type NewProduct = {
    id : Nat;
    name : Text;
    category : NewCategory;
    productType : NewProductType;
    description : Text;
    price : Nat;
  };

  type NewActor = { products : Map.Map<Nat, NewProduct> };

  public func run(_old : OldActor) : NewActor {
    // Return new product catalog with all 9 products.
    let products = Map.fromIter<Nat, NewProduct>(
      [
        (
          1,
          {
            id = 1;
            name = "CloudSoft Baby Shampoo";
            category = #baby;
            productType = #shampoo;
            description = "A tear-free, calming shampoo that feels like a soft cloud on sensitive baby scalps. Made with aloe, chamomile, and glycerin, it gently cleanses without irritation, leaving hair fresh and fluffy. Perfect for eczema-prone newborns and toddlers.";
            price = 12;
          },
        ),
        (
          2,
          {
            id = 2;
            name = "CloudSoft Baby Conditioner";
            category = #baby;
            productType = #conditioner;
            description = "This silky, lightweight conditioner detangles baby hair without pulling or residue. Infused with calendula and coconut-derived softeners, it hydrates and smooths while protecting delicate scalps. Safe for daily use and fragrance-free.";
            price = 12;
          },
        ),
        (
          3,
          {
            id = 3;
            name = "PureCuddle Baby Body Wash";
            category = #baby;
            productType = #bodyWash;
            description = "A gentle, fragrance-free body wash designed to protect and soothe sensitive baby skin. With plant-based cleansers and calming botanicals, it cleans without stripping moisture — ideal for eczema, dryness, and daily bath time.";
            price = 10;
          },
        ),
        (
          4,
          {
            id = 4;
            name = "PureCuddle Baby Lotion";
            category = #baby;
            productType = #lotion;
            description = "A soothing daily lotion that locks in moisture and calms irritation. Made with shea butter, calendula, and vitamin E, it's perfect for babies with eczema or dry patches. Absorbs quickly and leaves skin soft, never greasy.";
            price = 14;
          },
        ),
        (
          5,
          {
            id = 5;
            name = "CalmCare Shampoo";
            category = #adult;
            productType = #shampoo;
            description = "Designed for itchy, flaky, or irritated scalps, this gentle shampoo cleanses without harsh ingredients. With aloe, oat protein, and tea tree, it relieves discomfort while restoring balance to sensitive skin.";
            price = 15;
          },
        ),
        (
          6,
          {
            id = 6;
            name = "CalmCare Conditioner";
            category = #adult;
            productType = #conditioner;
            description = "Deep moisture without heaviness. This conditioner softens and detangles while calming the scalp with chamomile and coconut oil. Ideal for eczema-prone or easily irritated skin.";
            price = 15;
          },
        ),
        (
          7,
          {
            id = 7;
            name = "SootheSilk Body Wash";
            category = #adult;
            productType = #bodyWash;
            description = "A creamy, non-stripping body wash that calms flare-ups while cleansing. With oat extract and aloe, it leaves skin feeling silky and soothed — perfect for daily use on sensitive or reactive skin.";
            price = 14;
          },
        ),
        (
          8,
          {
            id = 8;
            name = "SootheSilk Lotion";
            category = #adult;
            productType = #lotion;
            description = "Rich hydration with a silky finish. This lotion blends shea butter, ceramides, and vitamin E to nourish dry, eczema-prone skin without clogging pores. Smooth, comforting, and long-lasting.";
            price = 18;
          },
        ),
        (
          9,
          {
            id = 9;
            name = "RenewGlow Serum";
            category = #adult;
            productType = #serum;
            description = "A lightweight serum that targets dryness, discoloration, and irritation. With niacinamide, hyaluronic acid, and aloe, it restores glow and resilience to sensitive skin. Fast-absorbing and perfect for layering.";
            price = 22;
          },
        ),
      ].values(),
    );
    { products };
  };
};
