 
export default function CardMenu({showImg, showTitle, showDetail}) {
  return (
    <div className="w-100 border flex flex-col items-center p-8
                     border-gray-200 rounded-2xl shadow-2xl">
        <img src={showImg} alt="รูปนะ" className="w-25" />
 
        <p className="mt-5 font-kanit font-bold text-2xl">
            {showTitle}
        </p>
 
        <p className="text-center font-charm">
            {showDetail}
        </p>
    </div>
  )
}
 
 