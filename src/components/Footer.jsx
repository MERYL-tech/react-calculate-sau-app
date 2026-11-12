import { FaFacebook } from "react-icons/fa";
import { FaLine } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
 
export default function Footer() {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-20">
      <p className="font-charm text-gray-600">
        © 2026 Calculator. All rights reserved. Created by 6819M10016 PongsakornM
        SAU.
      </p>
      <p className="flex gap-3 mt-3">
        <a href="#">
          <FaFacebook className="text-2xl text-blue-600" />
        </a>
        <a href="#">
          <FaLine className="text-2xl text-green-600" />
        </a>
        <a href="#">
          <FaSquareXTwitter className="text-2xl text-gray-800" />
        </a>
      </p>
    </div>
  );
}
 
 