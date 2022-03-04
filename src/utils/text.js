import React, { forwardRef } from "react";
import { useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";

import { color } from "../utils/color";

export const StyledText = forwardRef(
  (
    {
      children,
      fontSize = 3,
      offset = 0.35,
      anchorX = "center",
      anchorY = "middle",
      textAlign = "justify",
      lineHeight = 0.75,
      ...props
    },
    ref
  ) => {
    const { viewport } = useThree();
    const textProps = {
      children,
      anchorX,
      anchorY,
      maxWidth: viewport.width,
      lineHeight,
      fontSize,
      textAlign,
      "material-depthTest": false,
    };
    return (
      <group ref={ref} {...props}>
        <Text position-z={-offset} color={color.deepPink} {...textProps} />
        <Text color={color.white} {...textProps} />
      </group>
    );
  }
);
