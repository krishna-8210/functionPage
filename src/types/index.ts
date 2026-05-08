import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type API_Arg_Type<T> = {
  data: T,
  id: string,
  query: string
}
