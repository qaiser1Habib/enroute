"use client"
import { useRef, useEffect } from "react";
import lottie from "lottie-web";
import cancelAnimation from "../../assets/animated/cancelMinusAnimation.json";
import deleteAnimation from "../../assets/animated/robotTakingOutTrash.json";
import successAnimation from "../../assets/animated/successAnimation.json";
import failErrorAnimation from "../../assets/animated/failErrorAnimation.json";
import sadCryFaceAnimation from "../../assets/animated/sadCryFaceAnimation.json";
import happyFaceAnimation from "../../assets/animated/happyFaceAnimation.json";
import processingAnimation from "../../assets/animated/processingAnimation.json";
import shoppingCartCheckout from "../../assets/animated/shoppingCartCheckout.json";
import warningAnimation from "../../assets/animated/warningAnimation.json";

const animationConfigs = {
   delete: deleteAnimation,
   success: successAnimation,
   failError: failErrorAnimation,
   cancel: cancelAnimation,
   sad: sadCryFaceAnimation,
   happy: happyFaceAnimation,
   shopping: shoppingCartCheckout,
   // transfer: fileTransferAnimation,
   // upload: uploadAnimation,
   processing: processingAnimation,
   warning: warningAnimation,
};

export const LottieIcon = ({ iconType, style, className }) => {
   const containerRef = useRef(null);
   const animationData = animationConfigs[iconType];

   useEffect(() => {
      if (typeof window !== "undefined") {
         if (animationData) {
            const animation = lottie.loadAnimation({
               container: containerRef.current,
               animationData,
               loop: true,
               autoplay: true,
            });
         }

         return () => {
            animation.destroy();
         };
      }
   }, [animationData]);

   return <div ref={containerRef} style={style} className={className} />;
};
