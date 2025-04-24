import Image from "next/image";

type ImageComponentProps = {
  src: string;
  dimensions: number;
  className: string;
};

export default function ImageComponent({
  src,
  dimensions,
  className,
}: ImageComponentProps) {
  return (
    <Image
      src={src}
      className={className}
      width={dimensions}
      height={dimensions}
      alt="background wave image"
    />
  );
}
