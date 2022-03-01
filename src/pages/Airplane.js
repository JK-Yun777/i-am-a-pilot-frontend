import React, { useEffect } from "react";

import { CreateAirPlane } from "../components/Airplane";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const windowHalfX = WIDTH / 2;
const windowHalfY = HEIGHT / 2;
const smoothing = 100;
const speed = { x: 0, y: 0 };
let mousePos = { x: 0, y: 0 };

const airplane = new CreateAirPlane();
airplane.mesh.scale.set(0.15, 0.15, 0.15);
airplane.mesh.rotateY(-80);

airplane.castShadow = true;

function loop() {
  airplane.propeller.rotation.x += 0.3;

  airplane.mesh.position.x +=
    (mousePos.x - windowHalfX - airplane.mesh.position.x) / smoothing;
  airplane.mesh.position.y +=
    (-speed.y * 10 - airplane.mesh.position.y) / smoothing;

  requestAnimationFrame(loop);
}

function updateSpeed() {
  speed.x = (mousePos.x / WIDTH) * 100;
  speed.y = (mousePos.y - windowHalfY) / 10;
}

function handleMouseMove(event) {
  mousePos = {
    x: event.clientX,
    y: event.clientY,
  };

  updateSpeed();
}

function AirPlane() {
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove, false);

    loop();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove, false);
    };
  }, [mousePos]);

  return (
    <>
      <primitive object={airplane.mesh} position={[0, 0, -1]} />
    </>
  );
}

export default AirPlane;
