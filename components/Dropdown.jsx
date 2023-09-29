import Link from "next/link";

function DropDown({ href, children, ...rest }) {
  return (
    <Link className="" href={href} {...rest}>
    {children}
    </Link>
  );
}

export default DropDown;
