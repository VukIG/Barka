import { useState } from "react";
export default function Avatar({
  src,
  name,
  initials,
  onClick,
  alt,
  className = "",
  fallbackClassName = "",
}) {
  // Remember which src failed to load. Comparing against the current `src`
  // means a new (valid) image automatically gets a fresh chance without an
  // effect to reset the flag.
  const [failedSrc, setFailedSrc] = useState(null);

  const computedInitials = (
    initials ??
    (name
      ? name
          .trim()
          .split(/\s+/)
          .map((word) => word[0])
          .slice(0, 2)
          .join("")
      : "?")
  ).toUpperCase();

  const showImage = src && failedSrc !== src;

  if (showImage) {
    return (
      <img
        src={src}
        alt={alt ?? name ?? ""}
        onClick={onClick}
        onError={() => setFailedSrc(src)}
        className={className}
      />
    );
  }

  return (
    <div onClick={onClick} className={fallbackClassName}>
      {computedInitials}
    </div>
  );
}
