import React from 'react';

const Deals = ({ setPage }) => {
  const deals = [
    { name: "Smart watches", discount: "-25%", image: "src/assets/Image/tech/8.png" },
    { name: "Laptops", discount: "-15%", image: "src/assets/Image/tech/image 23.png" },
    { name: "GoPro cameras", discount: "-40%", image: "src/assets/Image/tech/image 29.png" },
    { name: "Headphones", discount: "-25%", image: "src/assets/Image/tech/image 34.png" },
    { name: "Canon cameras", discount: "-25%", image: "src/assets/Image/tech/image 85.png" },
  ];

  return (
    <section className="bg-white border border-[#DEE2E7] rounded-lg mt-6 flex overflow-hidden">
      {/* Timer Section */}
      <div className="w-72 p-6 border-r border-[#DEE2E7] flex flex-col justify-center">
        <h3 className="text-xl font-bold text-dark mb-1">Deals and offers</h3>
        <p className="text-secondary mb-4 font-normal">Hygiene equipments</p>
        <div className="flex gap-2">
          {['04', '13', '34', '56'].map((time, i) => (
            <div key={i} className="w-12 h-12 bg-[#606060] rounded flex flex-col items-center justify-center text-white">
              <span className="text-sm font-bold">{time}</span>
              <span className="text-[10px] opacity-70">
                {i === 0 ? 'Days' : i === 1 ? 'Hour' : i === 2 ? 'Min' : 'Sec'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Deals Grid */}
      <div className="flex-1 flex overflow-x-auto lg:overflow-visible">
        {deals.map((deal, index) => (
          <div
            key={index}
            className="flex-1 min-w-[200px] p-6 flex flex-col items-center justify-center text-center border-r last:border-r-0 border-[#DEE2E7] cursor-pointer hover:shadow-lg transition-all group"
            onClick={() => setPage('details')}
          >
            <div className="w-full aspect-square bg-[#F7F7F7] rounded-md flex items-center justify-center mb-4 overflow-hidden p-2">
              <img src={deal.image} alt={deal.name} className="max-w-[90%] max-h-[90%] object-contain group-hover:scale-110 transition-transform duration-300" />
            </div>
            <p className="text-[#1C1C1C] text-sm mb-2">{deal.name}</p>
            <span className="bg-[#FFE3E3] text-[#EB001B] px-3 py-1 rounded-full text-xs font-bold">
              {deal.discount}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Deals;
