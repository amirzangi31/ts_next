import cn from "@/utils/clsxFun";
import { useLocale } from "next-intl"
import Link from "next/link"
import { ReactNode } from "react"

export interface LinkElementCom {
    children: ReactNode;
    link: string;
    prefetch?: boolean;
    className?: string
}

const LinkElement = ({ children, link, prefetch, className }: LinkElementCom) => {
    const local = useLocale()

    return (
        <Link href={`${local}/${link}`} locale={local} prefetch={prefetch} className={cn(className)}>
            {children}
        </Link>
    )
}

export default LinkElement