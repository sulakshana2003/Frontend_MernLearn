import { useState } from "react";

export default function ImageSlider(props) {
  const images = props.images;
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
        <img
          src={images[currentImage]}
          alt=""
          className="h-[380px] w-full object-cover"
        />

        {/* Counter badge (style only) */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white">
          {currentImage + 1} / {images.length}
        </div>

        {/* Soft gradient overlay (style only) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Thumbnails */}
      <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
        {images.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentImage(index)}
            className={`shrink-0 overflow-hidden rounded-xl border transition ${
              index === currentImage
                ? "border-rose-300 ring-2 ring-rose-200"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <img src={image} alt="" className="h-20 w-20 object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
