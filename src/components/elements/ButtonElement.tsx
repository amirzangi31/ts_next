import cn from '@/utils/clsxFun';
import { ReactNode } from 'react'



interface ButtonElementType {
  type?: "submit" | "button" | "reset" | undefined;
  size?: "sm" | "md" | "lg";
  bgColor?: string;
  textColor?: string;
  outlined?: boolean;
  children: ReactNode;
  borderRadius?: string;
  animation?: boolean;
  fontSize?: string,
  width?: string,
  border?: string,
  customStyle?: string,
  hover?: string
}




const ButtonElement = ({ type = "button", size = "sm", bgColor = "btn-primary", outlined = false, children, borderRadius = "rounded-full", animation = true, textColor = "text-white", fontSize = "text-md", width = "w-full", border, customStyle, hover }: ButtonElementType) => {
  return (
    <button type={type} className={cn(`px-4 transition-all duration-300`,
      bgColor,
      width,
      borderRadius,
      textColor,
      fontSize,
      border,
      customStyle,
      hover,
      {
        "btn-outline": outlined,
        "no-animation": !animation,
        "min-h-[2.5rem]": size === "sm",
        "min-h-[3rem]": size === "md",
        "min-h-[4rem]": size === "lg",
        "border": border,
      })}>
      {children}
    </button>
  )
}

export default ButtonElement