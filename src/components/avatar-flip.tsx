"use client";

import Image from "next/image";
import { useState } from "react";

export default function AvatarFlip() {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-label={flipped ? "Show avatar" : "Show the real human"}
      aria-pressed={flipped}
      className="animate-fade-up avatar-halo shrink-0 mx-auto md:mx-0 block cursor-pointer rounded-full"
    >
      <div className={`avatar-flip ${flipped ? "is-flipped" : ""}`}>
        <div className="avatar-flip-face">
          <Image
            src="/images/landing.png"
            alt="Bach Tran"
            width={200}
            height={200}
            priority
            className="rounded-full w-[140px] h-[140px] md:w-[176px] md:h-[176px] object-cover"
          />
        </div>
        <div className="avatar-flip-face avatar-flip-back">
          <Image
            src="/images/other-landing.png"
            alt="Bach Tran, the real human"
            width={200}
            height={200}
            className="rounded-full w-[140px] h-[140px] md:w-[176px] md:h-[176px] object-cover"
          />
        </div>
      </div>
    </button>
  );
}
