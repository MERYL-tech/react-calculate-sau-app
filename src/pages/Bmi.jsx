import { useState } from "react";
import bmiImg from "../assets/bmi.png";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Swal from "sweetalert2";

export default function Bmi() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("0.00");
  const [category, setCategory] = useState("ยังไม่มีผลการคำนวณ");

  const calculateBmi = (e) => {
    e.preventDefault();

    const weightKg = Number(weight);
    const heightCm = Number(height);

    if (
      !weight.trim() ||
      !height.trim() ||
      !Number.isFinite(weightKg) ||
      !Number.isFinite(heightCm) ||
      weightKg <= 0 ||
      heightCm <= 0
    ) {
      Swal.fire({
        icon: "warning",
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        text: "โปรดระบุน้ำหนักและส่วนสูงให้ถูกต้อง",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#4f46e5",
      });
      return;
    }

    const heightM = heightCm / 100;
    const bmiValue = weightKg / (heightM * heightM);
    const formattedBmi = bmiValue.toFixed(2);
    let bmiCategory;

    if (bmiValue < 18.5) {
      bmiCategory = "น้ำหนักต่ำกว่าเกณฑ์";
    } else if (bmiValue < 23) {
      bmiCategory = "สมส่วน";
    } else if (bmiValue < 25) {
      bmiCategory = "น้ำหนักเกิน";
    } else if (bmiValue < 30) {
      bmiCategory = "โรคอ้วนระดับ 1";
    } else {
      bmiCategory = "โรคอ้วนระดับ 2";
    }

    setBmi(formattedBmi);
    setCategory(bmiCategory);

    Swal.fire({
      icon: "success",
      title: "คำนวณ BMI สำเร็จ!",
      html: `ค่า BMI ของคุณคือ <b>${formattedBmi}</b><br/>${bmiCategory}`,
      confirmButtonText: "ตกลง",
      confirmButtonColor: "#4f46e5",
    });
  };

  const handleReset = () => {
    setWeight("");
    setHeight("");
    setBmi("0.00");
    setCategory("ยังไม่มีผลการคำนวณ");
  };

  return (
    <>
      <div className="w-[90%] md:w-[40%] border border-gray-200 rounded-2xl shadow-xl mt-10 mb-10 m-auto flex flex-col items-center p-10 bg-white">
        <p className="font-kanit font-bold text-2xl text-gray-800">
          BMI Calculator
        </p>
        <p className="font-kanit font-bold text-gray-400 text-sm mt-1">
          คำนวณดัชนีมวลกาย
        </p>

        <img src={bmiImg} alt="BMI" className="w-24 mt-4" />

        <form onSubmit={calculateBmi} className="w-full mt-6 flex flex-col">
          <label htmlFor="weight" className="font-kanit text-xs text-gray-500 mb-1">
            น้ำหนัก (กิโลกรัม)
          </label>
          <input
            id="weight"
            type="number"
            min="0"
            step="any"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:border-indigo-500"
            placeholder="เช่น 65"
          />

          <label htmlFor="height" className="font-kanit text-xs text-gray-500 mt-3 mb-1">
            ส่วนสูง (เซนติเมตร)
          </label>
          <input
            id="height"
            type="number"
            min="0"
            step="any"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:border-indigo-500"
            placeholder="เช่น 170"
          />

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

        <div className="w-full bg-indigo-50/70 rounded-md py-3 mt-5 flex flex-col items-center font-kanit">
          <div className="flex justify-center items-center gap-2">
            <span className="font-bold text-gray-700 text-sm">ค่า BMI:</span>
            <span className="font-bold text-indigo-600 text-base">{bmi}</span>
          </div>
          <span className="font-kanit text-xs text-gray-600 mt-1">
            {category}
          </span>
        </div>

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
