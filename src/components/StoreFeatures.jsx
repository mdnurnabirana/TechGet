import { FiTruck, FiShield, FiRefreshCcw, FiHeadphones } from "react-icons/fi";

const features = [
  {
    id: 1,
    icon: FiTruck,
    title: "FREE US DELIVERY",
    desc: "For US customers (including Alaska and Hawaii) or orders over $200",
  },
  {
    id: 2,
    icon: FiShield,
    title: "Secure payment",
    desc: "We accept Visa, American Express, Paypal, Payoneer, Mastercard and Discover",
  },
  {
    id: 3,
    icon: FiRefreshCcw,
    title: "1 year warranty",
    desc: "All of our products are made with care and covered for one year against manufacturing defects",
  },
  {
    id: 4,
    icon: FiHeadphones,
    title: "Support 24/7",
    desc: "Contact us 24 hours a day, 7 days a week. Call Us: +880 1305 592904",
  },
];

const StoreFeatures = () => {
  return (
    <section className="container mx-auto my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {features.map(({ id, icon: Icon, title, desc }) => (
        <div
          key={id}
          className="flex gap-4 items-start bg-base-200 p-5 rounded-2xl shadow-md"
        >
          <div className="shrink-0">
            <Icon className="text-primary text-3xl" />
          </div>

          <div>
            <h3 className="font-semibold text-title text-lg mb-1">{title}</h3>
            <p className="text-content text-sm leading-relaxed">{desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default StoreFeatures;