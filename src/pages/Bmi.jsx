import { useState } from "react";
import bmiImg from "../assets/bmi.png";
import { Link } from "react-router-dom";

export default function Bmi() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("0.00");
  const [resultText, setResultText] = useState("");

  const calculateBmi = (e) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (w > 0 && h > 0) {
      // แปลงส่วนสูงจาก เซนติเมตร เป็น เมตร
      const heightInMeters = h / 100;
      // สูตรคำนวณ BMI = น้ำหนัก (kg) / (ส่วนสูง (m) * ส่วนสูง (m))
      const bmiValue = w / (heightInMeters * heightInMeters);
      const formattedBmi = bmiValue.toFixed(2);

      setBmi(formattedBmi);

      // ประเมินผลตามเกณฑ์ BMI สำหรับคนเอเชีย
      const numBmi = parseFloat(formattedBmi);
      if (numBmi < 18.5) {
        setResultText("ผอมเกินไป");
      } else if (numBmi >= 18.5 && numBmi <= 22.9) {
        setResultText("ร่างกายสมดุล (น้ำหนักปกติ)");
      } else if (numBmi >= 23.0 && numBmi <= 24.9) {
        setResultText("น้ำหนักเกิน (ท่วม)");
      } else if (numBmi >= 25.0 && numBmi <= 29.9) {
        setResultText("อ้วนระดับ 1");
      } else {
        setResultText("อ้วนระดับ 2 (อ้วนมาก)");
      }
    }
  };

  const handleReset = () => {
    setWeight("");
    setHeight("");
    setBmi("0.00");
    setResultText("");
  };

  return (
    <>
      <div className="w-[40%] border border-gray-200 rounded-2xl shadow-xl mt-10 m-auto flex flex-col items-center p-10 bg-white">
        <p className="font-kanit font-bold text-2xl text-gray-800">BMI Calculator</p>
        <p className="font-kanit font-bold text-gray-400 text-sm mt-1">คำนวณ BMI</p>

        {/* รูปไอคอน */}
        <img src={bmiImg} alt="BMI" className="w-24 mt-4" />

        {/* ฟอร์มรับข้อมูล */}
        <form onSubmit={calculateBmi} className="w-full mt-6 flex flex-col">
          {/* ป้อนน้ำหนัก */}
          <label className="font-kanit text-xs text-gray-500 mb-1">ป้อนน้ำหนัก (กิโลกรัม)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:border-indigo-500"
            placeholder="เช่น 65"
            required
          />

          {/* ป้อนส่วนสูง */}
          <label className="font-kanit text-xs text-gray-500 mt-3 mb-1">ป้อนส่วนสูง (เซนติเมตร)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:border-indigo-500"
            placeholder="เช่น 170"
            required
          />

          {/* ปุ่มคำนวณ และ รีเซ็ต วางคู่กันตามธีม BMR/Car */}
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white font-kanit text-sm font-semibold py-2 rounded-md transition duration-200"
            >
              คำนวณ BMI
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-1/2 bg-red-500 hover:bg-red-600 text-white font-kanit text-sm font-semibold py-2 rounded-md transition duration-200"
            >
              รีเซ็ต
            </button>
          </div>
        </form>

        {/* ผลลัพธ์ */}
        <div className="flex flex-col items-center gap-1 mt-5 font-kanit">
          <div className="flex justify-center items-center gap-2">
            <span className="font-bold text-gray-700 text-sm">ค่า BMI ที่คำนวณได้ :</span>
            <span className="font-bold text-indigo-600 text-sm">{bmi}</span>
          </div>

          {resultText && (
            <div className="flex justify-center items-center gap-2">
              <span className="font-bold text-gray-700 text-sm">แปลผล :</span>
              <span className="font-bold text-emerald-600 text-sm">{resultText}</span>
            </div>
          )}
        </div>

        {/* ลิงก์กลับหน้าหลัก */}
        <Link
          to="/"
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-kanit font-semibold text-xs text-center py-2 rounded-md mt-4 transition duration-200"
        >
          กลับหน้าหลัก
        </Link>
      </div>
    </>
  );
}