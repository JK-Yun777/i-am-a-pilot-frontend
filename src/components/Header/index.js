import { Html } from "@react-three/drei";

function Header(props) {
  const { hearderTitle } = props;

  return (
    <group {...props}>
      <mesh>
        <Html>
          <div className="header">
            <h1>I am a Pilot</h1>
            <h2>Fasten your Seat Belt</h2>
            <div className="rank-container ">
              <div className="rank-content">
                <div className="rank-label">{hearderTitle}</div>
              </div>
            </div>
          </div>
        </Html>
      </mesh>
    </group>
  );
}

export default Header;
