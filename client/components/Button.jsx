import Link from "next/link";
import clsx from 'clsx'

const Button = ({content, classes, href}) => {
  return (
    <Link 
      href={href}
      className={clsx(classes,  "py-3 px-6", "flex items-center justify-center")}
    >
        {content}
    </Link>
  )
}

export default Button
