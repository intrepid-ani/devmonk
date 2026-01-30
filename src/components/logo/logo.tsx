import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link
      href={"/"}
      className="relative flex justify-center items-center gap-1.5 md:gap-2 w-fit select-none cursor-pointer"
    >
      <DevMonkIcon />
      <Badge />

      <h3 className="font-bold text-lg">
        Dev
        <Monk className="ml-0.5 font-extrabold text-primary brightness-110" />
      </h3>
    </Link>
  );
}

interface DevMonkIconProps {
  className?: string;
  quality?: number | `${number}`;
  priority?: boolean;
  unoptimized?: boolean;
}

export function DevMonkIcon({
  className,
  quality,
  priority,
  unoptimized,
}: DevMonkIconProps) {
  return (
    <Image
      src={"/logo/dev_monk_no_bg_logo.png"}
      alt="Dev Monk Icon"
      className={`${className || ""} md:h-6 md:w-6 rounded-xl invert-100 dark:invert-0`}
      height={25}
      width={25}
      quality={quality || 100}
      priority={priority || true}
      unoptimized={unoptimized || true}
    />
  );
}

export function Monk({ className }: { className?: string }) {
  return <span className={` tracking-wide ${className}`}>Monk</span>;
}

function Badge() {
  return (
    <div className="absolute -top-2 -right-8 text-xs z-10 rounded-xs bg-accent p-0.5">
      <p>Beta</p>
    </div>
  );
}

export default Logo;
