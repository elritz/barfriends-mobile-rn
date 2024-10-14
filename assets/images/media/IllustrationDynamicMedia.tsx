import { useReactiveVar } from "@apollo/client";
import { DynamicIllustrationProps } from "#/types/app";
import { ThemeReactiveVar } from "#/reactive";
import Svg, { Path, Ellipse } from "react-native-svg";

const IllustrationDynamicMedia: React.FC<DynamicIllustrationProps> = ({
  width = 200,
  height = 200,
  primary = ThemeReactiveVar().theme?.gluestack.tokens.colors.primary500,
  secondary = ThemeReactiveVar().theme?.gluestack.tokens.colors.secondary900 ||
    "black",
  tertiary = ThemeReactiveVar().theme?.gluestack.tokens.colors.tertiary500,
}: DynamicIllustrationProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M0 90C0 40.294 40.294 0 90 0h320c49.706 0 90 40.294 90 90v320c0 49.706-40.294 90-90 90H90c-49.706 0-90-40.294-90-90V90z"
        fill={primary}
      />
      <Ellipse cx={250} cy={140.283} rx={37} ry={35.2835} fill={secondary} />
      <Path
        d="M173.299 240.281l13.811 24.3 13.81 24.3 13.811 24.301c5.855 10.302 20.86 9.825 26.048-.829l5.242-10.764 17.48-35.893 17.48-35.893 17.48-35.893c1.393-2.604 3.158-4.705 5.165-6.149 2.006-1.444 4.204-2.194 6.43-2.194 2.225 0 4.423.75 6.43 2.194 2.006 1.444 3.771 3.545 5.164 6.149l88 164.974c7.729 14.714.892 36.116-11.595 36.116H101.948c-2.76 0-5.466-1.153-7.815-3.33-2.348-2.176-4.246-5.291-5.48-8.994-1.235-3.703-1.757-7.848-1.51-11.972.248-4.123 1.257-8.062 2.913-11.374l59.46-119.049c5.946-11.593 17.837-11.593 23.783 0z"
        fill={secondary}
      />
    </Svg>
  );
};

export default IllustrationDynamicMedia;
