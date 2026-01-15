import Image from "next/image";

const catItems = [
  { id: 1, name: "Tablet", url: "/assets/cat-1.webp" },
  { id: 2, name: "SmartPhone", url: "/assets/cat-2.webp" },
  { id: 3, name: "Game Console", url: "/assets/cat-3.webp" },
  { id: 4, name: "Camera", url: "/assets/cat-4.webp" },
  { id: 5, name: "SmartWatch", url: "/assets/cat-5.webp" },
  { id: 6, name: "Drone & Flycam", url: "/assets/cat-6.webp" },
  { id: 7, name: "Audio", url: "/assets/cat-7.webp" },
  { id: 8, name: "Computer", url: "/assets/cat-8.webp" },
];

const CategoryCatelog = () => {
  return (
    <section className="container mx-auto my-5 rounded-2xl bg-primary py-12 px-5">
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-6">
        {catItems.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col items-center cursor-pointer"
          >
            <div className="bg-base-100 p-4 rounded-full flex items-center justify-center w-30 h-30 shadow-md">
              <Image
                src={cat.url}
                alt={cat.name}
                width={55}
                height={55}
                className="object-contain transition-transform hover:animate-bounce"
              />
            </div>

            <p className="mt-4 text-center text-md font-medium text-title">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCatelog;