import Link from "next/link";
import clsx from 'clsx'

const Button = ({content, classes, href, icon=null}) => {
  return (
    <Link 
      href={href}
      className={clsx(classes,  "py-3 px-6", "flex items-center justify-center")}
    >
      {icon && (
          <span className="inline-flex items-center mr-2">
            {icon}
          </span>
        )}
        {content}
    </Link>
  )
}

export default Button
