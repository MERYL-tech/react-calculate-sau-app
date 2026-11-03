import { useState } from "react";
import bmrImg from "../assets/bmr.png"; // เปลี่ยนเป็น path รูปภาพของคุณ
import { Link } from "react-router-dom";

export default function Bmr() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [bmr, setBmr] = useState(0);

  const calculateBmr = (e) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    if (w > 0 && h > 0 && a > 0) {
      let bmrValue = 0;

      if (gender === "male") {
        // สูตรผู้ชาย: BMR = 66 + (13.7 x weight) + (5 x height) - (6.8 x age)
        bmrValue = 66 + 13.7 * w + 5 * h - 6.8 * a;
      } else {
        // สูตรผู้หญิง: BMR = 665 + (9.6 x weight) + (1.8 x height) - (4.7 x age)
        bmrValue = 665 + 9.6 * w + 1.8 * h - 4.7 * a;
      }

      setBmr(bmrValue.toFixed(2));
    }
  };

  const handleReset = () => {
    setWeight("");
    setHeight("");
    setAge("");
    setGender("male");
    setBmr(0);
  };

  return (
    <>
      <div className="w-[40%] border border-gray-200 rounded-2xl shadow-xl mt-10 m-auto flex flex-col items-center p-10 bg-white">
        <p className="font-kanit font-bold text-2xl text-gray-800">BMR Calculator</p>
        <p className="font-kanit font-bold text-gray-400 text-sm mt-1">คำนวณ BMR</p>

        {/* รูปไอคอน */}
        <img src={bmrImg} alt="BMR" className="w-24 mt-4" />

        {/* ฟอร์มรับข้อมูล */}
        <form onSubmit={calculateBmr} className="w-full mt-6 flex flex-col">
          {/* ป้อนน้ำหนัก */}
          <label className="font-kanit text-xs text-gray-500 mb-1">ป้อนน้ำหนัก (กิโลกรัม)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:border-indigo-500"
            required
          />

          {/* ป้อนส่วนสูง */}
          <label className="font-kanit text-xs text-gray-500 mt-3 mb-1">ป้อนส่วนสูง (เซนติเมตร)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:border-indigo-500"
            required
          />

          {/* ป้อนอายุ */}
          <label className="font-kanit text-xs text-gray-500 mt-3 mb-1">ป้อนอายุ (ปี)</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:border-indigo-500"
            required
          />

          {/* ตัวเลือกเพศ */}
          <label className="font-kanit text-xs text-gray-500 mt-3 mb-1">เพศ</label>
          <div className="flex gap-4 items-center font-kanit text-xs text-gray-700">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              ชาย
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              หญิง
            </label>
          </div>

          {/* ปุ่มคำนวณ และ รีเซ็ต */}
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white font-kanit text-sm font-semibold py-2 rounded-md transition duration-200"
            >
              คำนวณ BMR
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
        <div className="flex justify-center items-center gap-2 mt-5 font-kanit">
          <span className="font-bold text-gray-700 text-sm">ค่า BMR ที่คำนวณได้ :</span>
          <span className="font-bold text-indigo-600 text-sm">{bmr} kcal/day</span>
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