import { CgChevronDown } from "react-icons/cg"
import { IoNotificationsOutline, IoPersonOutline, IoSearchOutline, IoSettingsOutline, IoShareSocialOutline } from "react-icons/io5"

const Navbar = () => {
  return (
    <div className="md:2-[calc(100%-230px)] w-[calc(100%-60px)] fixed flex items-center justify-between pl-2 pr-6 h-[70px] top-0 md:left-[230px] left-[60px] border-b border-slate-300 bg-[#fff]">
      <div className="flex items-center gap-3 cursor-pointer">
        <IoPersonOutline 
        color='cyan'
        size={29}
        />
        <span className="text-cyan-300 font-semibold md:text-lg text-sm whitespace-nowrap">
            Board Name
        </span>
        <CgChevronDown
          color='cyan'
          size={18}
        />
      </div>
      <div className="flex items-center gap-2 md:w-[800px] w-[130px] bg-gray-100 rounded-lg px-3 py-[10px]">
        <IoSearchOutline
        color='cyan'
        size={18}
         />
         <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray outline-none text-[15px]"
        />
      </div>
      <div className="md:flex hidden items-center gap-4">
        <div className="">
            <IoNotificationsOutline
            color='cyan'
            size={18}
            />
        </div>
      </div>

    </div>
  )
}

export default Navbar
