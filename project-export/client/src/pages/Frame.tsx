import React from "react";
import { Button } from "@/components/ui/button";

export const Frame = (): JSX.Element => {
  return (
    <main className="bg-white rounded-[62px] overflow-x-hidden w-full min-w-[402px] min-h-[874px] flex flex-col items-center justify-between p-10 relative">
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <figure className="w-[322px] h-[326px] rounded-[50px] overflow-hidden">
          <img
            className="w-full h-full object-cover"
            alt="Happy Hour Liquors Logo"
            src="/figmaAssets/image-1.png"
          />
        </figure>

        <p className="w-[286px] [font-family:'Playfair_Display',Helvetica] font-bold text-black text-[15px] tracking-[0] leading-[normal] text-center">
          &#34;celebrating the craft behind every bottle&#34;
        </p>
      </div>

      <Button className="w-[345px] h-[60px] bg-[#333333] hover:bg-[#444444] rounded-2xl shadow-[0px_4px_4px_#00000040] [font-family:'Poppins',Helvetica] font-medium text-white text-xl">
        NEXT
      </Button>
    </main>
  );
};
