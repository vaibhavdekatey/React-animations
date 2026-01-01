import { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const trackRef = useRef<HTMLDivElement>(null);
  const mouseDownAt = useRef<number>(0);
  const prevPercentage = useRef<number>(0);
  const percentage = useRef<number>(0);

  const handleOnDown = (clientX: number) => {
    mouseDownAt.current = clientX;
  };

  const handleOnUp = () => {
    mouseDownAt.current = 0;
    prevPercentage.current = percentage.current;
  };

  const handleOnMove = (clientX: number) => {
    if (mouseDownAt.current === 0) return;

    const mouseDelta = mouseDownAt.current - clientX;
    const maxDelta = window.innerWidth;

    const nextPercentage =
      prevPercentage.current + (mouseDelta / maxDelta) * -100;

    const nextPercentageConstrained = Math.max(
      Math.min(nextPercentage, 0),
      -100
    );

    percentage.current = nextPercentageConstrained;

    if (nextPercentage !== nextPercentageConstrained) {
      mouseDownAt.current = clientX;
      prevPercentage.current = nextPercentageConstrained;
    }

    updateVisuals(nextPercentageConstrained);
  };

  const handleOnWheel = (e: WheelEvent) => {
    const scrollDelta = e.deltaY * -0.02;
    const nextPercentage = percentage.current + scrollDelta;

    const nextPercentageConstrained = Math.max(
      Math.min(nextPercentage, 0),
      -100
    );

    percentage.current = nextPercentageConstrained;
    prevPercentage.current = nextPercentageConstrained;

    updateVisuals(nextPercentageConstrained);
  };

  const updateVisuals = (nextPercentage: number) => {
    if (!trackRef.current) return;

    trackRef.current.animate(
      {
        transform: `translate(${nextPercentage}%, -50%)`,
      },
      { duration: 1200, fill: "forwards" }
    );

    const images = trackRef.current.getElementsByClassName("image");
    for (const image of images) {
      (image as HTMLElement).animate(
        {
          objectPosition: `${100 + nextPercentage}% center`,
        },
        { duration: 1200, fill: "forwards" }
      );
    }
  };

  useEffect(() => {
    const handleWindowMove = (e: MouseEvent) => handleOnMove(e.clientX);
    const handleWindowUp = () => handleOnUp();
    const handleWindowWheel = (e: WheelEvent) => handleOnWheel(e);

    window.addEventListener("mousemove", handleWindowMove);
    window.addEventListener("mouseup", handleWindowUp);
    window.addEventListener("wheel", handleWindowWheel);

    return () => {
      window.removeEventListener("mousemove", handleWindowMove);
      window.removeEventListener("mouseup", handleWindowUp);
      window.removeEventListener("wheel", handleWindowWheel);
    };
  }, []);
  return (
    <>
      <div
        id="image-track"
        ref={trackRef}
        onMouseDown={(e) => handleOnDown(e.clientX)}
        onTouchStart={(e) => {
          handleOnDown(e.touches[0].clientX);
        }}
        onTouchMove={(e) => {
          handleOnMove(e.touches[0].clientX);
        }}
        onTouchEnd={() => handleOnUp()}
      >
        <img
          src="https://images.unsplash.com/photo-1764767168158-9f05d34e3881?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          draggable="false"
          className="image"
        />
        <img
          src="https://images.unsplash.com/photo-1764366795867-a0e7fcbf791e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          draggable="false"
          className="image"
        />
        <img
          src="https://images.unsplash.com/photo-1764014588206-3c2647a34911?q=80&w=1211&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          draggable="false"
          className="image"
        />
        <img
          src="https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          draggable="false"
          className="image"
        />
        <img
          src="https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          draggable="false"
          className="image"
        />
        <img
          src="https://images.unsplash.com/photo-1764893216553-169626309a55?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          draggable="false"
          className="image"
        />
        <img
          src="https://images.unsplash.com/photo-1764621005112-a65aa88abc5e?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          draggable="false"
          className="image"
        />
        <img
          src="https://images.unsplash.com/photo-1762532985216-6561bb733c56?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          draggable="false"
          className="image"
        />
      </div>
    </>
  );
}

export default App;
