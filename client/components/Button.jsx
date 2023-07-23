import Link from "next/link";
import clsx from 'clsx'

const Button = ({content, classes, href}) => {
  return (
    <Link 
      href={href}
      className={clsx(classes, "rounded-lg", "py-4 px-8", "flex text-xl items-center justify-center")}
    >
        {content}
    </Link>
  )
}

export default Button
