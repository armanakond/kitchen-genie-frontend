//reusable page header component with back button

import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  backHref: string;
};

export default function PageHeader({ title, backHref }: Props) {
  return (
    <header className="page-header">
      <Link href={backHref} className="page-header-back" aria-label="Go back">
        ←
      </Link>

      <h1 className="page-header-title">{title}</h1>

      <div className="page-header-logo">
        <Image
          src="/images/logo.png"
          alt="Kitchen Genie"
          width={90}
          height={90}
          priority
        />
      </div>
    </header>
  );
}
