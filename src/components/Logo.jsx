import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center">
        <Image
        src="/assets/logo.png"
        alt="TechGet Ultra Logo"
        height={60}
        width={60}
      />
      <div className="font-bold text-2xl">
        <h1 className="text-primary">TechGet</h1>
        <h1 className="text-secondary">Ultra</h1>
      </div>
    </div>
  );
};

export default Logo;