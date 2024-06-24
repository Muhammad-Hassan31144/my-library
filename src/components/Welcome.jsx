import { useAnimate, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiMousePointer } from "react-icons/fi";
import books from "../data/books";
import { getRandomCoverImages } from "../utils/getRandomCovers";
import { useNavigate } from "react-router-dom";
const Welcome = () => {
  const navigate = useNavigate();
  const [coverImages, setCoverImages] = useState(
    getRandomCoverImages(books, 10)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCoverImages(getRandomCoverImages(books, 10));
      console.log(coverImages);
    }, 10000); // 10000 milliseconds = 10 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);
  const handleNavigate = () => {
    navigate("/books");
  };

  return (
    <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      images={coverImages}
    >
     <section className="grid h-screen w-full place-content-center bg-gray-100 text-center p-4 relative">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8 max-w-screen-lg"
        >
         <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-600 to-yellow-500 animate-pulse">
            Welcome to My Library
          </h1>
          <p className="mt-4 text-xl text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-600 to-yellow-500 animate-pulse">
            Explore a collection of fascinating books that will broaden your horizons. Whether you're into finance, fiction, or fantasy, we've got something for you!
          </p>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNavigate}
          className="btn btn-outline bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out backdrop-blur-md backdrop-opacity-60 p-4"
          style={{ position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-50%)' }}
        >
          <FiMousePointer />
          Visit My Library Now
        </motion.button>
      </section>
    </MouseImageTrail>
  );
};

const MouseImageTrail = ({
  children,
  images,
  renderImageBuffer,

  rotationRange,
}) => {
  const [scope, animate] = useAnimate();

  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;

    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = clientX;
      lastRenderPosition.current.y = clientY;

      renderNextImage();
    }
  };

  const calculateDistance = (x1, y1, x2, y2) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    // Using the Pythagorean theorem to calculate the distance
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    return distance;
  };

  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;

    const el = document.querySelector(selector);

    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;

    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) ${
            imageIndex % 2
              ? `rotate(${rotation}deg)`
              : `rotate(-${rotation}deg)`
          }`,
          `translate(-50%, -50%) scale(1) ${
            imageIndex % 2
              ? `rotate(-${rotation}deg)`
              : `rotate(${rotation}deg)`
          }`,
        ],
      },
      { type: "spring", damping: 15, stiffness: 200 }
    );

    animate(
      selector,
      {
        opacity: [1, 0],
      },
      { ease: "linear", duration: 0.5, delay: 5 }
    );

    imageRenderCount.current = imageRenderCount.current + 1;
  };

  return (
    <div
      ref={scope}
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {children}

      {images.map((img, index) => (
        <img
          className="pointer-events-none absolute left-0 top-0 h-48 w-auto rounded-xl border-2 border-black bg-neutral-900 object-cover opacity-0"
          src={img}
          alt={`Mouse move image ${index}`}
          key={index}
          data-mouse-move-index={index}
        />
      ))}
    </div>
  );
};

export default Welcome;
