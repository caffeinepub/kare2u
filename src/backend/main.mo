import MixinStorage "blob-storage/Mixin";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Text "mo:core/Text";
import List "mo:core/List";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";



actor {
  include MixinStorage();

  type Package = {
    id : Text;
    name : Text;
    description : Text;
    price : Nat;
  };

  type Inquiry = {
    id : Nat;
    customerName : Text;
    customerEmail : Text;
    customerPhone : Text;
    eventDate : Text;
    eventType : Text;
    packageId : Text;
    guestCount : Nat;
    message : Text;
    timestamp : Int;
  };

  module Inquiry {
    public func compareByTimestamp(a : Inquiry, b : Inquiry) : Order.Order {
      Int.compare(b.timestamp, a.timestamp);
    };
  };

  type AddInquiryArgs = {
    customerName : Text;
    customerEmail : Text;
    customerPhone : Text;
    eventDate : Text;
    eventType : Text;
    packageId : Text;
    guestCount : Nat;
    message : Text;
  };

  var inquiryId = 1;

  let packages = Map.fromIter<Text, Package>([
    (
      "silver",
      {
        id = "silver";
        name = "Silver";
        description = "Basic package with decoration, food, and games";
        price = 500;
      },
    ),
    (
      "gold",
      {
        id = "gold";
        name = "Gold";
        description = "Silver package plus live entertainment and custom cake";
        price = 1000;
      },
    ),
    (
      "platinum",
      {
        id = "platinum";
        name = "Platinum";
        description = "Gold package plus photographer and premium venue";
        price = 2500;
      },
    ),
  ].values());

  // Superuser principal
  let superusers = List.empty<Principal>();

  let inquiries = Map.empty<Nat, Inquiry>();

  public shared ({ caller }) func addInquiry(args : AddInquiryArgs) : async Nat {
    let inquiry : Inquiry = {
      id = inquiryId;
      customerName = args.customerName;
      customerEmail = args.customerEmail;
      customerPhone = args.customerPhone;
      eventDate = args.eventDate;
      eventType = args.eventType;
      packageId = args.packageId;
      guestCount = args.guestCount;
      message = args.message;
      timestamp = Time.now();
    };

    inquiries.add(inquiryId, inquiry);
    inquiryId += 1;
    inquiry.id;
  };

  public query ({ caller }) func getAllPackages() : async [Package] {
    packages.values().toArray();
  };

  public query ({ caller }) func getInquiry(_id : Nat) : async ?Inquiry {
    inquiries.get(_id);
  };

  public query ({ caller }) func getInquiries() : async [Inquiry] {
    handleOnlyAdmins caller;
    inquiries.values().toArray();
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    handleOnlyAdmins caller;
    inquiries.values().toArray().sort(Inquiry.compareByTimestamp);
  };

  func handleOnlyAdmins(caller : Principal) {
    if (not superusers.contains(caller)) {
      Runtime.trap "Only an Admin can call this function";
    };
  };
};
