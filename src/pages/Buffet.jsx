import { useState } from "react";
import buffetImg from "../assets/buffet.png";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Swal from "sweetalert2";

export default function Buffet() {
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [drinkType, setDrinkType] = useState("refill");
  const [waterBottles, setWaterBottles] = useState("");
  const [sodaBottles, setSodaBottles] = useState("");
  const [discountPercent, setDiscountPercent] = useState("0");
  const [totalPay, setTotalPay] = useState("0.00");

  const handleDrinkTypeChange = (type) => {
    setDrinkType(type);
    if (type === "refill") {
      setWaterBottles("");
      setSodaBottles("");
    }
  };

  const calculateBuffet = (e) => {
    e.preventDefault();

    const numAdults = adults.trim() === "" ? 0 : Number(adults);
    const numChildren = children.trim() === "" ? 0 : Number(children);

    if (
      (adults.trim() === "" && children.trim() === "") ||
      !Number.isInteger(numAdults) ||
      !Number.isInteger(numChildren) ||
      numAdults < 0 ||
      numChildren < 0 ||
      (numAdults === 0 && numChildren === 0)
    ) {
      Swal.fire({
        icon: "warning",
        title: "กรุณากรอกจำนวนลูกค้าให้ถูกต้อง",
        text: "ระบุจำนวนผู้ใหญ่หรือเด็กเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป (อย่างน้อย 1 ท่าน)",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#4f46e5",
      });
      return;
    }

    const foodCost = numAdults * 299 + numChildren * 89;
    const discountRate = parseFloat(discountPercent) / 100;
    const foodCostAfterDiscount = foodCost - foodCost * discountRate;

    let drinkCost;
    if (drinkType === "refill") {
      drinkCost = (numAdults + numChildren) * 29;
    } else {
      const numWater = waterBottles.trim() === "" ? 0 : Number(waterBottles);
      const numSoda = sodaBottles.trim() === "" ? 0 : Number(sodaBottles);

      if (
        !Number.isInteger(numWater) ||
        !Number.isInteger(numSoda) ||
        numWater < 0 ||
        numSoda < 0
      ) {
        Swal.fire({
          icon: "warning",
          title: "จำนวนเครื่องดื่มไม่ถูกต้อง",
          text: "โปรดระบุจำนวนขวดเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#4f46e5",
        });
        return;
      }

      drinkCost = numWater * 10 + numSoda * 25;
    }

    const finalTotal = foodCostAfterDiscount + drinkCost;
    const formattedTotal = finalTotal.toLocaleString("th-TH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    setTotalPay(formattedTotal);

    Swal.fire({
      icon: "success",
      title: "คำนวณค่าอาหารสำเร็จ!",
      html: `ยอดชำระทั้งหมดของคุณคือ <b>${formattedTotal} บาท</b>`,
      confirmButtonText: "ตกลง",
      confirmButtonColor: "#4f46e5",
    });
  };

  const handleReset = () => {
    setAdults("");
    setChildren("");
    setDrinkType("refill");
    setWaterBottles("");
    setSodaBottles("");
    setDiscountPercent("0");
    setTotalPay("0.00");
  };

  return (
    <>
      <div className="w-[90%] md:w-[40%] border border-gray-200 rounded-2xl shadow-xl mt-10 mb-10 m-auto flex flex-col items-center p-10 bg-white">
        <p className="font-kanit font-bold text-2xl text-gray-800">Buffet Calculator</p>
        <p className="font-kanit font-bold text-gray-400 text-sm mt-1">คำนวณค่าอาหารบุฟเฟต์</p>

        <img src={buffetImg} alt="Buffet" className="w-24 mt-4" />

        {/* ฟอร์มรับข้อมูล */}
        <form onSubmit={calculateBuffet} className="w-full mt-6 flex flex-col">
          {/* จำนวนผู้ใหญ่ */}
          <label htmlFor="adults" className="font-kanit text-xs text-gray-500 mb-1">
            จำนวนผู้ใหญ่ (คนละ 299 บาท)
          </label>
          <input
            id="adults"
            type="number"
            min="0"
            step="1"
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            className="border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:border-indigo-500"
            placeholder="เช่น 2"
          />

          {/* จำนวนเด็ก */}
          <label htmlFor="children" className="font-kanit text-xs text-gray-500 mt-3 mb-1">
            จำนวนเด็ก (คนละ 89 บาท)
          </label>
          <input
            id="children"
            type="number"
            min="0"
            step="1"
            value={children}
            onChange={(e) => setChildren(e.target.value)}
            className="border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:border-indigo-500"
            placeholder="เช่น 1"
          />

          {/* กรอบเลือกเครื่องดื่ม (Fieldset) */}
          <fieldset className="border border-gray-200 rounded-lg p-4 mt-4 flex flex-col">
            <legend className="font-kanit text-xs text-gray-500 px-1">เครื่องดื่ม</legend>

            {/* ตัวเลือก 1: น้ำรีฟิล */}
            <label className="flex items-center gap-2 cursor-pointer font-kanit text-xs text-gray-700">
              <input
                type="radio"
                name="drinkType"
                value="refill"
                checked={drinkType === "refill"}
                onChange={() => handleDrinkTypeChange("refill")}
              />
              น้ำรีฟิล คนละ 29 บาท (ผู้ใหญ่และเด็ก)
            </label>

            {/* ตัวเลือก 2: เครื่องดื่มแบบขวด */}
            <label className="flex items-center gap-2 cursor-pointer font-kanit text-xs text-gray-700 mt-2">
              <input
                type="radio"
                name="drinkType"
                value="bottle"
                checked={drinkType === "bottle"}
                onChange={() => handleDrinkTypeChange("bottle")}
              />
              เครื่องดื่มแบบขวด
            </label>

            {/* น้ำเปล่า */}
            <label htmlFor="waterBottles" className="font-kanit text-xs text-gray-500 mt-3 mb-1">
              น้ำเปล่า (ขวดละ 10 บาท)
            </label>
            <input
              id="waterBottles"
              type="number"
              min="0"
              step="1"
              disabled={drinkType === "refill"}
              value={waterBottles}
              onChange={(e) => setWaterBottles(e.target.value)}
              className={`border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:border-indigo-500 ${
                drinkType === "refill" ? "bg-gray-100 cursor-not-allowed text-gray-400" : "bg-white"
              }`}
              placeholder={drinkType === "refill" ? "" : "เช่น 2"}
            />

            {/* น้ำอัดลม */}
            <label htmlFor="sodaBottles" className="font-kanit text-xs text-gray-500 mt-3 mb-1">
              น้ำอัดลม (ขวดละ 25 บาท)
            </label>
            <input
              id="sodaBottles"
              type="number"
              min="0"
              step="1"
              disabled={drinkType === "refill"}
              value={sodaBottles}
              onChange={(e) => setSodaBottles(e.target.value)}
              className={`border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:border-indigo-500 ${
                drinkType === "refill" ? "bg-gray-100 cursor-not-allowed text-gray-400" : "bg-white"
              }`}
              placeholder={drinkType === "refill" ? "" : "เช่น 1"}
            />
          </fieldset>

          {/* บัตรส่วนลด */}
          <label className="font-kanit text-xs text-gray-500 mt-4 mb-1">บัตรส่วนลด</label>
          <select
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
            className="border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:border-indigo-500 font-kanit"
          >
            <option value="0">ไม่มีส่วนลด</option>
            <option value="10">ส่วนลด 10%</option>
            <option value="15">ส่วนลด 15%</option>
            <option value="20">ส่วนลด 20%</option>
          </select>
          <span className="font-kanit text-[11px] text-gray-400 mt-1">
            ลดเฉพาะค่าอาหารทั้งหมด ไม่รวมเครื่องดื่ม
          </span>

          {/* ปุ่มคำนวณ และ รีเซ็ต */}
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white font-kanit text-sm font-semibold py-2 rounded-md transition duration-200 cursor-pointer"
            >
              คำนวณ
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-1/2 bg-red-500 hover:bg-red-600 text-white font-kanit text-sm font-semibold py-2 rounded-md transition duration-200 cursor-pointer"
            >
              รีเซ็ต
            </button>
          </div>
        </form>

        {/* กล่องแสดงผลลัพธ์ */}
        <div className="w-full bg-indigo-50/70 rounded-md py-3 mt-5 flex justify-center items-center gap-2 font-kanit">
          <span className="font-bold text-gray-700 text-sm">ยอดชำระทั้งหมด:</span>
          <span className="font-bold text-indigo-600 text-base">{totalPay}</span>
          <span className="font-bold text-gray-700 text-sm">บาท</span>
        </div>

        {/* ลิงก์กลับหน้าหลัก */}
        <Link
          to="/"
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-kanit font-semibold text-xs text-center py-2 rounded-md mt-4 transition duration-200"
        >
          กลับหน้าหลัก
        </Link>
      </div>
      <Footer />
    </>
  );
}