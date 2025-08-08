'use client'
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


const counterItems = [
  { value: 900, suffix: "+", label: "Happy Students" },
  { value: 20, suffix: "+", label: "Expert Tutors" },
  { value: 12, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" },
];

const Counter = () => {
  const counterRef = useRef(null); 
  const countersRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    countersRef.current.forEach((counter, index) => {
      if (!counter) return;
      
      const numberElement = counter.querySelector(".counter-number");
      const item = counterItems[index];

      if (!numberElement) return;

      gsap.fromTo(numberElement, 
        { innerText: 0 },
        {
          innerText: item.value,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: counter,
            start: "top 80%",
            toggleActions: "play none none none"
          },
          onUpdate: function() {
            // Format the number with suffix during animation
            numberElement.textContent = `${Math.floor(this.targets()[0].innerText)}${item.suffix}`;
          }
        }
      );
    });
  }, { scope: counterRef });

  return (
    <section  ref={counterRef} className="px-5 md:px-20 xl:mt-0 mt-32">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
        {counterItems.map((item, index) => (
          <div
            key={index}
            ref={(el) => countersRef.current[index] = el}
            className="bg-white rounded-lg p-10 flex flex-col justify-center items-center text-center"
          >
            <div className="counter-number text-blue-600 text-5xl font-bold mb-2">
              0{item.suffix}
            </div>
            <div className="text-blue-600 text-lg">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Counter;