import Calculate from "../assets/calculate.png";

import CardMenu from "../components/CardMenu";

import Car from "./../assets/car.png";

import Bmr from "./../assets/bmr.png";

import Bmi from "./../assets/bmi.png";
import { Link } from "react-router-dom";
import Foodter from "../components/Foodter";

export default function Home() {
  return (
    <>
      <div className="w-full flex flex-col items-center mt-20 ">
        <img src={Calculate} alt="Calculate" className="w-30" />

        <p className="font-kanit text-3xl font-bold mt-10">
          เครื่องมือคำนวณออนไลน์
        </p>
        <p className="font-itim text-gray-600 text-xl">
          เลือกการคำนวณที่คุณต้องการจากรายการด้านล่าง
        </p>
        <div className="flex gap-10 mt-15">
          <Link to="/bmi">
          <CardMenu
            showImg={Bmi}
            showTitle="BMI(ดัชนีมวลกาย)"
            showDetail="คำนวณความสมดุลของน้ำหนักส่วนสูง"
          />
          </Link>
          <Link to="/bmr">
          <CardMenu
            showImg={Bmr}
            showTitle="BMR(อัตราการเผาผลาญ)"
            showDetail="คำนวณอัตราการเผาผลาญที่ร่างกายต้องการ"
          />
          </Link>
          <Link to="/car">
            <CardMenu
              showImg={Car}
              showTitle="CAR(คำนวณเงินผ่อน)"
              showDetail="คำนวณเงินผ่อนรถยนต์-รถเครื่อง"
            />
          </Link>
        </div>

        {/* foodter */}
        <Foodter />
      </div>
    </>
  );
}
